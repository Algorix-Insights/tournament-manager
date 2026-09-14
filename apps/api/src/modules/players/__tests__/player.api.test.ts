import { describe, expect, jest, test } from '@jest/globals';

jest.mock('@/core/prisma');

import app from '@/server';
import { database, readJson, setupApiTest } from '@/test-utils/api-test-utils';

const api = setupApiTest(app);

describe('RF01 - Register players', () => {
  test('CP-RF01-01 registers a player with valid data', async () => {
    const player = { id: 8, name: 'Carlos Mendoza', gamertag: 'ShadowQA', email: 'carlos@test.com' };
    database.player.create.mockResolvedValue(player);

    const response = await api.request('/api/v1/players', 'POST', player);

    expect(response.status).toBe(201);
    expect(await readJson(response)).toEqual(player);
  });

  test.each([
    ['CP-RF01-02', { gamertag: 'NoName', email: 'noname@test.com' }, 'name'],
    ['CP-RF01-03', { name: 'Carlos', email: 'nogamer@test.com' }, 'gamertag'],
    ['CP-RF01-04', { name: 'Carlos', gamertag: 'NoMail' }, 'email'],
  ])('%s rejects a player without %s', async (_id, body, field) => {
    const response = await api.request('/api/v1/players', 'POST', body);
    const result = await readJson(response);

    expect(response.status).toBe(400);
    expect(result.error).toBe('Error de validación');
    expect(result.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ field })]),
    );
    expect(database.player.create).not.toHaveBeenCalled();
  });

  test('CP-RF01-05 rejects a duplicated gamertag', async () => {
    database.player.create.mockRejectedValue({ code: 'P2002' });

    const response = await api.request('/api/v1/players', 'POST', {
      name: 'Dhayan',
      gamertag: 'ShadowQA',
      email: 'otro@test.com',
    });

    expect(response.status).toBe(400);
    expect((await readJson(response)).error).toBe('Ya existe un registro con los datos proporcionados');
  });
});

describe('RF04 - Query players', () => {
  test('CP-RF04-01 returns the player list', async () => {
    const players = [{ id: 8, name: 'Carlos Mendoza', gamertag: 'ShadowQA', email: 'carlos@test.com' }];
    database.player.findMany.mockResolvedValue(players);
    database.player.count.mockResolvedValue(6);

    const response = await api.request('/api/v1/players');
    const result = await readJson(response);

    expect(response.status).toBe(200);
    expect(result.totalRecords).toBe(6);
    expect(result.data).toEqual(players);
  });

  test('CP-RF04-02 returns an existing player by id', async () => {
    const player = { id: 8, name: 'Carlos Mendoza', scores: [] };
    database.player.findUnique.mockResolvedValue(player);

    const response = await api.request('/api/v1/players/8');

    expect(response.status).toBe(200);
    expect(await readJson(response)).toEqual(player);
  });

  test('CP-RF04-03 returns 404 for an unknown player', async () => {
    const response = await api.request('/api/v1/players/9999');

    expect(response.status).toBe(404);
    expect((await readJson(response)).error).toBe('Jugador no encontrado');
  });
});

describe('RF07 - Search players', () => {
  test('CP-RF07-01 searches players by name', async () => {
    database.player.findMany.mockResolvedValue([{ id: 8, name: 'Carlos Mendoza' }]);
    database.player.count.mockResolvedValue(1);

    const response = await api.request('/api/v1/players?name=Carlos');
    const result = await readJson(response);

    expect(response.status).toBe(200);
    expect(result.data).toHaveLength(1);
    expect(database.player.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { name: { contains: 'Carlos' } } }),
    );
  });

  test('CP-RF07-02 searches players by gamertag', async () => {
    database.player.findMany.mockResolvedValue([{ id: 8, gamertag: 'ShadowQA' }]);
    database.player.count.mockResolvedValue(1);

    const response = await api.request('/api/v1/players?gamertag=ShadowQA');

    expect(response.status).toBe(200);
    expect(database.player.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { gamertag: { contains: 'ShadowQA' } } }),
    );
  });

  test('CP-RF07-03 returns an empty list when there are no matches', async () => {
    const response = await api.request('/api/v1/players?name=InexistenteXYZ');
    const result = await readJson(response);

    expect(response.status).toBe(200);
    expect(result.data).toEqual([]);
    expect(result.totalRecords).toBe(0);
  });
});

test('returns a Spanish success message when deleting a player', async () => {
  database.player.delete.mockResolvedValue({ id: 8 });

  const response = await api.request('/api/v1/players/8', 'DELETE');

  expect(response.status).toBe(200);
  expect(await readJson(response)).toEqual({ message: 'Jugador eliminado correctamente' });
});
