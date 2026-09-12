export interface CreateGameDTO {
  nombre: string;
  generoId: number;
}

export interface UpdateGameDTO {
  nombre?: string;
  generoId?: number;
}

export interface GameFilterDTO {
  nombre?: string;
  generoId?: number;
  generoNombre?: string;
  orden?: string;
}
