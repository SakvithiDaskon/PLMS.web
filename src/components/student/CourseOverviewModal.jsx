import React, { useState, useMemo } from 'react';
import {
  X,
  BookOpen,
  Layers,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  Circle,
  PlayCircle,
  Check,
  Award
} from 'lucide-react';
import { GRADE_7_FALLBACK_MODULES } from '../../data/grade7CurriculumData';

export const CourseOverviewModal = ({
  isOpen,
  onClose,
  course = null,
  topics = [],
  onUpdateTopicProgress,
  onOpenLesson
}) => {
  const [selectedTerm, setSelectedTerm] = useState('ALL');
  const [expandedChapterIds, setExpandedChapterIds] = useState({});

  const isGrade7 = !course || course.grade?.includes('7');
  const gradeLabel = isGrade7 ? 'GRADE 7 - MATHEMATICS' : 'GRADE 6 - MATHEMATICS';
  const courseTitle = isGrade7
    ? 'Grade 7 Mathematics (7 ශ්‍රේණිය - ගණිතය)'
    : 'Grade 6 Mathematics (6 ශ්‍රේණිය - ගණිතය)';
  const courseDescription = isGrade7
    ? 'Official Sri Lankan Grade 7 Mathematics curriculum structured into 3 terms: Term 1, Term 2, and Term 3, covering all 29 chapters and 3 revision exercises.'
    : 'Comprehensive Sri Lankan national school curriculum for Grade 6 Mathematics with interactive modules, worked examples, and term revisions.';

  // Helper to extract modules for a topic
  const getModulesForTopic = (topic) => {
    if (!topic) return [];
    if (Array.isArray(topic.modules) && topic.modules.length > 0) {
      return topic.modules;
    }
    if (GRADE_7_FALLBACK_MODULES[topic.name]) {
      return GRADE_7_FALLBACK_MODULES[topic.name];
    }
    const clean = (topic.name || '').replace(/^\d+\.\s*/, '');
    if (GRADE_7_FALLBACK_MODULES[clean]) {
      return GRADE_7_FALLBACK_MODULES[clean];
    }
    const count = Number(topic.lessonsCount) || 6;
    return Array.from({ length: count }, (_, i) => `Module ${i + 1}: ${topic.name}`);
  };

  // Helper to get normalized term
  const getNormalizedTerm = (topic) => {
    const raw = topic.term || '';
    if (/term\s*1|unit\s*1/i.test(raw)) return 'Term 1';
    if (/term\s*2|unit\s*2/i.test(raw)) return 'Term 2';
    if (/term\s*3|unit\s*3/i.test(raw)) return 'Term 3';
    return 'Term 1';
  };

  // Filter topics by selected term - Hook called unconditionally
  const filteredTopics = useMemo(() => {
    if (!isOpen) return [];
    if (selectedTerm === 'ALL') return topics;
    return topics.filter(t => getNormalizedTerm(t) === selectedTerm);
  }, [topics, selectedTerm, isOpen]);

  if (!isOpen) return null;

  // Calculate overall metrics
  const totalChapters = topics.length;
  const totalModules = topics.reduce((acc, t) => {
    const mods = getModulesForTopic(t);
    return acc + mods.length;
  }, 0);

  const completedModulesCount = topics.reduce((acc, t) => {
    const mods = getModulesForTopic(t);
    const completedList = Array.isArray(t.completedModules) ? t.completedModules : [];
    if (completedList.length > 0) {
      return acc + completedList.length;
    }
    if (t.progress === 100) {
      return acc + mods.length;
    }
    return acc + Math.round(((Number(t.progress) || 0) / 100) * mods.length);
  }, 0);

  const overallPercentage = totalModules > 0
    ? Math.round((completedModulesCount / totalModules) * 100)
    : 0;

  // Toggle chapter expansion
  const toggleChapter = (topicId) => {
    setExpandedChapterIds(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  // Expand / collapse all
  const expandAll = () => {
    const all = {};
    filteredTopics.forEach(t => { all[t.id] = true; });
    setExpandedChapterIds(all);
  };

  const collapseAll = () => {
    setExpandedChapterIds({});
  };

  // Module completion toggle handler
  const handleToggleModuleComplete = (topic, moduleIndex) => {
    const modules = getModulesForTopic(topic);
    let completed = Array.isArray(topic.completedModules) ? [...topic.completedModules] : [];

    // If topic was marked 100% previously but completedModules array was empty
    if (topic.progress === 100 && completed.length === 0) {
      completed = modules.map((_, i) => i);
    }

    const idxPosition = completed.indexOf(moduleIndex);
    if (idxPosition >= 0) {
      completed.splice(idxPosition, 1);
    } else {
      completed.push(moduleIndex);
    }

    const newProgress = modules.length > 0
      ? Math.round((completed.length / modules.length) * 100)
      : 0;

    if (onUpdateTopicProgress) {
      onUpdateTopicProgress(topic.id, newProgress, completed);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#003153]/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl my-auto bg-white rounded-2xl shadow-2xl border border-[#c0d9ec] flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#003153] via-[#003c66] to-[#004e84] text-white flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-white/20 text-white font-extrabold uppercase tracking-wider text-[11px] border border-white/20">
                {gradeLabel}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-400/20 text-sky-200 font-bold text-[11px]">
                Sri Lankan Curriculum
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {courseTitle}
            </h1>
            <p className="text-xs sm:text-sm text-sky-100 max-w-3xl leading-relaxed">
              {courseDescription}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer shrink-0"
            aria-label="Close overview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metrics Overview Card */}
        <div className="p-4 sm:p-6 bg-[#f4f8fb] border-b border-[#c0d9ec] shrink-0 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {/* Total Chapters */}
            <div className="p-3.5 rounded-xl bg-white border border-[#c0d9ec] shadow-2xs">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Chapters</p>
              <p className="text-xl sm:text-2xl font-extrabold text-[#003153] mt-0.5">{totalChapters}</p>
              <p className="text-[10px] text-slate-400 font-medium">with revision units</p>
            </div>

            {/* Total Modules */}
            <div className="p-3.5 rounded-xl bg-white border border-[#c0d9ec] shadow-2xs">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Modules</p>
              <p className="text-xl sm:text-2xl font-extrabold text-[#003153] mt-0.5">{totalModules}</p>
              <p className="text-[10px] text-slate-400 font-medium">interactive lessons</p>
            </div>

            {/* Completed Modules */}
            <div className="p-3.5 rounded-xl bg-white border border-[#c0d9ec] shadow-2xs">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Completed Modules</p>
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-600 mt-0.5">{completedModulesCount}</p>
              <p className="text-[10px] text-slate-400 font-medium">of {totalModules} modules</p>
            </div>

            {/* Overall Completion % */}
            <div className="p-3.5 rounded-xl bg-white border border-[#c0d9ec] shadow-2xs">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Course Progress</p>
              <p className="text-xl sm:text-2xl font-extrabold text-[#003153] mt-0.5">{overallPercentage}%</p>
              <p className="text-[10px] text-slate-400 font-medium">overall completion</p>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-[#003153]">
                <Award className="w-4 h-4 text-[#003153]" />
                <span>Overall Curriculum Completion</span>
              </span>
              <span className={`font-extrabold ${overallPercentage === 100 ? 'text-emerald-600' : 'text-[#003153]'}`}>
                {overallPercentage}% Completed
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#e6f0f7] overflow-hidden p-0.5 border border-[#b0d1e8]">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  overallPercentage === 100 ? 'bg-emerald-600' : 'bg-gradient-to-r from-[#003153] to-[#0284c7]'
                }`}
                style={{ width: `${Math.min(Math.max(overallPercentage, 0), 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Term Navigation and Controls */}
        <div className="p-4 sm:px-6 bg-white border-b border-[#e6f0f7] flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Term Tabs */}
          <div className="flex items-center gap-1.5 bg-[#f0f6fa] p-1 rounded-xl border border-[#c0d9ec] overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setSelectedTerm('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedTerm === 'ALL'
                  ? 'bg-[#003153] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              All Terms ({topics.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedTerm('Term 1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedTerm === 'Term 1'
                  ? 'bg-[#003153] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              Term 1 (පළමු වාරය)
            </button>
            <button
              type="button"
              onClick={() => setSelectedTerm('Term 2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedTerm === 'Term 2'
                  ? 'bg-[#003153] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              Term 2 (දෙවන වාරය)
            </button>
            <button
              type="button"
              onClick={() => setSelectedTerm('Term 3')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedTerm === 'Term 3'
                  ? 'bg-[#003153] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              Term 3 (තුන්වන වාරය)
            </button>
          </div>

          {/* Quick expand/collapse buttons */}
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={expandAll}
              className="px-2.5 py-1 text-slate-600 hover:text-[#003153] font-bold hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Expand All
            </button>
            <span className="text-slate-300">|</span>
            <button
              type="button"
              onClick={collapseAll}
              className="px-2.5 py-1 text-slate-600 hover:text-[#003153] font-bold hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Scrollable Chapter List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 flex-1 bg-slate-50/50">
          {filteredTopics.length === 0 ? (
            <div className="p-10 text-center bg-white rounded-2xl border border-dashed border-slate-300">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No chapters found for this term.</p>
            </div>
          ) : (
            filteredTopics.map((topic) => {
              const modules = getModulesForTopic(topic);
              const progress = Number(topic.progress) || 0;
              const isExpanded = !!expandedChapterIds[topic.id];
              const completedList = Array.isArray(topic.completedModules) ? topic.completedModules : [];
              const isCompleted = progress === 100;
              const isInProgress = progress > 0 && progress < 100;
              const isNotStarted = progress === 0;

              return (
                <div
                  key={topic.id}
                  className="bg-white rounded-2xl border border-[#c0d9ec] shadow-2xs hover:border-[#003153]/50 transition-all overflow-hidden"
                >
                  {/* Chapter Header / Accordion trigger */}
                  <div
                    onClick={() => toggleChapter(topic.id)}
                    className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/70 transition-colors select-none"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0 pr-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-[#e6f0f7] text-[#003153] border border-[#b0d1e8]">
                          {getNormalizedTerm(topic)}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {modules.length} Modules
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                        {topic.name}
                      </h3>

                      {topic.description ? (
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {topic.description}
                        </p>
                      ) : null}
                    </div>

                    {/* Progress & Status Badges */}
                    <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                      {/* Status Tag */}
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Completed</span>
                        </span>
                      )}
                      {isInProgress && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>In Progress</span>
                        </span>
                      )}
                      {isNotStarted && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          <Circle className="w-3 h-3 text-slate-400" />
                          <span>Not Started</span>
                        </span>
                      )}

                      {/* Mini Progress */}
                      <div className="w-24 text-right">
                        <span className="text-xs font-extrabold text-slate-700">
                          {progress}%
                        </span>
                        <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mt-1">
                          <div
                            className={`h-full rounded-full ${isCompleted ? 'bg-emerald-600' : 'bg-[#003153]'}`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Chevron Toggle */}
                      <div className="p-1 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-100">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Modules List */}
                  {isExpanded && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-2 border-t border-[#f0f6fa] bg-[#fafcfd] space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-600 pt-1 pb-1 border-b border-slate-200/60">
                        <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] text-[#003153]">
                          <Layers className="w-3.5 h-3.5" />
                          <span>Chapter Modules & Learning Activities ({modules.length})</span>
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Click module to study lesson or toggle status
                        </span>
                      </div>

                      <div className="space-y-2">
                        {modules.map((moduleTitle, modIdx) => {
                          const isModCompleted = isCompleted ||
                            completedList.includes(modIdx) ||
                            (progress > 0 && completedList.length === 0 && modIdx < Math.floor((progress / 100) * modules.length));

                          return (
                            <div
                              key={modIdx}
                              className="p-3 rounded-xl bg-white border border-[#c0d9ec] hover:border-[#003153] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                            >
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <span className="w-7 h-7 rounded-lg bg-[#e6f0f7] text-[#003153] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                                  {String(modIdx + 1).padStart(2, '0')}
                                </span>
                                <div className="min-w-0">
                                  <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                                    {moduleTitle}
                                  </p>
                                  <p className="text-[10px] text-slate-500">
                                    මොඩියුලය {modIdx + 1} • ගණිතමය සිද්ධාන්ත සහ ආදර්ශ අභ්‍යාස
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                {/* Open Lesson Button */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (onOpenLesson) {
                                      onOpenLesson(topic, modIdx, moduleTitle);
                                    }
                                  }}
                                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#003153] bg-[#e6f0f7] hover:bg-[#d8e8f5] transition-colors cursor-pointer flex items-center gap-1.5"
                                >
                                  <PlayCircle className="w-3.5 h-3.5" />
                                  <span>Open Lesson</span>
                                </button>

                                {/* Mark Complete Toggle Button */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleModuleComplete(topic, modIdx);
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                    isModCompleted
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                                      : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'
                                  }`}
                                  title={isModCompleted ? 'Click to mark incomplete' : 'Click to mark completed'}
                                >
                                  {isModCompleted ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      <span>Completed</span>
                                    </>
                                  ) : (
                                    <>
                                      <Circle className="w-3 h-3 text-slate-400" />
                                      <span>Mark Done</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#c0d9ec] flex items-center justify-between gap-4 shrink-0">
          <p className="text-xs text-slate-500 font-medium hidden sm:block">
            {gradeLabel} • Sri Lankan National Syllabus • Sir Parakum Bandara
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#003153] hover:bg-[#00223d] transition-colors cursor-pointer ml-auto shadow-sm"
          >
            Close Overview
          </button>
        </div>

      </div>
    </div>
  );
};

export default CourseOverviewModal;
