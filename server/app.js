import express from 'express';
import cors from 'cors';
import { checkHealth } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import topicRoutes from './routes/topicRoutes.js';
import classRoutes from './routes/classRoutes.js';
import zoomRoutes from './routes/zoomRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// Standard middlewares
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.url.startsWith('/api')) {
      console.log(`[${req.method}] ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Database health check
app.get('/api/health', async (req, res) => {
  const health = await checkHealth();
  res.status(health.connected ? 200 : 500).json(health);
});

// API Routes mounting
app.use('/api', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/zoom', zoomRoutes);
app.use('/api', adminRoutes);

// 404 handler for unhandled /api calls
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Global centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

export default app;
