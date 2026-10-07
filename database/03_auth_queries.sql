-- PLMS Authentication & Registration Queries

-- 1. REGISTRATION WORKFLOW

-- Check if email exists
SELECT user_id FROM users WHERE email = 'newstudent@example.com';

START TRANSACTION;

-- Insert login credentials
INSERT INTO users (email, password_hash, role_id, is_active)
VALUES ('newstudent@example.com', '$2a$12$hashedPasswordGoesHere...', 1, TRUE);

SET @new_user_id = LAST_INSERT_ID();

-- Generate next Student ID (0001, 0002, ...)
SELECT LPAD(COALESCE(MAX(CAST(student_id AS UNSIGNED)), 0) + 1, 4, '0')
INTO @next_student_id
FROM student_details;

-- Insert student profile
INSERT INTO student_details (
    user_id,
    full_name,
    phone_number,
    grade,
    student_id
)
VALUES (
    @new_user_id,
    'Nuwan Pradeep',
    '+94 77 987 6543',
    'Grade 11 (O/L Mathematics)',
    @next_student_id
);

COMMIT;


-- 2. LOGIN WORKFLOW

-- Student login by Student ID
SELECT 
    u.user_id,
    u.email,
    u.password_hash,
    u.is_active,
    r.role_name,
    sd.student_id,
    sd.full_name AS student_name,
    sd.grade,
    sd.phone_number
FROM student_details sd
INNER JOIN users u ON sd.user_id = u.user_id
INNER JOIN roles r ON u.role_id = r.role_id
WHERE sd.student_id = '0001'
  AND r.role_name = 'student'
  AND u.is_active = TRUE;

-- Admin login by Email
SELECT 
    u.user_id,
    u.email,
    u.password_hash,
    u.is_active,
    r.role_name,
    ad.full_name AS admin_name,
    ad.designation
FROM users u
INNER JOIN roles r ON u.role_id = r.role_id
INNER JOIN admin_details ad ON u.user_id = ad.user_id
WHERE u.email = 'admin@plms.com'
  AND r.role_name = 'admin'
  AND u.is_active = TRUE;

-- Update last login
UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = @authenticated_user_id;
