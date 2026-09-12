# React Frontend Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize `apps/web` as a working React, TypeScript, Vite, Jest, and Tailwind CSS application.

**Architecture:** Vite owns development and production builds, with React as the UI runtime and Tailwind CSS v4 as a Vite plugin. Jest runs TypeScript component tests in jsdom through `ts-jest`; Testing Library verifies rendered behavior.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS v4, Jest, ts-jest, jsdom, Testing Library, ESLint

**Spec:** `docs/superpowers/specs/2026-09-11-react-typescript-jest-tailwind-design.md`

## Global Constraints

- Create the frontend only in `apps/web`.
- Leave `apps/api` unchanged.
- Use the official `@tailwindcss/vite` integration.
- Provide `dev`, `build`, `lint`, and `test` npm scripts.
- Do not add routing, state management, API integration, deployment configuration, or a custom Tailwind theme.

---

### Task 1: Initialize and verify the frontend

**Files:**
- Create: `apps/web/package.json`
- Create: `apps/web/package-lock.json`
- Create: `apps/web/index.html`
- Create: `apps/web/eslint.config.js`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/tsconfig.app.json`
- Create: `apps/web/tsconfig.node.json`
- Create: `apps/web/vite.config.ts`
- Create: `apps/web/jest.config.cjs`
- Create: `apps/web/src/main.tsx`
- Create: `apps/web/src/index.css`
- Create: `apps/web/src/App.tsx`
- Create: `apps/web/src/App.test.tsx`
- Create: `apps/web/src/setupTests.ts`

**Interfaces:**
- Consumes: browser DOM and npm scripts.
- Produces: default `App(): JSX.Element` React component and the commands `npm run dev`, `npm run build`, `npm run lint`, and `npm test`.

- [ ] **Step 1: Generate the React TypeScript Vite project and install only required integrations**

```bash
npm create vite@latest apps/web -- --template react-ts
cd apps/web
npm install
npm install tailwindcss @tailwindcss/vite
npm install --save-dev jest jest-environment-jsdom ts-jest @jest/globals @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 2: Write the failing component test and Jest setup**

```ts
// src/setupTests.ts
import '@testing-library/jest-dom'
```

```tsx
// src/App.test.tsx
import { expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders the tournament manager heading', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /tournament manager/i })).toBeInTheDocument()
})
```

- [ ] **Step 3: Configure Jest and verify the test fails before implementing the page**

```js
// jest.config.cjs
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.app.json' }],
  },
}
```

Add `"test": "jest"` to `package.json`, then run:

```bash
npm test -- --runInBand
```

Expected: FAIL because the generated page has no heading named “Tournament Manager”.

- [ ] **Step 4: Configure Tailwind and implement the minimal page**

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

```css
/* src/index.css */
@import "tailwindcss";
```

```tsx
// src/App.tsx
export default function App() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-6 text-slate-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Tournament Manager</h1>
        <p className="mt-3 text-slate-300">Frontend listo para comenzar.</p>
      </div>
    </main>
  )
}
```

Remove unused Vite demo assets and styles.

- [ ] **Step 5: Verify tests, lint, and production build**

```bash
npm test -- --runInBand
npm run lint
npm run build
```

Expected: all commands exit successfully; `dist/` contains the production bundle.

- [ ] **Step 6: Commit only frontend and plan files**

```bash
git add apps/web docs/superpowers/plans/2026-09-11-react-frontend-setup.md
git commit -m "chore: initialize React frontend"
```
