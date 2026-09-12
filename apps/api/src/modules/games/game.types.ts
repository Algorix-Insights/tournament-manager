export interface CreateGameDTO {
  name: string;
  genreId: number;
}

export interface UpdateGameDTO {
  name?: string;
  genreId?: number;
}

export interface GameFilterDTO {
  name?: string;
  genreId?: number;
  genreName?: string;
  order?: string;
  page?: number;
  limit?: number;

  // Legacy compatibility
  nombre?: string;
  generoId?: number;
  generoNombre?: string;
  orden?: string;
  pagina?: number;
  cantidadRegistros?: number;
}
