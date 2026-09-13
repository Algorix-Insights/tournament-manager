# Componentes UI locales basados en HeroUI

## Objetivo

Exponer todos los componentes React disponibles en HeroUI v3 mediante una
capa local editable en `apps/web/src/core/ui`, sin copiar el código interno de
la dependencia y sin usar archivos barril.

## Diseño aprobado

- Los componentes simples vivirán en un archivo directo, por ejemplo
  `src/core/ui/button.tsx`.
- Los componentes compuestos tendrán un directorio propio con un componente
  padre y archivos separados para sus partes, por ejemplo:

  ```text
  src/core/ui/card/Card.tsx
  src/core/ui/card/Content.tsx
  src/core/ui/card/Header.tsx
  ```

- El padre compondrá las partes locales y conservará la API compuesta de
  HeroUI. Las features importarán desde el archivo concreto que usan, nunca
  desde `core/ui/index.ts` ni desde otro barril.
- Los wrappers importarán directamente desde `@heroui/react`, mantendrán las
  props y tipos del componente original y dejarán un punto local para añadir
  clases, defaults o comportamiento del producto.
- No se copiarán implementaciones internas de HeroUI ni se añadirá una nueva
  dependencia.

## Alcance

Se cubrirá la lista de componentes publicada en la documentación actual de
HeroUI React, incluyendo botones, colecciones, color, controles, datos, fechas,
feedback, formularios, layout, media, navegación, overlays, pickers,
tipografía y utilidades.

No se construirá una página de catálogo ni se rediseñará la aplicación: la
validación será mediante imports directos, compilación y una prueba smoke
mínima para los wrappers no triviales.

## Criterios de aceptación

1. Cada componente documentado tiene un entrypoint local editable.
2. Cada componente compuesto está dividido en archivos dentro de
   `src/core/ui/<component>/` y cuenta con un padre local.
3. No existen archivos `index.ts`, `index.tsx` ni re-exportaciones globales
   para esta capa.
4. Las props TypeScript y la composición pública de HeroUI siguen siendo
   utilizables desde los entrypoints locales.
5. El workspace `web` pasa typecheck, lint, pruebas y build.

## No objetivos

- Sustituir HeroUI por implementaciones propias.
- Añadir estilos de producto a todos los componentes antes de tener un uso
  real.
- Introducir providers, factories, registros globales o aliases adicionales.
