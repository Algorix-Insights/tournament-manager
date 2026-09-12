export interface CreatePlayerDTO {
  nombre: string;
  gamertag: string;
  correo: string;
}

export interface UpdatePlayerDTO {
  nombre?: string;
  gamertag?: string;
  correo?: string;
}
