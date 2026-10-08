import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import {
  Video,
  Calendar,
  Clock,
  Lock,
  ExternalLink,
  Copy,
  Check,
  Radio,
  GraduationCap,
  Sparkles,
  BookOpen,
  UserCheck
} from 'lucide-react';

// ============================================================
// Student Zoom Classes
// Displays live Zoom links filtered strictly by student's grade
// ============================================================
export const ZoomLinks = () => {
  const { user } = useAuth();
  const [student, setStudent] = useState(null);
  const [zoomLinks, setZoomLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Load Zoom classes for the student's grade from database
    const fetchGradeClasses = async () => {
      try {
        setLoading(true);

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

        // 2. Load classes for the student's grade
        const studentGrade = activeStudent?.grade || 'Grade 10 Mathematics';
        const classes = await apiService.getStudentClasses(activeStudent?.id, studentGrade);

        if (isMounted) {
          setZoomLinks(classes);
        }
      } catch (err) {
        console.error('Failed to load grade-specific zoom classes:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGradeClasses();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleCopyPasscode = (id, passcode) => {
    navigator.clipboard.writeText(passcode);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px] space-y-3">
        <div className="w-10 h-10 border-4 border-[#003153] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-slate-500">Loading your grade's Zoom classes...</p>
      </div>
    );
  }

  const activeGrade = student?.grade || 'Grade 10 Mathematics';
  const gradeMatch = activeGrade.match(/Grade\s*(\d+)/i);
  const gradeLabel = gradeMatch ? `Grade ${gradeMatch[1]}` : activeGrade;
  const hasLiveClasses = zoomLinks.some((c) => c.isLive);

  return (
    <div className="space-y-6 pb-8">
      {/* Zoom Classes Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="p-3.5 rounded-2xl bg-[#003153] text-white shadow-sm shrink-0">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Live Zoom Classes
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-extrabold rounded-full bg-blue-100 text-[#003153] border border-blue-200 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{gradeLabel} Only</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Showing scheduled classes strictly for{' '}
              <span className="font-bold text-[#003153]">{activeGrade}</span>
            </p>
          </div>
        </div>

        {/* Live Indicator Status */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {hasLiveClasses ? (
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-extrabold shadow-xs">
              <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>Live Class In Progress</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#003153] text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{zoomLinks.length} Lessons Available</span>
            </div>
          )}
        </div>
      </div>

      {/* Student Grade Information Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#e6f0f7] to-[#f0f7fc] border border-[#b0d1e8] text-xs text-[#003153] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <UserCheck className="w-4 h-4 text-[#003153] shrink-0" />
          <span>
            Enrolled Student:{' '}
            <strong className="font-bold text-slate-900">{student?.name || 'Student'}</strong> (ID:{' '}
            <span className="font-mono font-bold text-slate-800">
              {student?.studentId || student?.indexNo || 'N/A'}
            </span>
            )
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-600 font-semibold">
          <span>
            Stream: <strong className="text-[#003153]">{activeGrade}</strong>
          </span>
          <span>•</span>
          <span>
            Educator: <strong className="text-[#003153]">Sir Parakum Bandara</strong>
          </span>
        </div>
      </div>

      {/* Zoom Classes Cards Grid */}
      {zoomLinks.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">
            No Classes Scheduled for {activeGrade}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Classes for your grade will appear here as soon as Sir Parakum Bandara schedules
            the next upcoming Zoom lecture.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {zoomLinks.map((session) => (
            <div
              key={session.id}
              className={`p-6 rounded-2xl bg-white border shadow-sm transition-all space-y-4 hover:shadow-md ${
                session.isLive
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'border-slate-200/90'
              }`}
            >
              {/* Header Badges & Live Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-100 text-[#003153] border border-blue-200">
                      {session.subject || 'Mathematics'} • {session.grade || gradeLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                      {session.type || 'Live Zoom Class'}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-2 leading-snug">
                    {session.title}
                  </h3>
                  {session.topic && (
                    <p className="text-xs text-slate-500 font-medium">
                      Topic: <span className="font-semibold text-slate-700">{session.topic}</span>
                    </p>
                  )}
                  <p className="text-xs text-slate-600">
                    Educator:{' '}
                    <span className="text-[#003153] font-bold">
                      {session.teacher || 'Sir Parakum Bandara'}
                    </span>
                  </p>
                </div>

                {session.isLive && (
                  <span className="px-3 py-1 text-[10px] font-extrabold uppercase rounded-full bg-emerald-600 text-white animate-pulse shrink-0 shadow-sm flex items-center gap-1">
                    <Radio className="w-3 h-3" />
                    <span>LIVE NOW</span>
                  </span>
                )}
              </div>

              {/* Schedule Box: Date & Time */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold">
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate">{session.date}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">{session.time}</span>
                </div>
              </div>

              {/* Passcode & Launch Action Button */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">
                  <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="text-xs font-mono font-bold text-slate-800">
                    Passcode: {session.passcode}
                  </span>
                  <button
                    onClick={() => handleCopyPasscode(session.id, session.passcode)}
                    className="p-1 hover:text-blue-600 text-slate-500 transition-colors"
                    title="Copy Passcode"
                  >
                    {copiedId === session.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <a
                  href={session.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white shadow-md transition-all active:scale-95 ${
                    session.isLive
                      ? 'bg-emerald-600 hover:bg-emerald-500 ring-2 ring-emerald-400/30'
                      : 'bg-[#003153] hover:bg-[#00223d]'
                  }`}
                >
                  <span>{session.isLive ? 'Join Live Now' : 'Launch Zoom'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ZoomLinks;
