# Pruebas unitarias del API

## Objetivo

Validar el comportamiento de los módulos del API, sus middlewares principales y el flujo HTTP de las rutas versionadas bajo `/api/v1`.

Para conocer el funcionamiento interno del código de testing, consulta [api-testing-code.md](./api-testing-code.md).

Las pruebas verifican:

- respuestas HTTP y cuerpos JSON;
- validaciones con mensajes en español;
- filtros, ordenamiento y paginación;
- reglas de negocio de jugadores, géneros, videojuegos y puntuaciones;
- manejo de errores de Prisma;
- ranking y estadísticas;
- disponibilidad del contrato OpenAPI y de Scalar.

## Herramientas

- Jest 30.
- `ts-jest` para ejecutar TypeScript.
- `fetch` nativo de Node.js para las solicitudes HTTP.
- Express con un servidor temporal por suite.
- Prisma mockeado con `jest.mock('@/core/prisma')`.

Los tests de módulos no utilizan la base de datos real. El acceso a Prisma se reemplaza por mocks y se restablece antes de cada prueba mediante `src/test-utils/api-test-utils.ts`.

## Organización

```text
tests/app.test.ts                                      # raíz, OpenAPI y Scalar
src/core/__tests__/                                    # utilidades y middlewares del core
src/modules/players/__tests__/player.api.test.ts      # pruebas del módulo Players
src/modules/genres/__tests__/genre.api.test.ts        # pruebas del módulo Genres
src/modules/games/__tests__/game.api.test.ts          # pruebas del módulo Games
src/modules/scores/__tests__/score.api.test.ts        # pruebas del módulo Scores
src/test-utils/api-test-utils.ts                      # servidor temporal y mocks de Prisma
```

## Cobertura por módulo

| Suite | Archivo | Casos | Cobertura |
|---|---|---:|---|
| Aplicación | `tests/app.test.ts` | 3 | Health check, versionamiento, OpenAPI, Scalar y CORS |
| Core | `src/core/__tests__/*.test.ts` | 25 | Fechas, filtros, paginación, validación, errores, seeder y middlewares |
| Players | `src/modules/players/__tests__/player.api.test.ts` | 12 | Registro, duplicados, consultas, búsqueda y eliminación |
| Genres | `src/modules/genres/__tests__/genre.api.test.ts` | 3 | Registro, duplicados y eliminación |
| Games | `src/modules/games/__tests__/game.api.test.ts` | 6 | Registro, campos obligatorios, duplicados, referencias y eliminación |
| Scores | `src/modules/scores/__tests__/score.api.test.ts` y `score.service.test.ts` | 11 | Registro, relaciones, ranking, estadísticas, eliminación y regla de puntaje |
| **Total** |  | **60** | 14 suites |

## Casos funcionales

### RF01 — Players

Archivo: `src/modules/players/__tests__/player.api.test.ts`

| Caso | Endpoint | Resultado validado |
|---|---|---|
| CP-RF01-01 | `POST /api/v1/players` | Datos válidos producen `201 Created`. |
| CP-RF01-02 | `POST /api/v1/players` | Sin `name` produce `400` y detalle del campo. |
| CP-RF01-03 | `POST /api/v1/players` | Sin `gamertag` produce `400` y detalle del campo. |
| CP-RF01-04 | `POST /api/v1/players` | Sin `email` produce `400` y detalle del campo. |
| CP-RF01-05 | `POST /api/v1/players` | Error Prisma `P2002` produce `400` con `Ya existe un registro con los datos proporcionados`. |

### RF02 — Genres

Archivo: `src/modules/genres/__tests__/genre.api.test.ts`

| Caso | Endpoint | Resultado validado |
|---|---|---|
| CP-RF02-01 | `POST /api/v1/genres` | Género válido produce `201 Created`. |
| CP-RF02-02 | `POST /api/v1/genres` | Género duplicado produce `400` con el mensaje de duplicidad. |

### RF02 — Games

Archivo: `src/modules/games/__tests__/game.api.test.ts`

| Caso | Endpoint | Resultado validado |
|---|---|---|
| CP-RF02-03 | `POST /api/v1/games` | Videojuego con `name` y `genreId` válidos produce `201 Created`. |
| CP-RF02-04 | `POST /api/v1/games` | Sin `name` produce `400` con error de validación. |
| CP-RF02-05 | `POST /api/v1/games` | Sin `genreId` produce `400` con error de validación. |
| CP-RF02-06 | `POST /api/v1/games` | Nombre duplicado produce `400` por error Prisma `P2002`. |
| CP-RF02-07 | `POST /api/v1/games` | `genreId` inexistente produce `400` por error Prisma `P2003`. |

### RF03 — Scores

Archivo: `src/modules/scores/__tests__/score.api.test.ts`

| Caso | Endpoint | Resultado validado |
|---|---|---|
| CP-RF03-01 | `POST /api/v1/scores` | Puntuación válida produce `201 Created`. |
| CP-RF03-02 | `POST /api/v1/scores` | Un jugador puede registrar múltiples puntuaciones. |
| CP-RF03-03 | `POST /api/v1/scores` | Puntaje negativo produce `400` con `El puntaje no puede ser negativo.` |
| CP-RF03-04 | `POST /api/v1/scores` | Jugador inexistente produce `400` por referencia inválida. |
| CP-RF03-05 | `POST /api/v1/scores` | Videojuego inexistente produce `400` por referencia inválida. |
| CP-RF03-06 | `POST /api/v1/scores` | Falta de `playerId`, `gameId` o `score` produce `400`. |

### RF04 — Consulta de players

| Caso | Endpoint | Resultado validado |
|---|---|---|
| CP-RF04-01 | `GET /api/v1/players` | Lista paginada, `data` y `totalRecords`. |
| CP-RF04-02 | `GET /api/v1/players/{id}` | Detalle del jugador existente con sus puntuaciones. |
| CP-RF04-03 | `GET /api/v1/players/{id}` | Jugador inexistente produce `404` y `Jugador no encontrado`. |

### RF06 — Ranking

Archivo: `src/modules/scores/__tests__/score.api.test.ts`

| Caso | Endpoint | Resultado validado |
|---|---|---|
| CP-RF06-01 | `GET /api/v1/scores/ranking` | Resultados ordenados de mayor a menor y con posiciones. |
| CP-RF06-02 | `GET /api/v1/scores/ranking?gameId=6` | Ranking filtrado por `gameId`. |

### RF07 — Búsqueda de players

Archivo: `src/modules/players/__tests__/player.api.test.ts`

| Caso | Endpoint | Resultado validado |
|---|---|---|
| CP-RF07-01 | `GET /api/v1/players?name=Carlos` | Filtra por nombre usando búsqueda parcial. |
| CP-RF07-02 | `GET /api/v1/players?gamertag=ShadowQA` | Filtra por gamertag usando búsqueda parcial. |
| CP-RF07-03 | `GET /api/v1/players?name=InexistenteXYZ` | Devuelve `200` con lista vacía y `totalRecords: 0`. |

### RF08 — Estadísticas

Archivo: `src/modules/scores/__tests__/score.api.test.ts`

| Caso | Endpoint | Resultado validado |
|---|---|---|
| CP-RF08-01 | `GET /api/v1/scores/stats` | Devuelve `totalPlayers`, `totalGames`, `totalScores` y `averageScore`. |

## Pruebas del core

| Suite | Verificaciones |
|---|---|
| `date-filter.test.ts` | Semana, mes, semestre, año y rangos personalizados con fechas controladas. |
| `error-handler.test.ts` | Convierte excepciones desconocidas en HTTP 500 con mensaje en español. |
| `pagination.test.ts` | Valores por defecto, parámetros válidos, valores inválidos y respuesta paginada. |
| `pagination-middleware.test.ts` | Guarda `page`, `limit`, `skip` y `take` en `res.locals.pagination`. |
| `query-filters.test.ts` | Normaliza strings, convierte parámetros numéricos y descarta filtros legacy/no permitidos. |
| `register-core-middlewares.test.ts` | Confirma el orden y funcionamiento de los middlewares globales. |
| `validation-middleware.test.ts` | Devuelve `400` y mensajes de Zod en español sin ejecutar el controlador. |
| `public-games.util.test.ts` | Descarta registros inválidos y elimina títulos duplicados del payload público. |

## Pruebas de aplicación y documentación

`tests/app.test.ts` ejecuta la aplicación completa en un puerto temporal y verifica:

- `GET /` responde `200` y anuncia las rutas `/api/v1/*`.
- El header `X-Powered-By` no se expone.
- `GET /openapi.json` responde `200` con OpenAPI `3.0.3`.
- El contrato contiene las rutas versionadas de players y ranking.
- `GET /docs` responde `200` con HTML de Scalar.
- El API permite el origen configurado del frontend mediante CORS.

## Ejecución

Ejecutar toda la suite:

```bash
npm test -- --runInBand
```

Ejecutar un módulo específico:

```bash
npm test -- --runInBand src/modules/players/__tests__/player.api.test.ts
npm test -- --runInBand src/modules/genres/__tests__/genre.api.test.ts
npm test -- --runInBand src/modules/games/__tests__/game.api.test.ts
npm test -- --runInBand src/modules/scores/__tests__/score.api.test.ts
```

Ejecutar únicamente las pruebas del core:

```bash
npm test -- --runInBand src/core/__tests__
```

Ejecutar en modo observación:

```bash
npm test -- --watch
```

## Resultado de la última ejecución

```text
Test Suites: 14 passed, 14 total
Tests:       60 passed, 60 total
```

## Alcance y limitaciones

- Estas pruebas son unitarias y de aplicación en memoria; no reemplazan pruebas de integración contra MySQL/MariaDB.
- Prisma se mockea para aislar controladores, middlewares y servicios.
- La carga real del seeder y la conexión con una base de datos deben validarse con un entorno local o de integración separado.
- Scalar se prueba mediante el endpoint HTTP de documentación; la interacción visual del navegador queda fuera del alcance de Jest.
