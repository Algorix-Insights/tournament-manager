import { prisma } from '../../core/prisma';
import { CreatePlayerDTO, PlayerFilterDTO, UpdatePlayerDTO } from './player.types';
import { buildDateFilter } from '../../core/utils/date-filter.util';
import { parseOrderBy } from '../../core/utils/order-by.util';

export class PlayerService {
  static async getAll(filters?: PlayerFilterDTO) {
    const where: any = {};

    if (filters?.nombre) {
      where.nombre = { contains: filters.nombre.trim() };
    }

    if (filters?.gamertag) {
      where.gamertag = { contains: filters.gamertag.trim() };
    }

    if (filters?.correo) {
      where.correo = { contains: filters.correo.trim() };
    }

    const dateRange = buildDateFilter(filters?.periodo, filters?.fechaInicio, filters?.fechaFin);
    if (dateRange) {
      where.fechaRegistro = dateRange;
    }

    const orderBy = parseOrderBy(
      filters?.orden,
      {
        id: 'id',
        nombre: 'nombre',
        gamertag: 'gamertag',
        correo: 'correo',
        fechaRegistro: 'fechaRegistro',
        fecha: 'fechaRegistro',
      },
      { fechaRegistro: 'desc' }
    );

    return prisma.jugador.findMany({
      where,
      select: {
        id: true,
        nombre: true,
        gamertag: true,
        correo: true,
        fechaRegistro: true,
      },
      orderBy,
    });
  }

  static async getById(id: number) {
    return prisma.jugador.findUnique({
      where: { id },
      include: {
        puntuaciones: {
          include: {
            videojuego: {
              include: {
                genero: true,
              },
            },
          },
        },
      },
    });
  }

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
