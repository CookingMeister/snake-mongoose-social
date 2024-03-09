import { Router } from 'express';
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
} from '../../controllers/thoughtController.js';

const router = Router();

//  thoughts Routes
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

//  thoughtId routes
router
  .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

//  reactions routes
router
  .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete();

export default router;
