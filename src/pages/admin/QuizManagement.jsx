import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import MathRenderer from '../../components/MathRenderer';
import { FilePlus, Trash2, Plus, CheckCircle2, X } from 'lucide-react';

export const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [quizForm, setQuizForm] = useState({
    title: '',
    subject: 'Combined Mathematics',
    durationMinutes: 30,
    qText: '\\int_{0}^{\\pi} \\sin(x) dx = ?',
    optA: '0',
    optB: '1',
    optC: '2',
    optD: '-1',
    correctAnswer: 2
  });

  const fetchQuizzes = async () => {
    const data = await apiService.getQuizzes();
    setQuizzes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    const newQuiz = {
      title: quizForm.title,
      subject: quizForm.subject,
      durationMinutes: Number(quizForm.durationMinutes),
      questions: [
        {
          id: 'q-' + Date.now(),
          questionText: quizForm.qText,
          options: [quizForm.optA, quizForm.optB, quizForm.optC, quizForm.optD],
          correctAnswer: Number(quizForm.correctAnswer),
          marks: 10
        }
      ]
    };

    await apiService.createQuiz(newQuiz);
    setShowModal(false);
    setSuccessMsg('Quiz assessment created!');
    fetchQuizzes();
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this quiz?')) {
      await apiService.deleteQuiz(id);
      fetchQuizzes();
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
            <FilePlus className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Quiz & Assessment Builder</h1>
            <p className="text-xs text-slate-400">Create unit tests, embed math equations, and set answer keys</p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-purple-600 hover:bg-purple-500 shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Build New Quiz</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Quiz List */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Quiz Title</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Questions</th>
                <th className="py-3 px-4">Max Marks</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {quizzes.map((q) => (
                <tr key={q.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-purple-400">{q.subject}</td>
                  <td className="py-3.5 px-4 font-semibold text-white">{q.title}</td>
                  <td className="py-3.5 px-4 text-slate-400">{q.durationMinutes} mins</td>
                  <td className="py-3.5 px-4">{q.totalQuestions} Questions</td>
                  <td className="py-3.5 px-4 font-mono text-purple-300">{q.totalMarks} Marks</td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleDelete(q.id)}
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

      {/* Modal Quiz Creator */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Build New Quiz Assessment</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuiz} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Quiz Title</label>
                <input
                  type="text"
                  required
                  value={quizForm.title}
                  onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
                  placeholder="Unit Test: Integration"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Subject</label>
                  <select
                    value={quizForm.subject}
                    onChange={(e) => setQuizForm({ ...quizForm, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                  >
                    <option value="Combined Mathematics">Combined Mathematics</option>
                    <option value="Physics">Physics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={quizForm.durationMinutes}
                    onChange={(e) => setQuizForm({ ...quizForm, durationMinutes: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Question 1 Text (Supports KaTeX)</label>
                <input
                  type="text"
                  required
                  value={quizForm.qText}
                  onChange={(e) => setQuizForm({ ...quizForm, qText: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Option A</label>
                  <input
                    type="text"
                    required
                    value={quizForm.optA}
                    onChange={(e) => setQuizForm({ ...quizForm, optA: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Option B</label>
                  <input
                    type="text"
                    required
                    value={quizForm.optB}
                    onChange={(e) => setQuizForm({ ...quizForm, optB: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Option C</label>
                  <input
                    type="text"
                    required
                    value={quizForm.optC}
                    onChange={(e) => setQuizForm({ ...quizForm, optC: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Option D</label>
                  <input
                    type="text"
                    required
                    value={quizForm.optD}
                    onChange={(e) => setQuizForm({ ...quizForm, optD: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Correct Answer Option</label>
                <select
                  value={quizForm.correctAnswer}
                  onChange={(e) => setQuizForm({ ...quizForm, correctAnswer: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-purple-500"
                >
                  <option value={0}>Option A</option>
                  <option value={1}>Option B</option>
                  <option value={2}>Option C</option>
                  <option value={3}>Option D</option>
                </select>
              </div>

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
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500"
                >
                  Save Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizManagement;
