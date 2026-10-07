import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { Video, Plus, Trash2, Calendar, Clock, Lock, CheckCircle2, X } from 'lucide-react';

export const ZoomManagement = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    subject: 'Combined Mathematics',
    teacher: 'Sir Parakum Bandara',
    date: '2026-10-12',
    time: '18:00 - 20:30',
    link: 'https://zoom.us/j/9876543210',
    passcode: 'MATHS2026',
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
    fetchLinks();
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this Zoom schedule?')) {
      await apiService.deleteZoomLink(id);
      fetchLinks();
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#003153] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#e6f0f7] text-[#003153] border border-[#b0d1e8] font-bold">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Zoom Class Schedule Manager</h1>
            <p className="text-xs text-slate-600">Schedule live Zoom lectures, assign passcodes and active links</p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-[#003153] hover:bg-[#00223d] shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Zoom Class</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Schedule Table */}
      <div className="p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#e6f0f7] text-[#003153] uppercase tracking-wider text-[10px] font-bold border-b border-[#b0d1e8]">
              <tr>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Lecture Title</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Passcode</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {links.map((item) => (
                <tr key={item.id} className="hover:bg-[#e6f0f7]/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#003153]">{item.subject}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{item.title}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {item.date} ({item.time})
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#003153]">{item.passcode}</td>
                  <td className="py-3.5 px-4">
                    {item.isLive ? (
                      <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-full bg-emerald-600 text-white animate-pulse">
                        LIVE NOW
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                        Scheduled
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Schedule"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#003153]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-[#c0d9ec] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Schedule New Zoom Class</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Lecture Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Integration Masterclass"
                  className="w-full px-3 py-2 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs focus:outline-none focus:border-[#003153]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject Stream</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs focus:outline-none focus:border-[#003153]"
                >
                  <option value="Combined Mathematics">Combined Mathematics</option>
                  <option value="Physics">Physics</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs focus:outline-none focus:border-[#003153]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Time Slot</label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="18:00 - 20:30"
                    className="w-full px-3 py-2 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs focus:outline-none focus:border-[#003153]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Zoom Meeting Link</label>
                <input
                  type="text"
                  required
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs focus:outline-none focus:border-[#003153]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Meeting Passcode</label>
                <input
                  type="text"
                  required
                  value={formData.passcode}
                  onChange={(e) => setFormData({ ...formData, passcode: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs focus:outline-none focus:border-[#003153]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#003153] hover:bg-[#00223d]"
                >
                  Schedule Class
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
