import { expect, test, describe } from '@jest/globals';
import { createQueryKeys } from '@/core/query/queryKeys';

describe('createQueryKeys', () => {
  test('generates domain-shaped hierarchical query keys', () => {
    const playersKeys = createQueryKeys<{ search: string }>('players');

    expect(playersKeys.all).toEqual(['players']);
    expect(playersKeys.lists()).toEqual(['players', 'list']);
    expect(playersKeys.list({ search: 'zelda' })).toEqual([
      'players',
      'list',
      { filters: { search: 'zelda' } },
    ]);
    expect(playersKeys.details()).toEqual(['players', 'detail']);
    expect(playersKeys.detail(10)).toEqual(['players', 'detail', 10]);
  });
});
