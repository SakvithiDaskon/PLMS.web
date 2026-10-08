// PLMS (Private Learning Management System) Mock API Service
// Configured for Grade 6 to 11 Mathematics & Science conducted by Sir Parakum Bandara

const STORAGE_KEYS = {
  USERS: 'plms_mock_users',
  ZOOM: 'plms_mock_zoom',
  RECORDINGS: 'plms_mock_recordings',
  TUTORIALS: 'plms_mock_tutorials',
  QUIZZES: 'plms_mock_quizzes',
  GRADES: 'plms_mock_grades',
  PAYMENTS: 'plms_mock_payments',
  TOPICS: 'plms_mock_topics'
};

// ============================================================
// UPDATED TODAY - DATABASE SEED DATA (STUDENT DATA & ENROLLMENT)
// ============================================================
// ===== ADDED TODAY: Real Student Records with Enrollment & Payment Status =====
const initialUsers = [
  { id: 'std-1', name: 'Kasun Perera', email: 'student@plms.com', password: 'password123', role: 'student', phone: '+94 77 123 4567', grade: 'Grade 11 (O/L Mathematics)', studentId: 'STU-2026-889', indexNo: 'STU-2026-889', parentId: 'prn-1', enrollmentStatus: 'Currently Enrolled', enrollmentDate: '2024-01-10', subject: 'Mathematics', paymentStatus: 'Paid', nextPaymentDue: '2026-11-15' },
  { id: 'std-2', name: 'Nipuni Silva', email: 'nipuni@plms.com', password: 'password123', role: 'student', phone: '+94 71 987 6543', grade: 'Grade 10 Mathematics', studentId: 'STU-2027-902', indexNo: 'STU-2027-902', parentId: null, enrollmentStatus: 'Currently Enrolled', enrollmentDate: '2024-03-15', subject: 'Mathematics', paymentStatus: 'Pending', nextPaymentDue: '2026-10-15' },
  { id: 'std-3', name: 'Dilshan Fernando', email: 'dilshan@plms.com', password: 'password123', role: 'student', phone: '+94 76 555 4321', grade: 'Grade 9 Mathematics', studentId: 'STU-2028-104', indexNo: 'STU-2028-104', parentId: null, enrollmentStatus: 'Currently Enrolled', enrollmentDate: '2024-05-20', subject: 'Mathematics', paymentStatus: 'Unpaid', nextPaymentDue: '2026-10-10' },
  { id: 'std-4', name: 'Amali Fernando', email: 'amali@plms.com', password: 'password123', role: 'student', phone: '+94 77 888 9900', grade: 'Grade 11 (O/L Mathematics)', studentId: 'STU-7846', indexNo: 'STU-7846', parentId: null, enrollmentStatus: 'Currently Enrolled', enrollmentDate: '2024-02-01', subject: 'Mathematics', paymentStatus: 'Paid', nextPaymentDue: '2026-11-01' },
  { id: 'prn-1', name: 'Sunil Perera', email: 'parent@plms.com', password: 'password123', role: 'parent', phone: '+94 70 333 2211', occupation: 'Civil Engineer', linkedStudentIds: ['std-1'] },
  { id: 'adm-1', name: 'Sir Parakum Bandara (Admin)', email: 'admin@plms.com', password: 'password123', role: 'admin', phone: '+94 77 000 1122', designation: 'Head Educator & Admin' }
];

const initialZoomLinks = [
  // Grade 11 Classes
  {
    id: 'zoom-1',
    title: 'Grade 11 O/L Mathematics: Algebra & Quadratic Equations',
    subject: 'Mathematics',
    grade: 'Grade 11',
    topic: 'Quadratic Equations',
    teacher: 'Sir Parakum Bandara',
    date: '2026-10-08',
    time: '18:00 - 20:00',
    link: 'https://zoom.us/j/9876543210',
    passcode: 'PARAKUM26',
    isLive: true,
    type: 'Live Zoom Class'
  },
  {
    id: 'zoom-2',
    title: 'Grade 11 Geometry: Circle Theorems Masterclass',
    subject: 'Mathematics',
    grade: 'Grade 11',
    topic: 'Circle Theorems & Geometric Proofs',
    teacher: 'Sir Parakum Bandara',
    date: '2026-10-14',
    time: '18:30 - 20:00',
    link: 'https://zoom.us/j/9876543210',
    passcode: 'CIRCLE26',
    isLive: false,
    type: 'Live Zoom Class'
  },
  {
    id: 'zoom-3',
    title: 'Grade 11 Trigonometry Problem Solving Workshop',
    subject: 'Mathematics',
    grade: 'Grade 11',
    topic: 'Trigonometry & Angles of Elevation',
    teacher: 'Sir Parakum Bandara',
    date: '2026-10-21',
    time: '18:00 - 19:30',
    link: 'https://zoom.us/j/9876543210',
    passcode: 'TRIGO26',
    isLive: false,
    type: 'Interactive Workshop'
  },
  {
    id: 'zoom-4',
    title: 'Grade 11 O/L Mathematics Past Paper Discussion',
    subject: 'Mathematics',
    grade: 'Grade 11',
    topic: 'Past Paper Assessment & Review',
    teacher: 'Sir Parakum Bandara',
    date: '2026-10-28',
    time: '18:00 - 20:30',
    link: 'https://zoom.us/j/9876543210',
    passcode: 'PAPER26',
    isLive: false,
    type: 'Live Zoom Class'
  },

  // Grade 10 Classes
  {
    id: 'zoom-5',
    title: 'Grade 10 Mathematics: Algebraic Fractions & Equations',
    subject: 'Mathematics',
    grade: 'Grade 10',
    topic: 'Algebraic Fractions',
    teacher: 'Sir Parakum Bandara',
    date: '2026-10-09',
    time: '17:00 - 18:30',
    link: 'https://zoom.us/j/1234567890',
    passcode: 'MATH10',
    isLive: true,
    type: 'Live Zoom Class'
  },
  {
    id: 'zoom-6',
    title: 'Grade 10 Mathematics: Pythagoras Theorem in Depth',
    subject: 'Mathematics',
    grade: 'Grade 10',
    topic: 'Pythagoras Theorem',
    teacher: 'Sir Parakum Bandara',
    date: '2026-10-16',
    time: '17:00 - 18:30',
    link: 'https://zoom.us/j/1234567890',
    passcode: 'PYTH10',
    isLive: false,
    type: 'Live Zoom Class'
  },
  {
    id: 'zoom-8',
    title: 'Grade 10 Mathematics: Logarithms & Scientific Indices',
    subject: 'Mathematics',
    grade: 'Grade 10',
    topic: 'Logarithms & Scientific Indices',
    teacher: 'Sir Parakum Bandara',
    date: '2026-10-23',
    time: '17:00 - 18:30',
    link: 'https://zoom.us/j/1234567890',
    passcode: 'LOGS10',
    isLive: false,
    type: 'Interactive Workshop'
  },
  {
    id: 'zoom-9',
    title: 'Grade 10 Mathematics: Sets & Venn Diagrams Masterclass',
    subject: 'Mathematics',
    grade: 'Grade 10',
    topic: 'Sets & Venn Diagrams',
    teacher: 'Sir Parakum Bandara',
    date: '2026-10-30',
    time: '17:00 - 19:00',
    link: 'https://zoom.us/j/1234567890',
    passcode: 'VENN10',
    isLive: false,
    type: 'Live Zoom Class'
  },

  // Grade 9 Classes
  {
    id: 'zoom-7',
    title: 'Grade 9 Mathematics: Linear Equations & Graphs',
    subject: 'Mathematics',
    grade: 'Grade 9',
    topic: 'Linear Equations',
    teacher: 'Sir Parakum Bandara',
    date: '2026-10-11',
    time: '16:00 - 17:30',
    link: 'https://zoom.us/j/5555555555',
    passcode: 'MATH9',
    isLive: true,
    type: 'Live Zoom Class'
  },
  {
    id: 'zoom-10',
    title: 'Grade 9 Mathematics: Financial Mathematics & Profit',
    subject: 'Mathematics',
    grade: 'Grade 9',
    topic: 'Financial Mathematics',
    teacher: 'Sir Parakum Bandara',
    date: '2026-10-18',
    time: '16:00 - 17:30',
    link: 'https://zoom.us/j/5555555555',
    passcode: 'FIN9',
    isLive: false,
    type: 'Live Zoom Class'
  },
  {
    id: 'zoom-11',
    title: 'Grade 9 Mathematics: Angles & Parallel Lines',
    subject: 'Mathematics',
    grade: 'Grade 9',
    topic: 'Angles & Parallel Lines',
    teacher: 'Sir Parakum Bandara',
    date: '2026-10-25',
    time: '16:00 - 17:30',
    link: 'https://zoom.us/j/5555555555',
    passcode: 'ANGLE9',
    isLive: false,
    type: 'Interactive Workshop'
  },
  {
    id: 'zoom-12',
    title: 'Grade 9 Mathematics: Fractions & Decimals Problem Solving',
    subject: 'Mathematics',
    grade: 'Grade 9',
    topic: 'Fractions & Decimal Operations',
    teacher: 'Sir Parakum Bandara',
    date: '2026-10-31',
    time: '16:00 - 17:30',
    link: 'https://zoom.us/j/5555555555',
    passcode: 'FRAC9',
    isLive: false,
    type: 'Live Zoom Class'
  }
];

// ===== UPDATED TODAY: Mathematics Curriculum Seed Data (10 Lessons per Topic) =====
const initialTopics = [
  // Grade 11 Topics
  {
    id: 'top-1',
    grade: 'Grade 11',
    subject: 'Mathematics',
    name: 'Algebra & Quadratic Equations',
    description: 'Linear equations, quadratic formula, and algebraic expressions.',
    lessonsCount: 10,
    progress: 60
  },
  {
    id: 'top-2',
    grade: 'Grade 11',
    subject: 'Mathematics',
    name: 'Geometry & Circle Theorems',
    description: 'Circle properties, angles, cyclic quadrilaterals, and theorems.',
    lessonsCount: 10,
    progress: 30
  },
  {
    id: 'top-3',
    grade: 'Grade 11',
    subject: 'Mathematics',
    name: 'Trigonometry & Angles of Elevation',
    description: 'Trigonometric ratios (sin, cos, tan), angles of elevation and depression.',
    lessonsCount: 10,
    progress: 15
  },
  {
    id: 'top-4',
    grade: 'Grade 11',
    subject: 'Mathematics',
    name: 'Matrices & Transformations',
    description: 'Matrix multiplication, inverse calculations, determinants, and coordinate transformations.',
    lessonsCount: 6,
    progress: 25
  },
  {
    id: 'top-5',
    grade: 'Grade 11',
    subject: 'Mathematics',
    name: 'Probability & Statistics',
    description: 'Tree diagrams, independent events, frequency distributions, mean, median, and histograms.',
    lessonsCount: 9,
    progress: 50
  },
  {
    id: 'top-6',
    grade: 'Grade 11',
    subject: 'Mathematics',
    name: 'Perimeter, Area & Volumes',
    description: 'Mensuration formulas for prisms, cylinders, pyramids, cones, and composite solids.',
    lessonsCount: 7,
    progress: 15
  },

  // Grade 10 Topics
  {
    id: 'top-7',
    grade: 'Grade 10',
    subject: 'Mathematics',
    name: 'Algebraic Fractions & Formulae',
    description: 'Simplification of complex fractions, subject change, and simultaneous linear equations.',
    lessonsCount: 10,
    progress: 55
  },
  {
    id: 'top-8',
    grade: 'Grade 10',
    subject: 'Mathematics',
    name: 'Pythagoras Theorem & Triangles',
    description: 'Right-angled triangles, geometric proofs, and congruent triangle problems.',
    lessonsCount: 8,
    progress: 70
  },
  {
    id: 'top-9',
    grade: 'Grade 10',
    subject: 'Mathematics',
    name: 'Logarithms & Scientific Indices',
    description: 'Laws of indices, logarithmic conversions, characteristic, and mantissa application.',
    lessonsCount: 7,
    progress: 30
  },
  {
    id: 'top-10',
    grade: 'Grade 10',
    subject: 'Mathematics',
    name: 'Sets & Venn Diagrams',
    description: 'Universal sets, subsets, intersections, unions, and shaded region problems.',
    lessonsCount: 6,
    progress: 85
  },
  {
    id: 'top-11',
    grade: 'Grade 10',
    subject: 'Mathematics',
    name: 'Surface Area & Prisms',
    description: 'Cross-sectional area calculations, surface areas, and cylinder mensuration.',
    lessonsCount: 9,
    progress: 20
  },
  {
    id: 'top-12',
    grade: 'Grade 10',
    subject: 'Mathematics',
    name: 'Linear Graphs & Gradients',
    description: 'Plotting lines, finding gradient m and intercept c from coordinates and equations.',
    lessonsCount: 8,
    progress: 45
  },

  // Grade 9 Topics
  {
    id: 'top-13',
    grade: 'Grade 9',
    subject: 'Mathematics',
    name: 'Linear Equations & Graphs',
    description: 'Single-variable equations, coordinate axes, and plotting straight lines on Cartesian plane.',
    lessonsCount: 8,
    progress: 60
  },
  {
    id: 'top-14',
    grade: 'Grade 9',
    subject: 'Mathematics',
    name: 'Financial Mathematics & Profit',
    description: 'Calculating percentage profit, loss, discounts, and simple annual interest.',
    lessonsCount: 6,
    progress: 75
  },
  {
    id: 'top-15',
    grade: 'Grade 9',
    subject: 'Mathematics',
    name: 'Angles & Parallel Lines',
    description: 'Parallel line properties, alternate angles, corresponding angles, and triangle theorems.',
    lessonsCount: 7,
    progress: 40
  },
  {
    id: 'top-16',
    grade: 'Grade 9',
    subject: 'Mathematics',
    name: 'Fractions & Decimal Operations',
    description: 'Order of operations, reciprocal multiplication, and rational number conversions.',
    lessonsCount: 6,
    progress: 90
  },
  {
    id: 'top-17',
    grade: 'Grade 9',
    subject: 'Mathematics',
    name: 'Perimeter & Area of Plane Figures',
    description: 'Composite figures, parallelograms, trapeziums, and triangular boundary areas.',
    lessonsCount: 8,
    progress: 35
  },
  {
    id: 'top-18',
    grade: 'Grade 9',
    subject: 'Mathematics',
    name: 'Ratio, Rate & Proportion',
    description: 'Dividing quantities in ratio and calculating speed, distance, and time relationships.',
    lessonsCount: 5,
    progress: 50
  }
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

// ===== ADDED TODAY: Payment Records Seed Data (Paid, Pending, Unpaid) =====
const initialPayments = [
  { id: 'pay-1', studentId: 'std-1', studentName: 'Kasun Perera', month: 'October 2026', amount: 3500, status: 'Paid', nextDue: '2026-11-15', slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80', submittedAt: '2026-10-01 10:30 AM', notes: 'Bank transfer receipt attached.' },
  { id: 'pay-2', studentId: 'std-2', studentName: 'Nipuni Silva', month: 'October 2026', amount: 3500, status: 'Pending', nextDue: '2026-10-15', slipUrl: null, submittedAt: '2026-10-05 02:15 PM', notes: 'Slip verification pending.' },
  { id: 'pay-3', studentId: 'std-3', studentName: 'Dilshan Fernando', month: 'October 2026', amount: 3500, status: 'Unpaid', nextDue: '2026-10-10', slipUrl: null, submittedAt: null, notes: 'Overdue monthly fee.' },
  { id: 'pay-4', studentId: 'std-4', studentName: 'Amali Fernando', month: 'October 2026', amount: 3500, status: 'Paid', nextDue: '2026-11-01', slipUrl: null, submittedAt: '2026-10-01 09:00 AM', notes: 'Monthly fee paid via online portal.' }
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

// ===== UPDATED TODAY: Mock DB Initialization & Sync for Real Student Records =====
const initMockDB = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    setStorageItem(STORAGE_KEYS.USERS, initialUsers);
  } else {
    // Sync missing students (like Amali Fernando) or missing fields into localStorage
    const storedUsers = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    let updated = false;
    storedUsers.forEach(u => {
      if (!u.enrollmentStatus) {
        u.enrollmentStatus = 'Currently Enrolled';
        updated = true;
      }
      if (!u.enrollmentDate) {
        u.enrollmentDate = '2024-01-10';
        updated = true;
      }
      if (!u.subject) {
        u.subject = 'Mathematics';
        updated = true;
      }
      if (!u.paymentStatus || u.paymentStatus === 'Paid') {
        const foundPay = initialPayments.find(p => p.studentId === u.id || p.studentName === u.name);
        if (foundPay) {
          u.paymentStatus = foundPay.status;
          u.nextPaymentDue = foundPay.nextDue;
          updated = true;
        }
      }
    });

    if (!storedUsers.some(u => u.name === 'Amali Fernando' || u.studentId === 'STU-7846')) {
      const amali = initialUsers.find(u => u.name === 'Amali Fernando');
      if (amali) {
        storedUsers.push(amali);
        updated = true;
      }
    }

    if (updated) {
      setStorageItem(STORAGE_KEYS.USERS, storedUsers);
    }
  }
  
  // Ensure zoom links have full calendar schedule (4 classes per grade: Grade 11, Grade 10, Grade 9)
  const storedZoom = getStorageItem(STORAGE_KEYS.ZOOM, null);
  if (!storedZoom || storedZoom.length < 12) {
    setStorageItem(STORAGE_KEYS.ZOOM, initialZoomLinks);
  }

  // Ensure topics are initialized and refreshed
  const storedTopics = getStorageItem(STORAGE_KEYS.TOPICS, null);
  if (!storedTopics || storedTopics.length === 0 || storedTopics[0]?.lessonsCount !== 10) {
    setStorageItem(STORAGE_KEYS.TOPICS, initialTopics);
  }

  if (!localStorage.getItem(STORAGE_KEYS.RECORDINGS)) setStorageItem(STORAGE_KEYS.RECORDINGS, initialRecordings);
  if (!localStorage.getItem(STORAGE_KEYS.TUTORIALS)) setStorageItem(STORAGE_KEYS.TUTORIALS, initialTutorials);
  if (!localStorage.getItem(STORAGE_KEYS.QUIZZES)) setStorageItem(STORAGE_KEYS.QUIZZES, initialQuizzes);
  if (!localStorage.getItem(STORAGE_KEYS.GRADES)) setStorageItem(STORAGE_KEYS.GRADES, initialGrades);

  if (!localStorage.getItem(STORAGE_KEYS.PAYMENTS)) {
    setStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
  } else {
    const storedPayments = getStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
    let updatedPayments = false;
    initialPayments.forEach(p => {
      const existing = storedPayments.find(sp => sp.studentId === p.studentId || sp.id === p.id);
      if (!existing) {
        storedPayments.push(p);
        updatedPayments = true;
      } else if (p.id === 'pay-1' && existing.nextDue === '-') {
        existing.nextDue = '2026-11-15';
        updatedPayments = true;
      }
    });
    if (updatedPayments) {
      setStorageItem(STORAGE_KEYS.PAYMENTS, storedPayments);
    }
  }
};

initMockDB();

const delay = (ms = 200) => new Promise(res => setTimeout(res, ms));

export const apiService = {
  async login({ email, password, role }) {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user) {
      if (user.password && user.password !== password) {
        return { success: false, message: 'Invalid password. Please check your credentials.' };
      }
      if (role && user.role !== role) {
        return { success: false, message: `This account is registered as a ${user.role}, not ${role}.` };
      }
      return { success: true, user, token: 'mock-jwt-token-' + user.id };
    }

    return { success: false, message: 'No account found with this email. Please register first.' };
  },

  // ===== UPDATED TODAY: Student Registration with Dynamic ID & Payment Status =====
  async registerStudent(formData) {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const existing = users.find(u => u.email.toLowerCase() === formData.email.toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email address already exists. Please log in.' };
    }
    const newStudentId = 'STU-' + Math.floor(1000 + Math.random() * 9000);
    const nameParts = (formData.name || '').trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    const newUser = {
      id: 'std-' + Date.now(),
      name: formData.name,
      firstName,
      lastName,
      email: formData.email,
      password: formData.password,
      role: 'student',
      phone: formData.phone || '',
      grade: formData.grade || 'Grade 11 (O/L Mathematics)',
      studentId: newStudentId,
      indexNo: newStudentId,
      parentId: null,
      enrollmentStatus: 'Currently Enrolled',
      paymentStatus: 'Pending',
      nextPaymentDue: 'End of Month'
    };
    users.push(newUser);
    setStorageItem(STORAGE_KEYS.USERS, users);

    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
    payments.unshift({
      id: 'pay-' + Date.now(),
      studentId: newUser.id,
      studentName: newUser.name,
      month: 'October 2026',
      amount: 3500,
      status: 'Pending',
      nextDue: 'End of Month',
      slipUrl: null,
      submittedAt: new Date().toLocaleDateString(),
      notes: 'Initial registration fee verification'
    });
    setStorageItem(STORAGE_KEYS.PAYMENTS, payments);

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
      paymentStatus: payments[0]?.status || 'Paid',
      totalTutorials: 8,
      pendingQuizzes: 1
    };
  },

  // Load logged-in student
  // Get student data from database by user ID
  async getStudentById(id) {
    await delay();
    if (!id) return null;
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
    const student = users.find(u => u.id === id || u.studentId === id || (u.email && u.email.toLowerCase() === String(id).toLowerCase()));
    if (student) {
      const nameParts = (student.name || '').trim().split(' ');
      const firstName = student.firstName || nameParts[0] || '';
      const lastName = student.lastName || nameParts.slice(1).join(' ') || '';
      const fullName = student.name || `${firstName} ${lastName}`.trim();

      const studentPayment = payments.find(p => p.studentId === student.id || p.studentId === student.studentId || p.studentName === student.name);
      const paymentStatus = studentPayment?.status || student.paymentStatus || 'Paid';
      const nextPaymentDue = studentPayment?.nextDue || student.nextPaymentDue || '-';

      return {
        ...student,
        firstName,
        lastName,
        fullName,
        enrollmentStatus: student.enrollmentStatus || 'Currently Enrolled',
        enrollmentDate: student.enrollmentDate || '2024-01-10',
        subject: student.subject || 'Mathematics',
        paymentStatus,
        nextPaymentDue
      };
    }
    return null;
  },

  // Save profile changes
  // Save updated student profile to database
  async updateStudentProfile(id, data) {
    await delay();
    if (!id) return { success: false, message: 'Student ID is required' };
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const index = users.findIndex(u => u.id === id || u.studentId === id || (u.email && u.email.toLowerCase() === String(id).toLowerCase()));
    if (index === -1) {
      return { success: false, message: 'Student record not found in database' };
    }

    const current = users[index];
    const newName = (data.name !== undefined ? data.name : current.name) || current.name;
    const nameParts = newName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const updatedUser = {
      ...current,
      name: newName,
      firstName,
      lastName,
      phone: data.phone !== undefined ? data.phone : current.phone,
      grade: data.grade !== undefined ? data.grade : current.grade,
      subject: data.subject !== undefined ? data.subject : (current.subject || 'Mathematics')
    };

    users[index] = updatedUser;
    setStorageItem(STORAGE_KEYS.USERS, users);

    // Also update studentName in payments if name changed
    if (data.name && data.name !== current.name) {
      const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
      let payUpdated = false;
      payments.forEach(p => {
        if (p.studentId === current.id || p.studentId === current.studentId || p.studentName === current.name) {
          p.studentName = data.name;
          payUpdated = true;
        }
      });
      if (payUpdated) {
        setStorageItem(STORAGE_KEYS.PAYMENTS, payments);
      }
    }

    return { success: true, user: updatedUser };
  },

  // Payment status
  // Get student payment status from database
  async getStudentPaymentStatus(studentId) {
    await delay();
    if (!studentId) return { status: 'Paid', nextDue: '-', amount: 3500, month: 'October 2026' };
    const payments = getStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const user = users.find(u => u.id === studentId || u.studentId === studentId || (u.email && u.email.toLowerCase() === String(studentId).toLowerCase()));

    const studentPayment = payments.find(p => 
      p.studentId === studentId || 
      (user && (p.studentName === user.name || p.studentId === user.studentId || p.studentId === user.id))
    );

    if (studentPayment) {
      return {
        status: studentPayment.status,
        month: studentPayment.month || 'October 2026',
        amount: studentPayment.amount || 3500,
        nextDue: studentPayment.nextDue || '-'
      };
    }

    if (user?.paymentStatus) {
      return {
        status: user.paymentStatus,
        month: 'October 2026',
        amount: 3500,
        nextDue: user.nextPaymentDue || '-'
      };
    }

    return {
      status: 'Paid',
      month: 'October 2026',
      amount: 3500,
      nextDue: '-'
    };
  },

  // Unit topics
  // Get Mathematics topics for the student's grade
  async getMathematicsTopics(grade) {
    await delay();
    const topics = getStorageItem(STORAGE_KEYS.TOPICS, initialTopics);
    if (!grade) return [];
    
    // Normalize grade search (e.g. "Grade 11 (O/L Mathematics)" -> "11")
    const match = grade.match(/Grade\s*(\d+)/i) || grade.match(/(\d+)/);
    const gradeNum = match ? match[1] : null;

    if (gradeNum) {
      return topics.filter(t => t.grade.includes(gradeNum));
    }

    return topics.filter(t => t.grade.toLowerCase().includes(grade.toLowerCase()));
  },

  // Calendar
  // Get scheduled Mathematics classes for student's grade
  async getStudentClasses(studentId, grade) {
    await delay();
    const zoomLinks = getStorageItem(STORAGE_KEYS.ZOOM, initialZoomLinks);
    if (!grade) return zoomLinks;

    // Filter classes matching student grade
    const match = grade.match(/Grade\s*(\d+)/i) || grade.match(/(\d+)/);
    const gradeNum = match ? match[1] : null;

    if (gradeNum) {
      return zoomLinks.filter(c => {
        const classGradeMatch = (c.grade || '').match(/Grade\s*(\d+)/i) || (c.title || '').match(/Grade\s*(\d+)/i);
        if (classGradeMatch) {
          return classGradeMatch[1] === gradeNum;
        }
        return (c.grade || '').toLowerCase().includes(`grade ${gradeNum}`) ||
               (c.title || '').toLowerCase().includes(`grade ${gradeNum}`);
      });
    }

    return zoomLinks.filter(c => (c.grade || '').toLowerCase().includes(grade.toLowerCase()));
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

  async getStudentGrades(studentId = 'std-1') {
    await delay();
    return getStorageItem(STORAGE_KEYS.GRADES, initialGrades);
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
    const newStudentId = 'STU-' + Math.floor(1000 + Math.random() * 9000);
    const newStudent = {
      id: 'std-' + Date.now(),
      role: 'student',
      name: studentData.name,
      email: studentData.email,
      phone: studentData.phone,
      grade: studentData.grade || 'Grade 11 (O/L)',
      studentId: newStudentId,
      indexNo: newStudentId,
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
