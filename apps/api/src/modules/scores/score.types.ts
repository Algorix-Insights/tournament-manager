export interface CreateScoreDTO {
  playerId: number;
  gameId: number;
  score: number;

  // Legacy compatibility
  jugadorId?: number;
  videojuegoId?: number;
  puntuacion?: number;
}

export interface RankingFilterDTO {
  playerId?: number;
  gameId?: number;
  genreId?: number;
  minScore?: number;
  maxScore?: number;
  period?: number;
  startDate?: string;
  endDate?: string;
  order?: string;
  page?: number;
  limit?: number;

  // Legacy compatibility
  jugadorId?: number;
  videojuegoId?: number;
  generoId?: number;
  periodo?: number;
  fechaInicio?: string;
  fechaFin?: string;
  orden?: string;
  pagina?: number;
  cantidadRegistros?: number;
}

export type ScoreFilterDTO = RankingFilterDTO;
