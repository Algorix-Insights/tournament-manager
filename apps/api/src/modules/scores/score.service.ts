import { prisma } from '../../core/prisma';
import { CreateScoreDTO } from './score.types';

export class ScoreService {
  static async getAll() {
    return prisma.puntuacion.findMany({
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

  // RF03 / RF05: Registrar puntuación
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
        videojuego: true,
      },
    });
  }

  // RF06: Mostrar clasificación / Ranking
  static async getRanking() {
    const scores = await prisma.puntuacion.findMany({
      include: {
        jugador: {
          select: {
            gamertag: true,
            nombre: true,
          },
        },
        videojuego: {
          select: {
            nombre: true,
          },
        },
      },
      orderBy: {
        puntuacion: 'desc',
      },
    });

    return scores.map((item, index) => ({
      posicion: index + 1,
      jugador: item.jugador.gamertag,
      nombreJugador: item.jugador.nombre,
      videojuego: item.videojuego.nombre,
      puntuacion: item.puntuacion,
      fecha: item.fecha,
    }));
  }

  // RF08: Estadísticas globales
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
