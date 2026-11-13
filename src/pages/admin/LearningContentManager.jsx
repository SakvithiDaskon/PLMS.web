import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import {
  PlaySquare, BookOpen, FileText, ClipboardList,
  Plus, Trash2, CheckCircle2, X, ChevronDown, Video, GraduationCap,
  Loader2, AlertCircle
} from 'lucide-react';

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

const GRADES = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'];

const SECTIONS = [
  { id: 'recordings', label: 'Recordings', icon: PlaySquare },
  { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'youtube', label: 'YouTube', icon: Youtube },
  { id: 'quizzes', label: 'Quizzes', icon: ClipboardList },
];

const emptyRecording = { title: '', videoUrl: '', teacherName: 'Sir Parakum Bandara', duration: '', recordingDate: '' };
const emptyTutorial = { title: '', description: '', fileUrl: '', fileType: 'PDF', teacherName: 'Sir Parakum Bandara' };
const emptyNote = { title: '', content: '', pdfUrl: '', teacherName: 'Sir Parakum Bandara' };
const emptyYoutube = { title: '', youtubeUrl: '', channelName: '', description: '', thumbnailUrl: '' };
const emptyQuiz = { title: '', instructions: '', durationMinutes: 30, totalMarks: 100, questions: [] };
const emptyQuestion = { text: '', options: '', correctAnswer: 0, marks: 5 };

export const LearningContentManager = ({ defaultGrade = null }) => {
  const [selectedGrade, setSelectedGrade] = useState(defaultGrade || 'Grade 7');
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedLessonIdx, setSelectedLessonIdx] = useState(0);
  const [activeSection, setActiveSection] = useState('recordings');
  const [resources, setResources] = useState({ recordings: [], tutorials: [], notes: [], youtube: [], quizzes: [] });
  const [loading, setLoading] = useState(false);
  const [resourcesLoading, setResourcesLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Add-form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [recordingForm, setRecordingForm] = useState(emptyRecording);
  const [tutorialForm, setTutorialForm] = useState(emptyTutorial);
  const [noteForm, setNoteForm] = useState(emptyNote);
  const [youtubeForm, setYoutubeForm] = useState(emptyYoutube);
  const [quizForm, setQuizForm] = useState(emptyQuiz);
  const [currentQuestion, setCurrentQuestion] = useState(emptyQuestion);
  const [submitting, setSubmitting] = useState(false);

  // Load topics when grade changes
  useEffect(() => {
    setSelectedTopic(null);
    setSelectedLessonIdx(0);
    setTopics([]);
    setResources({ recordings: [], tutorials: [], notes: [], youtube: [], quizzes: [] });
    loadTopics(selectedGrade);
  }, [selectedGrade]);

  // Load resources when topic+lesson changes
  useEffect(() => {
    if (selectedTopic) {
      loadResources(selectedTopic.topic_id, selectedLessonIdx);
    }
  }, [selectedTopic, selectedLessonIdx]);

  const loadTopics = async (grade) => {
    setLoading(true);
    try {
      const gradeNum = grade.replace('Grade ', '');
      const data = await apiService.getMathematicsTopics(gradeNum);
      const topicsArr = Array.isArray(data) ? data : (data?.topics || []);
      setTopics(topicsArr);
      if (topicsArr.length > 0) {
        setSelectedTopic(topicsArr[0]);
        setSelectedLessonIdx(0);
      }
    } catch (err) {
      console.error('Failed to load topics:', err);
      setTopics([]);
    } finally {
      setLoading(false);
    }
  };

  const loadResources = async (topicId, lessonIdx) => {
    setResourcesLoading(true);
    try {
      const data = await apiService.getLessonResources(topicId, lessonIdx);
      const resPayload = data?.resources || data || {};
      setResources({
        recordings: resPayload.recordings || [],
        tutorials: resPayload.tutorials || [],
        notes: resPayload.notes || [],
        youtube: resPayload.youtubeRecs || resPayload.youtube || [],
        quizzes: resPayload.quizzes || (resPayload.quiz ? [resPayload.quiz] : []),
      });
    } catch (err) {
      console.error('Failed to load resources:', err);
      setResources({ recordings: [], tutorials: [], notes: [], youtube: [], quizzes: [] });
    } finally {
      setResourcesLoading(false);
    }
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const showError = (msg) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(''), 4000);
  };

  const refreshResources = () => {
    if (selectedTopic) loadResources(selectedTopic.topic_id, selectedLessonIdx);
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      if (type === 'recordings') await apiService.deleteLessonRecording(id);
      else if (type === 'tutorials') await apiService.deleteLessonTutorial(id);
      else if (type === 'notes') await apiService.deleteLessonNote(id);
      else if (type === 'youtube') await apiService.deleteYouTubeRec(id);
      else if (type === 'quizzes') await apiService.deleteLessonQuiz(id);
      showSuccess('Deleted successfully.');
      refreshResources();
    } catch (err) {
      showError('Delete failed: ' + (err.message || 'Unknown error'));
    }
  };

  const getBasePayload = () => ({
    topicId: selectedTopic?.topic_id,
    lessonIndex: selectedLessonIdx,
  });

  const handleAddRecording = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiService.createLessonRecording({ ...getBasePayload(), ...recordingForm });
      showSuccess('Recording added!');
      setRecordingForm(emptyRecording);
      setShowAddForm(false);
      refreshResources();
    } catch (err) {
      showError('Failed to add recording.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddTutorial = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiService.createLessonTutorial({ ...getBasePayload(), ...tutorialForm });
      showSuccess('Tutorial added!');
      setTutorialForm(emptyTutorial);
      setShowAddForm(false);
      refreshResources();
    } catch (err) {
      showError('Failed to add tutorial.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiService.createLessonNote({ ...getBasePayload(), ...noteForm });
      showSuccess('Note added!');
      setNoteForm(emptyNote);
      setShowAddForm(false);
      refreshResources();
    } catch (err) {
      showError('Failed to add note.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddYoutube = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiService.createYouTubeRec({ ...getBasePayload(), ...youtubeForm });
      showSuccess('YouTube recommendation added!');
      setYoutubeForm(emptyYoutube);
      setShowAddForm(false);
      refreshResources();
    } catch (err) {
      showError('Failed to add YouTube recommendation.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddQuestion = () => {
    if (!currentQuestion.text.trim()) return;
    setQuizForm(prev => ({
      ...prev,
      questions: [...prev.questions, {
        ...currentQuestion,
        options: currentQuestion.options.split(',').map(o => o.trim()).filter(Boolean),
        correctAnswer: parseInt(currentQuestion.correctAnswer, 10),
        marks: parseInt(currentQuestion.marks, 10),
      }]
    }));
    setCurrentQuestion(emptyQuestion);
  };

  const handleRemoveQuestion = (idx) => {
    setQuizForm(prev => ({ ...prev, questions: prev.questions.filter((_, i) => i !== idx) }));
  };

  const handleAddQuiz = async (e) => {
    e.preventDefault();
    if (quizForm.questions.length === 0) {
      showError('Add at least one question.');
      return;
    }
    setSubmitting(true);
    try {
      await apiService.createLessonQuiz({ ...getBasePayload(), ...quizForm });
      showSuccess('Quiz created!');
      setQuizForm(emptyQuiz);
      setCurrentQuestion(emptyQuestion);
      setShowAddForm(false);
      refreshResources();
    } catch (err) {
      showError('Failed to create quiz.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = 'w-full px-3 py-2 rounded-xl border border-[#c0d9ec] text-sm focus:outline-none focus:ring-2 focus:ring-[#003153]/30 bg-white';
  const labelCls = 'block text-xs font-bold text-slate-700 mb-1';
  const btnPrimary = 'flex items-center gap-2 px-4 py-2 rounded-xl bg-[#003153] text-white text-xs font-bold hover:bg-[#004575] transition-all disabled:opacity-50';
  const btnSecondary = 'flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#c0d9ec] text-xs font-bold text-slate-700 hover:bg-[#e6f0f7] transition-all';

  const currentModules = selectedTopic?.modules || [];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-r from-[#003153] to-[#00223d] text-white shadow-xl border border-[#004575]">
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          <GraduationCap className="w-40 h-40" />
        </div>
        <div className="relative z-10 space-y-1">
          <h1 className="text-2xl font-black tracking-tight">Learning Content Manager</h1>
          <p className="text-sm text-blue-200">Add and manage recordings, tutorials, notes, YouTube recs, and quizzes by grade and lesson.</p>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold">
          <CheckCircle2 className="w-4 h-4 shrink-0" />{successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-bold">
          <AlertCircle className="w-4 h-4 shrink-0" />{errorMsg}
        </div>
      )}

      {/* Grade Selector */}
      {!defaultGrade && (
        <div className="p-5 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm space-y-3">
          <p className="text-xs font-black text-[#003153] uppercase tracking-wider">Select Grade</p>
          <div className="flex flex-wrap gap-2">
            {GRADES.map(g => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-4 py-2 rounded-xl text-xs font-black border transition-all ${selectedGrade === g ? 'bg-[#003153] text-white border-[#003153] shadow-md' : 'bg-white text-[#003153] border-[#c0d9ec] hover:bg-[#e6f0f7]'}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Topic + Lesson Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Topic Dropdown */}
        <div className="p-5 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm space-y-3">
          <p className="text-xs font-black text-[#003153] uppercase tracking-wider">Select Topic / Unit</p>
          {loading ? (
            <div className="flex items-center gap-2 text-slate-500 text-sm"><Loader2 className="w-4 h-4 animate-spin" /> Loading topics…</div>
          ) : topics.length === 0 ? (
            <p className="text-xs text-slate-500">No topics found for {selectedGrade}.</p>
          ) : (
            <div className="relative">
              <select
                value={selectedTopic?.topic_id ?? ''}
                onChange={e => {
                  const t = topics.find(x => String(x.topic_id) === e.target.value);
                  setSelectedTopic(t || null);
                  setSelectedLessonIdx(0);
                }}
                className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-[#c0d9ec] text-sm font-bold text-[#003153] bg-white focus:outline-none focus:ring-2 focus:ring-[#003153]/30 appearance-none cursor-pointer"
              >
                {topics.map(t => (
                  <option key={t.topic_id} value={t.topic_id}>{t.name}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#003153] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          )}
        </div>

        {/* Lesson Buttons */}
        <div className="p-5 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm space-y-3">
          <p className="text-xs font-black text-[#003153] uppercase tracking-wider">Select Lesson</p>
          {!selectedTopic ? (
            <p className="text-xs text-slate-500">Select a topic first.</p>
          ) : currentModules.length === 0 ? (
            <p className="text-xs text-slate-500">No lessons in this topic.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {currentModules.map((mod, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedLessonIdx(idx)}
                  title={typeof mod === 'string' ? mod : `Lesson ${idx + 1}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${selectedLessonIdx === idx ? 'bg-[#003153] text-white border-[#003153]' : 'bg-white text-[#003153] border-[#c0d9ec] hover:bg-[#e6f0f7]'}`}
                >
                  {idx + 1}. {typeof mod === 'string' ? mod.substring(0, 20) : `Lesson ${idx + 1}`}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Tabs + Section */}
      {selectedTopic && (
        <div className="p-5 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm space-y-5">
          {/* Section Header */}
          <div className="text-xs text-slate-500 font-medium">
            {selectedGrade} › <span className="text-[#003153] font-bold">{selectedTopic.name}</span>
            {currentModules[selectedLessonIdx] && (
              <> › <span className="text-slate-700 font-bold">{typeof currentModules[selectedLessonIdx] === 'string' ? currentModules[selectedLessonIdx] : `Lesson ${selectedLessonIdx + 1}`}</span></>
            )}
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-[#e6f0f7] pb-3">
            {SECTIONS.map(sec => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => { setActiveSection(sec.id); setShowAddForm(false); }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${activeSection === sec.id ? 'bg-[#003153] text-white border-[#003153] shadow-md' : 'bg-[#f4f8fb] text-slate-700 border-[#c0d9ec] hover:bg-[#e6f0f7]'}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {sec.label}
                  <span className={`ml-1 px-1.5 py-0.5 rounded-md text-[10px] font-black ${activeSection === sec.id ? 'bg-white/20 text-white' : 'bg-[#003153]/10 text-[#003153]'}`}>
                    {resources[sec.id]?.length || 0}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Resource List */}
          {resourcesLoading ? (
            <div className="flex items-center gap-2 text-slate-500 text-sm py-4"><Loader2 className="w-4 h-4 animate-spin" /> Loading resources…</div>
          ) : (
            <ResourceList
              section={activeSection}
              items={resources[activeSection] || []}
              onDelete={(id) => handleDelete(activeSection, id)}
            />
          )}

          {/* Add Button / Form */}
          <div className="pt-2 border-t border-[#e6f0f7]">
            {!showAddForm ? (
              <button onClick={() => setShowAddForm(true)} className={btnPrimary}>
                <Plus className="w-4 h-4" />
                Add {SECTIONS.find(s => s.id === activeSection)?.label}
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-[#003153]">
                    New {SECTIONS.find(s => s.id === activeSection)?.label}
                  </h3>
                  <button onClick={() => setShowAddForm(false)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>

                {activeSection === 'recordings' && (
                  <form onSubmit={handleAddRecording} className="space-y-3">
                    <Field label="Title *" value={recordingForm.title} onChange={v => setRecordingForm(p => ({ ...p, title: v }))} required />
                    <Field label="Video URL (embed/link)" value={recordingForm.videoUrl} onChange={v => setRecordingForm(p => ({ ...p, videoUrl: v }))} />
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Teacher Name" value={recordingForm.teacherName} onChange={v => setRecordingForm(p => ({ ...p, teacherName: v }))} />
                      <Field label="Duration (e.g. 45 mins)" value={recordingForm.duration} onChange={v => setRecordingForm(p => ({ ...p, duration: v }))} />
                    </div>
                    <div>
                      <label className={labelCls}>Recording Date</label>
                      <input type="date" className={inputCls} value={recordingForm.recordingDate} onChange={e => setRecordingForm(p => ({ ...p, recordingDate: e.target.value }))} />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button type="submit" disabled={submitting} className={btnPrimary}>
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Save Recording
                      </button>
                      <button type="button" onClick={() => setShowAddForm(false)} className={btnSecondary}><X className="w-4 h-4" /> Cancel</button>
                    </div>
                  </form>
                )}

                {activeSection === 'tutorials' && (
                  <form onSubmit={handleAddTutorial} className="space-y-3">
                    <Field label="Title *" value={tutorialForm.title} onChange={v => setTutorialForm(p => ({ ...p, title: v }))} required />
                    <div>
                      <label className={labelCls}>Description</label>
                      <textarea className={inputCls + ' min-h-[80px]'} value={tutorialForm.description} onChange={e => setTutorialForm(p => ({ ...p, description: e.target.value }))} />
                    </div>
                    <Field label="File / Link URL" value={tutorialForm.fileUrl} onChange={v => setTutorialForm(p => ({ ...p, fileUrl: v }))} />
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>File Type</label>
                        <select className={inputCls} value={tutorialForm.fileType} onChange={e => setTutorialForm(p => ({ ...p, fileType: e.target.value }))}>
                          {['PDF', 'DOCX', 'PPTX', 'LINK'].map(ft => <option key={ft}>{ft}</option>)}
                        </select>
                      </div>
                      <Field label="Teacher Name" value={tutorialForm.teacherName} onChange={v => setTutorialForm(p => ({ ...p, teacherName: v }))} />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button type="submit" disabled={submitting} className={btnPrimary}>{submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Save Tutorial</button>
                      <button type="button" onClick={() => setShowAddForm(false)} className={btnSecondary}><X className="w-4 h-4" /> Cancel</button>
                    </div>
                  </form>
                )}

                {activeSection === 'notes' && (
                  <form onSubmit={handleAddNote} className="space-y-3">
                    <Field label="Title *" value={noteForm.title} onChange={v => setNoteForm(p => ({ ...p, title: v }))} required />
                    <div>
                      <label className={labelCls}>Content</label>
                      <textarea className={inputCls + ' min-h-[100px]'} value={noteForm.content} onChange={e => setNoteForm(p => ({ ...p, content: e.target.value }))} />
                    </div>
                    <Field label="PDF URL (optional)" value={noteForm.pdfUrl} onChange={v => setNoteForm(p => ({ ...p, pdfUrl: v }))} />
                    <Field label="Teacher Name" value={noteForm.teacherName} onChange={v => setNoteForm(p => ({ ...p, teacherName: v }))} />
                    <div className="flex gap-2 pt-1">
                      <button type="submit" disabled={submitting} className={btnPrimary}>{submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Save Note</button>
                      <button type="button" onClick={() => setShowAddForm(false)} className={btnSecondary}><X className="w-4 h-4" /> Cancel</button>
                    </div>
                  </form>
                )}

                {activeSection === 'youtube' && (
                  <form onSubmit={handleAddYoutube} className="space-y-3">
                    <Field label="Title *" value={youtubeForm.title} onChange={v => setYoutubeForm(p => ({ ...p, title: v }))} required />
                    <Field label="YouTube URL *" value={youtubeForm.youtubeUrl} onChange={v => setYoutubeForm(p => ({ ...p, youtubeUrl: v }))} required />
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Channel Name" value={youtubeForm.channelName} onChange={v => setYoutubeForm(p => ({ ...p, channelName: v }))} />
                      <Field label="Thumbnail URL (optional)" value={youtubeForm.thumbnailUrl} onChange={v => setYoutubeForm(p => ({ ...p, thumbnailUrl: v }))} />
                    </div>
                    <div>
                      <label className={labelCls}>Description</label>
                      <textarea className={inputCls + ' min-h-[80px]'} value={youtubeForm.description} onChange={e => setYoutubeForm(p => ({ ...p, description: e.target.value }))} />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button type="submit" disabled={submitting} className={btnPrimary}>{submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Save</button>
                      <button type="button" onClick={() => setShowAddForm(false)} className={btnSecondary}><X className="w-4 h-4" /> Cancel</button>
                    </div>
                  </form>
                )}

                {activeSection === 'quizzes' && (
                  <form onSubmit={handleAddQuiz} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Quiz Title *" value={quizForm.title} onChange={v => setQuizForm(p => ({ ...p, title: v }))} required />
                      <div className="grid grid-cols-2 gap-2">
                        <Field label="Duration (mins)" type="number" value={quizForm.durationMinutes} onChange={v => setQuizForm(p => ({ ...p, durationMinutes: v }))} />
                        <Field label="Total Marks" type="number" value={quizForm.totalMarks} onChange={v => setQuizForm(p => ({ ...p, totalMarks: v }))} />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Instructions</label>
                      <textarea className={inputCls + ' min-h-[60px]'} value={quizForm.instructions} onChange={e => setQuizForm(p => ({ ...p, instructions: e.target.value }))} />
                    </div>

                    {/* Questions List */}
                    {quizForm.questions.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-black text-[#003153]">Questions ({quizForm.questions.length})</p>
                        {quizForm.questions.map((q, idx) => (
                          <div key={idx} className="flex items-start gap-2 p-3 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec]">
                            <span className="text-xs font-black text-[#003153] mt-0.5 shrink-0">Q{idx + 1}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-800 truncate">{q.text}</p>
                              <p className="text-[10px] text-slate-500">{q.options?.length} options · Answer: {q.options?.[q.correctAnswer]} · {q.marks} marks</p>
                            </div>
                            <button type="button" onClick={() => handleRemoveQuestion(idx)} className="p-1 hover:bg-red-50 rounded-lg transition-colors shrink-0">
                              <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Question Builder */}
                    <div className="p-4 rounded-xl bg-[#e6f0f7] border border-[#b0d1e8] space-y-3">
                      <p className="text-xs font-black text-[#003153]">Add Question</p>
                      <div>
                        <label className={labelCls}>Question Text</label>
                        <input className={inputCls} value={currentQuestion.text} onChange={e => setCurrentQuestion(p => ({ ...p, text: e.target.value }))} placeholder="Enter question…" />
                      </div>
                      <div>
                        <label className={labelCls}>Options (comma-separated)</label>
                        <input className={inputCls} value={currentQuestion.options} onChange={e => setCurrentQuestion(p => ({ ...p, options: e.target.value }))} placeholder="Option A, Option B, Option C, Option D" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={labelCls}>Correct Answer Index (0-based)</label>
                          <input type="number" min="0" className={inputCls} value={currentQuestion.correctAnswer} onChange={e => setCurrentQuestion(p => ({ ...p, correctAnswer: e.target.value }))} />
                        </div>
                        <Field label="Marks" type="number" value={currentQuestion.marks} onChange={v => setCurrentQuestion(p => ({ ...p, marks: v }))} />
                      </div>
                      <button type="button" onClick={handleAddQuestion} className={btnSecondary}>
                        <Plus className="w-4 h-4" /> Add Question
                      </button>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button type="submit" disabled={submitting} className={btnPrimary}>
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Create Quiz
                      </button>
                      <button type="button" onClick={() => setShowAddForm(false)} className={btnSecondary}><X className="w-4 h-4" /> Cancel</button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable field component
const Field = ({ label, value, onChange, type = 'text', required = false }) => (
  <div>
    <label className="block text-xs font-bold text-slate-700 mb-1">{label}</label>
    <input
      type={type}
      required={required}
      className="w-full px-3 py-2 rounded-xl border border-[#c0d9ec] text-sm focus:outline-none focus:ring-2 focus:ring-[#003153]/30 bg-white"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

// Resource list renderer
const ResourceList = ({ section, items, onDelete }) => {
  if (items.length === 0) {
    return <p className="text-sm text-slate-400 italic py-2">No {section} added yet for this lesson.</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const id = item.recording_id || item.tutorial_id || item.note_id || item.youtube_id || item.quiz_id || item.id || idx;
        return (
          <div key={id} className="flex items-start gap-3 p-4 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] group hover:border-[#003153]/30 transition-all">
            <div className="flex-1 min-w-0 space-y-1">
              <p className="text-sm font-bold text-slate-800 truncate">{item.title || item.subject || `Item ${idx + 1}`}</p>
              {item.teacherName && <p className="text-xs text-slate-500">👤 {item.teacherName}</p>}
              {item.duration && <p className="text-xs text-slate-500">⏱ {item.duration}</p>}
              {item.recordingDate && <p className="text-xs text-slate-500">📅 {item.recordingDate}</p>}
              {item.fileType && <p className="text-xs text-slate-500">📄 {item.fileType}</p>}
              {item.channelName && <p className="text-xs text-slate-500">📺 {item.channelName}</p>}
              {item.durationMinutes && <p className="text-xs text-slate-500">⏱ {item.durationMinutes} mins · {item.totalMarks} marks</p>}
              {item.description && <p className="text-xs text-slate-500 truncate">{item.description}</p>}
              {(item.videoUrl || item.fileUrl || item.youtubeUrl || item.pdfUrl) && (
                <a
                  href={item.videoUrl || item.fileUrl || item.youtubeUrl || item.pdfUrl}
                  target="_blank" rel="noopener noreferrer"
                  className="text-xs text-[#003153] font-bold underline underline-offset-2"
                >
                  Open Link ↗
                </a>
              )}
            </div>
            <button
              onClick={() => onDelete(id)}
              className="p-2 rounded-xl hover:bg-red-50 border border-transparent hover:border-red-200 transition-all opacity-0 group-hover:opacity-100"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default LearningContentManager;
