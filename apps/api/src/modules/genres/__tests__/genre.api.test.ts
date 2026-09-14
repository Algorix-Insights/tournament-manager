import { describe, expect, jest, test } from '@jest/globals';

jest.mock('@/core/prisma');

import app from '@/server';
import { database, readJson, setupApiTest } from '@/test-utils/api-test-utils';

const api = setupApiTest(app);

test('searches genres by name', async () => {
  database.genre.findMany.mockResolvedValue([{ id: 4, name: 'Fighting' }]);
  database.genre.count.mockResolvedValue(1);

  const response = await api.request('/api/v1/genres?search=Fight');

  expect(response.status).toBe(200);
  expect(database.genre.findMany).toHaveBeenCalledWith(
    expect.objectContaining({ where: { name: { contains: 'Fight' } } }),
  );
});

describe('RF02 - Register genres', () => {
  test('CP-RF02-01 registers a valid genre', async () => {
    const genre = { id: 4, name: 'Fighting' };
    database.genre.create.mockResolvedValue(genre);

    const response = await api.request('/api/v1/genres', 'POST', { name: 'Fighting' });

    expect(response.status).toBe(201);
    expect(await readJson(response)).toEqual(genre);
  });

  test('CP-RF02-02 rejects a duplicated genre with a specific message', async () => {
    database.genre.create.mockRejectedValue({ code: 'P2002', meta: { target: ['name'] } });

    const response = await api.request('/api/v1/genres', 'POST', { name: 'Fighting' });

    expect(response.status).toBe(400);
    expect((await readJson(response)).error).toBe('El género ya está registrado.');
  });
});

test('returns a Spanish success message when deleting a genre', async () => {
  database.genre.delete.mockResolvedValue({ id: 4 });

  const response = await api.request('/api/v1/genres/4', 'DELETE');

  expect(response.status).toBe(200);
  expect(await readJson(response)).toEqual({ message: 'Género eliminado correctamente' });
});
