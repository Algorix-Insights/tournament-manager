import { describe, expect, jest, test } from '@jest/globals';

jest.mock('@/core/prisma');

import app from '@/server';
import { database, readJson, setupApiTest } from '@/test-utils/api-test-utils';

const api = setupApiTest(app);

test('searches scores by player or game text', async () => {
  database.score.findMany.mockResolvedValue([]);
  database.score.count.mockResolvedValue(0);

  const response = await api.request('/api/v1/scores?search=Shadow');

  expect(response.status).toBe(200);
  expect(database.score.findMany).toHaveBeenCalledWith(
    expect.objectContaining({
      where: {
        OR: [
          { player: { name: { contains: 'Shadow' } } },
          { player: { gamertag: { contains: 'Shadow' } } },
          { game: { name: { contains: 'Shadow' } } },
          { game: { genre: { name: { contains: 'Shadow' } } } },
        ],
      },
    }),
  );
});

describe('RF03 - Register scores', () => {
  test('CP-RF03-01 registers a valid score', async () => {
    const score = { id: 8, playerId: 8, gameId: 6, score: 950 };
    database.score.create.mockResolvedValue(score);

    const response = await api.request('/api/v1/scores', 'POST', score);

    expect(response.status).toBe(201);
    expect(await readJson(response)).toEqual(score);
  });

  test('CP-RF03-02 allows multiple scores for one player', async () => {
    database.score.create
      .mockResolvedValueOnce({ id: 8, playerId: 8, gameId: 6, score: 950 })
      .mockResolvedValueOnce({ id: 9, playerId: 8, gameId: 7, score: 820 });

    const first = await api.request('/api/v1/scores', 'POST', { playerId: 8, gameId: 6, score: 950 });
    const second = await api.request('/api/v1/scores', 'POST', { playerId: 8, gameId: 7, score: 820 });

    expect(first.status).toBe(201);
    expect(second.status).toBe(201);
    expect(database.score.create).toHaveBeenCalledTimes(2);
  });

  test('CP-RF03-03 rejects a negative score', async () => {
    const response = await api.request('/api/v1/scores', 'POST', { playerId: 8, gameId: 6, score: -50 });
    const result = await readJson(response);

    expect(response.status).toBe(400);
    expect(result.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'score', message: 'El puntaje no puede ser negativo.' }),
      ]),
    );
    expect(database.score.create).not.toHaveBeenCalled();
  });

  test('rejects a fractional score because the database stores integers', async () => {
    const response = await api.request('/api/v1/scores', 'POST', {
      playerId: 8,
      gameId: 6,
      score: 950.5,
    });
    const result = await readJson(response);

    expect(response.status).toBe(400);
    expect(result.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'score', message: 'El puntaje debe ser un número válido.' }),
      ]),
    );
    expect(database.score.create).not.toHaveBeenCalled();
  });

  test.each([
    ['CP-RF03-04', { playerId: 9999, gameId: 6, score: 500 }],
    ['CP-RF03-05', { playerId: 8, gameId: 9999, score: 500 }],
  ])('%s rejects a score with a nonexistent relation', async (_id, body) => {
    database.score.create.mockRejectedValue({ code: 'P2003' });

    const response = await api.request('/api/v1/scores', 'POST', body);

    expect(response.status).toBe(400);
    expect((await readJson(response)).error).toBe('La referencia especificada no existe o no es válida');
  });

  test('CP-RF03-06 rejects a score without required data', async () => {
    const response = await api.request('/api/v1/scores', 'POST', {});
    const result = await readJson(response);

    expect(response.status).toBe(400);
    expect(result.error).toBe('Error de validación');
    expect(result.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'playerId' }),
        expect.objectContaining({ field: 'gameId' }),
        expect.objectContaining({ field: 'score' }),
      ]),
    );
  });
});

describe('RF06 - Score ranking', () => {
  test('CP-RF06-01 returns ranking ordered by score', async () => {
    database.score.findMany.mockResolvedValue([
      {
        id: 1,
        player: { id: 8, name: 'Carlos Mendoza', gamertag: 'ShadowQA' },
        game: { id: 6, name: 'Tekken 8', genre: { name: 'Fighting' } },
        score: 950,
        createdAt: new Date('2026-01-01'),
      },
      {
        id: 2,
        player: { id: 9, name: 'Ana', gamertag: 'Apex' },
        game: { id: 7, name: 'Street Fighter 6', genre: { name: 'Fighting' } },
        score: 820,
        createdAt: new Date('2026-01-02'),
      },
    ]);
    database.score.count.mockResolvedValue(2);

    const response = await api.request('/api/v1/scores/ranking');
    const result = await readJson(response);

    expect(response.status).toBe(200);
    expect(result.data.map((item: { score: number }) => item.score)).toEqual([950, 820]);
    expect(result.data.map((item: { position: number }) => item.position)).toEqual([1, 2]);
    expect(database.score.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ orderBy: { score: 'desc' } }),
    );
  });

  test('CP-RF06-02 filters ranking by gameId', async () => {
    database.score.count.mockResolvedValue(1);

    const response = await api.request('/api/v1/scores/ranking?gameId=6');

    expect(response.status).toBe(200);
    expect(database.score.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { gameId: 6 } }),
    );
  });
});

describe('RF08 - Statistics', () => {
  test('CP-RF08-01 returns general score statistics', async () => {
    database.player.count.mockResolvedValue(6);
    database.game.count.mockResolvedValue(5);
    database.score.count.mockResolvedValue(7);
    database.score.aggregate.mockResolvedValue({ _avg: { score: 854.2857 } });

    const response = await api.request('/api/v1/scores/stats');

    expect(response.status).toBe(200);
    expect(await readJson(response)).toEqual({
      totalPlayers: 6,
      totalGames: 5,
      totalScores: 7,
      averageScore: 854.29,
    });
  });
});

test('returns a Spanish success message when deleting a score', async () => {
  database.score.delete.mockResolvedValue({ id: 8 });

  const response = await api.request('/api/v1/scores/8', 'DELETE');

  expect(response.status).toBe(200);
  expect(await readJson(response)).toEqual({ message: 'Puntuación eliminada correctamente' });
});
