import { Router } from 'express';
import { ScoreController } from './score.controller';

const router = Router();

router.get('/', ScoreController.getAll);
router.get('/ranking', ScoreController.getRanking);
router.get('/stats', ScoreController.getStats);
router.post('/', ScoreController.create);
router.delete('/:id', ScoreController.delete);

export default router;
