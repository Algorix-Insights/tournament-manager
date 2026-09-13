import { Request, Response } from 'express';
import { IPlayerController } from './interfaces/player.controller.interface';
import { IPlayerService } from './interfaces/player.service.interface';

export class PlayerController implements IPlayerController {
  constructor(private readonly playerService: IPlayerService) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        nombre,
        gamertag,
        email,
        correo,
        period,
        periodo,
        startDate,
        fechaInicio,
        endDate,
        fechaFin,
        order,
        orden,
        search,
        page,
        pagina,
        limit,
        cantidadRegistros,
      } = req.query;

      const filters: any = {};

      const rawName = (name ?? nombre) as string;
      if (typeof rawName === 'string' && rawName.trim()) {
        filters.name = rawName.trim();
      }

      if (typeof gamertag === 'string' && gamertag.trim()) {
        filters.gamertag = gamertag.trim();
      }

      const rawEmail = (email ?? correo) as string;
      if (typeof rawEmail === 'string' && rawEmail.trim()) {
        filters.email = rawEmail.trim();
      }

      // If 'search' is provided without a specific name or gamertag, use it for name search
      if (search && typeof search === 'string' && !filters.name && !filters.gamertag) {
        filters.name = search.trim();
      }

      const rawPeriod = period ?? periodo;
      if (rawPeriod !== undefined) {
        const parsedPeriod = parseInt(rawPeriod as string, 10);
        if (!isNaN(parsedPeriod)) {
          filters.period = parsedPeriod;
        }
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

      const players = await this.playerService.getAll(filters);
      res.json(players);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching players' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid player ID' });
        return;
      }
      const player = await this.playerService.getById(id);
      if (!player) {
        res.status(404).json({ error: 'Player not found' });
        return;
      }
      res.json(player);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching player' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const name = req.body.name ?? req.body.nombre;
      const gamertag = req.body.gamertag;
      const email = req.body.email ?? req.body.correo;

      if (!name || !gamertag || !email) {
        res.status(400).json({ error: 'Name, Gamertag, and Email are required' });
        return;
      }

      const player = await this.playerService.create({ name, gamertag, email });
      res.status(201).json(player);
    } catch (error: any) {
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'Gamertag or Email is already registered' });
        return;
      }
      res.status(500).json({ error: 'Error registering player' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid player ID' });
        return;
      }

      const updateData: any = {};
      const name = req.body.name ?? req.body.nombre;
      if (name !== undefined) {
        if (typeof name !== 'string' || !name.trim()) {
          res.status(400).json({ error: 'Invalid player name' });
          return;
        }
        updateData.name = name;
      }

      if (req.body.gamertag !== undefined) {
        if (typeof req.body.gamertag !== 'string' || !req.body.gamertag.trim()) {
          res.status(400).json({ error: 'Invalid gamertag' });
          return;
        }
        updateData.gamertag = req.body.gamertag;
      }

      const email = req.body.email ?? req.body.correo;
      if (email !== undefined) {
        if (typeof email !== 'string' || !email.trim()) {
          res.status(400).json({ error: 'Invalid email address' });
          return;
        }
        updateData.email = email;
      }

      const updated = await this.playerService.update(id, updateData);
      res.json(updated);
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Player not found' });
        return;
      }
      if (error.code === 'P2002') {
        res.status(400).json({ error: 'Gamertag or Email is already registered' });
        return;
      }
      res.status(500).json({ error: 'Error updating player' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const paramId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const id = parseInt(paramId, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid player ID' });
        return;
      }
      await this.playerService.delete(id);
      res.json({ message: 'Player deleted successfully' });
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Player not found' });
        return;
      }
      res.status(500).json({ error: 'Error deleting player' });
    }
  }
}
