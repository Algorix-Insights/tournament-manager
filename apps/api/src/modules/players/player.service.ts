import { prisma } from '@/core/prisma';
import type { CreatePlayerDTO, PlayerFilterDTO, UpdatePlayerDTO } from '@/modules/players/dtos/player.dto';
import { buildDateFilter } from '@/core/utils/date-filter.util';
import { parseOrderBy } from '@/core/utils/order-by.util';
import { DEFAULT_PAGINATION, formatPaginatedResponse, PaginationParams } from '@/core/utils/pagination.util';
import { IPlayerService } from '@/modules/players/interfaces/player.service.interface';

export class PlayerService implements IPlayerService {
  async getAll(filters?: PlayerFilterDTO, pagination?: PaginationParams) {
    const where: any = {};

    const name = filters?.name;
    if (name) {
      where.name = { contains: name.trim() };
    }

    const search = filters?.search?.trim();
    if (search && !name && !filters?.gamertag && !filters?.email) {
      where.OR = [
        { name: { contains: search } },
        { gamertag: { contains: search } },
        { email: { contains: search } },
      ];
    }

    if (filters?.gamertag) {
      where.gamertag = { contains: filters.gamertag.trim() };
    }

    const email = filters?.email;
    if (email) {
      where.email = { contains: email.trim() };
    }

    const period = filters?.period;
    const startDate = filters?.startDate;
    const endDate = filters?.endDate;

    const dateRange = buildDateFilter(period, startDate, endDate);
    if (dateRange) {
      where.createdAt = dateRange;
    }

    const order = filters?.order;
    const orderBy = parseOrderBy(
      order,
      {
        id: 'id',
        name: 'name',
        gamertag: 'gamertag',
        email: 'email',
        createdAt: 'createdAt',
        date: 'createdAt',
      },
      { createdAt: 'desc' }
    );

    const { skip, take } = pagination ?? DEFAULT_PAGINATION;

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

  async getById(id: number) {
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

  async create(data: CreatePlayerDTO) {
    return prisma.player.create({
      data: {
        name: data.name.trim(),
        gamertag: data.gamertag.trim(),
        email: data.email.trim(),
      },
    });
  }

  async update(id: number, data: UpdatePlayerDTO) {
    return prisma.player.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name.trim() }),
        ...(data.gamertag !== undefined && { gamertag: data.gamertag.trim() }),
        ...(data.email !== undefined && { email: data.email.trim() }),
      },
    });
  }

  async delete(id: number) {
    return prisma.player.delete({
      where: { id },
    });
  }
}
