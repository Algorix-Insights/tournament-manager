import { z } from 'zod';
import { optionalText, positiveInteger, requiredText } from '@/core/utils/zod.util';

export interface CreateGenreDTO {
  name: string;
}

export interface UpdateGenreDTO {
  name?: string;
}

export interface GenreFilterDTO {
  name?: string;
  search?: string;
  order?: string;
  page?: number;
  limit?: number;
}

const genreName = requiredText('El nombre del género es obligatorio.');

export const createGenreSchema = z.object(
  { name: genreName },
  { error: 'El cuerpo de la solicitud no es válido.' },
);

export const updateGenreSchema = z.object(
  { name: genreName.optional() },
  { error: 'El cuerpo de la solicitud no es válido.' },
);

export const genreFilterSchema = z.object({
  name: optionalText('El nombre debe ser texto.'),
  search: optionalText('La búsqueda debe ser texto.'),
  order: optionalText('El orden debe ser texto.'),
  page: positiveInteger('La página debe ser un número entero positivo.').optional(),
  limit: positiveInteger('El límite debe ser un número entero positivo.').optional(),
});

export const genreIdParamsSchema = z.object(
  { id: positiveInteger('El identificador del género debe ser un número entero positivo.') },
  { error: 'Los parámetros del género no son válidos.' },
);
