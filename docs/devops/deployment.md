# Deployment Guide

This guide details how to build, verify, and deploy Tournament Manager to a production VPS using npm workspaces, Turborepo, Docker Compose, and GitHub Actions.

## Toolchain Requirements

- **Node.js**: 24.x
- **npm**: 11.19.0 (enforced via `packageManager` in `package.json`)
- **Turborepo**: 2.8.x (installed as root `devDependencies`)
- **Docker**: Docker Engine 24+ and Docker Compose v2+

## Architecture Overview

The repository is organized as an npm workspace with Turborepo orchestration:

- `apps/api`: Express + Prisma backend on port 3000 (accessible only via Compose internal network).
- `apps/web`: React + Vite frontend built into static files and served by Nginx on port 80. Nginx proxies `/api/` requests to `http://api:3000`.
- `db`: MySQL 8.0 on port 3306 with persistent named volume `mysql_data` (accessible only via Compose internal network).

Neither Turborepo Remote Cache nor Vercel services are used.

## VPS Prerequisites

1. **Operating System & Docker**:
   - Linux VPS (Ubuntu 22.04 LTS / 24.04 LTS recommended).
   - Docker and Docker Compose v2 installed.
   - A dedicated deploy user (e.g. `deploy`) added to the `docker` group:
     ```bash
     sudo usermod -aG docker deploy
     ```

2. **Directory Structure**:
   - Create the deployment root:
     ```bash
     sudo mkdir -p /opt/tournament-manager/backups
     sudo chown -R deploy:deploy /opt/tournament-manager
     ```

3. **GHCR Authentication on VPS**:
   - Create a GitHub Personal Access Token (classic) with `read:packages` scope.
   - Authenticate Docker on the VPS:
     ```bash
     echo "<PAT_TOKEN>" | docker login ghcr.io -u <GITHUB_USERNAME> --password-stdin
     ```

4. **Environment File (`/opt/tournament-manager/.env`)**:
   - Populate `/opt/tournament-manager/.env` with production secrets:
     ```env
     MYSQL_ROOT_PASSWORD=replace_with_secure_root_password
     MYSQL_DATABASE=tournament_db
     MYSQL_USER=tourney_admin
     MYSQL_PASSWORD=replace_with_secure_password
     WEB_PORT=80
     API_IMAGE_TAG=latest
     WEB_IMAGE_TAG=latest
     ```

5. **Edge Proxy / TLS Termination**:
   - The Compose stack binds `web` to port `${WEB_PORT:-80}` on the host.
   - TLS certificates (Let's Encrypt) and HTTPS termination must be configured at the host level using Caddy, Nginx, or Traefik forwarding to port 80.

## GitHub Actions Configuration

Configure the following GitHub Repository Secrets under **Settings > Secrets and variables > Actions**:

| Secret Name | Description |
|---|---|
| `SSH_HOST` | VPS public IP or DNS hostname |
| `SSH_USER` | Deployment user (`deploy`) |
| `SSH_KEY` | Private SSH key matching the public key in `~/.ssh/authorized_keys` on VPS |
| `SSH_PORT` | SSH port (typically `22`) |

The workflow automatically uses `GITHUB_TOKEN` to push images to GitHub Container Registry.

## CI/CD Pipelines

The pipelines are structured into dedicated Continuous Integration (CI) and Continuous Deployment (CD) workflows:

1. **API CI (`.github/workflows/api.yml`)**:
   - Triggered on push to Git Flow development branches (`develop`, `feature/**`, `bugfix/**`, `hotfix/**`, `release/**`) and PRs (`develop`, `main`, `release/**`, `hotfix/**`) when API or core files change (`apps/api/**`, `docker/**`, root manifests).
   - Validates the API workspace (`test` and `build`).

2. **Aplicacion Web CI (`.github/workflows/web.yml`)**:
   - Triggered on push to Git Flow development branches (`develop`, `feature/**`, `bugfix/**`, `hotfix/**`, `release/**`) and PRs (`develop`, `main`, `release/**`, `hotfix/**`) when Web or core files change (`apps/web/**`, `docker/**`, root manifests).
   - Validates the Web workspace (`lint`, `test`, and `build`).

3. **Deploy to Production (VPS) (`.github/workflows/cd.yml`)**:
   - Triggered automatically on push to `main`, or manually via `workflow_dispatch` with target selection (`both`, `api`, or `web`).
   - Automatically detects affected projects on push.
   - Builds and publishes container images to GitHub Container Registry (`ghcr.io`).
   - Connects to production VPS via SSH.
   - Copies `docker/compose.prod.yml` to `/opt/tournament-manager/compose.prod.yml`.
   - When deploying API: creates timestamped `mysqldump` backup, runs Prisma database migrations, updates `API_IMAGE_TAG` and restarts `api`.
   - When deploying Web: updates `WEB_IMAGE_TAG` and restarts `web`.
   - Verifies health checks for all updated services and triggers automatic rollback if health checks fail.

## Operations & Maintenance

### Manual Database Backup
To create a backup manually on the VPS:
```bash
cd /opt/tournament-manager
set -a && source .env && set +a
docker compose -f compose.prod.yml exec -T db mysqldump -u root -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE" > "backups/manual_backup_$(date +%Y%m%d_%H%M%S).sql"
```

### Manual Database Restoration
To restore from a backup file:
```bash
cd /opt/tournament-manager
set -a && source .env && set +a
docker compose -f compose.prod.yml exec -T db mysql -u root -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE" < backups/<backup_file>.sql
```

### Manual Rollback
If an application rollback is needed manually:
1. Identify the desired commit SHA image tag from GitHub packages.
2. Edit `/opt/tournament-manager/.env` and update the respective service tag:
   - For API: `API_IMAGE_TAG=<target_sha>`
   - For Web: `WEB_IMAGE_TAG=<target_sha>`
3. Re-deploy the specific service:
   ```bash
   # Re-deploy API only:
   docker compose -f compose.prod.yml up -d --no-deps api

   # Re-deploy Web only:
   docker compose -f compose.prod.yml up -d --no-deps web
   ```
