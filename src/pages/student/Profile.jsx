import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, CheckCircle2 } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();
  const [successMsg, setSuccessMsg] = useState('');
  const [phone, setPhone] = useState(user?.phone || '+94 77 123 4567');

  const handleUpdate = (e) => {
    e.preventDefault();
    setSuccessMsg('Profile information updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-blue-100 text-blue-700 border border-blue-200">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Profile Settings</h1>
          <p className="text-xs text-slate-600">View and update your student account credentials</p>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        {/* Profile Card Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-200">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-2xl shadow">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{user?.name}</h2>
            <p className="text-xs text-blue-700 font-bold">{user?.grade || 'Grade 11 (O/L Mathematics)'}</p>
            <p className="text-[11px] text-slate-500">Student ID: <span className="font-mono font-bold text-slate-800">{user?.studentId || user?.indexNo || 'STU-2026-889'}</span></p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                disabled
                value={user?.name || ''}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Class Stream / Batch</label>
              <input
                type="text"
                disabled
                value={user?.grade || 'Grade 13 Combined Maths'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs cursor-not-allowed"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow transition-all"
          >
            Save Profile Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
