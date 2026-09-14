import express from 'express';
import cors from 'cors';
import { apiReference } from '@scalar/express-api-reference';
import { apiErrorHandler } from '@/core/middlewares/error-handler.middleware';
import { openApiDocument } from '@/core/openapi';
import playerRouter from '@/modules/players/player.router';
import gameRouter from '@/modules/games/game.router';
import scoreRouter from '@/modules/scores/score.router';
import genreRouter from '@/modules/genres/genre.router';
import { registerCoreMiddlewares } from '@/core/middlewares/register-core-middlewares';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  }),
);
registerCoreMiddlewares(app);
app.disable('x-powered-by');

// Base API Endpoints
app.use('/api/v1/players', playerRouter);
app.use('/api/v1/games', gameRouter);
app.use('/api/v1/scores', scoreRouter);
app.use('/api/v1/genres', genreRouter);

app.get('/openapi.json', (_req, res) => {
  res.json(openApiDocument);
});

app.use('/docs', apiReference({ url: '/openapi.json' }));

app.get('/', (_req, res) => {
  res.json({
    message: 'Tournament Manager API ready',
    endpoints: {
      players: '/api/v1/players',
      games: '/api/v1/games',
      scores: '/api/v1/scores',
      genres: '/api/v1/genres',
      ranking: '/api/v1/scores/ranking',
      stats: '/api/v1/scores/stats',
    },
  });
});

app.use(apiErrorHandler);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🎮 Server running successfully on port ${PORT}`);
  });
}

export default app;
