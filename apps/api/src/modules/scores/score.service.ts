import { prisma } from '@/core/prisma';
import type { CreateScoreDTO, RankingFilterDTO, ScoreFilterDTO } from '@/modules/scores/dtos/score.dto';
import { buildDateFilter } from '@/core/utils/date-filter.util';
import { parseOrderBy } from '@/core/utils/order-by.util';
import { DEFAULT_PAGINATION, formatPaginatedResponse, PaginationParams } from '@/core/utils/pagination.util';
import { IScoreService, ScoreStats } from '@/modules/scores/interfaces/score.service.interface';

function buildScoreWhere(filters?: ScoreFilterDTO) {
  const where: any = {};

  const search = filters?.search?.trim();
  if (search) {
    where.OR = [
      { player: { name: { contains: search } } },
      { player: { gamertag: { contains: search } } },
      { game: { name: { contains: search } } },
      { game: { genre: { name: { contains: search } } } },
    ];
  }

  const playerId = filters?.playerId;
  if (playerId !== undefined) {
    where.playerId = playerId;
  }

  const gameId = filters?.gameId;
  if (gameId !== undefined) {
    where.gameId = gameId;
  }

  const genreId = filters?.genreId;
  if (genreId !== undefined) {
    where.game = {
      genreId,
    };
  }

  if (filters?.minScore !== undefined || filters?.maxScore !== undefined) {
    where.score = {};
    if (filters.minScore !== undefined) {
      where.score.gte = filters.minScore;
    }
    if (filters.maxScore !== undefined) {
      where.score.lte = filters.maxScore;
    }
  }

  const period = filters?.period;
  const startDate = filters?.startDate;
  const endDate = filters?.endDate;

  const dateRange = buildDateFilter(period, startDate, endDate);
  if (dateRange) {
    where.createdAt = dateRange;
  }

  return where;
}

const scoreFieldMapping = {
  id: 'id',
  score: 'score',
  createdAt: 'createdAt',
  date: 'createdAt',
  player: { player: 'gamertag' },
  playerName: { player: 'name' },
  game: { game: 'name' },
};

export class ScoreService implements IScoreService {
  async getAll(filters?: ScoreFilterDTO, pagination?: PaginationParams) {
    const where = buildScoreWhere(filters);
    const order = filters?.order;
    const orderBy = parseOrderBy(order, scoreFieldMapping, { createdAt: 'desc' });
    const { skip, take } = pagination ?? DEFAULT_PAGINATION;

    const [data, totalRecords] = await Promise.all([
      prisma.score.findMany({
        where,
        include: {
          player: {
            select: {
              id: true,
              name: true,
              gamertag: true,
            },
          },
          game: {
            select: {
              id: true,
              name: true,
              genre: true,
            },
          },
        },
        orderBy,
        skip,
        take,
      }),
      prisma.score.count({ where }),
    ]);

    return formatPaginatedResponse(data, totalRecords);
  }

  async create(data: CreateScoreDTO) {
    if (data.score < 0) {
      throw new Error('El puntaje no puede ser negativo.');
    }

    return prisma.score.create({
      data: {
        playerId: data.playerId,
        gameId: data.gameId,
        score: data.score,
      },
      include: {
        player: true,
        game: {
          include: {
            genre: true,
          },
        },
      },
    });
  }

  async getRanking(filters?: RankingFilterDTO, pagination?: PaginationParams) {
    const where = buildScoreWhere(filters);
    const order = filters?.order;
    const orderBy = parseOrderBy(order, scoreFieldMapping, { score: 'desc' });
    const { skip, take } = pagination ?? DEFAULT_PAGINATION;

    const scores = await prisma.score.findMany({
      where,
      include: {
        player: {
          select: {
            id: true,
            gamertag: true,
            name: true,
          },
        },
        game: {
          select: {
            id: true,
            name: true,
            genre: true,
          },
        },
      },
      orderBy,
    });

    const bestScoreByPlayer = new Map<number, (typeof scores)[number]>();
    for (const item of scores) {
      const current = bestScoreByPlayer.get(item.player.id);
      if (!current || item.score > current.score) {
        bestScoreByPlayer.set(item.player.id, item);
      }
    }

    // ponytail: deduplicate in memory; use a SQL window query if score volume makes this expensive.
    const ranking = [...bestScoreByPlayer.values()].sort((a, b) => b.score - a.score);
    const paginatedRanking = ranking.slice(skip, skip + take);
    const formattedRanking = paginatedRanking.map((item, index) => ({
      position: skip + index + 1,
      playerId: item.player.id,
      player: item.player.gamertag,
      playerName: item.player.name,
      gameId: item.game.id,
      game: item.game.name,
      genre: item.game.genre.name,
      score: item.score,
      createdAt: item.createdAt,
    }));

    return formatPaginatedResponse(formattedRanking, ranking.length);
  }

  async getStats(): Promise<ScoreStats> {
    const totalPlayers = await prisma.player.count();
    const totalGames = await prisma.game.count();
    const totalScores = await prisma.score.count();
    const avgResult = await prisma.score.aggregate({
      _avg: {
        score: true,
      },
    });

    const averageScore = avgResult._avg.score
      ? Number(avgResult._avg.score.toFixed(2))
      : 0;

    return {
      totalPlayers,
      totalGames,
      totalScores,
      averageScore,
    };
  }

  async delete(id: number) {
    return prisma.score.delete({
      where: { id },
    });
  }
}
