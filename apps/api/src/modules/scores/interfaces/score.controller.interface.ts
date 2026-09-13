import { Request, Response } from 'express';

export interface IScoreController {
  getAll(req: Request, res: Response): Promise<void>;
  create(req: Request, res: Response): Promise<void>;
  getRanking(req: Request, res: Response): Promise<void>;
  getStats(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
}
