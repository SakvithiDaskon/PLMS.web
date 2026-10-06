import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import MathRenderer from '../../components/MathRenderer';
import { BookOpen, Clock, Download, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

export const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorials = async () => {
      const data = await apiService.getTutorials();
      setTutorials(data);
      if (data.length > 0) setSelectedTutorial(data[0]);
      setLoading(false);
    };
    fetchTutorials();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Tutorial & Theory Modules</h1>
            <p className="text-xs text-slate-400">Interactive lesson notes with inline KaTeX formulas and downloadable PDFs</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left List of Tutorials */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Available Modules</p>
          {tutorials.map((tut) => (
            <button
              key={tut.id}
              onClick={() => setSelectedTutorial(tut)}
              className={`w-full text-left p-4 rounded-2xl border transition-all space-y-2 ${
                selectedTutorial?.id === tut.id
                  ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-indigo-400 uppercase">{tut.subject}</span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {tut.readTime}
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-200 leading-snug">{tut.title}</h3>
              <p className="text-[11px] text-slate-400">{tut.unit}</p>
            </button>
          ))}
        </div>

        {/* Right Active Tutorial Reader */}
        {selectedTutorial && (
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {selectedTutorial.subject}
                  </span>
                  <span className="text-xs text-slate-400">{selectedTutorial.unit}</span>
                </div>
                <h2 className="text-xl font-bold text-white">{selectedTutorial.title}</h2>
              </div>

              <a
                href={selectedTutorial.pdfUrl}
                onClick={(e) => {
                  e.preventDefault();
                  alert('PDF worksheet document download initialized for ' + selectedTutorial.title);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-colors shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Notes</span>
              </a>
            </div>

            {/* Rendered Math Formula Highlights */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Key Formula Derivations & KaTeX Expressions</span>
              </h4>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                {selectedTutorial.mathSnippets && selectedTutorial.mathSnippets.map((snippet, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono">Formula Result #{idx + 1}:</span>
                    <MathRenderer math={snippet} />
                  </div>
                ))}
              </div>
            </div>

            {/* Content text */}
            <div className="prose prose-invert max-w-none text-xs text-slate-300 space-y-3 leading-relaxed">
              <p>
                The reduction formula allows solving higher-order trigonometric integrals by expressing \(\int \sin^n(x) dx\) in terms of lower power integrals.
              </p>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <p className="font-semibold text-slate-200 mb-1">Practice Tip from Sir Daskon:</p>
                <p className="text-slate-400">
                  Always verify boundary conditions when evaluating definite integrals from \(0\) to \(\pi/2\).
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tutorials;
