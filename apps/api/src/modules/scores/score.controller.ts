import { Request, Response } from 'express';
import { IScoreController } from '@/modules/scores/interfaces/score.controller.interface';
import { IScoreService } from '@/modules/scores/interfaces/score.service.interface';

export class ScoreController implements IScoreController {
  constructor(private readonly scoreService: IScoreService) {}

  async getAll(_req: Request, res: Response): Promise<void> {
    const scores = await this.scoreService.getAll(res.locals.filters, res.locals.pagination);
    res.json(scores);
  }

  async create(req: Request, res: Response): Promise<void> {
    const score = await this.scoreService.create(req.body);
    res.status(201).json(score);
  }

  async getRanking(_req: Request, res: Response): Promise<void> {
    const ranking = await this.scoreService.getRanking(res.locals.filters, res.locals.pagination);
    res.json(ranking);
  }

  async getStats(_req: Request, res: Response): Promise<void> {
    const stats = await this.scoreService.getStats();
    res.json(stats);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    await this.scoreService.delete(id);
    res.json({ message: 'Score deleted successfully' });
  }
}
