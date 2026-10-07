import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Video, Sparkles } from 'lucide-react';

export const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Banner (#003153 Card) */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-[#003153] text-white shadow-lg border border-[#00223d]">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-100" />
              <span>Student Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Welcome back, {user?.name}!</h1>
            <p className="text-xs sm:text-sm text-blue-100 flex items-center flex-wrap gap-2">
              <span>Grade: <strong className="text-white">{user?.grade || 'Grade 11 (O/L Mathematics)'}</strong></span>
              <span>•</span>
              <span>Student ID: <span className="font-mono font-extrabold text-white bg-white/20 px-2.5 py-0.5 rounded-lg border border-white/30">{user?.studentId || user?.indexNo || '0001'}</span></span>
            </p>
          </div>

          <Link
            to="/student/zoom"
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-xs text-[#003153] bg-white hover:bg-[#e6f0f7] shadow-md transition-all hover:scale-105 shrink-0"
          >
            <Video className="w-4 h-4 text-[#003153]" />
            <span>Join Live Zoom Class</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
