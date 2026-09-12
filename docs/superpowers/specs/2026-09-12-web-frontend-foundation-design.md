# Fundamentos del frontend web

## Objetivo

Completar la base de `apps/web` con HeroUI v3, React Router en modo declarativo, React 19 y Jest, respetando la organización existente por dominios de negocio (Screaming Architecture). Al terminar, documentar las reglas de desarrollo para agentes en `apps/web/AGENTS.md`.

## Diseño aprobado

- Mantener React 19 con `createRoot` y `StrictMode` en el punto de entrada.
- Instalar `@heroui/react`, `@heroui/styles` y `react-router` en el workspace `web`.
- Importar los estilos de HeroUI después de Tailwind en `src/index.css`. HeroUI v3 no requiere un provider global.
- Montar `BrowserRouter` una sola vez en `src/main.tsx`.
- Declarar las rutas en el archivo existente `src/routes/App.routes.tsx`:
  - `/` muestra la portada actual.
  - `/dashboard`, `/players`, `/games` y `/scores` reutilizan las páginas de sus respectivos dominios.
  - Cualquier ruta desconocida redirige a `/`.
- Usar un componente `Card` de HeroUI en la portada como comprobación real de la integración, sin rediseñar la interfaz.
- Ejecutar Jest/ts-jest en modo ESM porque HeroUI v3 publica su entrada mediante la condición `import`; centralizar la extensión `jest-dom` mediante `setupFilesAfterEnv` y probar el resultado observable de cada ruta con `MemoryRouter`.
- Conservar la estructura `src/features/<dominio>`; el router solo compone páginas y no contiene reglas de negocio.

## Límites

No se crearán layouts, providers, loaders, actions, servicios compartidos ni abstracciones anticipadas. El modo declarativo de React Router es suficiente para el estado actual del producto.

## Referencias

- HeroUI React: https://heroui.com/en/docs/react/getting-started/quick-start
- HeroUI Components: https://heroui.com/en/docs/react/components
- Jest: https://jestjs.io/docs/getting-started
- React Router declarativo: https://reactrouter.com/start/declarative/routing
- React 19: https://react.dev/reference/react
