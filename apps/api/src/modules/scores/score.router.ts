import { Router } from 'express';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';

const router = Router();
const controller = new ScoreController(new ScoreService());

router.get('/', controller.getAll.bind(controller));
router.get('/ranking', controller.getRanking.bind(controller));
router.get('/stats', controller.getStats.bind(controller));
router.post('/', controller.create.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
