import { beforeEach, expect, jest, test } from '@jest/globals';
import { screen } from '@testing-library/react';
import api from '@/core/api/axios';
import ScoresPage from '@/features/scores/pages/ScoresPage';
import { renderWithQuery } from '@/tests/query-test-utils';

const mockedGet = jest.spyOn(api, 'get');

beforeEach(() => {
  mockedGet.mockReset();
});

test('renders all games returned for each ranked player', async () => {
  mockedGet.mockImplementation((url) => Promise.resolve({
    data: url === '/scores/ranking'
      ? {
        data: [{
          position: 1,
          playerId: 8,
          player: 'ShadowQA',
          playerName: 'Carlos Mendoza',
          gameId: 7,
          game: 'Street Fighter 6',
          genre: 'Fighting',
          score: 950,
          createdAt: '2026-01-02T00:00:00.000Z',
          games: [
            { gameId: 7, game: 'Street Fighter 6', genre: 'Fighting', score: 950 },
            { gameId: 6, game: 'Tekken 8', genre: 'Fighting', score: 450 },
          ],
        }],
        totalRecords: 1,
      }
      : { totalPlayers: 1, totalGames: 2, totalScores: 2, averageScore: 700 },
  }));

  renderWithQuery(<ScoresPage />);

  expect(await screen.findByText('Street Fighter 6')).toBeInTheDocument();
  expect(screen.getByText('Tekken 8: 450')).toBeInTheDocument();
});
