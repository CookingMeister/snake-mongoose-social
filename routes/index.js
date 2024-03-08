/**
 * Configures the router for the application.
 * Handles requests to invalid routes by sending a 'Wrong route!' response.
 * Exports the configured router as the default export.
 */
import { Router } from 'express';
import apiRoutes from './api/index.js';

const router = Router();

router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!'));

export default router;
