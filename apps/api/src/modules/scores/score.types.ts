export interface CreateScoreDTO {
  jugadorId: number;
  videojuegoId: number;
  puntuacion: number;
}

export interface RankingFilterDTO {
  videojuegoId?: number;
  minScore?: number;
  maxScore?: number;
}
