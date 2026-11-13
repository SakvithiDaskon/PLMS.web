import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { getMessages, sendMessage, replyMessage, markAsRead } from '../controllers/messageController.js';

const router = Router();
router.get('/', authenticateToken, getMessages);
router.post('/', authenticateToken, sendMessage);
router.put('/:id/reply', authenticateToken, replyMessage);
router.put('/:id/read', authenticateToken, markAsRead);

export default router;
