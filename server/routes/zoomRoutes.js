import { Router } from 'express';
import { getZoomLinks, createZoomLink, deleteZoomLink } from '../controllers/classController.js';
import { optionalAuthenticate, authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', optionalAuthenticate, getZoomLinks);
router.post('/', authenticateToken, createZoomLink);
router.delete('/:id', authenticateToken, deleteZoomLink);

export default router;
