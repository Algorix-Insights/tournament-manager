import { prisma } from '../../core/prisma';
import { CreateGameDTO, GameFilterDTO, UpdateGameDTO } from './game.types';
import { parseOrderBy } from '../../core/utils/order-by.util';
import { parsePaginationParams, formatPaginatedResponse } from '../../core/utils/pagination.util';

export class GameService {
  static async getAll(filters?: GameFilterDTO) {
    const where: any = {};

    if (filters?.nombre) {
      where.nombre = { contains: filters.nombre.trim() };
    }

    if (filters?.generoId !== undefined) {
      where.generoId = filters.generoId;
    }

    if (filters?.generoNombre) {
      where.genero = {
        nombre: { contains: filters.generoNombre.trim() },
      };
    }

    const orderBy = parseOrderBy(
      filters?.orden,
      {
        id: 'id',
        nombre: 'nombre',
        generoId: 'generoId',
        genero: { genero: 'nombre' },
      },
      { nombre: 'asc' }
    );

    const { skip, take } = parsePaginationParams(filters);

    const [data, totalRecords] = await Promise.all([
      prisma.videojuego.findMany({
        where,
        include: {
          genero: true,
        },
        orderBy,
        skip,
        take,
      }),
      prisma.videojuego.count({ where }),
    ]);

    return formatPaginatedResponse(data, totalRecords);
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
