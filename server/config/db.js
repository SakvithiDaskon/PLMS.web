import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local first (local development priority), then .env if present
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

let pool = null;

export function getPool() {
  if (!pool) {
    const host = process.env.AIVEN_HOST || 'plms-mysql-sakibandara98-fb84.l.aivencloud.com';
    const port = Number(process.env.AIVEN_PORT || 24400);
    const user = process.env.AIVEN_USER || 'avnadmin';
    const password = process.env.AIVEN_PASSWORD;
    const database = process.env.AIVEN_DATABASE || 'defaultdb';

    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      ssl: { rejectUnauthorized: false },
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
}

export async function checkHealth() {
  try {
    const p = getPool();
    const [rows] = await p.query('SELECT 1 as connected, DATABASE() as db');
    return { connected: true, database: rows[0]?.db || 'defaultdb' };
  } catch (err) {
    return { connected: false, error: err.message };
  }
}

export default { getPool, checkHealth };
