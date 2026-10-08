import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import {
  Users,
  UserPlus,
  Search,
  CheckCircle2,
  X,
  Trash2,
  GraduationCap
} from 'lucide-react';

export const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', grade: 'Grade 11 (O/L Mathematics)' });
  const [successMsg, setSuccessMsg] = useState('');

  const fetchStudents = async () => {
    const data = await apiService.getAllStudents();
    setStudents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    await apiService.addStudent(formData);
    setShowAddModal(false);
    setFormData({ name: '', email: '', phone: '', grade: 'Grade 11 (O/L Mathematics)' });
    setSuccessMsg('New student registered successfully!');
    fetchStudents();
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDeleteStudent = (studentId) => {
    if (confirm('Are you sure you want to remove this student?')) {
      setStudents(prev => prev.filter(s => s.id !== studentId && s.studentId !== studentId));
      setSuccessMsg('Student removed successfully.');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.studentId && s.studentId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (s.indexNo && s.indexNo.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesGrade = gradeFilter === 'All' || s.grade.includes(gradeFilter);

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
              <Users className="w-3.5 h-3.5 text-blue-200" />
              <span>Roster & Records</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Student Management</h1>
            <p className="text-xs sm:text-sm text-blue-100">
              View, register, and manage enrolled Grade 6 to Grade 11 student records.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-[#003153] bg-white hover:bg-[#e6f0f7] shadow-lg transition-all hover:scale-105 shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Student</span>
          </button>
        </div>
      </div>

      {/* Notification */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 font-bold shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filter and Table Container */}
      <div className="p-6 rounded-3xl bg-white border border-[#c0d9ec] shadow-md space-y-5">
        {/* Controls Bar: Search & Grade Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name, ID or email..."
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
              <option value="All">All Grades (6-11)</option>
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
                <th className="py-3.5 px-4">Student ID</th>
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Email Address</th>
                <th className="py-3.5 px-4">Contact Phone</th>
                <th className="py-3.5 px-4">Enrolled Grade</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c0d9ec]/60 bg-white">
              {filtered.map((std) => {
                const initial = std.name ? std.name.charAt(0).toUpperCase() : 'S';

                return (
                  <tr key={std.id} className="hover:bg-[#e6f0f7]/50 transition-colors">
                    {/* Student ID */}
                    <td className="py-3.5 px-4 font-mono font-black text-[#003153]">
                      {std.studentId || std.indexNo || 'STU-0001'}
                    </td>

                    {/* Student Name with Visual Avatar */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#003153] text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
                          {initial}
                        </div>
                        <span className="font-extrabold text-slate-900 text-xs">
                          {std.name}
                        </span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {std.email}
                    </td>

                    {/* Phone */}
                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {std.phone || '+94 77 123 4567'}
                    </td>

                    {/* Enrolled Grade */}
                    <td className="py-3.5 px-4">
                      <span className="px-3 py-1 rounded-lg text-xs font-black bg-[#e6f0f7] text-[#003153] border border-[#b0d1e8] whitespace-nowrap">
                        {std.grade}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleDeleteStudent(std.id)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove Student"
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

        {filtered.length === 0 && (
          <div className="p-8 text-center bg-[#f4f8fb] rounded-2xl border border-[#c0d9ec] space-y-2">
            <Users className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs font-bold text-slate-600">No student records found matching your search.</p>
          </div>
        )}
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#003153]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white border border-[#c0d9ec] p-6 sm:p-7 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#003153] text-white">
                  <UserPlus className="w-5 h-5 text-blue-200" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">Register New Student</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs font-semibold focus:outline-none focus:border-[#003153]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="student@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs font-semibold focus:outline-none focus:border-[#003153]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">Contact Phone (WhatsApp)</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+94 77 123 4567"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs font-semibold focus:outline-none focus:border-[#003153]"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">Enrolled Grade</label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
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

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#003153] hover:bg-[#00223d] shadow-md transition-all hover:scale-105"
                >
                  Save Student Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
