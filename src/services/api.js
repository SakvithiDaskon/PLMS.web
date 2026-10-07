// PLMS (Private Learning Management System) API & Data Storage Service
// Configured for Grade 6 to 11 Mathematics & Science conducted by Sir Parakum Bandara

const STORAGE_KEYS = {
  USERS: 'plms_mock_users',
  ZOOM: 'plms_mock_zoom',
  RECORDINGS: 'plms_mock_recordings',
  TUTORIALS: 'plms_mock_tutorials',
  QUIZZES: 'plms_mock_quizzes',
  GRADES: 'plms_mock_grades',
  PAYMENTS: 'plms_mock_payments'
};

// Initial System Accounts: ONLY the System Administrator (Sir Parakum Bandara)
// Sample test students and test parents have been completely removed.
// All student accounts are created directly via Registration or Admin Enrolment.
const initialUsers = [
  {
    id: 'adm-1',
    name: 'Sir Parakum Bandara (Admin)',
    email: 'admin@plms.com',
    password: 'password123',
    role: 'admin',
    phone: '+94 77 000 1122',
    designation: 'Head Educator & Admin'
  }
];

const initialZoomLinks = [
  { id: 'zoom-1', title: 'Grade 11 O/L Mathematics: Algebra & Quadratic Equations', subject: 'Mathematics (Grade 11)', teacher: 'Sir Parakum Bandara', date: '2026-10-08', time: '18:00 - 20:00', link: 'https://zoom.us/j/9876543210', passcode: 'PARAKUM26', isLive: true },
  { id: 'zoom-2', title: 'Grade 10 Science: Chemical Reactions & Equations', subject: 'Science (Grade 10)', teacher: 'Sir Parakum Bandara', date: '2026-10-10', time: '17:00 - 19:00', link: 'https://zoom.us/j/1234567890', passcode: 'SCIENCE26', isLive: false }
];

const initialRecordings = [
  { id: 'rec-1', title: 'Grade 11 Geometry: Circle Theorems & Proofs', subject: 'Mathematics (Grade 11)', date: '2026-10-02', duration: '1h 45m', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80', description: 'Detailed walkthrough of O/L Circle Theorem proofs with KaTeX math formula notes.', mathNotes: '\\angle AOB = 2 \\times \\angle ACB' },
  { id: 'rec-2', title: 'Grade 10 Science: Light Reflection & Refraction Formulas', subject: 'Science (Grade 10)', date: '2026-09-28', duration: '1h 30m', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80', description: 'Snells Law and lens equation numerical problem solving.', mathNotes: '\\frac{1}{f} = \\frac{1}{u} + \\frac{1}{v}' },
  { id: 'rec-3', title: 'Grade 9 Mathematics: Linear Equations & Graphs', subject: 'Mathematics (Grade 9)', date: '2026-09-24', duration: '1h 30m', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80', description: 'Plotting linear equations y = mx + c and finding gradient.', mathNotes: 'm = \\frac{y_2 - y_1}{x_2 - x_1}' }
];

const initialTutorials = [
  {
    id: 'tut-1',
    title: 'Grade 11 O/L Quadratic Equations & Formula Derivation',
    subject: 'Mathematics (Grade 11)',
    unit: 'Unit 4 - Quadratic Equations',
    readTime: '15 min read',
    contentMarkdown: `### Lesson Summary
Solving quadratic equations using the quadratic formula conducted by Sir Parakum Bandara.

#### Quadratic Formula
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$`,
    mathSnippets: [
      'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      'b^2 - 4ac > 0'
    ],
    pdfUrl: '#download-tutorial-pdf'
  }
];

const initialQuizzes = [
  {
    id: 'quiz-1',
    title: 'Grade 11 Test: Algebra & Quadratic Formulas',
    subject: 'Mathematics (Grade 11)',
    durationMinutes: 30,
    totalQuestions: 2,
    totalMarks: 20,
    questions: [
      {
        id: 'q1',
        questionText: 'Solve for x in x^2 - 5x + 6 = 0:',
        options: ['x = 2 or x = 3', 'x = 1 or x = 5', 'x = -2 or x = -3', 'x = 0'],
        correctAnswer: 0,
        marks: 10
      },
      {
        id: 'q2',
        questionText: 'What is the discriminant of a quadratic equation ax^2 + bx + c = 0?',
        options: ['b^2 - 4ac', 'b^2 + 4ac', '2a', 'b/2a'],
        correctAnswer: 0,
        marks: 10
      }
    ]
  }
];

const initialGrades = [];
const initialPayments = [];

const getStorageItem = (key, defaultVal) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
};

const setStorageItem = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {}
};

/**
 * Computes the next sequential student ID starting from '0001' to higher order (0001, 0002, 0003, ... 9999, 10000+).
 * Extracts numeric value from existing registered student IDs to guarantee strictly monotonic increments.
 */
export const getNextStudentId = (users) => {
  const students = users.filter((u) => u.role === 'student');
  if (students.length === 0) {
    return '0001';
  }

  let maxNum = 0;
  for (const s of students) {
    const rawId = s.studentId || s.indexNo || '';
    const match = rawId.match(/\d+/);
    if (match) {
      const num = parseInt(match[0], 10);
      if (!isNaN(num) && num > maxNum) {
        maxNum = num;
      }
    }
  }

  const nextNum = maxNum + 1;
  return String(nextNum).padStart(4, '0');
};

const initMockDB = () => {
  // Purge any legacy sample data (e.g., student@plms.com / Kasun Perera / Nipuni / Dilshan / parent@plms.com)
  const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
  if (storedUsers) {
    try {
      const parsed = JSON.parse(storedUsers);
      const hasLegacySample = parsed.some(
        (u) =>
          u.email === 'student@plms.com' ||
          u.name === 'Kasun Perera' ||
          u.email === 'nipuni@plms.com' ||
          u.email === 'dilshan@plms.com' ||
          u.email === 'parent@plms.com'
      );
      if (hasLegacySample) {
        const cleaned = parsed.filter(
          (u) =>
            u.email !== 'student@plms.com' &&
            u.email !== 'nipuni@plms.com' &&
            u.email !== 'dilshan@plms.com' &&
            u.email !== 'parent@plms.com'
        );
        if (!cleaned.some((u) => u.role === 'admin')) {
          cleaned.push(initialUsers[0]);
        }
        setStorageItem(STORAGE_KEYS.USERS, cleaned);
      }
    } catch (e) {
      setStorageItem(STORAGE_KEYS.USERS, initialUsers);
    }
  } else {
    setStorageItem(STORAGE_KEYS.USERS, initialUsers);
  }

  // Purge sample grades and payments tied to Kasun Perera (std-1)
  const storedGrades = localStorage.getItem(STORAGE_KEYS.GRADES);
  if (storedGrades) {
    try {
      const parsed = JSON.parse(storedGrades);
      if (parsed.some((g) => g.studentId === 'std-1' || g.studentName === 'Kasun Perera')) {
        const cleanedGrades = parsed.filter(
          (g) => g.studentId !== 'std-1' && g.studentName !== 'Kasun Perera'
        );
        setStorageItem(STORAGE_KEYS.GRADES, cleanedGrades);
      }
    } catch (e) {
      setStorageItem(STORAGE_KEYS.GRADES, initialGrades);
    }
  } else {
    setStorageItem(STORAGE_KEYS.GRADES, initialGrades);
  }

  const storedPayments = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
  if (storedPayments) {
    try {
      const parsed = JSON.parse(storedPayments);
      if (parsed.some((p) => p.studentId === 'std-1' || p.studentName === 'Kasun Perera')) {
        const cleanedPayments = parsed.filter(
          (p) => p.studentId !== 'std-1' && p.studentName !== 'Kasun Perera'
        );
        setStorageItem(STORAGE_KEYS.PAYMENTS, cleanedPayments);
      }
    } catch (e) {
      setStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
    }
  } else {
    setStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
  }

  if (!localStorage.getItem(STORAGE_KEYS.ZOOM)) setStorageItem(STORAGE_KEYS.ZOOM, initialZoomLinks);
  if (!localStorage.getItem(STORAGE_KEYS.RECORDINGS)) setStorageItem(STORAGE_KEYS.RECORDINGS, initialRecordings);
  if (!localStorage.getItem(STORAGE_KEYS.TUTORIALS)) setStorageItem(STORAGE_KEYS.TUTORIALS, initialTutorials);
  if (!localStorage.getItem(STORAGE_KEYS.QUIZZES)) setStorageItem(STORAGE_KEYS.QUIZZES, initialQuizzes);
};

initMockDB();

const delay = (ms = 150) => new Promise((res) => setTimeout(res, ms));

export const apiService = {
  // Authentication & Login (Students authenticate with Student ID, e.g. '0001')
  async login({ identifier, email, studentId, password, role }) {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const rawInput = (identifier || studentId || email || '').trim();
    const inputLower = rawInput.toLowerCase();

    const user = users.find((u) => {
      if (u.role === 'student') {
        const sId = (u.studentId || u.indexNo || '').toLowerCase();
        // Support direct matching, e.g. "0001" or "STU-0001"
        const cleanRaw = inputLower.replace(/^stu-/i, '');
        const cleanSId = sId.replace(/^stu-/i, '');
        if (sId === inputLower || cleanSId === cleanRaw) return true;
        // Fallback to email matching if student enters email
        if (u.email && u.email.toLowerCase() === inputLower) return true;
        return false;
      }
      return u.email && u.email.toLowerCase() === inputLower;
    });

    if (user) {
      if (user.password && user.password !== password) {
        return { success: false, message: 'Invalid password. Please check your credentials.' };
      }
      if (role && user.role !== role) {
        return { success: false, message: `This account is registered as a ${user.role}, not ${role}.` };
      }
      return { success: true, user, token: 'mock-jwt-token-' + user.id };
    }

    if (role === 'student') {
      return {
        success: false,
        message: `No student account found with Student ID "${rawInput}". Please check your Student ID (e.g. 0001) or register first.`
      };
    }
    return { success: false, message: 'No account found with this credential. Please register first.' };
  },

  // Student Registration: Assigns sequential Student ID (0001, 0002, 0003...)
  async registerStudent(formData) {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const trimmedEmail = formData.email ? formData.email.trim().toLowerCase() : '';

    const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      return { success: false, message: 'An account with this email address already exists. Please log in.' };
    }

    const newStudentId = getNextStudentId(users);
    const newUser = {
      id: 'std-' + newStudentId,
      name: formData.name ? formData.name.trim() : 'Student',
      email: trimmedEmail,
      password: formData.password,
      role: 'student',
      phone: formData.phone ? formData.phone.trim() : '',
      grade: formData.grade || 'Grade 11 (O/L Mathematics)',
      studentId: newStudentId,
      indexNo: newStudentId,
      parentId: null,
      enrolledAt: new Date().toISOString()
    };

    users.push(newUser);
    setStorageItem(STORAGE_KEYS.USERS, users);
    return { success: true, user: newUser, token: 'mock-jwt-token-' + newUser.id };
  },

  async resetPassword(email) {
    await delay();
    return { success: true, message: `Password reset instructions sent to ${email}` };
  },

  // Student Dashboard Data
  async getStudentDashboardData(studentId) {
    await delay();
    const zoomLinks = getStorageItem(STORAGE_KEYS.ZOOM, initialZoomLinks);
    const recordings = getStorageItem(STORAGE_KEYS.RECORDINGS, initialRecordings);
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, []);
    const grades = getStorageItem(STORAGE_KEYS.GRADES, []);

    const userPayments = studentId
      ? payments.filter((p) => p.studentId === studentId || p.studentId === 'std-' + studentId)
      : payments;
    const userGrades = studentId
      ? grades.filter((g) => g.studentId === studentId || g.studentId === 'std-' + studentId)
      : grades;

    return {
      upcomingLiveSession: zoomLinks[0] || null,
      recentRecordingsCount: recordings.length,
      latestGrade: userGrades[0] || null,
      paymentStatus: userPayments[0]?.status || 'No Payments Yet',
      totalTutorials: 8,
      pendingQuizzes: 1
    };
  },

  // Zoom Links
  async getZoomLinks() {
    await delay();
    return getStorageItem(STORAGE_KEYS.ZOOM, initialZoomLinks);
  },

  async createZoomLink(data) {
    await delay();
    const links = getStorageItem(STORAGE_KEYS.ZOOM, initialZoomLinks);
    const newLink = {
      id: 'zoom-' + Date.now(),
      title: data.title,
      subject: data.subject,
      teacher: data.teacher || 'Sir Parakum Bandara',
      date: data.date,
      time: data.time,
      link: data.link,
      passcode: data.passcode || 'PASS123',
      isLive: data.isLive || false
    };
    links.unshift(newLink);
    setStorageItem(STORAGE_KEYS.ZOOM, links);
    return { success: true, zoom: newLink };
  },

  async deleteZoomLink(id) {
    await delay();
    let links = getStorageItem(STORAGE_KEYS.ZOOM, initialZoomLinks);
    links = links.filter((l) => l.id !== id);
    setStorageItem(STORAGE_KEYS.ZOOM, links);
    return { success: true };
  },

  // Recordings
  async getClassRecordings() {
    await delay();
    return getStorageItem(STORAGE_KEYS.RECORDINGS, initialRecordings);
  },

  async uploadRecording(data) {
    await delay();
    const recordings = getStorageItem(STORAGE_KEYS.RECORDINGS, initialRecordings);
    const newRec = {
      id: 'rec-' + Date.now(),
      title: data.title,
      subject: data.subject,
      date: data.date || new Date().toISOString().split('T')[0],
      duration: data.duration || '1h 30m',
      videoUrl: data.videoUrl,
      thumbnail: data.thumbnail || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
      description: data.description,
      mathNotes: data.mathNotes || ''
    };
    recordings.unshift(newRec);
    setStorageItem(STORAGE_KEYS.RECORDINGS, recordings);
    return { success: true, recording: newRec };
  },

  async deleteRecording(id) {
    await delay();
    let recordings = getStorageItem(STORAGE_KEYS.RECORDINGS, initialRecordings);
    recordings = recordings.filter((r) => r.id !== id);
    setStorageItem(STORAGE_KEYS.RECORDINGS, recordings);
    return { success: true };
  },

  // Tutorials
  async getTutorials() {
    await delay();
    return getStorageItem(STORAGE_KEYS.TUTORIALS, initialTutorials);
  },

  async createTutorial(data) {
    await delay();
    const tutorials = getStorageItem(STORAGE_KEYS.TUTORIALS, initialTutorials);
    const newTut = {
      id: 'tut-' + Date.now(),
      ...data,
      pdfUrl: '#download-tutorial-pdf'
    };
    tutorials.unshift(newTut);
    setStorageItem(STORAGE_KEYS.TUTORIALS, tutorials);
    return { success: true, tutorial: newTut };
  },

  // Quizzes
  async getQuizzes() {
    await delay();
    return getStorageItem(STORAGE_KEYS.QUIZZES, initialQuizzes);
  },

  async createQuiz(data) {
    await delay();
    const quizzes = getStorageItem(STORAGE_KEYS.QUIZZES, initialQuizzes);
    quizzes.unshift(data);
    setStorageItem(STORAGE_KEYS.QUIZZES, quizzes);
    return { success: true, quiz: data };
  },

  async deleteQuiz(id) {
    await delay();
    let quizzes = getStorageItem(STORAGE_KEYS.QUIZZES, initialQuizzes);
    quizzes = quizzes.filter((q) => q.id !== id);
    setStorageItem(STORAGE_KEYS.QUIZZES, quizzes);
    return { success: true };
  },

  async submitQuizAnswers(quizId, answers) {
    await delay();
    return {
      success: true,
      score: 20,
      maxScore: 20,
      percentage: 100,
      feedback: 'Excellent work! Keep practicing O/L Mathematics questions.'
    };
  },

  // Student Grades
  async getStudentGrades(studentId) {
    await delay();
    const grades = getStorageItem(STORAGE_KEYS.GRADES, []);
    if (!studentId) return grades;
    return grades.filter((g) => g.studentId === studentId || g.studentId === 'std-' + studentId);
  },

  async assignGrade(gradeData) {
    await delay();
    const grades = getStorageItem(STORAGE_KEYS.GRADES, []);
    const newGrade = {
      id: 'grd-' + Date.now(),
      studentId: gradeData.studentId,
      studentName: gradeData.studentName || 'Student',
      subject: gradeData.subject,
      examName: gradeData.examName,
      score: Number(gradeData.score),
      maxScore: Number(gradeData.maxScore) || 100,
      grade: gradeData.grade || 'A',
      remarks: gradeData.remarks || 'Good progress. Sir Parakum Bandara',
      date: new Date().toISOString().split('T')[0]
    };
    grades.unshift(newGrade);
    setStorageItem(STORAGE_KEYS.GRADES, grades);
    return { success: true, grade: newGrade };
  },

  // Payments
  async getStudentPayments(studentId) {
    await delay();
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, []);
    if (!studentId) return payments;
    return payments.filter((p) => p.studentId === studentId || p.studentId === 'std-' + studentId);
  },

  async getAllPayments() {
    await delay();
    return getStorageItem(STORAGE_KEYS.PAYMENTS, []);
  },

  async uploadPaymentSlip({ studentId, studentName, month, amount, slipUrl, notes }) {
    await delay();
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, []);
    const newPayment = {
      id: 'pay-' + Date.now(),
      studentId: studentId || 'std-0001',
      studentName: studentName || 'Student',
      month: month || 'October 2026',
      amount: Number(amount) || 3500,
      status: 'Pending',
      slipUrl: slipUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      submittedAt: new Date().toLocaleString(),
      notes: notes || 'Bank deposit / slip upload'
    };
    payments.unshift(newPayment);
    setStorageItem(STORAGE_KEYS.PAYMENTS, payments);
    return { success: true, payment: newPayment };
  },

  async approvePayment(id) {
    await delay();
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, []);
    const payment = payments.find((p) => p.id === id);
    if (payment) {
      payment.status = 'Approved';
      setStorageItem(STORAGE_KEYS.PAYMENTS, payments);
      return { success: true };
    }
    return { success: false, message: 'Payment record not found' };
  },

  async rejectPayment(id, reason) {
    await delay();
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, []);
    const payment = payments.find((p) => p.id === id);
    if (payment) {
      payment.status = 'Rejected';
      payment.rejectReason = reason;
      setStorageItem(STORAGE_KEYS.PAYMENTS, payments);
      return { success: true };
    }
    return { success: false, message: 'Payment record not found' };
  },

  // Admin Dashboard Stats
  async getAdminDashboardStats() {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, []);
    const zoomLinks = getStorageItem(STORAGE_KEYS.ZOOM, initialZoomLinks);
    const recordings = getStorageItem(STORAGE_KEYS.RECORDINGS, initialRecordings);

    return {
      totalStudents: users.filter((u) => u.role === 'student').length,
      totalParents: users.filter((u) => u.role === 'parent').length,
      pendingPaymentsCount: payments.filter((p) => p.status === 'Pending').length,
      totalClasses: zoomLinks.length,
      totalRecordings: recordings.length
    };
  },

  // Student Management
  async getAllStudents() {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    return users.filter((u) => u.role === 'student');
  },

  async addStudent(studentData) {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const trimmedEmail = studentData.email ? studentData.email.trim().toLowerCase() : '';

    const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      return { success: false, message: 'A student with this email address already exists.' };
    }

    const newStudentId = getNextStudentId(users);
    const newStudent = {
      id: 'std-' + newStudentId,
      role: 'student',
      name: studentData.name ? studentData.name.trim() : 'Student',
      email: trimmedEmail,
      password: studentData.password || 'password123',
      phone: studentData.phone ? studentData.phone.trim() : '',
      grade: studentData.grade || 'Grade 11 (O/L Mathematics)',
      studentId: newStudentId,
      indexNo: newStudentId,
      parentId: null,
      enrolledAt: new Date().toISOString()
    };
    users.push(newStudent);
    setStorageItem(STORAGE_KEYS.USERS, users);
    return { success: true, student: newStudent };
  },

  // Parent Management
  async getAllParents() {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    return users.filter((u) => u.role === 'parent');
  },

  async addParent(parentData) {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const trimmedEmail = parentData.email ? parentData.email.trim().toLowerCase() : '';

    const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      return { success: false, message: 'A parent account with this email already exists.' };
    }

    const newParent = {
      id: 'prn-' + Date.now(),
      role: 'parent',
      name: parentData.name ? parentData.name.trim() : 'Parent',
      email: trimmedEmail,
      password: 'password123',
      phone: parentData.phone ? parentData.phone.trim() : '',
      occupation: parentData.occupation || '',
      linkedStudentIds: []
    };
    users.push(newParent);
    setStorageItem(STORAGE_KEYS.USERS, users);
    return { success: true, parent: newParent };
  },

  async linkParentToStudent(parentId, studentId) {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const parent = users.find((u) => u.id === parentId);
    const student = users.find((u) => u.id === studentId || u.studentId === studentId);
    if (parent && student) {
      if (!parent.linkedStudentIds) parent.linkedStudentIds = [];
      if (!parent.linkedStudentIds.includes(student.id)) {
        parent.linkedStudentIds.push(student.id);
      }
      student.parentId = parent.id;
      setStorageItem(STORAGE_KEYS.USERS, users);
      return { success: true };
    }
    return { success: false, message: 'Parent or Student not found' };
  },

  // Parent View: Child Details & Progress
  async getChildDetails(studentId) {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const student = users.find((u) => u.id === studentId || u.studentId === studentId || u.role === 'student');
    return student || null;
  },

  async getChildPayments(studentId) {
    await delay();
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, []);
    if (!studentId) return payments;
    return payments.filter((p) => p.studentId === studentId || p.studentId === 'std-' + studentId);
  },

  async getChildProgress(studentId) {
    await delay();
    const grades = getStorageItem(STORAGE_KEYS.GRADES, []);
    const zoomLinks = getStorageItem(STORAGE_KEYS.ZOOM, initialZoomLinks);
    const userGrades = studentId
      ? grades.filter((g) => g.studentId === studentId || g.studentId === 'std-' + studentId)
      : grades;
    return {
      attendanceRate: '96%',
      classesAttended: zoomLinks.length,
      averageScore: userGrades.length
        ? Math.round(userGrades.reduce((a, b) => a + (b.score || 0), 0) / userGrades.length)
        : 85,
      completedTutorials: 6,
      completedQuizzes: 2
    };
  },

  async getChildGrades(studentId) {
    await delay();
    const grades = getStorageItem(STORAGE_KEYS.GRADES, []);
    if (!studentId) return grades;
    return grades.filter((g) => g.studentId === studentId || g.studentId === 'std-' + studentId);
  },

  async getParentDashboardData(parentId) {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const parents = users.filter((u) => u.role === 'parent');
    const currentParent = parents.find((p) => p.id === parentId) || parents[0];
    const students = users.filter((u) => u.role === 'student');
    const child =
      currentParent?.linkedStudentIds?.length > 0
        ? students.find((s) => s.id === currentParent.linkedStudentIds[0]) || students[0]
        : students[0] || null;

    const grades = getStorageItem(STORAGE_KEYS.GRADES, []);
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, []);

    return {
      child,
      attendanceRate: '96%',
      recentGrades: grades,
      latestPayment: payments[0] || { month: 'October 2026', status: 'Pending', amount: 3500 },
      overallGrade: 'A',
      activeClasses: 2
    };
  }
};

export default apiService;
