import express from 'express';
import type { Express } from 'express';
import { queryFilters } from '@/core/middlewares/query-filters.middleware';

const allowedQueryKeys = [
  'name',
  'genreId',
  'genreName',
  'gamertag',
  'email',
  'search',
  'period',
  'startDate',
  'endDate',
  'order',
  'page',
  'limit',
  'playerId',
  'gameId',
  'minScore',
  'maxScore',
] as const;

const numericQueryKeys = [
  'genreId',
  'period',
  'page',
  'limit',
  'playerId',
  'gameId',
  'minScore',
  'maxScore',
] as const;

export function registerCoreMiddlewares(app: Express): void {
  app.use(express.json());
  app.use(queryFilters({ numericKeys: numericQueryKeys, allowedKeys: allowedQueryKeys }));
}
