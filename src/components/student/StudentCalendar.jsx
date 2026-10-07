import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  User,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Lock,
  BookOpen
} from 'lucide-react';

// ============================================================
// PRESERVED CALENDAR COMPONENT (DO NOT REDESIGN)
// Integrates dynamically with student classes & grade from database
// ============================================================
export const StudentCalendar = ({ classes = [], studentGrade = '' }) => {
  // Current real-time date (auto-updates every month/year dynamically)
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(() => {
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  });
  const [hoveredDateInfo, setHoveredDateInfo] = useState(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth(); // 0-indexed

  // Month Name (e.g. "October")
  const monthName = viewDate.toLocaleString('default', { month: 'long' });

  // Calculation for calendar grid
  // Days in current month
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  // Day of week of the 1st day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  // Convert to Monday-start (Monday = 0, ..., Sunday = 6)
  const startOffset = (firstDayOfWeek + 6) % 7;

  // Month navigation
  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const handleJumpToToday = () => {
    const now = new Date();
    setViewDate(now);
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    setSelectedDateStr(`${y}-${m}-${d}`);
  };

  const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  // ===== ADDED TODAY: Dynamic Scheduled Classes Filtering by Month & Selected Date =====
  const currentMonthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`;
  const classesThisMonth = classes.filter(c => c.date && c.date.startsWith(currentMonthPrefix));

  // Get classes for a specific date string
  const getClassesForDate = (dateStr) => {
    return classes.filter(c => c.date === dateStr);
  };

  // Selected date classes
  const selectedDateClasses = getClassesForDate(selectedDateStr);

  // Format date for readable display (e.g., "October 14, 2026")
  const formatReadableDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dt = new Date(y, m - 1, d);
      return dt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-[#c0d9ec] shadow-sm p-4 sm:p-5 space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#e6f0f7]">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[#e6f0f7] text-[#003153]">
            <CalendarIcon className="w-4 h-4 text-[#003153]" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-[#003153] tracking-tight">
              {monthName} {year}
            </h2>
            <p className="text-[10px] text-slate-500 font-semibold">
              {classesThisMonth.length > 0
                ? `${classesThisMonth.length} Mathematics ${classesThisMonth.length === 1 ? 'class' : 'classes'} scheduled`
                : 'No classes scheduled this month'}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 rounded-lg hover:bg-[#e6f0f7] text-slate-600 hover:text-[#003153] transition-colors"
            title="Previous Month"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleJumpToToday}
            className="px-2 py-1 text-[10px] font-bold text-[#003153] bg-[#e6f0f7] hover:bg-[#d8eaf6] rounded-md transition-colors"
            title="Go to Today"
          >
            Today
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1.5 rounded-lg hover:bg-[#e6f0f7] text-slate-600 hover:text-[#003153] transition-colors"
            title="Next Month"
            aria-label="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Labels (MON - SUN) */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-[10px] sm:text-[11px] font-extrabold text-slate-500 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Day Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center relative">
        {/* Empty slots before first day */}
        {Array.from({ length: startOffset }).map((_, idx) => (
          <div key={`empty-${idx}`} className="h-8 sm:h-9" />
        ))}

        {/* Month Days */}
        {Array.from({ length: totalDaysInMonth }).map((_, idx) => {
          const dayNum = idx + 1;
          const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
          const dayClasses = getClassesForDate(dayStr);
          const hasClass = dayClasses.length > 0;

          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === dayNum;

          const isSelected = selectedDateStr === dayStr;

          // Determine button style
          let buttonClasses = 'w-full h-8 sm:h-9 rounded-lg text-xs font-bold transition-all relative flex flex-col items-center justify-center ';

          if (hasClass) {
            // Class date: distinctive Navy Blue styling
            buttonClasses += 'bg-[#003153] text-white hover:bg-[#00223d] shadow-sm cursor-pointer ';
            if (isSelected) {
              buttonClasses += 'ring-2 ring-[#003153] ring-offset-2 scale-105 ';
            }
          } else if (isToday) {
            // Today (no class): light blue accent with clear border
            buttonClasses += 'bg-[#e6f0f7] text-[#003153] border-2 border-[#003153] font-extrabold ';
            if (isSelected) {
              buttonClasses += 'ring-2 ring-[#003153] ring-offset-1 ';
            }
          } else if (isSelected) {
            // Selected non-class day
            buttonClasses += 'bg-[#e6f0f7] text-[#003153] border border-[#b0d1e8] ';
          } else {
            // Regular day
            buttonClasses += 'text-slate-700 hover:bg-slate-100 font-semibold ';
          }

          return (
            <div
              key={dayStr}
              className="relative"
              onMouseEnter={() => {
                if (hasClass) {
                  setHoveredDateInfo({ dateStr: dayStr, classes: dayClasses });
                }
              }}
              onMouseLeave={() => setHoveredDateInfo(null)}
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedDateStr(dayStr);
                }}
                className={buttonClasses}
                title={hasClass ? `${dayClasses.length} class scheduled` : isToday ? 'Today' : undefined}
                aria-label={`Date ${dayNum}${hasClass ? ', has classes' : ''}${isToday ? ', today' : ''}`}
              >
                <span>{dayNum}</span>
                {/* Visual Indicator for Class Dates */}
                {hasClass && (
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-0.5" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Floating Hover Card (Desktop quick preview) */}
      {hoveredDateInfo && (
        <div className="hidden lg:block p-3 rounded-xl bg-slate-900 text-white shadow-xl text-xs space-y-1.5 border border-slate-700 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-[11px] text-blue-300 font-bold border-b border-slate-800 pb-1">
            <span>{formatReadableDate(hoveredDateInfo.dateStr)}</span>
            <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-200 text-[10px]">
              {hoveredDateInfo.classes.length} {hoveredDateInfo.classes.length === 1 ? 'Class' : 'Classes'}
            </span>
          </div>
          {hoveredDateInfo.classes.map((c) => (
            <div key={c.id} className="space-y-0.5 pt-1">
              <p className="font-bold text-white text-xs">{c.subject} - {c.topic || c.title}</p>
              <p className="text-[11px] text-slate-300 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" /> {c.time}
              </p>
              <p className="text-[10px] text-slate-400">Teacher: {c.teacher}</p>
            </div>
          ))}
        </div>
      )}

      {/* Class Date Details Section (Shown when clicking or selecting a date) */}
      <div className="pt-3 border-t border-[#e6f0f7] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#003153] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#003153]" />
            <span>Class Details: {formatReadableDate(selectedDateStr)}</span>
          </span>
          {selectedDateClasses.length > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e6f0f7] text-[#003153] border border-[#b0d1e8]">
              {selectedDateClasses.length} {selectedDateClasses.length === 1 ? 'Session' : 'Sessions'}
            </span>
          )}
        </div>

        {selectedDateClasses.length > 0 ? (
          <div className="space-y-2.5">
            {selectedDateClasses.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-xs space-y-2.5 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#003153] text-white">
                      {item.subject}
                    </span>
                    <h3 className="font-extrabold text-slate-900 mt-1 text-xs sm:text-sm leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  {item.isLive && (
                    <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-full bg-emerald-600 text-white animate-pulse shrink-0">
                      LIVE
                    </span>
                  )}
                </div>

                {/* Details Grid */}
                <div className="space-y-1.5 text-slate-700 text-[11px]">
                  <div className="flex items-center gap-1.5 text-[#003153] font-bold">
                    <Clock className="w-3.5 h-3.5 text-[#003153]" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                    <span>Topic: <strong className="text-slate-900">{item.topic || 'Curriculum Mathematics'}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>Teacher: <strong className="text-slate-900">{item.teacher}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-slate-500" />
                    <span>Type: <strong className="text-slate-900">{item.type || 'Live Zoom Class'}</strong></span>
                  </div>
                </div>

                {/* Zoom Meeting Info */}
                {item.link && (
                  <div className="pt-2 border-t border-[#d8eaf6] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    {item.passcode && (
                      <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-700 bg-white px-2 py-1 rounded border border-[#c0d9ec]">
                        <Lock className="w-3 h-3 text-slate-500" />
                        <span>Passcode: {item.passcode}</span>
                      </div>
                    )}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-[#003153] text-white hover:bg-[#00223d] transition-all shadow-xs"
                    >
                      <Video className="w-3.5 h-3.5 text-white" />
                      <span>Join Zoom Class</span>
                      <ExternalLink className="w-3 h-3 text-white/80" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-[#f4f8fb] border border-dashed border-[#c0d9ec] text-center text-xs text-slate-500">
            {classesThisMonth.length === 0 ? (
              <p className="font-semibold text-slate-600">No classes scheduled this month.</p>
            ) : (
              <p>No classes scheduled for this date. Select a highlighted date (dark blue) to view class details.</p>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 pt-2 text-[10px] text-slate-600 font-semibold border-t border-[#e6f0f7]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-[#003153]" />
          <span>Class Date</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded border-2 border-[#003153] bg-[#e6f0f7]" />
          <span>Today</span>
        </div>
      </div>
    </div>
  );
};

export default StudentCalendar;
