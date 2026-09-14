import { z } from 'zod';
import { optionalText, positiveInteger, requiredText } from '@/core/utils/zod.util';

export interface CreateGameDTO {
  name: string;
  genreId: number;
}

export interface UpdateGameDTO {
  name?: string;
  genreId?: number;
}

export interface GameFilterDTO {
  name?: string;
  search?: string;
  genreId?: number;
  genreName?: string;
  order?: string;
  page?: number;
  limit?: number;
}

const gameName = requiredText('El nombre es obligatorio.');
const genreId = positiveInteger('El género debe ser un número entero positivo.');
const pagination = {
  page: positiveInteger('La página debe ser un número entero positivo.').optional(),
  limit: positiveInteger('El límite debe ser un número entero positivo.').optional(),
};

export const createGameSchema = z.object(
  { name: gameName, genreId },
  { error: 'El cuerpo de la solicitud no es válido.' },
);

export const updateGameSchema = z.object(
  {
    name: gameName.optional(),
    genreId: genreId.optional(),
  },
  { error: 'El cuerpo de la solicitud no es válido.' },
);

export const gameFilterSchema = z.object({
  name: optionalText('El nombre debe ser texto.'),
  search: optionalText('La búsqueda debe ser texto.'),
  genreId: genreId.optional(),
  genreName: optionalText('El nombre del género debe ser texto.'),
  order: optionalText('El orden debe ser texto.'),
  ...pagination,
});

export const gameIdParamsSchema = z.object(
  { id: positiveInteger('El identificador del juego debe ser un número entero positivo.') },
  { error: 'Los parámetros del juego no son válidos.' },
);
