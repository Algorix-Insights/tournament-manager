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

  test('shows the API message when a player email is already registered', async () => {
    mockedGet.mockResolvedValue({ data: { data: [], totalRecords: 0 } });
    mockedPost.mockRejectedValue({
      isAxiosError: true,
      message: 'Request failed',
      response: { data: { error: 'El correo electrónico ya está registrado.' } },
    });

    renderWithQuery(<PlayersPage />);
    fireEvent.click((await screen.findAllByRole('button', { name: '¡Vamos!' }))[0]);
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Carlos Mendoza' } });
    fireEvent.change(screen.getByLabelText('Gamertag'), { target: { value: 'ShadowQA' } });
    fireEvent.change(screen.getByLabelText('Correo Electronico'), { target: { value: 'carlos@test.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Registrar' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('El correo electrónico ya está registrado.');
  });

  test('uses the played games included in the players response', async () => {
    mockedGet.mockImplementation((url) => Promise.resolve({
      data: url === '/scores/stats'
        ? { totalPlayers: 1, totalGames: 1, totalScores: 1, averageScore: 450 }
        : url === '/games'
          ? { data: [], totalRecords: 0 }
          : {
            data: [{
              id: 8,
              name: 'Carlos Mendoza',
              gamertag: 'ShadowQA',
              email: 'carlos@test.com',
              createdAt: '2026-03-12T12:00:00.000Z',
              games: [{ gameId: 2, game: 'Minecraft', genre: 'Sandbox', score: 450 }],
            }],
            totalRecords: 1,
          },
    }));

    renderWithQuery(<PlayersPage />);
    fireEvent.click(await screen.findByRole('button', { name: /Carlos Mendoza ShadowQA/ }));

    expect(await screen.findByRole('heading', { name: 'Minecraft' })).toBeInTheDocument();
    expect(mockedGet).not.toHaveBeenCalledWith('/players/8');
  });

  test('registers points with the selected player and game', async () => {
    mockedGet.mockImplementation((url) => Promise.resolve({
      data: url === '/games'
        ? {
          data: [{ id: 2, name: 'Minecraft', genre: { id: 1, name: 'Sandbox' } }],
          totalRecords: 1,
        }
        : {
          data: [{
            id: 8,
            name: 'Carlos Mendoza',
            gamertag: 'ShadowQA',
            email: 'carlos@test.com',
            createdAt: '2026-03-12T12:00:00.000Z',
          }],
          totalRecords: 1,
        },
    }));
    mockedPost.mockResolvedValue({ data: { id: 4, playerId: 8, gameId: 2, score: 950 } });

    renderWithQuery(<PlayersPage />);
    fireEvent.click((await screen.findAllByRole('button', { name: '¡Vamos!' }))[1]);
    fireEvent.click(screen.getByRole('button', { name: 'Nombre del jugador' }));
    fireEvent.click(await screen.findByRole('option', { name: 'Carlos Mendoza' }));
    fireEvent.click(screen.getByRole('button', { name: 'Videojuego' }));
    fireEvent.click(await screen.findByRole('option', { name: 'Minecraft' }));
    fireEvent.change(screen.getByLabelText('Puntuación'), { target: { value: '950' } });
    fireEvent.click(screen.getByRole('button', { name: 'Asignar' }));

    await waitFor(() => {
      expect(mockedPost).toHaveBeenCalledWith('/scores', { playerId: 8, gameId: 2, score: 950 });
    });
  });

  test('shows the total number of games returned by the API', async () => {
    mockedGet.mockImplementation((url) => Promise.resolve({
      data: url === '/scores/stats'
        ? { totalPlayers: 3, totalGames: 42, totalScores: 0, averageScore: 0 }
        : { data: [], totalRecords: 3 },
    }));

    renderWithQuery(<PlayersPage />);

    expect(await screen.findByText('42')).toBeInTheDocument();
  });
});
