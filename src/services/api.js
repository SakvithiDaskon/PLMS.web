// PLMS (Private Learning Management System) Mock API Service
// Designed for seamless integration with real Express/Node.js Axios endpoints later

const STORAGE_KEYS = {
  USERS: 'plms_mock_users',
  ZOOM: 'plms_mock_zoom',
  RECORDINGS: 'plms_mock_recordings',
  TUTORIALS: 'plms_mock_tutorials',
  QUIZZES: 'plms_mock_quizzes',
  GRADES: 'plms_mock_grades',
  PAYMENTS: 'plms_mock_payments',
  LINKS: 'plms_mock_parent_links'
};

// Initial Mock Seed Data
const initialUsers = [
  { id: 'std-1', name: 'Kasun Perera', email: 'student@plms.com', role: 'student', phone: '+94 77 123 4567', grade: 'Grade 13 (A/L Combined Maths)', indexNo: 'AL-2026-889', parentId: 'prn-1' },
  { id: 'std-2', name: 'Nipuni Silva', email: 'nipuni@plms.com', role: 'student', phone: '+94 71 987 6543', grade: 'Grade 13 (A/L Physics)', indexNo: 'AL-2026-902', parentId: null },
  { id: 'std-3', name: 'Dilshan Fernando', email: 'dilshan@plms.com', role: 'student', phone: '+94 76 555 4321', grade: 'Grade 12 (A/L Combined Maths)', indexNo: 'AL-2027-104', parentId: null },
  { id: 'prn-1', name: 'Sunil Perera', email: 'parent@plms.com', role: 'parent', phone: '+94 70 333 2211', occupation: 'Civil Engineer', linkedStudentIds: ['std-1'] },
  { id: 'adm-1', name: 'Sir Daskon (Admin)', email: 'admin@plms.com', role: 'admin', phone: '+94 77 000 1122', designation: 'Head Educator & Admin' }
];

const initialZoomLinks = [
  { id: 'zoom-1', title: 'Combined Maths: Integration & Calculus Masterclass', subject: 'Combined Mathematics', teacher: 'Sir Daskon', date: '2026-10-08', time: '18:00 - 20:30', link: 'https://zoom.us/j/9876543210', passcode: 'INTEGRAL26', isLive: true },
  { id: 'zoom-2', title: 'Physics: Rotational Dynamics Problem Solving', subject: 'Physics', teacher: 'Sir Daskon', date: '2026-10-10', time: '17:00 - 19:30', link: 'https://zoom.us/j/1234567890', passcode: 'ROTATION26', isLive: false }
];

const initialRecordings = [
  { id: 'rec-1', title: 'Calculus Part IV: Definite Integrals & Areas', subject: 'Combined Mathematics', date: '2026-10-02', duration: '2h 15m', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80', description: 'Comprehensive coverage of definite integration properties and calculating enclosed areas with math formulas.', mathNotes: 'Includes proof of \\int_{a}^{b} f(x)dx = \\int_{a}^{b} f(a+b-x)dx' },
  { id: 'rec-2', title: 'Vectors & Coordinate Geometry Deep Dive', subject: 'Combined Mathematics', date: '2026-09-28', duration: '2h 00m', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80', description: '3D Vectors scalar and vector products resolution.', mathNotes: '\\vec{A} \\times \\vec{B} = |A||B| \\sin\\theta \\hat{n}' },
  { id: 'rec-3', title: 'Electric Fields & Potential Lines', subject: 'Physics', date: '2026-09-24', duration: '1h 50m', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80', description: 'Gauss Law applications and electric point charge interactions.', mathNotes: 'E = \\frac{1}{4\\pi \\varepsilon_0} \\frac{Q}{r^2}' }
];

const initialTutorials = [
  {
    id: 'tut-1',
    title: 'Advanced Integration Techniques & Reduction Formulas',
    subject: 'Combined Mathematics',
    unit: 'Unit 5 - Pure Mathematics',
    readTime: '25 min read',
    contentMarkdown: `### Topic Overview
In this module, we examine advanced integration techniques including integration by parts and reduction formulas.

#### Core Formula: Integration by Parts
$$\\int u \\frac{dv}{dx} dx = uv - \\int v \\frac{du}{dx} dx$$

#### Special Standard Result
$$\\int e^{ax} \\sin(bx) dx = \\frac{e^{ax}}{a^2 + b^2} \\left( a \\sin(bx) - b \\cos(bx) \\right) + C$$

#### Key Examples & Steps
1. Choose $u$ according to **ILATE** priority (Inverse trig, Logarithmic, Algebraic, Trigonometric, Exponential).
2. Differentiate $u$ to find $du$, integrate $dv$ to find $v$.`,
    mathSnippets: [
      '\\int_{0}^{\\pi/2} \\sin^n(x) dx = \\frac{n-1}{n} \\int_{0}^{\\pi/2} \\sin^{n-2}(x) dx',
      'f(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}'
    ],
    pdfUrl: '#download-tutorial-pdf'
  },
  {
    id: 'tut-2',
    title: 'Kinematics & Projectile Motion Dynamics',
    subject: 'Physics',
    unit: 'Unit 2 - Applied Mechanics',
    readTime: '20 min read',
    contentMarkdown: `### Projectile Trajectory Equations
A projectile launched with initial velocity $u$ at an angle $\\theta$ to the horizontal.

#### Horizontal & Vertical Positions
$$x(t) = u \\cos(\\theta) t$$
$$y(t) = u \\sin(\\theta) t - \\frac{1}{2} g t^2$$

#### Trajectory Equation
$$y = x \\tan(\\theta) - \\frac{g x^2}{2 u^2 \\cos^2(\\theta)}$$`,
    mathSnippets: [
      'R = \\frac{u^2 \\sin(2\\theta)}{g}',
      'H_{max} = \\frac{u^2 \\sin^2(\\theta)}{2g}'
    ],
    pdfUrl: '#download-tutorial-pdf'
  }
];

const initialQuizzes = [
  {
    id: 'quiz-1',
    title: 'Unit Test: Integration & Differential Calculus',
    subject: 'Combined Mathematics',
    durationMinutes: 30,
    totalQuestions: 3,
    totalMarks: 30,
    questions: [
      {
        id: 'q1',
        questionText: 'Evaluate the integral \\int_{0}^{1} x^2 dx:',
        options: ['1/2', '1/3', '1/4', '1'],
        correctAnswer: 1,
        marks: 10
      },
      {
        id: 'q2',
        questionText: 'What is the derivative of f(x) = \\sin(x) \\cos(x)?',
        options: ['\\cos(2x)', '\\sin(2x)', '-\\sin(2x)', '\\cos^2(x)'],
        correctAnswer: 0,
        marks: 10
      },
      {
        id: 'q3',
        questionText: 'What is the solution to \\frac{dy}{dx} = y with y(0) = 1?',
        options: ['y = x + 1', 'y = e^x', 'y = \\ln(x)', 'y = x^2'],
        correctAnswer: 1,
        marks: 10
      }
    ]
  }
];

const initialGrades = [
  { id: 'grd-1', studentId: 'std-1', studentName: 'Kasun Perera', subject: 'Combined Mathematics', examName: 'Monthly Assessment - September', score: 88, maxScore: 100, grade: 'A', remarks: 'Excellent grasp of integration & coordinate geometry.', date: '2026-09-30' },
  { id: 'grd-2', studentId: 'std-1', studentName: 'Kasun Perera', subject: 'Physics', examName: 'Mid-Term Mechanics Test', score: 82, maxScore: 100, grade: 'A', remarks: 'Good speed in numerical problem solving.', date: '2026-09-15' },
  { id: 'grd-3', studentId: 'std-2', studentName: 'Nipuni Silva', subject: 'Physics', examName: 'Monthly Assessment - September', score: 94, maxScore: 100, grade: 'A+', remarks: 'Top score in class!', date: '2026-09-30' }
];

const initialPayments = [
  { id: 'pay-1', studentId: 'std-1', studentName: 'Kasun Perera', month: 'October 2026', amount: 4500, status: 'Approved', slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80', submittedAt: '2026-10-01 10:30 AM', notes: 'Bank transfer via Commercial Bank.' },
  { id: 'pay-2', studentId: 'std-2', studentName: 'Nipuni Silva', month: 'October 2026', amount: 4500, status: 'Pending', slipUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80', submittedAt: '2026-10-05 02:15 PM', notes: 'Online deposit slip attached.' }
];

// Helper functions for LocalStorage
const getStorageItem = (key, defaultVal) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    console.error('Storage read error:', e);
    return defaultVal;
  }
};

const setStorageItem = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Storage write error:', e);
  }
};

// Seed initial data if empty
const initMockDB = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) setStorageItem(STORAGE_KEYS.USERS, initialUsers);
  if (!localStorage.getItem(STORAGE_KEYS.ZOOM)) setStorageItem(STORAGE_KEYS.ZOOM, initialZoomLinks);
  if (!localStorage.getItem(STORAGE_KEYS.RECORDINGS)) setStorageItem(STORAGE_KEYS.RECORDINGS, initialRecordings);
  if (!localStorage.getItem(STORAGE_KEYS.TUTORIALS)) setStorageItem(STORAGE_KEYS.TUTORIALS, initialTutorials);
  if (!localStorage.getItem(STORAGE_KEYS.QUIZZES)) setStorageItem(STORAGE_KEYS.QUIZZES, initialQuizzes);
  if (!localStorage.getItem(STORAGE_KEYS.GRADES)) setStorageItem(STORAGE_KEYS.GRADES, initialGrades);
  if (!localStorage.getItem(STORAGE_KEYS.PAYMENTS)) setStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
};

initMockDB();

// Delay helper to simulate network latency
const delay = (ms = 300) => new Promise(res => setTimeout(res, ms));

export const apiService = {
  // --- AUTH SERVICES ---
  async login({ email, password, role }) {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
      // If role specified and doesn't match, auto adjust or permit for demo
      return { success: true, user, token: 'mock-jwt-token-' + user.id };
    }

    // Default mock user fallback based on requested role
    const mockUser = {
      id: role === 'admin' ? 'adm-1' : role === 'parent' ? 'prn-1' : 'std-1',
      name: role === 'admin' ? 'Sir Daskon (Admin)' : role === 'parent' ? 'Sunil Perera' : 'Kasun Perera',
      email: email,
      role: role || 'student',
      phone: '+94 77 123 4567'
    };
    return { success: true, user: mockUser, token: 'mock-jwt-token-demo' };
  },

  async registerStudent(formData) {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const newUser = {
      id: 'std-' + Date.now(),
      name: formData.name,
      email: formData.email,
      role: 'student',
      phone: formData.phone || '',
      grade: formData.grade || 'Grade 13 (A/L)',
      indexNo: 'AL-' + Math.floor(1000 + Math.random() * 9000),
      parentId: null
    };
    users.push(newUser);
    setStorageItem(STORAGE_KEYS.USERS, users);
    return { success: true, user: newUser };
  },

  async resetPassword(email) {
    await delay();
    return { success: true, message: `Password reset instructions sent to ${email}` };
  },

  // --- STUDENT SERVICES ---
  async getStudentDashboardData(studentId = 'std-1') {
    await delay();
    const zoomLinks = getStorageItem(STORAGE_KEYS.ZOOM, initialZoomLinks);
    const recordings = getStorageItem(STORAGE_KEYS.RECORDINGS, initialRecordings);
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
    const grades = getStorageItem(STORAGE_KEYS.GRADES, initialGrades);

    const studentPayments = payments.filter(p => p.studentId === studentId);
    const studentGrades = grades.filter(g => g.studentId === studentId);

    return {
      upcomingLiveSession: zoomLinks[0] || null,
      recentRecordingsCount: recordings.length,
      latestGrade: studentGrades[0] || null,
      paymentStatus: studentPayments[0]?.status || 'Approved',
      totalTutorials: 12,
      pendingQuizzes: 1
    };
  },

  async getZoomLinks() {
    await delay();
    return getStorageItem(STORAGE_KEYS.ZOOM, initialZoomLinks);
  },

  async getClassRecordings() {
    await delay();
    return getStorageItem(STORAGE_KEYS.RECORDINGS, initialRecordings);
  },

  async getTutorials() {
    await delay();
    return getStorageItem(STORAGE_KEYS.TUTORIALS, initialTutorials);
  },

  async getQuizzes() {
    await delay();
    return getStorageItem(STORAGE_KEYS.QUIZZES, initialQuizzes);
  },

  async submitQuizAnswers(quizId, answers) {
    await delay();
    return { success: true, score: 20, maxScore: 30, percentage: 66.7, feedback: 'Good effort! Practice more integration by parts formulas.' };
  },

  async getStudentGrades(studentId = 'std-1') {
    await delay();
    const grades = getStorageItem(STORAGE_KEYS.GRADES, initialGrades);
    return grades.filter(g => g.studentId === studentId || studentId === 'std-1');
  },

  async getStudentPayments(studentId = 'std-1') {
    await delay();
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
    return payments.filter(p => p.studentId === studentId || studentId === 'std-1');
  },

  async uploadPaymentSlip({ studentId = 'std-1', studentName = 'Kasun Perera', month, amount, slipUrl, notes }) {
    await delay();
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
    const newPayment = {
      id: 'pay-' + Date.now(),
      studentId,
      studentName,
      month: month || 'October 2026',
      amount: Number(amount) || 4500,
      status: 'Pending',
      slipUrl: slipUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      submittedAt: new Date().toLocaleString(),
      notes: notes || 'Payment slip uploaded'
    };
    payments.unshift(newPayment);
    setStorageItem(STORAGE_KEYS.PAYMENTS, payments);
    return { success: true, payment: newPayment };
  },

  // --- PARENT SERVICES ---
  async getParentDashboardData(parentId = 'prn-1') {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const parent = users.find(u => u.id === parentId) || users.find(u => u.role === 'parent');
    
    // Find linked child
    const childId = parent?.linkedStudentIds?.[0] || 'std-1';
    const child = users.find(u => u.id === childId) || users[0];

    const grades = getStorageItem(STORAGE_KEYS.GRADES, initialGrades).filter(g => g.studentId === child.id);
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments).filter(p => p.studentId === child.id);

    return {
      child,
      attendanceRate: '96%',
      recentGrades: grades,
      latestPayment: payments[0] || { month: 'October 2026', status: 'Approved', amount: 4500 },
      overallGrade: 'A',
      activeClasses: 2
    };
  },

  async getChildDetails(childId = 'std-1') {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    return users.find(u => u.id === childId) || users[0];
  },

  async getChildProgress(childId = 'std-1') {
    await delay();
    return {
      attendance: 96,
      completedTutorials: 14,
      totalTutorials: 16,
      quizzesTaken: 5,
      averageScore: 88,
      subjectBreakdown: [
        { subject: 'Combined Mathematics', score: 88, status: 'Strong' },
        { subject: 'Physics', score: 84, status: 'Good' }
      ]
    };
  },

  async getChildGrades(childId = 'std-1') {
    return this.getStudentGrades(childId);
  },

  async getChildPayments(childId = 'std-1') {
    return this.getStudentPayments(childId);
  },

  // --- ADMIN SERVICES ---
  async getAdminDashboardStats() {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
    const zoomLinks = getStorageItem(STORAGE_KEYS.ZOOM, initialZoomLinks);
    const recordings = getStorageItem(STORAGE_KEYS.RECORDINGS, initialRecordings);

    const students = users.filter(u => u.role === 'student');
    const parents = users.filter(u => u.role === 'parent');
    const pendingPayments = payments.filter(p => p.status === 'Pending');

    return {
      totalStudents: students.length,
      totalParents: parents.length,
      pendingPaymentsCount: pendingPayments.length,
      totalClasses: zoomLinks.length,
      totalRecordings: recordings.length,
      monthlyRevenue: 135000
    };
  },

  async getAllStudents() {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    return users.filter(u => u.role === 'student');
  },

  async addStudent(studentData) {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const newStudent = {
      id: 'std-' + Date.now(),
      role: 'student',
      name: studentData.name,
      email: studentData.email,
      phone: studentData.phone,
      grade: studentData.grade || 'Grade 13',
      indexNo: 'AL-' + Math.floor(1000 + Math.random() * 9000),
      parentId: null
    };
    users.push(newStudent);
    setStorageItem(STORAGE_KEYS.USERS, users);
    return { success: true, student: newStudent };
  },

  async getAllParents() {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    return users.filter(u => u.role === 'parent');
  },

  async addParent(parentData) {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const newParent = {
      id: 'prn-' + Date.now(),
      role: 'parent',
      name: parentData.name,
      email: parentData.email,
      phone: parentData.phone,
      occupation: parentData.occupation || 'N/A',
      linkedStudentIds: []
    };
    users.push(newParent);
    setStorageItem(STORAGE_KEYS.USERS, users);
    return { success: true, parent: newParent };
  },

  async linkParentToStudent(parentId, studentId) {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const parentIndex = users.findIndex(u => u.id === parentId);
    const studentIndex = users.findIndex(u => u.id === studentId);

    if (parentIndex !== -1 && studentIndex !== -1) {
      if (!users[parentIndex].linkedStudentIds) users[parentIndex].linkedStudentIds = [];
      if (!users[parentIndex].linkedStudentIds.includes(studentId)) {
        users[parentIndex].linkedStudentIds.push(studentId);
      }
      users[studentIndex].parentId = parentId;
      setStorageItem(STORAGE_KEYS.USERS, users);
    }
    return { success: true };
  },

  async createZoomLink(data) {
    await delay();
    const links = getStorageItem(STORAGE_KEYS.ZOOM, initialZoomLinks);
    const newLink = {
      id: 'zoom-' + Date.now(),
      title: data.title,
      subject: data.subject,
      teacher: data.teacher || 'Sir Daskon',
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
    links = links.filter(l => l.id !== id);
    setStorageItem(STORAGE_KEYS.ZOOM, links);
    return { success: true };
  },

  async uploadRecording(data) {
    await delay();
    const recordings = getStorageItem(STORAGE_KEYS.RECORDINGS, initialRecordings);
    const newRec = {
      id: 'rec-' + Date.now(),
      title: data.title,
      subject: data.subject,
      date: data.date || new Date().toISOString().split('T')[0],
      duration: data.duration || '2h 00m',
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
    recordings = recordings.filter(r => r.id !== id);
    setStorageItem(STORAGE_KEYS.RECORDINGS, recordings);
    return { success: true };
  },

  async createTutorial(data) {
    await delay();
    const tutorials = getStorageItem(STORAGE_KEYS.TUTORIALS, initialTutorials);
    const newTut = {
      id: 'tut-' + Date.now(),
      title: data.title,
      subject: data.subject,
      unit: data.unit || 'General Module',
      readTime: data.readTime || '15 min read',
      contentMarkdown: data.contentMarkdown,
      mathSnippets: data.mathSnippets || [],
      pdfUrl: '#download-pdf'
    };
    tutorials.unshift(newTut);
    setStorageItem(STORAGE_KEYS.TUTORIALS, tutorials);
    return { success: true, tutorial: newTut };
  },

  async createQuiz(data) {
    await delay();
    const quizzes = getStorageItem(STORAGE_KEYS.QUIZZES, initialQuizzes);
    const newQuiz = {
      id: 'quiz-' + Date.now(),
      title: data.title,
      subject: data.subject,
      durationMinutes: Number(data.durationMinutes) || 30,
      totalQuestions: data.questions ? data.questions.length : 0,
      totalMarks: data.questions ? data.questions.reduce((sum, q) => sum + (Number(q.marks) || 10), 0) : 0,
      questions: data.questions || []
    };
    quizzes.unshift(newQuiz);
    setStorageItem(STORAGE_KEYS.QUIZZES, quizzes);
    return { success: true, quiz: newQuiz };
  },

  async deleteQuiz(id) {
    await delay();
    let quizzes = getStorageItem(STORAGE_KEYS.QUIZZES, initialQuizzes);
    quizzes = quizzes.filter(q => q.id !== id);
    setStorageItem(STORAGE_KEYS.QUIZZES, quizzes);
    return { success: true };
  },

  async assignGrade(gradeData) {
    await delay();
    const grades = getStorageItem(STORAGE_KEYS.GRADES, initialGrades);
    const newGrade = {
      id: 'grd-' + Date.now(),
      studentId: gradeData.studentId,
      studentName: gradeData.studentName || 'Student',
      subject: gradeData.subject,
      examName: gradeData.examName,
      score: Number(gradeData.score),
      maxScore: Number(gradeData.maxScore) || 100,
      grade: gradeData.grade || 'A',
      remarks: gradeData.remarks || 'Keep it up!',
      date: new Date().toISOString().split('T')[0]
    };
    grades.unshift(newGrade);
    setStorageItem(STORAGE_KEYS.GRADES, grades);
    return { success: true, grade: newGrade };
  },

  async getAllPayments() {
    await delay();
    return getStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
  },

  async approvePayment(paymentId) {
    await delay();
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
    const idx = payments.findIndex(p => p.id === paymentId);
    if (idx !== -1) {
      payments[idx].status = 'Approved';
      setStorageItem(STORAGE_KEYS.PAYMENTS, payments);
    }
    return { success: true };
  },

  async rejectPayment(paymentId, reason = 'Illegible payment slip') {
    await delay();
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
    const idx = payments.findIndex(p => p.id === paymentId);
    if (idx !== -1) {
      payments[idx].status = 'Rejected';
      payments[idx].rejectionReason = reason;
      setStorageItem(STORAGE_KEYS.PAYMENTS, payments);
    }
    return { success: true };
  }
};
