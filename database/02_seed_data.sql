-- =============================================================================
-- PLMS Seed Data Script
-- Populates initial roles and default test accounts (Matching frontend demo data)
-- =============================================================================

-- 1. Insert System Roles
INSERT INTO roles (role_id, role_name, description) VALUES
(1, 'student', 'Enrolled student attending classes, quizzes, and tutorials'),
(2, 'parent', 'Parent/Guardian monitoring student grades and attendance'),
(3, 'admin', 'Head Educator / Administrator managing lessons and students')
ON DUPLICATE KEY UPDATE role_name = VALUES(role_name);

-- 2. Insert Default Admin User
-- Password for demo accounts: password123 (hashed representation)
INSERT INTO users (user_id, email, password_hash, role_id, is_active) VALUES
(1, 'admin@plms.com', '$2a$12$K89s7c1VpG2X0O6fXF8eQeQ.Xp0pZ0rJ6k8yH1u5Jk0Lm9Pn0QwOu', 3, TRUE)
ON DUPLICATE KEY UPDATE email = VALUES(email);

INSERT INTO admin_details (admin_id, user_id, full_name, phone_number, designation) VALUES
(1, 1, 'Sir Parakum Bandara (Admin)', '+94 77 000 1122', 'Head Educator & Admin')
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);

-- 3. Insert Default Parent User
INSERT INTO users (user_id, email, password_hash, role_id, is_active) VALUES
(2, 'parent@plms.com', '$2a$12$K89s7c1VpG2X0O6fXF8eQeQ.Xp0pZ0rJ6k8yH1u5Jk0Lm9Pn0QwOu', 2, TRUE)
ON DUPLICATE KEY UPDATE email = VALUES(email);

INSERT INTO parent_details (parent_id, user_id, full_name, phone_number, occupation) VALUES
(1, 2, 'Sunil Perera', '+94 70 333 2211', 'Civil Engineer')
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);

-- 4. Insert Default Student User (Kasun Perera)
INSERT INTO users (user_id, email, password_hash, role_id, is_active) VALUES
(3, 'student@plms.com', '$2a$12$K89s7c1VpG2X0O6fXF8eQeQ.Xp0pZ0rJ6k8yH1u5Jk0Lm9Pn0QwOu', 1, TRUE)
ON DUPLICATE KEY UPDATE email = VALUES(email);

INSERT INTO student_details (id, user_id, full_name, phone_number, grade, student_id, parent_id) VALUES
(1, 3, 'Kasun Perera', '+94 77 123 4567', 'Grade 11 (O/L Mathematics)', 'STU-2026-889', 1)
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);
