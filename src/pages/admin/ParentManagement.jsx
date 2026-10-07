import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { UserPlus, Link2, CheckCircle2, X, Search, ShieldCheck } from 'lucide-react';

export const ParentManagement = () => {
  const [parents, setParents] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddParentModal, setShowAddParentModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [parentFormData, setParentFormData] = useState({ name: '', email: '', phone: '', occupation: '' });

  const loadData = async () => {
    const [pData, sData] = await Promise.all([apiService.getAllParents(), apiService.getAllStudents()]);
    setParents(pData);
    setStudents(sData);
    if (sData.length > 0) setSelectedStudentId(sData[0].id);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddParent = async (e) => {
    e.preventDefault();
    await apiService.addParent(parentFormData);
    setShowAddParentModal(false);
    setParentFormData({ name: '', email: '', phone: '', occupation: '' });
    setSuccessMsg('Parent registered successfully!');
    loadData();
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    if (!selectedParent || !selectedStudentId) return;

    await apiService.linkParentToStudent(selectedParent.id, selectedStudentId);
    setShowLinkModal(false);
    setSuccessMsg(`Successfully linked parent (${selectedParent.name}) to student account!`);
    loadData();
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Parent Account & Linkage Management</h1>
            <p className="text-xs text-slate-400">Manage parent accounts and link parent portals to student profiles</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddParentModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md transition-all shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register New Parent</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Parent List Table */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white">Registered Parent Accounts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Parent Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Occupation</th>
                <th className="py-3 px-4">Linked Student(s)</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {parents.map((prn) => {
                const linkedNames = (prn.linkedStudentIds || [])
                  .map((sId) => students.find((s) => s.id === sId)?.name)
                  .filter(Boolean);

                return (
                  <tr key={prn.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">{prn.name}</td>
                    <td className="py-3.5 px-4 text-slate-400">{prn.email}</td>
                    <td className="py-3.5 px-4">{prn.phone}</td>
                    <td className="py-3.5 px-4 text-slate-400">{prn.occupation || 'N/A'}</td>
                    <td className="py-3.5 px-4">
                      {linkedNames.length > 0 ? (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {linkedNames.join(', ')}
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          No Linked Child
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => {
                          setSelectedParent(prn);
                          setShowLinkModal(true);
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 flex items-center gap-1.5 transition-colors"
                      >
                        <Link2 className="w-3.5 h-3.5" /> Link Student
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Parent Modal */}
      {showAddParentModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Add New Parent Account</h3>
              <button onClick={() => setShowAddParentModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddParent} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Parent Full Name</label>
                <input
                  type="text"
                  required
                  value={parentFormData.name}
                  onChange={(e) => setParentFormData({ ...parentFormData, name: e.target.value })}
                  placeholder="Sunil Perera"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={parentFormData.email}
                  onChange={(e) => setParentFormData({ ...parentFormData, email: e.target.value })}
                  placeholder="parent@plms.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Contact Phone</label>
                <input
                  type="text"
                  required
                  value={parentFormData.phone}
                  onChange={(e) => setParentFormData({ ...parentFormData, phone: e.target.value })}
                  placeholder="+94 70 333 2211"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Occupation</label>
                <input
                  type="text"
                  value={parentFormData.occupation}
                  onChange={(e) => setParentFormData({ ...parentFormData, occupation: e.target.value })}
                  placeholder="Engineer / Business"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddParentModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300"
                >
                  Register Parent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Link Parent to Student Modal */}
      {showLinkModal && selectedParent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400">
                <Link2 className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Link Parent to Student</h3>
              </div>
              <button onClick={() => setShowLinkModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Select student profile to connect with parent{' '}
              <span className="text-amber-300 font-bold">{selectedParent.name}</span>:
            </p>

            <form onSubmit={handleLinkSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Select Student</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.grade}) - {s.studentId || s.indexNo || 'STU-2026'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md"
                >
                  Confirm Linkage
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentManagement;
