import express from 'express';
// import cors from 'cors';
import { apiErrorHandler } from '@/core/middlewares/error-handler.middleware';
import playerRouter from '@/modules/players/player.router';
import gameRouter from '@/modules/games/game.router';
import scoreRouter from '@/modules/scores/score.router';
import genreRouter from '@/modules/genres/genre.router';
import { registerCoreMiddlewares } from '@/core/middlewares/register-core-middlewares';

const app = express();

// app.use(cors());
registerCoreMiddlewares(app);
app.disable('x-powered-by');

// Base API Endpoints
app.use('/api/players', playerRouter);
app.use('/api/games', gameRouter);
app.use('/api/scores', scoreRouter);
app.use('/api/genres', genreRouter);

app.get('/', (_req, res) => {
  res.json({
    message: 'Tournament Manager API ready',
    endpoints: {
      players: '/api/players',
      games: '/api/games',
      scores: '/api/scores',
      genres: '/api/genres',
      ranking: '/api/scores/ranking',
      stats: '/api/scores/stats',
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
