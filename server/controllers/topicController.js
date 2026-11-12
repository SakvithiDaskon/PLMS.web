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
        term,
        topic_name AS name,
        description,
        lessons_count AS lessonsCount,
        progress_pct AS progress,
        modules,
        completed_modules AS completedModules
      FROM mathematics_topics
      WHERE grade LIKE ? OR ? = ''
      ORDER BY topic_id ASC;
    `, [pattern, grade]);

    const topics = rows.map(r => {
      let parsedModules = [];
      try {
        parsedModules = typeof r.modules === 'string' ? JSON.parse(r.modules) : (r.modules || []);
      } catch {
        parsedModules = [];
      }
      let parsedCompleted = [];
      try {
        parsedCompleted = typeof r.completedModules === 'string' ? JSON.parse(r.completedModules) : (r.completedModules || []);
      } catch {
        parsedCompleted = [];
      }
      return {
        ...r,
        modules: parsedModules,
        completedModules: parsedCompleted
      };
    });

    return res.status(200).json({ success: true, topics });
  } catch (err) {
    next(err);
  }
}

export async function updateTopicProgress(req, res, next) {
  try {
    const { id } = req.params;
    const { progress, completedModules } = req.body;
    const pool = getPool();

    const updates = [];
    const params = [];

    if (progress !== undefined) {
      updates.push('progress_pct = ?');
      params.push(Math.min(100, Math.max(0, Number(progress) || 0)));
    }
    if (completedModules !== undefined) {
      updates.push('completed_modules = ?');
      params.push(JSON.stringify(completedModules));
    }

    if (updates.length === 0) {
      return res.status(400).json({ success: false, message: 'No fields to update' });
    }

    params.push(id);
    await pool.query(
      `UPDATE mathematics_topics SET ${updates.join(', ')} WHERE topic_id = ?`,
      params
    );

    return res.status(200).json({ success: true, message: 'Progress updated successfully' });
  } catch (err) {
    next(err);
  }
}

export default { getTopics, updateTopicProgress };
