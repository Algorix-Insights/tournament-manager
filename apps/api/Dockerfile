# Stage 1: Build API application
FROM node:24-alpine AS builder

RUN apk update && apk upgrade --no-cache

WORKDIR /app

# Copy manifests and lockfile
COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY apps/api/prisma/schema.prisma ./apps/api/prisma/schema.prisma
COPY apps/api/prisma.config.ts ./apps/api/prisma.config.ts

# Install all dependencies and run postinstall (prisma generate)
RUN npm ci

# Copy API source code
COPY apps/api/ ./apps/api/

# Build TypeScript
RUN npm run build --workspace=api

# Stage 2: Production runtime
FROM node:24-alpine AS runner

RUN apk update && apk upgrade --no-cache

WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000

# Copy root manifest and workspaces
COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

# Copy dependencies, built artifacts, and prisma migrations
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

# Set non-root user permissions
RUN chown -R node:node /app

USER node

EXPOSE 3000

CMD ["node", "apps/api/dist/server.js"]
