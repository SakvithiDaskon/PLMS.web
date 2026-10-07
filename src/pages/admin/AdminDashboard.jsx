import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../../services/api';
import {
  ShieldCheck,
  Users,
  UserPlus,
  Video,
  PlaySquare,
  BookOpen,
  FilePlus,
  CheckSquare,
  ArrowRight
} from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await apiService.getAdminDashboardStats();
      setStats(data);
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#003153] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Admin Header Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-[#003153] text-white shadow-lg border border-[#00223d]">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-100" />
              <span>Sir Parakum Bandara Admin Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">System Administration Dashboard</h1>
            <p className="text-xs sm:text-sm text-blue-100">
              Manage student rosters, live Zoom class schedules, video recordings, and term grades.
            </p>
          </div>

          <Link
            to="/admin/zoom"
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-[#003153] bg-white hover:bg-[#e6f0f7] shadow transition-all shrink-0"
          >
            <Video className="w-4 h-4 text-[#003153]" />
            <span>Schedule Zoom Class</span>
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#c0d9ec] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Total Active Students</span>
            <Users className="w-4 h-4 text-[#003153]" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{stats?.totalStudents || 3}</p>
          <p className="text-[11px] text-[#003153] font-bold">Enrolled Students</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#c0d9ec] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Live Zoom Schedules</span>
            <Video className="w-4 h-4 text-[#003153]" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{stats?.totalClasses || 2}</p>
          <p className="text-[11px] text-emerald-700 font-bold">Active Live Classes</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#c0d9ec] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Recorded Video Library</span>
            <PlaySquare className="w-4 h-4 text-[#003153]" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{stats?.totalRecordings || 3}</p>
          <p className="text-[11px] text-slate-500 font-semibold">Uploaded Lectures</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#c0d9ec] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Registered Parents</span>
            <UserPlus className="w-4 h-4 text-[#003153]" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{stats?.totalParents || 1}</p>
          <p className="text-[11px] text-[#003153] font-bold">Linked Accounts</p>
        </div>
      </div>

      {/* Control Action Center */}
      <div className="p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900">Management Action Center</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Active: Student Roster Mgmt */}
          <Link
            to="/admin/students"
            className="p-4 rounded-xl bg-[#f4f8fb] hover:bg-[#e6f0f7] border border-[#c0d9ec] transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <Users className="w-5 h-5 text-[#003153]" />
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#003153] transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Student Roster Mgmt</h3>
            <p className="text-[11px] text-slate-600">Add & manage enrolled students.</p>
          </Link>

          {/* Active: Zoom Class Schedules */}
          <Link
            to="/admin/zoom"
            className="p-4 rounded-xl bg-[#f4f8fb] hover:bg-[#e6f0f7] border border-[#c0d9ec] transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <Video className="w-5 h-5 text-[#003153]" />
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#003153] transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Zoom Class Schedules</h3>
            <p className="text-[11px] text-slate-600">Schedule live lectures & links.</p>
          </Link>

          {/* Active: Recording Uploads */}
          <Link
            to="/admin/recordings"
            className="p-4 rounded-xl bg-[#f4f8fb] hover:bg-[#e6f0f7] border border-[#c0d9ec] transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <PlaySquare className="w-5 h-5 text-[#003153]" />
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#003153] transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Recording Uploads</h3>
            <p className="text-[11px] text-slate-600">Publish video lectures & notes.</p>
          </Link>

          {/* Active: Grade Management */}
          <Link
            to="/admin/grades"
            className="p-4 rounded-xl bg-[#f4f8fb] hover:bg-[#e6f0f7] border border-[#c0d9ec] transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <ShieldCheck className="w-5 h-5 text-[#003153]" />
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#003153] transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Grade Management</h3>
            <p className="text-[11px] text-slate-600">Assign student marks & remarks.</p>
          </Link>

          {/* Silent Click Options */}
          <div
            onClick={(e) => e.preventDefault()}
            className="p-4 rounded-xl bg-[#f4f8fb] hover:bg-[#e6f0f7] border border-[#c0d9ec] transition-all space-y-2 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <UserPlus className="w-5 h-5 text-[#003153]" />
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#003153] transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Parent Linkage Mgmt</h3>
            <p className="text-[11px] text-slate-600">Link parent accounts to students.</p>
          </div>

          <div
            onClick={(e) => e.preventDefault()}
            className="p-4 rounded-xl bg-[#f4f8fb] hover:bg-[#e6f0f7] border border-[#c0d9ec] transition-all space-y-2 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <CheckSquare className="w-5 h-5 text-[#003153]" />
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#003153] transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Payment Verification</h3>
            <p className="text-[11px] text-slate-600">Inspect slips & approve status.</p>
          </div>

          <div
            onClick={(e) => e.preventDefault()}
            className="p-4 rounded-xl bg-[#f4f8fb] hover:bg-[#e6f0f7] border border-[#c0d9ec] transition-all space-y-2 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <BookOpen className="w-5 h-5 text-[#003153]" />
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#003153] transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Tutorial Creator</h3>
            <p className="text-[11px] text-slate-600">Write LaTeX formulas & lessons.</p>
          </div>

          <div
            onClick={(e) => e.preventDefault()}
            className="p-4 rounded-xl bg-[#f4f8fb] hover:bg-[#e6f0f7] border border-[#c0d9ec] transition-all space-y-2 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <FilePlus className="w-5 h-5 text-[#003153]" />
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#003153] transition-colors" />
            </div>
            <h3 className="text-xs font-bold text-slate-900">Quiz Builder</h3>
            <p className="text-[11px] text-slate-600">Build multiple choice assessments.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
