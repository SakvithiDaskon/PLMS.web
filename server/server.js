import app from './app.js';
import { checkHealth } from './config/db.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  console.log('====================================================');
  console.log(`🚀 PLMS Backend Server listening on http://localhost:${PORT}`);
  console.log(`📡 API Endpoints available at http://localhost:${PORT}/api`);
  console.log('====================================================');

  const health = await checkHealth();
  if (health.connected) {
    console.log(`✅ Aiven MySQL Database connected: [${health.database}]`);
  } else {
    console.warn(`⚠️ Warning: Aiven MySQL connection failed: ${health.error}`);
  }
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

export default server;
