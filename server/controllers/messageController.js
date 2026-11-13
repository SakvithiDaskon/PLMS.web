import { getPool } from '../config/db.js';

/**
 * GET /api/messages
 * Retrieves student messages.
 * If user is a student, only their own messages are returned.
 * If user is an admin/teacher, all messages are returned (with optional filters: grade, status).
 */
export async function getMessages(req, res, next) {
  try {
    const userRole = req.user?.role || 'student';
    const userId = req.user?.userId;
    const pool = getPool();

    if (userRole === 'student') {
      const [messages] = await pool.query(`
        SELECT 
          message_id,
          student_id,
          student_user_id,
          student_name,
          student_index_no,
          grade,
          subject,
          topic_id,
          lesson_title,
          subject_line,
          question_text,
          attachment_url,
          status,
          reply_text,
          replied_by,
          replied_at,
          is_read_by_student,
          is_read_by_teacher,
          created_at
        FROM student_teacher_messages
        WHERE student_user_id = ?
        ORDER BY message_id DESC;
      `, [userId]);

      const unreadCount = messages.filter(m => !m.is_read_by_student && m.status === 'answered').length;

      return res.status(200).json({
        success: true,
        unreadCount,
        totalMessages: messages.length,
        messages
      });
    } else {
      // Admin / Teacher
      const { grade, status, topicId } = req.query;
      let query = `
        SELECT 
          message_id,
          student_id,
          student_user_id,
          student_name,
          student_index_no,
          grade,
          subject,
          topic_id,
          lesson_title,
          subject_line,
          question_text,
          attachment_url,
          status,
          reply_text,
          replied_by,
          replied_at,
          is_read_by_student,
          is_read_by_teacher,
          created_at
        FROM student_teacher_messages
        WHERE 1=1
      `;
      const params = [];

      if (grade) {
        query += ` AND grade LIKE ?`;
        params.push(`%${grade}%`);
      }
      if (status) {
        query += ` AND status = ?`;
        params.push(status);
      }
      if (topicId) {
        query += ` AND topic_id = ?`;
        params.push(topicId);
      }

      query += ` ORDER BY message_id DESC;`;

      const [messages] = await pool.query(query, params);
      const pendingCount = messages.filter(m => m.status === 'pending').length;

      return res.status(200).json({
        success: true,
        pendingCount,
        totalMessages: messages.length,
        messages
      });
    }
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/messages
 * Student sends a new question to the teacher/admin.
 */
export async function sendMessage(req, res, next) {
  try {
    const {
      subject = 'Mathematics',
      topicId = null,
      lessonTitle = '',
      subjectLine,
      questionText,
      attachmentUrl = null
    } = req.body;

    if (!subjectLine || !questionText) {
      return res.status(400).json({
        success: false,
        message: 'Message subject line and question text are required.'
      });
    }

    const userId = req.user?.userId;
    const studentRecordId = req.user?.studentRecordId || 1;
    const studentName = req.user?.name || 'Student';
    const studentIndexNo = req.user?.studentId || `STU-${userId}`;
    const grade = req.user?.grade || 'Grade 7';

    const pool = getPool();

    const [result] = await pool.query(`
      INSERT INTO student_teacher_messages (
        student_id,
        student_user_id,
        student_name,
        student_index_no,
        grade,
        subject,
        topic_id,
        lesson_title,
        subject_line,
        question_text,
        attachment_url,
        status,
        is_read_by_student,
        is_read_by_teacher
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', TRUE, FALSE);
    `, [
      studentRecordId,
      userId,
      studentName,
      studentIndexNo,
      grade,
      subject,
      topicId,
      lessonTitle,
      subjectLine,
      questionText,
      attachmentUrl
    ]);

    return res.status(201).json({
      success: true,
      message: 'Question sent to teacher successfully! You will be notified when your teacher responds.',
      messageId: result.insertId
    });
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/messages/:id/reply
 * Teacher / Admin replies to a student question.
 */
export async function replyMessage(req, res, next) {
  try {
    const messageId = parseInt(req.params.id, 10);
    const { replyText } = req.body;
    const teacherName = req.user?.name || 'Sir Parakum Bandara (Instructor)';

    if (!replyText || !replyText.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Reply text cannot be empty.'
      });
    }

    const pool = getPool();

    const [updateResult] = await pool.query(`
      UPDATE student_teacher_messages
      SET 
        reply_text = ?,
        replied_by = ?,
        replied_at = NOW(),
        status = 'answered',
        is_read_by_student = FALSE,
        is_read_by_teacher = TRUE
      WHERE message_id = ?;
    `, [replyText.trim(), teacherName, messageId]);

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Reply sent to student successfully.'
    });
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/messages/:id/read
 * Marks message as read by student or teacher.
 */
export async function markAsRead(req, res, next) {
  try {
    const messageId = parseInt(req.params.id, 10);
    const userRole = req.user?.role || 'student';
    const pool = getPool();

    if (userRole === 'student') {
      await pool.query(`
        UPDATE student_teacher_messages
        SET is_read_by_student = TRUE
        WHERE message_id = ? AND student_user_id = ?;
      `, [messageId, req.user?.userId]);
    } else {
      await pool.query(`
        UPDATE student_teacher_messages
        SET is_read_by_teacher = TRUE
        WHERE message_id = ?;
      `, [messageId]);
    }

    return res.status(200).json({ success: true, message: 'Message marked as read' });
  } catch (err) {
    next(err);
  }
}

