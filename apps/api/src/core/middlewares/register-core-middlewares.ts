import express from 'express';
import type { Express } from 'express';
import { queryFilters } from '@/core/middlewares/query-filters.middleware';

const numericQueryKeys = [
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
] as const;

export function registerCoreMiddlewares(app: Express): void {
  app.use(express.json());
  app.use(queryFilters(numericQueryKeys));
}
