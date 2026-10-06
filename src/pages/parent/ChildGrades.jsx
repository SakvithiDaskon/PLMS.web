import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { Award, Calendar, BookOpen } from 'lucide-react';

export const ChildGrades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      const data = await apiService.getChildGrades('std-1');
      setGrades(data);
      setLoading(false);
    };
    fetchGrades();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Child Academic Grades & Results</h1>
          <p className="text-xs text-slate-400">Read-only term mark reports and teacher evaluation notes</p>
        </div>
      </div>

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
                <th className="py-3 px-4">Remarks from Educator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {grades.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">{item.subject}</td>
                  <td className="py-3.5 px-4">{item.examName}</td>
                  <td className="py-3.5 px-4 text-slate-400">{item.date}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                    {item.score} / {item.maxScore}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {item.grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 italic">{item.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChildGrades;
