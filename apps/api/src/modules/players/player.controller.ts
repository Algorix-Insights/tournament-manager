import { Request, Response } from 'express';
import { PlayerService } from './player.service';

export class PlayerController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { search } = req.query;
      if (search && typeof search === 'string') {
        const players = await PlayerService.search(search);
        res.json(players);
        return;
      }
      const players = await PlayerService.getAll();
      res.json(players);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los jugadores' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID de jugador inválido' });
        return;
      }
      const player = await PlayerService.getById(id);
      if (!player) {
        res.status(404).json({ error: 'Jugador no encontrado' });
        return;
      }
      res.json(player);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el jugador' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, gamertag, correo } = req.body;

      if (!nombre || !gamertag || !correo) {
        res.status(400).json({ error: 'Nombre, Gamertag y Correo son obligatorios' });
        return;
      }

      const player = await PlayerService.create({ nombre, gamertag, correo });
      res.status(201).json(player);
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'El Gamertag o Correo ya se encuentra registrado' });
        return;
      }
      res.status(500).json({ error: 'Error al registrar el jugador' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID de jugador inválido' });
        return;
      }
      const updated = await PlayerService.update(id, req.body);
      res.json(updated);
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Jugador no encontrado' });
        return;
      }
      res.status(500).json({ error: 'Error al actualizar el jugador' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID de jugador inválido' });
        return;
      }
      await PlayerService.delete(id);
      res.json({ message: 'Jugador eliminado exitosamente' });
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Jugador no encontrado' });
        return;
      }
      res.status(500).json({ error: 'Error al eliminar el jugador' });
    }
  }
}
