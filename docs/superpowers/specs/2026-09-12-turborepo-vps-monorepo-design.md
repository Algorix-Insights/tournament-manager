# Turborepo VPS monorepo design

## Goal

Convert the existing `apps/api` and `apps/web` directories into an npm workspace orchestrated by Turborepo, verify changes in GitHub Actions, and deploy production containers to a VPS without depending on Vercel or Turborepo Remote Cache.

## Current state

- `apps/api` is an Express and Prisma application backed by MySQL.
- `apps/web` is a React application built by Vite and served separately during development.
- Each application has its own `package-lock.json`; the root lockfile is empty and there is no root `package.json` or `turbo.json`.
- The API already has build and test scripts but no development watcher. The web application has development, build, lint, and test scripts.
- There are no internal shared packages or cross-application imports.
- There are no Prisma migrations. The existing `db/schema.sql` drops tables and must not be used during production deployment.

## Repository architecture

The root becomes a private npm workspace using `apps/*`. It owns the single lockfile, Turborepo dependency, and aggregate commands. Existing application source remains in place and package names remain `api` and `web` because they are already unique and no published internal packages exist.

```text
.
├── apps/
│   ├── api/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── prisma/
│   └── web/
│       ├── Dockerfile
│       ├── nginx.conf
│       └── package.json
├── deploy/
│   └── compose.prod.yml
├── docs/
│   └── deployment.md
├── .github/workflows/
│   ├── validate-monorepo.yml
│   └── deploy-production-vps.yml
├── package.json
├── package-lock.json
└── turbo.json
```

No `packages/` directory will be created until actual shared code or configuration exists.

## Toolchain constraints

- Node.js 24 in local documentation, CI, and container builders.
- npm 11.19.0, declared through the root `packageManager` field.
- Turborepo 2.8, installed only as a root development dependency.
- One root `package-lock.json`; nested lockfiles are removed after successful workspace installation.
- No Turborepo Remote Cache configuration, tokens, or Vercel integration.

## Root commands and task graph

The root `package.json` is the team's only command entrypoint. It exposes these scripts so contributors never need to invoke the Turborepo CLI directly:

- `npm run dev`: run `turbo watch dev` for both applications.
- `npm run dev:api`: run `turbo watch dev --filter=api`.
- `npm run dev:web`: run `turbo run dev --filter=web`.
- `npm run build`: run `turbo run build`.
- `npm test`: run `turbo run test`.
- `npm run lint`: run `turbo run lint`.
- `npm run check`: run `turbo run lint test build`.

The API gains `dev` as `tsx src/server.ts`, using its existing `tsx` dependency without adding a second watcher. Turborepo owns change detection and process restarts. The API also gains named Prisma generation and deployment commands. The root `postinstall` invokes the API's generation command so a clean workspace install always creates Prisma Client.

`turbo.json` defines:

- `build`: depends on dependency builds through `^build` and caches `dist/**`.
- `test`: cacheable, with no declared file output because Jest does not currently emit coverage.
- `lint`: cacheable and runs only in packages that define the script. Initially this is the web application; no API lint dependency is introduced.
- `dev`: persistent and uncached. The package-specific `api#dev` task is also `interruptible: true`, allowing `turbo watch` to restart the API process when files in the API workspace change. The web task remains non-interruptible because Vite already watches and reloads its own files.

The task graph remains intentionally small. There are no internal package dependencies to model yet.

## Database lifecycle

An initial Prisma migration is generated from `apps/api/prisma/schema.prisma` and committed under `apps/api/prisma/migrations`. The API exposes `prisma:generate` and `prisma:deploy` scripts. A clean root install generates the client, while production deployment uses `prisma migrate deploy` and never runs `migrate dev` or the destructive `db/schema.sql`. Production migrations must remain backward-compatible with the previous application image; destructive schema changes require a later cleanup release after old images are no longer rollback candidates.

MySQL stores data in a named Docker volume. Before applying a deployment migration, the deployment procedure writes a timestamped `mysqldump` backup outside the container. Backups remain on the VPS and are not uploaded to GitHub Actions artifacts.

## Continuous integration

`.github/workflows/validate-monorepo.yml`, displayed in GitHub as **Validate affected API and web workspaces**, runs for pull requests and pushes to `develop` and `main`. Its verification job is displayed as **Lint, test, and build affected workspaces**:

1. Check out full Git history so `--affected` can compare the correct base.
2. Install Node.js 24 and restore npm's download cache using the root lockfile.
3. Run `npm ci` from the repository root.
4. Run `npm run check -- --affected`, covering lint, tests, and builds for changed packages and their dependents.

The workflow uses no Turborepo Remote Cache. npm's dependency-download cache is permitted because it does not store Turborepo task artifacts or `node_modules`.

## Production containers

Both Dockerfiles use the repository root as build context so npm can resolve the workspace and root lockfile.

- The web image builds only the `web` workspace and copies `dist/` into an Nginx runtime image. Nginx serves the single-page application and proxies `/api/` to the API container.
- The API image installs the `api` workspace, generates Prisma Client, compiles TypeScript, and runs `node apps/api/dist/server.js` as a non-root user.
- The production Compose file defines `web`, `api`, and `db`, a private application network, the MySQL volume, health checks, restart policies, and image tags supplied through the VPS environment file.
- Only the web service publishes ports to the host. MySQL and the API remain accessible only on the Compose network.

TLS termination is owned by the VPS edge proxy or host-level certificate setup and is documented as a provisioning prerequisite; certificate automation is not added to this repository.

## Continuous deployment

`.github/workflows/deploy-production-vps.yml`, displayed in GitHub as **Deploy Tournament Manager to production VPS**, runs only after the validation workflow succeeds for `main`. Its jobs and steps use outcome-oriented names such as **Build and publish application images**, **Back up production MySQL**, **Apply Prisma migrations**, **Start production services**, and **Verify production health**:

1. Build immutable API and web images from the approved commit.
2. Tag both images with the commit SHA and publish them to GitHub Container Registry using `GITHUB_TOKEN` with package-write permission.
3. Copy the versioned Compose definition to `/opt/tournament-manager` on the VPS.
4. Connect over SSH, authenticate Docker to GHCR using a read-only package token already stored on the VPS, and set the release SHA.
5. Start and health-check MySQL, back it up when an existing database is present, pull the new application images, run the committed Prisma migrations from the new API image, and start the updated services.
6. Verify the API and web health checks. If either fails, restore the previous image SHA and restart the prior containers. Database restoration remains a deliberate operator action because reversing an applied schema migration automatically can destroy newer data.

The VPS retains production secrets in `/opt/tournament-manager/.env`; GitHub receives only the SSH host, user, port, and private key needed to start a deployment. The deployment account has access only to the application directory and Docker operations required by this stack.

## Failure handling

- A CI failure prevents image publication and deployment.
- A container build or registry push failure leaves the current VPS release unchanged.
- A failed database backup stops deployment before migrations.
- A failed migration stops the application update and preserves the prior containers.
- A failed health check restores the prior image tags and records the failed SHA in the workflow log.
- Deployment uses a GitHub Actions concurrency group so only one production release runs at a time.

## Verification

Completion requires:

- `npm ci` succeeds from a clean checkout with no nested lockfiles.
- `npx turbo ls` discovers `api` and `web`.
- Root `npm run dev` starts both applications; editing an API source file causes Turborepo to restart only the API process, while Vite continues handling web changes.
- Root `npm run dev:api` and `npm run dev:web` start either application without requiring contributors to know Turborepo flags.
- Root `npm run build`, `npm test`, and `npm run lint` succeed.
- A second local build reports Turborepo cache hits.
- `npm run check -- --affected` selects only changed packages where applicable.
- Both Docker images build from the repository root.
- Compose configuration validation succeeds using non-secret validation values supplied only to the command.
- On a staging or disposable VPS, deployment starts healthy web, API, and MySQL services; a deliberately invalid image tag exercises rollback without losing the database volume.

## Deliberate exclusions

- Turborepo Remote Cache and every Vercel service.
- Internal shared packages, shared TypeScript configuration, and architectural boundary rules.
- Kubernetes, Docker Swarm, multiple VPS nodes, zero-downtime orchestration, and per-package CI matrices.
- Automatic database rollback and automatic off-site backup retention.
- Product features, frontend/API integration changes, authentication, and domain provisioning.

These are added only when measured scale, availability, or product requirements justify them.

## References

- [Turborepo: add to an existing repository](https://turborepo.dev/docs/getting-started/add-to-existing-repository)
- [Turborepo: structuring a repository](https://turborepo.dev/docs/crafting-your-repository/structuring-a-repository)
- [Turborepo: configuring tasks](https://turborepo.dev/docs/crafting-your-repository/configuring-tasks)
- [Turborepo: constructing CI](https://turborepo.dev/docs/crafting-your-repository/constructing-ci)
- [GitHub: publishing Docker images](https://docs.github.com/en/actions/tutorials/publish-packages/publish-docker-images)
