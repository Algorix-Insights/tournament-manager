# React web application setup

## Goal

Initialize `apps/web` as a React application using TypeScript, Vite, Jest, and Tailwind CSS.

## Structure

- Vite builds and serves the React application.
- TypeScript provides static type checking.
- Tailwind CSS v4 runs through the official `@tailwindcss/vite` plugin.
- Jest runs component tests in jsdom, using `ts-jest` for TypeScript and Testing Library for DOM assertions.

The existing `apps/api` application remains unchanged.

## Initial UI

The app renders a small accessible heading and introductory message styled with Tailwind utilities. It exists only to prove that React and Tailwind are wired correctly.

## Commands

- `npm run dev`: start Vite locally.
- `npm run build`: type-check and create the production bundle.
- `npm run lint`: run ESLint.
- `npm test`: run Jest once.

## Verification

One component test renders the application and verifies its heading. Completion requires both `npm test` and `npm run build` to pass from `apps/web`.

## Deliberate exclusions

Routing, state management, API integration, deployment configuration, and custom Tailwind themes are excluded until the product needs them.
