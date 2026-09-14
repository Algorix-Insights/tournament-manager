import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import api from '@/core/api/axios';
import GamesPage from '@/features/games/pages/GamesPage';
import { renderWithQuery } from '@/tests/query-test-utils';

const mockedGet = jest.spyOn(api, 'get');
const mockedPost = jest.spyOn(api, 'post');
const mockedPut = jest.spyOn(api, 'put');
const mockedDelete = jest.spyOn(api, 'delete');
const mockedConfirm = jest.spyOn(window, 'confirm');

describe('GamesPage', () => {
  beforeEach(() => {
    mockedGet.mockReset();
    mockedPost.mockReset();
    mockedPut.mockReset();
    mockedDelete.mockReset();
    mockedConfirm.mockReset();
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

  test('registers a game with the selected genre', async () => {
    mockedGet.mockImplementation((url) => {
      if (url === '/genres') {
        return Promise.resolve({
          data: { data: [{ id: 4, name: 'Fighting' }], totalRecords: 1 },
        });
      }

      return Promise.resolve({ data: { data: [], totalRecords: 0 } });
    });
    mockedPost.mockResolvedValue({
      data: { id: 6, name: 'Tekken 8', genreId: 4, genre: { id: 4, name: 'Fighting' } },
    });

    renderWithQuery(<GamesPage />);
    fireEvent.click(await screen.findByRole('button', { name: '¡Vamos!' }));
    fireEvent.change(screen.getByLabelText('Nombre del videojuego'), { target: { value: 'Tekken 8' } });
    fireEvent.click(screen.getByRole('button', { name: 'Género del videojuego' }));
    fireEvent.click(await screen.findByRole('option', { name: 'Fighting' }));
    fireEvent.click(screen.getByRole('button', { name: 'Registrar' }));

    await waitFor(() => {
      expect(mockedPost).toHaveBeenCalledWith('/games', { name: 'Tekken 8', genreId: 4 });
    });
  });

  test('shows the API message when a game is already registered', async () => {
    mockedGet.mockImplementation((url) => Promise.resolve({
      data: url === '/genres'
        ? { data: [{ id: 4, name: 'Fighting' }], totalRecords: 1 }
        : { data: [], totalRecords: 0 },
    }));
    mockedPost.mockRejectedValue({
      isAxiosError: true,
      message: 'Request failed',
      response: { data: { error: 'El videojuego ya está registrado.' } },
    });

    renderWithQuery(<GamesPage />);
    fireEvent.click(await screen.findByRole('button', { name: '¡Vamos!' }));
    fireEvent.change(screen.getByLabelText('Nombre del videojuego'), { target: { value: 'Tekken 8' } });
    fireEvent.click(screen.getByRole('button', { name: 'Género del videojuego' }));
    fireEvent.click(await screen.findByRole('option', { name: 'Fighting' }));
    fireEvent.click(screen.getByRole('button', { name: 'Registrar' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('El videojuego ya está registrado.');
  });

  test('searches games through the API', async () => {
    mockedGet.mockResolvedValue({
      data: { data: [], totalRecords: 0 },
    });

    renderWithQuery(<GamesPage />);
    fireEvent.change(screen.getByPlaceholderText('Buscar juego'), { target: { value: 'Tekken' } });

    await waitFor(() => {
      expect(mockedGet).toHaveBeenCalledWith('/games', { params: { search: 'Tekken' } });
    });
  });

  test('updates a game from its tile', async () => {
    mockedGet.mockImplementation((url) => {
      if (url === '/genres') {
        return Promise.resolve({
          data: { data: [{ id: 4, name: 'Fighting' }], totalRecords: 1 },
        });
      }

      return Promise.resolve({
        data: {
          data: [{ id: 6, name: 'Tekken 8', genreId: 4, genre: { id: 4, name: 'Fighting' } }],
          totalRecords: 1,
        },
      });
    });
    mockedPut.mockResolvedValue({
      data: { id: 6, name: 'Tekken 8 Ultimate', genreId: 4, genre: { id: 4, name: 'Fighting' } },
    });

    renderWithQuery(<GamesPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'Editar' }));
    fireEvent.change(screen.getByLabelText('Nombre del videojuego'), { target: { value: 'Tekken 8 Ultimate' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }));

    await waitFor(() => {
      expect(mockedPut).toHaveBeenCalledWith('/games/6', { name: 'Tekken 8 Ultimate', genreId: 4 });
    });
  });

  test('deletes a game after confirmation', async () => {
    mockedGet.mockResolvedValue({
      data: {
        data: [{ id: 6, name: 'Tekken 8', genreId: 4, genre: { id: 4, name: 'Fighting' } }],
        totalRecords: 1,
      },
    });
    mockedConfirm.mockReturnValue(true);
    mockedDelete.mockResolvedValue({ data: { message: 'Videojuego eliminado correctamente' } });

    renderWithQuery(<GamesPage />);
    fireEvent.click(await screen.findByRole('button', { name: 'Eliminar Tekken 8' }));

    await waitFor(() => {
      expect(mockedDelete).toHaveBeenCalledWith('/games/6');
    });
  });
});
