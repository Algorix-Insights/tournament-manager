# Documentación Técnica de la API - Tournament Manager

Esta documentación detalla los endpoints de la API REST del Sistema de Gestión de Torneos de Videojuegos, sus parámetros, validaciones, límites, opciones de ordenamiento y sistema de paginación.

---

## 1. Sistema de Paginación y Formato de Respuestas

Todos los endpoints que devuelven listados de registros en peticiones `GET` utilizan la siguiente estructura estandarizada:

```json
{
  "data": [
    /* ... arreglo de elementos paginados ... */
  ],
  "ROW_COUNT": 45
}
```

### Parámetros Globales de Paginación (Query Params)

| Parámetro | Tipo | Obligatorio | Valor por Defecto | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `pagina` | Entero | No | `1` | Número de página a consultar (min: 1). |
| `cantidadRegistros` | Entero | No | `20` | Cantidad de elementos por página (min: 1). |

---

## 2. Endpoints por Entidad

### 👤 Jugadores (`/api/players`)

#### `GET /api/players`
Obtiene un listado paginado de jugadores con filtros y ordenamiento.

- **Parámetros de Filtro (Query Params):**
  - `nombre` *(String, opcional, max 100 chars)*: Búsqueda parcial case-insensitive por nombre.
  - `gamertag` *(String, opcional, max 50 chars)*: Búsqueda parcial case-insensitive por gamertag.
  - `correo` *(String, opcional, max 100 chars)*: Búsqueda parcial por correo electrónico.
  - `search` *(String, opcional)*: Búsqueda alternativa general por nombre o gamertag.
  - `periodo` *(Entero, opcional)*: Días transcurridos desde el registro (ej. `7`, `30`, `90`).
  - `fechaInicio` *(String ISO YYYY-MM-DD, opcional)*: Fecha inicial de registro.
  - `fechaFin` *(String ISO YYYY-MM-DD, opcional)*: Fecha final de registro.
  - `pagina` *(Entero, opcional, def: 1)*.
  - `cantidadRegistros` *(Entero, opcional, def: 20)*.

- **Opciones de Ordenamiento (`orden`):**
  - `nombre_asc` / `nombre_desc`
  - `gamertag_asc` / `gamertag_desc`
  - `correo_asc` / `correo_desc`
  - `fecha_asc` / `fecha_desc` *(por defecto: `fecha_desc`)*

#### `GET /api/players/:id`
Obtiene el detalle completo de un jugador, incluyendo su historial de puntuaciones y videojuegos jugados.
- **Parámetros de Ruta:** `id` *(Entero, obligatorio, min: 1)*.

#### `POST /api/players`
Registra un nuevo jugador en el sistema.
- **Cuerpo de la Petición (JSON Body):**
  - `nombre` *(String, obligatorio, min 1, max 100 chars)*: Nombre completo.
  - `gamertag` *(String, obligatorio, único, min 1, max 50 chars)*: Apodo de jugador.
  - `correo` *(String, obligatorio, min 5, max 100 chars)*: Correo electrónico válido.

#### `PUT /api/players/:id`
Actualiza la información de un jugador existente.
- **Parámetros de Ruta:** `id` *(Entero, obligatorio)*.
- **Cuerpo de la Petición (JSON Body, campos opcionales):**
  - `nombre` *(String, max 100 chars)*.
  - `gamertag` *(String, único, max 50 chars)*.
  - `correo` *(String, max 100 chars)*.

#### `DELETE /api/players/:id`
Elimina un jugador por su ID (eliminación en cascada de sus puntuaciones).
- **Parámetros de Ruta:** `id` *(Entero, obligatorio)*.

---

### 🎮 Videojuegos (`/api/games`)

#### `GET /api/games`
Obtiene un listado paginado de videojuegos registrados.

- **Parámetros de Filtro (Query Params):**
  - `nombre` *(String, opcional, max 100 chars)*: Búsqueda parcial por nombre del videojuego.
  - `generoId` *(Entero, opcional)*: Filtro exacto por ID del género.
  - `generoNombre` *(String, opcional, max 50 chars)*: Búsqueda parcial por nombre del género.
  - `pagina` *(Entero, opcional, def: 1)*.
  - `cantidadRegistros` *(Entero, opcional, def: 20)*.

- **Opciones de Ordenamiento (`orden`):**
  - `nombre_asc` / `nombre_desc` *(por defecto: `nombre_asc`)*
  - `id_asc` / `id_desc`
  - `genero_asc` / `genero_desc`

#### `GET /api/games/:id`
Obtiene los detalles de un videojuego por ID, incluyendo género y puntuaciones asociadas.
- **Parámetros de Ruta:** `id` *(Entero, obligatorio)*.

#### `POST /api/games`
Registra un nuevo videojuego en el catálogo.
- **Cuerpo de la Petición (JSON Body):**
  - `nombre` *(String, obligatorio, único, min 1, max 100 chars)*.
  - `generoId` *(Entero, obligatorio, id de género existente)*.

#### `PUT /api/games/:id`
Actualiza un videojuego existente.
- **Parámetros de Ruta:** `id` *(Entero, obligatorio)*.
- **Cuerpo de la Petición (JSON Body, opcionales):** `nombre` *(String)*, `generoId` *(Entero)*.

#### `DELETE /api/games/:id`
Elimina un videojuego del catálogo.
- **Parámetros de Ruta:** `id` *(Entero, obligatorio)*.

---

### 🏷️ Géneros (`/api/genres` o `/api/generos`)

#### `GET /api/genres`
Obtiene la lista paginada de géneros del catálogo con el conteo de videojuegos asociados (`_count.videojuegos`).

- **Parámetros de Filtro (Query Params):**
  - `nombre` *(String, opcional, max 50 chars)*: Búsqueda parcial por nombre.
  - `pagina` *(Entero, opcional, def: 1)*.
  - `cantidadRegistros` *(Entero, opcional, def: 20)*.

- **Opciones de Ordenamiento (`orden`):**
  - `nombre_asc` / `nombre_desc` *(por defecto: `nombre_asc`)*
  - `id_asc` / `id_desc`

#### `GET /api/genres/:id`
Obtiene un género por su ID con sus videojuegos vinculados.

#### `POST /api/genres`
Crea un nuevo género.
- **Cuerpo de la Petición (JSON Body):**
  - `nombre` *(String, obligatorio, único, min 1, max 50 chars)*.

#### `PUT /api/genres/:id`
Actualiza un género existente.

#### `DELETE /api/genres/:id`
Elimina un género (Restringido si tiene videojuegos asociados).

---

### 🏆 Puntuaciones y Ranking (`/api/scores`)

#### `GET /api/scores`
Obtiene el historial paginado de partidas/puntuaciones registradas.

- **Parámetros de Filtro (Query Params):**
  - `jugadorId` *(Entero, opcional)*: Filtro por ID del jugador.
  - `videojuegoId` / `gameId` *(Entero, opcional)*: Filtro por ID del videojuego.
  - `generoId` *(Entero, opcional)*: Filtro por ID de género.
  - `minScore` *(Entero, opcional, min: 0)*: Puntuación mínima.
  - `maxScore` *(Entero, opcional, min: 0)*: Puntuación máxima.
  - `periodo` *(Entero, opcional)*: Días de antigüedad (`7`, `30`, `90`).
  - `fechaInicio` / `fechaFin` *(String ISO YYYY-MM-DD)*.
  - `pagina` *(Entero, opcional, def: 1)*.
  - `cantidadRegistros` *(Entero, opcional, def: 20)*.

- **Opciones de Ordenamiento (`orden`):**
  - `puntuacion_asc` / `puntuacion_desc`
  - `fecha_asc` / `fecha_desc` *(por defecto: `fecha_desc`)*
  - `jugador_asc` / `jugador_desc`
  - `videojuego_asc` / `videojuego_desc`

#### `POST /api/scores`
Registra un nuevo puntaje en el sistema.
- **Cuerpo de la Petición (JSON Body):**
  - `jugadorId` *(Entero, obligatorio, ID existente)*.
  - `videojuegoId` *(Entero, obligatorio, ID existente)*.
  - `puntuacion` *(Entero, obligatorio, min: 0)*.

#### `DELETE /api/scores/:id`
Elimina una puntuación por su ID.

#### `GET /api/scores/ranking`
Obtiene la tabla de clasificación/ranking paginada.
- Ordenamiento predeterminado: Mayor a menor puntaje (`puntuacion_desc`).
- La propiedad `posicion` de cada elemento refleja el rango global real según la página consultada (ej. página 2 con 20 elementos iniciará en posición 21).

#### `GET /api/scores/stats`
Retorna un resumen de métricas del torneo:
```json
{
  "totalJugadores": 15,
  "totalVideojuegos": 5,
  "totalPuntuaciones": 45,
  "puntuacionPromedio": 867.14
}
```
