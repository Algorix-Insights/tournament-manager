# Código de testing del API

## 1. Propósito

Este documento explica cómo están implementadas las pruebas del API y cómo se aísla cada dependencia para verificar el comportamiento HTTP sin conectarse a la base de datos real.

La prueba pasa por Express, los middlewares, el router, el controller y el service. La única capa reemplazada es Prisma.

```text
fetch de prueba
    ↓
Express app
    ↓
middlewares globales + validación Zod
    ↓
router versionado /api/v1
    ↓
controller
    ↓
service
    ↓
mock de Prisma
```

Por esto, las pruebas de los módulos son pruebas de API en proceso con aislamiento unitario de persistencia.

## 2. Configuración de Jest

La configuración vive en `package.json`:

```json
{
  "preset": "ts-jest",
  "testEnvironment": "node",
  "testPathIgnorePatterns": ["/node_modules/", "/dist/"],
  "modulePathIgnorePatterns": ["/node_modules/", "/dist/"],
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1"
  }
}
```

### Alias de imports

`moduleNameMapper` permite que Jest resuelva imports como:

```typescript
import app from '@/server';
import { prisma } from '@/core/prisma';
```

El segundo mapper permite ejecutar imports relativos `.js` escritos para NodeNext/TypeScript.

### Mock de Scalar

El paquete de Scalar es ESM y las suites actuales se ejecutan con Jest en CommonJS. Por eso `setupFiles` carga `src/test-utils/scalar.mock.ts` antes de importar la aplicación:

```typescript
jest.mock('@scalar/express-api-reference', () => ({
  apiReference: () => (_request, response) => {
    response.type('html').send('<!doctype html><html><body>Scalar API Reference</body></html>');
  },
}));
```

Esto solo afecta a Jest. El servidor normal importa y utiliza el middleware real de Scalar.

## 3. Mock manual de Prisma

Archivo: `src/core/__mocks__/prisma.ts`

Las suites activan el mock con:

```typescript
jest.mock('@/core/prisma');
```

Jest busca el mock manual en `src/core/__mocks__/prisma.ts`. Cada modelo comparte los métodos CRUD:

```typescript
const model = () => ({
  findMany: jest.fn(),
  count: jest.fn(),
  findUnique: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});
```

El objeto final contiene:

```text
prisma.player
prisma.genre
prisma.game
prisma.score
```

El modelo `score` agrega también `aggregate`, necesario para las estadísticas.

El mock permite comprobar dos cosas separadas:

1. qué respuesta produce la API;
2. qué consulta o método de persistencia intentó ejecutar el service.

## 4. Utilidad `api-test-utils`

Archivo: `src/test-utils/api-test-utils.ts`

### Referencia tipada al mock

```typescript
export const database = prisma as unknown as MockDatabase;
```

`database` expone los mocks de Prisma para configurar cada escenario:

```typescript
database.player.create.mockResolvedValue(player);
database.score.create.mockRejectedValue({ code: 'P2003' });
```

### Restablecimiento por prueba

`resetDatabaseMocks` se ejecuta en `beforeEach` y:

- limpia llamadas anteriores con `jest.clearAllMocks()`;
- configura arrays vacíos como resultado predeterminado;
- configura conteos en cero;
- configura `score.aggregate` con promedio `null`;
- configura `findUnique` en `null`.

Así, una prueba no depende de la ejecución previa de otra.

### Servidor temporal

`setupApiTest(app)` registra hooks de Jest:

```text
beforeAll  → inicia Express en 127.0.0.1 con puerto aleatorio
beforeEach → restablece todos los mocks de Prisma
afterAll   → restaura console.error y cierra el servidor
```

Cada suite obtiene un cliente pequeño:

```typescript
const api = setupApiTest(app);
```

### Cliente HTTP

`api.request(path, method, body)`:

- obtiene el puerto asignado al servidor temporal;
- envía la solicitud con `fetch` nativo;
- agrega `content-type: application/json`;
- serializa el body con `JSON.stringify` cuando existe;
- devuelve la respuesta HTTP sin transformarla.

Para leer respuestas JSON se utiliza:

```typescript
const result = await readJson(response);
```

## 5. Estructura de una prueba de módulo

El patrón utilizado en cada módulo es:

```typescript
import { describe, expect, jest, test } from '@jest/globals';

jest.mock('@/core/prisma');

import app from '@/server';
import { database, readJson, setupApiTest } from '@/test-utils/api-test-utils';

const api = setupApiTest(app);
```

El mock se declara antes de importar `server` para que los routers construyan services conectados al Prisma simulado.

### Caso exitoso

```typescript
test('registra un jugador con datos válidos', async () => {
  const player = {
    id: 8,
    name: 'Carlos Mendoza',
    gamertag: 'ShadowQA',
    email: 'carlos@test.com',
  };

  database.player.create.mockResolvedValue(player);

  const response = await api.request('/api/v1/players', 'POST', player);

  expect(response.status).toBe(201);
  expect(await readJson(response)).toEqual(player);
});
```

La prueba configura el resultado del repository mockeado, realiza una solicitud real contra Express y valida el status y el JSON enviado por el controller.

### Caso de validación

```typescript
test('rechaza un jugador sin nombre', async () => {
  const response = await api.request('/api/v1/players', 'POST', {
    gamertag: 'NoName',
    email: 'noname@test.com',
  });

  const result = await readJson(response);

  expect(response.status).toBe(400);
  expect(result.error).toBe('Error de validación');
  expect(result.details).toEqual(
    expect.arrayContaining([expect.objectContaining({ field: 'name' })]),
  );
  expect(database.player.create).not.toHaveBeenCalled();
});
```

Además de comprobar la respuesta, se comprueba que Zod detuvo la solicitud antes de llegar a Prisma.

### Error de persistencia

Los errores Prisma se simulan con sus códigos:

```typescript
database.player.create.mockRejectedValue({ code: 'P2002' });

const response = await api.request('/api/v1/players', 'POST', data);

expect(response.status).toBe(400);
expect((await readJson(response)).error).toBe(
  'Ya existe un registro con los datos proporcionados',
);
```

Este patrón verifica la integración entre service, propagación de la excepción y `apiErrorHandler`.

### Casos parametrizados

Cuando cambia únicamente el campo inválido, se usa `test.each`:

```typescript
test.each([
  [{ gamertag: 'NoName', email: 'noname@test.com' }, 'name'],
  [{ name: 'Carlos', email: 'nogamer@test.com' }, 'gamertag'],
  [{ name: 'Carlos', gamertag: 'NoMail' }, 'email'],
])('rechaza el campo obligatorio %s', async (body, field) => {
  const response = await api.request('/api/v1/players', 'POST', body);
  const result = await readJson(response);

  expect(response.status).toBe(400);
  expect(result.details).toEqual(
    expect.arrayContaining([expect.objectContaining({ field })]),
  );
});
```

Esto mantiene un solo cuerpo de prueba para escenarios equivalentes.

## 6. Qué verifica cada suite

| Suite | Archivo | Verificaciones |
|---|---|---|
| Players | `src/modules/players/__tests__/player.api.test.ts` | Registro, campos obligatorios, duplicados, listado, detalle y búsquedas por nombre/gamertag. |
| Genres | `src/modules/genres/__tests__/genre.api.test.ts` | Registro válido y género duplicado. |
| Games | `src/modules/games/__tests__/game.api.test.ts` | Registro, campos obligatorios, nombre duplicado y género inexistente. |
| Scores | `src/modules/scores/__tests__/score.api.test.ts` | Registro, múltiples puntuaciones, puntaje negativo, relaciones inválidas, ranking y estadísticas. |
| Core | `src/core/__tests__/*.test.ts` | Filtros, paginación, fechas, validación, errores, middlewares y normalización del catálogo público. |
| Aplicación | `tests/app.test.ts` | Health check, prefijo `/api/v1`, OpenAPI y respuesta HTML de Scalar. |

## 7. Pruebas unitarias del core

Las pruebas del core no necesitan levantar todos los módulos:

- `date-filter.test.ts` usa fake timers para fijar la fecha actual y obtener resultados deterministas.
- `pagination.test.ts` prueba directamente `parsePaginationParams` y `formatPaginatedResponse`.
- `pagination-middleware.test.ts` prueba la escritura en `res.locals.pagination`.
- `query-filters.test.ts` prueba normalización, conversión numérica y descarte de parámetros no permitidos.
- `validation-middleware.test.ts` utiliza un request y response mínimos para comprobar Zod.
- `error-handler.test.ts` utiliza un response mínimo y espía `console.error`.
- `register-core-middlewares.test.ts` levanta una app pequeña para comprobar el orden de middlewares.
- `public-games.util.test.ts` prueba la limpieza y deduplicación del payload externo.

Cuando no hace falta Express, se invoca directamente la función bajo prueba. Cuando se necesita comprobar el comportamiento del middleware, se construyen objetos mínimos compatibles con `Request`, `Response` y `NextFunction`.

## 8. Pruebas de la aplicación

`tests/app.test.ts` no activa Prisma mockeado porque sus casos no consultan datos. Inicia la aplicación en un puerto temporal y comprueba:

- `GET /` devuelve la información de disponibilidad;
- las URLs anunciadas utilizan `/api/v1`;
- `X-Powered-By` no aparece en la respuesta;
- `GET /openapi.json` devuelve OpenAPI `3.0.3`;
- el contrato contiene rutas versionadas;
- `GET /docs` devuelve HTML de la documentación.

## 9. Convenciones para agregar pruebas

1. Colocar la prueba dentro de `<module>/__tests__` para el comportamiento del módulo.
2. Activar `jest.mock('@/core/prisma')` antes de importar `server`.
3. Utilizar rutas `/api/v1/*`.
4. Preparar explícitamente `mockResolvedValue` o `mockRejectedValue`.
5. Verificar status y cuerpo de respuesta.
6. Comprobar que Prisma no se llamó cuando falla la validación.
7. Verificar los argumentos del mock cuando el caso cubra filtros, orden o paginación.
8. Usar mensajes de error en español en las expectativas.
9. Si la prueba crea un servidor manualmente, cerrarlo en `finally`.

## 10. Comandos

Suite completa:

```bash
npm test -- --runInBand
```

Suite de un módulo:

```bash
npm test -- --runInBand src/modules/players/__tests__/player.api.test.ts
```

Pruebas del core:

```bash
npm test -- --runInBand src/core/__tests__
```

Modo observación:

```bash
npm test -- --watch
```

Cobertura:

```bash
npm test -- --runInBand --coverage
```

## 11. Resultado validado

La última ejecución completa registrada fue:

```text
Test Suites: 13 passed, 13 total
Tests:       54 passed, 54 total
```

## 12. Alcance

Estas pruebas no sustituyen una prueba de integración con MySQL/MariaDB. Para probar migraciones, restricciones, relaciones reales o el seeder completo se requiere una base de datos de integración separada.
