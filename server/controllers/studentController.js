import { getPool } from '../config/db.js';

export async function getStudentById(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Student ID is required' });
    }

    const pool = getPool();
    const cleanId = String(id).replace(/^std-/, '');

    const [rows] = await pool.query(`
      SELECT 
        sd.id,
        sd.user_id,
        sd.full_name AS name,
        sd.phone_number AS phone,
        sd.grade,
        sd.student_id AS studentId,
        sd.enrolled_at AS enrollmentDate,
        u.email
      FROM student_details sd
      INNER JOIN users u ON sd.user_id = u.user_id
      WHERE sd.id = ? OR sd.user_id = ? OR sd.student_id = ? OR LOWER(u.email) = LOWER(?)
      LIMIT 1;
    `, [cleanId, cleanId, id, id]);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, student: null, message: 'Student not found' });
    }

    const s = rows[0];
    const nameParts = (s.name || '').trim().split(' ');

    const student = {
      id: 'std-' + s.id,
      userId: s.user_id,
      name: s.name,
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      fullName: s.name,
      email: s.email,
      phone: s.phone,
      grade: s.grade,
      studentId: s.studentId,
      indexNo: s.studentId,
      enrollmentStatus: 'Currently Enrolled',
      enrollmentDate: s.enrollmentDate ? new Date(s.enrollmentDate).toISOString().split('T')[0] : '2024-01-10',
      subject: 'Mathematics',
      paymentStatus: 'Paid',
      nextPaymentDue: '2026-11-15'
    };

    return res.status(200).json({ success: true, student });
  } catch (err) {
    next(err);
  }
}

export async function updateStudentProfile(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Student ID is required' });
    }

    const pool = getPool();
    const cleanId = String(id).replace(/^std-/, '');

    await pool.query(`
      UPDATE student_details 
      SET 
        full_name = COALESCE(?, full_name),
        phone_number = COALESCE(?, phone_number),
        grade = COALESCE(?, grade)
      WHERE id = ? OR user_id = ? OR student_id = ?;
    `, [data.name || null, data.phone || null, data.grade || null, cleanId, cleanId, id]);

    return res.status(200).json({ success: true, message: 'Profile updated successfully' });
  } catch (err) {
    next(err);
  }
}

export default { getStudentById, updateStudentProfile };
