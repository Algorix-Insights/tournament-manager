import { beforeEach, expect, jest, test } from '@jest/globals';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import api from '@/core/api/axios';
import DashboardPage from '@/features/dashboard/pages/DashboardPage';
import { renderWithQuery } from '@/tests/query-test-utils';

const mockedGet = jest.spyOn(api, 'get');
const mockedPost = jest.spyOn(api, 'post');

beforeEach(() => {
  mockedGet.mockImplementation((url) => {
    if (url === '/scores/stats') {
      return Promise.resolve({ data: { totalPlayers: 1, totalGames: 1, totalScores: 0, averageScore: 0 } });
    }

    if (url === '/scores/ranking') return Promise.resolve({ data: { data: [] } });
    if (url === '/players') return Promise.resolve({ data: { data: [], totalRecords: 0 } });
    if (url === '/games') return Promise.resolve({ data: { data: [], totalRecords: 0 } });
    return Promise.resolve({ data: {} });
  });
  mockedPost.mockReset();
});

test('registers a player from the dashboard modal', async () => {
  mockedPost.mockResolvedValue({
    data: {
      id: 8,
      name: 'Carlos Mendoza',
      gamertag: 'ShadowQA',
      email: 'carlos@test.com',
      createdAt: '2026-03-12T12:00:00.000Z',
    },
  });

  renderWithQuery(
    <MemoryRouter>
      <DashboardPage />
    </MemoryRouter>,
  );

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

test('registers points from the dashboard modal', async () => {
  mockedGet.mockImplementation((url) => {
    if (url === '/scores/stats') {
      return Promise.resolve({ data: { totalPlayers: 1, totalGames: 1, totalScores: 0, averageScore: 0 } });
    }

    if (url === '/scores/ranking') return Promise.resolve({ data: { data: [] } });
    if (url === '/players') return Promise.resolve({
      data: {
        data: [{ id: 8, name: 'Carlos Mendoza', gamertag: 'ShadowQA', email: 'carlos@test.com', createdAt: '2026-03-12T12:00:00.000Z' }],
        totalRecords: 1,
      },
    });
    return Promise.resolve({
      data: {
        data: [{ id: 2, name: 'Minecraft', genreId: 1, genre: { id: 1, name: 'Sandbox' } }],
        totalRecords: 1,
      },
    });
  });
  mockedPost.mockResolvedValue({ data: { id: 4, playerId: 8, gameId: 2, score: 950 } });

  renderWithQuery(
    <MemoryRouter>
      <DashboardPage />
    </MemoryRouter>,
  );

  fireEvent.click((await screen.findAllByRole('button', { name: '¡Vamos!' }))[2]);
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
