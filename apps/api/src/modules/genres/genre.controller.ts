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
      res.status(500).json({ error: 'Error fetching genres' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const genre = await this.genreService.getById(id);
      if (!genre) {
        res.status(404).json({ error: 'Genre not found' });
        return;
      }
      res.json(genre);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching genre' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const genre = await this.genreService.create(req.body);
      res.status(201).json(genre);
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'A genre with that name already exists' });
        return;
      }
      res.status(500).json({ error: 'Error registering genre' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const updated = await this.genreService.update(Number(req.params.id), req.body);
      res.json(updated);
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Genre not found' });
        return;
      }
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'A genre with that name already exists' });
        return;
      }
      res.status(500).json({ error: 'Error updating genre' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await this.genreService.delete(id);
      res.json({ message: 'Genre deleted successfully' });
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Genre not found' });
        return;
      }
      if (error.code === 'P2003') {
        res.status(400).json({ error: 'Cannot delete genre because it has associated games' });
        return;
      }
      res.status(500).json({ error: 'Error deleting genre' });
    }
  }
}
