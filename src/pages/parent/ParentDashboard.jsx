import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import { Users, Award, CreditCard, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export const ParentDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiService.getParentDashboardData(user?.id);
      setData(res);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const child = data?.child;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-blue-600 text-white shadow-lg">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30">
              <Users className="w-3.5 h-3.5 text-blue-100" />
              <span>Parent Monitoring Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Welcome, {user?.name}!</h1>
            <p className="text-xs sm:text-sm text-blue-100">
              Monitoring Student: <span className="text-white font-extrabold">{child?.name}</span> ({child?.grade})
            </p>
          </div>

          <Link
            to="/parent/child-progress"
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-blue-700 bg-white hover:bg-blue-50 shadow transition-all hover:scale-105 shrink-0"
          >
            <span>Full Progress Analysis</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Child Attendance</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{data?.attendanceRate || '96%'}</p>
          <p className="text-[11px] text-blue-700 font-bold">Excellent Attendance</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Academic Grade</span>
            <Award className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{data?.overallGrade || 'A'}</p>
          <p className="text-[11px] text-blue-700 font-bold">Top Batch Performer</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Enrolled Streams</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{data?.activeClasses || 2}</p>
          <p className="text-[11px] text-slate-600 font-medium">Maths & Physics</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-blue-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Tuition Fee Status</span>
            <CreditCard className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-blue-100 text-blue-800 border border-blue-300">
              {data?.latestPayment?.status || 'Approved'}
            </span>
          </div>
          <p className="text-[11px] text-slate-600 font-medium">{data?.latestPayment?.month || 'October 2026'}</p>
        </div>
      </div>

      {/* Exam Marks Overview */}
      <div className="p-6 rounded-2xl bg-white border border-blue-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Recent Exam Score Overview</h2>
          <Link to="/parent/child-grades" className="text-xs font-bold text-blue-600 hover:underline">
            View All Grades &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-blue-50 text-blue-900 uppercase tracking-wider text-[10px] font-bold border-b border-blue-100">
              <tr>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Exam Name</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Sir's Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {data?.recentGrades?.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{item.subject}</td>
                  <td className="py-3.5 px-4">{item.examName}</td>
                  <td className="py-3.5 px-4 text-slate-500">{item.date}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                    {item.score} / {item.maxScore}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                      {item.grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 italic">{item.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
