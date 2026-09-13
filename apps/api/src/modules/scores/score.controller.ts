import { Request, Response } from 'express';
import { IScoreController } from '@/modules/scores/interfaces/score.controller.interface';
import { IScoreService } from '@/modules/scores/interfaces/score.service.interface';

export class ScoreController implements IScoreController {
  constructor(private readonly scoreService: IScoreService) {}

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const scores = await this.scoreService.getAll(res.locals.filters, res.locals.pagination);
      res.json(scores);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los puntajes' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const score = await this.scoreService.create(req.body);

      res.status(201).json(score);
    } catch (error: any) {
      if (error.code === 'P2003') {
        res.status(400).json({ error: 'El jugador o juego especificado no existe' });
        return;
      }
      res.status(500).json({ error: 'Error al registrar el puntaje' });
    }
  }

  async getRanking(_req: Request, res: Response): Promise<void> {
    try {
      const ranking = await this.scoreService.getRanking(res.locals.filters, res.locals.pagination);
      res.json(ranking);
    } catch (error) {
      res.status(500).json({ error: 'Error al generar la tabla de posiciones' });
    }
  }

  async getStats(_req: Request, res: Response): Promise<void> {
    try {
      const stats = await this.scoreService.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Error al calcular las estadísticas del torneo' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      await this.scoreService.delete(id);
      res.json({ message: 'Score deleted successfully' });
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Puntaje no encontrado' });
        return;
      }
      res.status(500).json({ error: 'Error al eliminar el puntaje' });
    }
  }
}
