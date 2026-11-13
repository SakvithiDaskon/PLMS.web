import { getPool } from '../config/db.js';

/**
 * Extracts and verifies the bearer token from the incoming request.
 * Identifies the authenticated user from the database.
 */
export async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'] || req.headers['x-auth-token'];
    let token = '';

    if (authHeader) {
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7).trim();
      } else {
        token = String(authHeader).trim();
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please sign in to continue.'
      });
    }

    // Supported token formats: 'plms-token-<userId>-...', 'aiven-jwt-token-<userId>', 'mock-jwt-token-<userId>'
    let userId = null;
    const plmsMatch = token.match(/plms-token-(\d+)/);
    const aivenMatch = token.match(/aiven-jwt-token-(\d+)/);
    const mockMatch = token.match(/mock-jwt-token-(\d+)/);

    if (plmsMatch) {
      userId = parseInt(plmsMatch[1], 10);
    } else if (aivenMatch) {
      userId = parseInt(aivenMatch[1], 10);
    } else if (mockMatch) {
      userId = parseInt(mockMatch[1], 10);
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Invalid session token. Please sign in again.'
      });
    }

    const pool = getPool();
    const [rows] = await pool.query(`
      SELECT 
        u.user_id,
        u.email,
        u.is_active,
        r.role_name,
        sd.id AS student_record_id,
        sd.student_id,
        sd.full_name AS student_name,
        sd.grade,
        sd.phone_number AS student_phone,
        sd.profile_picture,
        sd.enrolled_at,
        ad.admin_id,
        ad.full_name AS admin_name,
        ad.phone_number AS admin_phone,
        ad.designation,
        pd.parent_id,
        pd.full_name AS parent_name
      FROM users u
      INNER JOIN roles r ON u.role_id = r.role_id
      LEFT JOIN student_details sd ON u.user_id = sd.user_id
      LEFT JOIN admin_details ad ON u.user_id = ad.user_id
      LEFT JOIN parent_details pd ON u.user_id = pd.user_id
      WHERE u.user_id = ? AND u.is_active = TRUE
      LIMIT 1;
    `, [userId]);

    if (!rows || rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'User session has expired or account is inactive.'
      });
    }

    const row = rows[0];
    req.user = {
      userId: row.user_id,
      email: row.email,
      role: row.role_name,
      studentId: row.student_id,
      studentRecordId: row.student_record_id,
      name: row.student_name || row.admin_name || row.parent_name || 'User',
      grade: row.grade,
      profilePicture: row.profile_picture,
      enrolledAt: row.enrolled_at
    };

    next();
  } catch (err) {
    console.error('Auth middleware verification error:', err);
    return res.status(500).json({
      success: false,
      message: 'Authentication verification failed'
    });
  }
}

/**
 * Optional authentication middleware: if token present, sets req.user.
 * Does not block unauthenticated requests.
 */
export async function optionalAuthenticate(req, _res, next) {
  const authHeader = req.headers['authorization'] || req.headers['x-auth-token'];
  if (!authHeader) return next();

  let token = authHeader.startsWith('Bearer ') ? authHeader.substring(7).trim() : String(authHeader).trim();
  let userId = null;
  const plmsMatch = token.match(/plms-token-(\d+)/);
  const aivenMatch = token.match(/aiven-jwt-token-(\d+)/);
  const mockMatch = token.match(/mock-jwt-token-(\d+)/);

  if (plmsMatch) userId = parseInt(plmsMatch[1], 10);
  else if (aivenMatch) userId = parseInt(aivenMatch[1], 10);
  else if (mockMatch) userId = parseInt(mockMatch[1], 10);

  if (!userId) return next();

  try {
    const pool = getPool();
    const [rows] = await pool.query(`
      SELECT 
        u.user_id,
        u.email,
        r.role_name,
        sd.id AS student_record_id,
        sd.student_id,
        sd.full_name AS student_name,
        sd.grade
      FROM users u
      INNER JOIN roles r ON u.role_id = r.role_id
      LEFT JOIN student_details sd ON u.user_id = sd.user_id
      WHERE u.user_id = ? AND u.is_active = TRUE
      LIMIT 1;
    `, [userId]);

    if (rows && rows.length > 0) {
      const row = rows[0];
      req.user = {
        userId: row.user_id,
        email: row.email,
        role: row.role_name,
        studentId: row.student_id,
        studentRecordId: row.student_record_id,
        name: row.student_name || 'User',
        grade: row.grade
      };
    }
  } catch {
    // Ignore error for optional auth
  }

  next();
}

export default { authenticateToken, optionalAuthenticate };

