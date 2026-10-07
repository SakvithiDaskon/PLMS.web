-- =============================================================================
-- PLMS (Private Learning Management System) Database Schema
-- Modules: Authentication & Registration System (Users & Profiles)
-- Designed for: MySQL / PostgreSQL / SQL Server (Standard SQL-92/99 compatible)
-- =============================================================================

-- 1. ROLES TABLE (Defines user access levels)
CREATE TABLE IF NOT EXISTS roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(20) NOT NULL UNIQUE,     -- 'admin', 'student', 'parent'
    description VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. USERS TABLE (Core Authentication & Login Credentials ONLY)
-- Separating credentials ensures high security, single source of truth for login.
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,        -- Login identifier (Email)
    password_hash VARCHAR(255) NOT NULL,      -- Securely hashed password (bcrypt / argon2)
    role_id INT NOT NULL,                     -- Foreign Key referencing roles
    is_active BOOLEAN DEFAULT TRUE,           -- Account status (active / suspended)
    last_login TIMESTAMP NULL,                -- Timestamp of last successful login
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE RESTRICT
);

-- 3. STUDENT_DETAILS TABLE (Student Registration & Profile Information)
-- Created immediately upon registration. Linked 1-to-1 with USERS table.
CREATE TABLE IF NOT EXISTS student_details (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Internal record ID
    user_id INT NOT NULL UNIQUE,              -- 1-to-1 link to users table
    full_name VARCHAR(150) NOT NULL,          -- Full name from registration
    phone_number VARCHAR(20) NOT NULL,        -- Contact number (WhatsApp)
    grade VARCHAR(50) NOT NULL,               -- e.g. 'Grade 11 (O/L Mathematics)'
    student_id VARCHAR(30) UNIQUE NOT NULL,   -- Student ID (0001, 0002, ...)
    parent_id INT NULL,                       -- Optional link to parent profile
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_students_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 4. PARENT_DETAILS TABLE (Parent Profile Information)
CREATE TABLE IF NOT EXISTS parent_details (
    parent_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,              -- 1-to-1 link to users table
    full_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    occupation VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_parents_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 5. ADMIN_DETAILS TABLE (Educator / Admin Profile Information)
CREATE TABLE IF NOT EXISTS admin_details (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,              -- 1-to-1 link to users table
    full_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    designation VARCHAR(100) DEFAULT 'Head Educator & Admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_admins_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- ============================================================
-- ADDED TODAY: MATHEMATICS TOPICS TABLE (Curriculum Filtered by Grade)
-- ============================================================
CREATE TABLE IF NOT EXISTS mathematics_topics (
    topic_id INT AUTO_INCREMENT PRIMARY KEY,
    grade VARCHAR(50) NOT NULL,               -- e.g. 'Grade 11', 'Grade 10', 'Grade 9'
    subject VARCHAR(50) DEFAULT 'Mathematics',
    topic_name VARCHAR(150) NOT NULL,         -- e.g. 'Algebra & Quadratic Equations'
    description TEXT NOT NULL,                -- Short topic overview
    lessons_count INT DEFAULT 0,              -- Number of module lessons
    progress_pct INT DEFAULT 0,               -- Student completion percentage
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- ADDED TODAY: CLASS SCHEDULES TABLE (Live Zoom & Calendar Classes)
-- ============================================================
CREATE TABLE IF NOT EXISTS class_schedules (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    grade VARCHAR(50) NOT NULL,               -- e.g. 'Grade 11'
    subject VARCHAR(50) DEFAULT 'Mathematics',
    title VARCHAR(200) NOT NULL,              -- e.g. 'Grade 11 O/L Mathematics: Algebra & Quadratic Equations'
    topic VARCHAR(150) NOT NULL,              -- e.g. 'Quadratic Equations'
    teacher VARCHAR(100) NOT NULL,            -- e.g. 'Sir Parakum Bandara'
    class_date DATE NOT NULL,                 -- e.g. '2026-10-08'
    time_display VARCHAR(50) NOT NULL,        -- e.g. '18:00 - 20:00' / '6:30 PM - 8:00 PM'
    class_type VARCHAR(50) DEFAULT 'Live Zoom Class', -- 'Live Zoom Class', 'Interactive Workshop'
    zoom_link VARCHAR(255) NULL,
    passcode VARCHAR(50) NULL,
    is_live BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- ADDED TODAY: STUDENT ENROLLMENTS TABLE (Grade & Subject Mapping)
-- ============================================================
CREATE TABLE IF NOT EXISTS student_enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,                  -- Foreign Key to student_details
    subject VARCHAR(50) NOT NULL,             -- e.g. 'Mathematics'
    grade VARCHAR(50) NOT NULL,               -- e.g. 'Grade 11'
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_enrollments_student FOREIGN KEY (student_id) REFERENCES student_details(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_students_student_id ON student_details(student_id);
CREATE INDEX idx_students_grade ON student_details(grade);
CREATE INDEX idx_topics_grade ON mathematics_topics(grade);
CREATE INDEX idx_schedules_date_grade ON class_schedules(class_date, grade);
