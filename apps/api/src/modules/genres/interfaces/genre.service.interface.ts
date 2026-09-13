import type { PaginatedResponse } from '../../../core/utils/pagination.util';
import type { CreateGenreDTO, GenreFilterDTO, UpdateGenreDTO } from '../genre.types';

export interface IGenreService {
  getAll(filters?: GenreFilterDTO): Promise<PaginatedResponse<unknown>>;
  getById(id: number): Promise<unknown | null>;
  create(data: CreateGenreDTO): Promise<unknown>;
  update(id: number, data: UpdateGenreDTO): Promise<unknown>;
  delete(id: number): Promise<unknown>;
}
