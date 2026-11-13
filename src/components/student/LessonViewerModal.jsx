import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowLeft,
  ArrowRight,
  PlayCircle,
  BookOpen,
  FileText,
  Video,
  PlaySquare,
  ClipboardList,
  Download,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  BookmarkCheck,
  Check,
  Loader2,
  Trophy,
  XCircle,
} from 'lucide-react';
import { apiService } from '../../services/api';

// YouTube SVG Icon replacement for lucide-react
const Youtube = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

// ─────────────────────────── helpers ────────────────────────────
const isYouTubeUrl = (url = '') =>
  url.includes('youtube.com/embed') || url.includes('youtu.be') || url.includes('youtube.com/watch');

const toEmbedUrl = (url = '') => {
  if (!url) return '';
  if (url.includes('youtube.com/embed')) return url;
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  return url;
};

const getYouTubeThumbnail = (url = '', customThumb = '') => {
  if (customThumb) return customThumb;
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) {
    return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  }
  return null;
};

const fmtDate = (d) => {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return d;
  }
};

const FileTypeBadge = ({ url = '', type = '' }) => {
  const ext = (type || url.split('.').pop() || '').toUpperCase().slice(0, 4);
  const color =
    ext === 'PDF'
      ? 'bg-rose-100 text-rose-700'
      : ext === 'DOCX'
      ? 'bg-blue-100 text-blue-700'
      : ext === 'PPTX'
      ? 'bg-orange-100 text-orange-700'
      : 'bg-slate-100 text-slate-600';
  return <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${color}`}>{ext || 'FILE'}</span>;
};

// ─────────────────────────── section components ──────────────────

/** Section 1: 🎥 Lesson Recording */
const RecordingSection = ({ recordings = [] }) => {
  if (!recordings.length) {
    return (
      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
        <PlayCircle className="w-12 h-12 text-slate-300 mx-auto" />
        <p className="text-sm text-slate-600 font-bold">No recording available for this lesson yet.</p>
        <p className="text-xs text-slate-400">Class recordings uploaded by the teacher will appear here.</p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {recordings.map((rec, i) => {
        const videoUrl = rec.video_url || rec.videoUrl || '';
        const isYt = isYouTubeUrl(videoUrl);
        const title = rec.title || 'Lesson Recording';
        const teacher = rec.teacher_name || rec.teacherName || '';
        const recDate = rec.recording_date || rec.recordingDate || '';
        const duration = rec.duration || '';

        return (
          <div key={rec.recording_id || rec.id || i} className="rounded-2xl border border-[#c0d9ec] bg-white shadow-sm overflow-hidden">
            {videoUrl && isYt ? (
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={toEmbedUrl(videoUrl)}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : videoUrl ? (
              <video controls className="w-full bg-black max-h-[420px]">
                <source src={videoUrl} />
                Your browser does not support the video tag.
              </video>
            ) : null}
            <div className="p-4 sm:p-5 space-y-1.5">
              <p className="text-base font-extrabold text-slate-900">{title}</p>
              <div className="flex flex-wrap gap-2.5 items-center text-xs text-slate-500">
                {teacher && <span className="font-bold text-[#003153]">👨‍🏫 {teacher}</span>}
                {recDate && <span>📅 {fmtDate(recDate)}</span>}
                {duration && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 font-bold border border-sky-100">
                    <Clock className="w-3 h-3" /> {duration}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Section 2: 📚 Tutorials */
const TutorialsSection = ({ tutorials = [] }) => {
  if (!tutorials.length) {
    return (
      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
        <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
        <p className="text-sm text-slate-600 font-bold">No tutorials have been uploaded yet.</p>
        <p className="text-xs text-slate-400">Downloadable tutorial sheets will appear here once published.</p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {tutorials.map((tut, i) => {
        const fileUrl = tut.file_url || tut.fileUrl || '';
        const fileType = tut.file_type || tut.fileType || 'PDF';
        const teacher = tut.teacher_name || tut.teacherName || '';
        const uploadDate = tut.upload_date || tut.uploadDate || tut.created_at || '';

        return (
          <div
            key={tut.tutorial_id || tut.id || i}
            className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#003153]/30 transition-all"
          >
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm sm:text-base font-bold text-slate-900">{tut.title}</p>
                <FileTypeBadge url={fileUrl} type={fileType} />
              </div>
              {tut.description && <p className="text-xs text-slate-600 leading-relaxed">{tut.description}</p>}
              <div className="flex gap-3 text-xs text-slate-400 flex-wrap pt-0.5">
                {teacher && <span className="font-semibold text-[#003153]">👨‍🏫 {teacher}</span>}
                {uploadDate && <span>📅 {fmtDate(uploadDate)}</span>}
              </div>
            </div>
            {fileUrl && (
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#003153] text-white text-xs font-bold hover:bg-[#00223d] transition-colors shrink-0 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" /> Download / View
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

/** Section 3: 📝 Lesson Notes */
const NotesSection = ({ notes = [] }) => {
  const [expanded, setExpanded] = useState({ 0: true });

  if (!notes.length) {
    return (
      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
        <FileText className="w-12 h-12 text-slate-300 mx-auto" />
        <p className="text-sm text-slate-600 font-bold">Lesson notes are not available yet.</p>
        <p className="text-xs text-slate-400">Written explanations and study materials will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notes.map((note, i) => {
        const teacher = note.teacher_name || note.teacherName || '';
        const createdDate = note.created_at || note.createdAt || '';
        const pdfUrl = note.pdf_url || note.pdfUrl || '';
        const isOpen = !!expanded[i];

        return (
          <div key={note.note_id || note.id || i} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))}
              className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="space-y-1 min-w-0">
                <p className="text-sm sm:text-base font-bold text-slate-900">{note.title}</p>
                <div className="flex gap-3 text-xs text-slate-400 flex-wrap">
                  {teacher && <span className="font-semibold text-[#003153]">👨‍🏫 {teacher}</span>}
                  {createdDate && <span>📅 {fmtDate(createdDate)}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-[#003153] hidden sm:inline">
                  {isOpen ? 'Collapse' : 'Read Note'}
                </span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </div>
            </button>
            {isOpen && (
              <div className="px-4 pb-5 sm:px-5 space-y-4 border-t border-slate-100 pt-4">
                {note.content && (
                  <div
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed"
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {note.content}
                  </div>
                )}
                {pdfUrl && (
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF Note
                  </a>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/** Section 4: 🎬 Recommended YouTube Videos */
const YoutubeSection = ({ youtube = [] }) => {
  if (!youtube.length) {
    return (
      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
        <Youtube className="w-12 h-12 text-slate-300 mx-auto" />
        <p className="text-sm text-slate-600 font-bold">No recommended videos available.</p>
        <p className="text-xs text-slate-400">Curated external video links for this lesson will appear here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {youtube.map((vid, i) => {
        const ytUrl = vid.youtube_url || vid.youtubeUrl || '';
        const thumb = getYouTubeThumbnail(ytUrl, vid.thumbnail_url || vid.thumbnailUrl);
        const channel = vid.channel_name || vid.channelName || '';

        return (
          <div
            key={vid.rec_id || vid.id || i}
            className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col hover:border-[#003153]/30 transition-all"
          >
            {thumb && (
              <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                <img
                  src={thumb}
                  alt={vid.title}
                  className="w-full h-full object-cover"
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <PlayCircle className="w-10 h-10 text-white drop-shadow-md" />
                </div>
              </div>
            )}
            <div className="p-4 flex flex-col flex-1 space-y-2">
              <p className="text-sm font-bold text-slate-900 line-clamp-2">{vid.title}</p>
              {channel && <p className="text-xs text-[#003153] font-semibold">📺 {channel}</p>}
              {vid.description && <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{vid.description}</p>}
              <div className="mt-auto pt-3">
                <a
                  href={ytUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Watch on YouTube
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Section 5: 📋 Lesson Quiz */
const QuizSection = ({ quizzes = [], studentAttempt }) => {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (studentAttempt) {
      setQuizResult(studentAttempt);
      setQuizSubmitted(true);
    } else {
      setQuizResult(null);
      setQuizSubmitted(false);
      setQuizAnswers({});
    }
  }, [studentAttempt]);

  if (!quizzes || !quizzes.length) {
    return (
      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
        <ClipboardList className="w-12 h-12 text-slate-300 mx-auto" />
        <p className="text-sm text-slate-600 font-bold">No quizzes available for this lesson.</p>
        <p className="text-xs text-slate-400">Check back later once the teacher publishes a lesson test.</p>
      </div>
    );
  }

  const quiz = quizzes[0];
  let questions = [];
  try {
    questions = Array.isArray(quiz.questions)
      ? quiz.questions
      : typeof quiz.questions === 'string'
      ? JSON.parse(quiz.questions)
      : [];
  } catch {
    questions = [];
  }

  const quizId = quiz.quiz_id || quiz.quizId || quiz.id;
  const durationText = quiz.duration || (quiz.duration_minutes ? `${quiz.duration_minutes} mins` : (quiz.durationMinutes ? `${quiz.durationMinutes} mins` : ''));
  const totalMarks = quiz.total_marks || quiz.totalMarks || 100;

  const handleSubmit = async () => {
    // Validate all answered
    const unanswered = questions.filter((_, qi) => quizAnswers[qi] === undefined);
    if (unanswered.length > 0) {
      setSubmitError(`Please answer all ${questions.length} questions before submitting.`);
      return;
    }
    setSubmitError('');
    setSubmitting(true);

    try {
      const answersPayload = questions.map((q, idx) => {
        const chosenIdx = quizAnswers[idx];
        const rawOpts = Array.isArray(q.options)
          ? q.options
          : typeof q.options === 'string'
          ? q.options.split(',').map(s => s.trim())
          : [];
        const optText = rawOpts[chosenIdx] !== undefined
          ? (typeof rawOpts[chosenIdx] === 'object' ? rawOpts[chosenIdx].text : rawOpts[chosenIdx])
          : chosenIdx;
        return {
          questionIndex: idx,
          selectedOption: chosenIdx,
          selectedAnswer: optText
        };
      });

      const result = await apiService.submitQuizAttempt(quizId, answersPayload);
      if (result && (result.score !== undefined || result.success)) {
        setQuizResult(result);
        setQuizSubmitted(true);
      } else {
        setSubmitError(result?.message || 'Failed to submit quiz.');
      }
    } catch {
      setSubmitError('Failed to submit quiz. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // If student already attempted or submitted just now
  if (quizSubmitted && quizResult) {
    const totalM = quizResult.totalMarks || quizResult.total_marks || totalMarks;
    const score = quizResult.score ?? 0;
    const pct = quizResult.percentage !== undefined ? quizResult.percentage : Math.round((score / totalM) * 100);
    const passed = pct >= 50;
    const attemptAnswers = quizResult.answers || [];

    return (
      <div className="space-y-5">
        <div className={`p-6 rounded-2xl border-2 ${passed ? 'border-emerald-200 bg-emerald-50/70' : 'border-rose-200 bg-rose-50/70'} text-center space-y-3`}>
          {passed ? (
            <Trophy className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
          ) : (
            <XCircle className="w-12 h-12 text-rose-500 mx-auto" />
          )}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Score</p>
            <p className="text-2xl font-black text-slate-900">{score} / {totalM}</p>
            <p className="text-4xl font-black mt-1" style={{ color: passed ? '#059669' : '#dc2626' }}>
              {pct}%
            </p>
            <div className="mt-3">
              <span className={`inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-black ${passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                {passed ? <><CheckCircle2 className="w-4 h-4" /> Passed • Great Work!</> : <><AlertCircle className="w-4 h-4" /> Needs Review • Below 50%</>}
              </span>
            </div>
          </div>
        </div>

        {/* Per-question breakdown */}
        {attemptAnswers.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">Question Breakdown</h4>
            {attemptAnswers.map((ans, qi) => {
              const qObj = questions[qi] || {};
              const qText = ans.question || qObj.text || qObj.question || qObj.question_text || `Question ${qi + 1}`;
              const isCorrect = ans.isCorrect !== undefined ? ans.isCorrect : (ans.correct !== undefined ? ans.correct : false);

              const rawOpts = Array.isArray(qObj.options)
                ? qObj.options
                : typeof qObj.options === 'string'
                ? qObj.options.split(',').map(s => s.trim())
                : [];

              const studentAnsText = ans.selectedAnswer !== undefined
                ? ans.selectedAnswer
                : (ans.selectedOption !== undefined && rawOpts[ans.selectedOption] !== undefined
                    ? rawOpts[ans.selectedOption]
                    : ans.selectedOption);

              const correctAnsText = ans.correctAnswer !== undefined && rawOpts[ans.correctAnswer] !== undefined
                ? rawOpts[ans.correctAnswer]
                : ans.correctAnswer;

              return (
                <div key={qi} className={`p-4 rounded-xl border text-xs space-y-1.5 ${isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-slate-900">
                      <span className="text-[#003153] mr-1.5">Q{qi + 1}.</span> {qText}
                    </p>
                    <span className={`inline-flex items-center gap-1 font-extrabold shrink-0 ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {isCorrect ? <><CheckCircle2 className="w-3.5 h-3.5" /> Correct</> : <><XCircle className="w-3.5 h-3.5" /> Incorrect</>}
                    </span>
                  </div>
                  <p className="text-slate-600">
                    Your answer: <span className="font-bold text-slate-800">{String(studentAnsText ?? 'Not answered')}</span>
                  </p>
                  {!isCorrect && correctAnsText !== undefined && (
                    <p className="text-emerald-800">
                      Correct answer: <span className="font-bold">{String(correctAnsText)}</span>
                    </p>
                  )}
                  {ans.explanation && (
                    <p className="text-[11px] text-slate-500 italic pt-1">{ans.explanation}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Quiz form (not yet submitted)
  return (
    <div className="space-y-4">
      {/* Quiz details header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#003153]/5 border border-[#003153]/15 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-base font-black text-[#003153]">{quiz.title || 'Lesson Quiz'}</p>
          <div className="flex gap-2">
            {durationText && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
                <Clock className="w-3 h-3" /> {durationText}
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
              {totalMarks} marks
            </span>
          </div>
        </div>
        {quiz.instructions && <p className="text-xs text-slate-600 leading-relaxed">{quiz.instructions}</p>}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((q, qi) => {
          const rawOpts = Array.isArray(q.options)
            ? q.options
            : typeof q.options === 'string'
            ? q.options.split(',').map(s => s.trim())
            : [];
          const qText = q.text || q.question || q.question_text || `Question ${qi + 1}`;

          return (
            <div key={qi} className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <p className="text-sm font-bold text-slate-900">
                <span className="text-[#003153] font-black mr-1.5">Q{qi + 1}.</span> {qText}
              </p>
              <div className="space-y-2">
                {rawOpts.map((opt, oi) => {
                  const val = typeof opt === 'object' ? opt.text || opt.value : opt;
                  const selected = quizAnswers[qi] === oi;
                  return (
                    <label
                      key={oi}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all text-xs sm:text-sm ${
                        selected
                          ? 'bg-[#003153]/10 border-[#003153] text-[#003153] font-bold shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${qi}`}
                        value={oi}
                        checked={selected}
                        onChange={() => setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                        className="accent-[#003153] w-4 h-4 cursor-pointer"
                      />
                      <span>{val}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {submitError && (
        <div className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-200 p-3.5 rounded-xl font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" /> {submitError}
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full py-3.5 rounded-xl bg-[#003153] text-white font-extrabold text-sm hover:bg-[#00223d] transition-all disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer shadow-md"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Submitting Your Answers...
          </>
        ) : (
          'Submit Quiz'
        )}
      </button>
    </div>
  );
};

// ─────────────────────────── main modal ─────────────────────────

const SECTIONS = [
  { id: 'recording', label: 'Recording', icon: PlayCircle },
  { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'youtube', label: 'YouTube', icon: Youtube },
  { id: 'quiz', label: 'Quiz', icon: ClipboardList },
];

export const LessonViewerModal = ({
  isOpen,
  onClose,
  topic,
  moduleIndex,
  moduleTitle,
  allModules = [],
  isCompleted,
  onToggleComplete,
  onNavigateModule,
}) => {
  const [resources, setResources] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('recording');

  const currentIdx = typeof moduleIndex === 'number' ? moduleIndex : 0;
  const currentTitle = moduleTitle || (allModules && allModules[currentIdx]) || `Module ${currentIdx + 1}`;
  const total = allModules?.length || 1;
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx < total - 1;

  const chapterName = topic?.name || topic?.topic_name || 'Mathematics Chapter';
  const gradeName = topic?.grade || 'Grade 7';
  const termName = topic?.term || 'Term 1';

  useEffect(() => {
    if (!isOpen || !topic) return;
    setResources(null);
    setLoading(true);
    setError(null);
    setActiveSection('recording');

    const topicId = topic.id || topic.topic_id;
    apiService
      .getLessonResources(topicId, currentIdx)
      .then(data => {
        setResources(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load lesson resources.');
        setLoading(false);
      });
  }, [isOpen, topic, currentIdx]);

  if (!isOpen || !topic) return null;

  const resData = resources?.resources || resources || {};
  const rec = resData.recordings || [];
  const tut = resData.tutorials || [];
  const notes = resData.notes || [];
  const yt = resData.youtube || [];
  const quizzes = resData.quizzes || (resData.quiz ? [resData.quiz] : []);
  const studentAttempt = resData.latestAttempt || resData.studentAttempt || null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#003153]/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-[#c0d9ec] overflow-hidden">
        {/* ── Header ── */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#003153] via-[#00416d] to-[#005187] text-white flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-extrabold uppercase tracking-wider text-[10px]">
                {gradeName} - {termName}
              </span>
              <span className="text-sky-200 text-xs font-semibold truncate max-w-xs sm:max-w-md">
                {chapterName}
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-black text-white leading-snug">{currentTitle}</h2>
            <p className="text-[11px] text-sky-200 font-medium">
              Module {String(currentIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close lesson"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Section tabs ── */}
        <div className="flex gap-1 px-3 pt-3 pb-0 bg-slate-50 border-b border-slate-200 shrink-0 overflow-x-auto">
          {SECTIONS.map(sec => {
            const count =
              sec.id === 'recording'
                ? rec.length
                : sec.id === 'tutorials'
                ? tut.length
                : sec.id === 'notes'
                ? notes.length
                : sec.id === 'youtube'
                ? yt.length
                : quizzes.length;

            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSection(sec.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                  activeSection === sec.id
                    ? 'bg-white text-[#003153] border-[#003153] shadow-xs'
                    : 'text-slate-500 border-transparent hover:text-[#003153] hover:bg-white/50'
                }`}
              >
                <sec.icon className="w-4 h-4" />
                <span>{sec.label}</span>
                {count > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                      activeSection === sec.id ? 'bg-[#003153] text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <Loader2 className="w-9 h-9 text-[#003153] animate-spin" />
              <p className="text-xs font-bold text-slate-500">Loading lesson resources...</p>
            </div>
          )}

          {!loading && error && (
            <div className="flex items-center gap-2 text-sm text-rose-700 bg-rose-50 border border-rose-200 p-4 rounded-xl">
              <AlertCircle className="w-5 h-5 shrink-0" /> {error}
            </div>
          )}

          {!loading && !error && (
            <>
              {activeSection === 'recording' && (
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#003153] uppercase tracking-wide">
                    <PlayCircle className="w-4 h-4" /> 01. Lesson Recording
                  </h3>
                  <RecordingSection recordings={rec} />
                </div>
              )}
              {activeSection === 'tutorials' && (
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#003153] uppercase tracking-wide">
                    <BookOpen className="w-4 h-4" /> 02. Tutorials & Revision Sheets
                  </h3>
                  <TutorialsSection tutorials={tut} />
                </div>
              )}
              {activeSection === 'notes' && (
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#003153] uppercase tracking-wide">
                    <FileText className="w-4 h-4" /> 03. Lesson Notes & Definitions
                  </h3>
                  <NotesSection notes={notes} />
                </div>
              )}
              {activeSection === 'youtube' && (
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#003153] uppercase tracking-wide">
                    <Youtube className="w-4 h-4" /> 04. Recommended YouTube Videos
                  </h3>
                  <YoutubeSection youtube={yt} />
                </div>
              )}
              {activeSection === 'quiz' && (
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#003153] uppercase tracking-wide">
                    <ClipboardList className="w-4 h-4" /> 05. Lesson Quiz & Assessment
                  </h3>
                  <QuizSection quizzes={quizzes} studentAttempt={studentAttempt} />
                </div>
              )}
            </>
          )}

          {/* Mark Complete banner */}
          <div
            className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
              isCompleted
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <Clock className="w-5 h-5 text-amber-600 shrink-0" />
              )}
              <div className="text-xs">
                <span className="font-extrabold block">
                  {isCompleted ? 'පාඩම සම්පූර්ණ කර ඇත (Completed)' : 'මෙම පාඩම තවම සම්පූර්ණ කර නැත (In Progress)'}
                </span>
                <p className="text-[11px] opacity-80 mt-0.5">
                  {isCompleted
                    ? 'ඔබ මෙම මොඩියුලයේ සියලු කොටස් සාර්ථකව අවසන් කර ඇත.'
                    : 'පාඩම අධ්‍යයනය කර අවසානයේ සම්පූර්ණ වූ බව ලකුණු කරන්න.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onToggleComplete(currentIdx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                isCompleted
                  ? 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-100 shadow-xs'
                  : 'bg-[#003153] text-white hover:bg-[#00223d] shadow-xs'
              }`}
            >
              {isCompleted ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mark Incomplete</span>
                </>
              ) : (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>Mark Completed</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Footer navigation ── */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!hasPrev}
              onClick={() => onNavigateModule(currentIdx - 1)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                hasPrev
                  ? 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 shadow-xs'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Previous Module
            </button>

            <button
              type="button"
              disabled={!hasNext}
              onClick={() => onNavigateModule(currentIdx + 1)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                hasNext
                  ? 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 shadow-xs'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
              }`}
            >
              Next Module <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleComplete(currentIdx)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                  : 'bg-[#003153] text-white hover:bg-[#00223d] shadow-xs'
              }`}
            >
              {isCompleted ? (
                <>
                  <Check className="w-4 h-4" /> Completed ✓
                </>
              ) : (
                <>
                  <BookmarkCheck className="w-4 h-4" /> Mark as Completed
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewerModal;
