import { Router } from 'express';
import { getClasses } from '../controllers/classController.js';
import { optionalAuthenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', optionalAuthenticate, getClasses);

export default router;
