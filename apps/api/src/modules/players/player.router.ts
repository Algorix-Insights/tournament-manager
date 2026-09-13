import { Router } from 'express';
import { validate } from '@/core/middlewares/validation.middleware';
import {
  createPlayerSchema,
  playerFilterSchema,
  playerIdParamsSchema,
  updatePlayerSchema,
} from '@/modules/players/dtos/player.dto';
import { PlayerController } from '@/modules/players/player.controller';
import { PlayerService } from '@/modules/players/player.service';

const router = Router();
const controller = new PlayerController(new PlayerService());

router.get('/', validate(playerFilterSchema, 'query'), controller.getAll.bind(controller));
router.get('/:id', validate(playerIdParamsSchema, 'params'), controller.getById.bind(controller));
router.post('/', validate(createPlayerSchema, 'body'), controller.create.bind(controller));
router.put(
  '/:id',
  validate(playerIdParamsSchema, 'params'),
  validate(updatePlayerSchema, 'body'),
  controller.update.bind(controller),
);
router.delete('/:id', validate(playerIdParamsSchema, 'params'), controller.delete.bind(controller));

export default router;
