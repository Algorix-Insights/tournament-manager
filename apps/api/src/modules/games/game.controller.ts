import { Request, Response } from 'express';
import { IGameController } from '@/modules/games/interfaces/game.controller.interface';
import { IGameService } from '@/modules/games/interfaces/game.service.interface';

export class GameController implements IGameController {
  constructor(private readonly gameService: IGameService) {}

  async getAll(_req: Request, res: Response): Promise<void> {
    const games = await this.gameService.getAll(res.locals.filters, res.locals.pagination);
    res.json(games);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const game = await this.gameService.getById(id);
    if (!game) {
      res.status(404).json({ error: 'Juego no encontrado' });
      return;
    }
    res.json(game);
  }

  async create(req: Request, res: Response): Promise<void> {
    const game = await this.gameService.create(req.body);
    res.status(201).json(game);
  }

  async update(req: Request, res: Response): Promise<void> {
    const updated = await this.gameService.update(Number(req.params.id), req.body);
    res.json(updated);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    await this.gameService.delete(id);
    res.json({ message: 'Game deleted successfully' });
  }
}
