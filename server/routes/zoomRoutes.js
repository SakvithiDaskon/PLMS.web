import { Router } from 'express';
import { getZoomLinks, createZoomLink, deleteZoomLink } from '../controllers/classController.js';

const router = Router();

router.get('/', getZoomLinks);
router.post('/', createZoomLink);
router.delete('/:id', deleteZoomLink);

export default router;
