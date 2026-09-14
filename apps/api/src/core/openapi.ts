import swaggerJsdoc from 'swagger-jsdoc';

const pageParameter = {
  name: 'page',
  in: 'query',
  description: 'Número de página',
  schema: { type: 'integer', minimum: 1, default: 1 },
};

const limitParameter = {
  name: 'limit',
  in: 'query',
  description: 'Cantidad máxima de registros',
  schema: { type: 'integer', minimum: 1, default: 10 },
};

const idParameter = (description: string) => ({
  name: 'id',
  in: 'path',
  required: true,
  description,
  schema: { type: 'integer', minimum: 1 },
});

const validationError = {
  description: 'Error de validación',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/ValidationError' },
    },
  },
};

const notFoundError = {
  description: 'Registro no encontrado',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/Error' },
    },
  },
};

const serverError = {
  description: 'Error interno del servidor',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/Error' },
    },
  },
};

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Tournament Manager API',
      version: '1.0.0',
      description: 'API para administrar jugadores, géneros, videojuegos y puntuaciones.',
    },
    servers: [{ url: '/', description: 'Servidor actual' }],
    tags: [
      { name: 'Players', description: 'Administración y búsqueda de jugadores' },
      { name: 'Genres', description: 'Administración de géneros' },
      { name: 'Games', description: 'Administración de videojuegos' },
      { name: 'Scores', description: 'Puntuaciones, ranking y estadísticas' },
    ],
    paths: {
      '/': {
        get: {
          tags: ['Health'],
          summary: 'Verificar disponibilidad de la API',
          responses: {
            200: {
              description: 'API disponible',
              content: { 'application/json': { schema: { type: 'object' } } },
            },
          },
        },
      },
      '/api/v1/players': {
        get: {
          tags: ['Players'],
          summary: 'Listar jugadores',
          parameters: [
            { name: 'name', in: 'query', schema: { type: 'string' } },
            { name: 'gamertag', in: 'query', schema: { type: 'string' } },
            { name: 'email', in: 'query', schema: { type: 'string' } },
            { name: 'search', in: 'query', schema: { type: 'string' } },
            { name: 'period', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 9 } },
            { name: 'startDate', in: 'query', schema: { type: 'string', format: 'date-time' } },
            { name: 'endDate', in: 'query', schema: { type: 'string', format: 'date-time' } },
            { name: 'order', in: 'query', schema: { type: 'string', example: 'name:asc' } },
            pageParameter,
            limitParameter,
          ],
          responses: {
            200: {
              description: 'Lista paginada de jugadores',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/PaginatedPlayers' } } },
            },
            400: validationError,
            500: serverError,
          },
        },
        post: {
          tags: ['Players'],
          summary: 'Registrar jugador',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/PlayerInput' } } },
          },
          responses: {
            201: {
              description: 'Jugador registrado',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Player' } } },
            },
            400: validationError,
            500: serverError,
          },
        },
      },
      '/api/v1/players/{id}': {
        get: {
          tags: ['Players'],
          summary: 'Consultar jugador por ID',
          parameters: [idParameter('Identificador del jugador')],
          responses: {
            200: {
              description: 'Detalle del jugador',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/PlayerDetail' } } },
            },
            400: validationError,
            404: notFoundError,
            500: serverError,
          },
        },
        put: {
          tags: ['Players'],
          summary: 'Actualizar jugador',
          parameters: [idParameter('Identificador del jugador')],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/PlayerUpdate' } } },
          },
          responses: {
            200: {
              description: 'Jugador actualizado',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Player' } } },
            },
            400: validationError,
            404: notFoundError,
            500: serverError,
          },
        },
        delete: {
          tags: ['Players'],
          summary: 'Eliminar jugador',
          parameters: [idParameter('Identificador del jugador')],
          responses: { 200: { description: 'Jugador eliminado' }, 400: validationError, 404: notFoundError, 500: serverError },
        },
      },
      '/api/v1/genres': {
        get: {
          tags: ['Genres'],
          summary: 'Listar géneros',
          parameters: [
            { name: 'name', in: 'query', schema: { type: 'string' } },
            { name: 'search', in: 'query', schema: { type: 'string' } },
            { name: 'order', in: 'query', schema: { type: 'string', example: 'name:asc' } },
            pageParameter,
            limitParameter,
          ],
          responses: {
            200: {
              description: 'Lista paginada de géneros',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/PaginatedGenres' } } },
            },
            400: validationError,
            500: serverError,
          },
        },
        post: {
          tags: ['Genres'],
          summary: 'Registrar género',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/GenreInput' } } },
          },
          responses: {
            201: {
              description: 'Género registrado',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Genre' } } },
            },
            400: validationError,
            500: serverError,
          },
        },
      },
      '/api/v1/genres/{id}': {
        get: {
          tags: ['Genres'],
          summary: 'Consultar género por ID',
          parameters: [idParameter('Identificador del género')],
          responses: {
            200: {
              description: 'Detalle del género',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/GenreDetail' } } },
            },
            400: validationError,
            404: notFoundError,
            500: serverError,
          },
        },
        put: {
          tags: ['Genres'],
          summary: 'Actualizar género',
          parameters: [idParameter('Identificador del género')],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/GenreUpdate' } } },
          },
          responses: {
            200: {
              description: 'Género actualizado',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Genre' } } },
            },
            400: validationError,
            404: notFoundError,
            500: serverError,
          },
        },
        delete: {
          tags: ['Genres'],
          summary: 'Eliminar género',
          parameters: [idParameter('Identificador del género')],
          responses: { 200: { description: 'Género eliminado' }, 400: validationError, 404: notFoundError, 500: serverError },
        },
      },
      '/api/v1/games': {
        get: {
          tags: ['Games'],
          summary: 'Listar videojuegos',
          parameters: [
            { name: 'name', in: 'query', schema: { type: 'string' } },
            { name: 'search', in: 'query', schema: { type: 'string' } },
            { name: 'genreId', in: 'query', schema: { type: 'integer', minimum: 1 } },
            { name: 'genreName', in: 'query', schema: { type: 'string' } },
            { name: 'order', in: 'query', schema: { type: 'string', example: 'name:asc' } },
            pageParameter,
            limitParameter,
          ],
          responses: {
            200: {
              description: 'Lista paginada de videojuegos',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/PaginatedGames' } } },
            },
            400: validationError,
            500: serverError,
          },
        },
        post: {
          tags: ['Games'],
          summary: 'Registrar videojuego',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/GameInput' } } },
          },
          responses: {
            201: {
              description: 'Videojuego registrado',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Game' } } },
            },
            400: validationError,
            500: serverError,
          },
        },
      },
      '/api/v1/games/{id}': {
        get: {
          tags: ['Games'],
          summary: 'Consultar videojuego por ID',
          parameters: [idParameter('Identificador del videojuego')],
          responses: {
            200: {
              description: 'Detalle del videojuego',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/GameDetail' } } },
            },
            400: validationError,
            404: notFoundError,
            500: serverError,
          },
        },
        put: {
          tags: ['Games'],
          summary: 'Actualizar videojuego',
          parameters: [idParameter('Identificador del videojuego')],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/GameUpdate' } } },
          },
          responses: {
            200: {
              description: 'Videojuego actualizado',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Game' } } },
            },
            400: validationError,
            404: notFoundError,
            500: serverError,
          },
        },
        delete: {
          tags: ['Games'],
          summary: 'Eliminar videojuego',
          parameters: [idParameter('Identificador del videojuego')],
          responses: { 200: { description: 'Videojuego eliminado' }, 400: validationError, 404: notFoundError, 500: serverError },
        },
      },
      '/api/v1/scores': {
        get: {
          tags: ['Scores'],
          summary: 'Listar puntuaciones',
          parameters: [
            { name: 'search', in: 'query', schema: { type: 'string' } },
            { name: 'playerId', in: 'query', schema: { type: 'integer', minimum: 1 } },
            { name: 'gameId', in: 'query', schema: { type: 'integer', minimum: 1 } },
            { name: 'genreId', in: 'query', schema: { type: 'integer', minimum: 1 } },
            { name: 'minScore', in: 'query', schema: { type: 'integer', minimum: 0 } },
            { name: 'maxScore', in: 'query', schema: { type: 'integer', minimum: 0 } },
            { name: 'period', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 9 } },
            { name: 'startDate', in: 'query', schema: { type: 'string', format: 'date-time' } },
            { name: 'endDate', in: 'query', schema: { type: 'string', format: 'date-time' } },
            { name: 'order', in: 'query', schema: { type: 'string', example: 'score:desc' } },
            pageParameter,
            limitParameter,
          ],
          responses: {
            200: {
              description: 'Lista paginada de puntuaciones',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/PaginatedScores' } } },
            },
            400: validationError,
            500: serverError,
          },
        },
        post: {
          tags: ['Scores'],
          summary: 'Registrar puntuación',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ScoreInput' } } },
          },
          responses: {
            201: {
              description: 'Puntuación registrada',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/ScoreDetail' } } },
            },
            400: validationError,
            500: serverError,
          },
        },
      },
      '/api/v1/scores/ranking': {
        get: {
          tags: ['Scores'],
          summary: 'Consultar clasificación por jugador',
          parameters: [
            { name: 'search', in: 'query', schema: { type: 'string' } },
            { name: 'playerId', in: 'query', schema: { type: 'integer', minimum: 1 } },
            { name: 'gameId', in: 'query', schema: { type: 'integer', minimum: 1 } },
            { name: 'genreId', in: 'query', schema: { type: 'integer', minimum: 1 } },
            { name: 'minScore', in: 'query', schema: { type: 'integer', minimum: 0 } },
            { name: 'maxScore', in: 'query', schema: { type: 'integer', minimum: 0 } },
            { name: 'period', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 9 } },
            { name: 'startDate', in: 'query', schema: { type: 'string', format: 'date-time' } },
            { name: 'endDate', in: 'query', schema: { type: 'string', format: 'date-time' } },
            { name: 'order', in: 'query', schema: { type: 'string', example: 'score:desc' } },
            pageParameter,
            limitParameter,
          ],
          responses: {
            200: {
              description: 'Una fila por jugador con su puntuación más alta y sus juegos con puntuaciones',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/PaginatedRanking' } } },
            },
            400: validationError,
            500: serverError,
          },
        },
      },
      '/api/v1/scores/stats': {
        get: {
          tags: ['Scores'],
          summary: 'Consultar estadísticas generales',
          responses: {
            200: {
              description: 'Estadísticas generales',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/ScoreStats' } } },
            },
            500: serverError,
          },
        },
      },
      '/api/v1/scores/{id}': {
        delete: {
          tags: ['Scores'],
          summary: 'Eliminar puntuación',
          parameters: [idParameter('Identificador de la puntuación')],
          responses: { 200: { description: 'Puntuación eliminada' }, 400: validationError, 404: notFoundError, 500: serverError },
        },
      },
    },
    components: {
      schemas: {
        Error: {
          type: 'object',
          required: ['error'],
          properties: { error: { type: 'string', example: 'Registro no encontrado' } },
        },
        ValidationError: {
          type: 'object',
          required: ['error', 'details'],
          properties: {
            error: { type: 'string', example: 'Error de validación' },
            details: {
              type: 'array',
              items: {
                type: 'object',
                required: ['field', 'message'],
                properties: {
                  field: { type: 'string', example: 'name' },
                  message: { type: 'string', example: 'El nombre es obligatorio.' },
                },
              },
            },
          },
        },
        PlayerInput: {
          type: 'object',
          required: ['name', 'gamertag', 'email'],
          properties: {
            name: { type: 'string', example: 'Carlos Mendoza' },
            gamertag: { type: 'string', example: 'ShadowQA' },
            email: { type: 'string', format: 'email', example: 'carlos@test.com' },
          },
        },
        PlayerUpdate: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Carlos Mendoza' },
            gamertag: { type: 'string', example: 'ShadowQA' },
            email: { type: 'string', format: 'email', example: 'carlos@test.com' },
          },
        },
        Player: {
          allOf: [
            { $ref: '#/components/schemas/PlayerInput' },
            { type: 'object', properties: { id: { type: 'integer' }, createdAt: { type: 'string', format: 'date-time' } } },
          ],
        },
        PlayerDetail: {
          allOf: [
            { $ref: '#/components/schemas/Player' },
            { type: 'object', properties: { scores: { type: 'array', items: { $ref: '#/components/schemas/ScoreDetail' } } } },
          ],
        },
        GenreInput: {
          type: 'object',
          required: ['name'],
          properties: { name: { type: 'string', example: 'Fighting' } },
        },
        GenreUpdate: { type: 'object', properties: { name: { type: 'string', example: 'Fighting' } } },
        Genre: {
          allOf: [
            { $ref: '#/components/schemas/GenreInput' },
            { type: 'object', properties: { id: { type: 'integer' } } },
          ],
        },
        GenreDetail: {
          allOf: [
            { $ref: '#/components/schemas/Genre' },
            { type: 'object', properties: { games: { type: 'array', items: { $ref: '#/components/schemas/Game' } } } },
          ],
        },
        GameInput: {
          type: 'object',
          required: ['name', 'genreId'],
          properties: {
            name: { type: 'string', example: 'Tekken 8' },
            genreId: { type: 'integer', minimum: 1, example: 4 },
          },
        },
        GameUpdate: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Tekken 8' },
            genreId: { type: 'integer', minimum: 1, example: 4 },
          },
        },
        Game: {
          allOf: [
            { $ref: '#/components/schemas/GameInput' },
            {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                genre: { $ref: '#/components/schemas/Genre' },
              },
            },
          ],
        },
        GameDetail: {
          allOf: [
            { $ref: '#/components/schemas/Game' },
            { type: 'object', properties: { scores: { type: 'array', items: { $ref: '#/components/schemas/ScoreDetail' } } } },
          ],
        },
        ScoreInput: {
          type: 'object',
          required: ['playerId', 'gameId', 'score'],
          properties: {
            playerId: { type: 'integer', minimum: 1, example: 8 },
            gameId: { type: 'integer', minimum: 1, example: 6 },
            score: { type: 'integer', minimum: 0, example: 950 },
          },
        },
        ScoreDetail: {
          allOf: [
            { $ref: '#/components/schemas/ScoreInput' },
            {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                createdAt: { type: 'string', format: 'date-time' },
                player: { $ref: '#/components/schemas/Player' },
                game: { $ref: '#/components/schemas/Game' },
              },
            },
          ],
        },
        RankingEntry: {
          type: 'object',
          description: 'Jugador representado por su puntuación más alta y sus videojuegos con puntuaciones.',
          properties: {
            position: { type: 'integer' },
            playerId: { type: 'integer' },
            player: { type: 'string' },
            playerName: { type: 'string' },
            gameId: { type: 'integer' },
            game: { type: 'string' },
            genre: { type: 'string' },
            score: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
            games: { type: 'array', items: { $ref: '#/components/schemas/PlayedGameScore' } },
          },
        },
        PlayedGameScore: {
          type: 'object',
          required: ['gameId', 'game', 'genre', 'score'],
          properties: {
            gameId: { type: 'integer' },
            game: { type: 'string' },
            genre: { type: 'string' },
            score: { type: 'integer' },
          },
        },
        ScoreStats: {
          type: 'object',
          required: ['totalPlayers', 'totalGames', 'totalScores', 'averageScore'],
          properties: {
            totalPlayers: { type: 'integer' },
            totalGames: { type: 'integer' },
            totalScores: { type: 'integer' },
            averageScore: { type: 'number' },
          },
        },
        PaginatedPlayers: {
          type: 'object',
          properties: {
            data: { type: 'array', items: { $ref: '#/components/schemas/Player' } },
            totalRecords: { type: 'integer' },
          },
        },
        PaginatedGenres: {
          type: 'object',
          properties: {
            data: { type: 'array', items: { $ref: '#/components/schemas/Genre' } },
            totalRecords: { type: 'integer' },
          },
        },
        PaginatedGames: {
          type: 'object',
          properties: {
            data: { type: 'array', items: { $ref: '#/components/schemas/Game' } },
            totalRecords: { type: 'integer' },
          },
        },
        PaginatedScores: {
          type: 'object',
          properties: {
            data: { type: 'array', items: { $ref: '#/components/schemas/ScoreDetail' } },
            totalRecords: { type: 'integer' },
          },
        },
        PaginatedRanking: {
          type: 'object',
          properties: {
            data: { type: 'array', items: { $ref: '#/components/schemas/RankingEntry' } },
            totalRecords: { type: 'integer' },
          },
        },
      },
    },
  },
  apis: [],
};

export const openApiDocument = swaggerJsdoc(options);
