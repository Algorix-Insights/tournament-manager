import type { ErrorRequestHandler } from 'express';

function getErrorCode(error: unknown): string | undefined {
  if (typeof error !== 'object' || error === null || !('code' in error)) {
    return undefined;
  }

  return typeof error.code === 'string' ? error.code : undefined;
}

function getErrorTargets(error: unknown): string[] {
  if (typeof error !== 'object' || error === null || !('meta' in error)) {
    return [];
  }

  const meta = error.meta;
  if (typeof meta !== 'object' || meta === null || !('target' in meta)) {
    return [];
  }

  return Array.isArray(meta.target)
    ? meta.target.filter((target): target is string => typeof target === 'string')
    : [];
}

function getDuplicateMessage(req: Parameters<ErrorRequestHandler>[1], error: unknown): string {
  const targets = getErrorTargets(error);
  const requestPath = req.originalUrl || req.baseUrl;

  if (targets.includes('gamertag')) return 'El gamertag ya está registrado.';
  if (targets.includes('email')) return 'El correo electrónico ya está registrado.';
  if (targets.includes('name')) {
    if (requestPath.includes('/games')) return 'El videojuego ya está registrado.';
    if (requestPath.includes('/genres')) return 'El género ya está registrado.';
  }

  return 'Ya existe un registro con los datos proporcionados';
}

export const apiErrorHandler: ErrorRequestHandler = (error, req, res, next): void => {
  if (res.headersSent) {
    next(error);
    return;
  }

  console.error(error);

  const response = {
    status: 500,
    message: 'Error interno del servidor',
  };

  switch (getErrorCode(error)) {
    case 'P2002':
      response.status = 400;
      response.message = getDuplicateMessage(req, error);
      break;
    case 'P2003':
      response.status = 400;
      response.message = 'La referencia especificada no existe o no es válida';
      break;
    case 'P2025':
      response.status = 404;
      response.message = 'Registro no encontrado';
      break;
  }

  res.status(response.status).json({ error: response.message });
};
