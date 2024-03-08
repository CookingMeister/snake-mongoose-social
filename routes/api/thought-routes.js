import { Router } from 'express';
import { getAllThoughts, getThoughtById, createThought, deleteThought } from '../../controllers/thoughtController.js';

const router = Router();

//  thoughts Routes
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .delete(deleteThought);

export default router;