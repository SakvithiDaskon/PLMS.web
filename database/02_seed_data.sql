-- =============================================================================
-- PLMS Seed Data Script
-- Populates core system roles and head educator / administrator account ONLY.
--
-- NOTE: ALL sample test users (e.g. Kasun Perera, Nipuni Silva, Sunil Perera)
-- have been completely deleted as requested.
-- Student accounts are created strictly through the Student Registration form,
-- with sequential student IDs starting from '0001' to higher order ('0001', '0002', '0003'...).
-- =============================================================================

-- 1. Insert System Roles
INSERT INTO roles (role_id, role_name, description) VALUES
(1, 'student', 'Enrolled student attending classes, quizzes, and tutorials'),
(2, 'parent', 'Parent/Guardian monitoring student grades and attendance'),
(3, 'admin', 'Head Educator / Administrator managing lessons and students')
ON DUPLICATE KEY UPDATE role_name = VALUES(role_name);

-- 2. Insert Default Admin User (Educator: Sir Parakum Bandara)
-- Password for admin login: password123 (hashed representation)
INSERT INTO users (user_id, email, password_hash, role_id, is_active) VALUES
(1, 'admin@plms.com', '$2a$12$K89s7c1VpG2X0O6fXF8eQeQ.Xp0pZ0rJ6k8yH1u5Jk0Lm9Pn0QwOu', 3, TRUE)
ON DUPLICATE KEY UPDATE email = VALUES(email);

INSERT INTO admin_details (admin_id, user_id, full_name, phone_number, designation) VALUES
(1, 1, 'Sir Parakum Bandara (Admin)', '+94 77 000 1122', 'Head Educator & Admin')
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);

-- 3. Student Registration Note:
-- Real students registering on the frontend will be inserted into `users` and `student_details`
-- with student_id starting from '0001', '0002', '0003' and continuing in ascending order.
