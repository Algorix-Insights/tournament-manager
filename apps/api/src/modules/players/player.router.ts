import { Router } from 'express';
import { PlayerController } from './player.controller';

const router = Router();

router.get('/', PlayerController.getAll);
router.get('/:id', PlayerController.getById);
router.post('/', PlayerController.create);
router.put('/:id', PlayerController.update);
router.delete('/:id', PlayerController.delete);

export default router;
