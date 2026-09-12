import { prisma } from '../../core/prisma';
import { CreateScoreDTO, RankingFilterDTO, ScoreFilterDTO } from './score.types';
import { buildDateFilter } from '../../core/utils/date-filter.util';
import { parseOrderBy } from '../../core/utils/order-by.util';
import { parsePaginationParams, formatPaginatedResponse } from '../../core/utils/pagination.util';

function buildScoreWhere(filters?: ScoreFilterDTO) {
  const where: any = {};

  const playerId = filters?.playerId ?? filters?.jugadorId;
  if (playerId !== undefined) {
    where.playerId = playerId;
  }

  const gameId = filters?.gameId ?? filters?.videojuegoId;
  if (gameId !== undefined) {
    where.gameId = gameId;
  }

  const genreId = filters?.genreId ?? filters?.generoId;
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

  const period = filters?.period ?? filters?.periodo;
  const startDate = filters?.startDate ?? filters?.fechaInicio;
  const endDate = filters?.endDate ?? filters?.fechaFin;

  const dateRange = buildDateFilter(period, startDate, endDate);
  if (dateRange) {
    where.createdAt = dateRange;
  }

  return where;
}

const scoreFieldMapping = {
  id: 'id',
  score: 'score',
  puntuacion: 'score',
  createdAt: 'createdAt',
  date: 'createdAt',
  fecha: 'createdAt',
  player: { player: 'gamertag' },
  jugador: { player: 'gamertag' },
  playerName: { player: 'name' },
  jugadorNombre: { player: 'name' },
  game: { game: 'name' },
  videojuego: { game: 'name' },
};

export class ScoreService {
  static async getAll(filters?: ScoreFilterDTO) {
    const where = buildScoreWhere(filters);
    const order = filters?.order ?? filters?.orden;
    const orderBy = parseOrderBy(order, scoreFieldMapping, { createdAt: 'desc' });
    const { skip, take } = parsePaginationParams(filters);

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

  static async create(data: CreateScoreDTO) {
    if (data.score < 0) {
      throw new Error('Score cannot be negative');
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

  static async getRanking(filters?: RankingFilterDTO) {
    const where = buildScoreWhere(filters);
    const order = filters?.order ?? filters?.orden;
    const orderBy = parseOrderBy(order, scoreFieldMapping, { score: 'desc' });
    const { skip, take } = parsePaginationParams(filters);

    const [scores, totalRecords] = await Promise.all([
      prisma.score.findMany({
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
        skip,
        take,
      }),
      prisma.score.count({ where }),
    ]);

    const formattedRanking = scores.map((item, index) => ({
      position: skip + index + 1,
      posicion: skip + index + 1,
      playerId: item.player.id,
      player: item.player.gamertag,
      playerName: item.player.name,
      gameId: item.game.id,
      game: item.game.name,
      genre: item.game.genre.name,
      score: item.score,
      createdAt: item.createdAt,
    }));

    return formatPaginatedResponse(formattedRanking, totalRecords);
  }

  static async getStats() {
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
      // Legacy compatibility
      totalJugadores: totalPlayers,
      totalVideojuegos: totalGames,
      totalPuntuaciones: totalScores,
      puntuacionPromedio: averageScore,
    };
  }

  static async delete(id: number) {
    return prisma.score.delete({
      where: { id },
    });
  }
}
