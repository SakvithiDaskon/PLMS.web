import React, { useState } from 'react';
import {
  BookOpen,
  Layers,
  ChevronRight,
  X,
  Check,
  PlayCircle,
  Circle
} from 'lucide-react';
import { GRADE_7_FALLBACK_MODULES } from '../../data/grade7CurriculumData';

// ============================================================
// Unit Topics
// Mathematics curriculum and lesson progress for student's grade
// ============================================================

// Topic theme colors
const topicThemes = [
  { bg: 'bg-blue-600' },
  { bg: 'bg-purple-600' },
  { bg: 'bg-teal-600' },
  { bg: 'bg-indigo-600' },
  { bg: 'bg-amber-600' },
  { bg: 'bg-rose-600' }
];

// Grade 6 Mathematics Lesson Outlines (Modules) for all 3 Units
const GRADE_6_FALLBACK_MODULES = {
  // --- Unit 1 (1 වන වාරය) ---
  '01. වෘත්ත': [
    'වෘත්තාකාර හැඩ ඇති ද්‍රව්‍ය හඳුනාගැනීම',
    'ද්‍රව්‍ය භාවිතයෙන් වෘත්ත ඇඳීම',
    'වෘත්තයේ ප්‍රමාණය සහ වෘත්තාකාර ආස්තරය',
    'වෘත්තය තුළ, මත සහ පිටත පිහිටීම් හඳුනාගැනීම',
    'වෘත්ත ආශ්‍රිත රටා ඇඳීම',
    'වෘත්ත ආශ්‍රිත රටා නිර්මාණය කිරීම',
    'වෘත්ත ආශ්‍රිත විවිධ ක්‍රියාකාරකම්',
    'අභ්‍යාස හා ගැටලු විසඳීම'
  ],
  '02. ස්ථානීය අගය': [
    'ස්ථානීය අගය හඳුනාගැනීම',
    'ඒකක හා දශක ස්ථාන',
    'සියක, දහස් හා ඉහළ ස්ථාන',
    'ඉලක්කමකින් නිරූපණය වන අගය',
    'සංඛ්‍යා කලාප හඳුනාගැනීම',
    'විශාල සංඛ්‍යා කියවීම හා ලිවීම'
  ],
  '03. පූර්ණ සංඛ්‍යා මත ගණිත කර්ම': [
    'පූර්ණ සංඛ්‍යා එකතු කිරීම',
    'එකතු කිරීමේ ක්‍රම හා ගැටලු',
    'පූර්ණ සංඛ්‍යා අඩු කිරීම',
    'අඩු කිරීමේ ක්‍රම හා ගැටලු',
    'පූර්ණ සංඛ්‍යා ගුණ කිරීම',
    'පූර්ණ සංඛ්‍යා බෙදීම',
    'මිශ්‍ර ගණිත ගැටලු විසඳීම'
  ],
  '04. කාලය': [
    'පැය, මිනිත්තු හා තත්පර හඳුනාගැනීම',
    'පැය 12 ඔරලෝසුවෙන් වේලාව කියවීම',
    'පැය 24 ඔරලෝසුවෙන් වේලාව කියවීම',
    'කාල ඒකක අතර සම්බන්ධතා',
    'කාලය එකතු කිරීම',
    'කාලය අඩු කිරීම',
    'කාලය සම්බන්ධ ගැටලු විසඳීම'
  ],
  '05. සංඛ්‍යා රේඛාව': [
    'සංඛ්‍යා රේඛාව හඳුනාගැනීම',
    'සංඛ්‍යා රේඛාවේ පූර්ණ සංඛ්‍යා සලකුණු කිරීම',
    'ඍණ සංඛ්‍යා හඳුනාගැනීම',
    'නිඛිල හඳුනාගැනීම හා සංසන්දනය',
    'සංඛ්‍යා රේඛාව ආශ්‍රිත ගැටලු'
  ],
  '06. නිමානය හා වටයීම': [
    'නිමානය හඳුනාගැනීම',
    'නිමාන කිරීමේ ක්‍රම',
    'ආසන්න දහයට වටයීම',
    'සංඛ්‍යා ආසන්න අගයන්ට වටයීම',
    'නිමානය හා වටයීම ආශ්‍රිත ගැටලු'
  ],
  '07. කෝණ': [
    'කෝණ හඳුනාගැනීම',
    'කෝණයක ශීර්ෂය හා බාහු',
    'සෘජු කෝණය හඳුනාගැනීම',
    'සුළු කෝණ හා මහා කෝණ',
    'සරල කෝණ හා පරාවර්ත කෝණ',
    'කෝණ ආශ්‍රිත ක්‍රියාකාරකම් හා ගැටලු'
  ],
  '08. දිශා': [
    'ප්‍රධාන දිශා හඳුනාගැනීම',
    'උප දිශා හඳුනාගැනීම',
    'දිශා සටහනක් හඳුනාගැනීම',
    'මාලිමාව භාවිතයෙන් දිශා සෙවීම',
    'දිශා ආශ්‍රිත ගැටලු විසඳීම'
  ],
  '09. භාග': [
    'භාග හඳුනාගැනීම',
    'ඒකක භාග හා ඒවා නිරූපණය',
    'ලවය හා හරය හඳුනාගැනීම',
    'සමාන භාග හඳුනාගැනීම',
    'භාග සංසන්දනය කිරීම',
    'භාග එකතු කිරීම හා අඩු කිරීම',
    'භාග ආශ්‍රිත ගැටලු විසඳීම'
  ],
  '10. තේරීම': [
    'පොදු ලක්ෂණ හඳුනාගැනීම',
    'ලක්ෂණ අනුව කාණ්ඩවලට වෙන් කිරීම',
    'කාණ්ඩවලට නම් යෙදීම',
    'සංඛ්‍යා හා ද්‍රව්‍ය වර්ගීකරණය',
    'තේරීම ආශ්‍රිත ක්‍රියාකාරකම් හා ගැටලු'
  ],
  '11. සාධක හා ගුණාකාර': [
    'සාධක හඳුනාගැනීම',
    'ගුණාකාර හඳුනාගැනීම',
    'ගුණන වගුව භාවිතයෙන් සාධක සෙවීම',
    'සංඛ්‍යාවක සාධක සෙවීම',
    'සංඛ්‍යාවක ගුණාකාර සෙවීම',
    '2, 5 හා 10 න් බෙදිය හැකි බව පරීක්ෂා කිරීම',
    'සාධක හා ගුණාකාර ආශ්‍රිත ගැටලු'
  ],

  // --- Unit 2 (2 වන වාරය) ---
  '12. සරල රේඛීය තල රූප': [
    'සරල රේඛීය තල රූප හඳුනාගැනීම',
    'ත්‍රිකෝණ වර්ග සහ ලක්ෂණ',
    'චතුරස්‍ර වර්ග සහ ලක්ෂණ',
    'සමමිතික රූප හඳුනාගැනීම',
    'සරල රේඛීය තල රූප ආශ්‍රිත අභ්‍යාස'
  ],
  '13. දශම': [
    'දශම සංඛ්‍යා හඳුනාගැනීම',
    'දශමවල ස්ථානීය අගය',
    'දශම සංඛ්‍යා සංසන්දනය',
    'දශම සංඛ්‍යා එකතු කිරීම',
    'දශම සංඛ්‍යා අඩු කිරීම',
    'දශම ආශ්‍රිත ගැටලු විසඳීම'
  ],
  '14. සංඛ්‍යා වර්ග හා සංඛ්‍යා රටා': [
    'ඔත්තේ හා ඉරට්ට සංඛ්‍යා',
    'ත්‍රිකෝණික සංඛ්‍යා හඳුනාගැනීම',
    'සමචතුරස්‍ර සංඛ්‍යා හඳුනාගැනීම',
    'සංඛ්‍යා රටාවල ඊළඟ පද සෙවීම',
    'සංඛ්‍යා රටා ආශ්‍රිත ගැටලු'
  ],
  '15. දිග': [
    'දිග මැනීමේ සම්මත ඒකක',
    'මිලිමීටර හා සෙන්ටිමීටර',
    'මීටර හා කිලෝමීටර',
    'දිග මිනුම් එකතු කිරීම',
    'දිග මිනුම් අඩු කිරීම',
    'දිග ආශ්‍රිත ප්‍රායෝගික ගැටලු'
  ],
  '16. ද්‍රව මිනුම්': [
    'ධාරිතාව හා ද්‍රව මිනුම් ඒකක',
    'මිලිලීටර හා ලීටර අතර සම්බන්ධතාව',
    'ද්‍රව මිනුම් එකතු කිරීම',
    'ද්‍රව මිනුම් අඩු කිරීම',
    'ධාරිතාව ආශ්‍රිත ගැටලු විසඳීම'
  ],
  '17. ඝන වස්තු': [
    'ඝන වස්තු හඳුනාගැනීම',
    'ඝනක හා ඝනකාභ',
    'මුහුණත්, දාර හා ශීර්ෂ',
    'ඝන වස්තුවල දැල නිර්මාණය',
    'ඝන වස්තු ආශ්‍රිත ක්‍රියාකාරකම්'
  ],
  'පුනරීක්ෂණ අභ්‍යාසය 2 වාරය': [
    '01-11 ඒකක පුනරීක්ෂණය',
    '12-14 ඒකක පුනරීක්ෂණය',
    '15-17 ඒකක පුනරීක්ෂණය',
    'දෙවන වාර විභාග ආදර්ශ ප්‍රශ්න පත්‍රය 1',
    'දෙවන වාර විභාග ආදර්ශ ප්‍රශ්න පත්‍රය 2'
  ],

  // --- Unit 3 (3 වන වාරය) ---
  '18. වීජීය සංකේත': [
    'වීජීය සංකේත හැඳින්වීම',
    'සංකේත භාවිතයෙන් ප්‍රකාශන ලිවීම',
    'සංකේතවල අගයන් ආදේශය',
    'වීජීය සංකේත ආශ්‍රිත ගැටලු',
    'අභ්‍යාස හා ක්‍රියාකාරකම්'
  ],
  '19. වීජීය ප්‍රකාශන ගොඩනැගීම හා ආදේශය': [
    'වීජීය ප්‍රකාශන ගොඩනැගීම',
    'ප්‍රකාශනයක පද හා සංගුණක',
    'සංකේත සඳහා ධන සංඛ්‍යා ආදේශය',
    'ප්‍රකාශනවල අගය සෙවීම',
    'ප්‍රායෝගික ගැටලු විසඳීම'
  ],
  '20. ස්කන්ධය': [
    'ස්කන්ධය මැනීමේ සම්මත ඒකක',
    'ග්‍රෑම් හා කිලෝග්‍රෑම් අතර සම්බන්ධතාව',
    'ස්කන්ධ මිනුම් එකතු කිරීම',
    'ස්කන්ධ මිනුම් අඩු කිරීම',
    'ස්කන්ධය ආශ්‍රිත ගැටලු විසඳීම'
  ],
  '21. අනුපාත': [
    'අනුපාත පිළිබඳ මූලික සංකල්පය',
    'අනුපාතයක් සරලතම ආකාරයෙන් ලිවීම',
    'සමාන අනුපාත සෙවීම',
    'ප්‍රමාණ අනුපාතයකට බෙදීම',
    'අනුපාත ආශ්‍රිත ගැටලු විසඳීම'
  ],
  '22. දත්ත රැස් කිරීම හා නිරූපණය': [
    'දත්ත රැස් කිරීමේ ක්‍රම',
    'ප්‍රමාණාත්මක හා ගුණාත්මක දත්ත',
    'සංඛ්‍යාත වගු සැකසීම',
    'චිත්‍ර ප්‍රස්ථාර මඟින් දත්ත දැක්වීම',
    'දත්ත නිරූපණය ආශ්‍රිත අභ්‍යාස'
  ],
  '23. දත්ත අර්ථකථනය': [
    'ප්‍රස්ථාර කියවීම හා තොරතුරු ලබාගැනීම',
    'චිත්‍ර ප්‍රස්ථාර අර්ථකථනය',
    'උපරිම හා අවම අගයන් හඳුනාගැනීම',
    'ප්‍රස්ථාර ආශ්‍රිත ප්‍රශ්න විසඳීම',
    'නිගමනවලට එළඹීම'
  ],
  '24. දර්ශක': [
    'දර්ශක හා පාදය හඳුනාගැනීම',
    'සංඛ්‍යාවක් බලයක් ලෙස ලිවීම',
    '10 හි බල',
    'දර්ශක සහිත සංඛ්‍යාවල අගය සෙවීම',
    'දර්ශක ආශ්‍රිත ගැටලු'
  ],
  '25. වර්ගඵලය': [
    'වර්ගඵලය පිළිබඳ සංකල්පය',
    'වර්ග සෙන්ටිමීටර හා වර්ග මීටර',
    'සමචතුරස්‍රයක වර්ගඵලය සෙවීම',
    'සෘජුකෝණාස්‍රයක වර්ගඵලය සෙවීම',
    'වර්ගඵලය ආශ්‍රිත ගැටලු විසඳීම'
  ],
  'පුනරීක්ෂණ අභ්‍යාසය 3 වාරය': [
    '18-21 ඒකක පුනරීක්ෂණය',
    '22-25 ඒකක පුනරීක්ෂණය',
    'වාර්ෂික විභාග ආදර්ශ ප්‍රශ්න පත්‍රය 1',
    'වාර්ෂික විභාග ආදර්ශ ප්‍රශ්න පත්‍රය 2'
  ]
};

// Helper to determine term of topic
const getTopicTerm = (topic) => {
  if (topic.term) {
    const t = topic.term.trim();
    if (/term\s*1|unit\s*1/i.test(t)) return t.includes('Term') ? 'Term 1' : 'Unit 1';
    if (/term\s*2|unit\s*2/i.test(t)) return t.includes('Term') ? 'Term 2' : 'Unit 2';
    if (/term\s*3|unit\s*3/i.test(t)) return t.includes('Term') ? 'Term 3' : 'Unit 3';
    return t;
  }
  const name = topic.name || '';
  const numMatch = name.match(/^(\d+)\./);
  if (numMatch) {
    const num = parseInt(numMatch[1], 10);
    if (num >= 1 && num <= 11) return 'Unit 1';
    if (num >= 12 && num <= 17) return 'Unit 2';
    if (num >= 18 && num <= 25) return 'Unit 3';
  }
  if (name.includes('2 වාරය')) return 'Unit 2';
  if (name.includes('3 වාරය')) return 'Unit 3';
  return 'Unit 1';
};

// Unit Topics component
export const MathematicsTopics = ({
  topics = [],
  studentGrade = '',
  onOpenCourseOverview = null,
  onOpenLesson = null,
  onUpdateTopicProgress = null
}) => {
  const [activeTopic, setActiveTopic] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState('ALL');

  const getTopicModules = (topic) => {
    if (!topic) return [];
    if (Array.isArray(topic.modules) && topic.modules.length > 0) {
      return topic.modules;
    }
    if (GRADE_7_FALLBACK_MODULES[topic.name]) {
      return GRADE_7_FALLBACK_MODULES[topic.name];
    }
    if (GRADE_6_FALLBACK_MODULES[topic.name]) {
      return GRADE_6_FALLBACK_MODULES[topic.name];
    }
    const cleanName = (topic.name || '').trim().replace(/^\d+\.\s*/, '');
    if (GRADE_7_FALLBACK_MODULES[cleanName]) {
      return GRADE_7_FALLBACK_MODULES[cleanName];
    }
    if (GRADE_6_FALLBACK_MODULES[cleanName]) {
      return GRADE_6_FALLBACK_MODULES[cleanName];
    }
    for (const [key, list] of Object.entries(GRADE_7_FALLBACK_MODULES)) {
      if (cleanName.includes(key) || key.includes(cleanName)) return list;
    }
    for (const [key, list] of Object.entries(GRADE_6_FALLBACK_MODULES)) {
      if (cleanName.includes(key) || key.includes(cleanName)) return list;
      const numA = cleanName.match(/^\s*(\d+)/);
      const numB = key.match(/^\s*(\d+)/);
      if (numA && numB && numA[1] === numB[1]) return list;
    }
    return [];
  };

  // Check if topics have multiple terms available
  const availableTerms = Array.from(new Set(topics.map(t => getTopicTerm(t)).filter(Boolean)));
  const hasMultipleTerms = availableTerms.length > 1;

  // Filter topics by selected term
  const filteredTopics = selectedTerm === 'ALL'
    ? topics
    : topics.filter(t => getTopicTerm(t) === selectedTerm);

  // Toggle module complete in chapter modal
  const handleToggleModuleInModal = (topic, moduleIdx) => {
    const modules = getTopicModules(topic);
    let completed = Array.isArray(topic.completedModules) ? [...topic.completedModules] : [];

    if (topic.progress === 100 && completed.length === 0) {
      completed = modules.map((_, i) => i);
    }

    const idxPos = completed.indexOf(moduleIdx);
    if (idxPos >= 0) {
      completed.splice(idxPos, 1);
    } else {
      completed.push(moduleIdx);
    }

    const newProgress = modules.length > 0
      ? Math.round((completed.length / modules.length) * 100)
      : 0;

    const updatedTopic = {
      ...topic,
      progress: newProgress,
      completedModules: completed
    };

    setActiveTopic(updatedTopic);

    if (onUpdateTopicProgress) {
      onUpdateTopicProgress(topic.id, newProgress, completed);
    }
  };

  return (
    <div className="space-y-4">
      {/* Unit Topics Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#c0d9ec]">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-[#003153] text-white shadow-xs">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Unit Topics
            </h2>
            <p className="text-xs text-slate-600">
              Explore the curriculum for <span className="font-bold text-[#003153]">{studentGrade || 'Enrolled Grade'}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Course Overview Quick Button */}
          {onOpenCourseOverview && (
            <button
              type="button"
              onClick={onOpenCourseOverview}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#003153] bg-[#e6f0f7] hover:bg-[#d8e8f5] border border-[#b0d1e8] transition-all cursor-pointer shadow-2xs"
            >
              <Layers className="w-3.5 h-3.5 text-[#003153]" />
              <span>Course Overview</span>
            </button>
          )}

          {/* Term / Unit Switcher Tabs */}
          {hasMultipleTerms && (
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#f0f6fa] border border-[#c0d9ec]/70 overflow-x-auto max-w-full">
              <button
                type="button"
                onClick={() => setSelectedTerm('ALL')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedTerm === 'ALL'
                    ? 'bg-[#003153] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                All ({topics.length})
              </button>
              {availableTerms.map((termKey) => (
                <button
                  key={termKey}
                  type="button"
                  onClick={() => setSelectedTerm(termKey)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedTerm === termKey
                      ? 'bg-[#003153] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {termKey === 'Unit 1' ? 'Unit I (1 වාරය)' :
                   termKey === 'Unit 2' ? 'Unit II (2 වාරය)' :
                   termKey === 'Unit 3' ? 'Unit III (3 වාරය)' :
                   termKey === 'Term 1' ? 'Term 1 (1 වාරය)' :
                   termKey === 'Term 2' ? 'Term 2 (2 වාරය)' :
                   termKey === 'Term 3' ? 'Term 3 (3 වාරය)' :
                   termKey}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Topics Content */}
      {filteredTopics.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-dashed border-[#c0d9ec] space-y-3">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Mathematics topics available for this unit yet.</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Topics are being scheduled by Sir Parakum Bandara. Please check back shortly.
          </p>
        </div>
      ) : (
        /* Unit topic cards grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTopics.map((topic, index) => {
            const progress = topic.progress || 0;
            const lessonsCount = topic.lessonsCount || 0;
            const theme = topicThemes[index % topicThemes.length];
            const termLabel = getTopicTerm(topic);

            return (
              <div
                key={topic.id}
                className="group flex flex-col justify-between p-5 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm hover:shadow-md hover:border-[#003153] transition-all duration-200"
              >
                {/* Topic Header & Icon */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${theme.bg} text-white flex items-center justify-center shadow-xs`}>
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-[#e6f0f7] text-[#003153] border border-[#b0d1e8]">
                        {termLabel === 'Unit 1' ? 'Unit I' : termLabel === 'Unit 2' ? 'Unit II' : termLabel === 'Unit 3' ? 'Unit III' : termLabel}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#003153] transition-colors leading-snug">
                      {topic.name}
                    </h3>
                    {topic.description ? (
                      <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                        {topic.description}
                      </p>
                    ) : null}
                  </div>
                </div>

                {/* Progress & Lessons Info */}
                <div className="pt-4 mt-4 border-t border-[#f0f6fa] space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                        <Layers className="w-3.5 h-3.5 text-slate-400" />
                        <span>{lessonsCount} Lessons</span>
                      </span>
                      <span className={`text-[11px] font-extrabold ${progress === 100 ? 'text-emerald-600' : 'text-slate-600'}`}>
                        {progress}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${progress === 100 ? 'bg-emerald-600' : 'bg-[#003153]'}`}
                        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* View Lessons Action Button */}
                  <button
                    type="button"
                    onClick={() => setActiveTopic(topic)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-2xs transition-all cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-slate-600" />
                    <span>View Lessons →</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Topic lessons modal */}
      {activeTopic && (() => {
        const activeModules = getTopicModules(activeTopic);
        const moduleCount = activeModules.length > 0 ? activeModules.length : (activeTopic.lessonsCount || 0);
        const isTopicCompleted = activeTopic.progress === 100;
        const completedList = Array.isArray(activeTopic.completedModules) ? activeTopic.completedModules : [];

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#003153]/50 backdrop-blur-xs animate-in fade-in">
            <div className="relative w-full max-w-lg p-6 bg-white rounded-2xl shadow-2xl border border-[#c0d9ec] space-y-4 max-h-[90vh] flex flex-col">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#e6f0f7] shrink-0">
                <div>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-[#e6f0f7] text-[#003153] border border-[#b0d1e8]">
                    {activeTopic.grade} - {getTopicTerm(activeTopic)}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                    {activeTopic.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTopic(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {activeTopic.description ? (
                <p className="text-xs text-slate-600 leading-relaxed shrink-0">
                  {activeTopic.description}
                </p>
              ) : null}

              {/* Progress Bar Card */}
              <div className="p-4 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] space-y-2 shrink-0">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5 text-[#003153]">
                    <Layers className="w-4 h-4 text-[#003153]" />
                    <span>Curriculum Breakdown: {moduleCount} Modules</span>
                  </span>
                  <span className={`font-extrabold ${isTopicCompleted ? 'text-emerald-600' : 'text-[#003153]'}`}>
                    {activeTopic.progress || 0}% Completed
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#e6f0f7] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${isTopicCompleted ? 'bg-emerald-600' : 'bg-[#003153]'}`}
                    style={{ width: `${activeTopic.progress || 0}%` }}
                  />
                </div>
              </div>

              {/* Scrollable Lesson Outline */}
              <div className="space-y-2 flex-1 overflow-hidden flex flex-col min-h-0">
                <div className="flex items-center justify-between shrink-0">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Lesson Outline ({moduleCount} Modules)
                  </p>
                  <span className="text-[11px] font-semibold text-slate-400">පාඩමේ කොටස්</span>
                </div>
                <div className="overflow-y-auto space-y-1.5 pr-1 flex-1">
                  {activeModules.length > 0 ? (
                    activeModules.map((moduleTitle, i) => {
                      const isCompleted = isTopicCompleted ||
                        completedList.includes(i) ||
                        ((activeTopic.progress || 0) > 0 && completedList.length === 0 && i < Math.floor(((activeTopic.progress || 0) / 100) * activeModules.length));

                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#b0d1e8] hover:bg-[#f8fafc] transition-colors text-xs text-slate-800 gap-2"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2 flex-1">
                            <span className="w-6 h-6 rounded-lg bg-[#e6f0f7] text-[#003153] text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="font-semibold text-slate-800 leading-snug">
                              {moduleTitle}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {/* Open Lesson Trigger */}
                            {onOpenLesson && (
                              <button
                                type="button"
                                onClick={() => onOpenLesson(activeTopic, i, moduleTitle)}
                                className="p-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors cursor-pointer"
                                title="Open Lesson"
                              >
                                <PlayCircle className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {/* Complete Toggle */}
                            <button
                              type="button"
                              onClick={() => handleToggleModuleInModal(activeTopic, i)}
                              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                isCompleted
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                                  : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {isCompleted ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span>Completed</span>
                                </>
                              ) : (
                                <>
                                  <Circle className="w-2.5 h-2.5 text-slate-400" />
                                  <span>Upcoming</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    Array.from({ length: moduleCount || 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-[#e6f0f7] text-[#003153] text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span>Module {i + 1}</span>
                        </div>
                        {((activeTopic.progress || 0) > 0 && i < Math.floor(((activeTopic.progress || 0) / 100) * (activeTopic.lessonsCount || 5))) ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                            <Check className="w-3 h-3" /> Completed
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400">Upcoming</span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex items-center justify-between gap-3 shrink-0">
                {onOpenCourseOverview && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTopic(null);
                      onOpenCourseOverview();
                    }}
                    className="text-xs font-bold text-[#003153] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>View Full Curriculum Overview</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setActiveTopic(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#003153] hover:bg-[#00223d] transition-colors cursor-pointer ml-auto"
                >
                  Close Overview
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default MathematicsTopics;
