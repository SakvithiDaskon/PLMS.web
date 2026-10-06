import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import MathRenderer from '../../components/MathRenderer';
import { BookOpen, Plus, CheckCircle2, Calculator, Sparkles } from 'lucide-react';

export const TutorialManagement = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    subject: 'Combined Mathematics',
    unit: 'Unit 5 - Pure Mathematics',
    readTime: '20 min read',
    contentMarkdown: '',
    latexFormula: '\\int u \\frac{dv}{dx} dx = uv - \\int v \\frac{du}{dx} dx'
  });

  const fetchTutorials = async () => {
    const data = await apiService.getTutorials();
    setTutorials(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await apiService.createTutorial({
      ...formData,
      mathSnippets: [formData.latexFormula]
    });
    setSuccessMsg('Tutorial module & KaTeX formula published!');
    setFormData({
      title: '',
      subject: 'Combined Mathematics',
      unit: 'Unit 5 - Pure Mathematics',
      readTime: '20 min read',
      contentMarkdown: '',
      latexFormula: '\\int u \\frac{dv}{dx} dx = uv - \\int v \\frac{du}{dx} dx'
    });
    fetchTutorials();
    setTimeout(() => setSuccessMsg(''), 3000);
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
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Tutorial Creator & KaTeX Math Editor</h1>
          <p className="text-xs text-slate-400">Publish interactive lesson modules with rendered LaTeX formulas</p>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Creator Form */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-indigo-400" />
            <span>Create New Tutorial Module</span>
          </h2>

          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Module Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Advanced Reduction Formulas"
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
                <label className="block text-xs font-medium text-slate-300 mb-1">Unit / Chapter</label>
                <input
                  type="text"
                  required
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="Unit 5 Pure Mathematics"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center justify-between">
                <span>Key LaTeX Formula Expression</span>
                <span className="text-[10px] text-indigo-400">Live KaTeX Preview Enabled</span>
              </label>
              <input
                type="text"
                required
                value={formData.latexFormula}
                onChange={(e) => setFormData({ ...formData, latexFormula: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-indigo-300 font-mono text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Live KaTeX Render Preview */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-semibold text-slate-400 uppercase flex items-center gap-1">
                <Calculator className="w-3 h-3 text-indigo-400" /> Instant Math Renderer Preview
              </span>
              <MathRenderer math={formData.latexFormula} />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 transition-all"
            >
              Publish Tutorial Module
            </button>
          </form>
        </div>

        {/* Existing Modules List */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white">Published Tutorial Modules</h2>
          <div className="space-y-3">
            {tutorials.map((t) => (
              <div key={t.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-indigo-400 uppercase">{t.subject}</span>
                  <span className="text-[10px] text-slate-400">{t.readTime}</span>
                </div>
                <h3 className="text-xs font-bold text-white">{t.title}</h3>
                <p className="text-[11px] text-slate-400">{t.unit}</p>
                {t.mathSnippets && t.mathSnippets[0] && (
                  <MathRenderer math={t.mathSnippets[0]} inline />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialManagement;
