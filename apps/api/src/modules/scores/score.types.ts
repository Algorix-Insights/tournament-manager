export interface CreateScoreDTO {
  playerId: number;
  gameId: number;
  score: number;
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
}

export type ScoreFilterDTO = RankingFilterDTO;
