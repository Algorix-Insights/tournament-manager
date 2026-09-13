import { Router } from 'express';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';

const router = Router();
const controller = new GenreController(new GenreService());

router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
