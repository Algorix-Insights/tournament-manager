import { prisma } from '../../core/prisma';
import { CreatePlayerDTO, PlayerFilterDTO, UpdatePlayerDTO } from './player.types';
import { buildDateFilter } from '../../core/utils/date-filter.util';
import { parseOrderBy } from '../../core/utils/order-by.util';
import { parsePaginationParams, formatPaginatedResponse } from '../../core/utils/pagination.util';

export class PlayerService {
  static async getAll(filters?: PlayerFilterDTO) {
    const where: any = {};

    const name = filters?.name ?? filters?.nombre;
    if (name) {
      where.name = { contains: name.trim() };
    }

    if (filters?.gamertag) {
      where.gamertag = { contains: filters.gamertag.trim() };
    }

    const email = filters?.email ?? filters?.correo;
    if (email) {
      where.email = { contains: email.trim() };
    }

    const period = filters?.period ?? filters?.periodo;
    const startDate = filters?.startDate ?? filters?.fechaInicio;
    const endDate = filters?.endDate ?? filters?.fechaFin;

    const dateRange = buildDateFilter(period, startDate, endDate);
    if (dateRange) {
      where.createdAt = dateRange;
    }

    const order = filters?.order ?? filters?.orden;
    const orderBy = parseOrderBy(
      order,
      {
        id: 'id',
        name: 'name',
        nombre: 'name',
        gamertag: 'gamertag',
        email: 'email',
        correo: 'email',
        createdAt: 'createdAt',
        fechaRegistro: 'createdAt',
        date: 'createdAt',
        fecha: 'createdAt',
      },
      { createdAt: 'desc' }
    );

    const { skip, take } = parsePaginationParams(filters);

    const [data, totalRecords] = await Promise.all([
      prisma.player.findMany({
        where,
        select: {
          id: true,
          name: true,
          gamertag: true,
          email: true,
          createdAt: true,
        },
        orderBy,
        skip,
        take,
      }),
      prisma.player.count({ where }),
    ]);

    return formatPaginatedResponse(data, totalRecords);
  }

  static async getById(id: number) {
    return prisma.player.findUnique({
      where: { id },
      include: {
        scores: {
          include: {
            game: {
              include: {
                genre: true,
              },
            },
          },
        },
      },
    });
  }

  static async create(data: CreatePlayerDTO) {
    return prisma.player.create({
      data: {
        name: data.name.trim(),
        gamertag: data.gamertag.trim(),
        email: data.email.trim(),
      },
    });
  }

  static async update(id: number, data: UpdatePlayerDTO) {
    return prisma.player.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name.trim() }),
        ...(data.gamertag !== undefined && { gamertag: data.gamertag.trim() }),
        ...(data.email !== undefined && { email: data.email.trim() }),
      },
    });
  }

  static async delete(id: number) {
    return prisma.player.delete({
      where: { id },
    });
  }
}
