import { prisma } from '../../core/prisma';
import { CreateGameDTO, UpdateGameDTO } from './game.types';

export class GameService {
  // RF02: Listar videojuegos
  static async getAll() {
    return prisma.videojuego.findMany({
      orderBy: {
        nombre: 'asc',
      },
    });
  }

  static async getById(id: number) {
    return prisma.videojuego.findUnique({
      where: { id },
      include: {
        puntuaciones: {
          include: {
            jugador: true,
          },
        },
      },
    });
  }

  // RF02: Registrar videojuego
  static async create(data: CreateGameDTO) {
    return prisma.videojuego.create({
      data: {
        nombre: data.nombre.trim(),
        genero: data.genero.trim(),
      },
    });
  }

  static async update(id: number, data: UpdateGameDTO) {
    return prisma.videojuego.update({
      where: { id },
      data,
    });
  }

  static async delete(id: number) {
    return prisma.videojuego.delete({
      where: { id },
    });
  }
}
