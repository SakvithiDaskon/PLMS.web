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
    student_id VARCHAR(30) UNIQUE NOT NULL,   -- Sequential Student ID starting from '0001' to higher order (e.g. '0001', '0002')
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

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_students_student_id ON student_details(student_id);
CREATE INDEX idx_students_grade ON student_details(grade);
