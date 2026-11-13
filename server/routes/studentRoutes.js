import { Router } from 'express';
import { getStudentById, updateStudentProfile } from '../controllers/studentController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/:id', authenticateToken, getStudentById);
router.put('/:id', authenticateToken, updateStudentProfile);

export default router;
