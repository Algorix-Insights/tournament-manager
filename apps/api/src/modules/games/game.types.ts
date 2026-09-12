export interface CreateGameDTO {
  nombre: string;
  genero: string;
}

export interface UpdateGameDTO {
  nombre?: string;
  genero?: string;
}
