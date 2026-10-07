import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import MathRenderer from '../../components/MathRenderer';
import {
  Video,
  PlaySquare,
  BookOpen,
  Award,
  CreditCard,
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiService.getStudentDashboardData(user?.id);
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#003153] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
            <p className="text-xs sm:text-sm text-blue-100">
              Grade: <span className="font-extrabold text-white">{user?.grade || 'Grade 11 (O/L Mathematics)'}</span> | Student ID: <span className="font-mono font-bold text-white">{user?.studentId || user?.indexNo || 'STU-2026-889'}</span>
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

      {/* Metrics Row (White Cards with #003153 Accents) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#c0d9ec] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Upcoming Live Class</span>
            <Video className="w-4 h-4 text-[#003153]" />
          </div>
          <p className="text-sm font-bold text-slate-900 truncate">
            {data?.upcomingLiveSession ? data.upcomingLiveSession.title : 'No Session Scheduled'}
          </p>
          <p className="text-[11px] text-[#003153] font-bold flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#003153]" /> {data?.upcomingLiveSession?.time || '18:00 Today'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#c0d9ec] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Class Recordings</span>
            <PlaySquare className="w-4 h-4 text-[#003153]" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{data?.recentRecordingsCount || 3}</p>
          <p className="text-[11px] text-slate-500 font-medium">Available in Library</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#c0d9ec] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Latest Exam Mark</span>
            <Award className="w-4 h-4 text-[#003153]" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {data?.latestGrade ? `${data.latestGrade.score}% (${data.latestGrade.grade})` : '88% (A)'}
          </p>
          <p className="text-[11px] text-[#003153] font-bold truncate">
            {data?.latestGrade?.subject || 'Combined Mathematics'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#c0d9ec] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Tuition Fee Status</span>
            <CreditCard className="w-4 h-4 text-[#003153]" />
          </div>
          <div>
            <span className="px-2.5 py-1 text-xs font-extrabold rounded-md bg-[#e6f0f7] text-[#003153] border border-[#b0d1e8]">
              {data?.paymentStatus || 'Approved'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">October 2026 Fee</p>
        </div>
      </div>

      {/* Math Highlight & Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#003153]" />
              <span>Today's Featured Formula Sheet</span>
            </h2>
            <Link to="/student/tutorials" className="text-xs font-bold text-[#003153] hover:underline">
              View All Tutorials &rarr;
            </Link>
          </div>

          <div className="p-4 rounded-xl bg-[#e6f0f7] border border-[#b0d1e8] space-y-3">
            <span className="text-xs font-bold text-[#003153] uppercase tracking-wider">
              Integration by Parts Formula
            </span>
            <MathRenderer math="\int u \frac{dv}{dx} dx = uv - \int v \frac{du}{dx} dx" />
            <p className="text-xs text-slate-700">
              Select the derivative term $u$ using ILATE priority rule to evaluate integrals easily.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">Student Shortcuts</h2>
          <div className="space-y-2">
            <Link
              to="/student/quizzes"
              className="flex items-center justify-between p-3 rounded-xl bg-[#f4f8fb] hover:bg-[#e6f0f7] border border-[#c0d9ec] transition-all text-xs font-bold text-slate-800"
            >
              <span>Take Pending Quiz</span>
              <ArrowRight className="w-4 h-4 text-[#003153]" />
            </Link>

            <Link
              to="/student/recordings"
              className="flex items-center justify-between p-3 rounded-xl bg-[#f4f8fb] hover:bg-[#e6f0f7] border border-[#c0d9ec] transition-all text-xs font-bold text-slate-800"
            >
              <span>Watch Class Recordings</span>
              <ArrowRight className="w-4 h-4 text-[#003153]" />
            </Link>

            <Link
              to="/student/payments"
              className="flex items-center justify-between p-3 rounded-xl bg-[#f4f8fb] hover:bg-[#e6f0f7] border border-[#c0d9ec] transition-all text-xs font-bold text-slate-800"
            >
              <span>Upload Monthly Fee Slip</span>
              <ArrowRight className="w-4 h-4 text-[#003153]" />
            </Link>

            <Link
              to="/student/grades"
              className="flex items-center justify-between p-3 rounded-xl bg-[#f4f8fb] hover:bg-[#e6f0f7] border border-[#c0d9ec] transition-all text-xs font-bold text-slate-800"
            >
              <span>View Exam Performance</span>
              <ArrowRight className="w-4 h-4 text-[#003153]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
