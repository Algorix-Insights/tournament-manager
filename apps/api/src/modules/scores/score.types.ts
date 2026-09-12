export interface CreateScoreDTO {
  jugadorId: number;
  videojuegoId: number;
  puntuacion: number;
}

export interface RankingFilterDTO {
  jugadorId?: number;
  videojuegoId?: number;
  generoId?: number;
  minScore?: number;
  maxScore?: number;
  periodo?: number;
  fechaInicio?: string;
  fechaFin?: string;
  orden?: string;
  pagina?: number;
  cantidadRegistros?: number;
}

export type ScoreFilterDTO = RankingFilterDTO;
