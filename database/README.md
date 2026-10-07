# PLMS SQL Database Architecture & Auth Mapping

This documentation explains the SQL relational database structure for **PLMS (Private Learning Management System)**, specifically mapping how **Registration** stores data and how **Login** retrieves and verifies it.

---

## 1. Architecture Overview: Clean Separation of Concerns

To follow standard industry and academic best practices (3rd Normal Form - 3NF):
1. **Authentication Data (`users` table)**: Stores only what is needed for logging in (email, hashed password, role, account status).
2. **Registration / Profile Data (`student_details`, `parent_details`, `admin_details`)**: Stores personal and academic details separately, linked to `users` via `user_id` Foreign Key.

---

## 2. Entity Relationship (ER) Diagram

```mermaid
erDiagram
    ROLES ||--o{ USERS : "assigned to"
    USERS ||--o| STUDENT_DETAILS : "has profile"
    USERS ||--o| PARENT_DETAILS : "has profile"
    USERS ||--o| ADMIN_DETAILS : "has profile"
    PARENT_DETAILS ||--o{ STUDENT_DETAILS : "monitors"

    ROLES {
        int role_id PK
        string role_name
        string description
    }

    USERS {
        int user_id PK
        string email UK
        string password_hash
        int role_id FK
        boolean is_active
        timestamp last_login
        timestamp created_at
    }

    STUDENT_DETAILS {
        int id PK
        int user_id FK
        string full_name
        string phone_number
        string grade
        string student_id UK
        int parent_id FK
        timestamp enrolled_at
    }

    PARENT_DETAILS {
        int parent_id PK
        int user_id FK
        string full_name
        string phone_number
        string occupation
    }

    ADMIN_DETAILS {
        int admin_id PK
        int user_id FK
        string full_name
        string phone_number
        string designation
    }
```

---

## 3. Frontend Form to SQL Table Field Mapping

### A. Register Form (`Register.jsx`)

| Frontend Form Field (`formData`) | SQL Table | Target Column | Purpose |
| :--- | :--- | :--- | :--- |
| `formData.email` | `users` | `email` | Unique login identifier |
| `formData.password` | `users` | `password_hash` | Stored as bcrypt hash |
| Role ('student') | `users` | `role_id` | Role foreign key (1 = Student) |
| `formData.name` | `student_details` | `full_name` | Student's display name |
| `formData.phone` | `student_details` | `phone_number` | WhatsApp / Contact number |
| `formData.grade` | `student_details` | `grade` | Enrolled grade |
| *(Auto-generated)* | `student_details` | `student_id` | Unique student ID (e.g., `STU-2026-889`) |

---

### B. Login Form (`Login.jsx`)

| Frontend Field | SQL Verification Step | Target Table & Column |
| :--- | :--- | :--- |
| `email` | Look up account | `users.email` |
| `password` | Compare hash | `users.password_hash` |
| `selectedRole` | Verify role match | `roles.role_name` |

---

## 4. End-to-End Workflow: Register to Login

```mermaid
sequenceDiagram
    autonumber
    actor Student
    participant UI as React Frontend (Register/Login)
    participant API as Backend API Server
    participant DB as SQL Database

    Note over Student, DB: Registration Flow
    Student->>UI: Fills Register form (Name, Email, Phone, Grade, Password)
    UI->>API: POST /api/auth/register (payload)
    API->>API: Validate input & Hash password (bcrypt)
    API->>DB: Check if email exists in `users`
    API->>DB: INSERT INTO `users` (email, password_hash, role_id)
    DB-->>API: Returns new user_id
    API->>DB: INSERT INTO `student_details` (user_id, full_name, phone, grade, student_id)
    DB-->>API: Confirm transaction committed
    API-->>UI: 201 Created (Token + Student Profile)
    UI-->>Student: Redirect to Student Portal / Dashboard

    Note over Student, DB: Subsequent Login Flow
    Student->>UI: Enters Email & Password on Login Page
    UI->>API: POST /api/auth/login (email, password, role)
    API->>DB: SELECT * FROM `users` JOIN `student_details` WHERE email = ?
    DB-->>API: Return user credentials & profile details
    API->>API: Verify password with bcrypt.compare()
    API->>DB: UPDATE `users` SET last_login = NOW()
    API-->>UI: 200 OK (JWT Token + User Profile Data)
    UI-->>Student: Logged in & routed to /student portal
```

---

## 5. SQL Files Included

1. [01_schema.sql](file:///c:/Users/Sakvithi/Documents/OPEN%20UNIVERSITY/PLMS/PLMS.web/database/01_schema.sql) - Table creation with foreign keys, uniqueness constraints, and performance indexes.
2. [02_seed_data.sql](file:///c:/Users/Sakvithi/Documents/OPEN%20UNIVERSITY/PLMS/PLMS.web/database/02_seed_data.sql) - Initial roles and default accounts (`student@plms.com`, `admin@plms.com`, `parent@plms.com`).
3. [03_auth_queries.sql](file:///c:/Users/Sakvithi/Documents/OPEN%20UNIVERSITY/PLMS/PLMS.web/database/03_auth_queries.sql) - Transactional registration query and login authentication queries.
