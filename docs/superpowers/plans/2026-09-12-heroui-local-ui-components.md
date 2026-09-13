# HeroUI Local UI Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Exponer todos los componentes HeroUI v3 desde `apps/web/src/core/ui` mediante entrypoints locales editables, separando los componentes compuestos en directorios y sin archivos barril.

**Architecture:** Cada componente simple tendrá un wrapper local en un archivo PascalCase. Cada componente compuesto tendrá un directorio PascalCase con un archivo padre del mismo nombre y un archivo por parte pública; el padre compondrá las partes sin `index.tsx`. Todos los wrappers importarán directamente desde `@heroui/react`.

**Tech Stack:** React 19, TypeScript 6, HeroUI React 3.2.5, Vite, Jest 30, Testing Library.

**Spec:** `docs/superpowers/specs/2026-09-12-heroui-local-ui-components-design.md`

## Global Constraints

- Los componentes simples vivirán en un archivo directo bajo `apps/web/src/core/ui`.
- Los componentes compuestos vivirán bajo `apps/web/src/core/ui/<Component>/` con un padre local y sus partes.
- No se crearán `index.ts`, `index.tsx` ni re-exportaciones globales.
- Los wrappers importarán directamente desde `@heroui/react`.
- No se copiarán implementaciones internas de HeroUI ni se añadirán dependencias.
- Se conservarán los componentes existentes de `apps/web/src/core/ui`.

---

### Task 1: Registrar la API local esperada con una prueba smoke

**Files:**
- Create: `apps/web/src/core/ui/__tests__/heroui-components.test.tsx`

**Interfaces:**
- Consumes: direct imports from every local HeroUI entrypoint.
- Produces: a single test that fails until all requested entrypoints exist and verifies the parent/part structure for compound components.

- [ ] **Step 1: Write the failing test**

  Import the local files directly, render `Button`, `Card` and `CardContent`, and assert their accessible output. Also assert that the compound parent exposes no barrel dependency by importing the parent and part from their concrete paths.

- [ ] **Step 2: Run the focused test and verify RED**

  Run: `npm test --workspace=web -- --runInBand src/core/ui/__tests__/heroui-components.test.tsx`

  Expected: FAIL because the local entrypoints do not exist yet.

- [ ] **Step 3: Keep the test narrow**

  Do not enumerate implementation details or HeroUI internal class names; assert only that local wrappers render the requested roles/names.

### Task 2: Add simple local wrappers

**Files:**
- Create direct wrappers under `apps/web/src/core/ui`: `Button.tsx`, `CheckboxGroup.tsx`, `CloseButton.tsx`, `ColorField.tsx`, `ColorSwatch.tsx`, `DateField.tsx`, `Description.tsx`, `DisclosureGroup.tsx`, `ErrorMessage.tsx`, `FieldError.tsx`, `Form.tsx`, `Header.tsx`, `Input.tsx`, `Label.tsx`, `ListBoxSection.tsx`, `Menu.tsx`, `MenuSection.tsx`, `RadioGroup.tsx`, `ScrollShadow.tsx`, `Separator.tsx`, `Skeleton.tsx`, `Spinner.tsx`, `Surface.tsx`, `SwitchGroup.tsx`, `TextArea.tsx`, `TextField.tsx`, `TimeField.tsx`, `ToggleButton.tsx`, `Toolbar.tsx`.

**Interfaces:**
- Consumes: named HeroUI exports and their `ComponentProps` types.
- Produces: one locally editable named component per file, preserving the HeroUI props.

- [ ] **Step 1: Implement the smallest wrapper per file**

  Use a local function that accepts the original component props, applies no product-specific styles yet, and returns the HeroUI component. Keep the import local to the file; do not introduce a wrapper registry or shared factory.

- [ ] **Step 2: Run the smoke test**

  Run: `npm test --workspace=web -- --runInBand src/core/ui/__tests__/heroui-components.test.tsx`

  Expected: the simple entrypoints render and the remaining compound imports still fail.

### Task 3: Split compound components into parent directories

**Files:**
- Create directories and direct files under `apps/web/src/core/ui`: `Accordion/`, `Alert/`, `AlertDialog/`, `Autocomplete/`, `Avatar/`, `Badge/`, `Breadcrumbs/`, `ButtonGroup/`, `Calendar/`, `Card/`, `Checkbox/`, `Chip/`, `ColorArea/`, `ColorPicker/`, `ColorSlider/`, `ColorSwatchPicker/`, `ComboBox/`, `DatePicker/`, `DateRangePicker/`, `Disclosure/`, `Drawer/`, `Dropdown/`, `Fieldset/`, `InputGroup/`, `InputOTP/`, `Kbd/`, `Link/`, `ListBox/`, `ListBoxItem/`, `MenuItem/`, `Meter/`, `Modal/`, `NumberField/`, `Pagination/`, `Popover/`, `ProgressBar/`, `ProgressCircle/`, `Radio/`, `RangeCalendar/`, `SearchField/`, `Select/`, `Slider/`, `Switch/`, `Table/`, `Tabs/`, `Tag/`, `TagGroup/`, `Toast/`, `Tooltip/`, `Typography/`.
- Create one direct parent file per directory and one direct `.tsx` file for every React subcomponent exposed by that component's installed HeroUI v3 declaration. Exclude styles, contexts, hooks, queues, and constants.

**Interfaces:**
- Consumes: HeroUI parent and part exports.
- Produces: concrete imports such as `@/core/ui/Card/Card`, `@/core/ui/Card/Content`, and equivalent paths for each compound component; no `index.tsx`.

- [ ] **Step 1: Inspect the installed declarations**

  Use the package's declaration files to match exact component and subcomponent names before writing wrappers; do not guess props or invent parts.

- [ ] **Step 2: Write one failing import assertion for each compound family**

  Extend the smoke test with `Card`, `Modal`, `Table`, `Tabs`, `Select`, and `TextField` parent/part imports and render a minimal accessible instance for each.

- [ ] **Step 3: Implement parents and parts**

  Each parent file composes its local parts and delegates behavior to HeroUI. Each part file imports its HeroUI counterpart directly. Preserve refs and prop types when the package declaration exposes them; do not create a generic forward-ref helper.

- [ ] **Step 4: Run the focused test and verify GREEN**

  Run: `npm test --workspace=web -- --runInBand src/core/ui/__tests__/heroui-components.test.tsx`

  Expected: PASS.

### Task 4: Enforce the no-barrel rule and verify the workspace

**Files:**
- Modify: `apps/web/src/core/ui/__tests__/heroui-components.test.tsx` only if the final direct imports need coverage updates.

**Interfaces:**
- Consumes: all local UI entrypoints.
- Produces: verified local component surface with no barrel files.

- [ ] **Step 1: Check the directory shape**

  Run: `find apps/web/src/core/ui -type f \( -name 'index.ts' -o -name 'index.tsx' \) -print`

  Expected: no output.

- [ ] **Step 2: Run focused tests**

  Run: `npm test --workspace=web -- --runInBand src/core/ui/__tests__/heroui-components.test.tsx`

- [ ] **Step 3: Run workspace verification**

  Run: `npm run check`

  Expected: lint, tests, and builds complete with exit code 0.

- [ ] **Step 4: Review the diff**

  Run: `git diff --check && git status --short`

  Confirm that only the local UI layer, its test, and the approved plan/spec files are changed; preserve unrelated user edits.
