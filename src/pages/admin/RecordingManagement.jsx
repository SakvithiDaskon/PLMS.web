import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import MathRenderer from '../../components/MathRenderer';
import { PlaySquare, Plus, Trash2, CheckCircle2, X } from 'lucide-react';

export const RecordingManagement = () => {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    subject: 'Combined Mathematics',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
    description: '',
    mathNotes: ''
  });

  const fetchRecordings = async () => {
    const data = await apiService.getClassRecordings();
    setRecordings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecordings();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    await apiService.uploadRecording(formData);
    setShowModal(false);
    setSuccessMsg('Class recording published successfully!');
    fetchRecordings();
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this recording?')) {
      await apiService.deleteRecording(id);
      fetchRecordings();
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <PlaySquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Class Recording Upload Manager</h1>
            <p className="text-xs text-slate-400">Publish video recordings with attached LaTeX math formula snippets</p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Video Recording</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Recordings Table */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Recording Title</th>
                <th className="py-3 px-4">Date & Duration</th>
                <th className="py-3 px-4">Formula Snippet</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recordings.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-indigo-400">{rec.subject}</td>
                  <td className="py-3.5 px-4 font-semibold text-white">{rec.title}</td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {rec.date} ({rec.duration})
                  </td>
                  <td className="py-3.5 px-4">
                    {rec.mathNotes ? <MathRenderer math={rec.mathNotes} inline /> : <span className="text-slate-500">None</span>}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleDelete(rec.id)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 transition-colors"
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

      {/* Modal Upload Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Upload New Class Video</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Recording Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Calculus Part IV"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Combined Mathematics">Combined Mathematics</option>
                    <option value="Physics">Physics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Video Embed URL</label>
                  <input
                    type="text"
                    required
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/embed/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Video Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of topics covered..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Attached KaTeX Math Formula (LaTeX)
                </label>
                <input
                  type="text"
                  value={formData.mathNotes}
                  onChange={(e) => setFormData({ ...formData, mathNotes: e.target.value })}
                  placeholder="\int_{a}^{b} f(x) dx"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              {formData.mathNotes && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Live Formula Preview:</span>
                  <MathRenderer math={formData.mathNotes} />
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500"
                >
                  Publish Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordingManagement;
