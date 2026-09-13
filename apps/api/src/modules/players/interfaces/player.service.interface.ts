import type { PaginatedResponse, PaginationParams } from '@/core/utils/pagination.util';
import type { CreatePlayerDTO, PlayerFilterDTO, UpdatePlayerDTO } from '@/modules/players/dtos/player.dto';

export interface IPlayerService {
  getAll(filters?: PlayerFilterDTO, pagination?: PaginationParams): Promise<PaginatedResponse<unknown>>;
  getById(id: number): Promise<unknown | null>;
  create(data: CreatePlayerDTO): Promise<unknown>;
  update(id: number, data: UpdatePlayerDTO): Promise<unknown>;
  delete(id: number): Promise<unknown>;
}
