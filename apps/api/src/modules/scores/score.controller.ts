import { Request, Response } from 'express';
import { IScoreController } from './interfaces/score.controller.interface';
import { IScoreService } from './interfaces/score.service.interface';

export class ScoreController implements IScoreController {
  constructor(private readonly scoreService: IScoreService) {}

  async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const scores = await this.scoreService.getAll(res.locals.filters);
      res.json(scores);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching scores' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const rawPlayerId = req.body.playerId ?? req.body.jugadorId;
      const rawGameId = req.body.gameId ?? req.body.videojuegoId;
      const rawScore = req.body.score ?? req.body.puntuacion;

      if (rawPlayerId === undefined || rawGameId === undefined || rawScore === undefined) {
        res.status(400).json({ error: 'Player, Game, and Score are required' });
        return;
      }

      const parsedScore = Number(rawScore);
      if (isNaN(parsedScore) || parsedScore < 0) {
        res.status(400).json({ error: 'Score cannot be negative' });
        return;
      }

      const score = await this.scoreService.create({
        playerId: Number(rawPlayerId),
        gameId: Number(rawGameId),
        score: parsedScore,
      });

      res.status(201).json(score);
    } catch (error: any) {
      if (error.code === 'P2003') {
        res.status(400).json({ error: 'The specified player or game does not exist' });
        return;
      }
      res.status(500).json({ error: error.message || 'Error registering score' });
    }
  }

  async getRanking(_req: Request, res: Response): Promise<void> {
    try {
      const ranking = await this.scoreService.getRanking(res.locals.filters);
      res.json(ranking);
    } catch (error) {
      res.status(500).json({ error: 'Error generating ranking table' });
    }
  }

  async getStats(_req: Request, res: Response): Promise<void> {
    try {
      const stats = await this.scoreService.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Error calculating tournament statistics' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid score ID' });
        return;
      }
      await this.scoreService.delete(id);
      res.json({ message: 'Score deleted successfully' });
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Score not found' });
        return;
      }
      res.status(500).json({ error: 'Error deleting score' });
    }
  }
}
