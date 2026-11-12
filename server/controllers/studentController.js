import { getPool } from '../config/db.js';

function formatStudentRow(s) {
  const nameParts = (s.name || '').trim().split(' ');
  const firstName = s.firstName || nameParts[0] || '';
  const lastName = s.lastName || nameParts.slice(1).join(' ') || '';

  return {
    id: 'std-' + s.id,
    userId: s.user_id,
    name: s.name,
    firstName,
    lastName,
    fullName: s.name,
    email: s.email,
    phone: s.phone || '',
    grade: s.grade || 'Grade 11 (O/L Mathematics)',
    studentId: s.studentId || '',
    indexNo: s.studentId || '',
    profilePicture: s.profilePicture || null,
    enrollmentStatus: 'Currently Enrolled',
    enrollmentDate: s.enrollmentDate ? new Date(s.enrollmentDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    enrolledAt: s.enrollmentDate || null,
    subject: 'Mathematics',
    paymentStatus: 'Paid',
    nextPaymentDue: '2026-11-15'
  };
}

export async function getStudentById(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Student ID is required' });
    }

    const pool = getPool();
    let query = '';
    let params = [];

    if (id === 'me' || id === 'current') {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }
      query = `
        SELECT 
          sd.id,
          sd.user_id,
          sd.full_name AS name,
          sd.phone_number AS phone,
          sd.grade,
          sd.student_id AS studentId,
          sd.enrolled_at AS enrollmentDate,
          sd.profile_picture AS profilePicture,
          u.email
        FROM student_details sd
        INNER JOIN users u ON sd.user_id = u.user_id
        WHERE sd.user_id = ?
        LIMIT 1;
      `;
      params = [req.user.userId];
    } else {
      const cleanId = String(id).replace(/^std-/, '');
      query = `
        SELECT 
          sd.id,
          sd.user_id,
          sd.full_name AS name,
          sd.phone_number AS phone,
          sd.grade,
          sd.student_id AS studentId,
          sd.enrolled_at AS enrollmentDate,
          sd.profile_picture AS profilePicture,
          u.email
        FROM student_details sd
        INNER JOIN users u ON sd.user_id = u.user_id
        WHERE sd.id = ? OR sd.user_id = ? OR sd.student_id = ? OR LOWER(u.email) = LOWER(?)
        LIMIT 1;
      `;
      params = [cleanId, cleanId, id, id];
    }

    const [rows] = await pool.query(query, params);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, student: null, message: 'Student record not found in database' });
    }

    const s = rows[0];

    // Security check: Student can only view their own record
    if (req.user && req.user.role === 'student' && s.user_id !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Access forbidden. You do not have permission to view another student's profile."
      });
    }

    const student = formatStudentRow(s);
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
    let targetStudentRecordId = null;
    let targetUserId = null;

    if (id === 'me' || id === 'current') {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }
      const [userRows] = await pool.query('SELECT id, user_id FROM student_details WHERE user_id = ? LIMIT 1;', [req.user.userId]);
      if (!userRows || userRows.length === 0) {
        return res.status(404).json({ success: false, message: 'Student record not found for active user.' });
      }
      targetStudentRecordId = userRows[0].id;
      targetUserId = userRows[0].user_id;
    } else {
      const cleanId = String(id).replace(/^std-/, '');
      const [matchedRows] = await pool.query(
        'SELECT id, user_id FROM student_details WHERE id = ? OR user_id = ? OR student_id = ? LIMIT 1;',
        [cleanId, cleanId, id]
      );
      if (!matchedRows || matchedRows.length === 0) {
        return res.status(404).json({ success: false, message: 'Student record not found.' });
      }
      targetStudentRecordId = matchedRows[0].id;
      targetUserId = matchedRows[0].user_id;
    }

    // Security check: Student can only modify their own profile
    if (req.user && req.user.role === 'student' && targetUserId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Access forbidden. You cannot modify another student's profile."
      });
    }

    const updateFields = [];
    const queryParams = [];

    if (data.name !== undefined) {
      updateFields.push('full_name = ?');
      queryParams.push(data.name.trim());
    }
    if (data.phone !== undefined) {
      updateFields.push('phone_number = ?');
      queryParams.push(data.phone.trim());
    }
    if (data.grade !== undefined) {
      updateFields.push('grade = ?');
      queryParams.push(data.grade.trim());
    }
    if (data.profilePicture !== undefined) {
      updateFields.push('profile_picture = ?');
      queryParams.push(data.profilePicture || null);
    }

    if (updateFields.length > 0) {
      queryParams.push(targetStudentRecordId);
      await pool.query(
        `UPDATE student_details SET ${updateFields.join(', ')} WHERE id = ?;`,
        queryParams
      );

      // If grade updated, keep student_enrollments in sync
      if (data.grade) {
        await pool.query(
          'UPDATE student_enrollments SET grade = ? WHERE student_id = ?;',
          [data.grade.trim(), targetStudentRecordId]
        ).catch(() => {});
      }
    }

    // Query and return the freshly updated record
    const [updatedRows] = await pool.query(`
      SELECT 
        sd.id,
        sd.user_id,
        sd.full_name AS name,
        sd.phone_number AS phone,
        sd.grade,
        sd.student_id AS studentId,
        sd.enrolled_at AS enrollmentDate,
        sd.profile_picture AS profilePicture,
        u.email
      FROM student_details sd
      INNER JOIN users u ON sd.user_id = u.user_id
      WHERE sd.id = ?
      LIMIT 1;
    `, [targetStudentRecordId]);

    const updatedStudent = updatedRows && updatedRows.length > 0 ? formatStudentRow(updatedRows[0]) : null;

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      student: updatedStudent,
      user: updatedStudent
    });
  } catch (err) {
    next(err);
  }
}

export default { getStudentById, updateStudentProfile };
