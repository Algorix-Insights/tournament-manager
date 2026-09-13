# Stage 1: Build web application
FROM node:22-alpine AS builder

RUN apk update && apk upgrade --no-cache

WORKDIR /app

# Copy root manifest, lockfile and workspace manifests for npm ci
COPY package.json package-lock.json ./
COPY apps/web/package.json ./apps/web/
COPY apps/api/package.json ./apps/api/
COPY apps/api/prisma/schema.prisma ./apps/api/prisma/schema.prisma
COPY apps/api/prisma.config.ts ./apps/api/prisma.config.ts

# Install workspace dependencies
RUN npm ci

# Copy web source and build
COPY apps/web/ ./apps/web/
RUN npm run build --workspace=web

# Stage 2: Nginx unprivileged runtime
FROM nginxinc/nginx-unprivileged:alpine AS runner

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
