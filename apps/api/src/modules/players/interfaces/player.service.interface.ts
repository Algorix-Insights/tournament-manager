import type { PaginatedResponse } from '../../../core/utils/pagination.util';
import type { CreatePlayerDTO, PlayerFilterDTO, UpdatePlayerDTO } from '../player.types';

export interface IPlayerService {
  getAll(filters?: PlayerFilterDTO): Promise<PaginatedResponse<unknown>>;
  getById(id: number): Promise<unknown | null>;
  create(data: CreatePlayerDTO): Promise<unknown>;
  update(id: number, data: UpdatePlayerDTO): Promise<unknown>;
  delete(id: number): Promise<unknown>;
}
