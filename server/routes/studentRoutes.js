import { Router } from 'express';
import { getStudentById, updateStudentProfile } from '../controllers/studentController.js';

const router = Router();

router.get('/:id', getStudentById);
router.put('/:id', updateStudentProfile);

export default router;
