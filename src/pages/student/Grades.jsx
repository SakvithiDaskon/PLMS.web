import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import { Award, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';

export const Grades = () => {
  const { user } = useAuth();
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      const data = await apiService.getStudentGrades(user?.id);
      setGrades(data);
      setLoading(false);
    };
    fetchGrades();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Academic Grades & Exam Results</h1>
          <p className="text-xs text-slate-400">Monthly test performance summary and teacher evaluations</p>
        </div>
      </div>

      {/* Grade Table */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Assessment Name</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {grades.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">{item.subject}</td>
                  <td className="py-3.5 px-4">{item.examName}</td>
                  <td className="py-3.5 px-4 text-slate-400">{item.date}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-400">
                    {item.score} / {item.maxScore}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      {item.grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 text-xs italic">{item.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Grades;
