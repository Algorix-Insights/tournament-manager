import { z } from 'zod';
import {
  emailText,
  integerInRange,
  optionalText,
  positiveInteger,
  requiredText,
  validDate,
} from '@/core/utils/zod.util';

export interface CreatePlayerDTO {
  name: string;
  gamertag: string;
  email: string;
}

export interface UpdatePlayerDTO {
  name?: string;
  gamertag?: string;
  email?: string;
}

export interface PlayerFilterDTO {
  name?: string;
  gamertag?: string;
  email?: string;
  search?: string;
  period?: number;
  startDate?: string;
  endDate?: string;
  order?: string;
  page?: number;
  limit?: number;
}

const playerName = requiredText('El nombre es obligatorio.');
const gamertag = requiredText('El gamertag es obligatorio.');
const email = emailText('El correo electrónico no es válido.');
const period = integerInRange(1, 9, 'El período debe ser un número entero entre 1 y 9.');

export const createPlayerSchema = z.object(
  { name: playerName, gamertag, email },
  { error: 'El cuerpo de la solicitud no es válido.' },
);

export const updatePlayerSchema = z.object(
  {
    name: playerName.optional(),
    gamertag: gamertag.optional(),
    email: email.optional(),
  },
  { error: 'El cuerpo de la solicitud no es válido.' },
);

export const playerFilterSchema = z.object({
  name: optionalText('El nombre debe ser texto.'),
  gamertag: optionalText('El gamertag debe ser texto.'),
  email: optionalText('El correo electrónico debe ser texto.'),
  search: optionalText('La búsqueda debe ser texto.'),
  period: period.optional(),
  startDate: validDate('La fecha inicial no es válida.').optional(),
  endDate: validDate('La fecha final no es válida.').optional(),
  order: optionalText('El orden debe ser texto.'),
  page: positiveInteger('La página debe ser un número entero positivo.').optional(),
  limit: positiveInteger('El límite debe ser un número entero positivo.').optional(),
});

export const playerIdParamsSchema = z.object(
  { id: positiveInteger('El identificador del jugador debe ser un número entero positivo.') },
  { error: 'Los parámetros del jugador no son válidos.' },
);
