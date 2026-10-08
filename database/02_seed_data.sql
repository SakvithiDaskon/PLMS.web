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

-- 4. Insert Default Student Users
-- Student 1: Kasun Perera (Grade 11)
INSERT INTO users (user_id, email, password_hash, role_id, is_active) VALUES
(3, 'student@plms.com', '$2a$12$K89s7c1VpG2X0O6fXF8eQeQ.Xp0pZ0rJ6k8yH1u5Jk0Lm9Pn0QwOu', 1, TRUE)
ON DUPLICATE KEY UPDATE email = VALUES(email);

INSERT INTO student_details (id, user_id, full_name, phone_number, grade, student_id, parent_id) VALUES
(1, 3, 'Kasun Perera', '+94 77 123 4567', 'Grade 11 (O/L Mathematics)', 'STU-2026-889', 1)
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);

-- ===== ADDED TODAY: Dynamic Student Records (Grade 10 Nipuni, Grade 9 Dilshan) =====
-- Student 2: Nipuni Silva (Grade 10)
INSERT INTO users (user_id, email, password_hash, role_id, is_active) VALUES
(4, 'nipuni@plms.com', '$2a$12$K89s7c1VpG2X0O6fXF8eQeQ.Xp0pZ0rJ6k8yH1u5Jk0Lm9Pn0QwOu', 1, TRUE)
ON DUPLICATE KEY UPDATE email = VALUES(email);

INSERT INTO student_details (id, user_id, full_name, phone_number, grade, student_id, parent_id) VALUES
(2, 4, 'Nipuni Silva', '+94 71 987 6543', 'Grade 10 Mathematics', 'STU-2027-902', NULL)
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);

-- Student 3: Dilshan Fernando (Grade 9)
INSERT INTO users (user_id, email, password_hash, role_id, is_active) VALUES
(5, 'dilshan@plms.com', '$2a$12$K89s7c1VpG2X0O6fXF8eQeQ.Xp0pZ0rJ6k8yH1u5Jk0Lm9Pn0QwOu', 1, TRUE)
ON DUPLICATE KEY UPDATE email = VALUES(email);

INSERT INTO student_details (id, user_id, full_name, phone_number, grade, student_id, parent_id) VALUES
(3, 5, 'Dilshan Fernando', '+94 76 555 4321', 'Grade 9 Mathematics', 'STU-2028-104', NULL)
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name);

-- ============================================================
-- ADDED TODAY: Student Enrollments Seed Data
-- ============================================================
INSERT INTO student_enrollments (enrollment_id, student_id, subject, grade) VALUES
(1, 1, 'Mathematics', 'Grade 11'),
(2, 2, 'Mathematics', 'Grade 10'),
(3, 3, 'Mathematics', 'Grade 9')
ON DUPLICATE KEY UPDATE subject = VALUES(subject);

-- ============================================================
-- ADDED TODAY: Mathematics Topics Seed Data (Filtered by Grade)
-- ============================================================
-- Grade 11 Topics
INSERT INTO mathematics_topics (topic_id, grade, subject, topic_name, description, lessons_count, progress_pct) VALUES
(1, 'Grade 11', 'Mathematics', 'Algebra & Quadratic Equations', 'Linear equations, quadratic formula derivations, and factorization concepts.', 12, 65),
(2, 'Grade 11', 'Mathematics', 'Geometry & Circle Theorems', 'Angle properties, cyclic quadrilaterals, tangents, and theorem proofs.', 10, 40),
(3, 'Grade 11', 'Mathematics', 'Trigonometry & Angles of Elevation', 'Trigonometric ratios, heights, distances, and practical applications.', 8, 80),
(4, 'Grade 11', 'Mathematics', 'Matrices & Determinants', 'Matrix operations, inverses, determinants, and transformations.', 6, 25),
(5, 'Grade 11', 'Mathematics', 'Probability & Statistics', 'Tree diagrams, independent events, frequency distributions, and standard deviation.', 9, 50),
(6, 'Grade 11', 'Mathematics', 'Perimeter, Area & Volumes', 'Mensuration formulas for cylinders, cones, pyramids, and spheres.', 7, 15)
ON DUPLICATE KEY UPDATE topic_name = VALUES(topic_name);

-- Grade 10 Topics
INSERT INTO mathematics_topics (topic_id, grade, subject, topic_name, description, lessons_count, progress_pct) VALUES
(7, 'Grade 10', 'Mathematics', 'Algebraic Fractions & Formulae', 'Simplification of fractions, subject change, and simultaneous linear equations.', 10, 55),
(8, 'Grade 10', 'Mathematics', 'Pythagoras Theorem & Triangles', 'Right-angled triangles, geometric proofs, and congruent shapes.', 8, 70),
(9, 'Grade 10', 'Mathematics', 'Logarithms & Scientific Indices', 'Laws of indices, logarithmic tables, and power expansions.', 7, 30),
(10, 'Grade 10', 'Mathematics', 'Sets & Venn Diagrams', 'Two-set representations, union, intersection, and shaded regions.', 6, 85),
(11, 'Grade 10', 'Mathematics', 'Surface Area & Prisms', 'Cross-sectional area calculations and cylinder surface mensuration.', 9, 20),
(12, 'Grade 10', 'Mathematics', 'Linear Graphs & Gradients', 'Graph plotting, finding gradient m and intercept c from coordinates.', 8, 45)
ON DUPLICATE KEY UPDATE topic_name = VALUES(topic_name);

-- Grade 9 Topics
INSERT INTO mathematics_topics (topic_id, grade, subject, topic_name, description, lessons_count, progress_pct) VALUES
(13, 'Grade 9', 'Mathematics', 'Linear Equations & Graphs', 'Single-variable equations, coordinate axes, and plotting straight lines.', 8, 60),
(14, 'Grade 9', 'Mathematics', 'Financial Mathematics & Profit', 'Calculating percentage profit, loss, discounts, and simple interest.', 6, 75),
(15, 'Grade 9', 'Mathematics', 'Angles & Parallel Lines', 'Parallel line theorems, alternate angles, and triangle angle sums.', 7, 40),
(16, 'Grade 9', 'Mathematics', 'Fractions & Decimal Operations', 'Order of operations, reciprocal multiplication, and conversions.', 6, 90),
(17, 'Grade 9', 'Mathematics', 'Perimeter & Area of Plane Figures', 'Composite figures, practical geometric applications.', 8, 35),
(18, 'Grade 9', 'Mathematics', 'Ratio, Rate & Proportion', 'Dividing quantities in ratio and speed-distance-time relationships.', 5, 50)
ON DUPLICATE KEY UPDATE topic_name = VALUES(topic_name);

-- ============================================================
-- ADDED TODAY: Class Schedules Seed Data (Live Zoom Classes)
-- ============================================================
INSERT INTO class_schedules (class_id, grade, subject, title, topic, teacher, class_date, time_display, class_type, zoom_link, passcode, is_live) VALUES
(1, 'Grade 11', 'Mathematics', 'Grade 11 O/L Mathematics: Algebra & Quadratic Equations', 'Quadratic Equations', 'Sir Parakum Bandara', '2026-10-08', '18:00 - 20:00', 'Live Zoom Class', 'https://zoom.us/j/9876543210', 'PARAKUM26', TRUE),
(2, 'Grade 11', 'Mathematics', 'Grade 11 Geometry: Circle Theorems Masterclass', 'Circle Theorems', 'Sir Parakum Bandara', '2026-10-14', '18:30 - 20:00', 'Live Zoom Class', 'https://zoom.us/j/9876543210', 'CIRCLE26', FALSE),
(3, 'Grade 11', 'Mathematics', 'Grade 11 Trigonometry Problem Solving Workshop', 'Trigonometry', 'Sir Parakum Bandara', '2026-10-21', '18:00 - 19:30', 'Interactive Workshop', 'https://zoom.us/j/9876543210', 'TRIGO26', FALSE),
(4, 'Grade 11', 'Mathematics', 'Grade 11 O/L Mathematics Past Paper Discussion', 'Paper Discussion', 'Sir Parakum Bandara', '2026-10-28', '18:00 - 20:30', 'Live Zoom Class', 'https://zoom.us/j/9876543210', 'PAPER26', FALSE),
(5, 'Grade 10', 'Mathematics', 'Grade 10 Mathematics: Algebraic Fractions & Equations', 'Algebraic Fractions', 'Sir Parakum Bandara', '2026-10-09', '17:00 - 18:30', 'Live Zoom Class', 'https://zoom.us/j/1234567890', 'MATH10', TRUE),
(6, 'Grade 10', 'Mathematics', 'Grade 10 Mathematics: Pythagoras Theorem in Depth', 'Pythagoras Theorem', 'Sir Parakum Bandara', '2026-10-16', '17:00 - 18:30', 'Live Zoom Class', 'https://zoom.us/j/1234567890', 'PYTH10', FALSE),
(7, 'Grade 10', 'Mathematics', 'Grade 10 Mathematics: Logarithms & Scientific Indices', 'Logarithms & Scientific Indices', 'Sir Parakum Bandara', '2026-10-23', '17:00 - 18:30', 'Interactive Workshop', 'https://zoom.us/j/1234567890', 'LOGS10', FALSE),
(8, 'Grade 10', 'Mathematics', 'Grade 10 Mathematics: Sets & Venn Diagrams Masterclass', 'Sets & Venn Diagrams', 'Sir Parakum Bandara', '2026-10-30', '17:00 - 19:00', 'Live Zoom Class', 'https://zoom.us/j/1234567890', 'VENN10', FALSE),
(9, 'Grade 9', 'Mathematics', 'Grade 9 Mathematics: Linear Equations & Graphs', 'Linear Equations', 'Sir Parakum Bandara', '2026-10-11', '16:00 - 17:30', 'Live Zoom Class', 'https://zoom.us/j/5555555555', 'MATH9', TRUE),
(10, 'Grade 9', 'Mathematics', 'Grade 9 Mathematics: Financial Mathematics & Profit', 'Financial Mathematics', 'Sir Parakum Bandara', '2026-10-18', '16:00 - 17:30', 'Live Zoom Class', 'https://zoom.us/j/5555555555', 'FIN9', FALSE),
(11, 'Grade 9', 'Mathematics', 'Grade 9 Mathematics: Angles & Parallel Lines', 'Angles & Parallel Lines', 'Sir Parakum Bandara', '2026-10-25', '16:00 - 17:30', 'Interactive Workshop', 'https://zoom.us/j/5555555555', 'ANGLE9', FALSE),
(12, 'Grade 9', 'Mathematics', 'Grade 9 Mathematics: Fractions & Decimals Problem Solving', 'Fractions & Decimals', 'Sir Parakum Bandara', '2026-10-31', '16:00 - 17:30', 'Live Zoom Class', 'https://zoom.us/j/5555555555', 'FRAC9', FALSE)
ON DUPLICATE KEY UPDATE title = VALUES(title);
