import { Request, Response } from 'express';
import { IPlayerController } from '@/modules/players/interfaces/player.controller.interface';
import { IPlayerService } from '@/modules/players/interfaces/player.service.interface';

export class PlayerController implements IPlayerController {
  constructor(private readonly playerService: IPlayerService) {}

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const players = await this.playerService.getAll(res.locals.filters, res.locals.pagination);
      res.json(players);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching players' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const player = await this.playerService.getById(id);
      if (!player) {
        res.status(404).json({ error: 'Player not found' });
        return;
      }
      res.json(player);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching player' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const player = await this.playerService.create(req.body);
      res.status(201).json(player);
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'Gamertag or Email is already registered' });
        return;
      }
      res.status(500).json({ error: 'Error registering player' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const updated = await this.playerService.update(Number(req.params.id), req.body);
      res.json(updated);
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Player not found' });
        return;
      }
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'Gamertag or Email is already registered' });
        return;
      }
      res.status(500).json({ error: 'Error updating player' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await this.playerService.delete(id);
      res.json({ message: 'Player deleted successfully' });
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Player not found' });
        return;
      }
      res.status(500).json({ error: 'Error deleting player' });
    }
  }
}
