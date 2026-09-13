import { NextFunction, Request, Response } from 'express';

export type QueryFilterValue = string | number;
export type QueryFilters = Record<string, QueryFilterValue>;

declare global {
  namespace Express {
    interface Locals {
      filters: QueryFilters;
    }
  }
}

export function queryFilters(numericKeys: readonly string[] = []) {
  const numeric = new Set(numericKeys);

  return (req: Request, res: Response, next: NextFunction): void => {
    const filters: QueryFilters = {};

    for (const [key, rawValue] of Object.entries(req.query)) {
      const value = Array.isArray(rawValue) ? rawValue[0] : rawValue;
      if (typeof value !== 'string' || !value.trim()) continue;

      if (numeric.has(key)) {
        const parsed = Number(value);
        if (!Number.isFinite(parsed)) continue;
        filters[key] = parsed;
        continue;
      }

      filters[key] = value.trim();
    }

    res.locals.filters = filters;
    next();
  };
}
