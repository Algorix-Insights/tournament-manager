import express from 'express';
import cors from 'cors';
import playerRouter from './modules/players/player.router';
import gameRouter from './modules/games/game.router';
import scoreRouter from './modules/scores/score.router';

const app = express();

app.use(cors());
app.use(express.json());

// Endpoints base de la API
app.use('/api/players', playerRouter);
app.use('/api/games', gameRouter);
app.use('/api/scores', scoreRouter);

app.get('/', (_req, res) => {
  res.json({
    message: 'API del Sistema de Torneo de Videojuegos lista',
    endpoints: {
      players: '/api/players',
      games: '/api/games',
      scores: '/api/scores',
      ranking: '/api/scores/ranking',
      stats: '/api/scores/stats',
    },
  });
});

export default app;
