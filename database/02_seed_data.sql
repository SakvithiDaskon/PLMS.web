-- PLMS Seed Data: Roles and Admin account
INSERT INTO roles (role_id, role_name, description) VALUES
(1, 'student', 'Enrolled student attending classes, quizzes, and tutorials'),
(2, 'parent', 'Parent/Guardian monitoring student grades and attendance'),
(3, 'admin', 'Head Educator / Administrator managing lessons and students')
ON DUPLICATE KEY UPDATE role_name = VALUES(role_name);

-- Default Admin User (Sir Parakum Bandara)
INSERT INTO users (user_id, email, password_hash, role_id, is_active) VALUES
(1, 'admin@plms.com', '$2a$12$K89s7c1VpG2X0O6fXF8eQeQ.Xp0pZ0rJ6k8yH1u5Jk0Lm9Pn0QwOu', 3, TRUE)
ON DUPLICATE KEY UPDATE email = VALUES(email);

INSERT INTO admin_details (admin_id, user_id, full_name, phone_number, designation) VALUES
(1, 1, 'Sir Parakum Bandara (Admin)', '+94 77 000 1122', 'Head Educator & Admin')
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);

-- Students register dynamically with sequential IDs starting from 0001
