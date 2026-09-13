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
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid player ID' });
        return;
      }
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
      const name = req.body.name;
      const gamertag = req.body.gamertag;
      const email = req.body.email;

      if (!name || !gamertag || !email) {
        res.status(400).json({ error: 'Name, Gamertag, and Email are required' });
        return;
      }

      const player = await this.playerService.create({ name, gamertag, email });
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
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid player ID' });
        return;
      }

      const updateData: any = {};
      const name = req.body.name;
      if (name !== undefined) {
        if (typeof name !== 'string' || !name.trim()) {
          res.status(400).json({ error: 'Invalid player name' });
          return;
        }
        updateData.name = name;
      }

      if (req.body.gamertag !== undefined) {
        if (typeof req.body.gamertag !== 'string' || !req.body.gamertag.trim()) {
          res.status(400).json({ error: 'Invalid gamertag' });
          return;
        }
        updateData.gamertag = req.body.gamertag;
      }

      const email = req.body.email;
      if (email !== undefined) {
        if (typeof email !== 'string' || !email.trim()) {
          res.status(400).json({ error: 'Invalid email address' });
          return;
        }
        updateData.email = email;
      }

      const updated = await this.playerService.update(id, updateData);
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
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid player ID' });
        return;
      }
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
