import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Sparkles, BookOpen, MessageSquare, LayoutDashboard } from 'lucide-react';
import LearningContentManager from './LearningContentManager';
import AdminMessages from './AdminMessages';

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'content', label: 'Learning Content', icon: BookOpen },
  { id: 'messages', label: 'Student Messages', icon: MessageSquare },
];

export const GradeView = () => {
  const { gradeId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Extract grade number (e.g., 'grade-6' -> '6', '11' -> '11')
  const rawNum = (gradeId || '6').replace(/[^0-9]/g, '') || '6';
  const currentGradeNumber = rawNum;
  const currentGradeTitle = `GRADE ${currentGradeNumber}`;
  const fullGradeLabel = currentGradeNumber === '11'
    ? 'Grade 11 (O/L Mathematics)'
    : `Grade ${currentGradeNumber} Mathematics`;

  // Map gradeId to grade name used by content components
  const gradeName = `Grade ${currentGradeNumber}`;

  return (
    <div className="space-y-6 pb-12">
      {/* Back Navigation */}
      <div>
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#c0d9ec] text-slate-700 hover:text-[#003153] hover:bg-[#e6f0f7] text-xs font-bold transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Dashboard</span>
        </Link>
      </div>

      {/* BIG GRADE TITLE HEADER */}
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

          <h1 className="text-6xl sm:text-8xl font-black text-white tracking-tight leading-none uppercase drop-shadow-md">
            {currentGradeTitle}
          </h1>

          <p className="text-lg sm:text-xl text-blue-100 font-bold">
            {fullGradeLabel}
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 p-1 bg-white rounded-2xl border border-[#c0d9ec] shadow-sm w-fit">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black transition-all ${
                activeTab === tab.id
                  ? 'bg-[#003153] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#003153] hover:bg-[#e6f0f7]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm space-y-4">
          <h2 className="text-lg font-black text-slate-900">{fullGradeLabel} — Overview</h2>
          <p className="text-sm text-slate-600">
            Use the tabs above to manage learning content or view student messages for {gradeName}.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => setActiveTab('content')}
              className="p-5 rounded-2xl bg-[#f4f8fb] hover:bg-[#e6f0f7] border border-[#c0d9ec] text-left space-y-2 group transition-all hover:border-[#003153]/40"
            >
              <div className="p-2.5 rounded-xl bg-[#003153] text-white w-fit shadow-sm">
                <BookOpen className="w-5 h-5 text-blue-200" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#003153]">Learning Content</h3>
              <p className="text-xs text-slate-500">Manage recordings, tutorials, notes, YouTube recs, and quizzes for {gradeName}.</p>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className="p-5 rounded-2xl bg-[#f4f8fb] hover:bg-[#e6f0f7] border border-[#c0d9ec] text-left space-y-2 group transition-all hover:border-[#003153]/40"
            >
              <div className="p-2.5 rounded-xl bg-[#003153] text-white w-fit shadow-sm">
                <MessageSquare className="w-5 h-5 text-blue-200" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#003153]">Student Messages</h3>
              <p className="text-xs text-slate-500">View and reply to questions from {gradeName} students.</p>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <LearningContentManager defaultGrade={gradeName} />
      )}

      {activeTab === 'messages' && (
        <AdminMessages defaultGrade={gradeName} />
      )}
    </div>
  );
};

export default GradeView;
