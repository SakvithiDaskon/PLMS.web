import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import MathRenderer from '../../components/MathRenderer';
import { FileQuestion, Clock, CheckCircle2, Award, AlertCircle, HelpCircle } from 'lucide-react';

export const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedResult, setSubmittedResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const data = await apiService.getQuizzes();
      setQuizzes(data);
      if (data.length > 0) setActiveQuiz(data[0]);
      setLoading(false);
    };
    fetchQuizzes();
  }, []);

  const handleOptionSelect = (qId, optionIdx) => {
    setSelectedAnswers({ ...selectedAnswers, [qId]: optionIdx });
  };

  const handleSubmitQuiz = async () => {
    if (!activeQuiz) return;
    const res = await apiService.submitQuizAnswers(activeQuiz.id, selectedAnswers);
    setSubmittedResult(res);
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
            <FileQuestion className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Online Quizzes & Unit Assessments</h1>
            <p className="text-xs text-slate-400">Test your mathematical speed & formula concepts with instant scoring</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quiz Select Menu */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Available Assessments</p>
          {quizzes.map((q) => (
            <button
              key={q.id}
              onClick={() => {
                setActiveQuiz(q);
                setSubmittedResult(null);
                setSelectedAnswers({});
              }}
              className={`w-full text-left p-4 rounded-2xl border transition-all space-y-2 ${
                activeQuiz?.id === q.id
                  ? 'bg-slate-900 border-purple-500 shadow-lg shadow-purple-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-purple-400 uppercase">{q.subject}</span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {q.durationMinutes} mins
                </span>
              </div>
              <h3 className="text-xs font-bold text-slate-200">{q.title}</h3>
              <p className="text-[11px] text-slate-400">Questions: {q.totalQuestions} | Max Marks: {q.totalMarks}</p>
            </button>
          ))}
        </div>

        {/* Active Quiz Sheet */}
        {activeQuiz && (
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase">{activeQuiz.subject}</span>
                <h2 className="text-lg font-bold text-white">{activeQuiz.title}</h2>
              </div>
              <div className="px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Timer: {activeQuiz.durationMinutes}:00</span>
              </div>
            </div>

            {submittedResult ? (
              /* Quiz Score Result Banner */
              <div className="p-6 rounded-xl bg-slate-950 border border-purple-500/40 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-purple-500/20 border border-purple-500/50 text-purple-300 mx-auto flex items-center justify-center">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Assessment Submitted!</h3>
                <div className="text-3xl font-extrabold text-purple-400">
                  {submittedResult.score} / {submittedResult.maxScore}{' '}
                  <span className="text-sm font-normal text-slate-400">({submittedResult.percentage}%)</span>
                </div>
                <p className="text-xs text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
                  Feedback: {submittedResult.feedback}
                </p>
                <button
                  onClick={() => {
                    setSubmittedResult(null);
                    setSelectedAnswers({});
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500"
                >
                  Retake Quiz
                </button>
              </div>
            ) : (
              /* Question List */
              <div className="space-y-6">
                {activeQuiz.questions.map((q, qIdx) => (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-slate-200">
                        Q{qIdx + 1}. {q.questionText}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">[{q.marks} Marks]</span>
                    </div>

                    {/* Render embedded KaTeX formula in question if detected */}
                    {q.questionText.includes('\\') && (
                      <MathRenderer math={q.questionText} />
                    )}

                    {/* Radio Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleOptionSelect(q.id, optIdx)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs border transition-all flex items-center gap-2 ${
                            selectedAnswers[q.id] === optIdx
                              ? 'bg-purple-950/80 border-purple-500 text-purple-200 font-semibold'
                              : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[10px] flex items-center justify-center font-bold shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleSubmitQuiz}
                  className="w-full py-3 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/25 transition-all"
                >
                  Submit Quiz Answers
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzes;
