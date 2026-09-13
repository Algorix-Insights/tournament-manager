import { Request, Response } from 'express';
import { IGameController } from '@/modules/games/interfaces/game.controller.interface';
import { IGameService } from '@/modules/games/interfaces/game.service.interface';

export class GameController implements IGameController {
  constructor(private readonly gameService: IGameService) {}

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const games = await this.gameService.getAll(res.locals.filters, res.locals.pagination);
      res.json(games);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching games' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
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
      const game = await this.gameService.create(req.body);
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
      const updated = await this.gameService.update(Number(req.params.id), req.body);
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
      const id = Number(req.params.id);
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
