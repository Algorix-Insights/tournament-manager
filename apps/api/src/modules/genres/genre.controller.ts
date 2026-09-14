import { Request, Response } from 'express';
import { IGenreController } from '@/modules/genres/interfaces/genre.controller.interface';
import { IGenreService } from '@/modules/genres/interfaces/genre.service.interface';

export class GenreController implements IGenreController {
  constructor(private readonly genreService: IGenreService) {}

  async getAll(_req: Request, res: Response): Promise<void> {
    const genres = await this.genreService.getAll(res.locals.filters, res.locals.pagination);
    res.json(genres);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const genre = await this.genreService.getById(id);
    if (!genre) {
      res.status(404).json({ error: 'Género no encontrado' });
      return;
    }
    res.json(genre);
  }

  async create(req: Request, res: Response): Promise<void> {
    const genre = await this.genreService.create(req.body);
    res.status(201).json(genre);
  }

  async update(req: Request, res: Response): Promise<void> {
    const updated = await this.genreService.update(Number(req.params.id), req.body);
    res.json(updated);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    await this.genreService.delete(id);
    res.json({ message: 'Género eliminado correctamente' });
  }
}
