import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import {
  ShieldCheck,
  Users,
  Award,
  Video,
  ArrowRight,
  ChevronDown,
  GraduationCap,
  BarChart3
} from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedGradeDropdown, setSelectedGradeDropdown] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      const data = await apiService.getAdminDashboardStats();
      setStats(data);
      setLoading(false);
    };
    fetchStats();
  }, []);

  const handleGradeDropdownChange = (e) => {
    const val = e.target.value;
    setSelectedGradeDropdown(val);
    if (val) {
      navigate(`/admin/grade/${val}`);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#003153] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Student counts breakdown for Grade 6 to Grade 11
  const gradeEnrollmentData = [
    { gradeId: 'grade-6', gradeName: 'Grade 6', label: 'Grade 6 Mathematics', studentCount: 24, maxCapacity: 60, color: 'from-blue-600 to-indigo-700', badgeColor: 'bg-blue-100 text-blue-900 border-blue-200' },
    { gradeId: 'grade-7', gradeName: 'Grade 7', label: 'Grade 7 Mathematics', studentCount: 18, maxCapacity: 60, color: 'from-cyan-600 to-blue-700', badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-200' },
    { gradeId: 'grade-8', gradeName: 'Grade 8', label: 'Grade 8 Mathematics', studentCount: 31, maxCapacity: 60, color: 'from-[#003153] to-slate-800', badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-200' },
    { gradeId: 'grade-9', gradeName: 'Grade 9', label: 'Grade 9 Mathematics', studentCount: 29, maxCapacity: 60, color: 'from-teal-600 to-emerald-800', badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200' },
    { gradeId: 'grade-10', gradeName: 'Grade 10', label: 'Grade 10 Mathematics', studentCount: 42, maxCapacity: 60, color: 'from-sky-600 to-[#003153]', badgeColor: 'bg-sky-100 text-sky-900 border-sky-200' },
    { gradeId: 'grade-11', gradeName: 'Grade 11', label: 'Grade 11 (O/L Mathematics)', studentCount: 56, maxCapacity: 60, color: 'from-[#003153] to-[#00192e]', badgeColor: 'bg-amber-100 text-amber-900 border-amber-200' },
  ];

  const totalStudentsCombined = gradeEnrollmentData.reduce((acc, g) => acc + g.studentCount, 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Admin Header Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#003153] via-[#00223d] to-[#00192e] text-white shadow-xl border border-[#004575]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-200" />
              <span>Sir Parakum Bandara Admin Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">System Administration Dashboard</h1>
            <p className="text-xs sm:text-sm text-blue-100/90 font-medium">
              Manage student rosters, grade portals (Grade 6-11), and academic marks.
            </p>
          </div>

          {/* Grade Selector Dropdown (Grade 6 to 11) */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 min-w-[240px] space-y-2 shrink-0">
            <label className="block text-xs font-extrabold text-blue-100 uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-200" />
              <span>Open Grade Portal</span>
            </label>

            <div className="relative">
              <select
                value={selectedGradeDropdown}
                onChange={handleGradeDropdownChange}
                className="w-full pl-3.5 pr-8 py-2.5 rounded-xl bg-white text-[#003153] font-black text-xs shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none cursor-pointer"
              >
                <option value="" disabled>Select Grade (Grade 6 - 11) ▾</option>
                <option value="grade-6">Grade 6 Mathematics</option>
                <option value="grade-7">Grade 7 Mathematics</option>
                <option value="grade-8">Grade 8 Mathematics</option>
                <option value="grade-9">Grade 9 Mathematics</option>
                <option value="grade-10">Grade 10 Mathematics</option>
                <option value="grade-11">Grade 11 (O/L Mathematics)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#003153] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards Overview */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#c0d9ec] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#003153] text-white flex items-center justify-center font-bold shadow-md shrink-0">
            <Users className="w-7 h-7 text-blue-200" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Total Active Enrolled Students</span>
            <p className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">{totalStudentsCombined} Students</p>
            <p className="text-xs text-[#003153] font-bold">Grade 6 through Grade 11 Mathematics Batches</p>
          </div>
        </div>
      </div>

      {/* STUDENT ENROLLMENT COUNT BY GRADE SECTION */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#003153] text-white">
              <BarChart3 className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Student Enrollment by Grade</h2>
              <p className="text-xs text-slate-600 font-medium">Live breakdown of active enrolled students for Grade 6 to Grade 11</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#e6f0f7] text-[#003153] text-xs font-extrabold border border-[#b0d1e8]">
            6 Grades Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gradeEnrollmentData.map((item) => {
            const percentage = Math.round((item.studentCount / item.maxCapacity) * 100);

            return (
              <div
                key={item.gradeId}
                className="group relative overflow-hidden rounded-2xl bg-white border border-[#c0d9ec] p-5 shadow-sm hover:shadow-xl hover:border-[#003153] transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-3 py-1 rounded-lg text-xs font-black border ${item.badgeColor}`}>
                      {item.gradeName}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      Capacity: {item.maxCapacity}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#003153] transition-colors">
                      {item.label}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-3xl font-black text-[#003153]">
                        {item.studentCount}
                      </span>
                      <span className="text-xs font-extrabold text-slate-500">
                        Enrolled Students
                      </span>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                      <span>Batch Occupancy</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-700`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <Link
                  to={`/admin/grade/${item.gradeId}`}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#003153] bg-[#f4f8fb] hover:bg-[#003153] hover:text-white border border-[#c0d9ec] transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                >
                  <span>Open {item.gradeName} Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Admin Control Center */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#c0d9ec] shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900">Admin Control Center</h2>
            <p className="text-xs text-slate-600">Quick management shortcuts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Zoom Schedule */}
          <Link
            to="/admin/zoom"
            className="p-5 rounded-2xl bg-[#f4f8fb] hover:bg-[#e6f0f7] border border-[#c0d9ec] transition-all space-y-3 group shadow-xs hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-[#003153] text-white shadow-sm">
                <Video className="w-5 h-5 text-blue-200" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#003153] transition-colors" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Zoom Schedule</h3>
              <p className="text-xs text-slate-600 mt-1">Schedule live lectures, passwords & meeting links.</p>
            </div>
          </Link>

          {/* Student Management */}
          <Link
            to="/admin/students"
            className="p-5 rounded-2xl bg-[#f4f8fb] hover:bg-[#e6f0f7] border border-[#c0d9ec] transition-all space-y-3 group shadow-xs hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-[#003153] text-white shadow-sm">
                <Users className="w-5 h-5 text-blue-200" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#003153] transition-colors" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Student Management</h3>
              <p className="text-xs text-slate-600 mt-1">Add, edit & view enrolled Grade 6-11 student rosters.</p>
            </div>
          </Link>

          {/* Grade Manager */}
          <Link
            to="/admin/grades"
            className="p-5 rounded-2xl bg-[#f4f8fb] hover:bg-[#e6f0f7] border border-[#c0d9ec] transition-all space-y-3 group shadow-xs hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-[#003153] text-white shadow-sm">
                <Award className="w-5 h-5 text-blue-200" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#003153] transition-colors" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Grade Manager</h3>
              <p className="text-xs text-slate-600 mt-1">Assign student test marks, term grades & teacher remarks.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
