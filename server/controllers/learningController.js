import { getPool } from '../config/db.js';

/**
 * Normalizes grade string into standard format e.g. "Grade 6", "Grade 7"
 */
function normalizeGrade(gradeStr) {
  if (!gradeStr) return '';
  const match = String(gradeStr).match(/Grade\s*(\d+)/i) || String(gradeStr).match(/(\d+)/);
  return match ? `Grade ${match[1]}` : gradeStr.trim();
}

/**
 * GET /api/lessons/curriculum
 * Returns the curriculum hierarchy (Units/Topics and Lessons/Modules)
 * Students receive strictly their enrolled grade curriculum.
 * Admins/teachers can pass ?grade=Grade%207 to view any grade.
 */
export async function getCurriculumHierarchy(req, res, next) {
  try {
    const userRole = req.user?.role || 'student';
    let targetGrade = '';

    if (userRole === 'student') {
      // Strictly enforce registered student's grade
      targetGrade = normalizeGrade(req.user?.grade);
      if (!targetGrade) {
        return res.status(400).json({
          success: false,
          message: 'Student profile has no registered grade assigned.'
        });
      }
    } else {
      // Admin / Teacher can specify grade or defaults to Grade 7
      targetGrade = normalizeGrade(req.query.grade) || 'Grade 7';
    }

    const pool = getPool();
    const pattern = `%${targetGrade}%`;

    const [rows] = await pool.query(`
      SELECT 
        topic_id AS id,
        grade,
        subject,
        term,
        topic_name AS name,
        description,
        lessons_count AS lessonsCount,
        progress_pct AS progress,
        modules,
        completed_modules AS completedModules
      FROM mathematics_topics
      WHERE grade LIKE ?
      ORDER BY topic_id ASC;
    `, [pattern]);

    const topics = rows.map(r => {
      let parsedModules = [];
      try {
        parsedModules = typeof r.modules === 'string' ? JSON.parse(r.modules) : (r.modules || []);
      } catch {
        parsedModules = [];
      }
      let parsedCompleted = [];
      try {
        parsedCompleted = typeof r.completedModules === 'string' ? JSON.parse(r.completedModules) : (r.completedModules || []);
      } catch {
        parsedCompleted = [];
      }
      return {
        ...r,
        modules: parsedModules,
        completedModules: parsedCompleted
      };
    });

    return res.status(200).json({
      success: true,
      grade: targetGrade,
      subject: 'Mathematics',
      totalTopics: topics.length,
      topics
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/lessons/resources/:topicId/:lessonIndex
 * Retrieves all 6 learning resource sections for a specific lesson:
 * 1. recordings
 * 2. tutorials
 * 3. notes
 * 4. youtube
 * 5. quiz + student's latest attempt
 * 
 * STRICT SECURITY: Validates that the requested topicId belongs to the student's registered grade.
 * Returns 403 Forbidden if a student attempts to access content outside their grade.
 */
export async function getLessonResources(req, res, next) {
  try {
    const topicId = parseInt(req.params.topicId, 10);
    const lessonIndex = parseInt(req.params.lessonIndex, 10) || 0;
    const userRole = req.user?.role || 'student';
    const pool = getPool();

    // 1. Fetch topic to check grade and get details
    const [topicRows] = await pool.query(`
      SELECT topic_id, grade, subject, term, topic_name, modules
      FROM mathematics_topics
      WHERE topic_id = ?
      LIMIT 1;
    `, [topicId]);

    if (!topicRows || topicRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Curriculum unit/chapter not found.'
      });
    }

    const topic = topicRows[0];
    const topicGradeNorm = normalizeGrade(topic.grade);

    // 2. Strict grade authorization check for students
    if (userRole === 'student') {
      const studentGradeNorm = normalizeGrade(req.user?.grade);
      if (studentGradeNorm && topicGradeNorm !== studentGradeNorm) {
        return res.status(403).json({
          success: false,
          message: `Access denied: You are enrolled in ${studentGradeNorm}. You cannot access resources for ${topic.grade}.`
        });
      }
    }

    // Parse lesson title
    let modules = [];
    try {
      modules = typeof topic.modules === 'string' ? JSON.parse(topic.modules) : (topic.modules || []);
    } catch {
      modules = [];
    }
    const lessonTitle = modules[lessonIndex] || `Lesson ${lessonIndex + 1}`;

    // 3. Query all resources in parallel for maximum performance
    const [
      [recordings],
      [tutorials],
      [notes],
      [youtube],
      [quizzes]
    ] = await Promise.all([
      pool.query(`
        SELECT recording_id, grade, subject, topic_id, lesson_index, lesson_title, title, video_url, teacher_name, duration, recording_date, created_at
        FROM lesson_recordings
        WHERE topic_id = ? AND lesson_index = ?
        ORDER BY recording_id DESC;
      `, [topicId, lessonIndex]),
      pool.query(`
        SELECT tutorial_id, grade, subject, topic_id, lesson_index, lesson_title, title, description, file_url, file_type, teacher_name, created_at
        FROM lesson_tutorials
        WHERE topic_id = ? AND lesson_index = ?
        ORDER BY tutorial_id DESC;
      `, [topicId, lessonIndex]),
      pool.query(`
        SELECT note_id, grade, subject, topic_id, lesson_index, lesson_title, title, content, pdf_url, teacher_name, created_at
        FROM lesson_notes
        WHERE topic_id = ? AND lesson_index = ?
        ORDER BY note_id DESC;
      `, [topicId, lessonIndex]),
      pool.query(`
        SELECT rec_id, grade, subject, topic_id, lesson_index, lesson_title, title, youtube_url, channel_name, description, thumbnail_url, created_at
        FROM lesson_youtube_recommendations
        WHERE topic_id = ? AND lesson_index = ?
        ORDER BY rec_id DESC;
      `, [topicId, lessonIndex]),
      pool.query(`
        SELECT quiz_id, grade, subject, topic_id, lesson_index, lesson_title, title, instructions, duration_minutes, total_marks, questions, created_at
        FROM lesson_quizzes
        WHERE topic_id = ? AND lesson_index = ?
        ORDER BY quiz_id DESC
        LIMIT 1;
      `, [topicId, lessonIndex])
    ]);

    // Parse quiz questions if exists
    let quizData = null;
    let latestAttempt = null;

    if (quizzes.length > 0) {
      const q = quizzes[0];
      let questionsParsed = [];
      try {
        questionsParsed = typeof q.questions === 'string' ? JSON.parse(q.questions) : (q.questions || []);
      } catch {
        questionsParsed = [];
      }

      quizData = {
        quizId: q.quiz_id,
        title: q.title,
        instructions: q.instructions,
        durationMinutes: q.duration_minutes,
        totalMarks: q.total_marks,
        questionsCount: questionsParsed.length,
        questions: questionsParsed
      };

      // If student is logged in, check their latest attempt
      if (req.user?.userId) {
        const [attemptRows] = await pool.query(`
          SELECT attempt_id, score, total_marks, percentage, answers, submitted_at
          FROM student_quiz_attempts
          WHERE quiz_id = ? AND user_id = ?
          ORDER BY attempt_id DESC
          LIMIT 1;
        `, [q.quiz_id, req.user.userId]);

        if (attemptRows.length > 0) {
          const att = attemptRows[0];
          let parsedAnswers = [];
          try {
            parsedAnswers = typeof att.answers === 'string' ? JSON.parse(att.answers) : (att.answers || []);
          } catch {
            parsedAnswers = [];
          }
          latestAttempt = {
            attemptId: att.attempt_id,
            score: att.score,
            totalMarks: att.total_marks,
            percentage: att.percentage,
            answers: parsedAnswers,
            submittedAt: att.submitted_at
          };
        }
      }
    }

    return res.status(200).json({
      success: true,
      meta: {
        topicId,
        topicName: topic.topic_name,
        term: topic.term,
        grade: topic.grade,
        subject: topic.subject,
        lessonIndex,
        lessonTitle,
        totalLessons: modules.length
      },
      resources: {
        recordings,
        tutorials,
        notes,
        youtube,
        quiz: quizData,
        latestAttempt
      }
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/lessons/quiz/:quizId/submit
 * Submits student's answers for a lesson quiz.
 * Validates responses against correct options and records into student_quiz_attempts.
 */
export async function submitQuizAttempt(req, res, next) {
  try {
    const quizId = parseInt(req.params.quizId, 10);
    const { answers } = req.body; // e.g. [ { questionIndex: 0, selectedOption: 2 }, ... ]
    const userId = req.user?.userId;
    const studentName = req.user?.name || 'Student';
    const studentRecordId = req.user?.studentRecordId || 1;
    const pool = getPool();

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid submission format. Answers array required.'
      });
    }

    const [quizRows] = await pool.query(`
      SELECT quiz_id, grade, subject, topic_id, lesson_index, lesson_title, total_marks, questions
      FROM lesson_quizzes
      WHERE quiz_id = ?
      LIMIT 1;
    `, [quizId]);

    if (!quizRows || quizRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found.'
      });
    }

    const quiz = quizRows[0];
    let questions = [];
    try {
      questions = typeof quiz.questions === 'string' ? JSON.parse(quiz.questions) : (quiz.questions || []);
    } catch {
      questions = [];
    }

    if (questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'This quiz has no questions configured.'
      });
    }

    // Evaluate answers
    let correctCount = 0;
    const evaluatedAnswers = questions.map((q, idx) => {
      const studentAns = answers.find(a => a.questionIndex === idx);
      const chosen = studentAns !== undefined ? studentAns.selectedOption : null;
      const isCorrect = chosen !== null && Number(chosen) === Number(q.correctAnswer);
      if (isCorrect) correctCount++;
      return {
        questionIndex: idx,
        question: q.question,
        selectedOption: chosen,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation || ''
      };
    });

    const marksPerQuestion = (quiz.total_marks || 100) / questions.length;
    const score = Math.round(correctCount * marksPerQuestion);
    const percentage = Math.round((correctCount / questions.length) * 100);

    // Save attempt to student_quiz_attempts
    const [insertResult] = await pool.query(`
      INSERT INTO student_quiz_attempts 
        (quiz_id, student_id, user_id, student_name, score, total_marks, percentage, answers)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `, [
      quizId,
      studentRecordId,
      userId,
      studentName,
      score,
      quiz.total_marks || 100,
      percentage,
      JSON.stringify(evaluatedAnswers)
    ]);

    return res.status(200).json({
      success: true,
      message: 'Quiz submitted and graded successfully!',
      result: {
        attemptId: insertResult.insertId,
        score,
        totalMarks: quiz.total_marks || 100,
        percentage,
        correctCount,
        totalQuestions: questions.length,
        evaluatedAnswers
      }
    });
  } catch (err) {
    next(err);
  }
}

// ==========================================
// ADMIN / TEACHER RESOURCE MANAGEMENT (CRUD)
// ==========================================

export async function createRecording(req, res, next) {
  try {
    const { grade, subject = 'Mathematics', topicId, lessonIndex, lessonTitle, title, videoUrl, teacherName = 'Sir Parakum Bandara', duration = '45 mins', recordingDate } = req.body;
    const pool = getPool();

    const [result] = await pool.query(`
      INSERT INTO lesson_recordings 
        (grade, subject, topic_id, lesson_index, lesson_title, title, video_url, teacher_name, duration, recording_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `, [grade, subject, topicId, lessonIndex || 0, lessonTitle, title, videoUrl, teacherName, duration, recordingDate || new Date().toISOString().split('T')[0]]);

    return res.status(201).json({ success: true, message: 'Recording added successfully', id: result.insertId });
  } catch (err) { next(err); }
}

export async function deleteRecording(req, res, next) {
  try {
    const { id } = req.params;
    const pool = getPool();
    await pool.query('DELETE FROM lesson_recordings WHERE recording_id = ?', [id]);
    return res.status(200).json({ success: true, message: 'Recording deleted successfully' });
  } catch (err) { next(err); }
}

export async function createTutorial(req, res, next) {
  try {
    const { grade, subject = 'Mathematics', topicId, lessonIndex, lessonTitle, title, description, fileUrl, fileType = 'PDF', teacherName = 'Sir Parakum Bandara' } = req.body;
    const pool = getPool();

    const [result] = await pool.query(`
      INSERT INTO lesson_tutorials 
        (grade, subject, topic_id, lesson_index, lesson_title, title, description, file_url, file_type, teacher_name)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `, [grade, subject, topicId, lessonIndex || 0, lessonTitle, title, description, fileUrl, fileType, teacherName]);

    return res.status(201).json({ success: true, message: 'Tutorial added successfully', id: result.insertId });
  } catch (err) { next(err); }
}

export async function deleteTutorial(req, res, next) {
  try {
    const { id } = req.params;
    const pool = getPool();
    await pool.query('DELETE FROM lesson_tutorials WHERE tutorial_id = ?', [id]);
    return res.status(200).json({ success: true, message: 'Tutorial deleted successfully' });
  } catch (err) { next(err); }
}

export async function createNote(req, res, next) {
  try {
    const { grade, subject = 'Mathematics', topicId, lessonIndex, lessonTitle, title, content, pdfUrl, teacherName = 'Sir Parakum Bandara' } = req.body;
    const pool = getPool();

    const [result] = await pool.query(`
      INSERT INTO lesson_notes 
        (grade, subject, topic_id, lesson_index, lesson_title, title, content, pdf_url, teacher_name)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `, [grade, subject, topicId, lessonIndex || 0, lessonTitle, title, content, pdfUrl, teacherName]);

    return res.status(201).json({ success: true, message: 'Note added successfully', id: result.insertId });
  } catch (err) { next(err); }
}

export async function deleteNote(req, res, next) {
  try {
    const { id } = req.params;
    const pool = getPool();
    await pool.query('DELETE FROM lesson_notes WHERE note_id = ?', [id]);
    return res.status(200).json({ success: true, message: 'Note deleted successfully' });
  } catch (err) { next(err); }
}

export async function createYouTubeRec(req, res, next) {
  try {
    const { grade, subject = 'Mathematics', topicId, lessonIndex, lessonTitle, title, youtubeUrl, channelName, description, thumbnailUrl } = req.body;
    const pool = getPool();

    const [result] = await pool.query(`
      INSERT INTO lesson_youtube_recommendations 
        (grade, subject, topic_id, lesson_index, lesson_title, title, youtube_url, channel_name, description, thumbnail_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `, [grade, subject, topicId, lessonIndex || 0, lessonTitle, title, youtubeUrl, channelName, description, thumbnailUrl]);

    return res.status(201).json({ success: true, message: 'YouTube recommendation added successfully', id: result.insertId });
  } catch (err) { next(err); }
}

export async function deleteYouTubeRec(req, res, next) {
  try {
    const { id } = req.params;
    const pool = getPool();
    await pool.query('DELETE FROM lesson_youtube_recommendations WHERE rec_id = ?', [id]);
    return res.status(200).json({ success: true, message: 'YouTube recommendation deleted successfully' });
  } catch (err) { next(err); }
}

export async function createQuiz(req, res, next) {
  try {
    const { grade, subject = 'Mathematics', topicId, lessonIndex, lessonTitle, title, instructions, durationMinutes = 15, totalMarks = 100, questions } = req.body;
    const pool = getPool();

    const [result] = await pool.query(`
      INSERT INTO lesson_quizzes 
        (grade, subject, topic_id, lesson_index, lesson_title, title, instructions, duration_minutes, total_marks, questions)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `, [grade, subject, topicId, lessonIndex || 0, lessonTitle, title, instructions, durationMinutes, totalMarks, JSON.stringify(questions)]);

    return res.status(201).json({ success: true, message: 'Quiz created successfully', id: result.insertId });
  } catch (err) { next(err); }
}

export async function deleteQuiz(req, res, next) {
  try {
    const { id } = req.params;
    const pool = getPool();
    await pool.query('DELETE FROM lesson_quizzes WHERE quiz_id = ?', [id]);
    return res.status(200).json({ success: true, message: 'Quiz deleted successfully' });
  } catch (err) { next(err); }
}

