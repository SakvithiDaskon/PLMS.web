import React, { useState } from 'react';
import { BookOpen, Layers, ChevronRight, X, Check } from 'lucide-react';

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

// Grade 6 Mathematics Lesson Outlines (Modules)
const GRADE_6_FALLBACK_MODULES = {
  '01. වෘත්ත': [
    'වෘත්තාකාර හැඩ ඇති ද්රව්ය හඳුනාගැනීම',
    'ද්රව්ය භාවිතයෙන් වෘත්ත ඇඳීම',
    'වෘත්තයේ ප්රමාණය සහ වෘත්තාකාර ආස්තරය',
    'වෘත්තය තුළ, මත සහ පිටත පිහිටීම් හඳුනාගැනීම',
    'වෘත්ත ආශ්රිත රටා ඇඳීම',
    'වෘත්ත ආශ්රිත රටා නිර්මාණය කිරීම',
    'වෘත්ත ආශ්රිත විවිධ ක්රියාකාරකම්',
    'අභ්යාස හා ගැටලු විසඳීම'
  ],
  '02. ස්ථානීය අගය': [
    'ස්ථානීය අගය හඳුනාගැනීම',
    'ඒකක හා දශක ස්ථාන',
    'සියක, දහස් හා ඉහළ ස්ථාන',
    'ඉලක්කමකින් නිරූපණය වන අගය',
    'සංඛ්යා කලාප හඳුනාගැනීම',
    'විශාල සංඛ්යා කියවීම හා ලිවීම'
  ],
  '03. පූර්ණ සංඛ්යා මත ගණිත කර්ම': [
    'පූර්ණ සංඛ්යා එකතු කිරීම',
    'එකතු කිරීමේ ක්රම හා ගැටලු',
    'පූර්ණ සංඛ්යා අඩු කිරීම',
    'අඩු කිරීමේ ක්රම හා ගැටලු',
    'පූර්ණ සංඛ්යා ගුණ කිරීම',
    'පූර්ණ සංඛ්යා බෙදීම',
    'මිශ්ර ගණිත ගැටලු විසඳීම'
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
  '05. සංඛ්යා රේඛාව': [
    'සංඛ්යා රේඛාව හඳුනාගැනීම',
    'සංඛ්යා රේඛාවේ පූර්ණ සංඛ්යා සලකුණු කිරීම',
    'ඍණ සංඛ්යා හඳුනාගැනීම',
    'නිඛිල හඳුනාගැනීම හා සංසන්දනය',
    'සංඛ්යා රේඛාව ආශ්රිත ගැටලු'
  ],
  '06. නිමානය හා වටයීම': [
    'නිමානය හඳුනාගැනීම',
    'නිමාන කිරීමේ ක්රම',
    'ආසන්න දහයට වටයීම',
    'සංඛ්යා ආසන්න අගයන්ට වටයීම',
    'නිමානය හා වටයීම ආශ්රිත ගැටලු'
  ],
  '07. කෝණ': [
    'කෝණ හඳුනාගැනීම',
    'කෝණයක ශීර්ෂය හා බාහු',
    'සෘජු කෝණය හඳුනාගැනීම',
    'සුළු කෝණ හා මහා කෝණ',
    'සරල කෝණ හා පරාවර්ත කෝණ',
    'කෝණ ආශ්රිත ක්රියාකාරකම් හා ගැටලු'
  ],
  '08. දිශා': [
    'ප්රධාන දිශා හඳුනාගැනීම',
    'උප දිශා හඳුනාගැනීම',
    'දිශා සටහනක් හඳුනාගැනීම',
    'මාලිමාව භාවිතයෙන් දිශා සෙවීම',
    'දිශා ආශ්රිත ගැටලු විසඳීම'
  ],
  '09. භාග': [
    'භාග හඳුනාගැනීම',
    'ඒකක භාග හා ඒවා නිරූපණය',
    'ලවය හා හරය හඳුනාගැනීම',
    'සමාන භාග හඳුනාගැනීම',
    'භාග සංසන්දනය කිරීම',
    'භාග එකතු කිරීම හා අඩු කිරීම',
    'භාග ආශ්රිත ගැටලු විසඳීම'
  ],
  '10. තේරීම': [
    'පොදු ලක්ෂණ හඳුනාගැනීම',
    'ලක්ෂණ අනුව කාණ්ඩවලට වෙන් කිරීම',
    'කාණ්ඩවලට නම් යෙදීම',
    'සංඛ්යා හා ද්රව්ය වර්ගීකරණය',
    'තේරීම ආශ්රිත ක්රියාකාරකම් හා ගැටලු'
  ],
  '11. සාධක හා ගුණාකාර': [
    'සාධක හඳුනාගැනීම',
    'ගුණාකාර හඳුනාගැනීම',
    'ගුණන වගුව භාවිතයෙන් සාධක සෙවීම',
    'සංඛ්යාවක සාධක සෙවීම',
    'සංඛ්යාවක ගුණාකාර සෙවීම',
    '2, 5 හා 10 න් බෙදිය හැකි බව පරීක්ෂා කිරීම',
    'සාධක හා ගුණාකාර ආශ්රිත ගැටලු'
  ]
};

// Unit Topics component
export const MathematicsTopics = ({ topics = [], studentGrade = '' }) => {
  const [activeTopic, setActiveTopic] = useState(null);

  const getTopicModules = (topic) => {
    if (!topic) return [];
    if (Array.isArray(topic.modules) && topic.modules.length > 0) {
      return topic.modules;
    }
    if (GRADE_6_FALLBACK_MODULES[topic.name]) {
      return GRADE_6_FALLBACK_MODULES[topic.name];
    }
    const cleanName = (topic.name || '').trim();
    for (const [key, list] of Object.entries(GRADE_6_FALLBACK_MODULES)) {
      if (cleanName.includes(key) || key.includes(cleanName)) return list;
      const numA = cleanName.match(/^\s*(\d+)/);
      const numB = key.match(/^\s*(\d+)/);
      if (numA && numB && numA[1] === numB[1]) return list;
    }
    return [];
  };

  return (
    <div className="space-y-4">
      {/* Unit Topics Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#c0d9ec]">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-[#003153] text-white shadow-xs">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Unit Topics
            </h2>
            <p className="text-xs text-slate-600">
              Explore the main units for <span className="font-bold text-[#003153]">{studentGrade || 'Enrolled Grade'}</span>
            </p>
          </div>
        </div>

      </div>

      {/* Topics Content */}
      {topics.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-dashed border-[#c0d9ec] space-y-3">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Mathematics topics available yet.</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Topics for your grade are being scheduled by Sir Parakum Bandara. Please check back shortly.
          </p>
        </div>
      ) : (
        /* Unit topic cards grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map((topic, index) => {
            const progress = topic.progress || 0;
            const lessonsCount = topic.lessonsCount || 0;
            const theme = topicThemes[index % topicThemes.length];

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
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
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
                      <span className="text-slate-700 text-[11px] font-extrabold">{progress}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#003153] transition-all duration-500"
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

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#003153]/50 backdrop-blur-xs animate-in fade-in">
            <div className="relative w-full max-w-lg p-6 bg-white rounded-2xl shadow-2xl border border-[#c0d9ec] space-y-4">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#e6f0f7]">
                <div>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-[#e6f0f7] text-[#003153] border border-[#b0d1e8]">
                    {activeTopic.grade} - {activeTopic.subject}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                    {activeTopic.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTopic(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {activeTopic.description ? (
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeTopic.description}
                </p>
              ) : null}

              <div className="p-4 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5 text-[#003153]">
                    <Layers className="w-4 h-4 text-[#003153]" />
                    <span>Curriculum Breakdown: {moduleCount} Modules</span>
                  </span>
                  <span className="text-[#003153] font-extrabold">{activeTopic.progress}% Completed</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#e6f0f7] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#003153] transition-all duration-300"
                    style={{ width: `${activeTopic.progress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Lesson Outline ({moduleCount} Modules)
                  </p>
                  <span className="text-[11px] font-semibold text-slate-400">පාඩමේ කොටස්</span>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
                  {activeModules.length > 0 ? (
                    activeModules.map((moduleTitle, i) => {
                      const isCompleted = (activeTopic.progress === 100) ||
                        (i < Math.floor(((activeTopic.progress || 0) / 100) * activeModules.length));
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#b0d1e8] hover:bg-[#f8fafc] transition-colors text-xs text-slate-800"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <span className="w-6 h-6 rounded-lg bg-[#e6f0f7] text-[#003153] text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="font-semibold text-slate-800 leading-snug">
                              {moduleTitle}
                            </span>
                          </div>
                          {isCompleted ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 shrink-0">
                              <Check className="w-3.5 h-3.5" /> Completed
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-400 shrink-0">Upcoming</span>
                          )}
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
                        {i < Math.floor(((activeTopic.progress || 0) / 100) * (activeTopic.lessonsCount || 5)) ? (
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

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTopic(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#003153] hover:bg-[#00223d] transition-colors cursor-pointer"
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
