export interface CreateGenreDTO {
  name: string;
}

export interface UpdateGenreDTO {
  name?: string;
}

export interface GenreFilterDTO {
  name?: string;
  order?: string;
  page?: number;
  limit?: number;
}
