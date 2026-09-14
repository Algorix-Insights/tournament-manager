import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { screen } from '@testing-library/react';
import api from '@/core/api/axios';
import GamesPage from '@/features/games/pages/GamesPage';
import { renderWithQuery } from '@/tests/query-test-utils';

const mockedGet = jest.spyOn(api, 'get');

describe('GamesPage', () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  test('renders games returned by the games API', async () => {
    mockedGet.mockResolvedValue({
      data: {
        data: [
          {
            id: 6,
            name: 'Tekken 8',
            genreId: 4,
            genre: { id: 4, name: 'Fighting' },
          },
        ],
        totalRecords: 1,
      },
    });

    renderWithQuery(<GamesPage />);

    expect(await screen.findByRole('heading', { name: 'Tekken 8' })).toBeInTheDocument();
    expect(screen.getByText('Fighting')).toBeInTheDocument();
    expect(mockedGet).toHaveBeenCalledWith('/games');
  });

  test('shows the API error when games cannot be loaded', async () => {
    mockedGet.mockRejectedValue(new Error('Games API unavailable'));

    renderWithQuery(<GamesPage />);

    expect(await screen.findByRole('alert')).toHaveTextContent('Games API unavailable');
  });
});
