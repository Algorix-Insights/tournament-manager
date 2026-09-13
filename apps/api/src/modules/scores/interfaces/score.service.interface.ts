import type { PaginatedResponse } from '../../../core/utils/pagination.util';
import type { CreateScoreDTO, RankingFilterDTO, ScoreFilterDTO } from '../score.types';

export interface ScoreStats {
  totalPlayers: number;
  totalGames: number;
  totalScores: number;
  averageScore: number;
  totalJugadores: number;
  totalVideojuegos: number;
  totalPuntuaciones: number;
  puntuacionPromedio: number;
}

export interface IScoreService {
  getAll(filters?: ScoreFilterDTO): Promise<PaginatedResponse<unknown>>;
  create(data: CreateScoreDTO): Promise<unknown>;
  getRanking(filters?: RankingFilterDTO): Promise<PaginatedResponse<unknown>>;
  getStats(): Promise<ScoreStats>;
  delete(id: number): Promise<unknown>;
}
