import { Request, Response } from 'express';
import { expect, jest, test } from '@jest/globals';
import { validate } from '@/core/middlewares/validation.middleware';
import { createGameSchema } from '@/modules/games/dtos/game.dto';

test('rechaza datos inválidos con mensajes en español', () => {
  const req = { body: { name: '', genreId: 'no-numérico' } } as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  validate(createGameSchema, 'body')(req, res, next);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      error: 'Error de validación',
      details: expect.arrayContaining([
        expect.objectContaining({ message: 'El nombre es obligatorio.' }),
        expect.objectContaining({ message: 'El género debe ser un número entero positivo.' }),
      ]),
    }),
  );
  expect(next).not.toHaveBeenCalled();
});
