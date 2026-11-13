import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import {
  AlertCircle,
  CreditCard,
  Check,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Send,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  Clock,
  Loader2,
  Mail,
  HelpCircle,
  Inbox,
  Sparkles
} from 'lucide-react';
import StudentCalendar from '../../components/student/StudentCalendar';
import MathematicsTopics from '../../components/student/MathematicsTopics';
import CourseOverviewModal from '../../components/student/CourseOverviewModal';
import LessonViewerModal from '../../components/student/LessonViewerModal';

import bannerIllustration from '../../assets/banner_illustration.png';

// Available Mathematics Courses in PLMS
const AVAILABLE_COURSES = [
  {
    id: 'grade-6-math',
    name: 'Grade 6 Mathematics',
    grade: 'Grade 6',
    subject: 'Mathematics',
    titleSinhala: '6 ශ්‍රේණිය - ගණිතය',
    chaptersCount: 27,
    modulesCount: 147,
    description:
      'Comprehensive Sri Lankan national school curriculum for Grade 6 Mathematics with interactive modules, worked examples, and term revisions.'
  },
  {
    id: 'grade-7-math',
    name: 'Grade 7 Mathematics',
    grade: 'Grade 7',
    subject: 'Mathematics',
    titleSinhala: '7 ශ්‍රේණිය - ගණිතය',
    chaptersCount: 29,
    modulesCount: 184,
    description:
      'Official Sri Lankan Grade 7 Mathematics curriculum structured into 3 terms: Term 1, Term 2, and Term 3, covering all 29 chapters and 3 revision exercises.'
  }
];

const fmtDate = (d) => {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return d;
  }
};

// Student Dashboard Component
export const StudentDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Navigation tab state synced with current route: 'dashboard' | 'tutorials' | 'messages'
  const getTabFromPath = useCallback((pathname = '') => {
    if (pathname.includes('/tutorials')) return 'tutorials';
    if (pathname.includes('/messages')) return 'messages';
    return 'dashboard';
  }, []);

  const [activeTab, setActiveTab] = useState(() => getTabFromPath(location.pathname));

  useEffect(() => {
    setActiveTab(getTabFromPath(location.pathname));
  }, [location.pathname, getTabFromPath]);

  // Dashboard core state
  const [student, setStudent] = useState(null);
  const [topics, setTopics] = useState([]);
  const [classes, setClasses] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active selected course
  const [selectedCourseId, setSelectedCourseId] = useState('grade-7-math');
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null); // { topic, moduleIndex, moduleTitle }

  // Messaging state (Ask Your Teacher)
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [msgLoading, setMsgLoading] = useState(false);
  const [showMsgForm, setShowMsgForm] = useState(false);
  const [msgForm, setMsgForm] = useState({
    subjectLine: '',
    questionText: '',
    subject: 'Mathematics',
    lessonTitle: ''
  });
  const [msgSending, setMsgSending] = useState(false);
  const [msgSuccess, setMsgSuccess] = useState('');
  const [expandedMsgId, setExpandedMsgId] = useState(null);

  // Determine active course object
  const activeCourse =
    AVAILABLE_COURSES.find(c => c.id === selectedCourseId) || AVAILABLE_COURSES[1];

  // Load student dashboard core data
  useEffect(() => {
    let isMounted = true;

    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const activeId = user?.userId || user?.id || 'me';

        // 1. Get student data from database
        const studentRecord = await apiService.getStudentById(activeId);
        const activeStudent = studentRecord || user;

        if (isMounted) {
          setStudent(activeStudent);
        }

        // Determine default course based on enrolled student grade
        const studentGrade = activeStudent?.grade || '';
        let initialCourseId = 'grade-7-math';
        if (studentGrade.includes('6')) {
          initialCourseId = 'grade-6-math';
        } else if (studentGrade.includes('7')) {
          initialCourseId = 'grade-7-math';
        }

        if (isMounted) {
          setSelectedCourseId(initialCourseId);
        }

        // 2. Load Mathematics topics for the enrolled grade
        const targetGrade =
          initialCourseId === 'grade-6-math'
            ? 'Grade 6'
            : studentGrade.includes('7')
            ? 'Grade 7'
            : studentGrade || 'Grade 7';
        const gradeTopics = await apiService.getMathematicsTopics(targetGrade);

        // 3. Load scheduled classes for calendar
        const studentClasses = await apiService.getStudentClasses(activeStudent?.id, studentGrade);

        // 4. Load payment status from database
        const paymentRecord = await apiService.getStudentPaymentStatus(activeStudent?.id || activeId);

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

  // Load unread count on initial mount
  useEffect(() => {
    apiService
      .getStudentMessages()
      .then(data => {
        if (data && data.unreadCount !== undefined) {
          setUnreadCount(data.unreadCount);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch messages when Ask Your Teacher tab is active
  const loadMessages = useCallback(async () => {
    setMsgLoading(true);
    try {
      const data = await apiService.getStudentMessages();
      setMessages(data.messages || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      console.warn('Failed to load student messages:', err);
    } finally {
      setMsgLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'messages') {
      loadMessages();
    }
  }, [activeTab, loadMessages]);

  // Update Topic Progress Handler
  const handleUpdateTopicProgress = useCallback(async (topicId, newProgress, completedModules) => {
    // 1. Optimistic update
    setTopics(prevTopics =>
      prevTopics.map(t => {
        if (String(t.id || t.topic_id) === String(topicId)) {
          return {
            ...t,
            progress: newProgress,
            completedModules: completedModules
          };
        }
        return t;
      })
    );

    // Keep activeLesson updated if open
    setActiveLesson(prevLesson => {
      if (prevLesson && String(prevLesson.topic?.id || prevLesson.topic?.topic_id) === String(topicId)) {
        return {
          ...prevLesson,
          topic: {
            ...prevLesson.topic,
            progress: newProgress,
            completedModules: completedModules
          }
        };
      }
      return prevLesson;
    });

    // 2. Persist to database
    try {
      await apiService.updateTopicProgress(topicId, newProgress, completedModules);
    } catch (err) {
      console.error('Failed to update topic progress in database:', err);
    }
  }, []);

  // Open Lesson Handler
  const handleOpenLesson = (topic, moduleIndex, moduleTitle) => {
    setActiveLesson({
      topic,
      moduleIndex,
      moduleTitle
    });
  };

  // Lesson viewer navigation handlers
  const handleNavigateLesson = newIndex => {
    if (!activeLesson) return;
    const modules = Array.isArray(activeLesson.topic?.modules) ? activeLesson.topic.modules : [];
    if (newIndex >= 0 && newIndex < modules.length) {
      setActiveLesson({
        ...activeLesson,
        moduleIndex: newIndex,
        moduleTitle: modules[newIndex]
      });
    }
  };

  const handleToggleLessonComplete = modIndex => {
    if (!activeLesson || !activeLesson.topic) return;
    const topic = activeLesson.topic;
    const modules = Array.isArray(topic.modules) ? topic.modules : [];
    let completed = Array.isArray(topic.completedModules) ? [...topic.completedModules] : [];

    if (topic.progress === 100 && completed.length === 0) {
      completed = modules.map((_, i) => i);
    }

    const idxPos = completed.indexOf(modIndex);
    if (idxPos >= 0) {
      completed.splice(idxPos, 1);
    } else {
      completed.push(modIndex);
    }

    const newProgress =
      modules.length > 0 ? Math.round((completed.length / modules.length) * 100) : 0;

    handleUpdateTopicProgress(topic.id || topic.topic_id, newProgress, completed);
  };

  // Messaging handlers
  const handleSendQuestion = async e => {
    e.preventDefault();
    if (!msgForm.subjectLine.trim() || !msgForm.questionText.trim()) return;

    setMsgSending(true);
    setMsgSuccess('');
    try {
      const res = await apiService.sendStudentMessage({
        subjectLine: msgForm.subjectLine.trim(),
        questionText: msgForm.questionText.trim(),
        subject: msgForm.subject || 'Mathematics',
        lessonTitle: msgForm.lessonTitle.trim()
      });

      if (res && res.success !== false) {
        setMsgSuccess('Your question has been submitted to Sir Parakum Bandara!');
        setMsgForm({
          subjectLine: '',
          questionText: '',
          subject: 'Mathematics',
          lessonTitle: ''
        });
        setShowMsgForm(false);
        loadMessages();
      } else {
        alert(res?.message || 'Failed to send message.');
      }
    } catch {
      alert('An error occurred while sending your message. Please try again.');
    } finally {
      setMsgSending(false);
    }
  };

  const handleToggleExpandMsg = async msg => {
    const isOpening = expandedMsgId !== msg.message_id;
    setExpandedMsgId(isOpening ? msg.message_id : null);

    // If opening an answered unread message, mark it as read
    if (isOpening && msg.status === 'answered' && !msg.is_read_by_student) {
      try {
        await apiService.markMessageRead(msg.message_id);
        setMessages(prev =>
          prev.map(m => (m.message_id === msg.message_id ? { ...m, is_read_by_student: 1 } : m))
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      } catch (e) {
        console.warn('Failed to mark message read:', e);
      }
    }
  };

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
          className="px-4 py-2 text-xs font-bold bg-[#003153] text-white rounded-xl hover:bg-[#00223d] transition-colors cursor-pointer"
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
    : student?.name || user?.name || 'Student';

  const displayStudentId = student?.studentId || user?.studentId || 'N/A';
  const displayUserId = student?.userId || user?.userId || 'N/A';
  const displayEmail = student?.email || user?.email || 'N/A';
  const displayGrade = student?.grade || user?.grade || 'Enrolled';
  const cleanGrade = displayGrade.includes('6')
    ? 'Grade 6'
    : displayGrade.includes('7')
    ? 'Grade 7'
    : displayGrade;
  const displayProfilePicture = student?.profilePicture || user?.profilePicture || null;
  const displayEnrollmentDate =
    student?.enrollmentDate || student?.enrolledAt || user?.enrolledAt
      ? new Date(student?.enrollmentDate || student?.enrolledAt || user?.enrolledAt)
          .toISOString()
          .split('T')[0]
      : '2026-01-10';

  // Payment status
  const paymentStatus = paymentInfo?.status || student?.paymentStatus || 'Paid';
  const isPaid = /paid|approved|success/i.test(paymentStatus);
  const isPending = /pending/i.test(paymentStatus);

  // Unit topics progress calculation
  const totalLessons =
    topics.reduce(
      (acc, t) => acc + (Number(t.lessonsCount) || (Array.isArray(t.modules) ? t.modules.length : 6)),
      0
    ) || 30;
  const completedLessons = topics.reduce((acc, t) => {
    const modsCount = Number(t.lessonsCount) || (Array.isArray(t.modules) ? t.modules.length : 6);
    const completedList = Array.isArray(t.completedModules) ? t.completedModules : [];
    if (completedList.length > 0) return acc + completedList.length;
    if (t.progress === 100) return acc + modsCount;
    return acc + Math.round(((Number(t.progress) || 0) / 100) * modsCount);
  }, 0);

  const overallProgress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const completedTopicsCount = topics.filter(t => (t.progress || 0) >= 50).length;
  const totalTopicsCount = topics.length || 1;

  // Determine active lesson completion status
  const isCurrentLessonCompleted = activeLesson
    ? activeLesson.topic?.progress === 100 ||
      (Array.isArray(activeLesson.topic?.completedModules) &&
        activeLesson.topic.completedModules.includes(activeLesson.moduleIndex))
    : false;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden min-h-[160px] sm:min-h-[175px] rounded-2xl bg-gradient-to-r from-[#17365d] via-[#1b3e6c] to-[#1e4577] text-white shadow-xl shadow-[#0c2442]/20 border border-white/10 flex items-center">
        {/* Ambient glow spotlight */}
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
            d="M-50,160 C200,120 400,150 600,105 C800,60 920,130 1050,100 L1050,160 Z"
            fill="#0c203b"
            fillOpacity="0.8"
          />
        </svg>

        {/* 3D Isometric Character Illustration */}
        <div className="absolute right-3 sm:right-8 md:right-12 bottom-0 top-0 flex items-end justify-end pointer-events-none z-10">
          <img
            src={bannerIllustration}
            alt="Student studying with laptop and books"
            className="h-[155px] sm:h-[170px] md:h-[185px] w-auto object-contain object-bottom drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] select-none"
          />
        </div>

        {/* Content & greeting */}
        <div className="relative z-10 p-5 sm:p-7 max-w-xl space-y-2.5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center font-extrabold text-lg sm:text-xl text-white shadow-md overflow-hidden shrink-0">
              {displayProfilePicture ? (
                <img src={displayProfilePicture} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                displayName.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/15 text-sky-200 backdrop-blur-md border border-white/10">
                <GraduationCap className="w-3 h-3 text-sky-300" />
                <span>{cleanGrade} • Sri Lankan Mathematics</span>
              </span>
              <h1 className="text-lg sm:text-2xl font-black tracking-tight leading-tight pt-0.5">
                Welcome back, {displayName}! 👋
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-sky-100">
            <span className="px-2.5 py-0.5 rounded-lg bg-black/20 border border-white/10">
              ID: <span className="font-mono font-bold text-white">{displayStudentId}</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-black/20 border border-white/10">
              User ID: <span className="font-mono font-bold text-white">#{displayUserId}</span>
            </span>
            <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-lg bg-black/20 border border-white/10 truncate max-w-[200px]">
              {displayEmail}
            </span>
          </div>

          <p className="text-xs text-sky-100/90 font-medium leading-relaxed max-w-md hidden sm:block">
            Track your lessons, explore Mathematics curriculum, and master every chapter with Sir Parakum Bandara.
          </p>
        </div>

        {/* Floating Payment Status Card */}
        <div className="hidden lg:flex absolute right-6 top-6 z-20">
          <div className="px-4 py-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/50 shadow-lg text-slate-800">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-slate-700" />
                <span className="text-xs font-extrabold text-slate-800">Payment Status</span>
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
            <p className="text-[10px] text-slate-500 font-semibold mt-1">
              Next due: <span className="font-bold text-slate-700">{paymentInfo?.nextDue || '-'}</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── TAB 1: Dashboard View (Overview + Calendar + Topics) ── */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Student Status & Learning Overview Section */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Enrolled student details */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#003153] flex items-center justify-center shrink-0 shadow-sm text-white overflow-hidden">
                {displayProfilePicture ? (
                  <img src={displayProfilePicture} alt={displayName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl font-bold">{displayName.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide">
                    Enrolled Student
                  </h2>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-emerald-100 text-emerald-700">
                    Active
                  </span>
                </div>
                <p className="text-base sm:text-lg font-extrabold text-slate-900 truncate">
                  {displayName}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  <span className="font-bold text-[#003153]">{displayGrade}</span> • Student ID:{' '}
                  <span className="font-mono font-bold text-slate-700">{displayStudentId}</span> (User ID:{' '}
                  <span className="font-mono font-bold text-slate-700">#{displayUserId}</span>)
                </p>
                <p className="text-[11px] text-slate-400 font-medium">
                  Registered on: <span className="font-semibold text-slate-600">{displayEnrollmentDate}</span> • Email:{' '}
                  <span className="font-semibold text-slate-600">{displayEmail}</span>
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
                  <p className="text-[11px] font-semibold text-slate-500">Total Modules</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                    {totalLessons}
                  </p>
                  <p className="text-[10px] font-medium text-slate-400">in this course</p>
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
                  <p className="text-[10px] font-medium text-slate-400">modules finished</p>
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
                  <p className="text-[11px] font-semibold text-slate-500">Course Progress</p>
                  <p className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                    {completedTopicsCount} / {totalTopicsCount}
                  </p>
                  <p className="text-[10px] font-medium text-slate-400">chapters covered</p>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar & Topics Section */}
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Calendar - Scheduled live classes */}
            <div className="w-full lg:w-[32%] shrink-0">
              <StudentCalendar classes={classes} studentGrade={student?.grade || user?.grade} />
            </div>

            {/* Unit topics - Mathematics syllabus and lesson progress */}
            <div className="w-full lg:w-[68%] flex-1 min-w-0">
              <MathematicsTopics
                topics={topics}
                studentGrade={activeCourse.grade}
                onOpenCourseOverview={() => setIsOverviewOpen(true)}
                onOpenLesson={handleOpenLesson}
                onUpdateTopicProgress={handleUpdateTopicProgress}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: Tutorials & Recordings (Curriculum Browser) ── */}
      {activeTab === 'tutorials' && (
        <div className="space-y-6">
          {/* Header Card explaining hierarchy */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#003153] via-[#00416d] to-[#005187] text-white shadow-xl shadow-[#003153]/15 space-y-2">
            <div className="flex items-center gap-2 text-sky-200 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-sky-300" />
              <span>Sri Lankan Mathematics Curriculum Explorer</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">Tutorials, Recordings & Lesson Materials</h2>
            <p className="text-xs sm:text-sm text-sky-100/90 max-w-3xl leading-relaxed">
              Explore your grade syllabus by term and chapter. Click any lesson module below to launch the full learning viewer featuring <strong>Zoom class recordings</strong>, <strong>downloadable tutorials</strong>, <strong>detailed notes</strong>, <strong>recommended video guides</strong>, and <strong>interactive practice quizzes</strong>.
            </p>
          </div>

          {/* Full-width curriculum browser */}
          <div className="bg-white rounded-2xl border border-[#c0d9ec] p-5 sm:p-6 shadow-sm">
            <MathematicsTopics
              topics={topics}
              studentGrade={activeCourse.grade}
              onOpenCourseOverview={() => setIsOverviewOpen(true)}
              onOpenLesson={handleOpenLesson}
              onUpdateTopicProgress={handleUpdateTopicProgress}
            />
          </div>
        </div>
      )}

      {/* ── TAB 3: Ask Your Teacher (Messaging Channel) ── */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          {/* Channel Header Banner */}
          <div className="p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#003153] text-white flex items-center justify-center shrink-0 shadow-sm">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black text-slate-900">Ask Your Teacher</h2>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-700 border border-rose-200">
                      {unreadCount} unread reply{unreadCount > 1 ? 'ies' : ''}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                  Have a question about a mathematical theorem or tutorial problem? Ask Sir Parakum Bandara directly and receive answers here.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowMsgForm(prev => !prev);
                setMsgSuccess('');
              }}
              className="px-4 py-2.5 rounded-xl bg-[#003153] text-white font-extrabold text-xs hover:bg-[#00223d] transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-xs"
            >
              {showMsgForm ? (
                <>
                  <X className="w-4 h-4" /> Close Form
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> New Question
                </>
              )}
            </button>
          </div>

          {/* Success Alert */}
          {msgSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{msgSuccess}</span>
            </div>
          )}

          {/* New Question Form Card */}
          {showMsgForm && (
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-md animate-in fade-in space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-[#003153] font-black text-sm">
                  <Mail className="w-4 h-4" />
                  <span>Send a Question to Teacher</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowMsgForm(false)}
                  className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSendQuestion} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Subject Line <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Help needed with Algebraic Expressions"
                      value={msgForm.subjectLine}
                      onChange={e => setMsgForm({ ...msgForm, subjectLine: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#003153] focus:ring-1 focus:ring-[#003153]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Related Lesson / Chapter (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Chapter 05 - Perimeter & Area"
                      value={msgForm.lessonTitle}
                      onChange={e => setMsgForm({ ...msgForm, lessonTitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#003153] focus:ring-1 focus:ring-[#003153]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Question <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your question or doubt in detail. Mention specific exercise numbers or textbook page if applicable..."
                    value={msgForm.questionText}
                    onChange={e => setMsgForm({ ...msgForm, questionText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#003153] focus:ring-1 focus:ring-[#003153] resize-y"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowMsgForm(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={msgSending}
                    className="px-5 py-2.5 rounded-xl bg-[#003153] text-white text-xs font-extrabold hover:bg-[#00223d] transition-all flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-60"
                  >
                    {msgSending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Question
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Messages Feed */}
          <div className="space-y-3">
            {msgLoading && (
              <div className="flex flex-col items-center justify-center py-16 space-y-3 bg-white rounded-2xl border border-[#c0d9ec]">
                <Loader2 className="w-8 h-8 text-[#003153] animate-spin" />
                <p className="text-xs font-bold text-slate-500">Loading your conversation history...</p>
              </div>
            )}

            {!msgLoading && messages.length === 0 && (
              <div className="p-12 rounded-2xl bg-white border border-[#c0d9ec] text-center space-y-3 shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-[#003153]/10 text-[#003153] flex items-center justify-center mx-auto">
                  <Inbox className="w-7 h-7" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">No Questions Yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Have a question or need clarity on any mathematical problem? Click the &ldquo;New Question&rdquo; button above to send a direct message to Sir Parakum Bandara.
                </p>
                <button
                  type="button"
                  onClick={() => setShowMsgForm(true)}
                  className="px-4 py-2 rounded-xl bg-[#003153] text-white font-bold text-xs hover:bg-[#00223d] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Ask First Question
                </button>
              </div>
            )}

            {!msgLoading &&
              messages.map(msg => {
                const isAnswered = msg.status === 'answered';
                const isExpanded = expandedMsgId === msg.message_id;
                const isUnread = isAnswered && !msg.is_read_by_student;

                return (
                  <div
                    key={msg.message_id}
                    className={`rounded-2xl bg-white shadow-sm transition-all border ${
                      isAnswered
                        ? 'border-l-4 border-l-emerald-500 border-slate-200'
                        : 'border-l-4 border-l-amber-500 border-slate-200'
                    }`}
                  >
                    {/* Card Summary Header */}
                    <button
                      type="button"
                      onClick={() => handleToggleExpandMsg(msg)}
                      className="w-full p-4 sm:p-5 flex items-start justify-between gap-3 text-left hover:bg-slate-50/70 transition-colors rounded-2xl cursor-pointer"
                    >
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Unread blue dot */}
                          {isUnread && (
                            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0 shadow-xs animate-ping" />
                          )}
                          <p className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                            {msg.subject_line}
                          </p>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              isAnswered
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {isAnswered ? 'Answered' : 'Pending Reply'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                          {msg.grade && (
                            <span className="font-semibold text-slate-600">{msg.grade}</span>
                          )}
                          {msg.lesson_title && (
                            <span>• Lesson: <strong className="text-slate-700">{msg.lesson_title}</strong></span>
                          )}
                          <span>• Sent {fmtDate(msg.created_at)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 pt-1">
                        <span className="text-xs font-bold text-[#003153] hidden sm:inline">
                          {isExpanded ? 'Collapse' : isAnswered ? 'View Answer' : 'View Question'}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {/* Expandable Details */}
                    {isExpanded && (
                      <div className="px-4 pb-5 sm:px-5 space-y-4 border-t border-slate-100 pt-4">
                        {/* Question Box */}
                        <div className="space-y-1">
                          <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                            Your Question:
                          </p>
                          <div
                            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed"
                            style={{ whiteSpace: 'pre-wrap' }}
                          >
                            {msg.question_text}
                          </div>
                        </div>

                        {/* Teacher's Reply Box */}
                        {isAnswered && (
                          <div className="space-y-1.5 animate-in fade-in">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                                Reply from {msg.replied_by || 'Sir Parakum Bandara'}
                              </span>
                              {msg.replied_at && (
                                <span className="text-slate-400 text-[11px]">
                                  {fmtDate(msg.replied_at)}
                                </span>
                              )}
                            </div>
                            <div
                              className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed"
                              style={{ whiteSpace: 'pre-wrap' }}
                            >
                              {msg.reply_text}
                            </div>
                          </div>
                        )}

                        {!isAnswered && (
                          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>
                              Your question has been received. Sir Parakum Bandara will review it and post the answer here soon.
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Course Overview Modal */}
      <CourseOverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        course={activeCourse}
        topics={topics}
        onUpdateTopicProgress={handleUpdateTopicProgress}
        onOpenLesson={handleOpenLesson}
      />

      {/* Lesson Viewer Modal */}
      <LessonViewerModal
        isOpen={!!activeLesson}
        onClose={() => setActiveLesson(null)}
        topic={activeLesson?.topic}
        moduleIndex={activeLesson?.moduleIndex}
        moduleTitle={activeLesson?.moduleTitle}
        allModules={
          activeLesson?.topic
            ? Array.isArray(activeLesson.topic.modules)
              ? activeLesson.topic.modules
              : []
            : []
        }
        isCompleted={isCurrentLessonCompleted}
        onToggleComplete={handleToggleLessonComplete}
        onNavigateModule={handleNavigateLesson}
      />
    </div>
  );
};

export default StudentDashboard;
