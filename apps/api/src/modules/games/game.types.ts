export interface CreateGameDTO {
  nombre: string;
  generoId: number;
}

export interface UpdateGameDTO {
  nombre?: string;
  generoId?: number;
}
