# Tournament Manager

Tournament Manager es una aplicación web para administrar torneos de videojuegos. El backend permite registrar jugadores, géneros, juegos y puntuaciones, además de consultar rankings y estadísticas generales del evento.

El proyecto está organizado como un monorepo con npm workspaces y Turborepo. Incluye una API REST, una aplicación web, persistencia en MySQL y automatización para validar y desplegar el sistema en un VPS.

> **Estado actual:** la API ofrece las operaciones del torneo. La interfaz web contiene la estructura inicial de jugadores, juegos y puntuaciones; su integración completa con la API continúa en desarrollo.

## Funcionalidades

- Registro y administración de jugadores.
- Catálogo de géneros y videojuegos.
- Registro de puntuaciones por jugador y juego.
- Ranking ordenado por puntuación.
- Estadísticas generales del torneo.
- Filtros, ordenamiento y paginación en los listados de la API.

La referencia completa de rutas, parámetros y respuestas está en la [documentación de la API](docs/apps/api/API_DOCUMENTATION.md).

## Arquitectura

```text
Navegador
    │
    ▼
React + Vite ── /api/* ──► Express ──► Prisma ──► MySQL
    │                         │
    └─ Nginx en producción ───┘
```

| Componente | Tecnologías | Responsabilidad |
|---|---|---|
| Web | React 19, TypeScript, Vite y Tailwind CSS | Interfaz del torneo |
| API | Express 5, TypeScript y Prisma | Reglas de negocio y API REST |
| Base de datos | MySQL 8 | Jugadores, géneros, juegos y puntuaciones |
| Monorepo | npm workspaces y Turborepo | Ejecución coordinada de desarrollo, pruebas y builds |
| Producción | Docker Compose, Nginx y GHCR | Empaquetado y despliegue en VPS |

## Estructura del repositorio

```text
.
├── apps/
│   ├── api/                 # API Express, Prisma, migraciones y pruebas
│   └── web/                 # Aplicación React, estilos y pruebas
├── db/                      # Esquema SQL de referencia
├── docker/                  # Definición de producción con Docker Compose
├── docs/
│   ├── apps/api/            # Referencia detallada de la API
│   └── devops/              # Guía de despliegue y operación
├── .github/workflows/       # Validación de API, web y despliegue al VPS
├── package.json             # Scripts y workspaces del monorepo
└── turbo.json               # Grafo de tareas de Turborepo
```

## Requisitos

- Node.js 24.x.
- npm 11.19.0.
- MySQL 8 para desarrollo local.
- Docker Engine 24+ y Docker Compose v2 para ejecutar el despliegue de producción.

## Instalación local

Desde la raíz del repositorio, instala todas las dependencias:

```bash
npm ci
```

El repositorio utiliza un único `package-lock.json`. No es necesario instalar dependencias por separado dentro de `apps/api` o `apps/web`.

### Configurar la base de datos

1. Inicia una instancia local de MySQL 8 y crea la base de datos:

   ```sql
   CREATE DATABASE tournament_db;
   ```

2. Crea la configuración local del API:

   ```bash
   cp apps/api/.env.example apps/api/.env
   ```

3. Ajusta `DATABASE_URL` en `apps/api/.env` con el usuario, contraseña, host y puerto de tu instancia.

4. Exporta las variables para que el proceso del API pueda utilizarlas:

   ```bash
   set -a
   source apps/api/.env
   set +a
   ```

5. Aplica las migraciones de Prisma:

   ```bash
   npm run --workspace=api prisma:deploy
   ```

6. Opcionalmente, carga los datos de demostración:

   ```bash
   npm run --workspace=api seed
   ```

> **Advertencia:** el comando `seed` elimina los jugadores, juegos, géneros y puntuaciones existentes antes de crear los datos de demostración. No debe ejecutarse sobre una base de datos con información que necesites conservar.

## Desarrollo

Inicia la web y el API desde la raíz:

```bash
npm run dev
```

- Web: `http://localhost:5173`
- API: `http://localhost:3000`

Turborepo observa los cambios del monorepo. Cuando cambia el API, reinicia su proceso; Vite gestiona la recarga de la aplicación web.

También puedes iniciar un solo workspace:

```bash
npm run dev:api
npm run dev:web
```

## Scripts principales

Todos los comandos de trabajo se ejecutan desde la raíz:

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia API y web en modo desarrollo |
| `npm run dev:api` | Inicia únicamente el API con reinicio automático |
| `npm run dev:web` | Inicia únicamente la aplicación web |
| `npm run build` | Compila todos los workspaces que definen un build |
| `npm test` | Ejecuta las pruebas de API y web |
| `npm run lint` | Ejecuta el lint de los workspaces que lo definen; actualmente, la web |
| `npm run check` | Ejecuta lint, pruebas y build mediante Turborepo |

## Modelo de datos y API

La base de datos relaciona cuatro entidades principales:

- Un jugador puede registrar múltiples puntuaciones.
- Un juego pertenece a un género y puede tener múltiples puntuaciones.
- Una puntuación relaciona un jugador con un juego.
- Los rankings se calculan a partir de las puntuaciones registradas.

Los grupos principales de endpoints son:

| Recurso | Ruta base |
|---|---|
| Jugadores | `/api/players` |
| Géneros | `/api/genres` |
| Juegos | `/api/games` |
| Puntuaciones | `/api/scores` |
| Ranking | `/api/scores/ranking` |
| Estadísticas | `/api/scores/stats` |

## Calidad y pruebas

Antes de enviar cambios, ejecuta:

```bash
npm run check
```

Las pruebas del API usan Jest con entorno Node. Las pruebas de la web usan Jest, Testing Library y jsdom. Los builds generan sus artefactos dentro de `dist/` y Turborepo reutiliza los resultados locales cuando las entradas no cambian.

## CI/CD y producción

GitHub Actions separa la automatización por responsabilidad:

- `api.yml`: prueba y compila el workspace del API cuando cambian sus archivos.
- `web.yml`: ejecuta lint, pruebas y build del workspace web.
- `cd.yml`: construye las imágenes afectadas, las publica en GitHub Container Registry y despliega la versión en el VPS.

En producción, Docker Compose ejecuta MySQL, el API y la web en una red privada. Solo la web publica un puerto del host; Nginx sirve los archivos estáticos y redirige `/api/*` al backend. Las migraciones, respaldos, health checks y rollback forman parte del flujo de despliegue.

Consulta la [guía de despliegue y operación](docs/devops/deployment.md) para preparar el VPS, configurar secretos, realizar respaldos y recuperar una versión anterior.

## Contribución

Las convenciones de ramas, commits y pull requests están descritas en [CONTRIBUTING.md](CONTRIBUTING.md).

## Licencia

Este proyecto se distribuye bajo la [licencia MIT](LICENSE). Copyright © 2026 Algorix Insights.
