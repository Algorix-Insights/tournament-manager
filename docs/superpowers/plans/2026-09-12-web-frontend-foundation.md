# Web Frontend Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configurar HeroUI v3, React Router declarativo y Jest en la aplicación React 19, y documentar sus reglas de desarrollo para agentes.

**Architecture:** `main.tsx` será el único límite del router del navegador y `App.routes.tsx` compondrá las páginas existentes por dominio. HeroUI se configurará globalmente mediante CSS y se comprobará con un único componente real; Jest verificará las rutas desde la experiencia visible del usuario.

**Tech Stack:** React 19, TypeScript, Vite, HeroUI v3, Tailwind CSS 4, React Router declarativo, Jest 30, Testing Library.

**Spec:** `docs/superpowers/specs/2026-09-12-web-frontend-foundation-design.md`

## Global Constraints

- Mantener Screaming Architecture bajo `src/features/<dominio>`.
- Usar React Router exclusivamente en modo declarativo.
- No agregar un provider global para HeroUI v3.
- Ejecutar los comandos del equipo desde la raíz del monorepo.
- No crear abstracciones que todavía no tengan dos consumidores reales.

---

### Task 1: Dependencias y estilos de HeroUI

**Files:**
- Modify: `apps/web/package.json`
- Modify: `package-lock.json`
- Modify: `apps/web/src/index.css`
- Modify: `apps/web/src/app/App.tsx`

**Interfaces:**
- Consumes: el workspace npm `web` y la portada `App` existente.
- Produces: HeroUI disponible mediante `@heroui/react` y sus estilos globales mediante `@heroui/styles`.

- [x] **Step 1: Instalar las dependencias del frontend**

Run: `npm install --workspace=web @heroui/react @heroui/styles react-router`

Expected: `apps/web/package.json` y `package-lock.json` registran las tres dependencias.

- [x] **Step 2: Cargar los estilos en el orden requerido**

```css
@import "tailwindcss";
@import "@heroui/styles";
```

- [x] **Step 3: Comprobar HeroUI con el mínimo componente real**

```tsx
import { Card } from '@heroui/react'

<Card className="mt-10">
  <Card.Content className="grid gap-6 md:grid-cols-3">
    <PlayersPage />
    <GamesPage />
    <ScoresPage />
  </Card.Content>
</Card>
```

- [x] **Step 4: Ejecutar la prueba existente de la portada**

Run: `npm test --workspace=web -- --runInBand src/app/__tests__/App.test.tsx`

Expected: PASS, con los encabezados Players, Games y Scores visibles.

### Task 2: Enrutado declarativo probado con TDD

**Files:**
- Create: `apps/web/src/routes/__tests__/App.routes.test.tsx`
- Modify: `apps/web/src/routes/App.routes.tsx`
- Modify: `apps/web/src/main.tsx`

**Interfaces:**
- Consumes: `App`, `DashboardPage`, `PlayersPage`, `GamesPage` y `ScoresPage`.
- Produces: `AppRoutes(): JSX.Element`, montado dentro de `BrowserRouter`.

- [x] **Step 1: Escribir la prueba fallida de las rutas**

```tsx
import { expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import AppRoutes from '@/routes/App.routes'

test.each([
  ['/', 'Tournament Manager'],
  ['/dashboard', 'Dashboard'],
  ['/players', 'Players'],
  ['/games', 'Games'],
  ['/scores', 'Scores'],
  ['/missing', 'Tournament Manager'],
])('renders %s as %s', (path, heading) => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
  expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
})
```

- [x] **Step 2: Verificar RED**

Run: `npm test --workspace=web -- --runInBand src/routes/__tests__/App.routes.test.tsx`

Expected: FAIL porque `App.routes.tsx` todavía no exporta el árbol de rutas.

- [x] **Step 3: Implementar las rutas mínimas**

```tsx
import { Navigate, Route, Routes } from 'react-router'
import App from '@/app/App'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import GamesPage from '@/features/games/pages/GamesPage'
import PlayersPage from '@/features/players/pages/PlayersPage'
import ScoresPage from '@/features/scores/pages/ScoresPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/players" element={<PlayersPage />} />
      <Route path="/games" element={<GamesPage />} />
      <Route path="/scores" element={<ScoresPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
```

- [x] **Step 4: Montar el router del navegador**

```tsx
<StrictMode>
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
</StrictMode>
```

- [x] **Step 5: Verificar GREEN**

Run: `npm test --workspace=web -- --runInBand src/routes/__tests__/App.routes.test.tsx`

Expected: PASS para las seis entradas.

### Task 3: Setup de Jest y guía para agentes

**Files:**
- Create: `apps/web/src/tests/setup.ts`
- Modify: `apps/web/package.json`
- Modify: `apps/web/jest.config.cjs`
- Modify: `apps/web/tsconfig.app.json`
- Modify: `apps/web/src/App.test.tsx`
- Modify: `apps/web/src/app/__tests__/App.test.tsx`
- Modify: `apps/web/src/routes/__tests__/App.routes.test.tsx`
- Create: `apps/web/AGENTS.md`

**Interfaces:**
- Consumes: Jest con `jsdom`, Testing Library y los scripts raíz del monorepo.
- Produces: matchers DOM globales y reglas locales para cualquier agente que modifique `apps/web`.

- [x] **Step 1: Ejecutar Jest y ts-jest como ESM**

Usar `node --experimental-vm-modules node_modules/jest/bin/jest.js`, `extensionsToTreatAsEsm` y `useESM: true` para consumir las dependencias ESM de HeroUI.

Incluir `node` en `compilerOptions.types` porque el setup comparte el árbol `src` y reutiliza `TextEncoder` y `TextDecoder` de `node:util`.

- [x] **Step 2: Centralizar los matchers DOM**

```ts
import { TextDecoder, TextEncoder } from 'node:util'
import '@testing-library/jest-dom/jest-globals'

Object.assign(globalThis, { TextDecoder, TextEncoder })
```

Añadir `setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts']` a `jest.config.cjs` y retirar el import repetido de cada prueba.

- [x] **Step 3: Crear `apps/web/AGENTS.md`**

Documentar en español: alcance, estructura por dominio, límites entre `app`, `routes`, `features` y código compartido, convenciones de React 19, HeroUI v3, React Router declarativo, Jest y comandos raíz.

- [x] **Step 4: Verificar el workspace completo**

Run: `npm test --workspace=web -- --runInBand && npm run lint --workspace=web && npm run build --workspace=web`

Expected: todas las suites pasan, Oxlint no informa errores y Vite genera `apps/web/dist`.
