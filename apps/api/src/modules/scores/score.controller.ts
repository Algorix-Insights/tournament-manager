import { Request, Response } from 'express';
import { IScoreController } from './interfaces/score.controller.interface';
import { IScoreService } from './interfaces/score.service.interface';

function parseScoreFilters(query: any) {
  const {
    playerId,
    jugadorId,
    gameId,
    videojuegoId,
    genreId,
    generoId,
    minScore,
    maxScore,
    period,
    periodo,
    startDate,
    fechaInicio,
    endDate,
    fechaFin,
    order,
    orden,
    page,
    pagina,
    limit,
    cantidadRegistros,
  } = query;

  const filters: any = {};

  const rawPlayerId = playerId ?? jugadorId;
  if (rawPlayerId !== undefined && !isNaN(Number(rawPlayerId))) {
    filters.playerId = Number(rawPlayerId);
  }

  const rawGameId = gameId ?? videojuegoId;
  if (rawGameId !== undefined && !isNaN(Number(rawGameId))) {
    filters.gameId = Number(rawGameId);
  }

  const rawGenreId = genreId ?? generoId;
  if (rawGenreId !== undefined && !isNaN(Number(rawGenreId))) {
    filters.genreId = Number(rawGenreId);
  }

  if (minScore !== undefined && !isNaN(Number(minScore))) {
    filters.minScore = Number(minScore);
  }

  if (maxScore !== undefined && !isNaN(Number(maxScore))) {
    filters.maxScore = Number(maxScore);
  }

  const rawPeriod = period ?? periodo;
  if (rawPeriod !== undefined && !isNaN(Number(rawPeriod))) {
    filters.period = Number(rawPeriod);
  }

  const rawStartDate = (startDate ?? fechaInicio) as string;
  if (typeof rawStartDate === 'string') {
    filters.startDate = rawStartDate;
  }

  const rawEndDate = (endDate ?? fechaFin) as string;
  if (typeof rawEndDate === 'string') {
    filters.endDate = rawEndDate;
  }

  const rawOrder = (order ?? orden) as string;
  if (typeof rawOrder === 'string' && rawOrder.trim()) {
    filters.order = rawOrder.trim();
  }

  const rawPage = page ?? pagina;
  if (rawPage !== undefined) {
    const parsedPage = parseInt(rawPage as string, 10);
    if (!isNaN(parsedPage)) {
      filters.page = parsedPage;
    }
  }

  const rawLimit = limit ?? cantidadRegistros;
  if (rawLimit !== undefined) {
    const parsedLimit = parseInt(rawLimit as string, 10);
    if (!isNaN(parsedLimit)) {
      filters.limit = parsedLimit;
    }
  }

  return filters;
}

export class ScoreController implements IScoreController {
  constructor(private readonly scoreService: IScoreService) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const filters = parseScoreFilters(req.query);
      const scores = await this.scoreService.getAll(filters);
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

  async getRanking(req: Request, res: Response): Promise<void> {
    try {
      const filters = parseScoreFilters(req.query);
      const ranking = await this.scoreService.getRanking(filters);
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
