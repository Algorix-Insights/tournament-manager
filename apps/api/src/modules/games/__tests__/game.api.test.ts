import { describe, expect, jest, test } from '@jest/globals';

jest.mock('@/core/prisma');

import app from '@/server';
import { database, readJson, setupApiTest } from '@/test-utils/api-test-utils';

const api = setupApiTest(app);

test('searches games by name or genre', async () => {
  database.game.findMany.mockResolvedValue([{ id: 6, name: 'Tekken 8' }]);
  database.game.count.mockResolvedValue(1);

  const response = await api.request('/api/v1/games?search=Fighting');

  expect(response.status).toBe(200);
  expect(database.game.findMany).toHaveBeenCalledWith(
    expect.objectContaining({
      where: {
        OR: [
          { name: { contains: 'Fighting' } },
          { genre: { name: { contains: 'Fighting' } } },
        ],
      },
    }),
  );
});

describe('RF02 - Register games', () => {
  test('CP-RF02-03 registers a game with a valid genre', async () => {
    const game = { id: 6, name: 'Tekken 8', genreId: 4 };
    database.game.create.mockResolvedValue(game);

    const response = await api.request('/api/v1/games', 'POST', game);

    expect(response.status).toBe(201);
    expect(await readJson(response)).toEqual(game);
  });

  test.each([
    ['CP-RF02-04', { genreId: 4 }, 'name'],
    ['CP-RF02-05', { name: 'Street Fighter' }, 'genreId'],
  ])('%s rejects a game without %s', async (_id, body, field) => {
    const response = await api.request('/api/v1/games', 'POST', body);
    const result = await readJson(response);

    expect(response.status).toBe(400);
    expect(result.error).toBe('Error de validación');
    expect(result.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ field })]),
    );
    expect(database.game.create).not.toHaveBeenCalled();
  });

  test('CP-RF02-06 rejects a duplicated game name with a specific message', async () => {
    database.game.create.mockRejectedValue({ code: 'P2002', meta: { target: ['name'] } });

    const response = await api.request('/api/v1/games', 'POST', { name: 'Tekken 8', genreId: 4 });

    expect(response.status).toBe(400);
    expect((await readJson(response)).error).toBe('El videojuego ya está registrado.');
  });

  test('CP-RF02-07 rejects a game with a nonexistent genre', async () => {
    database.game.create.mockRejectedValue({ code: 'P2003' });

    const response = await api.request('/api/v1/games', 'POST', { name: 'Mortal Kombat', genreId: 9999 });

    expect(response.status).toBe(400);
    expect((await readJson(response)).error).toBe('La referencia especificada no existe o no es válida');
  });
});

test('returns a Spanish success message when deleting a game', async () => {
  database.game.delete.mockResolvedValue({ id: 6 });

  const response = await api.request('/api/v1/games/6', 'DELETE');

  expect(response.status).toBe(200);
  expect(await readJson(response)).toEqual({ message: 'Videojuego eliminado correctamente' });
});
