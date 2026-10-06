import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { BookOpen, CheckCircle2, TrendingUp, Award, Clock, AlertCircle } from 'lucide-react';

export const ChildProgress = () => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProg = async () => {
      const data = await apiService.getChildProgress('std-1');
      setProgress(data);
      setLoading(false);
    };
    fetchProg();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Child Academic Progress</h1>
          <p className="text-xs text-slate-400">Detailed attendance, quiz completions, and subject mastery breakdown</p>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <span className="text-xs font-semibold text-slate-400 uppercase">Live Lecture Attendance</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-400">{progress?.attendance}%</span>
            <span className="text-xs text-slate-400">of live Zoom classes</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${progress?.attendance}%` }} />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <span className="text-xs font-semibold text-slate-400 uppercase">Tutorial Module Completion</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-indigo-400">
              {progress?.completedTutorials} / {progress?.totalTutorials}
            </span>
            <span className="text-xs text-slate-400">Modules Completed</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: '87.5%' }} />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <span className="text-xs font-semibold text-slate-400 uppercase">Quiz & Assessment Average</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-400">{progress?.averageScore}%</span>
            <span className="text-xs text-slate-400">Average Score</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${progress?.averageScore}%` }} />
          </div>
        </div>
      </div>

      {/* Subject Performance Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">Subject Stream Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {progress?.subjectBreakdown.map((subj, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{subj.subject}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {subj.status}
                </span>
              </div>
              <p className="text-2xl font-bold text-amber-400">{subj.score}%</p>
              <p className="text-[11px] text-slate-400">Consistently completing homework & formula exercises on time.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChildProgress;
