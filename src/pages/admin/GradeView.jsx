import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Sparkles } from 'lucide-react';

export const GradeView = () => {
  const { gradeId } = useParams();

  // Extract grade number (e.g., 'grade-6' -> '6', '11' -> '11')
  const rawNum = (gradeId || '6').replace(/[^0-9]/g, '') || '6';
  const currentGradeNumber = rawNum;
  const currentGradeTitle = `GRADE ${currentGradeNumber}`;
  const fullGradeLabel = currentGradeNumber === '11' 
    ? 'Grade 11 (O/L Mathematics)' 
    : `Grade ${currentGradeNumber} Mathematics`;

  return (
    <div className="space-y-6 pb-12">
      {/* Back to Admin Dashboard Navigation */}
      <div>
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#c0d9ec] text-slate-700 hover:text-[#003153] hover:bg-[#e6f0f7] text-xs font-bold transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Dashboard</span>
        </Link>
      </div>

      {/* BIG PROMINENT GRADE TITLE HEADER AT THE TOP */}
      <div className="relative overflow-hidden p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#003153] via-[#00223d] to-[#00192e] text-white shadow-2xl border border-[#004575]">
        {/* Background ambient icon */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none">
          <GraduationCap className="w-72 h-72 text-white" />
        </div>

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-blue-200 border border-white/20 text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-200" />
            <span>Dedicated Grade Portal</span>
          </div>

          {/* BIG GRADE TITLE AT TOP */}
          <h1 className="text-6xl sm:text-8xl font-black text-white tracking-tight leading-none uppercase drop-shadow-md">
            {currentGradeTitle}
          </h1>

          <p className="text-lg sm:text-xl text-blue-100 font-bold">
            {fullGradeLabel}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GradeView;
