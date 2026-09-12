import { Router } from 'express';
import { GameController } from './game.controller';

const router = Router();

router.get('/', GameController.getAll);
router.get('/:id', GameController.getById);
router.post('/', GameController.create);
router.put('/:id', GameController.update);
router.delete('/:id', GameController.delete);

export default router;
