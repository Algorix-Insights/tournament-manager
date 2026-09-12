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
     IMAGE_TAG=latest
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

## CI/CD Pipeline

1. **Continuous Integration (`.github/workflows/validate-monorepo.yml`)**:
   - Triggered on PRs and pushes to `main` and `develop`.
   - Checks out full git history.
   - Runs `npm ci` with npm cache.
   - Executes `npm run check -- --affected` (lint, test, build).

2. **Continuous Deployment (`.github/workflows/deploy-production-vps.yml`)**:
   - Triggered on `workflow_run` when validation succeeds on `main`.
   - Builds immutable Docker images for `api` and `web`, tagged with commit SHA and `latest`.
   - Copies `deploy/compose.prod.yml` to `/opt/tournament-manager/compose.prod.yml`.
   - Creates a timestamped `mysqldump` backup on the VPS before applying migrations.
   - Applies committed Prisma migrations via `docker compose run --rm api npm run --workspace=api prisma:deploy`.
   - Starts updated containers and polls health checks.
   - Automatically reverts image tags in `.env` and restarts containers if health checks fail.

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
2. Edit `/opt/tournament-manager/.env` and update `IMAGE_TAG=<target_sha>`.
3. Re-deploy services:
   ```bash
   docker compose -f compose.prod.yml up -d
   ```
