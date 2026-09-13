import { Request, Response } from 'express';
import { expect, jest, test } from '@jest/globals';
import { GameController } from '@/modules/games/game.controller';
import type { IGameService } from '@/modules/games/interfaces/game.service.interface';

test('devuelve los errores del controlador en español', async () => {
  const service = {
    getAll: jest.fn().mockRejectedValue(new Error('database error')),
  } as unknown as IGameService;
  const res = {
    locals: { filters: {}, pagination: { page: 1, limit: 20, skip: 0, take: 20 } },
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  await new GameController(service).getAll({} as Request, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener los juegos' });
});
