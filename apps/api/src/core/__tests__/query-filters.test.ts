import { Request, Response } from 'express';
import { expect, test } from '@jest/globals';
import { queryFilters } from '@/core/middlewares/query-filters.middleware';

test('normalizes query filters for the request pipeline', () => {
  const req = {
    query: {
      name: '  Zelda  ',
      genreId: '7',
      limit: '20',
      invalidId: 'abc',
      empty: '   ',
      nombre: 'Legacy',
    },
  } as unknown as Request;
  const res = { locals: {} } as unknown as Response;
  let nextCalled = false;

  queryFilters({
    numericKeys: ['genreId', 'limit', 'invalidId'],
    allowedKeys: ['name', 'genreId', 'limit', 'invalidId'],
  })(req, res, () => {
    nextCalled = true;
  });

  expect(res.locals.filters).toEqual({
    name: 'Zelda',
    genreId: 7,
    limit: 20,
  });
  expect(nextCalled).toBe(true);
});
