import { Request, Response } from 'express';
import { IGameController } from '@/modules/games/interfaces/game.controller.interface';
import { IGameService } from '@/modules/games/interfaces/game.service.interface';

export class GameController implements IGameController {
  constructor(private readonly gameService: IGameService) {}

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const games = await this.gameService.getAll(res.locals.filters);
      res.json(games);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching games' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid game ID' });
        return;
      }
      const game = await this.gameService.getById(id);
      if (!game) {
        res.status(404).json({ error: 'Game not found' });
        return;
      }
      res.json(game);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching game' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const name = req.body.name ?? req.body.nombre;
      const genreId = req.body.genreId ?? req.body.generoId;
      const parsedGenreId = parseInt(genreId, 10);

      if (!name || typeof name !== 'string' || !name.trim() || isNaN(parsedGenreId)) {
        res.status(400).json({ error: 'Name and a valid genreId are required' });
        return;
      }

      const game = await this.gameService.create({ name, genreId: parsedGenreId });
      res.status(201).json(game);
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'A game with that name already exists' });
        return;
      }
      if (error.code === 'P2003') {
        res.status(400).json({ error: 'The specified genreId does not exist' });
        return;
      }
      res.status(500).json({ error: 'Error registering game' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid game ID' });
        return;
      }

      const name = req.body.name ?? req.body.nombre;
      const genreId = req.body.genreId ?? req.body.generoId;
      const updateData: { name?: string; genreId?: number } = {};

      if (name !== undefined) {
        if (typeof name !== 'string' || !name.trim()) {
          res.status(400).json({ error: 'Invalid game name' });
          return;
        }
        updateData.name = name;
      }

      if (genreId !== undefined) {
        const parsedGenreId = parseInt(genreId, 10);
        if (isNaN(parsedGenreId)) {
          res.status(400).json({ error: 'Invalid genre ID' });
          return;
        }
        updateData.genreId = parsedGenreId;
      }

      const updated = await this.gameService.update(id, updateData);
      res.json(updated);
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Game not found' });
        return;
      }
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'A game with that name already exists' });
        return;
      }
      if (error.code === 'P2003') {
        res.status(400).json({ error: 'The specified genreId does not exist' });
        return;
      }
      res.status(500).json({ error: 'Error updating game' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid game ID' });
        return;
      }
      await this.gameService.delete(id);
      res.json({ message: 'Game deleted successfully' });
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Game not found' });
        return;
      }
      res.status(500).json({ error: 'Error deleting game' });
    }
  }
}
