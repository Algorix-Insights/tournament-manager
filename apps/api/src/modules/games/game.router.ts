import { Router } from 'express';
import { GameController } from '@/modules/games/game.controller';
import { GameService } from '@/modules/games/game.service';

const router = Router();
const controller = new GameController(new GameService());

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
