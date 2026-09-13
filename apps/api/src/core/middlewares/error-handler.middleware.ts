import type { ErrorRequestHandler } from 'express';

function getErrorCode(error: unknown): string | undefined {
  if (typeof error !== 'object' || error === null || !('code' in error)) {
    return undefined;
  }

  return typeof error.code === 'string' ? error.code : undefined;
}

export const apiErrorHandler: ErrorRequestHandler = (error, _req, res, next): void => {
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
      response.message = 'Ya existe un registro con los datos proporcionados';
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
