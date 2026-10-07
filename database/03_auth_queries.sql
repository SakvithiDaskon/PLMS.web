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

-- Step 1.2.2: Insert Registration Details into STUDENT_DETAILS table
-- Generates student ID (e.g., 'STU-2026-9912')
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
    'STU-2026-9912'
);

-- Commit transaction ensuring both records are created together
COMMIT;


-- =============================================================================
-- 2. LOGIN WORKFLOW (When a user submits the Sign In form)
-- =============================================================================

-- Query: Retrieve user credentials along with their specific profile details
-- This query automatically joins the correct details based on user role.

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
FROM users u
INNER JOIN roles r ON u.role_id = r.role_id
LEFT JOIN student_details sd ON u.user_id = sd.user_id
WHERE u.email = 'student@plms.com'
  AND r.role_name = 'student'
  AND u.is_active = TRUE;

-- Application Verification logic:
-- 1. Compare the entered password with the retrieved `password_hash` using bcrypt.
-- 2. If valid, update last_login timestamp:
UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = @authenticated_user_id;

-- 3. Return user profile JSON to React frontend:
-- {
--   id: 'std-' + student_id,
--   studentId: student_id,
--   name: student_name,
--   email: email,
--   role: 'student',
--   phone: phone_number,
--   grade: grade
-- }
