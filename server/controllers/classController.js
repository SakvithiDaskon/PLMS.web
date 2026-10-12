import { getPool } from '../config/db.js';

export async function getClasses(req, res, next) {
  try {
    const grade = req.query.grade || '';
    const pool = getPool();

    const match = grade.match(/Grade\s*(\d+)/i) || grade.match(/(\d+)/);
    const gradeNum = match ? match[1] : null;
    const pattern = gradeNum ? `%Grade ${gradeNum}%` : `%${grade}%`;

    const [rows] = await pool.query(`
      SELECT 
        class_id AS id,
        grade,
        subject,
        title,
        topic,
        teacher,
        DATE_FORMAT(class_date, '%Y-%m-%d') AS date,
        time_display AS time,
        class_type AS type,
        zoom_link AS link,
        passcode,
        is_live AS isLive
      FROM class_schedules
      WHERE grade LIKE ? OR title LIKE ? OR ? = ''
      ORDER BY class_date ASC;
    `, [pattern, pattern, grade]);

    return res.status(200).json({ success: true, classes: rows });
  } catch (err) {
    next(err);
  }
}

export async function getZoomLinks(req, res, next) {
  try {
    const pool = getPool();
    const [rows] = await pool.query(`
      SELECT 
        class_id AS id,
        grade,
        subject,
        title,
        topic,
        teacher,
        DATE_FORMAT(class_date, '%Y-%m-%d') AS date,
        time_display AS time,
        class_type AS type,
        zoom_link AS link,
        passcode,
        is_live AS isLive
      FROM class_schedules
      ORDER BY class_date ASC;
    `);

    return res.status(200).json({ success: true, links: rows });
  } catch (err) {
    next(err);
  }
}

export async function createZoomLink(req, res, next) {
  try {
    const data = req.body;
    const pool = getPool();

    const [result] = await pool.query(`
      INSERT INTO class_schedules (grade, subject, title, topic, teacher, class_date, time_display, class_type, zoom_link, passcode, is_live)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `, [
      data.grade || 'Grade 11',
      data.subject || 'Mathematics',
      data.title || 'Mathematics Zoom Class',
      data.topic || 'General Topic',
      data.teacher || 'Sir Parakum Bandara',
      data.date || new Date().toISOString().split('T')[0],
      data.time || '18:00 - 19:30',
      data.type || 'Live Zoom Class',
      data.link || '',
      data.passcode || '',
      Boolean(data.isLive)
    ]);

    return res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    next(err);
  }
}

export async function deleteZoomLink(req, res, next) {
  try {
    const { id } = req.params;
    const pool = getPool();

    await pool.query('DELETE FROM class_schedules WHERE class_id = ?;', [id]);
    return res.status(200).json({ success: true, message: 'Class schedule removed' });
  } catch (err) {
    next(err);
  }
}

export default { getClasses, getZoomLinks, createZoomLink, deleteZoomLink };
