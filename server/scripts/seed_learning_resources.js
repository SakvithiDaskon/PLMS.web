import { getPool } from '../config/db.js';

export async function seedLearningResources() {
  const pool = getPool();
  console.log('Seeding initial learning resources for Grade 6 and Grade 7...');

  // Clear existing seed resources to avoid duplication
  await pool.query('DELETE FROM lesson_recordings');
  await pool.query('DELETE FROM lesson_tutorials');
  await pool.query('DELETE FROM lesson_notes');
  await pool.query('DELETE FROM lesson_youtube_recommendations');
  await pool.query('DELETE FROM lesson_quizzes');
  await pool.query('DELETE FROM student_teacher_messages');

  // ==============================================================
  // 1. Grade 6 Resources (Topic 69: 01. වෘත්ත)
  // ==============================================================
  const g6TopicId = 69;
  const g6LessonTitle = 'වෘත්තාකාර හැඩ ඇති ද්‍රව්‍ය හඳුනාගැනීම';

  // Grade 6 Recording
  await pool.query(`
    INSERT INTO lesson_recordings (grade, subject, topic_id, lesson_index, lesson_title, title, video_url, teacher_name, duration, recording_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `, [
    'Grade 6',
    'Mathematics',
    g6TopicId,
    0,
    g6LessonTitle,
    '01. වෘත්තාකාර හැඩ ඇති ද්‍රව්‍ය හඳුනාගැනීම (Theory & Worked Examples)',
    'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    'Sir Parakum Bandara',
    '42 mins',
    '2026-10-15'
  ]);

  // Grade 6 Tutorial
  await pool.query(`
    INSERT INTO lesson_tutorials (grade, subject, topic_id, lesson_index, lesson_title, title, description, file_url, file_type, teacher_name)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `, [
    'Grade 6',
    'Mathematics',
    g6TopicId,
    0,
    g6LessonTitle,
    'Grade 6 Mathematics: Circles Module 01 Practice Tutorial',
    'Comprehensive step-by-step student practice tutorial covering identifying circular shapes in the environment, circumference, radius, and diameter with worked examples.',
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    'PDF',
    'Sir Parakum Bandara'
  ]);

  // Grade 6 Notes
  await pool.query(`
    INSERT INTO lesson_notes (grade, subject, topic_id, lesson_index, lesson_title, title, content, pdf_url, teacher_name)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `, [
    'Grade 6',
    'Mathematics',
    g6TopicId,
    0,
    g6LessonTitle,
    '01 වන පාඩම: වෘත්තාකාර හැඩ හා මූලික ගුණාංග සටහන',
    `### 01. වෘත්තාකාර හැඩ ඇති ද්‍රව්‍ය හඳුනාගැනීම

#### හැඳින්වීම
අප අවට පරිසරයේ විවිධ හැඩ ඇති ද්‍රව්‍ය හමුවේ. ඒවා අතරින් රවුම් හැඩැති ද්‍රව්‍ය **වෘත්තාකාර හැඩැති ද්‍රව්‍ය** ලෙස හඳුන්වයි.

#### උදාහරණ:
- කාසි (Coins)
- බයිසිකල් රෝද (Bicycle wheels)
- බිත්ති ඔරලෝසු (Wall clocks)
- තැටි හා පිඟන් (Plates)

#### වෘත්තයක ප්‍රධාන අංග:
1. **කේන්ද්‍රය (Center):** වෘත්තයක මැද පිහිටි ස්ථාවර ලක්ෂ්‍යය.
2. **අරය (Radius - $r$):** කේන්ද්‍රයේ සිට වෘත්තය මත ලක්ෂ්‍යයකට ඇති දුර.
3. **විෂ්කම්භය (Diameter - $d$):** කේන්ද්‍රය හරහා ගමන් කරමින් වෘත්තය මත ලක්ෂ්‍ය දෙකක් යා කරන සරල රේඛාව.
4. **පරිධිය (Circumference - $C$):** වෘත්තය වටා ඇති සම්පූර්ණ මායිමේ දිග.

#### වැදගත් සූත්‍ර:
- අරය හා විෂ්කම්භය අතර සම්බන්ධය:
  $$d = 2r$$
  $$r = \\frac{d}{2}$$
- පරිධිය ගණනය කිරීම:
  $$C = 2\\pi r = \\pi d$$

> **මතක තබාගන්න:** ඕනෑම වෘත්තයක විෂ්කම්භය එහි අරය මෙන් දෙගුණයකි. කේන්ද්‍රයේ සිට පරිධිය මත ඕනෑම ලක්ෂ්‍යයකට ඇති දුර සමාන වේ.`,
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    'Sir Parakum Bandara'
  ]);

  // Grade 6 YouTube Recommendations
  await pool.query(`
    INSERT INTO lesson_youtube_recommendations (grade, subject, topic_id, lesson_index, lesson_title, title, youtube_url, channel_name, description, thumbnail_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?),
           (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `, [
    'Grade 6',
    'Mathematics',
    g6TopicId,
    0,
    g6LessonTitle,
    'Grade 6 Mathematics - Circles (වෘත්ත) - Lesson 01 Video Lesson',
    'https://www.youtube.com/watch?v=4y_v1mB9i70',
    'National Institute of Education (NIE)',
    'Official educational broadcast explaining circular objects, center, diameter, and radius for Sri Lankan Grade 6 students.',
    'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80',

    'Grade 6',
    'Mathematics',
    g6TopicId,
    0,
    g6LessonTitle,
    '6 ශ්‍රේණිය ගණිතය - 01 පාඩම වෘත්ත (Circles Sinhala Medium)',
    'https://www.youtube.com/watch?v=0wCC3aVudGQ',
    'e-Thaksalawa Learning Hub',
    'Interactive classroom presentation covering circles and practical activities from the national textbook.',
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80'
  ]);

  // Grade 6 Quiz
  const g6Questions = [
    {
      id: 1,
      type: 'mcq',
      questionText: 'වෘත්තයක කේන්ද්‍රයේ සිට එහි පරිධිය මත ලක්ෂ්‍යයකට ඇති දුර හඳුන්වන්නේ කුමන නමකින්ද?',
      options: ['විෂ්කම්භය', 'අරය', 'ජ්‍යාය', 'පරිධිය'],
      correctAnswer: 1,
      explanation: 'කේන්ද්‍රයේ සිට වෘත්තය මත ඕනෑම ලක්ෂ්‍යයකට ඇති දුර අරය (Radius) නම් වේ.',
      marks: 20
    },
    {
      id: 2,
      type: 'mcq',
      questionText: 'අරය 7 cm වන වෘත්තයක විෂ්කම්භය කොපමණද?',
      options: ['3.5 cm', '7 cm', '14 cm', '21 cm'],
      correctAnswer: 2,
      explanation: 'විෂ්කම්භය = 2 × අරය = 2 × 7 cm = 14 cm.',
      marks: 20
    },
    {
      id: 3,
      type: 'true_false',
      questionText: 'වෘත්තයක සියලුම අරයන් එකම දිගකින් යුක්ත වේ.',
      options: ['සත්‍ය (True)', 'අසත්‍ය (False)'],
      correctAnswer: 0,
      explanation: 'එකම වෘත්තයක කේන්ද්‍රයේ සිට පරිධිය මත ඕනෑම ලක්ෂ්‍යයකට ඇති දුර සැමවිටම සමාන වේ.',
      marks: 20
    },
    {
      id: 4,
      type: 'mcq',
      questionText: 'පහත දැක්වෙන ද්‍රව්‍ය අතුරින් වෘත්තාකාර හැඩයක් නොගන්නේ කුමක්ද?',
      options: ['කාසිය', 'බයිසිකල් රෝදය', 'ත්‍රිකෝණාකාර කොඩිය', 'බිත්ති ඔරලෝසු මුහුණත'],
      correctAnswer: 2,
      explanation: 'ත්‍රිකෝණාකාර කොඩිය සරල රේඛීය තල රූපයකි, එය වෘත්තාකාර නොවේ.',
      marks: 20
    },
    {
      id: 5,
      type: 'mcq',
      questionText: 'විෂ්කම්භය 18 cm වන වෘත්තයක අරය කොපමණද?',
      options: ['9 cm', '18 cm', '36 cm', '4.5 cm'],
      correctAnswer: 0,
      explanation: 'අරය = විෂ්කම්භය ÷ 2 = 18 ÷ 2 = 9 cm.',
      marks: 20
    }
  ];

  await pool.query(`
    INSERT INTO lesson_quizzes (grade, subject, topic_id, lesson_index, lesson_title, title, instructions, duration_minutes, total_marks, questions)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `, [
    'Grade 6',
    'Mathematics',
    g6TopicId,
    0,
    g6LessonTitle,
    'වෘත්ත 01 පාඩම - ඇගයීම් කෙටි පරීක්ෂණය (Grade 6 Circles Quiz)',
    'මෙම ප්‍රශ්නාවලිය ප්‍රශ්න 5 කින් සමන්විත වේ. සෑම ප්‍රශ්නයකටම ලකුණු 20 බැගින් හිමිවේ. කාලය විනාඩි 15 කි.',
    15,
    100,
    JSON.stringify(g6Questions)
  ]);

  // ==============================================================
  // 2. Grade 7 Resources (Topic 192: 01. සමමිතිය (Symmetry))
  // ==============================================================
  const g7TopicId = 192;
  const g7LessonTitle = '01. සමමිතිය හැඳින්වීම සහ සමමිතික රූප';

  // Grade 7 Recording
  await pool.query(`
    INSERT INTO lesson_recordings (grade, subject, topic_id, lesson_index, lesson_title, title, video_url, teacher_name, duration, recording_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `, [
    'Grade 7',
    'Mathematics',
    g7TopicId,
    0,
    g7LessonTitle,
    '01. සමමිතිය හැඳින්වීම සහ සමමිතික රූප (Theory & Classroom Lecture)',
    'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    'Sir Parakum Bandara',
    '46 mins',
    '2026-10-18'
  ]);

  // Grade 7 Tutorial
  await pool.query(`
    INSERT INTO lesson_tutorials (grade, subject, topic_id, lesson_index, lesson_title, title, description, file_url, file_type, teacher_name)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `, [
    'Grade 7',
    'Mathematics',
    g7TopicId,
    0,
    g7LessonTitle,
    'Grade 7 Mathematics: Chapter 01 Symmetry Step-by-Step Tutorial',
    'Self-guided revision and problem analysis on bilateral symmetry, identifying symmetry axes of standard plane figures (equilateral triangle, rectangle, square, regular polygons).',
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    'PDF',
    'Sir Parakum Bandara'
  ]);

  // Grade 7 Notes
  await pool.query(`
    INSERT INTO lesson_notes (grade, subject, topic_id, lesson_index, lesson_title, title, content, pdf_url, teacher_name)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `, [
    'Grade 7',
    'Mathematics',
    g7TopicId,
    0,
    g7LessonTitle,
    '01 වන පරිච්ඡේදය: සමමිතිය සහ සමමිතික අක්ෂ සටහන',
    `### 01. සමමිතිය (Symmetry)

#### සමමිතික රූපයක් යනු කුමක්ද?
යම් රූපයක් සරල රේඛාවක් ඔස්සේ දෙකට නැමූ විට, එහි එක් කොටසක් අනෙක් කොටස මත සම්පූර්ණයෙන්ම සමපාත වේ නම්, එම රූපය **සමමිතික රූපයක්** ලෙස හඳුන්වයි.
එම නැමුණු රේඛාව **සමමිතික අක්ෂය (Axis of Symmetry)** නම් වේ.

#### ද්විපාර්ශ්වික සමමිතිය (Bilateral Symmetry):
එක් සමමිතික අක්ෂයක් පමණක් සහිත රූප **ද්විපාර්ශ්වික සමමිතික රූප** ලෙස හැඳින්වේ.
- සමද්වීපාද ත්‍රිකෝණය (Isosceles Triangle) - සමමිතික අක්ෂ 1 කි.
- ඉංග්‍රීසි අකුරු: A, M, T, V, Y - සමමිතික අක්ෂ 1 බැගින් ඇත.

#### සම්මත තල රූපවල සමමිතික අක්ෂ සංඛ්‍යාව:
| තල රූපය | සමමිතික අක්ෂ ගණන |
| :--- | :--- |
| සමපාද ත්‍රිකෝණය (Equilateral Triangle) | 3 |
| සමචතුරස්‍රය (Square) | 4 |
| ඍජුකෝණාස්‍රය (Rectangle) | 2 |
| රොම්බසය (Rhombus) | 2 |
| වෘත්තය (Circle) | අනන්ත සංඛ්‍යාවක් (Infinite) |
| සමාන්තරාස්‍රය (Parallelogram) | 0 (නැත) |

#### ගණිතමය සිද්ධාන්ත:
- ඕනෑම පාද $n$ ගණනක් සහිත **සුවිධි බහුඅස්‍රයක (Regular Polygon)** සමමිතික අක්ෂ $n$ සංඛ්‍යාවක් පවතී.
  $$\\text{අක්ෂ සංඛ්‍යාව} = n$$
  උදා: සුවිධි ෂඩස්‍රයක ($n = 6$) සමමිතික අක්ෂ 6 ක් ඇත.

> **විභාග උපදෙස:** ඍජුකෝණාස්‍රයක විකර්ණ ඔස්සේ සමමිතික අක්ෂ නොපිහිටන බව මතක තබාගන්න. එහි ඇත්තේ දිග හා පළල මධ්‍ය ලක්ෂ්‍ය හරහා යන අක්ෂ 2ක් පමණි.`,
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    'Sir Parakum Bandara'
  ]);

  // Grade 7 YouTube Recommendations
  await pool.query(`
    INSERT INTO lesson_youtube_recommendations (grade, subject, topic_id, lesson_index, lesson_title, title, youtube_url, channel_name, description, thumbnail_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?),
           (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `, [
    'Grade 7',
    'Mathematics',
    g7TopicId,
    0,
    g7LessonTitle,
    'Grade 7 Mathematics - Symmetry (සමමිතිය) Part 1 (NIE Broadcast)',
    'https://www.youtube.com/watch?v=3Z4Xy9FjN0k',
    'NIE Educational Channel',
    'Official Sri Lankan Grade 7 Mathematics TV lecture covering bilateral symmetry and symmetry lines with paper models.',
    'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=600&q=80',

    'Grade 7',
    'Mathematics',
    g7TopicId,
    0,
    g7LessonTitle,
    '7 ශ්‍රේණිය ගණිතය - 01 පාඩම සමමිතිය හා ආදර්ශ ගැටලු සාකච්ඡාව',
    'https://www.youtube.com/watch?v=8Vw7D7R8rXo',
    'Guru Gedara SLRC',
    'Complete revision of symmetrical plane figures, folding axes, and textbook exercises discussed by senior mathematics educators.',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80'
  ]);

  // Grade 7 Quiz
  const g7Questions = [
    {
      id: 1,
      type: 'mcq',
      questionText: 'සමපාද ත්‍රිකෝණයක පවතින සමමිතික අක්ෂ සංඛ්‍යාව කොපමණද?',
      options: ['1', '2', '3', '4'],
      correctAnswer: 2,
      explanation: 'සමපාද ත්‍රිකෝණයක පාද 3 ම සමාන බැවින් ශීර්ෂ 3 හරහා යන සමමිතික අක්ෂ 3 ක් පවතී.',
      marks: 20
    },
    {
      id: 2,
      type: 'mcq',
      questionText: 'සමචතුරස්‍රයක ඇති සමමිතික අක්ෂ සංඛ්‍යාව කොපමණද?',
      options: ['2', '3', '4', '8'],
      correctAnswer: 2,
      explanation: 'සමචතුරස්‍රයක විකර්ණ 2 ඔස්සේ සහ පාදවල මධ්‍ය ලක්ෂ්‍ය යා කරන රේඛා 2 ඔස්සේ සමමිතික අක්ෂ 4ක් ඇත.',
      marks: 20
    },
    {
      id: 3,
      type: 'true_false',
      questionText: 'සාමාන්‍ය සමාන්තරාස්‍රයකට (Parallelogram) සමමිතික අක්ෂ පවතී.',
      options: ['සත්‍ය (True)', 'අසත්‍ය (False)'],
      correctAnswer: 1,
      explanation: 'සාමාන්‍ය සමාන්තරාස්‍රයක් නැමූ විට කොටස් සමපාත නොවන බැවින් ඊට සමමිතික අක්ෂ නොමැත (අක්ෂ 0 කි).',
      marks: 20
    },
    {
      id: 4,
      type: 'mcq',
      questionText: 'එක් සමමිතික අක්ෂයක් පමණක් සහිත රූප හඳුන්වන්නේ කුමන නමකින්ද?',
      options: ['ද්විපාර්ශ්වික සමමිතික රූප', 'බහුපාර්ශ්වික රූප', 'වක්‍ර රූප', 'අසමමිතික රූප'],
      correctAnswer: 0,
      explanation: 'එක් සමමිතික අක්ෂයක් පමණක් ඇති රූප ද්විපාර්ශ්වික සමමිතික රූප (Bilateral Symmetrical Figures) නම් වේ.',
      marks: 20
    },
    {
      id: 5,
      type: 'mcq',
      questionText: 'සුවිධි අෂ්ටස්‍රයක (Regular Octagon) සමමිතික අක්ෂ සංඛ්‍යාව කොපමණද?',
      options: ['4', '6', '8', '16'],
      correctAnswer: 2,
      explanation: 'පාද n සංඛ්‍යාවක් ඇති සුවිධි බහුඅස්‍රයක සමමිතික අක්ෂ n සංඛ්‍යාවක් පවතී. අෂ්ටස්‍රයකට පාද 8 ක් ඇති බැවින් අක්ෂ 8 කි.',
      marks: 20
    }
  ];

  await pool.query(`
    INSERT INTO lesson_quizzes (grade, subject, topic_id, lesson_index, lesson_title, title, instructions, duration_minutes, total_marks, questions)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `, [
    'Grade 7',
    'Mathematics',
    g7TopicId,
    0,
    g7LessonTitle,
    'සමමිතිය 01 - ඇගයීම් කෙටි පරීක්ෂණය (Grade 7 Symmetry Quiz)',
    'සමමිතිය පිළිබඳ ප්‍රශ්න 5 කට පිළිතුරු සපයන්න. කාලය විනාඩි 15 කි. සමත් ලකුණු ප්‍රමාණය 60% කි.',
    15,
    100,
    JSON.stringify(g7Questions)
  ]);

  // ==============================================================
  // 3. Seed Sample Student-Teacher Messages
  // ==============================================================
  await pool.query(`
    INSERT INTO student_teacher_messages 
      (student_id, student_user_id, student_name, student_index_no, grade, subject, topic_id, lesson_title, subject_line, question_text, status, reply_text, replied_by, replied_at, is_read_by_student, is_read_by_teacher)
    VALUES 
      (20, 23, 'Sakvithi', '0002', 'Grade 11 (O/L Mathematics)', 'Mathematics', 1, 'Quadratic Equations', 
       'වර්ගජ සමීකරණ විසඳීමේදී සූත්‍රය භාවිතය පිළිබඳ ප්‍රශ්නයක්',
       'සර්, ax² + bx + c = 0 සමීකරණයේ b² - 4ac සෘණ අගයක් ලැබුණු විට විභාගයේදී පිළිතුර ලියන්නේ කෙසේද?',
       'answered',
       'පුතා, O/L මට්ටමේදී b² - 4ac < 0 විට "තත්වික මූල නොපවතී" (No real roots) ලෙස කෙටි පිළිතුර සඳහන් කළ යුතුය. උසස් පෙළ Combined Maths වලදී සංකීර්ණ සංඛ්‍යා යටතේ මේවා සාකච්ඡා කෙරේ.',
       'Sir Parakum Bandara (Head Educator)',
       NOW(),
       TRUE,
       TRUE);
  `);

  console.log('✓ Successfully seeded learning resources for Grade 6, Grade 7, and student messaging.');
}

if (process.argv[1]?.endsWith('seed_learning_resources.js')) {
  seedLearningResources()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Error seeding learning resources:', err);
      process.exit(1);
    });
}

