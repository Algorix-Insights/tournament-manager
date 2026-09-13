import { Router } from 'express';
import { validate } from '@/core/middlewares/validation.middleware';
import { GameController } from '@/modules/games/game.controller';
import {
  createGameSchema,
  gameFilterSchema,
  gameIdParamsSchema,
  updateGameSchema,
} from '@/modules/games/dtos/game.dto';
import { GameService } from '@/modules/games/game.service';

const router = Router();
const controller = new GameController(new GameService());

router.get('/', validate(gameFilterSchema, 'query'), controller.getAll.bind(controller));
router.get('/:id', validate(gameIdParamsSchema, 'params'), controller.getById.bind(controller));
router.post('/', validate(createGameSchema, 'body'), controller.create.bind(controller));
router.put(
  '/:id',
  validate(gameIdParamsSchema, 'params'),
  validate(updateGameSchema, 'body'),
  controller.update.bind(controller),
);
router.delete('/:id', validate(gameIdParamsSchema, 'params'), controller.delete.bind(controller));

export default router;
