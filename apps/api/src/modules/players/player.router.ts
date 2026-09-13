import { Router } from 'express';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

const router = Router();
const controller = new PlayerController(new PlayerService());

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
