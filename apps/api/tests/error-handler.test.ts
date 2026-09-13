import { NextFunction, Request, Response } from 'express';
import { expect, jest, test } from '@jest/globals';
import { apiErrorHandler } from '@/core/middlewares/error-handler.middleware';

test('convierte una excepción desconocida en un error HTTP en español', () => {
  const error = new Error('database failure');
  const res = {
    headersSent: false,
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn() as unknown as NextFunction;
  const log = jest.spyOn(console, 'error').mockImplementation(() => undefined);

  apiErrorHandler(error, {} as Request, res, next);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
  expect(log).toHaveBeenCalledWith(error);
  expect(next).not.toHaveBeenCalled();

  log.mockRestore();
});
