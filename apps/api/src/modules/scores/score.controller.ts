import { Request, Response } from 'express';
import { ScoreService } from './score.service';

export class ScoreController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const scores = await ScoreService.getAll();
      res.json(scores);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener puntuaciones' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { jugadorId, videojuegoId, puntuacion } = req.body;

      if (jugadorId === undefined || videojuegoId === undefined || puntuacion === undefined) {
        res.status(400).json({ error: 'Jugador, Videojuego y Puntuación son obligatorios' });
        return;
      }

      const parsedScore = Number(puntuacion);
      if (isNaN(parsedScore) || parsedScore < 0) {
        res.status(400).json({ error: 'La puntuación no puede ser negativa' });
        return;
      }

      const score = await ScoreService.create({
        jugadorId: Number(jugadorId),
        videojuegoId: Number(videojuegoId),
        puntuacion: parsedScore,
      });

      res.status(201).json(score);
    } catch (error: any) {
      if (error.code === 'P2003') {
        res.status(400).json({ error: 'El jugador o el videojuego especificado no existen' });
        return;
      }
      res.status(500).json({ error: error.message || 'Error al registrar puntuación' });
    }
  }

  static async getRanking(req: Request, res: Response): Promise<void> {
    try {
      const { videojuegoId, gameId, minScore, maxScore } = req.query;

      const filters: any = {};

      const rawGameId = videojuegoId || gameId;
      if (rawGameId !== undefined && !isNaN(Number(rawGameId))) {
        filters.videojuegoId = Number(rawGameId);
      }

      if (minScore !== undefined && !isNaN(Number(minScore))) {
        filters.minScore = Number(minScore);
      }

      if (maxScore !== undefined && !isNaN(Number(maxScore))) {
        filters.maxScore = Number(maxScore);
      }

      const ranking = await ScoreService.getRanking(filters);
      res.json(ranking);
    } catch (error) {
      res.status(500).json({ error: 'Error al generar el ranking de clasificación' });
    }
  }

  static async getStats(_req: Request, res: Response): Promise<void> {
    try {
      const stats = await ScoreService.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Error al calcular las estadísticas' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'ID de puntuación inválido' });
        return;
      }
      await ScoreService.delete(id);
      res.json({ message: 'Puntuación eliminada exitosamente' });
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Puntuación no encontrada' });
        return;
      }
      res.status(500).json({ error: 'Error al eliminar puntuación' });
    }
  }
}
