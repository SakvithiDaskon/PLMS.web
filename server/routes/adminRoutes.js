import { Router } from 'express';
import { getAllStudents, getAllParents, getStats } from '../controllers/adminController.js';

const router = Router();

router.get('/students', getAllStudents);
router.get('/parents', getAllParents);
router.get('/admin/stats', getStats);

export default router;
