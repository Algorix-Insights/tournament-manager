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
      res.status(500).json({ error: 'Error al obtener los jugadores' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const player = await this.playerService.getById(id);
      if (!player) {
        res.status(404).json({ error: 'Jugador no encontrado' });
        return;
      }
      res.json(player);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el jugador' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const player = await this.playerService.create(req.body);
      res.status(201).json(player);
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'El gamertag o el correo electrónico ya están registrados' });
        return;
      }
      res.status(500).json({ error: 'Error al registrar el jugador' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const updated = await this.playerService.update(Number(req.params.id), req.body);
      res.json(updated);
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Jugador no encontrado' });
        return;
      }
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'El gamertag o el correo electrónico ya están registrados' });
        return;
      }
      res.status(500).json({ error: 'Error al actualizar el jugador' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await this.playerService.delete(id);
      res.json({ message: 'Player deleted successfully' });
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Jugador no encontrado' });
        return;
      }
      res.status(500).json({ error: 'Error al eliminar el jugador' });
    }
  }
}
