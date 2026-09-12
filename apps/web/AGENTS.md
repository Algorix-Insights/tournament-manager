# Guía para agentes: aplicación web

Este archivo aplica a todo cambio dentro de `apps/web`. Sigue también las instrucciones del `AGENTS.md` raíz; ante un conflicto, estas reglas locales tienen prioridad dentro de este workspace.

## Propósito y stack

La web administra un evento de videojuegos. Está construida con React 19, TypeScript, Vite, Tailwind CSS 4, HeroUI v3, React Router en modo declarativo y Jest con Testing Library.

Referencias oficiales:

- [React 19](https://react.dev/reference/react)
- [HeroUI React](https://heroui.com/en/docs/react/components)
- [React Router declarativo](https://reactrouter.com/start/declarative/routing)
- [Jest](https://jestjs.io/docs/getting-started)

## Arquitectura que debe gritar el dominio

Organiza el código por capacidad del negocio, no por tipo técnico global:

```text
src/
├── app/                         # Composición visual de la aplicación
├── routes/                      # Declaración central de rutas
│   ├── App.routes.tsx           # Router principal que compone los módulos
│   ├── <dominio>.routes.tsx     # Router exclusivo por módulo (dashboard, players, etc.)
│   └── __tests__/               # Pruebas del router y submódulos
├── features/
│   └── <dominio>/               # players, games, scores, dashboard
│       ├── api/                 # Acceso HTTP exclusivo del dominio
│       ├── components/          # Componentes exclusivos del dominio
│       ├── hooks/               # Estado y orquestación del dominio
│       ├── pages/               # Entradas renderizadas por el router
│       ├── __tests__/            # Pruebas del dominio
│       └── <dominio>.types.ts   # Tipos del dominio
├── core/ui/                     # UI genérica compartida de verdad
├── tests/setup.ts               # Setup global de Jest
└── main.tsx                     # Bootstrap de React y BrowserRouter
```

Reglas:

- Crea o modifica primero el feature cuyo nombre describe la necesidad del negocio.
- Una página de ruta vive en `features/<dominio>/pages`; su módulo se enruta en `routes/<dominio>.routes.tsx` y `routes/App.routes.tsx` orquesta los módulos.
- Un feature no debe importar detalles internos de otro feature. La composición entre dominios pertenece a `app` o `routes`.
- Mueve UI a `core/ui` únicamente cuando sea independiente del negocio y tenga al menos dos consumidores reales.
- No agregues carpetas globales como `components`, `hooks`, `services` o `types`; esconderían el dominio y duplicarían los scaffolds existentes.
- Usa el alias `@/` para importar desde `src`.

## React 19

- Escribe componentes funcionales y usa JSX con el runtime automático; no importes `React` solo para JSX.
- Mantén `createRoot` y `StrictMode` exclusivamente en `main.tsx`.
- Conserva el estado cerca del componente o feature que lo necesita. Eleva o comparte estado solo cuando exista un consumidor real.
- Define props y datos del dominio con TypeScript; evita `any`, assertions innecesarias y estado duplicado.
- Usa HTML semántico y nombres accesibles. Un control debe poder encontrarse por rol y nombre en sus pruebas.
- No agregues memoización, contextos o wrappers preventivos sin un problema medido.

## HeroUI v3 y Tailwind CSS

- Importa componentes desde `@heroui/react` y consulta la documentación v3 antes de usar su API.
- Los estilos globales se cargan una sola vez en `src/index.css`, en este orden:

  ```css
  @import "tailwindcss";
  @import "@heroui/styles";
  ```

- HeroUI v3 no requiere `HeroUIProvider`; no lo agregues.
- Prefiere HeroUI para controles y patrones interactivos accesibles. Usa Tailwind para layout, espaciado y ajustes visuales puntuales.
- Respeta las APIs compuestas de v3, por ejemplo `Card.Content`; no copies ejemplos de HeroUI v2 como `CardBody`.
- No recrees botones, modales, inputs, tablas u otros primitives que HeroUI ya ofrece.
- Conserva etiquetas, roles, estados disabled, foco y navegación por teclado al personalizar estilos.

## React Router declarativo

- Importa `BrowserRouter`, `Routes`, `Route`, `Navigate`, `Link` y `NavLink` desde `react-router`.
- Monta un solo `BrowserRouter`, en `main.tsx`.
- Declara las rutas por módulo en `routes/<dominio>.routes.tsx` y compónlas en `routes/App.routes.tsx`; estos archivos pueden importar páginas o sub-routers, pero no contienen reglas de negocio ni llamadas HTTP.
- Usa `Link` o `NavLink` para navegación interna, nunca un `<a>` que recargue la aplicación.
- Prueba componentes enrutados con `MemoryRouter`.
- Este proyecto usa modo declarativo. No introduzcas `createBrowserRouter`, loaders, actions ni APIs de Framework/Data Mode sin una decisión arquitectónica explícita.
- Toda nueva ruta debe tener una página dentro de su feature y una prueba de su resultado visible.

## Jest y Testing Library

- Jest se ejecuta como ESM porque HeroUI publica módulos ESM. No reviertas `useESM`, `extensionsToTreatAsEsm` ni el flag `--experimental-vm-modules` sin reemplazar esa compatibilidad.
- El entorno es `jsdom`. `src/tests/setup.ts` carga `jest-dom` y los globals web requeridos por React Router; no repitas esos imports en cada prueba.
- Importa `expect`, `test`, `describe` y demás APIs desde `@jest/globals`.
- Prueba comportamiento observable: roles, nombres accesibles, contenido y navegación. Evita selectors por clases, estructura interna o snapshots amplios.
- Usa componentes reales. Simula únicamente límites externos como HTTP cuando sea inevitable; no mockees HeroUI ni React Router para comprobar que existen.
- Para cambios de comportamiento, escribe primero una prueba que falle por la ausencia del comportamiento, implementa lo mínimo y vuelve a ejecutar la suite.
- Coloca las pruebas del dominio en su `__tests__`; las pruebas del router permanecen en `routes/__tests__`.

## Flujo de trabajo

Ejecuta los comandos desde la raíz del monorepo:

```bash
npm run dev:web
npm test --workspace=web -- --runInBand
npm run lint --workspace=web
npm run build --workspace=web
npm run check
```

Antes de terminar un cambio:

1. Confirma que el código vive en el feature correcto.
2. Ejecuta las pruebas específicas mientras desarrollas.
3. Ejecuta `npm run check` para validar lint, pruebas y build del monorepo.
4. Revisa el diff y no mezcles cambios ajenos ni refactors no solicitados.

Un cambio está terminado cuando su comportamiento tiene una prueba útil, no introduce errores de lint o TypeScript, compila y mantiene estas fronteras arquitectónicas.
