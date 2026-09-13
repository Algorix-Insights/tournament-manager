import { Request, Response } from 'express';
import { expect, test } from '@jest/globals';
import { paginationMiddleware } from '@/core/middlewares/pagination.middleware';

test('stores normalized pagination in response locals', () => {
  const req = {} as unknown as Request;
  const res = { locals: { filters: { page: 3, limit: 25 } } } as unknown as Response;
  let nextCalled = false;

  paginationMiddleware(req, res, () => {
    nextCalled = true;
  });

  expect(res.locals.pagination).toEqual({
    page: 3,
    limit: 25,
    skip: 50,
    take: 25,
  });
  expect(nextCalled).toBe(true);
});
