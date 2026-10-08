import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import {
  Video,
  Plus,
  Trash2,
  Calendar,
  Clock,
  Lock,
  CheckCircle2,
  X,
  ExternalLink,
  Copy,
  Check,
  GraduationCap
} from 'lucide-react';

export const ZoomManagement = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  // Helper to get tomorrow's date string YYYY-MM-DD
  const getTomorrowDateString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    title: '',
    subject: 'Mathematics',
    grade: 'Grade 11',
    teacher: 'Sir Parakum Bandara',
    date: getTomorrowDateString(),
    time: '18:00 - 20:00',
    link: 'https://zoom.us/j/9876543210',
    passcode: '123456',
    isLive: false
  });

  const fetchLinks = async () => {
    const data = await apiService.getZoomLinks();
    setLinks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await apiService.createZoomLink(formData);
    setShowModal(false);
    setSuccessMsg('Zoom class scheduled successfully!');
    setFormData({
      title: '',
      subject: 'Mathematics',
      grade: 'Grade 11',
      teacher: 'Sir Parakum Bandara',
      date: getTomorrowDateString(),
      time: '18:00 - 20:00',
      link: 'https://zoom.us/j/9876543210',
      passcode: '123456',
      isLive: false
    });
    fetchLinks();
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this Zoom schedule?')) {
      await apiService.deleteZoomLink(id);
      fetchLinks();
    }
  };

  const handleCopyLink = (linkStr, id) => {
    navigator.clipboard.writeText(linkStr);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter links by grade
  const filteredLinks = links.filter((item) => {
    if (selectedGradeFilter === 'All') return true;
    return (item.grade || '').includes(selectedGradeFilter);
  });

  const gradeOptions = ['All', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'];

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#003153] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-[#003153] text-white shadow-xl border border-[#00223d]">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
              <Video className="w-3.5 h-3.5 text-blue-200" />
              <span>Live Class Scheduler</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Zoom Class Schedule Manager</h1>
            <p className="text-xs sm:text-sm text-blue-100">
              Schedule live Zoom lectures for Grade 6 to Grade 11, set dates, and assign numeric passcodes.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-[#003153] bg-white hover:bg-[#e6f0f7] shadow-lg transition-all hover:scale-105 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule New Zoom Class</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 font-bold shadow-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Grade Filter Tabs (Pull All Grades 6 to 11) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold text-slate-500 mr-2 shrink-0 flex items-center gap-1">
          <GraduationCap className="w-4 h-4 text-[#003153]" /> Filter by Grade:
        </span>
        {gradeOptions.map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGradeFilter(g)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
              selectedGradeFilter === g
                ? 'bg-[#003153] text-white border-[#003153] shadow-sm'
                : 'bg-white text-slate-700 border-[#c0d9ec] hover:bg-[#e6f0f7]'
            }`}
          >
            {g === 'All' ? 'All Grades (6-11)' : g}
          </button>
        ))}
      </div>

      {/* Schedules Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLinks.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Header Info */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-black bg-[#e6f0f7] text-[#003153] border border-[#b0d1e8]">
                  {item.grade || 'Grade 11'}
                </span>

                <div className="flex items-center gap-2">
                  {item.isLive ? (
                    <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-full bg-emerald-600 text-white animate-pulse">
                      LIVE NOW
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      Scheduled
                    </span>
                  )}

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete schedule"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title & Teacher */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Teacher: <span className="font-bold text-slate-700">{item.teacher || 'Sir Parakum Bandara'}</span>
                </p>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600 bg-[#f4f8fb] p-3 rounded-xl border border-[#c0d9ec]/60">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#003153]" />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#003153]" />
                  <span>{item.time}</span>
                </div>
              </div>
            </div>

            {/* Bottom Passcode & Link */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Lock className="w-3.5 h-3.5 text-[#003153]" />
                  <span>Passcode:</span>
                  <span className="px-2.5 py-0.5 rounded bg-[#e6f0f7] text-[#003153] font-mono font-black text-xs border border-[#b0d1e8]">
                    {item.passcode || '123456'}
                  </span>
                </div>

                <button
                  onClick={() => handleCopyLink(item.link, item.id)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-[#003153] hover:bg-[#e6f0f7] border border-[#b0d1e8] transition-colors"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#003153] hover:bg-[#00223d] shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Launch Zoom Meeting</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredLinks.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#c0d9ec] space-y-2">
          <Video className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="text-sm font-bold text-slate-700">No Zoom classes scheduled for this grade yet.</p>
          <button
            onClick={() => setShowModal(true)}
            className="text-xs font-bold text-[#003153] underline"
          >
            Click here to schedule a class
          </button>
        </div>
      )}

      {/* Simple & Beautiful Schedule Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#003153]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white border border-[#c0d9ec] p-6 sm:p-7 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#003153] text-white">
                  <Video className="w-5 h-5 text-blue-200" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">Schedule Zoom Class</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              {/* Lecture Title */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">Lecture Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Grade 11 Quadratic Equations & Formulae"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs font-semibold focus:outline-none focus:border-[#003153]"
                />
              </div>

              {/* Grade Selection (Grade 6 to 11) */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">Target Grade</label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs font-bold focus:outline-none focus:border-[#003153]"
                >
                  <option value="Grade 11">Grade 11 (O/L Mathematics)</option>
                  <option value="Grade 10">Grade 10 Mathematics</option>
                  <option value="Grade 9">Grade 9 Mathematics</option>
                  <option value="Grade 8">Grade 8 Mathematics</option>
                  <option value="Grade 7">Grade 7 Mathematics</option>
                  <option value="Grade 6">Grade 6 Mathematics</option>
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Date (Tomorrow onwards)</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs font-semibold focus:outline-none focus:border-[#003153]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Time Slot</label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="18:00 - 20:00"
                    className="w-full px-3 py-2 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs font-semibold focus:outline-none focus:border-[#003153]"
                  />
                </div>
              </div>

              {/* Zoom Meeting Link */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">Zoom Meeting Link</label>
                <input
                  type="url"
                  required
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://zoom.us/j/9876543210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs font-mono focus:outline-none focus:border-[#003153]"
                />
              </div>

              {/* Numeric Passcode */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">
                  Numeric Passcode (e.g. 123456)
                </label>
                <input
                  type="text"
                  required
                  pattern="[0-9]+"
                  value={formData.passcode}
                  onChange={(e) => setFormData({ ...formData, passcode: e.target.value.replace(/[^0-9]/g, '') })}
                  placeholder="123456"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-[#003153] font-mono font-extrabold text-xs focus:outline-none focus:border-[#003153]"
                />
              </div>

              {/* Actions */}
              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#003153] hover:bg-[#00223d] shadow-md transition-all hover:scale-105"
                >
                  Confirm Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZoomManagement;
