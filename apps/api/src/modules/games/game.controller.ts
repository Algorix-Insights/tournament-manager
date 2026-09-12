import { Request, Response } from 'express';
import { GameService } from './game.service';

export class GameController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, generoId, generoNombre, orden, pagina, cantidadRegistros } = req.query;
      const filters: any = {};

      if (typeof nombre === 'string' && nombre.trim()) {
        filters.nombre = nombre.trim();
      }

      if (generoId !== undefined) {
        const parsedId = parseInt(generoId as string, 10);
        if (!isNaN(parsedId)) {
          filters.generoId = parsedId;
        }
      }

      if (typeof generoNombre === 'string' && generoNombre.trim()) {
        filters.generoNombre = generoNombre.trim();
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

      const games = await GameService.getAll(filters);
      res.json(games);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener videojuegos' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID de videojuego inválido' });
        return;
      }
      const game = await GameService.getById(id);
      if (!game) {
        res.status(404).json({ error: 'Videojuego no encontrado' });
        return;
      }
      res.json(game);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener videojuego' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, generoId } = req.body;
      const parsedGeneroId = parseInt(generoId, 10);

      if (!nombre || typeof nombre !== 'string' || !nombre.trim() || isNaN(parsedGeneroId)) {
        res.status(400).json({ error: 'Nombre y generoId válido son obligatorios' });
        return;
      }

      const game = await GameService.create({ nombre, generoId: parsedGeneroId });
      res.status(201).json(game);
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'Ya existe un videojuego con ese nombre' });
        return;
      }
      if (error.code === 'P2003') {
        res.status(400).json({ error: 'El generoId especificado no existe' });
        return;
      }
      res.status(500).json({ error: 'Error al registrar el videojuego' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID de videojuego inválido' });
        return;
      }

      const { nombre, generoId } = req.body;
      const updateData: { nombre?: string; generoId?: number } = {};

      if (nombre !== undefined) {
        if (typeof nombre !== 'string' || !nombre.trim()) {
          res.status(400).json({ error: 'Nombre de videojuego inválido' });
          return;
        }
        updateData.nombre = nombre;
      }

      if (generoId !== undefined) {
        const parsedGeneroId = parseInt(generoId, 10);
        if (isNaN(parsedGeneroId)) {
          res.status(400).json({ error: 'ID de género inválido' });
          return;
        }
        updateData.generoId = parsedGeneroId;
      }

      const updated = await GameService.update(id, updateData);
      res.json(updated);
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Videojuego no encontrado' });
        return;
      }
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'Ya existe un videojuego con ese nombre' });
        return;
      }
      if (error.code === 'P2003') {
        res.status(400).json({ error: 'El generoId especificado no existe' });
        return;
      }
      res.status(500).json({ error: 'Error al actualizar videojuego' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID de videojuego inválido' });
        return;
      }
      await GameService.delete(id);
      res.json({ message: 'Videojuego eliminado exitosamente' });
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Videojuego no encontrado' });
        return;
      }
      res.status(500).json({ error: 'Error al eliminar videojuego' });
    }
  }
}
