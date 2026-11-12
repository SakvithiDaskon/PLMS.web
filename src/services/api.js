

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
  { id: 'adm-1', name: 'Sir Parakum Bandara (Admin)', email: 'admin@plms.com', password: 'password123', role: 'admin', phone: '+94 77 000 1122', designation: 'Head Educator & Admin' }
];
const deprecatedMockUsers = [
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
  },

  // ==========================================
  // Grade 7 Topics (Terms 1, 2, and 3 - 29 Chapters + 3 Revision Exercises)
  // ==========================================
  {
    id: 'top-g7-1',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 1',
    name: "01. සමමිතිය (Symmetry)",
    description: "තල රූපවල සමමිතික අක්ෂ හඳුනාගැනීම, ද්විපාර්ශ්වික සමමිතිය සහ සමමිතික රටා නිර්මාණය.",
    lessonsCount: 6,
    progress: 100,
    completedModules: [0,1,2,3,4,5],
    modules: ["01. සමමිතිය හැඳින්වීම සහ සමමිතික රූප","02. සමමිතික අක්ෂ හඳුනාගැනීම","03. තල රූපවල සමමිතික අක්ෂ ඇඳීම","04. ද්විපාර්ශ්වික සමමිතිය","05. ආදර්ශ ගැටලු හා පියවරෙන් පියවර විසඳුම්","06. අභ්‍යාස හා කෙටි ප්‍රශ්නාවලිය"]
  },
  {
    id: 'top-g7-2',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 1',
    name: "02. කුලක (Sets)",
    description: "කුලක සංකල්පය, කුලකයක අවයව, සර්වත්‍ර කුලකය, උපකුලක සහ වෙන් රූප සටහන් මගින් නිරූපණය.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. කුලක පිළිබඳ මූලික හැඳින්වීම","02. කුලකයක අවයව හා නිරූපණය","03. සර්වත්‍ර කුලකය සහ උපකුලක","04. වෙන් රූප සටහන් මගින් කුලක දැක්වීම","05. ආදර්ශ ගැටලු විසඳීම","06. කුලක ආශ්‍රිත අභ්‍යාස හා කෙටි පරීක්ෂණය"]
  },
  {
    id: 'top-g7-3',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 1',
    name: "03. පූර්ණ සංඛ්‍යා මත ගණිත කර්ම (Operations on Whole Numbers)",
    description: "පූර්ණ සංඛ්‍යා එකතු කිරීම, අඩු කිරීම, ගුණ කිරීම, බෙදීම සහ BODMAS ගණිත කර්ම නීති.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. පූර්ණ සංඛ්‍යා එකතු කිරීම හා අඩු කිරීම","02. පූර්ණ සංඛ්‍යා ගුණ කිරීම හා බෙදීම","03. ගණිත කර්මවල ක්‍රම රීතිය - BODMAS","04. ආශ්‍රන, පරිවර්ත්‍ය හා බෙදුම් නීති","05. සංකීර්ණ ආදර්ශ ගැටලු විසඳීම","06. මිශ්‍ර අභ්‍යාස හා ඇගයීම් පරීක්ෂණය"]
  },
  {
    id: 'top-g7-4',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 1',
    name: "04. සාධක හා ගුණාකාර (Factors and Multiples)",
    description: "ප්‍රථමක සාධක, බෙදීමේ නීති, කුඩාම පොදු ගුණාකාරය (කු.පො.ගු.) සහ විශාලතම පොදු සාධකය (වි.පො.සා.).",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. සංඛ්‍යාවක සාධක සහ ප්‍රථමක සාධක","02. ගුණාකාර සහ ප්‍රථමක සංඛ්‍යා","03. බෙදීමේ නීති (2, 3, 4, 5, 6, 9, 10)","04. කුඩාම පොදු ගුණාකාරය (කු.පො.ගු.) සෙවීම","05. විශාලතම පොදු සාධකය (වි.පො.සා.) සෙවීම","06. ගැටලු විසඳීම හා ඇගයීම"]
  },
  {
    id: 'top-g7-5',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 1',
    name: "05. දර්ශක (Indices)",
    description: "දර්ශක හා පාදය, බලයක් ලෙස ලිවීම, අගය සෙවීම සහ 10 හි බල භාවිතය.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. දර්ශක හා පාදය පිළිබඳ මූලික සංකල්ප","02. සංඛ්‍යාවක් බලයක් ලෙස ලිවීම","03. දර්ශක සහිත සංඛ්‍යාවල අගය සෙවීම","04. 10 හි බල හා විද්‍යාත්මක ආකාරය","05. ආදර්ශ ගැටලු විවරණය","06. පාඩම් අභ්‍යාස හා කෙටි ප්‍රශ්නාවලිය"]
  },
  {
    id: 'top-g7-6',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 1',
    name: "06. කාලය (Time)",
    description: "පැය 12 හා පැය 24 ඔරලෝසු වේලාව, කාල පරාස ගණනය, කාල මිනුම් එකතු කිරීම හා අඩු කිරීම.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. වේලාව කියවීම හා සම්මත ඒකක","02. පැය 12 හා පැය 24 ඔරලෝසු අතර පරිවර්තනය","03. කාල පරාස ගණනය කිරීම","04. කාල මිනුම් එකතු කිරීම හා අඩු කිරීම","05. කාලය ආශ්‍රිත ප්‍රායෝගික ගැටලු","06. පුනරීක්ෂණ අභ්‍යාස හා ඇගයීම"]
  },
  {
    id: 'top-g7-7',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 1',
    name: "07. සමාන්තර සරල රේඛා (Parallel Straight Lines)",
    description: "සමාන්තර රේඛා සහ තිරස්ක් ඡේදකයකින් සෑදෙන ඒකාන්තර, අනුරූප හා මිත්‍ර කෝණ.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. සමාන්තර සරල රේඛා හඳුනාගැනීම","02. තිරස්ක් ඡේදකයක් මගින් සෑදෙන කෝණ","03. ඒකාන්තර කෝණ හඳුනාගැනීම හා ගණනය","04. අනුරූප කෝණ හඳුනාගැනීම හා ගණනය","05. මිත්‍ර කෝණ සහ ඒවායේ සම්බන්ධතා","06. ජ්‍යාමිතික ගැටලු විසඳීම හා පරීක්ෂණය"]
  },
  {
    id: 'top-g7-8',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 1',
    name: "08. දිශානුගත සංඛ්‍යා (Directed Numbers)",
    description: "ධන හා ඍණ සංඛ්‍යා, සංඛ්‍යා රේඛාවේ නිරූපණය, සංසන්දනය සහ එකතු කිරීම හා අඩු කිරීම.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. ධන හා ඍණ සංඛ්‍යා පිළිබඳ හැඳින්වීම","02. සංඛ්‍යා රේඛාව මත දිශානුගත සංඛ්‍යා නිරූපණය","03. දිශානුගත සංඛ්‍යා සංසන්දනය","04. දිශානුගත සංඛ්‍යා එකතු කිරීම","05. දිශානුගත සංඛ්‍යා අඩු කිරීම","06. ගැටලු විසඳීම හා කෙටි ප්‍රශ්නාවලිය"]
  },
  {
    id: 'top-g7-9',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 1',
    name: "09. කෝණ (Angles)",
    description: "කෝණ මැනීම, සරල රේඛාවක් මත බද්ධ කෝණ, ලක්ෂ්‍යයක් වටා කෝණ සහ ප්‍රතිමුඛ කෝණ.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. කෝණ වර්ග සහ ඒවායේ ලක්ෂණ","02. කෝණමානය භාවිතයෙන් කෝණ මැනීම","03. සරල රේඛාවක් මත පිහිටි බද්ධ කෝණ","04. ලක්ෂ්‍යයක් වටා කෝණ","05. ප්‍රතිමුඛ කෝණ","06. කෝණ ආශ්‍රිත ගණනය කිරීම් හා ඇගයීම"]
  },
  {
    id: 'top-g7-10',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 1',
    name: "පුනරීක්ෂණ අභ්‍යාසය 01 (Revision Exercise 01)",
    description: "පළමු වාරයේ 01 සිට 09 දක්වා සියලු පාඩම් ආවරණය වන පුනරීක්ෂණ අභ්‍යාස හා ආදර්ශ ප්‍රශ්න පත්‍රය.",
    lessonsCount: 4,
    progress: 0,
    completedModules: [],
    modules: ["01. 1-3 පාඩම් පුනරීක්ෂණය","02. 4-6 පාඩම් පුනරීක්ෂණය","03. 7-9 පාඩම් පුනරීක්ෂණය","04. පළමු වාර විභාග ආදර්ශ ප්‍රශ්න පත්‍රය"]
  },
  {
    id: 'top-g7-11',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 2',
    name: "10. භාග (Fractions)",
    description: "විෂම භාග, මිශ්‍ර සංඛ්‍යා, තුල්‍ය භාග, සංසන්දනය සහ භාග ගණිත කර්ම.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. විෂම භාග හා මිශ්‍ර සංඛ්‍යා","02. තුල්‍ය භාග හා සරල කිරීම","03. භාග සංසන්දනය හා පෙළගැස්වීම","04. භාග එකතු කිරීම හා අඩු කිරීම","05. භාග ගුණ කිරීම හා බෙදීම","06. ප්‍රායෝගික භාග ගැටලු විසඳීම"]
  },
  {
    id: 'top-g7-12',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 2',
    name: "11. දශම (Decimals)",
    description: "දශමවල ස්ථානීය අගය, භාග-දශම පරිවර්තනය, සංසන්දනය සහ ගුණ කිරීම හා බෙදීම.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. දශම සංඛ්‍යාවල ස්ථානීය අගය","02. භාග සහ දශම අතර පරිවර්තනය","03. දශම සංඛ්‍යා සංසන්දනය","04. දශම සංඛ්‍යා එකතු කිරීම හා අඩු කිරීම","05. 10, 100, 1000 න් දශම ගුණ කිරීම හා බෙදීම","06. දශම ආශ්‍රිත ගණිත ගැටලු හා ඇගයීම"]
  },
  {
    id: 'top-g7-13',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 2',
    name: "12. වීජීය ප්‍රකාශන (Algebraic Expressions)",
    description: "වීජීය සංකේත, සරල වීජීය ප්‍රකාශන ගොඩනැගීම, සජාතීය පද සහ අගයන් ආදේශය.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. වීජීය සංකේත හා විචල්‍ය හැඳින්වීම","02. සරල වීජීය ප්‍රකාශන ගොඩනැගීම","03. වීජීය ප්‍රකාශනයක පද හා සංගුණක","04. සජාතීය පද එකතු කිරීම හා අඩු කිරීම","05. වීජීය ප්‍රකාශනවලට අගයන් ආදේශය","06. අභ්‍යාස හා ඇගයීම් ප්‍රශ්නාවලිය"]
  },
  {
    id: 'top-g7-14',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 2',
    name: "13. ස්කන්ධය (Mass)",
    description: "ග්‍රෑම් (g), කිලෝග්‍රෑම් (kg), මෙට්‍රික් ටොන් (t) ඒකක, පරිවර්තනය සහ ස්කන්ධ ගණනය කිරීම්.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. ස්කන්ධය මැනීමේ සම්මත ඒකක - g, kg","02. මෙට්‍රික් ටොන් (t) හැඳින්වීම","03. ස්කන්ධ ඒකක අතර සම්බන්ධතා හා පරිවර්තනය","04. ස්කන්ධ මිනුම් එකතු කිරීම හා අඩු කිරීම","05. ස්කන්ධය සම්බන්ධ ව්‍යවහාරික ගැටලු","06. කෙටි පරීක්ෂණය හා ඇගයීම"]
  },
  {
    id: 'top-g7-15',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 2',
    name: "14. සරල රේඛීය තල රූප (Rectilinear Plane Figures)",
    description: "ත්‍රිකෝණ හා චතුරස්‍ර වර්ගීකරණය, ඒවායේ ලක්ෂණ සහ බහුඅස්‍ර හැඳින්වීම.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. සරල රේඛීය තල රූප වර්ගීකරණය","02. ත්‍රිකෝණ වර්ග සහ ඒවායේ ලක්ෂණ","03. චතුරස්‍ර වර්ග සහ ලක්ෂණ","04. බහුඅස්‍ර පිළිබඳ මූලික හැඳින්වීම","05. ආදර්ශ ජ්‍යාමිතික ගැටලු","06. පාඩම් අභ්‍යාස හා ඇගයීම් ප්‍රශ්නාවලිය"]
  },
  {
    id: 'top-g7-16',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 2',
    name: "15. සමීකරණ සහ සූත්‍ර (Equations and Formulae)",
    description: "තනි විචල්‍යයක් සහිත සරල සමීකරණ විසඳීම, සමීකරණ ගොඩනැගීම සහ සූත්‍රවලට ආදේශය.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. සරල සමීකරණ පිළිබඳ මූලික හැඳින්වීම","02. තනි විචල්‍යයක් සහිත සරල සමීකරණ විසඳීම","03. පියවර දෙකකින් සමීකරණ විසඳීම","04. ගණිත ගැටලුවකින් සමීකරණ ගොඩනැගීම","05. සරල සූත්‍ර හැඳින්වීම සහ ආදේශය","06. සමීකරණ අභ්‍යාස හා පරීක්ෂණය"]
  },
  {
    id: 'top-g7-17',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 2',
    name: "16. දිග (Length)",
    description: "දිග මැනීමේ සම්මත ඒකක (mm, cm, m, km), පරිවර්තනය සහ සරල රේඛීය තල රූපවල පරිමිතිය.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. දිග මැනීමේ සම්මත ඒකක","02. දිග ඒකක අතර පරිවර්තනය","03. පරිමිතිය පිළිබඳ මූලික සංකල්පය","04. සරල රේඛීය තල රූපවල පරිමිතිය සෙවීම","05. ප්‍රායෝගික දිග හා පරිමිති ගැටලු","06. ඇගයීම් අභ්‍යාස හා කෙටි ප්‍රශ්නාවලිය"]
  },
  {
    id: 'top-g7-18',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 2',
    name: "17. වර්ගඵලය (Area)",
    description: "වර්ගඵලය සංකල්පය, සම්මත ඒකක (cm², m²), සමචතුරස්‍ර හා සෘජුකෝණාස්‍රවල වර්ගඵලය.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. වර්ගඵලය පිළිබඳ මූලික සංකල්පය","02. සම්මත වර්ගඵල ඒකක (cm², m²)","03. සමචතුරස්‍රයක වර්ගඵලය සෙවීම","04. සෘජුකෝණාස්‍රයක වර්ගඵලය සෙවීම","05. සංයුක්ත තල රූපවල වර්ගඵලය","06. වර්ගඵලය ආශ්‍රිත ප්‍රායෝගික ගැටලු"]
  },
  {
    id: 'top-g7-19',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 2',
    name: "18. වෘත්ත (Circles)",
    description: "කේන්ද්‍රය, අරය, විෂ්කම්භය, ජ්‍යාය, චාපය, කවකටුව භාවිතයෙන් වෘත්ත ඇඳීම සහ කේන්ද්‍රික ඛණ්ඩ.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. වෘත්තයක මූලික අංග (කේන්ද්‍රය, අරය, විෂ්කම්භය)","02. ජ්‍යාය සහ චාපය හඳුනාගැනීම","03. කවකටුව භාවිතයෙන් වෘත්ත ඇඳීම","04. වෘත්ත කේන්ද්‍රික ඛණ්ඩ හා වෘත්ත ඛණ්ඩ","05. වෘත්ත ආශ්‍රිත රටා සහ නිර්මාණ","06. අභ්‍යාස හා කෙටි ප්‍රශ්නාවලිය"]
  },
  {
    id: 'top-g7-20',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 2',
    name: "19. පරිමාව (Volume)",
    description: "පරිමාව පිළිබඳ සංකල්පය, සම්මත ඒකක (cm³, m³), ඝනකයක හා ඝනකාභයක පරිමාව සෙවීම.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. පරිමාව පිළිබඳ මූලික හැඳින්වීම","02. පරිමාව මැනීමේ සම්මත ඒකක (cm³, m³)","03. ඝනකයක පරිමාව සෙවීම","04. ඝනකාභයක පරිමාව සෙවීම","05. පරිමාව ආශ්‍රිත ආදර්ශ ගැටලු","06. පාඩම් අභ්‍යාස හා ඇගයීම"]
  },
  {
    id: 'top-g7-21',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 2',
    name: "20. ද්‍රව මිනුම් (Liquid Measurements)",
    description: "මිලිලීටර (ml) හා ලීටර (l), cm³ සහ ml අතර සම්බන්ධය සහ භාජනවල ධාරිතාව ගණනය.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. ධාරිතාව හා ද්‍රව මිනුම් ඒකක (ml, l)","02. cm³ සහ ml අතර සම්බන්ධතාව","03. ද්‍රව මිනුම් එකතු කිරීම හා අඩු කිරීම","04. භාජනයක ධාරිතාව ගණනය කිරීම","05. ද්‍රව මිනුම් ආශ්‍රිත ව්‍යවහාරික ගැටලු","06. පුනරීක්ෂණ අභ්‍යාස හා කෙටි පරීක්ෂණය"]
  },
  {
    id: 'top-g7-22',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 2',
    name: "පුනරීක්ෂණ අභ්‍යාසය 02 (Revision Exercise 02)",
    description: "දෙවන වාරයේ 10 සිට 20 දක්වා සියලු පාඩම් ආවරණය වන පුනරීක්ෂණ අභ්‍යාස හා ආදර්ශ ප්‍රශ්න පත්‍රය.",
    lessonsCount: 4,
    progress: 0,
    completedModules: [],
    modules: ["01. 10-13 පාඩම් පුනරීක්ෂණය","02. 14-17 පාඩම් පුනරීක්ෂණය","03. 18-20 පාඩම් පුනරීක්ෂණය","04. දෙවන වාර විභාග ආදර්ශ ප්‍රශ්න පත්‍රය"]
  },
  {
    id: 'top-g7-23',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 3',
    name: "21. අනුපාත (Ratios)",
    description: "අනුපාතය සංකල්පය, තුල්‍ය අනුපාත, ප්‍රමාණයක් දී ඇති අනුපාතයකට බෙදීම සහ ත්‍රෛරාශික ගැටලු.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. අනුපාතය පිළිබඳ මූලික හැඳින්වීම","02. තුල්‍ය අනුපාත හා සරලතම ආකාරය","03. ප්‍රමාණයක් දී ඇති අනුපාතයකට බෙදීම","04. අනුපාත තුනක් සංසන්දනය කිරීම","05. අනුපාත ආශ්‍රිත ප්‍රායෝගික ගැටලු","06. අභ්‍යාස හා ඇගයීම් පරීක්ෂණය"]
  },
  {
    id: 'top-g7-24',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 3',
    name: "22. ප්‍රතිශත (Percentages)",
    description: "ප්‍රතිශත සංකල්පය, භාග-දශම-ප්‍රතිශත පරිවර්තනය සහ ප්‍රමාණයක ප්‍රතිශතය සෙවීම.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. ප්‍රතිශත පිළිබඳ මූලික සංකල්පය","02. භාග සහ දශම ප්‍රතිශත බවට හැරවීම","03. ප්‍රතිශත භාග බවට හැරවීම","04. ප්‍රමාණයක ප්‍රතිශතය සෙවීම","05. ප්‍රතිශත ආශ්‍රිත ප්‍රායෝගික ගැටලු","06. කෙටි ප්‍රශ්නාවලිය හා ඇගයීම"]
  },
  {
    id: 'top-g7-25',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 3',
    name: "23. කාටීසීය තලය (Cartesian Plane)",
    description: "ඛණ්ඩාංක අක්ෂ, පළමු පාදයේ ලක්ෂ්‍ය ලකුණු කිරීම, ඛණ්ඩාංක කියවීම සහ තලයේ රූප ඇඳීම.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. කාටීසීය තලය සහ ඛණ්ඩාංක අක්ෂ","02. පළමු පාදයේ ලක්ෂ්‍ය ලකුණු කිරීම","03. ලක්ෂ්‍යයක ඛණ්ඩාංක කියවීම","04. කාටීසීය තලයේ රූප ඇඳීම","05. ආදර්ශ ගැටලු පියවරෙන් පියවර","06. අභ්‍යාස හා ඇගයීම් පරීක්ෂණය"]
  },
  {
    id: 'top-g7-26',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 3',
    name: "24. සරල රේඛීය තල රූප නිර්මාණය (Construction of Rectilinear Plane Figures)",
    description: "ජ්‍යාමිතික උපකරණ භාවිතය, රේඛා ඛණ්ඩ, කෝණ, ත්‍රිකෝණ, සෘජුකෝණාස්‍ර හා සමචතුරස්‍ර නිර්මාණය.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. ජ්‍යාමිතික උපකරණ නිවැරදිව භාවිතය","02. දී ඇති දිගකින් යුත් සරල රේඛා ඛණ්ඩ නිර්මාණය","03. කෝණමානය හා කවකටුවෙන් කෝණ නිර්මාණය","04. ත්‍රිකෝණ නිර්මාණය කිරීම","05. සෘජුකෝණාස්‍ර හා සමචතුරස්‍ර නිර්මාණය","06. ජ්‍යාමිතික නිර්මාණ අභ්‍යාස හා ඇගයීම"]
  },
  {
    id: 'top-g7-27',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 3',
    name: "25. ඝන වස්තු (Solids)",
    description: "ඝන වස්තුවල මුහුණත්, දාර, ශීර්ෂ, ප්ලේටෝනික ඝන වස්තු සහ ඝනක, ඝනකාභ, ප්‍රිස්ම, පිරමිඩවල දැල.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. ඝන වස්තු හඳුනාගැනීම හා වර්ගීකරණය","02. ඝන වස්තුවල මුහුණත්, දාර හා ශීර්ෂ","03. ප්ලේටෝනික ඝන වස්තු හැඳින්වීම","04. ඝනක හා ඝනකාභවල දැල","05. ප්‍රිස්ම සහ පිරමිඩවල දැල","06. පාඩම් අභ්‍යාස හා කෙටි පරීක්ෂණය"]
  },
  {
    id: 'top-g7-28',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 3',
    name: "26. දත්ත නිරූපණය හා අර්ථකථනය (Data Representation and Interpretation)",
    description: "ප්‍රවාරණ සටහන්, සංඛ්‍යාත වගු, චිත්‍ර ප්‍රස්ථාර, තීරු ප්‍රස්ථාර නිර්මාණය සහ නිගමන ලබාගැනීම.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. දත්ත රැස් කිරීම සහ වර්ගීකරණය","02. ප්‍රවාරණ සටහන් සහ සංඛ්‍යාත වගු","03. චිත්‍ර ප්‍රස්ථාර නිර්මාණය හා කියවීම","04. තීරු ප්‍රස්ථාර නිර්මාණය","05. ප්‍රස්ථාරවලින් නිගමනවලට එළඹීම","06. දත්ත ආශ්‍රිත ප්‍රායෝගික අභ්‍යාස හා ඇගයීම"]
  },
  {
    id: 'top-g7-29',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 3',
    name: "27. පරිමාණ රූප (Scale Diagrams)",
    description: "පරිමාණ රූප සංකල්පය, පරිමාණය තේරුම් ගැනීම, සැබෑ දිග සෙවීම සහ පරිමාණ රූප ඇඳීම.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. පරිමාණ රූප පිළිබඳ මූලික සංකල්පය","02. පරිමාණය තේරුම් ගැනීම හා ලිවීම","03. පරිමාණ රූපයක සැබෑ දිග සෙවීම","04. සැබෑ දිග පරිමාණ රූපයකට ඇඳීම","05. පරිමාණ රූප ආශ්‍රිත ප්‍රායෝගික ගැටලු","06. පාඩම් අභ්‍යාස හා කෙටි පරීක්ෂණය"]
  },
  {
    id: 'top-g7-30',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 3',
    name: "28. ටෙසලාකරණය (Tessellation)",
    description: "ටෙසලාකරණය සංකල්පය, සුෂම බහුඅස්‍ර මගින් ටෙසලාකරණය සහ රටා නිර්මාණය.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. ටෙසලාකරණය පිළිබඳ මූලික හැඳින්වීම","02. සුෂම බහුඅස්‍ර මගින් ටෙසලාකරණය","03. විවිධ තල රූප භාවිතයෙන් ටෙසලාකරණ රටා","04. ස්වභාවධර්මයේ හා නිර්මාණවල ටෙසලාකරණය","05. ටෙසලාකරණ රටා නිර්මාණය කිරීම","06. අභ්‍යාස හා කෙටි ප්‍රශ්නාවලිය"]
  },
  {
    id: 'top-g7-31',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 3',
    name: "29. සිදුවීමක් සිදුවීමේ විය හැකියාව (Likelihood of an Event Occurring)",
    description: "නිසැක, විය නොහැකි හා විය හැකි සිදුවීම්, සම සම්භාවිත සිදුවීම් සහ විය හැකියාව ඇගයීම.",
    lessonsCount: 6,
    progress: 0,
    completedModules: [],
    modules: ["01. විය හැකියාව පිළිබඳ මූලික සංකල්ප","02. නිසැක, විය නොහැකි සහ විය හැකි සිදුවීම්","03. සම සම්භාවිත සිදුවීම්","04. සරල අත්හදා බැලීම් හා ප්‍රතිඵල","05. සංඛ්‍යාත්මකව විය හැකියාව ඇගයීම","06. ආදර්ශ ගැටලු, අභ්‍යාස හා ඇගයීම"]
  },
  {
    id: 'top-g7-32',
    grade: 'Grade 7',
    subject: 'Mathematics',
    term: 'Term 3',
    name: "පුනරීක්ෂණ අභ්‍යාසය 03 (Revision Exercise 03)",
    description: "තුන්වන වාරයේ 21 සිට 29 දක්වා සියලු පාඩම් ආවරණය වන පුනරීක්ෂණ අභ්‍යාස හා වාර්ෂික විභාග ආදර්ශ ප්‍රශ්න පත්‍රය.",
    lessonsCount: 4,
    progress: 0,
    completedModules: [],
    modules: ["01. 21-24 පාඩම් පුනරීක්ෂණය","02. 25-27 පාඩම් පුනරීක්ෂණය","03. 28-29 පාඩම් පුනරීක්ෂණය","04. වාර්ෂික විභාග ආදර්ශ ප්‍රශ්න පත්‍රය"]
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


const getAuthHeaders = () => {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('plms_auth_token') : null;
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const apiService = {
  async getMe() {
    try {
      const response = await fetch('/api/me', {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (response.ok && data && data.success && data.user) {
        return data;
      }
      return { success: false, message: data?.message || 'Authentication session expired' };
    } catch (e) {
      console.warn('API getMe error:', e.message);
      return { success: false, message: e.message };
    }
  },
  async login({ email, password, role }) {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      const data = await response.json();
      if (response.ok && data && data.success) {
        if (data.token && typeof localStorage !== 'undefined') {
          localStorage.setItem('plms_auth_token', data.token);
          localStorage.setItem('plms_auth_user', JSON.stringify(data.user));
        }
        return data;
      }
      if (data && data.message) {
        return { success: false, message: data.message };
      }
      return { success: false, message: 'Invalid credentials. Please try again.' };
    } catch (e) {
      console.error('API login failed:', e.message);
      return { success: false, message: 'Failed to connect to authentication server. Please check your network.' };
    }
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
      if (response.ok && data && data.success) {
        if (data.token && typeof localStorage !== 'undefined') {
          localStorage.setItem('plms_auth_token', data.token);
          localStorage.setItem('plms_auth_user', JSON.stringify(data.user));
        }
        return data;
      }
      if (data && data.message) {
        return { success: false, message: data.message };
      }
      return { success: false, message: 'Registration failed. Please try again.' };
    } catch (e) {
      console.error('API register error:', e.message);
      return { success: false, message: 'Failed to connect to registration server. Please try again.' };
    }
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
      const response = await fetch(`/api/student/${encodeURIComponent(id)}`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (response.ok && data && data.success && data.student) {
        return data.student;
      }
    } catch (e) {
      console.warn('API getStudentById error:', e.message);
    }
    if (typeof localStorage !== 'undefined') {
      const authUser = localStorage.getItem('plms_auth_user');
      if (authUser) {
        try {
          const parsed = JSON.parse(authUser);
          if (parsed && (parsed.id === id || parsed.userId === id || parsed.studentId === id || id === 'me')) {
            return parsed;
          }
        } catch (_) {}
      }
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
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      const resData = await response.json();
      if (response.ok && resData && resData.success) {
        if (typeof localStorage !== 'undefined' && resData.student) {
          const authUser = localStorage.getItem('plms_auth_user');
          if (authUser) {
            try {
              const parsed = JSON.parse(authUser);
              const merged = { ...parsed, ...resData.student };
              localStorage.setItem('plms_auth_user', JSON.stringify(merged));
            } catch (_) {}
          }
        }
        return resData;
      }
      return { success: false, message: resData?.message || 'Could not update profile' };
    } catch (e) {
      console.error('API updateStudentProfile error:', e.message);
      return { success: false, message: 'Failed to connect to server.' };
    }
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
      const response = await fetch(`/api/classes?grade=${encodeURIComponent(grade || '')}`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (response.ok && data && data.success && Array.isArray(data.classes)) {
        return data.classes;
      }
    } catch (e) {
      console.warn('API classes error:', e.message);
    }
    return [];
  },

  async getZoomLinks(grade = '') {
    try {
      const response = await fetch(`/api/zoom?grade=${encodeURIComponent(grade || '')}`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      if (response.ok && data && data.success && Array.isArray(data.links)) {
        return data.links;
      }
    } catch (e) {
      console.warn('API zoom links error:', e.message);
    }
    return [];
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
