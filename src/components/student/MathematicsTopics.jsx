import React, { useState } from 'react';
import { BookOpen, Layers, ChevronRight, CheckCircle2, Sparkles, X, Check } from 'lucide-react';

// ============================================================
// Unit Topics
// Mathematics curriculum and lesson progress for student's grade
// ============================================================

// Topic theme colors and symbols
const topicThemes = [
  { symbol: 'Σ', bg: 'bg-blue-600' },
  { symbol: 'Δ', bg: 'bg-purple-600' },
  { symbol: '∿', bg: 'bg-teal-600' },
  { symbol: 'π', bg: 'bg-indigo-600' },
  { symbol: '√', bg: 'bg-amber-600' },
  { symbol: '∫', bg: 'bg-rose-600' }
];

// Unit Topics component
export const MathematicsTopics = ({ topics = [], studentGrade = '' }) => {
  const [activeTopic, setActiveTopic] = useState(null);

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

        {topics.length > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#e6f0f7] text-[#003153] border border-[#b0d1e8] self-start sm:self-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#003153]" />
            <span>{topics.length} Topics Available</span>
          </span>
        )}
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
                    <div className={`w-10 h-10 rounded-xl ${theme.bg} text-white font-mono text-lg font-bold flex items-center justify-center shadow-xs`}>
                      {theme.symbol}
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#003153] transition-colors leading-snug">
                      {topic.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {topic.description}
                    </p>
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
      {activeTopic && (
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

            <p className="text-xs text-slate-600 leading-relaxed">
              {activeTopic.description}
            </p>

            <div className="p-4 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5 text-[#003153]">
                  <Layers className="w-4 h-4 text-[#003153]" />
                  <span>Curriculum Breakdown: {activeTopic.lessonsCount} Modules</span>
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
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Lesson Outline</p>
              <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                {Array.from({ length: Math.min(activeTopic.lessonsCount, 5) }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700"
                  >
                    <span>Module {i + 1}: Theory & Problem Analysis {i === 0 ? '(Foundations)' : i === 1 ? '(Worked Examples)' : `(Section ${i + 1})`}</span>
                    {i < Math.floor((activeTopic.progress / 100) * activeTopic.lessonsCount) ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                        <Check className="w-3 h-3" /> Completed
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">Upcoming</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveTopic(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#003153] hover:bg-[#00223d] transition-colors"
              >
                Close Overview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathematicsTopics;
