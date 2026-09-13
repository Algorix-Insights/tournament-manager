import { Request, Response } from 'express';
import { IGenreController } from './interfaces/genre.controller.interface';
import { IGenreService } from './interfaces/genre.service.interface';

export class GenreController implements IGenreController {
  constructor(private readonly genreService: IGenreService) {}

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const genres = await this.genreService.getAll(res.locals.filters);
      res.json(genres);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching genres' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid genre ID' });
        return;
      }
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
      const name = req.body.name ?? req.body.nombre;

      if (!name || typeof name !== 'string' || !name.trim()) {
        res.status(400).json({ error: 'Genre name is required' });
        return;
      }

      const genre = await this.genreService.create({ name });
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
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid genre ID' });
        return;
      }

      const name = req.body.name ?? req.body.nombre;
      if (name !== undefined && (typeof name !== 'string' || !name.trim())) {
        res.status(400).json({ error: 'Invalid genre name' });
        return;
      }

      const updated = await this.genreService.update(id, { name });
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
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid genre ID' });
        return;
      }
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
