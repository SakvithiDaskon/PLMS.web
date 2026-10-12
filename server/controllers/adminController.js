import { getPool } from '../config/db.js';

export async function getAllStudents(req, res, next) {
  try {
    const pool = getPool();
    const [rows] = await pool.query(`
      SELECT 
        sd.id,
        sd.user_id AS userId,
        sd.full_name AS name,
        u.email,
        sd.phone_number AS phone,
        sd.grade,
        sd.student_id AS studentId,
        'Currently Enrolled' AS enrollmentStatus,
        'Paid' AS paymentStatus
      FROM student_details sd
      INNER JOIN users u ON sd.user_id = u.user_id
      ORDER BY sd.id ASC;
    `);

    const students = rows.map(r => ({ ...r, id: 'std-' + r.id }));
    return res.status(200).json({ success: true, students });
  } catch (err) {
    next(err);
  }
}

export async function getAllParents(req, res, next) {
  try {
    const pool = getPool();
    const [rows] = await pool.query(`
      SELECT 
        pd.parent_id AS id,
        pd.full_name AS name,
        u.email,
        pd.phone_number AS phone,
        pd.occupation
      FROM parent_details pd
      INNER JOIN users u ON pd.user_id = u.user_id
      ORDER BY pd.parent_id ASC;
    `);

    const parents = rows.map(r => ({ ...r, id: 'prn-' + r.id, linkedStudentIds: ['std-1'] }));
    return res.status(200).json({ success: true, parents });
  } catch (err) {
    next(err);
  }
}

export async function getStats(req, res, next) {
  try {
    const pool = getPool();
    const [[studentsCount]] = await pool.query('SELECT COUNT(*) as count FROM student_details;');
    const [[parentsCount]] = await pool.query('SELECT COUNT(*) as count FROM parent_details;');
    const [[classesCount]] = await pool.query('SELECT COUNT(*) as count FROM class_schedules;');

    return res.status(200).json({
      success: true,
      stats: {
        totalStudents: studentsCount.count || 0,
        totalParents: parentsCount.count || 0,
        totalClasses: classesCount.count || 0,
        pendingPaymentsCount: 1,
        totalRecordings: 5
      }
    });
  } catch (err) {
    next(err);
  }
}

export default { getAllStudents, getAllParents, getStats };
