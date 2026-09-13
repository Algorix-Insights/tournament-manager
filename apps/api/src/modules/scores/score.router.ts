import { Router } from 'express';
import { validate } from '@/core/middlewares/validation.middleware';
import {
  createScoreSchema,
  rankingFilterSchema,
  scoreFilterSchema,
  scoreIdParamsSchema,
} from '@/modules/scores/dtos/score.dto';
import { ScoreController } from '@/modules/scores/score.controller';
import { ScoreService } from '@/modules/scores/score.service';

const router = Router();
const controller = new ScoreController(new ScoreService());

router.get('/', validate(scoreFilterSchema, 'query'), controller.getAll.bind(controller));
router.get('/ranking', validate(rankingFilterSchema, 'query'), controller.getRanking.bind(controller));
router.get('/stats', controller.getStats.bind(controller));
router.post('/', validate(createScoreSchema, 'body'), controller.create.bind(controller));
router.delete('/:id', validate(scoreIdParamsSchema, 'params'), controller.delete.bind(controller));

export default router;
