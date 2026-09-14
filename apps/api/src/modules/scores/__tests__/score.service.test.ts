import { expect, jest, test } from '@jest/globals';

jest.mock('@/core/prisma');

import { ScoreService } from '@/modules/scores/score.service';

test('rejects a negative score with a Spanish service error', async () => {
  await expect(
    new ScoreService().create({ playerId: 1, gameId: 1, score: -1 }),
  ).rejects.toThrow('El puntaje no puede ser negativo.');
});
