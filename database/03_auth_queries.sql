-- =============================================================================
-- PLMS Authentication & Registration Queries
-- How data is written during Registration and retrieved during Login
-- =============================================================================

-- =============================================================================
-- 1. REGISTRATION WORKFLOW (When a student submits the Register form)
-- =============================================================================

-- STEP 1.1: Verify email does not already exist
SELECT user_id FROM users WHERE email = 'newstudent@example.com';

-- STEP 1.2: Atomic Transaction to save Registration Details across both tables
START TRANSACTION;

-- Step 1.2.1: Insert Login Credentials into USERS table
-- Role ID 1 corresponds to 'student'
INSERT INTO users (email, password_hash, role_id, is_active)
VALUES ('newstudent@example.com', '$2a$12$hashedPasswordGoesHere...', 1, TRUE);

-- Get the newly inserted user_id
SET @new_user_id = LAST_INSERT_ID();

-- Step 1.2.2: Compute the next sequential Student ID starting from '0001' to higher order
-- If table is empty, assigns '0001'. For 2nd registration, assigns '0002', etc.
SELECT LPAD(COALESCE(MAX(CAST(student_id AS UNSIGNED)), 0) + 1, 4, '0')
INTO @next_student_id
FROM student_details;

-- Step 1.2.3: Insert Registration Details into STUDENT_DETAILS table
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

-- Commit transaction ensuring both records are created together
COMMIT;


-- =============================================================================
-- 2. LOGIN WORKFLOW (When a user submits the Sign In form)
-- =============================================================================

-- Query A: Student Login by STUDENT ID (e.g. '0001')
-- Students enter their unique sequential Student ID and password
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

-- Query B: Administrator Login by Email
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

-- Application Verification logic:
-- 1. Compare the entered password with the retrieved `password_hash` using bcrypt.
-- 2. If valid, update last_login timestamp:
UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = @authenticated_user_id;

-- 3. Return user profile JSON to React frontend:
-- {
--   id: 'std-' + student_id,
--   studentId: student_id,       -- e.g. '0001'
--   name: student_name,
--   email: email,
--   role: 'student',
--   phone: phone_number,
--   grade: grade
-- }
