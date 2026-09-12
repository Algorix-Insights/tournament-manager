export interface CreatePlayerDTO {
  name: string;
  gamertag: string;
  email: string;
}

export interface UpdatePlayerDTO {
  name?: string;
  gamertag?: string;
  email?: string;
}

export interface PlayerFilterDTO {
  name?: string;
  gamertag?: string;
  email?: string;
  period?: number;
  startDate?: string;
  endDate?: string;
  order?: string;
  page?: number;
  limit?: number;

  // Legacy compatibility
  nombre?: string;
  correo?: string;
  periodo?: number;
  fechaInicio?: string;
  fechaFin?: string;
  orden?: string;
  pagina?: number;
  cantidadRegistros?: number;
}
