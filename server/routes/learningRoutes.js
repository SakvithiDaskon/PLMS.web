import { Router } from 'express';
import { authenticateToken, optionalAuthenticate } from '../middleware/authMiddleware.js';
import {
  getCurriculumHierarchy,
  getLessonResources,
  submitQuizAttempt,
  createRecording, deleteRecording,
  createTutorial, deleteTutorial,
  createNote, deleteNote,
  createYouTubeRec, deleteYouTubeRec,
  createQuiz, deleteQuiz
} from '../controllers/learningController.js';

const router = Router();

// Student routes (require auth - grade enforced server-side)
router.get('/curriculum', authenticateToken, getCurriculumHierarchy);
router.get('/resources/:topicId/:lessonIndex', authenticateToken, getLessonResources);
router.post('/quiz/:quizId/submit', authenticateToken, submitQuizAttempt);

// Admin/Teacher management routes
router.post('/recordings', authenticateToken, createRecording);
router.delete('/recordings/:id', authenticateToken, deleteRecording);
router.post('/tutorials', authenticateToken, createTutorial);
router.delete('/tutorials/:id', authenticateToken, deleteTutorial);
router.post('/notes', authenticateToken, createNote);
router.delete('/notes/:id', authenticateToken, deleteNote);
router.post('/youtube', authenticateToken, createYouTubeRec);
router.delete('/youtube/:id', authenticateToken, deleteYouTubeRec);
router.post('/quizzes', authenticateToken, createQuiz);
router.delete('/quizzes/:id', authenticateToken, deleteQuiz);

export default router;
