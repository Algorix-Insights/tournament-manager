import { prisma } from '../../core/prisma';
import { CreateGameDTO, GameFilterDTO, UpdateGameDTO } from './game.types';
import { parseOrderBy } from '../../core/utils/order-by.util';
import { parsePaginationParams, formatPaginatedResponse } from '../../core/utils/pagination.util';
import { IGameService } from './interfaces/game.service.interface';

export class GameService implements IGameService {
  async getAll(filters?: GameFilterDTO) {
    const where: any = {};

    const name = filters?.name ?? filters?.nombre;
    if (name) {
      where.name = { contains: name.trim() };
    }

    const genreId = filters?.genreId ?? filters?.generoId;
    if (genreId !== undefined) {
      where.genreId = genreId;
    }

    const genreName = filters?.genreName ?? filters?.generoNombre;
    if (genreName) {
      where.genre = {
        name: { contains: genreName.trim() },
      };
    }

    const order = filters?.order ?? filters?.orden;
    const orderBy = parseOrderBy(
      order,
      {
        id: 'id',
        name: 'name',
        nombre: 'name',
        genreId: 'genreId',
        generoId: 'genreId',
        genre: { genre: 'name' },
        genero: { genre: 'name' },
      },
      { name: 'asc' }
    );

    const { skip, take } = parsePaginationParams(filters);

    const [data, totalRecords] = await Promise.all([
      prisma.game.findMany({
        where,
        include: {
          genre: true,
        },
        orderBy,
        skip,
        take,
      }),
      prisma.game.count({ where }),
    ]);

    return formatPaginatedResponse(data, totalRecords);
  }

  async getById(id: number) {
    return prisma.game.findUnique({
      where: { id },
      include: {
        genre: true,
        scores: {
          include: {
            player: true,
          },
        },
      },
    });
  }

  async create(data: CreateGameDTO) {
    return prisma.game.create({
      data: {
        name: data.name.trim(),
        genreId: data.genreId,
      },
      include: {
        genre: true,
      },
    });
  }

  async update(id: number, data: UpdateGameDTO) {
    return prisma.game.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name.trim() }),
        ...(data.genreId !== undefined && { genreId: data.genreId }),
      },
      include: {
        genre: true,
      },
    });
  }

  async delete(id: number) {
    return prisma.game.delete({
      where: { id },
    });
  }
}
