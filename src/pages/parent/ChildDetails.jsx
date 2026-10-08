import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { User, Mail, Phone, BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';

export const ChildDetails = () => {
  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChild = async () => {
      const data = await apiService.getChildDetails('std-1');
      setChild(data);
      setLoading(false);
    };
    fetchChild();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Linked Child Profile</h1>
          <p className="text-xs text-slate-400">Read-only student information & batch details</p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center font-bold text-white text-2xl shadow-lg">
            {child?.name ? child.name.charAt(0).toUpperCase() : 'C'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{child?.name}</h2>
            <p className="text-xs text-amber-300 font-semibold">{child?.grade}</p>
            <p className="text-[11px] text-slate-400">Student ID: <span className="font-mono text-slate-200">{child?.studentId || child?.indexNo}</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Email Address</span>
            <p className="text-xs font-medium text-white">{child?.email}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Phone Number</span>
            <p className="text-xs font-medium text-white">{child?.phone}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Enrolled Subject Stream</span>
            <p className="text-xs font-medium text-white">{child?.grade}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Instructor</span>
            <p className="text-xs font-medium text-indigo-400">Sir Parakum Bandara (PLMS)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildDetails;
