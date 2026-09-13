import { Request, Response } from 'express';
import { IGenreController } from '@/modules/genres/interfaces/genre.controller.interface';
import { IGenreService } from '@/modules/genres/interfaces/genre.service.interface';

export class GenreController implements IGenreController {
  constructor(private readonly genreService: IGenreService) {}

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const genres = await this.genreService.getAll(res.locals.filters, res.locals.pagination);
      res.json(genres);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los géneros' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const genre = await this.genreService.getById(id);
      if (!genre) {
        res.status(404).json({ error: 'Género no encontrado' });
        return;
      }
      res.json(genre);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el género' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const genre = await this.genreService.create(req.body);
      res.status(201).json(genre);
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'Ya existe un género con ese nombre' });
        return;
      }
      res.status(500).json({ error: 'Error al registrar el género' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const updated = await this.genreService.update(Number(req.params.id), req.body);
      res.json(updated);
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Género no encontrado' });
        return;
      }
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'Ya existe un género con ese nombre' });
        return;
      }
      res.status(500).json({ error: 'Error al actualizar el género' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await this.genreService.delete(id);
      res.json({ message: 'Genre deleted successfully' });
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Género no encontrado' });
        return;
      }
      if (error.code === 'P2003') {
        res.status(400).json({ error: 'No se puede eliminar el género porque tiene juegos asociados' });
        return;
      }
      res.status(500).json({ error: 'Error al eliminar el género' });
    }
  }
}
