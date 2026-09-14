import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import api from '@/core/api/axios';
import PlayersPage from '@/features/players/pages/PlayersPage';
import { renderWithQuery } from '@/tests/query-test-utils';

const mockedGet = jest.spyOn(api, 'get');
const mockedPost = jest.spyOn(api, 'post');

describe('PlayersPage', () => {
  beforeEach(() => {
    mockedGet.mockReset();
    mockedPost.mockReset();
  });

  test('renders players returned by the players API', async () => {
    mockedGet.mockResolvedValue({
      data: {
        data: [
          {
            id: 8,
            name: 'Carlos Mendoza',
            gamertag: 'ShadowQA',
            email: 'carlos@test.com',
            createdAt: '2026-03-12T12:00:00.000Z',
          },
        ],
        totalRecords: 1,
      },
    });

    renderWithQuery(<PlayersPage />);

    expect(await screen.findByText('Carlos Mendoza')).toBeInTheDocument();
    expect(screen.getByText('ShadowQA')).toBeInTheDocument();
    expect(screen.getByText('carlos@test.com')).toBeInTheDocument();
    expect(mockedGet).toHaveBeenCalledWith('/players');
  });

  test('registers a player through the players API', async () => {
    mockedGet.mockResolvedValue({ data: { data: [], totalRecords: 0 } });
    mockedPost.mockResolvedValue({
      data: {
        id: 8,
        name: 'Carlos Mendoza',
        gamertag: 'ShadowQA',
        email: 'carlos@test.com',
        createdAt: '2026-03-12T12:00:00.000Z',
      },
    });

    renderWithQuery(<PlayersPage />);
    fireEvent.click((await screen.findAllByRole('button', { name: '¡Vamos!' }))[0]);
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Carlos Mendoza' } });
    fireEvent.change(screen.getByLabelText('Gamertag'), { target: { value: 'ShadowQA' } });
    fireEvent.change(screen.getByLabelText('Correo Electronico'), { target: { value: 'carlos@test.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Registrar' }));

    await waitFor(() => {
      expect(mockedPost).toHaveBeenCalledWith('/players', {
        name: 'Carlos Mendoza',
        gamertag: 'ShadowQA',
        email: 'carlos@test.com',
      });
    });
  });

  test('searches players through the API', async () => {
    mockedGet.mockResolvedValue({ data: { data: [], totalRecords: 0 } });

    renderWithQuery(<PlayersPage />);
    fireEvent.change(screen.getByPlaceholderText('Buscar participante'), { target: { value: 'Carlos' } });

    await waitFor(() => {
      expect(mockedGet).toHaveBeenCalledWith('/players', { params: { search: 'Carlos' } });
    });
  });
});
