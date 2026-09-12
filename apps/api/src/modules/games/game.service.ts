import { prisma } from '../../core/prisma';
import { CreateGameDTO, UpdateGameDTO } from './game.types';

export class GameService {
  static async getAll() {
    return prisma.videojuego.findMany({
      include: {
        genero: true,
      },
      orderBy: {
        nombre: 'asc',
      },
    });
  }

  static async getById(id: number) {
    return prisma.videojuego.findUnique({
      where: { id },
      include: {
        genero: true,
        puntuaciones: {
          include: {
            jugador: true,
          },
        },
      },
    });
  }

  static async create(data: CreateGameDTO) {
    return prisma.videojuego.create({
      data: {
        nombre: data.nombre.trim(),
        generoId: data.generoId,
      },
      include: {
        genero: true,
      },
    });
  }

  static async update(id: number, data: UpdateGameDTO) {
    return prisma.videojuego.update({
      where: { id },
      data: {
        ...(data.nombre && { nombre: data.nombre.trim() }),
        ...(data.generoId !== undefined && { generoId: data.generoId }),
      },
      include: {
        genero: true,
      },
    });
  }

  static async delete(id: number) {
    return prisma.videojuego.delete({
      where: { id },
    });
  }
}
