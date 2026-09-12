import { Request, Response } from 'express';
import { GenreService } from './genre.service';

export class GenreController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const genres = await GenreService.getAll();
      res.json(genres);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener géneros' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID de género inválido' });
        return;
      }
      const genre = await GenreService.getById(id);
      if (!genre) {
        res.status(404).json({ error: 'Género no encontrado' });
        return;
      }
      res.json(genre);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener género' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { nombre } = req.body;

      if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
        res.status(400).json({ error: 'El nombre del género es obligatorio' });
        return;
      }

      const genre = await GenreService.create({ nombre });
      res.status(201).json(genre);
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'Ya existe un género con ese nombre' });
        return;
      }
      res.status(500).json({ error: 'Error al registrar el género' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID de género inválido' });
        return;
      }

      const { nombre } = req.body;
      if (nombre !== undefined && (typeof nombre !== 'string' || !nombre.trim())) {
        res.status(400).json({ error: 'Nombre de género inválido' });
        return;
      }

      const updated = await GenreService.update(id, { nombre });
      res.json(updated);
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Género no encontrado' });
        return;
      }
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'Ya existe un género con ese nombre' });
        return;
      }
      res.status(500).json({ error: 'Error al actualizar el género' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID de género inválido' });
        return;
      }
      await GenreService.delete(id);
      res.json({ message: 'Género eliminado exitosamente' });
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Género no encontrado' });
        return;
      }
      if (error.code === 'P2003') {
        res.status(400).json({ error: 'No se puede eliminar el género porque tiene videojuegos asociados' });
        return;
      }
      res.status(500).json({ error: 'Error al eliminar género' });
    }
  }
}
