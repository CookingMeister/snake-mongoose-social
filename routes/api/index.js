/**
 * Router module that defines API routes for users and thoughts.
 * Exports the router instance.
 */
import { Router } from 'express';
import userRoutes from './user-routes';
import thoughtRoutes from './thought-routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;
