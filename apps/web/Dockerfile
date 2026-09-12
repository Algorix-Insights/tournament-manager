# Stage 1: Build web application
FROM node:24-bookworm-slim AS builder

WORKDIR /app

# Copy root manifest, lockfile and workspace manifests for npm ci
COPY package.json package-lock.json ./
COPY apps/web/package.json ./apps/web/
COPY apps/api/package.json ./apps/api/
COPY apps/api/prisma/schema.prisma ./apps/api/prisma/schema.prisma

# Install workspace dependencies
RUN npm ci

# Copy web source and build
COPY apps/web/ ./apps/web/
RUN npm run build --workspace=web

# Stage 2: Nginx runtime
FROM nginx:alpine AS runner

RUN apk update && apk upgrade --no-cache

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
