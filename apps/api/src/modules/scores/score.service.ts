import { prisma } from '../../core/prisma';
import { CreateScoreDTO, RankingFilterDTO, ScoreFilterDTO } from './score.types';
import { buildDateFilter } from '../../core/utils/date-filter.util';

function buildScoreWhere(filters?: ScoreFilterDTO) {
  const where: any = {};

  if (filters?.jugadorId !== undefined) {
    where.jugadorId = filters.jugadorId;
  }

  if (filters?.videojuegoId !== undefined) {
    where.videojuegoId = filters.videojuegoId;
  }

  if (filters?.generoId !== undefined) {
    where.videojuego = {
      generoId: filters.generoId,
    };
  }

  if (filters?.minScore !== undefined || filters?.maxScore !== undefined) {
    where.puntuacion = {};
    if (filters.minScore !== undefined) {
      where.puntuacion.gte = filters.minScore;
    }
    if (filters.maxScore !== undefined) {
      where.puntuacion.lte = filters.maxScore;
    }
  }

  const dateRange = buildDateFilter(filters?.periodo, filters?.fechaInicio, filters?.fechaFin);
  if (dateRange) {
    where.fecha = dateRange;
  }

  return where;
}

export class ScoreService {
  static async getAll(filters?: ScoreFilterDTO) {
    const where = buildScoreWhere(filters);

    return prisma.puntuacion.findMany({
      where,
      include: {
        jugador: {
          select: {
            id: true,
            nombre: true,
            gamertag: true,
          },
        },
        videojuego: {
          select: {
            id: true,
            nombre: true,
            genero: true,
          },
        },
      },
      orderBy: {
        fecha: 'desc',
      },
    });
  }

  static async create(data: CreateScoreDTO) {
    if (data.puntuacion < 0) {
      throw new Error('La puntuación no puede ser negativa');
    }

    return prisma.puntuacion.create({
      data: {
        jugadorId: data.jugadorId,
        videojuegoId: data.videojuegoId,
        puntuacion: data.puntuacion,
      },
      include: {
        jugador: true,
        videojuego: {
          include: {
            genero: true,
          },
        },
      },
    });
  }

  static async getRanking(filters?: RankingFilterDTO) {
    const where = buildScoreWhere(filters);

    const scores = await prisma.puntuacion.findMany({
      where,
      include: {
        jugador: {
          select: {
            id: true,
            gamertag: true,
            nombre: true,
          },
        },
        videojuego: {
          select: {
            id: true,
            nombre: true,
            genero: true,
          },
        },
      },
      orderBy: {
        puntuacion: 'desc',
      },
    });

    return scores.map((item, index) => ({
      posicion: index + 1,
      jugadorId: item.jugador.id,
      jugador: item.jugador.gamertag,
      nombreJugador: item.jugador.nombre,
      videojuegoId: item.videojuego.id,
      videojuego: item.videojuego.nombre,
      genero: item.videojuego.genero.nombre,
      puntuacion: item.puntuacion,
      fecha: item.fecha,
    }));
  }

  static async getStats() {
    const totalJugadores = await prisma.jugador.count();
    const totalVideojuegos = await prisma.videojuego.count();
    const totalPuntuaciones = await prisma.puntuacion.count();
    const avgResult = await prisma.puntuacion.aggregate({
      _avg: {
        puntuacion: true,
      },
    });

    const puntuacionPromedio = avgResult._avg.puntuacion
      ? Number(avgResult._avg.puntuacion.toFixed(2))
      : 0;

    return {
      totalJugadores,
      totalVideojuegos,
      totalPuntuaciones,
      puntuacionPromedio,
    };
  }

  static async delete(id: number) {
    return prisma.puntuacion.delete({
      where: { id },
    });
  }
}
