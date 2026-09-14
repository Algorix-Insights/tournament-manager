import axios from 'axios';
import api from '@/core/api/axios';
import type { Game, GameGenre, GameInput, GenresResponse, GamesResponse } from '@/features/games/games.types';

export async function fetchGames(search = '', page = 1, limit = 20): Promise<GamesResponse> {
  const params = {
    ...(search ? { search } : {}),
    ...(page !== 1 || limit !== 20 ? { page, limit } : {}),
  };
  const response = Object.keys(params).length > 0
    ? await api.get<GamesResponse>('/games', { params })
    : await api.get<GamesResponse>('/games');
  return response.data;
}

export async function fetchGenres(): Promise<GameGenre[]> {
  const response = await api.get<GameGenre[] | GenresResponse>('/genres');
  if (Array.isArray(response.data)) {
    return response.data;
  }
  return response.data?.data ?? [];
}

export async function createGame(data: GameInput): Promise<Game> {
  const response = await api.post<Game>('/games', data);
  return response.data;
}

export async function updateGame(id: number, data: Partial<GameInput>): Promise<Game> {
  const response = await api.put<Game>(`/games/${id}`, data);
  return response.data;
}

export async function deleteGame(id: number): Promise<void> {
  await api.delete(`/games/${id}`);
}

interface ApiErrorResponse {
  error?: string;
  details?: { message?: string }[];
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const response = error.response?.data;
    const details = response?.details?.map((detail) => detail.message).filter(Boolean).join(' ');
    return details ? `${response?.error ?? 'Error de validación'} ${details}` : response?.error ?? error.message;
  }

  if (error instanceof Error) return error.message;
  return 'No se pudo completar la operación.';
}
