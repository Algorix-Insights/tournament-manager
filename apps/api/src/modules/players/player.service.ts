import { prisma } from '../../core/prisma';
import { CreatePlayerDTO, UpdatePlayerDTO } from './player.types';

export class PlayerService {
  // RF04: Consultar jugadores
  static async getAll() {
    return prisma.jugador.findMany({
      select: {
        id: true,
        nombre: true,
        gamertag: true,
        correo: true,
        fechaRegistro: true,
      },
      orderBy: {
        fechaRegistro: 'desc',
      },
    });
  }

  // RF07: Buscar por nombre o gamertag
  static async search(query: string) {
    return prisma.jugador.findMany({
      where: {
        OR: [
          { nombre: { contains: query } },
          { gamertag: { contains: query } },
        ],
      },
      orderBy: {
        fechaRegistro: 'desc',
      },
    });
  }

  static async getById(id: number) {
    return prisma.jugador.findUnique({
      where: { id },
      include: {
        puntuaciones: {
          include: {
            videojuego: true,
          },
        },
      },
    });
  }

  // RF01: Registrar jugador
  static async create(data: CreatePlayerDTO) {
    return prisma.jugador.create({
      data: {
        nombre: data.nombre.trim(),
        gamertag: data.gamertag.trim(),
        correo: data.correo.trim(),
      },
    });
  }

  static async update(id: number, data: UpdatePlayerDTO) {
    return prisma.jugador.update({
      where: { id },
      data,
    });
  }

  static async delete(id: number) {
    return prisma.jugador.delete({
      where: { id },
    });
  }
}
