import { describe, expect, test } from '@jest/globals';
import { normalizePublicGames } from '@/core/utils/public-games.util';

describe('normalizePublicGames', () => {
  test('keeps valid games, removes malformed records, and deduplicates titles', () => {
    const games = normalizePublicGames([
      { title: '  Valorant  ', genre: 'Shooter' },
      { title: 'valorant', genre: 'Shooter' },
      { title: 'Missing genre' },
      { title: 'Missing title', genre: '' },
      { title: 123, genre: 'RPG' },
    ]);

    expect(games).toEqual([{ title: 'Valorant', genre: 'Shooter' }]);
  });

  test('returns no games for an invalid API payload', () => {
    expect(normalizePublicGames({ games: [] })).toEqual([]);
  });
});
