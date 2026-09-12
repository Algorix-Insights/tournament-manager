import { prisma } from '../../core/prisma';
import { CreateGenreDTO, GenreFilterDTO, UpdateGenreDTO } from './genre.types';
import { parseOrderBy } from '../../core/utils/order-by.util';

export class GenreService {
  static async getAll(filters?: GenreFilterDTO) {
    const where: any = {};

    if (filters?.nombre) {
      where.nombre = { contains: filters.nombre.trim() };
    }

    const orderBy = parseOrderBy(
      filters?.orden,
      {
        id: 'id',
        nombre: 'nombre',
      },
      { nombre: 'asc' }
    );

    return prisma.genero.findMany({
      where,
      orderBy,
      include: {
        _count: {
          select: { videojuegos: true },
        },
      },
    });
  }

  static async getById(id: number) {
    return prisma.genero.findUnique({
      where: { id },
      include: {
        videojuegos: true,
      },
    });
  }

  static async create(data: CreateGenreDTO) {
    return prisma.genero.create({
      data: {
        nombre: data.nombre.trim(),
      },
    });
  }

  static async update(id: number, data: UpdateGenreDTO) {
    return prisma.genero.update({
      where: { id },
      data: {
        ...(data.nombre && { nombre: data.nombre.trim() }),
      },
    });
  }

  static async delete(id: number) {
    return prisma.genero.delete({
      where: { id },
    });
  }
}
