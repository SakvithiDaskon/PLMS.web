import { getPool } from '../config/db.js';

export async function createLearningTables() {
  const pool = getPool();
  console.log('Creating PLMS Learning Resource and Messaging tables...');

  // 1. Lesson Recordings
  await pool.query(`
    CREATE TABLE IF NOT EXISTS lesson_recordings (
      recording_id INT AUTO_INCREMENT PRIMARY KEY,
      grade VARCHAR(50) NOT NULL,
      subject VARCHAR(50) NOT NULL DEFAULT 'Mathematics',
      topic_id INT NOT NULL,
      lesson_index INT NOT NULL DEFAULT 0,
      lesson_title VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      video_url VARCHAR(500) NOT NULL,
      teacher_name VARCHAR(150) NOT NULL DEFAULT 'Sir Parakum Bandara',
      duration VARCHAR(50) DEFAULT '45 mins',
      recording_date DATE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_grade_topic (grade, topic_id, lesson_index)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 2. Lesson Tutorials
  await pool.query(`
    CREATE TABLE IF NOT EXISTS lesson_tutorials (
      tutorial_id INT AUTO_INCREMENT PRIMARY KEY,
      grade VARCHAR(50) NOT NULL,
      subject VARCHAR(50) NOT NULL DEFAULT 'Mathematics',
      topic_id INT NOT NULL,
      lesson_index INT NOT NULL DEFAULT 0,
      lesson_title VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      file_url VARCHAR(500) NOT NULL,
      file_type VARCHAR(50) NOT NULL DEFAULT 'PDF',
      teacher_name VARCHAR(150) NOT NULL DEFAULT 'Sir Parakum Bandara',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_grade_topic (grade, topic_id, lesson_index)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 3. Lesson Notes
  await pool.query(`
    CREATE TABLE IF NOT EXISTS lesson_notes (
      note_id INT AUTO_INCREMENT PRIMARY KEY,
      grade VARCHAR(50) NOT NULL,
      subject VARCHAR(50) NOT NULL DEFAULT 'Mathematics',
      topic_id INT NOT NULL,
      lesson_index INT NOT NULL DEFAULT 0,
      lesson_title VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      content LONGTEXT NOT NULL,
      pdf_url VARCHAR(500),
      teacher_name VARCHAR(150) NOT NULL DEFAULT 'Sir Parakum Bandara',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_grade_topic (grade, topic_id, lesson_index)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 4. Lesson YouTube Recommendations
  await pool.query(`
    CREATE TABLE IF NOT EXISTS lesson_youtube_recommendations (
      rec_id INT AUTO_INCREMENT PRIMARY KEY,
      grade VARCHAR(50) NOT NULL,
      subject VARCHAR(50) NOT NULL DEFAULT 'Mathematics',
      topic_id INT NOT NULL,
      lesson_index INT NOT NULL DEFAULT 0,
      lesson_title VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      youtube_url VARCHAR(500) NOT NULL,
      channel_name VARCHAR(150) NOT NULL,
      description TEXT,
      thumbnail_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_grade_topic (grade, topic_id, lesson_index)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 5. Lesson Quizzes
  await pool.query(`
    CREATE TABLE IF NOT EXISTS lesson_quizzes (
      quiz_id INT AUTO_INCREMENT PRIMARY KEY,
      grade VARCHAR(50) NOT NULL,
      subject VARCHAR(50) NOT NULL DEFAULT 'Mathematics',
      topic_id INT NOT NULL,
      lesson_index INT NOT NULL DEFAULT 0,
      lesson_title VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      instructions TEXT,
      duration_minutes INT NOT NULL DEFAULT 15,
      total_marks INT NOT NULL DEFAULT 100,
      questions JSON NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_grade_topic (grade, topic_id, lesson_index)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 6. Student Quiz Attempts
  await pool.query(`
    CREATE TABLE IF NOT EXISTS student_quiz_attempts (
      attempt_id INT AUTO_INCREMENT PRIMARY KEY,
      quiz_id INT NOT NULL,
      student_id INT NOT NULL,
      user_id INT NOT NULL,
      student_name VARCHAR(150) NOT NULL,
      score INT NOT NULL DEFAULT 0,
      total_marks INT NOT NULL DEFAULT 100,
      percentage INT NOT NULL DEFAULT 0,
      answers JSON NOT NULL,
      submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_quiz_student (quiz_id, student_id),
      INDEX idx_user (user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 7. Student-Teacher Messages ("Ask Your Teacher")
  await pool.query(`
    CREATE TABLE IF NOT EXISTS student_teacher_messages (
      message_id INT AUTO_INCREMENT PRIMARY KEY,
      student_id INT NOT NULL,
      student_user_id INT NOT NULL,
      student_name VARCHAR(150) NOT NULL,
      student_index_no VARCHAR(50) NOT NULL,
      grade VARCHAR(50) NOT NULL,
      subject VARCHAR(50) NOT NULL DEFAULT 'Mathematics',
      topic_id INT,
      lesson_title VARCHAR(255),
      subject_line VARCHAR(255) NOT NULL,
      question_text TEXT NOT NULL,
      attachment_url VARCHAR(500),
      status ENUM('pending', 'answered') NOT NULL DEFAULT 'pending',
      reply_text TEXT,
      replied_by VARCHAR(150),
      replied_at DATETIME,
      is_read_by_student BOOLEAN NOT NULL DEFAULT TRUE,
      is_read_by_teacher BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_student (student_id),
      INDEX idx_grade (grade),
      INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  console.log('✓ All 7 PLMS Learning Resource and Messaging tables verified & created successfully.');
}

if (process.argv[1]?.endsWith('create_learning_tables.js')) {
  createLearningTables()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Error creating learning tables:', err);
      process.exit(1);
    });
}

