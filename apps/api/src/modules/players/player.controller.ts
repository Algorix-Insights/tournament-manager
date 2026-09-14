import { Request, Response } from 'express';
import { IPlayerController } from '@/modules/players/interfaces/player.controller.interface';
import { IPlayerService } from '@/modules/players/interfaces/player.service.interface';

export class PlayerController implements IPlayerController {
  constructor(private readonly playerService: IPlayerService) {}

  async getAll(_req: Request, res: Response): Promise<void> {
    const players = await this.playerService.getAll(res.locals.filters, res.locals.pagination);
    res.json(players);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const player = await this.playerService.getById(id);
    if (!player) {
      res.status(404).json({ error: 'Jugador no encontrado' });
      return;
    }
    res.json(player);
  }

  async create(req: Request, res: Response): Promise<void> {
    const player = await this.playerService.create(req.body);
    res.status(201).json(player);
  }

  async update(req: Request, res: Response): Promise<void> {
    const updated = await this.playerService.update(Number(req.params.id), req.body);
    res.json(updated);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    await this.playerService.delete(id);
    res.json({ message: 'Jugador eliminado correctamente' });
  }
}
