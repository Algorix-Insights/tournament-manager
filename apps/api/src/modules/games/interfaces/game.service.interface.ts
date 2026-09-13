import type { PaginatedResponse, PaginationParams } from '@/core/utils/pagination.util';
import type { CreateGameDTO, GameFilterDTO, UpdateGameDTO } from '@/modules/games/game.types';

export interface IGameService {
  getAll(filters?: GameFilterDTO, pagination?: PaginationParams): Promise<PaginatedResponse<unknown>>;
  getById(id: number): Promise<unknown | null>;
  create(data: CreateGameDTO): Promise<unknown>;
  update(id: number, data: UpdateGameDTO): Promise<unknown>;
  delete(id: number): Promise<unknown>;
}
