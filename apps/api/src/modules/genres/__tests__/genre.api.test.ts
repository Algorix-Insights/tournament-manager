import { describe, expect, jest, test } from '@jest/globals';

jest.mock('@/core/prisma');

import app from '@/server';
import { database, readJson, setupApiTest } from '@/test-utils/api-test-utils';

const api = setupApiTest(app);

describe('RF02 - Register genres', () => {
  test('CP-RF02-01 registers a valid genre', async () => {
    const genre = { id: 4, name: 'Fighting' };
    database.genre.create.mockResolvedValue(genre);

    const response = await api.request('/api/genres', 'POST', { name: 'Fighting' });

    expect(response.status).toBe(201);
    expect(await readJson(response)).toEqual(genre);
  });

  test('CP-RF02-02 rejects a duplicated genre', async () => {
    database.genre.create.mockRejectedValue({ code: 'P2002' });

    const response = await api.request('/api/genres', 'POST', { name: 'Fighting' });

    expect(response.status).toBe(400);
    expect((await readJson(response)).error).toBe('Ya existe un registro con los datos proporcionados');
  });
});
