// PLMS (Private Learning Management System) Mock API Service
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

// Initial Seed Data - Grade 6 to 11
const initialUsers = [
  { id: 'std-1', name: 'Kasun Perera', email: 'student@plms.com', role: 'student', phone: '+94 77 123 4567', grade: 'Grade 11 (O/L Mathematics)', indexNo: 'OL-2026-889', parentId: 'prn-1' },
  { id: 'std-2', name: 'Nipuni Silva', email: 'nipuni@plms.com', role: 'student', phone: '+94 71 987 6543', grade: 'Grade 10 Science', indexNo: 'OL-2027-902', parentId: null },
  { id: 'std-3', name: 'Dilshan Fernando', email: 'dilshan@plms.com', role: 'student', phone: '+94 76 555 4321', grade: 'Grade 9 Mathematics', indexNo: 'OL-2028-104', parentId: null },
  { id: 'prn-1', name: 'Sunil Perera', email: 'parent@plms.com', role: 'parent', phone: '+94 70 333 2211', occupation: 'Civil Engineer', linkedStudentIds: ['std-1'] },
  { id: 'adm-1', name: 'Sir Parakum Bandara (Admin)', email: 'admin@plms.com', role: 'admin', phone: '+94 77 000 1122', designation: 'Head Educator & Admin' }
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
    totalQuestions: 3,
    totalMarks: 30,
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

const initialGrades = [
  { id: 'grd-1', studentId: 'std-1', studentName: 'Kasun Perera', subject: 'Mathematics (Grade 11)', examName: 'Monthly Assessment - September', score: 88, maxScore: 100, grade: 'A', remarks: 'Excellent performance in Algebra test. Sir Parakum Bandara.', date: '2026-09-30' },
  { id: 'grd-2', studentId: 'std-1', studentName: 'Kasun Perera', subject: 'Science (Grade 11)', examName: 'Mid-Term Science Test', score: 82, maxScore: 100, grade: 'A', remarks: 'Good grasp of chemistry concepts.', date: '2026-09-15' }
];

const initialPayments = [
  { id: 'pay-1', studentId: 'std-1', studentName: 'Kasun Perera', month: 'October 2026', amount: 3500, status: 'Approved', slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80', submittedAt: '2026-10-01 10:30 AM', notes: 'Bank transfer receipt attached.' }
];

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

const delay = (ms = 200) => new Promise(res => setTimeout(res, ms));

export const apiService = {
  async login({ email, password, role }) {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
      return { success: true, user, token: 'mock-jwt-token-' + user.id };
    }

    const mockUser = {
      id: role === 'admin' ? 'adm-1' : role === 'parent' ? 'prn-1' : 'std-1',
      name: role === 'admin' ? 'Sir Parakum Bandara (Admin)' : role === 'parent' ? 'Sunil Perera' : 'Kasun Perera',
      email: email,
      role: role || 'student',
      phone: '+94 77 123 4567',
      grade: 'Grade 11 (O/L Mathematics)'
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
      grade: formData.grade || 'Grade 11 (O/L)',
      indexNo: 'OL-' + Math.floor(1000 + Math.random() * 9000),
      parentId: null
    };
    users.push(newUser);
    setStorageItem(STORAGE_KEYS.USERS, users);
    return { success: true, user: newUser };
  },

  async resetPassword(email) {
    await delay();
    return { success: true, message: `Reset link sent to ${email}` };
  },

  async getStudentDashboardData(studentId = 'std-1') {
    await delay();
    const zoomLinks = getStorageItem(STORAGE_KEYS.ZOOM, initialZoomLinks);
    const recordings = getStorageItem(STORAGE_KEYS.RECORDINGS, initialRecordings);
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
    const grades = getStorageItem(STORAGE_KEYS.GRADES, initialGrades);

    return {
      upcomingLiveSession: zoomLinks[0] || null,
      recentRecordingsCount: recordings.length,
      latestGrade: grades[0] || null,
      paymentStatus: payments[0]?.status || 'Approved',
      totalTutorials: 8,
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
    return { success: true, score: 20, maxScore: 30, percentage: 66.7, feedback: 'Good effort! Practice more quadratic formula derivation.' };
  },

  async getStudentGrades(studentId = 'std-1') {
    await delay();
    return getStorageItem(STORAGE_KEYS.GRADES, initialGrades);
  },

  async getStudentPayments(studentId = 'std-1') {
    await delay();
    return getStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
  },

  async uploadPaymentSlip({ studentId = 'std-1', studentName = 'Kasun Perera', month, amount, slipUrl, notes }) {
    await delay();
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
    const newPayment = {
      id: 'pay-' + Date.now(),
      studentId,
      studentName,
      month: month || 'October 2026',
      amount: Number(amount) || 3500,
      status: 'Pending',
      slipUrl: slipUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      submittedAt: new Date().toLocaleString(),
      notes: notes || 'Payment slip uploaded'
    };
    payments.unshift(newPayment);
    setStorageItem(STORAGE_KEYS.PAYMENTS, payments);
    return { success: true, payment: newPayment };
  },

  async getParentDashboardData(parentId = 'prn-1') {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const child = users[0];
    const grades = getStorageItem(STORAGE_KEYS.GRADES, initialGrades);
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);

    return {
      child,
      attendanceRate: '96%',
      recentGrades: grades,
      latestPayment: payments[0] || { month: 'October 2026', status: 'Approved', amount: 3500 },
      overallGrade: 'A',
      activeClasses: 2
    };
  },

  async getAdminDashboardStats() {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
    const zoomLinks = getStorageItem(STORAGE_KEYS.ZOOM, initialZoomLinks);
    const recordings = getStorageItem(STORAGE_KEYS.RECORDINGS, initialRecordings);

    return {
      totalStudents: users.filter(u => u.role === 'student').length,
      totalParents: users.filter(u => u.role === 'parent').length,
      pendingPaymentsCount: payments.filter(p => p.status === 'Pending').length,
      totalClasses: zoomLinks.length,
      totalRecordings: recordings.length
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
      grade: studentData.grade || 'Grade 11 (O/L)',
      indexNo: 'OL-' + Math.floor(1000 + Math.random() * 9000),
      parentId: null
    };
    users.push(newStudent);
    setStorageItem(STORAGE_KEYS.USERS, users);
    return { success: true, student: newStudent };
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
    recordings = recordings.filter(r => r.id !== id);
    setStorageItem(STORAGE_KEYS.RECORDINGS, recordings);
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
      remarks: gradeData.remarks || 'Excellent progress. Sir Parakum Bandara',
      date: new Date().toISOString().split('T')[0]
    };
    grades.unshift(newGrade);
    setStorageItem(STORAGE_KEYS.GRADES, grades);
    return { success: true, grade: newGrade };
  }
};
