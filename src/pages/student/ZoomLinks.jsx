import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import {
  Video,
  ExternalLink,
  GraduationCap,
  Sparkles,
  BookOpen,
  UserCheck
} from 'lucide-react';

// Format date as '2026/oct/12' and determine its weekday
const formatDateDetails = (dateStr) => {
  if (!dateStr) return { formattedDate: '', weekday: '' };

  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Check if dateStr matches YYYY/mon/DD or YYYY-mon-DD
  const slashMatch = String(dateStr).trim().match(/^(\d{4})[/-]([a-zA-Z]{3})[/-](\d{1,2})$/);
  if (slashMatch) {
    const year = slashMatch[1];
    const monStr = slashMatch[2].toLowerCase();
    const day = String(slashMatch[3]).padStart(2, '0');
    const mIdx = months.indexOf(monStr);
    let weekday = '';
    if (mIdx !== -1) {
      const d = new Date(parseInt(year, 10), mIdx, parseInt(day, 10));
      if (!isNaN(d.getTime())) {
        weekday = weekdays[d.getDay()];
      }
    }
    return {
      formattedDate: `${year}/${monStr}/${day}`,
      weekday
    };
  }

  // Handle YYYY-MM-DD or YYYY/MM/DD (numeric)
  const numMatch = String(dateStr).trim().match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/);
  if (numMatch) {
    const year = numMatch[1];
    const mIdx = parseInt(numMatch[2], 10) - 1;
    const day = String(numMatch[3]).padStart(2, '0');
    const d = new Date(parseInt(year, 10), mIdx, parseInt(day, 10));
    const weekday = !isNaN(d.getTime()) ? weekdays[d.getDay()] : '';
    const monStr = months[mIdx] || '';
    return {
      formattedDate: `${year}/${monStr}/${day}`,
      weekday
    };
  }

  // Fallback to standard Date parsing
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    const year = d.getFullYear();
    const month = months[d.getMonth()];
    const day = String(d.getDate()).padStart(2, '0');
    const weekday = weekdays[d.getDay()];
    return {
      formattedDate: `${year}/${month}/${day}`,
      weekday
    };
  }

  return { formattedDate: dateStr, weekday: '' };
};

// Format time with AM/PM (e.g., '18:00 - 20:00' -> '06:00 PM - 08:00 PM')
const formatTimeWithAmPm = (timeStr) => {
  if (!timeStr) return '';

  const convertSingle = (t) => {
    const trimmed = t.trim();
    if (!trimmed) return '';
    if (/am|pm/i.test(trimmed)) return trimmed;
    const match = trimmed.match(/^(\d{1,2}):(\d{2})/);
    if (!match) return trimmed;
    let hours = parseInt(match[1], 10);
    const mins = match[2];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const paddedHours = String(hours).padStart(2, '0');
    return `${paddedHours}:${mins} ${ampm}`;
  };

  if (timeStr.includes('-')) {
    return timeStr
      .split('-')
      .map(convertSingle)
      .join(' - ');
  }
  return convertSingle(timeStr);
};

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
                Zoom Classes
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

        {/* Indicator Status */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#003153] text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{zoomLinks.length} Lessons Available</span>
          </div>
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
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm transition-all space-y-4 hover:shadow-md"
            >
              {/* Header Badges */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-100 text-[#003153] border border-blue-200">
                      {session.subject || 'Mathematics'} • {session.grade || gradeLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                      {session.type || 'Zoom Class'}
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
              </div>

              {/* Schedule Box: Date & Time */}
              {(() => {
                const { formattedDate, weekday } = formatDateDetails(session.date);
                const formattedTime = formatTimeWithAmPm(session.time);
                return (
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="space-y-0.5">
                      <div className="text-slate-700">
                        <span className="font-extrabold text-[#003153]">Date: </span>
                        <span className="font-bold text-slate-900">{formattedDate}</span>
                      </div>
                      {weekday && (
                        <div className="text-[11px] font-bold text-slate-500">
                          {weekday}
                        </div>
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-slate-700">
                        <span className="font-extrabold text-[#003153]">Time: </span>
                        <span className="font-bold text-slate-900">{formattedTime}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Passcode & Launch Action Button */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">
                  <span className="text-xs font-mono font-bold text-slate-800">
                    Passcode: {session.passcode}
                  </span>
                  <button
                    onClick={() => handleCopyPasscode(session.id, session.passcode)}
                    className="px-2 py-0.5 rounded text-[11px] font-bold text-blue-700 hover:bg-blue-50 transition-colors"
                    title="Copy Passcode"
                  >
                    {copiedId === session.id ? (
                      <span className="text-emerald-600">Copied!</span>
                    ) : (
                      <span>Copy</span>
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
