# Tournament Manager - Technical API Documentation

This documentation details the REST API endpoints for the Video Game Tournament Management System, including parameters, validation rules, ordering options, pagination structure, and responses.

---

## 1. Pagination System & Response Format

All endpoints returning paginated lists on `GET` requests adhere to the standardized response format:

```json
{
  "data": [
    /* ... array of paginated records ... */
  ],
  "ROW_COUNT": 45
}
```

### Global Pagination Parameters (Query Params)

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `page` | Integer | No | `1` | Page number to retrieve (min: 1). |
| `limit` | Integer | No | `20` | Number of items per page (min: 1). |

*(Note: Legacy Spanish query parameters `pagina` and `cantidadRegistros` are also supported for backward compatibility).*

---

## 2. Endpoints by Entity

### 👤 Players (`/api/players`)

#### `GET /api/players`
Retrieves a paginated list of players with filtering and ordering.

Each player includes a `games` array with the games played, the best score recorded for each game, and the games ordered from highest to lowest score.

- **Filter Parameters (Query Params):**
  - `name` *(String, optional, max 100 chars)*: Partial case-insensitive search by name.
  - `gamertag` *(String, optional, max 50 chars)*: Partial case-insensitive search by gamertag.
  - `email` *(String, optional, max 100 chars)*: Partial search by email address.
  - `search` *(String, optional)*: General search matching name.
  - `period` *(Integer, optional)*: Days elapsed or period enum (e.g., `1` for current week, `3` for current month).
  - `startDate` *(String ISO YYYY-MM-DD, optional)*: Registration start date filter.
  - `endDate` *(String ISO YYYY-MM-DD, optional)*: Registration end date filter.
  - `page` *(Integer, optional, def: 1)*.
  - `limit` *(Integer, optional, def: 20)*.

- **Sorting Options (`order`):**
  - Prefix with `-` for descending, or omit for ascending (e.g., `name`, `-name`, `gamertag`, `-gamertag`, `email`, `-email`, `createdAt`, `-createdAt`).
  - Default: `-createdAt` (newest first).

#### `GET /api/players/:id`
Retrieves full details for a player, including their score history and played games.
- **Route Parameters:** `id` *(Integer, required, min: 1)*.

#### `POST /api/players`
Registers a new player in the system.
- **Request Body (JSON):**
  ```json
  {
    "name": "Carlos Mendoza",
    "gamertag": "Shadow",
    "email": "shadow@example.com"
  }
  ```
  - `name` *(String, required, min 1, max 100 chars)*.
  - `gamertag` *(String, required, unique, min 1, max 50 chars)*.
  - `email` *(String, required, unique, min 5, max 100 chars)*.

If the `gamertag` or `email` is already registered, the endpoint responds with HTTP `400` and a specific message in the `error` property.

#### `PUT /api/players/:id`
Updates an existing player's details.
- **Route Parameters:** `id` *(Integer, required)*.
- **Request Body (JSON, optional fields):**
  ```json
  {
    "name": "Carlos Mendoza Jr.",
    "gamertag": "ShadowMaster",
    "email": "shadow_new@example.com"
  }
  ```

#### `DELETE /api/players/:id`
Deletes a player by ID (cascades to their registered scores).
- **Route Parameters:** `id` *(Integer, required)*.

---

### 🎮 Games (`/api/games`)

#### `GET /api/games`
Retrieves a paginated list of registered games.

- **Filter Parameters (Query Params):**
  - `name` *(String, optional, max 100 chars)*: Partial search by game name.
  - `genreId` *(Integer, optional)*: Exact filter by genre ID.
  - `genreName` *(String, optional, max 50 chars)*: Partial search by genre name.
  - `page` *(Integer, optional, def: 1)*.
  - `limit` *(Integer, optional, def: 20)*.

- **Sorting Options (`order`):**
  - `name`, `-name` *(default: `name` ascending)*
  - `id`, `-id`
  - `genre`, `-genre`

#### `GET /api/games/:id`
Retrieves details for a game by ID, including genre and associated scores.
- **Route Parameters:** `id` *(Integer, required)*.

#### `POST /api/games`
Registers a new game in the catalog.
- **Request Body (JSON):**
  ```json
  {
    "name": "Tekken 8",
    "genreId": 1
  }
  ```
  - `name` *(String, required, unique, min 1, max 100 chars)*.
  - `genreId` *(Integer, required, existing genre ID)*.

#### `PUT /api/games/:id`
Updates an existing game.
- **Route Parameters:** `id` *(Integer, required)*.
- **Request Body (JSON, optional fields):**
  ```json
  {
    "name": "Tekken 8 Ultimate",
    "genreId": 1
  }
  ```

#### `DELETE /api/games/:id`
Deletes a game from the catalog.
- **Route Parameters:** `id` *(Integer, required)*.

---

### 🏷️ Genres (`/api/genres`)

#### `GET /api/genres`
Retrieves a paginated list of genres with their associated game count (`_count.games`).

- **Filter Parameters (Query Params):**
  - `name` *(String, optional, max 50 chars)*: Partial search by genre name.
  - `page` *(Integer, optional, def: 1)*.
  - `limit` *(Integer, optional, def: 20)*.

- **Sorting Options (`order`):**
  - `name`, `-name` *(default: `name` ascending)*
  - `id`, `-id`

#### `GET /api/genres/:id`
Retrieves a genre by ID including its associated games list.

#### `POST /api/genres`
Creates a new genre.
- **Request Body (JSON):**
  ```json
  {
    "name": "Fighting"
  }
  ```
  - `name` *(String, required, unique, min 1, max 50 chars)*.

#### `PUT /api/genres/:id`
Updates an existing genre.
- **Route Parameters:** `id` *(Integer, required)*.
- **Request Body (JSON):**
  ```json
  {
    "name": "Action / Fighting"
  }
  ```

#### `DELETE /api/genres/:id`
Deletes a genre (restricted if it has associated games).

---

### 🏆 Scores and Rankings (`/api/scores`)

#### `GET /api/scores`
Retrieves the paginated list of recorded match scores.

- **Filter Parameters (Query Params):**
  - `playerId` *(Integer, optional)*: Filter by player ID.
  - `gameId` *(Integer, optional)*: Filter by game ID.
  - `genreId` *(Integer, optional)*: Filter by genre ID.
  - `minScore` *(Integer, optional, min: 0)*: Minimum score.
  - `maxScore` *(Integer, optional, min: 0)*: Maximum score.
  - `period` *(Integer, optional)*: Period filter.
  - `startDate` / `endDate` *(String ISO YYYY-MM-DD)*.
  - `page` *(Integer, optional, def: 1)*.
  - `limit` *(Integer, optional, def: 20)*.

- **Sorting Options (`order`):**
  - `score`, `-score`
  - `createdAt`, `-createdAt` *(default: `-createdAt`)*
  - `player`, `-player`
  - `game`, `-game`

#### `POST /api/scores`
Registers a new game score.
- **Request Body (JSON):**
  ```json
  {
    "playerId": 1,
    "gameId": 2,
    "score": 950
  }
  ```
  - `playerId` *(Integer, required, existing player ID)*.
  - `gameId` *(Integer, required, existing game ID)*.
  - `score` *(Integer, required, min: 0)*.

#### `DELETE /api/scores/:id`
Deletes a score record by its ID.

#### `GET /api/scores/ranking`
Retrieves the paginated leaderboard ranking.
- Default ordering: Highest score to lowest (`-score`).
- Each player is returned once and includes their played games ordered from highest to lowest score.
- Each item in `data` includes:
  ```json
  {
    "position": 1,
    "playerId": 1,
    "player": "Shadow",
    "playerName": "Carlos Mendoza",
    "gameId": 2,
    "game": "Tekken 8",
    "genre": "Fighting",
    "score": 950,
    "createdAt": "2026-09-12T16:00:00.000Z"
  }
  ```

#### `GET /api/scores/stats`
Returns global tournament metrics:
```json
{
  "totalPlayers": 15,
  "totalGames": 5,
  "totalScores": 45,
  "averageScore": 867.14
}
```
*(Note: Legacy properties `totalJugadores`, `totalVideojuegos`, `totalPuntuaciones`, and `puntuacionPromedio` are also returned for backwards compatibility).*
