import { NextFunction, Request, Response } from 'express';
import { parsePaginationParams, PaginationParams } from '@/core/utils/pagination.util';

declare global {
  namespace Express {
    interface Locals {
      pagination: PaginationParams;
    }
  }
}

export function paginationMiddleware(
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  res.locals.pagination = parsePaginationParams(res.locals.filters);
  next();
}
