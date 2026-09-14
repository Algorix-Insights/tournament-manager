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

  apiErrorHandler(error, {} as unknown as Request, res, next);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ error: 'Error interno del servidor' });
  expect(log).toHaveBeenCalledWith(error);
  expect(next).not.toHaveBeenCalled();

  log.mockRestore();
});

test('usa la URL original completa para identificar el catálogo duplicado', () => {
  const error = { code: 'P2002', meta: { target: ['name'] } };
  const res = {
    headersSent: false,
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const log = jest.spyOn(console, 'error').mockImplementation(() => undefined);

  apiErrorHandler(
    error,
    { baseUrl: '/mounted', originalUrl: '/api/v1/games' } as Request,
    res,
    jest.fn() as unknown as NextFunction,
  );

  expect(res.json).toHaveBeenCalledWith({ error: 'El videojuego ya está registrado.' });
  log.mockRestore();
});

test('mantiene el mensaje genérico cuando el duplicado no incluye el campo', () => {
  const error = { code: 'P2002' };
  const res = {
    headersSent: false,
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const log = jest.spyOn(console, 'error').mockImplementation(() => undefined);

  apiErrorHandler(error, {} as Request, res, jest.fn() as unknown as NextFunction);

  expect(res.json).toHaveBeenCalledWith({ error: 'Ya existe un registro con los datos proporcionados' });
  log.mockRestore();
});
