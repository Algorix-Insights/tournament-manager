import { z } from 'zod';
import {
  integerInRange,
  nonNegativeInteger,
  optionalText,
  positiveInteger,
  validDate,
} from '@/core/utils/zod.util';

export interface CreateScoreDTO {
  playerId: number;
  gameId: number;
  score: number;
}

export interface RankingFilterDTO {
  search?: string;
  playerId?: number;
  gameId?: number;
  genreId?: number;
  minScore?: number;
  maxScore?: number;
  period?: number;
  startDate?: string;
  endDate?: string;
  order?: string;
  page?: number;
  limit?: number;
}

export interface ScoreFilterDTO extends RankingFilterDTO {}

const playerId = positiveInteger('El jugador debe ser un número entero positivo.');
const gameId = positiveInteger('El juego debe ser un número entero positivo.');
const genreId = positiveInteger('El género debe ser un número entero positivo.');
const score = nonNegativeInteger(
  'El puntaje debe ser un número válido.',
  'El puntaje no puede ser negativo.',
);
const period = integerInRange(1, 9, 'El período debe ser un número entero entre 1 y 9.');

export const createScoreSchema = z.object(
  { playerId, gameId, score },
  { error: 'El cuerpo de la solicitud no es válido.' },
);

export const scoreFilterSchema = z.object({
  search: optionalText('La búsqueda debe ser texto.'),
  playerId: playerId.optional(),
  gameId: gameId.optional(),
  genreId: genreId.optional(),
  minScore: score.optional(),
  maxScore: score.optional(),
  period: period.optional(),
  startDate: validDate('La fecha inicial no es válida.').optional(),
  endDate: validDate('La fecha final no es válida.').optional(),
  order: optionalText('El orden debe ser texto.'),
  page: positiveInteger('La página debe ser un número entero positivo.').optional(),
  limit: positiveInteger('El límite debe ser un número entero positivo.').optional(),
});

export const rankingFilterSchema = scoreFilterSchema;

export const scoreIdParamsSchema = z.object(
  { id: positiveInteger('El identificador del puntaje debe ser un número entero positivo.') },
  { error: 'Los parámetros del puntaje no son válidos.' },
);
