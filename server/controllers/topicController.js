import { getPool } from '../config/db.js';

export async function getTopics(req, res, next) {
  try {
    const grade = req.query.grade || '';
    const pool = getPool();

    const match = grade.match(/Grade\s*(\d+)/i) || grade.match(/(\d+)/);
    const gradeNum = match ? match[1] : null;
    const pattern = gradeNum ? `%Grade ${gradeNum}%` : `%${grade}%`;

    const [rows] = await pool.query(`
      SELECT 
        topic_id AS id,
        grade,
        subject,
        topic_name AS name,
        description,
        lessons_count AS lessonsCount,
        progress_pct AS progress
      FROM mathematics_topics
      WHERE grade LIKE ? OR ? = ''
      ORDER BY topic_id ASC;
    `, [pattern, grade]);

    return res.status(200).json({ success: true, topics: rows });
  } catch (err) {
    next(err);
  }
}

export default { getTopics };
