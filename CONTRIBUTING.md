# Contribuir a Tournament Manager

Gracias por dedicar tiempo a mejorar Tournament Manager. Puedes contribuir con código, pruebas, documentación, reportes de bugs o propuestas de funcionalidades.

Estas reglas explican cómo preparar el proyecto, abrir cambios y facilitar su revisión. Si algo no está claro, abre un issue describiendo la duda y el contexto.

## Reglas de colaboración

- Abre un issue antes de comenzar cambios grandes para confirmar el alcance.
- Mantén los pull requests pequeños y relacionados con un solo propósito.
- No incluyas secretos, credenciales, archivos `.env` ni datos reales en commits o issues.
- Agrega o actualiza pruebas cuando cambies el comportamiento de la aplicación.
- Revisa la [licencia MIT](LICENSE) antes de contribuir.

## Tu primera contribución

Para empezar, revisa los issues abiertos y busca los que indiquen una tarea concreta. También son útiles las contribuciones pequeñas:

- corregir documentación o mensajes de error;
- agregar o mejorar pruebas;
- reportar un bug reproducible;
- mejorar la accesibilidad o la experiencia de uso;
- actualizar ejemplos de la API.

Si no sabes por dónde empezar, comenta en el issue antes de implementar.

## Preparar el proyecto

El proyecto requiere Node.js 24.x, npm 11.19.0 y MySQL 8 para trabajar con el API.

Desde la raíz del repositorio:

```bash
npm ci
```

Para trabajar con el API, copia [`apps/api/.env.example`](apps/api/.env.example), configura `DATABASE_URL` y prepara la base de datos. Consulta la sección [Instalación local](README.md#instalación-local) para los pasos completos.

Comandos principales:

```bash
npm run dev       # API y web
npm run dev:api   # solo API
npm run dev:web   # solo web
npm test
npm run lint
npm run build
npm run check     # lint, pruebas y build
```

Usa el único `package-lock.json` de la raíz. No agregues lockfiles dentro de `apps/api` o `apps/web`.

## Crear una rama

Parte de `develop` para funcionalidades y correcciones normales. `main` representa producción.

Usa nombres descriptivos, en minúsculas y separados por guiones:

```text
feature/ranking-by-game
bugfix/empty-player-name
hotfix/api-health-check
release/1.1.0
```

No trabajes directamente sobre `main` o `develop`.

## Realizar cambios

- La lógica del API pertenece al módulo de dominio correspondiente dentro de `apps/api/src/modules`.
- La web se organiza por feature; consulta las reglas de [`apps/web/AGENTS.md`](apps/web/AGENTS.md).
- Si cambias un endpoint público, actualiza [`docs/apps/api/API_DOCUMENTATION.md`](docs/apps/api/API_DOCUMENTATION.md).
- Si cambias el esquema de Prisma, incluye la migración en `apps/api/prisma/migrations` y mantenla compatible con la versión anterior.
- Revisa el diff antes de enviar el cambio y elimina modificaciones no relacionadas.

## Commits

Usa [Conventional Commits](https://www.conventionalcommits.org/) con un alcance opcional:

```text
feat(api): add ranking filter
fix(web): show empty scores state
docs: update contributing guide
```

Tipos habituales: `feat`, `fix`, `docs`, `refactor`, `test`, `chore` y `ci`.

## Reportar un bug

Usa la plantilla de [reporte de bug](.github/ISSUE_TEMPLATE/bug_report.md) e incluye:

- qué ocurrió y qué esperabas que ocurriera;
- pasos mínimos para reproducirlo;
- aplicación afectada: API o web;
- navegador, cliente, rama o commit cuando aplique;
- logs o capturas sin información sensible.

No publiques vulnerabilidades de seguridad en un issue. Contacta a las personas mantenedoras por un canal privado de GitHub con los detalles necesarios para reproducirlas.

## Proponer una funcionalidad

Usa la plantilla de [solicitud de funcionalidad](.github/ISSUE_TEMPLATE/feature_request.md). Explica:

- qué problema resuelve;
- quién se beneficia;
- cómo debería comportarse;
- criterios de aceptación;
- alternativas consideradas, si las hay.

Espera a que el alcance se confirme antes de invertir en una implementación grande.

## Pull requests

1. Abre el pull request hacia `develop`, salvo que el flujo de release o hotfix indique otra rama.
2. Completa la [plantilla de pull request](.github/pull_request_template.md).
3. Relaciona el issue correspondiente, por ejemplo: `Closes #123`.
4. Describe qué cambió y cómo lo verificaste.
5. Ejecuta la validación completa antes de solicitar revisión:

   ```bash
   npm run check
   ```
6. Atiende los comentarios de revisión y actualiza la descripción si cambia el alcance.

La integración continua debe pasar las pruebas, el lint y el build del workspace afectado antes de integrar el cambio.

## Proceso de revisión

Las personas mantenedoras revisarán el alcance, la claridad del código, las pruebas, la documentación y la compatibilidad con la arquitectura existente. Un pull request puede solicitar cambios, quedar en espera de una decisión sobre el alcance o cerrarse si no encaja con las necesidades del proyecto.

## Comunidad

Los issues y pull requests de GitHub son los canales principales para discutir el desarrollo. Mantén las conversaciones públicas cuando no incluyan información sensible para que puedan ayudar a futuras personas colaboradoras.
