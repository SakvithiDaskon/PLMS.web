import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { Award, Plus, CheckCircle2, X, Trash2, Search, GraduationCap } from 'lucide-react';

export const GradeManagement = () => {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');

  const [formData, setFormData] = useState({
    studentId: '',
    subject: 'Grade 11 (O/L Mathematics)',
    score: 85,
    maxScore: 100,
    grade: 'A',
    evaluationTag: 'High Achiever'
  });

  const loadData = async () => {
    const [sData, gData] = await Promise.all([
      apiService.getAllStudents(),
      apiService.getStudentGrades()
    ]);
    setStudents(sData);
    setGrades(gData);
    if (sData.length > 0) setFormData((prev) => ({ ...prev, studentId: sData[0].id }));
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAssignGrade = async (e) => {
    e.preventDefault();
    const student = students.find((s) => s.id === formData.studentId);
    await apiService.assignGrade({
      ...formData,
      studentName: student?.name || 'Student'
    });
    setShowModal(false);
    setSuccessMsg('Grade record assigned successfully!');
    loadData();
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDeleteGrade = (gradeId) => {
    if (confirm('Are you sure you want to delete this grade record?')) {
      setGrades(prev => prev.filter(g => g.id !== gradeId));
      setSuccessMsg('Grade record deleted.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const getEvaluationBadge = (tag) => {
    switch (tag) {
      case 'High Achiever':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Pass with Distinction':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Needs Focus':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'On Track':
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const filteredGrades = grades.filter(g => {
    const matchesSearch =
      (g.studentName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (g.subject || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (g.evaluationTag || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGrade = gradeFilter === 'All' || (g.subject || '').includes(gradeFilter);

    return matchesSearch && matchesGrade;
  });

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
              <Award className="w-3.5 h-3.5 text-blue-200" />
              <span>Assessment & Results</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Grade Manager</h1>
            <p className="text-xs sm:text-sm text-blue-100">
              Publish monthly term test scores, letter grades, and evaluation tags for Grade 6 to Grade 11.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-[#003153] bg-white hover:bg-[#e6f0f7] shadow-lg transition-all hover:scale-105 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Assign New Grade</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 font-bold shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="p-6 rounded-3xl bg-white border border-[#c0d9ec] shadow-md space-y-5">
        {/* Controls Bar: Search & Grade Stream Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search student name or evaluation..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:border-[#003153] focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#003153]" />
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs font-bold focus:outline-none focus:border-[#003153]"
            >
              <option value="All">All Grade Streams (6-11)</option>
              <option value="Grade 11">Grade 11</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 6">Grade 6</option>
            </select>
          </div>
        </div>

        {/* Beautiful Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#c0d9ec]">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#003153] text-white uppercase tracking-wider text-[11px] font-extrabold border-b border-[#00223d]">
              <tr>
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Grade / Stream</th>
                <th className="py-3.5 px-4">Marks Score</th>
                <th className="py-3.5 px-4 text-center">Grade</th>
                <th className="py-3.5 px-4 text-center">Evaluation Tag</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c0d9ec]/60 bg-white">
              {filteredGrades.map((grd) => {
                const initial = grd.studentName ? grd.studentName.charAt(0).toUpperCase() : 'S';

                return (
                  <tr key={grd.id} className="hover:bg-[#e6f0f7]/50 transition-colors">
                    {/* Student Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#003153] text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
                          {initial}
                        </div>
                        <span className="font-extrabold text-slate-900 text-xs">
                          {grd.studentName}
                        </span>
                      </div>
                    </td>

                    {/* Subject / Grade Stream */}
                    <td className="py-3.5 px-4">
                      <span className="px-3 py-1 rounded-lg text-xs font-black bg-[#e6f0f7] text-[#003153] border border-[#b0d1e8] whitespace-nowrap">
                        {grd.subject}
                      </span>
                    </td>

                    {/* Marks Score */}
                    <td className="py-3.5 px-4 font-mono font-black text-[#003153]">
                      {grd.score} / {grd.maxScore}
                    </td>

                    {/* Letter Grade */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[#003153] text-white font-black text-xs shadow-xs">
                        {grd.grade}
                      </span>
                    </td>

                    {/* Evaluation Tag */}
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getEvaluationBadge(grd.evaluationTag)}`}>
                        {grd.evaluationTag || 'On Track'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleDeleteGrade(grd.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredGrades.length === 0 && (
          <div className="p-8 text-center bg-[#f4f8fb] rounded-2xl border border-[#c0d9ec] space-y-2">
            <Award className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs font-bold text-slate-600">No grade records found matching your filter.</p>
          </div>
        )}
      </div>

      {/* Assign Grade Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#003153]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white border border-[#c0d9ec] p-6 sm:p-7 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#003153] text-white">
                  <Award className="w-5 h-5 text-blue-200" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">Assign Grade Record</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAssignGrade} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">Select Student</label>
                <select
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs font-bold focus:outline-none focus:border-[#003153]"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.grade})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">Grade Stream / Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs font-bold focus:outline-none focus:border-[#003153]"
                >
                  <option value="Grade 11 (O/L Mathematics)">Grade 11 (O/L Mathematics)</option>
                  <option value="Grade 10 Mathematics">Grade 10 Mathematics</option>
                  <option value="Grade 9 Mathematics">Grade 9 Mathematics</option>
                  <option value="Grade 8 Mathematics">Grade 8 Mathematics</option>
                  <option value="Grade 7 Mathematics">Grade 7 Mathematics</option>
                  <option value="Grade 6 Mathematics">Grade 6 Mathematics</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Score Obtained</label>
                  <input
                    type="number"
                    required
                    value={formData.score}
                    onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Letter Grade</label>
                  <input
                    type="text"
                    required
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    placeholder="A+, A, B, C"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">Evaluation Tag / Target Result</label>
                <select
                  value={formData.evaluationTag}
                  onChange={(e) => setFormData({ ...formData, evaluationTag: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs font-bold focus:outline-none focus:border-[#003153]"
                >
                  <option value="High Achiever">High Achiever</option>
                  <option value="Pass with Distinction">Pass with Distinction</option>
                  <option value="On Track">On Track</option>
                  <option value="Needs Focus">Needs Focus</option>
                </select>
              </div>

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
                  Save Grade Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradeManagement;
