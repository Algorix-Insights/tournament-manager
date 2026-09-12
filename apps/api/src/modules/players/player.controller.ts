import { Request, Response } from 'express';
import { PlayerService } from './player.service';

export class PlayerController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, gamertag, correo, periodo, fechaInicio, fechaFin, orden, search, pagina, cantidadRegistros } = req.query;

      const filters: any = {};

      if (typeof nombre === 'string' && nombre.trim()) {
        filters.nombre = nombre.trim();
      }
      if (typeof gamertag === 'string' && gamertag.trim()) {
        filters.gamertag = gamertag.trim();
      }
      if (typeof correo === 'string' && correo.trim()) {
        filters.correo = correo.trim();
      }

      // Si enviaron 'search' pero no nombre/gamertag específicos, usarlo para ambos como alternativa
      if (search && typeof search === 'string' && !filters.nombre && !filters.gamertag) {
        filters.nombre = search.trim();
      }

      if (periodo !== undefined) {
        const parsedPeriodo = parseInt(periodo as string, 10);
        if (!isNaN(parsedPeriodo)) {
          filters.periodo = parsedPeriodo;
        }
      }

      if (typeof fechaInicio === 'string') {
        filters.fechaInicio = fechaInicio;
      }
      if (typeof fechaFin === 'string') {
        filters.fechaFin = fechaFin;
      }

      if (typeof orden === 'string' && orden.trim()) {
        filters.orden = orden.trim();
      }

      if (pagina !== undefined) {
        const parsedPagina = parseInt(pagina as string, 10);
        if (!isNaN(parsedPagina)) {
          filters.pagina = parsedPagina;
        }
      }

      if (cantidadRegistros !== undefined) {
        const parsedLimit = parseInt(cantidadRegistros as string, 10);
        if (!isNaN(parsedLimit)) {
          filters.cantidadRegistros = parsedLimit;
        }
      }

      const players = await PlayerService.getAll(filters);
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
