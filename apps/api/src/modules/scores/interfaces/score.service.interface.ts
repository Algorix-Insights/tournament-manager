import type { PaginatedResponse, PaginationParams } from '@/core/utils/pagination.util';
import type { CreateScoreDTO, RankingFilterDTO, ScoreFilterDTO } from '@/modules/scores/score.types';

export interface ScoreStats {
  totalPlayers: number;
  totalGames: number;
  totalScores: number;
  averageScore: number;
}

export interface IScoreService {
  getAll(filters?: ScoreFilterDTO, pagination?: PaginationParams): Promise<PaginatedResponse<unknown>>;
  create(data: CreateScoreDTO): Promise<unknown>;
  getRanking(filters?: RankingFilterDTO, pagination?: PaginationParams): Promise<PaginatedResponse<unknown>>;
  getStats(): Promise<ScoreStats>;
  delete(id: number): Promise<unknown>;
}
