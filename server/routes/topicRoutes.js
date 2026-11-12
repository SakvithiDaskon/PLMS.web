import { Router } from 'express';
import { getTopics, updateTopicProgress } from '../controllers/topicController.js';

const router = Router();

router.get('/', getTopics);
router.put('/:id/progress', updateTopicProgress);

export default router;
