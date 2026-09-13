import { NextFunction, Request, RequestHandler, Response } from 'express';
import { z } from 'zod';
import type { QueryFilters } from '@/core/middlewares/query-filters.middleware';

export type ValidationTarget = 'body' | 'params' | 'query';

export function validate<T extends z.ZodType>(
  schema: T,
  target: ValidationTarget,
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const input = target === 'query' ? req.query : req[target];
    const result = schema.safeParse(input ?? {});

    if (!result.success) {
      res.status(400).json({
        error: 'Error de validación',
        details: result.error.issues.map((issue) => ({
          field: issue.path.join('.') || target,
          message: issue.message,
        })),
      });
      return;
    }

    if (target === 'body') {
      req.body = result.data;
    } else if (target === 'params') {
      req.params = result.data as Request['params'];
    } else {
      res.locals.filters = result.data as QueryFilters;
    }

    next();
  };
}
