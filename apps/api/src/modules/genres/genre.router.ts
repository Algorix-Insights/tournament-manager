import { Router } from 'express';
import { validate } from '@/core/middlewares/validation.middleware';
import { GenreController } from '@/modules/genres/genre.controller';
import {
  createGenreSchema,
  genreFilterSchema,
  genreIdParamsSchema,
  updateGenreSchema,
} from '@/modules/genres/dtos/genre.dto';
import { GenreService } from '@/modules/genres/genre.service';

const router = Router();
const controller = new GenreController(new GenreService());

router.get('/', validate(genreFilterSchema, 'query'), controller.getAll.bind(controller));
router.get('/:id', validate(genreIdParamsSchema, 'params'), controller.getById.bind(controller));
router.post('/', validate(createGenreSchema, 'body'), controller.create.bind(controller));
router.put(
  '/:id',
  validate(genreIdParamsSchema, 'params'),
  validate(updateGenreSchema, 'body'),
  controller.update.bind(controller),
);
router.delete('/:id', validate(genreIdParamsSchema, 'params'), controller.delete.bind(controller));

export default router;
