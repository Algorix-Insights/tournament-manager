import { prisma } from '../../core/prisma';
import { CreateGenreDTO, GenreFilterDTO, UpdateGenreDTO } from './genre.types';
import { parseOrderBy } from '../../core/utils/order-by.util';
import { parsePaginationParams, formatPaginatedResponse } from '../../core/utils/pagination.util';

export class GenreService {
  static async getAll(filters?: GenreFilterDTO) {
    const where: any = {};

    const name = filters?.name ?? filters?.nombre;
    if (name) {
      where.name = { contains: name.trim() };
    }

    const order = filters?.order ?? filters?.orden;
    const orderBy = parseOrderBy(
      order,
      {
        id: 'id',
        name: 'name',
        nombre: 'name',
      },
      { name: 'asc' }
    );

    const { skip, take } = parsePaginationParams(filters);

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

  static async getById(id: number) {
    return prisma.genre.findUnique({
      where: { id },
      include: {
        games: true,
      },
    });
  }

  static async create(data: CreateGenreDTO) {
    return prisma.genre.create({
      data: {
        name: data.name.trim(),
      },
    });
  }

  static async update(id: number, data: UpdateGenreDTO) {
    return prisma.genre.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name.trim() }),
      },
    });
  }

  static async delete(id: number) {
    return prisma.genre.delete({
      where: { id },
    });
  }
}
