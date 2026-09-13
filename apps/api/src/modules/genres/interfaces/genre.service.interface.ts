import type { PaginatedResponse, PaginationParams } from '@/core/utils/pagination.util';
import type { CreateGenreDTO, GenreFilterDTO, UpdateGenreDTO } from '@/modules/genres/genre.types';

export interface IGenreService {
  getAll(filters?: GenreFilterDTO, pagination?: PaginationParams): Promise<PaginatedResponse<unknown>>;
  getById(id: number): Promise<unknown | null>;
  create(data: CreateGenreDTO): Promise<unknown>;
  update(id: number, data: UpdateGenreDTO): Promise<unknown>;
  delete(id: number): Promise<unknown>;
}
