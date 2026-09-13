import { prisma } from '@/core/prisma';
import type { CreateGenreDTO, GenreFilterDTO, UpdateGenreDTO } from '@/modules/genres/dtos/genre.dto';
import { parseOrderBy } from '@/core/utils/order-by.util';
import { DEFAULT_PAGINATION, formatPaginatedResponse, PaginationParams } from '@/core/utils/pagination.util';
import { IGenreService } from '@/modules/genres/interfaces/genre.service.interface';

export class GenreService implements IGenreService {
  async getAll(filters?: GenreFilterDTO, pagination?: PaginationParams) {
    const where: any = {};

    const name = filters?.name;
    if (name) {
      where.name = { contains: name.trim() };
    }

    const order = filters?.order;
    const orderBy = parseOrderBy(
      order,
      {
        id: 'id',
        name: 'name',
      },
      { name: 'asc' }
    );

    const { skip, take } = pagination ?? DEFAULT_PAGINATION;

    const [data, totalRecords] = await Promise.all([
      prisma.genre.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          _count: {
            select: { games: true },
          },
        },
      }),
      prisma.genre.count({ where }),
    ]);

    return formatPaginatedResponse(data, totalRecords);
  }

  async getById(id: number) {
    return prisma.genre.findUnique({
      where: { id },
      include: {
        games: true,
      },
    });
  }

  async create(data: CreateGenreDTO) {
    return prisma.genre.create({
      data: {
        name: data.name.trim(),
      },
    });
  }

  async update(id: number, data: UpdateGenreDTO) {
    return prisma.genre.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name.trim() }),
      },
    });
  }

  async delete(id: number) {
    return prisma.genre.delete({
      where: { id },
    });
  }
}
