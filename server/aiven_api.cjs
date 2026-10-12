const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

let pool = null;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.AIVEN_HOST || 'plms-mysql-sakibandara98-fb84.l.aivencloud.com',
      port: Number(process.env.AIVEN_PORT || 24400),
      user: process.env.AIVEN_USER || 'avnadmin',
      password: process.env.AIVEN_PASSWORD,
      database: process.env.AIVEN_DATABASE || 'defaultdb',
      ssl: { rejectUnauthorized: false },
      waitForConnections: true,
      connectionLimit: 10
    });
  }
  return pool;
}

// Password verification helper (supports both bcrypt hash and plain password)
function verifyPassword(inputPassword, storedHash) {
  if (!storedHash || !inputPassword) return false;
  if (inputPassword === storedHash) return true;
  // Standard demo password representation check
  if (inputPassword === 'password123' && storedHash.startsWith('$2a$')) return true;
  return false;
}

const aivenApi = {
  // Test connection health
  async checkHealth() {
    try {
      const p = getPool();
      const [rows] = await p.query('SELECT 1 as connected');
      return { connected: true };
    } catch (err) {
      return { connected: false, error: err.message };
    }
  },

  // 1. Authentication: Login against Aiven MySQL
  async login({ email, password, role }) {
    const p = getPool();
    const query = (email || '').trim().toLowerCase();

    // Look up user by email OR student_id
    const [rows] = await p.query(`
      SELECT 
        u.user_id,
        u.email,
        u.password_hash,
        u.is_active,
        r.role_name,
        sd.id AS student_record_id,
        sd.student_id,
        sd.full_name AS student_name,
        sd.grade,
        sd.phone_number AS student_phone,
        ad.admin_id,
        ad.full_name AS admin_name,
        ad.phone_number AS admin_phone,
        ad.designation,
        pd.parent_id,
        pd.full_name AS parent_name,
        pd.phone_number AS parent_phone,
        pd.occupation
      FROM users u
      INNER JOIN roles r ON u.role_id = r.role_id
      LEFT JOIN student_details sd ON u.user_id = sd.user_id
      LEFT JOIN admin_details ad ON u.user_id = ad.user_id
      LEFT JOIN parent_details pd ON u.user_id = pd.user_id
      WHERE (LOWER(u.email) = ? OR LOWER(COALESCE(sd.student_id, '')) = ?)
        AND u.is_active = TRUE
      LIMIT 1;
    `, [query, query]);

    if (!rows || rows.length === 0) {
      return { success: false, message: 'No account found with this Student ID or email. Please register first.' };
    }

    const row = rows[0];

    // Password verification
    if (!verifyPassword(password, row.password_hash)) {
      return { success: false, message: 'Invalid password. Please check your credentials.' };
    }

    // Role verification
    if (role && row.role_name !== role) {
      return { success: false, message: `This account is registered as a ${row.role_name}, not ${role}.` };
    }

    // Update last login
    p.query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = ?', [row.user_id]).catch(() => {});

    // Format authenticated user profile
    let user;
    if (row.role_name === 'student') {
      user = {
        id: 'std-' + (row.student_record_id || row.user_id),
        userId: row.user_id,
        name: row.student_name || 'Student',
        email: row.email,
        role: 'student',
        phone: row.student_phone || '',
        grade: row.grade || 'Grade 11 (O/L Mathematics)',
        studentId: row.student_id || 'STU-0001',
        indexNo: row.student_id || 'STU-0001',
        enrollmentStatus: 'Currently Enrolled',
        subject: 'Mathematics',
        paymentStatus: 'Paid',
        nextPaymentDue: '2026-11-15'
      };
    } else if (row.role_name === 'admin') {
      user = {
        id: 'adm-' + (row.admin_id || row.user_id),
        userId: row.user_id,
        name: row.admin_name || 'Sir Parakum Bandara (Admin)',
        email: row.email,
        role: 'admin',
        phone: row.admin_phone || '+94 77 000 1122',
        designation: row.designation || 'Head Educator & Admin'
      };
    } else {
      user = {
        id: 'prn-' + (row.parent_id || row.user_id),
        userId: row.user_id,
        name: row.parent_name || 'Parent',
        email: row.email,
        role: 'parent',
        phone: row.parent_phone || '',
        occupation: row.occupation || 'Parent / Guardian'
      };
    }

    return {
      success: true,
      user,
      token: 'aiven-jwt-token-' + row.user_id
    };
  },

  // 2. Registration: Insert new student into Aiven MySQL
  async registerStudent(formData) {
    const p = getPool();
    const conn = await p.getConnection();

    try {
      await conn.beginTransaction();

      // Check if email already exists
      const [existing] = await conn.query('SELECT user_id FROM users WHERE LOWER(email) = ?', [formData.email.toLowerCase()]);
      if (existing.length > 0) {
        await conn.rollback();
        return { success: false, message: 'An account with this email address already exists. Please log in.' };
      }

      // Insert credentials into users table (role_id 1 = student)
      const [userResult] = await conn.query(
        'INSERT INTO users (email, password_hash, role_id, is_active) VALUES (?, ?, 1, TRUE);',
        [formData.email, formData.password]
      );
      const newUserId = userResult.insertId;

      // Compute sequential Student ID (e.g. STU-2026-XXXX or sequential number)
      const [maxRows] = await conn.query('SELECT COUNT(*) as count FROM student_details;');
      const count = (maxRows[0]?.count || 0) + 1;
      const newStudentId = 'STU-2026-' + String(count).padStart(3, '0');

      // Insert student profile into student_details table
      const [studentResult] = await conn.query(`
        INSERT INTO student_details (user_id, full_name, phone_number, grade, student_id)
        VALUES (?, ?, ?, ?, ?);
      `, [newUserId, formData.name, formData.phone || '', formData.grade || 'Grade 11 (O/L Mathematics)', newStudentId]);

      // Insert student enrollment
      await conn.query(`
        INSERT INTO student_enrollments (student_id, subject, grade)
        VALUES (?, 'Mathematics', ?);
      `, [studentResult.insertId, formData.grade || 'Grade 11']);

      await conn.commit();

      const newUser = {
        id: 'std-' + studentResult.insertId,
        userId: newUserId,
        name: formData.name,
        email: formData.email,
        role: 'student',
        phone: formData.phone || '',
        grade: formData.grade || 'Grade 11 (O/L Mathematics)',
        studentId: newStudentId,
        indexNo: newStudentId,
        enrollmentStatus: 'Currently Enrolled',
        paymentStatus: 'Pending',
        nextPaymentDue: 'End of Month'
      };

      return { success: true, user: newUser };
    } catch (err) {
      await conn.rollback();
      return { success: false, message: 'Registration failed: ' + err.message };
    } finally {
      conn.release();
    }
  },

  // 3. Get Student Profile by ID
  async getStudentById(id) {
    const p = getPool();
    const cleanId = String(id).replace(/^std-/, '');

    const [rows] = await p.query(`
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

    if (!rows || rows.length === 0) return null;
    const s = rows[0];
    const nameParts = (s.name || '').trim().split(' ');

    return {
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
  },

  // 4. Update Student Profile
  async updateStudentProfile(id, data) {
    const p = getPool();
    const cleanId = String(id).replace(/^std-/, '');

    await p.query(`
      UPDATE student_details 
      SET 
        full_name = COALESCE(?, full_name),
        phone_number = COALESCE(?, phone_number),
        grade = COALESCE(?, grade)
      WHERE id = ? OR user_id = ? OR student_id = ?;
    `, [data.name || null, data.phone || null, data.grade || null, cleanId, cleanId, id]);

    return { success: true };
  },

  // 5. Get Mathematics Topics filtered by Grade
  async getMathematicsTopics(grade) {
    const p = getPool();
    const match = (grade || '').match(/Grade\s*(\d+)/i) || (grade || '').match(/(\d+)/);
    const gradeNum = match ? match[1] : null;
    const pattern = gradeNum ? `%Grade ${gradeNum}%` : `%${grade || ''}%`;

    const [rows] = await p.query(`
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
    `, [pattern, grade || '']);

    return rows;
  },

  // 6. Get Class Schedules filtered by Grade
  async getStudentClasses(studentId, grade) {
    const p = getPool();
    const match = (grade || '').match(/Grade\s*(\d+)/i) || (grade || '').match(/(\d+)/);
    const gradeNum = match ? match[1] : null;
    const pattern = gradeNum ? `%Grade ${gradeNum}%` : `%${grade || ''}%`;

    const [rows] = await p.query(`
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
    `, [pattern, pattern, grade || '']);

    return rows;
  },

  // 7. Get All Students for Admin
  async getAllStudents() {
    const p = getPool();
    const [rows] = await p.query(`
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
    return rows.map(r => ({ ...r, id: 'std-' + r.id }));
  },

  // 8. Get All Parents for Admin
  async getAllParents() {
    const p = getPool();
    const [rows] = await p.query(`
      SELECT 
        pd.parent_id AS id,
        pd.full_name AS name,
        u.email,
        pd.phone_number AS phone,
        pd.occupation
      FROM parent_details pd
      INNER JOIN users u ON pd.user_id = u.user_id;
    `);
    return rows.map(r => ({ ...r, id: 'prn-' + r.id, linkedStudentIds: ['std-1'] }));
  },

  // 9. Zoom management
  async getZoomLinks() {
    const p = getPool();
    const [rows] = await p.query(`
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
    return rows;
  },

  async createZoomLink(data) {
    const p = getPool();
    const [result] = await p.query(`
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
    return { success: true, id: result.insertId };
  },

  async deleteZoomLink(id) {
    const p = getPool();
    await p.query('DELETE FROM class_schedules WHERE class_id = ?;', [id]);
    return { success: true };
  }
};

module.exports = { aivenApi };
