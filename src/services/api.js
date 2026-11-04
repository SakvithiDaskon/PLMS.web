

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



const initialUsers = [
  { id: 'std-1', name: 'Kasun Perera', email: 'student@plms.com', password: 'password123', role: 'student', phone: '+94 77 123 4567', grade: 'Grade 11 (O/L Mathematics)', studentId: '0001', indexNo: '0001', parentId: 'prn-1', enrollmentStatus: 'Currently Enrolled', enrollmentDate: '2024-01-10', subject: 'Mathematics', paymentStatus: 'Paid', nextPaymentDue: '-' },
  { id: 'std-2', name: 'Nipuni Silva', email: 'nipuni@plms.com', password: 'password123', role: 'student', phone: '+94 71 987 6543', grade: 'Grade 10 Mathematics', studentId: 'STU-2027-902', indexNo: 'STU-2027-902', parentId: null, enrollmentStatus: 'Currently Enrolled', paymentStatus: 'Pending', nextPaymentDue: '2026-10-15' },
  { id: 'std-3', name: 'Dilshan Fernando', email: 'dilshan@plms.com', password: 'password123', role: 'student', phone: '+94 76 555 4321', grade: 'Grade 9 Mathematics', studentId: 'STU-2028-104', indexNo: 'STU-2028-104', parentId: null, enrollmentStatus: 'Currently Enrolled', paymentStatus: 'Unpaid', nextPaymentDue: '2026-10-10' },
  { id: 'std-4', name: 'Amali Fernando', email: 'amali@plms.com', password: 'password123', role: 'student', phone: '+94 77 888 9900', grade: 'Grade 11 (O/L Mathematics)', studentId: 'STU-7846', indexNo: 'STU-7846', parentId: null, enrollmentStatus: 'Currently Enrolled', paymentStatus: 'Paid', nextPaymentDue: '-' },
  { id: 'prn-1', name: 'Sunil Perera', email: 'parent@plms.com', password: 'password123', role: 'parent', phone: '+94 70 333 2211', occupation: 'Civil Engineer', linkedStudentIds: ['std-1'] },
  { id: 'adm-1', name: 'Sir Parakum Bandara (Admin)', email: 'admin@plms.com', password: 'password123', role: 'admin', phone: '+94 77 000 1122', designation: 'Head Educator & Admin' }
];

const getRelativeDateString = (daysFromToday = 1) => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const initialZoomLinks = [
  {
    id: 'zoom-1',
    title: 'Grade 11 O/L Mathematics: Algebra & Quadratic Equations',
    subject: 'Mathematics',
    grade: 'Grade 11',
    topic: 'Quadratic Equations',
    teacher: 'Sir Parakum Bandara',
    date: getRelativeDateString(1), // Tomorrow
    time: '18:00 - 20:00',
    link: 'https://zoom.us/j/9876543210',
    passcode: '123456',
    isLive: false,
    type: 'Zoom Class'
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
,

  // Grade 6 Topics (Units 1, 2, and 3 - Unit 1 covered on topic 1)
  // --- Unit 1 (1 වන වාරය) ---
  {
    id: 'top-g6-1',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 1',
    name: '01. වෘත්ත',
    description: 'වෘත්තාකාර හැඩ හඳුනාගැනීම, වෘත්ත ඇඳීම, වෘත්තයේ පිහිටීම් හඳුනාගැනීම සහ වෘත්ත භාවිතයෙන් රටා නිර්මාණය කිරීම.',
    lessonsCount: 8,
    progress: 100,
    modules: [
      'වෘත්තාකාර හැඩ ඇති ද්‍රව්‍ය හඳුනාගැනීම',
      'ද්‍රව්‍ය භාවිතයෙන් වෘත්ත ඇඳීම',
      'වෘත්තයේ ප්‍රමාණය සහ වෘත්තාකාර ආස්තරය',
      'වෘත්තය තුළ, මත සහ පිටත පිහිටීම් හඳුනාගැනීම',
      'වෘත්ත ආශ්‍රිත රටා ඇඳීම',
      'වෘත්ත ආශ්‍රිත රටා නිර්මාණය කිරීම',
      'වෘත්ත ආශ්‍රිත විවිධ ක්‍රියාකාරකම්',
      'අභ්‍යාස හා ගැටලු විසඳීම'
    ]
  },
  {
    id: 'top-g6-2',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 1',
    name: '02. ස්ථානීය අගය',
    description: 'සංඛ්‍යාවක ඉලක්කම් පිහිටන ස්ථානය අනුව ඒවායේ අගය හඳුනාගැනීම සහ විශාල සංඛ්‍යා කියවීම හා ලිවීම.',
    lessonsCount: 6,
    progress: 0,
    modules: [
      'ස්ථානීය අගය හඳුනාගැනීම',
      'ඒකක හා දශක ස්ථාන',
      'සියක, දහස් හා ඉහළ ස්ථාන',
      'ඉලක්කමකින් නිරූපණය වන අගය',
      'සංඛ්‍යා කලාප හඳුනාගැනීම',
      'විශාල සංඛ්‍යා කියවීම හා ලිවීම'
    ]
  },
  {
    id: 'top-g6-3',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 1',
    name: '03. පූර්ණ සංඛ්‍යා මත ගණිත කර්ම',
    description: 'පූර්ණ සංඛ්‍යා භාවිතයෙන් එකතු කිරීම, අඩු කිරීම, ගුණ කිරීම හා බෙදීම සිදු කිරීම.',
    lessonsCount: 7,
    progress: 0,
    modules: [
      'පූර්ණ සංඛ්‍යා එකතු කිරීම',
      'එකතු කිරීමේ ක්‍රම හා ගැටලු',
      'පූර්ණ සංඛ්‍යා අඩු කිරීම',
      'අඩු කිරීමේ ක්‍රම හා ගැටලු',
      'පූර්ණ සංඛ්‍යා ගුණ කිරීම',
      'පූර්ණ සංඛ්‍යා බෙදීම',
      'මිශ්‍ර ගණිත ගැටලු විසඳීම'
    ]
  },
  {
    id: 'top-g6-4',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 1',
    name: '04. කාලය',
    description: 'ඔරලෝසුව භාවිතයෙන් වේලාව කියවීම, කාල ඒකක හඳුනාගැනීම සහ කාලය සම්බන්ධ ගණනය කිරීම් සිදු කිරීම.',
    lessonsCount: 7,
    progress: 0,
    modules: [
      'පැය, මිනිත්තු හා තත්පර හඳුනාගැනීම',
      'පැය 12 ඔරලෝසුවෙන් වේලාව කියවීම',
      'පැය 24 ඔරලෝසුවෙන් වේලාව කියවීම',
      'කාල ඒකක අතර සම්බන්ධතා',
      'කාලය එකතු කිරීම',
      'කාලය අඩු කිරීම',
      'කාලය සම්බන්ධ ගැටලු විසඳීම'
    ]
  },
  {
    id: 'top-g6-5',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 1',
    name: '05. සංඛ්‍යා රේඛාව',
    description: 'සංඛ්‍යා රේඛාව හඳුනාගැනීම, සංඛ්‍යා පිහිටුවීම සහ ධන, ඍණ හා පූර්ණ සංඛ්‍යා අතර සම්බන්ධතා හඳුනාගැනීම.',
    lessonsCount: 5,
    progress: 0,
    modules: [
      'සංඛ්‍යා රේඛාව හඳුනාගැනීම',
      'සංඛ්‍යා රේඛාවේ පූර්ණ සංඛ්‍යා සලකුණු කිරීම',
      'ඍණ සංඛ්‍යා හඳුනාගැනීම',
      'නිඛිල හඳුනාගැනීම හා සංසන්දනය',
      'සංඛ්‍යා රේඛාව ආශ්‍රිත ගැටලු'
    ]
  },
  {
    id: 'top-g6-6',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 1',
    name: '06. නිමානය හා වටයීම',
    description: 'නිමානයේ වැදගත්කම හඳුනාගැනීම සහ සංඛ්‍යා ආසන්න අගයන්ට වටයීම.',
    lessonsCount: 5,
    progress: 0,
    modules: [
      'නිමානය හඳුනාගැනීම',
      'නිමාන කිරීමේ ක්‍රම',
      'ආසන්න දහයට වටයීම',
      'සංඛ්‍යා ආසන්න අගයන්ට වටයීම',
      'නිමානය හා වටයීම ආශ්‍රිත ගැටලු'
    ]
  },
  {
    id: 'top-g6-7',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 1',
    name: '07. කෝණ',
    description: 'කෝණ හඳුනාගැනීම, කෝණයක කොටස් සහ විවිධ කෝණ වර්ග හඳුනාගැනීම.',
    lessonsCount: 6,
    progress: 0,
    modules: [
      'කෝණ හඳුනාගැනීම',
      'කෝණයක ශීර්ෂය හා බාහු',
      'සෘජු කෝණය හඳුනාගැනීම',
      'සුළු කෝණ හා මහා කෝණ',
      'සරල කෝණ හා පරාවර්ත කෝණ',
      'කෝණ ආශ්‍රිත ක්‍රියාකාරකම් හා ගැටලු'
    ]
  },
  {
    id: 'top-g6-8',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 1',
    name: '08. දිශා',
    description: 'ප්‍රධාන දිශා හඳුනාගැනීම, දිශා සටහන් භාවිත කිරීම සහ ස්ථාන අතර දිශා සම්බන්ධතා හඳුනාගැනීම.',
    lessonsCount: 5,
    progress: 0,
    modules: [
      'ප්‍රධාන දිශා හඳුනාගැනීම',
      'උප දිශා හඳුනාගැනීම',
      'දිශා සටහනක් හඳුනාගැනීම',
      'මාලිමාව භාවිතයෙන් දිශා සෙවීම',
      'දිශා ආශ්‍රිත ගැටලු විසඳීම'
    ]
  },
  {
    id: 'top-g6-9',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 1',
    name: '09. භාග',
    description: 'භාග හඳුනාගැනීම, භාගවල කොටස්, සමාන භාග සහ භාග එකතු කිරීම හා අඩු කිරීම.',
    lessonsCount: 7,
    progress: 0,
    modules: [
      'භාග හඳුනාගැනීම',
      'ඒකක භාග හා ඒවා නිරූපණය',
      'ලවය හා හරය හඳුනාගැනීම',
      'සමාන භාග හඳුනාගැනීම',
      'භාග සංසන්දනය කිරීම',
      'භාග එකතු කිරීම හා අඩු කිරීම',
      'භාග ආශ්‍රිත ගැටලු විසඳීම'
    ]
  },
  {
    id: 'top-g6-10',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 1',
    name: '10. තේරීම',
    description: 'පොදු ලක්ෂණ අනුව ද්‍රව්‍ය හා සංඛ්‍යා කාණ්ඩවලට වෙන් කිරීම සහ ඒවා නම් කිරීම.',
    lessonsCount: 5,
    progress: 0,
    modules: [
      'පොදු ලක්ෂණ හඳුනාගැනීම',
      'ලක්ෂණ අනුව කාණ්ඩවලට වෙන් කිරීම',
      'කාණ්ඩවලට නම් යෙදීම',
      'සංඛ්‍යා හා ද්‍රව්‍ය වර්ගීකරණය',
      'තේරීම ආශ්‍රිත ක්‍රියාකාරකම් හා ගැටලු'
    ]
  },
  {
    id: 'top-g6-11',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 1',
    name: '11. සාධක හා ගුණාකාර',
    description: 'පූර්ණ සංඛ්‍යාවල සාධක හා ගුණාකාර හඳුනාගැනීම සහ ඒවා භාවිතයෙන් ගණිත ගැටලු විසඳීම.',
    lessonsCount: 7,
    progress: 0,
    modules: [
      'සාධක හඳුනාගැනීම',
      'ගුණාකාර හඳුනාගැනීම',
      'ගුණන වගුව භාවිතයෙන් සාධක සෙවීම',
      'සංඛ්‍යාවක සාධක සෙවීම',
      'සංඛ්‍යාවක ගුණාකාර සෙවීම',
      '2, 5 හා 10 න් බෙදිය හැකි බව පරීක්ෂා කිරීම',
      'සාධක හා ගුණාකාර ආශ්‍රිත ගැටලු'
    ]
  },

  // --- Unit 2 (2 වන වාරය) ---
  {
    id: 'top-g6-12',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 2',
    name: '12. සරල රේඛීය තල රූප',
    description: 'සරල රේඛීය තල රූප හඳුනාගැනීම, ත්‍රිකෝණ හා චතුරස්‍ර වර්ගීකරණය සහ ඒවායේ ලක්ෂණ ගවේෂණය.',
    lessonsCount: 5,
    progress: 0,
    modules: [
      'සරල රේඛීය තල රූප හඳුනාගැනීම',
      'ත්‍රිකෝණ වර්ග සහ ලක්ෂණ',
      'චතුරස්‍ර වර්ග සහ ලක්ෂණ',
      'සමමිතික රූප හඳුනාගැනීම',
      'සරල රේඛීය තල රූප ආශ්‍රිත අභ්‍යාස'
    ]
  },
  {
    id: 'top-g6-13',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 2',
    name: '13. දශම',
    description: 'දශම සංඛ්‍යා හඳුනාගැනීම, ස්ථානීය අගය, දශම සංඛ්‍යා එකතු කිරීම හා අඩු කිරීම.',
    lessonsCount: 6,
    progress: 0,
    modules: [
      'දශම සංඛ්‍යා හඳුනාගැනීම',
      'දශමවල ස්ථානීය අගය',
      'දශම සංඛ්‍යා සංසන්දනය',
      'දශම සංඛ්‍යා එකතු කිරීම',
      'දශම සංඛ්‍යා අඩු කිරීම',
      'දශම ආශ්‍රිත ගැටලු විසඳීම'
    ]
  },
  {
    id: 'top-g6-14',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 2',
    name: '14. සංඛ්‍යා වර්ග හා සංඛ්‍යා රටා',
    description: 'ඉරට්ට, ඔත්තේ, ත්‍රිකෝණික හා සමචතුරස්‍ර සංඛ්‍යා හඳුනාගැනීම සහ සංඛ්‍යා රටා ගවේෂණය.',
    lessonsCount: 5,
    progress: 0,
    modules: [
      'ඔත්තේ හා ඉරට්ට සංඛ්‍යා',
      'ත්‍රිකෝණික සංඛ්‍යා හඳුනාගැනීම',
      'සමචතුරස්‍ර සංඛ්‍යා හඳුනාගැනීම',
      'සංඛ්‍යා රටාවල ඊළඟ පද සෙවීම',
      'සංඛ්‍යා රටා ආශ්‍රිත ගැටලු'
    ]
  },
  {
    id: 'top-g6-15',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 2',
    name: '15. දිග',
    description: 'මිලිමීටර, සෙන්ටිමීටර, මීටර හා කිලෝමීටර මිනුම් ඒකක භාවිතය සහ දිග ගණනය කිරීම්.',
    lessonsCount: 6,
    progress: 0,
    modules: [
      'දිග මැනීමේ සම්මත ඒකක',
      'මිලිමීටර හා සෙන්ටිමීටර',
      'මීටර හා කිලෝමීටර',
      'දිග මිනුම් එකතු කිරීම',
      'දිග මිනුම් අඩු කිරීම',
      'දිග ආශ්‍රිත ප්‍රායෝගික ගැටලු'
    ]
  },
  {
    id: 'top-g6-16',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 2',
    name: '16. ද්‍රව මිනුම්',
    description: 'මිලිලීටර හා ලීටර ඒකක හඳුනාගැනීම, ධාරිතාව මැනීම සහ ද්‍රව මිනුම් ගණනය කිරීම්.',
    lessonsCount: 5,
    progress: 0,
    modules: [
      'ධාරිතාව හා ද්‍රව මිනුම් ඒකක',
      'මිලිලීටර හා ලීටර අතර සම්බන්ධතාව',
      'ද්‍රව මිනුම් එකතු කිරීම',
      'ද්‍රව මිනුම් අඩු කිරීම',
      'ධාරිතාව ආශ්‍රිත ගැටලු විසඳීම'
    ]
  },
  {
    id: 'top-g6-17',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 2',
    name: '17. ඝන වස්තු',
    description: 'ඝනකාභය, ඝනකය, ප්‍රිස්මය, සිලින්ඩරය, කේතුව හා ගෝලය යන ඝන වස්තුවල මතුපිට, දාර හා ශීර්ෂ ගවේෂණය.',
    lessonsCount: 5,
    progress: 0,
    modules: [
      'ඝන වස්තු හඳුනාගැනීම',
      'තල මතුපිට හා වක්‍ර මතුපිට',
      'ඝන වස්තුවල දාර, ශීර්ෂ හා මුහුණත්',
      'දැල මගින් ඝන වස්තු නිර්මාණය',
      'ඝන වස්තු ආශ්‍රිත අභ්‍යාස'
    ]
  },
  {
    id: 'top-g6-rev2',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 2',
    name: 'පුනරීක්ෂණ අභ්‍යාසය 2 වාරය',
    description: 'දෙවන වාරයේ සියලු ඒකක ආවරණය වන පරිදි සකස් කළ පුනරීක්ෂණ අභ්‍යාස සහ ආදර්ශ ප්‍රශ්න පත්‍ර.',
    lessonsCount: 4,
    progress: 0,
    modules: [
      '12-14 ඒකක පුනරීක්ෂණය',
      '15-17 ඒකක පුනරීක්ෂණය',
      'දෙවන වාර විභාග ආදර්ශ ප්‍රශ්න පත්‍රය 1',
      'දෙවන වාර විභාග ආදර්ශ ප්‍රශ්න පත්‍රය 2'
    ]
  },

  // --- Unit 3 (3 වන වාරය) ---
  {
    id: 'top-g6-18',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 3',
    name: '18. වීජීය සංකේත',
    description: 'වීජීය සංකේත හඳුනාගැනීම සහ නොදන්නා අගයන් සඳහා සංකේත භාවිතය.',
    lessonsCount: 5,
    progress: 0,
    modules: [
      'වීජීය සංකේත හැඳින්වීම',
      'සංකේත භාවිතයෙන් ප්‍රකාශන ලිවීම',
      'සංකේතවල අගයන් ආදේශය',
      'වීජීය සංකේත ආශ්‍රිත ගැටලු',
      'අභ්‍යාස හා ක්‍රියාකාරකම්'
    ]
  },
  {
    id: 'top-g6-19',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 3',
    name: '19. වීජීය ප්‍රකාශන ගොඩනැගීම හා ආදේශය',
    description: 'සරල වීජීය ප්‍රකාශන ගොඩනැගීම සහ සංකේත සඳහා සංඛ්‍යා ආදේශ කර අගය සෙවීම.',
    lessonsCount: 5,
    progress: 0,
    modules: [
      'වීජීය ප්‍රකාශන ගොඩනැගීම',
      'ප්‍රකාශනයක පද හා සංගුණක',
      'සංකේත සඳහා ධන සංඛ්‍යා ආදේශය',
      'ප්‍රකාශනවල අගය සෙවීම',
      'ප්‍රායෝගික ගැටලු විසඳීම'
    ]
  },
  {
    id: 'top-g6-20',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 3',
    name: '20. ස්කන්ධය',
    description: 'ග්‍රෑම් සහ කිලෝග්‍රෑම් ඒකක හඳුනාගැනීම, ස්කන්ධය මැනීම සහ ගණනය කිරීම්.',
    lessonsCount: 5,
    progress: 0,
    modules: [
      'ස්කන්ධය මැනීමේ සම්මත ඒකක',
      'ග්‍රෑම් හා කිලෝග්‍රෑම් අතර සම්බන්ධතාව',
      'ස්කන්ධ මිනුම් එකතු කිරීම',
      'ස්කන්ධ මිනුම් අඩු කිරීම',
      'ස්කන්ධය ආශ්‍රිත ගැටලු විසඳීම'
    ]
  },
  {
    id: 'top-g6-21',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 3',
    name: '21. අනුපාත',
    description: 'අනුපාත සංකල්පය, සමාන අනුපාත සහ ප්‍රමාණ අනුපාතයකට බෙදා වෙන් කිරීම.',
    lessonsCount: 5,
    progress: 0,
    modules: [
      'අනුපාත හඳුනාගැනීම',
      'සරල අනුපාත ලිවීම',
      'සමාන අනුපාත සෙවීම',
      'ප්‍රමාණ අනුපාත අනුව බෙදීම',
      'අනුපාත ආශ්‍රිත ගැටලු විසඳීම'
    ]
  },
  {
    id: 'top-g6-22',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 3',
    name: '22. දත්ත රැස් කිරීම හා නිරූපණය',
    description: 'දත්ත රැස් කිරීම, ප්‍රවාරණ සටහන් සහ චිත්‍ර ප්‍රස්ථාර මගින් දත්ත නිරූපණය.',
    lessonsCount: 5,
    progress: 0,
    modules: [
      'දත්ත රැස් කිරීමේ ක්‍රම',
      'ප්‍රවාරණ සටහන් භාවිතය',
      'චිත්‍ර ප්‍රස්ථාර නිර්මාණය',
      'තීරු ප්‍රස්ථාර හැඳින්වීම',
      'දත්ත නිරූපණය ආශ්‍රිත අභ්‍යාස'
    ]
  },
  {
    id: 'top-g6-23',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 3',
    name: '23. දත්ත අර්ථකථනය',
    description: 'චිත්‍ර ප්‍රස්ථාර සහ සංඛ්‍යාත වගු කියවීමෙන් නිගමනවලට එළඹීම.',
    lessonsCount: 5,
    progress: 0,
    modules: [
      'ප්‍රස්ථාර කියවීම හා තොරතුරු ලබාගැනීම',
      'චිත්‍ර ප්‍රස්ථාර අර්ථකථනය',
      'උපරිම හා අවම අගයන් හඳුනාගැනීම',
      'ප්‍රස්ථාර ආශ්‍රිත ප්‍රශ්න විසඳීම',
      'නිගමනවලට එළඹීම'
    ]
  },
  {
    id: 'top-g6-24',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 3',
    name: '24. දර්ශක',
    description: 'දර්ශක සංකල්පය, බලයක් ලෙස ලිවීම සහ දර්ශක භාවිතයෙන් අගයන් සෙවීම.',
    lessonsCount: 5,
    progress: 0,
    modules: [
      'දර්ශක හා පාදය හඳුනාගැනීම',
      'සංඛ්‍යාවක් බලයක් ලෙස ලිවීම',
      '10 හි බල',
      'දර්ශක සහිත සංඛ්‍යාවල අගය සෙවීම',
      'දර්ශක ආශ්‍රිත ගැටලු'
    ]
  },
  {
    id: 'top-g6-25',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 3',
    name: '25. වර්ගඵලය',
    description: 'තල රූපවල වර්ගඵලය, සම්මත වර්ගඵල ඒකක සහ සෘජුකෝණාස්‍ර හා සමචතුරස්‍රවල වර්ගඵලය සෙවීම.',
    lessonsCount: 5,
    progress: 0,
    modules: [
      'වර්ගඵලය පිළිබඳ සංකල්පය',
      'වර්ග සෙන්ටිමීටර හා වර්ග මීටර',
      'සමචතුරස්‍රයක වර්ගඵලය සෙවීම',
      'සෘජුකෝණාස්‍රයක වර්ගඵලය සෙවීම',
      'වර්ගඵලය ආශ්‍රිත ගැටලු විසඳීම'
    ]
  },
  {
    id: 'top-g6-rev3',
    grade: 'Grade 6',
    subject: 'Mathematics',
    term: 'Unit 3',
    name: 'පුනරීක්ෂණ අභ්‍යාසය 3 වාරය',
    description: 'තුන්වන වාරයේ සියලු ඒකක ආවරණය වන පරිදි සකස් කළ පුනරීක්ෂණ අභ්‍යාස සහ වාර්ෂික විභාග ආදර්ශ ප්‍රශ්න පත්‍ර.',
    lessonsCount: 4,
    progress: 0,
    modules: [
      '18-21 ඒකක පුනරීක්ෂණය',
      '22-25 ඒකක පුනරීක්ෂණය',
      'වාර්ෂික විභාග ආදර්ශ ප්‍රශ්න පත්‍රය 1',
      'වාර්ෂික විභාග ආදර්ශ ප්‍රශ්න පත්‍රය 2'
    ]
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
  { id: 'grd-1', studentId: 'std-1', studentName: 'Kasun Perera', subject: 'Grade 11 (O/L Mathematics)', score: 88, maxScore: 100, grade: 'A', evaluationTag: 'High Achiever', date: '2026-09-30' }
];

// ===== ADDED TODAY: Payment Records Seed Data =====
const initialPayments = [
  { id: 'pay-1', studentId: 'std-1', studentName: 'Kasun Perera', month: 'October 2026', amount: 3500, status: 'Paid', nextDue: '-', slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80', submittedAt: '2026-10-01 10:30 AM', notes: 'Bank transfer receipt attached.' }
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
  } catch (e) { }
};

// ===== UPDATED TODAY: Mock DB Initialization & Sync for Real Student Records =====
const initMockDB = () => {
  // Filter out extra sample students so only Kasun Perera (and manually added new students) exist
  const storedUsers = getStorageItem(STORAGE_KEYS.USERS, null);
  if (!storedUsers || storedUsers.some(u => u.name === 'Nipuni Silva' || u.name === 'Dilshan Fernando' || u.name === 'Amali Fernando' || u.studentId === 'STU-2026-889')) {
    setStorageItem(STORAGE_KEYS.USERS, initialUsers);
  }

  const storedGrades = getStorageItem(STORAGE_KEYS.GRADES, null);
  if (!storedGrades || storedGrades.some(g => g.studentName === 'Nipuni Silva' || g.studentName === 'Dilshan Fernando' || g.remarks)) {
    setStorageItem(STORAGE_KEYS.GRADES, initialGrades);
  }

  const storedPayments = getStorageItem(STORAGE_KEYS.PAYMENTS, null);
  if (!storedPayments || storedPayments.some(p => p.studentName === 'Nipuni Silva' || p.studentName === 'Dilshan Fernando')) {
    setStorageItem(STORAGE_KEYS.PAYMENTS, initialPayments);
  }

  // Ensure zoom links have single class schedule
  const storedZoom = getStorageItem(STORAGE_KEYS.ZOOM, null);
  if (!storedZoom || storedZoom.length !== 1 || storedZoom[0]?.id !== 'zoom-1') {
    setStorageItem(STORAGE_KEYS.ZOOM, initialZoomLinks);
  }

  // Ensure topics are initialized and refreshed
  const storedTopics = getStorageItem(STORAGE_KEYS.TOPICS, null);
  const hasGrade6AllUnits = storedTopics?.some(t => t.grade === 'Grade 6' && t.term === 'Unit 2');
  if (!storedTopics || storedTopics.length === 0 || storedTopics[0]?.lessonsCount !== 10 || !hasGrade6AllUnits) {
    setStorageItem(STORAGE_KEYS.TOPICS, initialTopics);
  }

  if (!localStorage.getItem(STORAGE_KEYS.RECORDINGS)) setStorageItem(STORAGE_KEYS.RECORDINGS, initialRecordings);
  if (!localStorage.getItem(STORAGE_KEYS.TUTORIALS)) setStorageItem(STORAGE_KEYS.TUTORIALS, initialTutorials);
  if (!localStorage.getItem(STORAGE_KEYS.QUIZZES)) setStorageItem(STORAGE_KEYS.QUIZZES, initialQuizzes);
};

initMockDB();

const delay = (ms = 200) => new Promise(res => setTimeout(res, ms));

export const apiService = {
  async login({ email, password, role }) {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      const data = await response.json();
      if (response.ok && data && data.success) {
        return data;
      }
      // If server responded with a normal user validation error (e.g. wrong password), return it
      if (data && data.message && !data.message.includes('Access denied') && !data.message.includes('connect') && response.status !== 500) {
        return data;
      }
    } catch (e) {
      console.warn('Direct Aiven API login fallback:', e.message);
    }

    await delay();
    const query = (email || '').trim().toLowerCase();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const user = users.find(u =>
      (u.email && u.email.toLowerCase() === query) ||
      (u.studentId && u.studentId.toLowerCase() === query) ||
      (u.indexNo && u.indexNo.toLowerCase() === query) ||
      (u.id && u.id.toLowerCase() === query)
    );

    if (user) {
      if (user.password && user.password !== password) {
        return { success: false, message: 'Invalid password. Please check your credentials.' };
      }
      if (role && user.role !== role) {
        return { success: false, message: `This account is registered as a ${user.role}, not ${role}.` };
      }
      return { success: true, user, token: 'mock-jwt-token-' + user.id };
    }

    return { success: false, message: 'No account found with these credentials. Please check your Student ID or email.' };
  },

  // ===== UPDATED TODAY: Student Registration with Dynamic ID & Payment Status =====
  async registerStudent(formData) {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data && data.success) {
        // Also sync into localStorage so offline/cached components stay aligned
        const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
        users.push(data.user);
        setStorageItem(STORAGE_KEYS.USERS, users);
        return data;
      } else if (data && !data.success) {
        return data;
      }
    } catch (e) {
      console.warn('Direct Aiven API register fallback:', e.message);
    }

    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const existing = users.find(u => u.email.toLowerCase() === formData.email.toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email address already exists. Please log in.' };
    }
    const newStudentId = String(users.filter(u => u.role === 'student').length + 1).padStart(4, '0');
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

  async getAdminDashboardStats() {
    await delay();
    return {
      totalStudents: 0
    };
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
    if (!id) return null;
    try {
      const response = await fetch(`/api/student/${encodeURIComponent(id)}`);
      const data = await response.json();
      if (data && data.success && data.student) {
        return data.student;
      }
    } catch (e) {
      console.warn('Direct Aiven API getStudentById fallback:', e.message);
    }

    await delay();
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
    if (!id) return { success: false, message: 'Student ID is required' };
    try {
      const response = await fetch(`/api/student/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const resData = await response.json();
      if (resData && resData.success) {
        const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
        const idx = users.findIndex(u => u.id === id || u.studentId === id || (u.email && u.email.toLowerCase() === String(id).toLowerCase()));
        if (idx !== -1) {
          users[idx] = { ...users[idx], ...data };
          setStorageItem(STORAGE_KEYS.USERS, users);
        }
        return resData;
      }
    } catch (e) {
      console.warn('Direct Aiven API updateStudentProfile fallback:', e.message);
    }

    await delay();
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
      subject: data.subject !== undefined ? data.subject : (current.subject || 'Mathematics'),
      profilePicture: data.profilePicture !== undefined ? data.profilePicture : (current.profilePicture || null)
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
    try {
      const response = await fetch(`/api/topics?grade=${encodeURIComponent(grade || '')}`);
      const data = await response.json();
      if (data && data.success && Array.isArray(data.topics) && data.topics.length > 0) {
        return data.topics;
      }
    } catch (e) {
      console.warn('Direct Aiven API topics fallback:', e.message);
    }

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
    try {
      const response = await fetch(`/api/classes?grade=${encodeURIComponent(grade || '')}`);
      const data = await response.json();
      if (data && data.success && Array.isArray(data.classes) && data.classes.length > 0) {
        return data.classes;
      }
    } catch (e) {
      console.warn('Direct Aiven API classes fallback:', e.message);
    }

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
    try {
      const response = await fetch('/api/zoom');
      const data = await response.json();
      if (data && data.success && Array.isArray(data.links) && data.links.length > 0) {
        return data.links;
      }
    } catch (e) {
      console.warn('Direct Aiven API zoom links fallback:', e.message);
    }

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
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      if (data && data.success && Array.isArray(data.students) && data.students.length > 0) {
        return data.students;
      }
    } catch (e) {
      console.warn('Direct Aiven API getAllStudents fallback:', e.message);
    }

    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    return users.filter(u => u.role === 'student');
  },

  async addStudent(studentData) {
    await delay();
    const users = getStorageItem(STORAGE_KEYS.USERS, initialUsers);
    const newStudentId = String(users.filter(u => u.role === 'student').length + 1).padStart(4, '0');
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
    try {
      const response = await fetch('/api/zoom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const resData = await response.json();
      if (resData && resData.success) {
        const links = getStorageItem(STORAGE_KEYS.ZOOM, initialZoomLinks);
        const newLink = { ...data, id: 'zoom-' + (resData.id || Date.now()) };
        links.unshift(newLink);
        setStorageItem(STORAGE_KEYS.ZOOM, links);
        return { success: true, zoom: newLink };
      }
    } catch (e) {
      console.warn('Direct Aiven API createZoomLink fallback:', e.message);
    }

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
    try {
      const response = await fetch(`/api/zoom/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      const resData = await response.json();
      if (resData && resData.success) {
        let links = getStorageItem(STORAGE_KEYS.ZOOM, initialZoomLinks);
        links = links.filter(l => String(l.id) !== String(id));
        setStorageItem(STORAGE_KEYS.ZOOM, links);
        return { success: true };
      }
    } catch (e) {
      console.warn('Direct Aiven API deleteZoomLink fallback:', e.message);
    }

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
      score: Number(gradeData.score),
      maxScore: Number(gradeData.maxScore) || 100,
      grade: gradeData.grade || 'A',
      evaluationTag: gradeData.evaluationTag || 'On Track',
      date: new Date().toISOString().split('T')[0]
    };
    grades.unshift(newGrade);
    setStorageItem(STORAGE_KEYS.GRADES, grades);
    return { success: true, grade: newGrade };
  }
};
