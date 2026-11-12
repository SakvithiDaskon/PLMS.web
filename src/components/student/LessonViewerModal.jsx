import React from 'react';
import {
  X,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Sparkles,
  BookmarkCheck,
  Check
} from 'lucide-react';

export const LessonViewerModal = ({
  isOpen,
  onClose,
  topic,
  moduleIndex,
  moduleTitle,
  allModules = [],
  isCompleted,
  onToggleComplete,
  onNavigateModule
}) => {
  if (!isOpen || !topic) return null;

  const currentIdx = typeof moduleIndex === 'number' ? moduleIndex : 0;
  const currentTitle = moduleTitle || (allModules && allModules[currentIdx]) || `Module ${currentIdx + 1}`;
  const total = allModules?.length || 1;
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx < total - 1;

  // Clean pure chapter name
  const chapterName = topic.name || 'Mathematics Chapter';
  const gradeName = topic.grade || 'Grade 7';
  const termName = topic.term || 'Term 1';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#003153]/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-auto bg-white rounded-2xl shadow-2xl border border-[#c0d9ec] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#003153] via-[#00416d] to-[#005187] text-white flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-extrabold uppercase tracking-wider text-[10px]">
                {gradeName} - {termName}
              </span>
              <span className="text-sky-200 text-xs font-semibold truncate max-w-xs sm:max-w-md">
                {chapterName}
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-black text-white leading-snug">
              {currentTitle}
            </h2>
            <p className="text-[11px] text-sky-200 font-medium">
              මොඩියුලය {String(currentIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close lesson"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Lesson Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-800 text-sm leading-relaxed">
          {/* Completion Status Alert Banner */}
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
              isCompleted
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <Clock className="w-5 h-5 text-amber-600 shrink-0" />
              )}
              <div className="text-xs">
                <span className="font-extrabold">
                  {isCompleted ? 'මෙම පාඩම සම්පූර්ණ කර ඇත (Completed)' : 'මෙම පාඩම තවම සම්පූර්ණ කර නැත (In Progress)'}
                </span>
                <p className="text-[11px] opacity-80">
                  {isCompleted
                    ? 'ඔබ මෙම මොඩියුලයේ සියලු කොටස් සාර්ථකව අවසන් කර ඇත.'
                    : 'පාඩම අධ්‍යයනය කර අවසානයේ සම්පූර්ණ වූ බව ලකුණු කරන්න.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onToggleComplete(currentIdx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                isCompleted
                  ? 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-100 shadow-2xs'
                  : 'bg-[#003153] text-white hover:bg-[#00223d] shadow-xs'
              }`}
            >
              {isCompleted ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mark Incomplete</span>
                </>
              ) : (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>Mark Completed</span>
                </>
              )}
            </button>
          </div>

          {/* Section 1: Introduction (හැඳින්වීම) */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[#003153]">
              <BookOpen className="w-4 h-4 text-[#003153]" />
              <h3 className="text-sm font-extrabold uppercase tracking-wide">
                01. පාඩම හැඳින්වීම (Introduction)
              </h3>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm text-slate-700">
              <p>
                මෙම මොඩියුලයෙන් <strong>{chapterName}</strong> යටතේ <strong>{currentTitle}</strong> පිළිබඳව මූලික සංකල්ප, නීති සහ ප්‍රායෝගික භාවිතයන් විස්තරාත්මකව සාකච්ඡා කරනු ලැබේ.
              </p>
              <p className="text-slate-600">
                ශ්‍රී ලංකා ජාතික විෂය නිර්දේශයේ 7 ශ්‍රේණියේ සිසුන්ට පහසුවෙන් තේරුම් ගත හැකි අයුරින් පියවරෙන් පියවර විවරණ සහ ආදර්ශ ගැටලු මෙහි අන්තර්ගත වේ.
              </p>
            </div>
          </div>

          {/* Section 2: Key Concepts & Definitions */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[#003153]">
              <Sparkles className="w-4 h-4 text-[#003153]" />
              <h3 className="text-sm font-extrabold uppercase tracking-wide">
                02. මූලික සංකල්ප සහ නිර්වචන (Key Concepts & Definitions)
              </h3>
            </div>
            <div className="p-4 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] space-y-2 text-xs sm:text-sm text-slate-800">
              <ul className="list-disc list-inside space-y-1.5 pl-1 text-slate-700">
                <li>
                  <strong className="text-slate-900 font-bold">{currentTitle}</strong> ආශ්‍රිත ප්‍රධාන ගණිතමය සිද්ධාන්ත නිවැරදිව තේරුම් ගැනීම.
                </li>
                <li>
                  ගැටලු විසඳීමේදී යොදාගන්නා සම්මත ඒකක, සංකේත සහ මූලික සූත්‍ර නිසි පරිදි හඳුනාගැනීම.
                </li>
                <li>
                  සංකල්පය ප්‍රායෝගික ජීවිතයේ සහ විභාග ප්‍රශ්න පත්‍රවල විමසන ආකාරය පිළිබඳ අවබෝධය.
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3: Worked Examples (ආදර්ශ ගැටලු හා විසඳුම්) */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[#003153]">
              <HelpCircle className="w-4 h-4 text-[#003153]" />
              <h3 className="text-sm font-extrabold uppercase tracking-wide">
                03. ආදර්ශ ගැටලු හා පියවරෙන් පියවර විසඳුම් (Worked Examples)
              </h3>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white border border-[#b0d1e8] shadow-2xs space-y-2">
                <p className="text-xs font-bold text-[#003153]">
                  ආදර්ශ ගැටලුව 01:
                </p>
                <p className="text-xs text-slate-700 italic">
                  {currentTitle} ආශ්‍රිතව ලබා දී ඇති දත්ත උපයෝගී කරගනිමින් නිවැරදි පියවර අනුගමනය කර අවසාන පිළිතුර ගණනය කරන්න.
                </p>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 space-y-1">
                  <p className="font-sans font-semibold text-slate-600">පියවරෙන් පියවර විසඳුම:</p>
                  <p>1. ලබා දී ඇති දත්ත හඳුනාගැනීම</p>
                  <p>2. අදාළ ගණිත සූත්‍රය / ක්‍රමවේදය යෙදීම</p>
                  <p>3. සුළු කිරීම හා පිළිතුර සම්මත ඒකක සහිතව ලිවීම</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Practice Questions & Short Quiz */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-[#003153]">
              <BookmarkCheck className="w-4 h-4 text-[#003153]" />
              <h3 className="text-sm font-extrabold uppercase tracking-wide">
                04. පාඩම් අභ්‍යාස සහ කෙටි ප්‍රශ්නාවලිය (Practice Questions)
              </h3>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
              <p className="font-semibold text-slate-800">
                ස්වයං ඇගයීම සඳහා පහත අභ්‍යාසය ඔබගේ සටහන් පොතේ සම්පූර්ණ කරන්න:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-slate-600">
                <li>මෙම කොටසේ උගත් මූලික නීතිය හෝ නිර්වචනය කෙටියෙන් ලියන්න.</li>
                <li>ලබා දී ඇති ආදර්ශ ගැටලුවට සමාන තවත් අභ්‍යාස 2 ක් විසඳන්න.</li>
                <li>ඔබගේ පිළිතුරු ගුරුභවතුන් සමඟ හෝ ආදර්ශ විසඳුම් පත්‍රය සමඟ පරීක්ෂා කරගන්න.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!hasPrev}
              onClick={() => onNavigateModule(currentIdx - 1)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                hasPrev
                  ? 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 shadow-2xs'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Module</span>
            </button>

            <button
              type="button"
              disabled={!hasNext}
              onClick={() => onNavigateModule(currentIdx + 1)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                hasNext
                  ? 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 shadow-2xs'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
              }`}
            >
              <span>Next Module</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleComplete(currentIdx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                  : 'bg-[#003153] text-white hover:bg-[#00223d] shadow-xs'
              }`}
            >
              {isCompleted ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Completed ✓</span>
                </>
              ) : (
                <>
                  <BookmarkCheck className="w-4 h-4" />
                  <span>Mark as Completed</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewerModal;

