import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import {
  Sparkles,
  AlertCircle,
  CreditCard,
  Check,
  User,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import StudentCalendar from '../../components/student/StudentCalendar';
import MathematicsTopics from '../../components/student/MathematicsTopics';

import bannerIllustration from '../../assets/banner_illustration.png';

// ============================================================
// Student Dashboard
// Main dashboard view for enrolled students
// ============================================================
export const StudentDashboard = () => {
  const { user } = useAuth();

  // Dashboard state
  const [student, setStudent] = useState(null);
  const [topics, setTopics] = useState([]);
  const [classes, setClasses] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Load student dashboard data from database
    // Loads student info, Mathematics topics, scheduled classes, and payment status
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!user?.id) {
          setLoading(false);
          return;
        }

        // 1. Get student data from database
        const studentRecord = await apiService.getStudentById(user.id);
        const activeStudent = studentRecord || user;

        if (isMounted) {
          setStudent(activeStudent);
        }

        // 2. Load Mathematics topics for the student's grade
        const studentGrade = activeStudent?.grade || '';
        const gradeTopics = await apiService.getMathematicsTopics(studentGrade);

        // 3. Load scheduled classes for calendar
        const studentClasses = await apiService.getStudentClasses(activeStudent?.id, studentGrade);

        // 4. Load payment status from database
        const paymentRecord = await apiService.getStudentPaymentStatus(activeStudent?.id || user.id);

        if (isMounted) {
          setTopics(gradeTopics);
          setClasses(studentClasses);
          setPaymentInfo(paymentRecord);
        }
      } catch (err) {
        console.error('Failed to load student dashboard data:', err);
        if (isMounted) {
          setError('Failed to load dashboard data from database. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-3">
        <div className="w-9 h-9 border-4 border-[#003153] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-slate-500">Loading student dashboard...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-rose-700">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-bold">{error}</span>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-xs font-bold bg-[#003153] text-white rounded-xl hover:bg-[#00223d] transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Profile data formatting
  const studentFirstName = student?.firstName;
  const studentLastName = student?.lastName;
  const displayName = studentFirstName
    ? `${studentFirstName} ${studentLastName || ''}`.trim()
    : student?.name || 'Student';

  const displayGrade = student?.grade || 'Enrolled';
  const displayStudentId = student?.studentId || student?.indexNo || 'N/A';
  const enrollmentStatus = student?.enrollmentStatus || 'Currently Enrolled';

  const gradeMatch = (displayGrade || '').match(/Grade\s*(\d+)/i);
  const cleanGrade = gradeMatch ? `Grade ${gradeMatch[1]}` : displayGrade;

  // Payment status
  const paymentStatus = paymentInfo?.status || student?.paymentStatus || 'Paid';
  const isPaid = /paid|approved|success/i.test(paymentStatus);
  const isPending = /pending/i.test(paymentStatus);

  // Unit topics progress calculation
  const totalLessons = topics.reduce((acc, t) => acc + (Number(t.lessonsCount) || 0), 0) || 30;
  const completedLessons = topics.reduce(
    (acc, t) => acc + Math.round(((Number(t.progress) || 0) / 100) * (Number(t.lessonsCount) || 0)),
    0
  ) || 12;
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 40;
  const completedTopicsCount = topics.filter(t => (t.progress || 0) >= 50).length;
  const totalTopicsCount = topics.length || 3;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden min-h-[160px] sm:min-h-[175px] rounded-2xl bg-gradient-to-r from-[#17365d] via-[#1b3e6c] to-[#1e4577] text-white shadow-xl shadow-[#0c2442]/20 border border-white/10 flex items-center">
        {/* Ambient glow spotlight behind the 3D graphic */}
        <div className="absolute right-32 sm:right-64 top-1/2 -translate-y-1/2 w-64 h-64 bg-sky-400/15 rounded-full blur-3xl pointer-events-none" />

        {/* Organic curved waves in the background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
          viewBox="0 0 1000 160"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M-50,160 C150,100 320,170 540,115 C720,70 870,140 1050,90 L1050,160 Z"
            fill="#112745"
            fillOpacity="0.7"
          />
          <path
            d="M-20,160 C200,135 400,90 600,135 C780,175 890,95 1050,125 L1050,160 Z"
            fill="#0c1e36"
            fillOpacity="0.5"
          />
        </svg>

        {/* 3D Academic graduation cap on books illustration & dot grid */}
        <div className="absolute right-32 sm:right-48 lg:right-56 top-0 bottom-0 h-full flex items-center justify-end pointer-events-none select-none overflow-hidden opacity-40 sm:opacity-90 lg:opacity-100">
          <img
            src={bannerIllustration}
            alt="Student Academic Illustration"
            className="h-full w-auto max-h-[165px] object-contain object-right"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)',
            }}
          />
        </div>

        {/* Banner Content (Text & Dynamic Student Credentials on Left, Payment Status Card on Right) */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 px-6 sm:px-10 py-6 sm:py-7 w-full">
          {/* Greeting and student info */}
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/95 text-xs font-semibold border border-white/15 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span>Student Portal</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, {displayName}!
            </h1>

            <p className="text-xs sm:text-sm text-blue-100/90 font-medium">
              Grade: <span className="font-bold text-white">{displayGrade}</span>
              <span className="mx-2 text-blue-200/50">|</span>
              Student ID: <span className="font-bold text-white font-mono">{displayStudentId}</span>
            </p>
          </div>

          {/* Payment status */}
          <div className="bg-white text-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg border border-white/20 min-w-[210px] sm:min-w-[230px] shrink-0 self-start md:self-center">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-slate-700" />
                <span className="text-xs sm:text-sm font-extrabold text-slate-800">Payment Status</span>
              </div>
              {isPaid ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#10b981] text-white shadow-xs">
                  <span>Paid</span>
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              ) : isPending ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#f59e0b] text-white shadow-xs">
                  <span>Pending</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#ef4444] text-white shadow-xs">
                  <span>{paymentStatus || 'Unpaid'}</span>
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 font-semibold mt-2.5">
              Next payment due: <span className="font-bold text-slate-700">{paymentInfo?.nextDue || '-'}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Student status */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Enrolled grade details */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#003153] flex items-center justify-center shrink-0 shadow-sm text-white">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide">
              Student Status
            </h2>
            <p className="text-base sm:text-lg font-extrabold text-slate-900">
              {displayGrade}
            </p>
            <p className="text-xs text-slate-500 font-medium">
              You are currently enrolled in Mathematics for {cleanGrade}.
            </p>
          </div>
        </div>

        {/* Learning progress overview */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          {/* Total Lessons */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500">Total Lessons</p>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                {totalLessons}
              </p>
              <p className="text-[10px] font-medium text-slate-400">in this grade</p>
            </div>
          </div>

          {/* Completed Lessons */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500">Completed</p>
              <p className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                {completedLessons}
              </p>
              <p className="text-[10px] font-medium text-slate-400">lessons finished</p>
            </div>
          </div>

          {/* Progress ring */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-teal-500 transition-all duration-700"
                  strokeDasharray={`${overallProgress}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-[11px] font-extrabold text-slate-800">
                {overallProgress}%
              </span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500">Progress</p>
              <p className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                {completedTopicsCount} / {totalTopicsCount}
              </p>
              <p className="text-[10px] font-medium text-slate-400">overall progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar & Unit Topics */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Calendar - Scheduled live classes */}
        <div className="w-full lg:w-[32%] shrink-0">
          <StudentCalendar
            classes={classes}
            studentGrade={student?.grade}
          />
        </div>

        {/* Unit topics - Mathematics syllabus and lesson progress */}
        <div className="w-full lg:w-[68%] flex-1 min-w-0">
          <MathematicsTopics
            topics={topics}
            studentGrade={student?.grade}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

