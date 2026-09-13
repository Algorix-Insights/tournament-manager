import express from 'express';
// import cors from 'cors';
import playerRouter from '@/modules/players/player.router';
import gameRouter from '@/modules/games/game.router';
import scoreRouter from '@/modules/scores/score.router';
import genreRouter from '@/modules/genres/genre.router';
import { queryFilters } from '@/core/middlewares/query-filters.middleware';

const app = express();

// app.use(cors());
app.use(express.json());
app.use(
  queryFilters([
    'playerId',
    'jugadorId',
    'gameId',
    'videojuegoId',
    'genreId',
    'generoId',
    'minScore',
    'maxScore',
    'period',
    'periodo',
    'page',
    'pagina',
    'limit',
    'cantidadRegistros',
  ]),
);
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

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🎮 Server running successfully on port ${PORT}`);
  });
}

export default app;
