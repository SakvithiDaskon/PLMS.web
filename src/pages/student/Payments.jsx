import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import {
  CreditCard,
  UploadCloud,
  CheckCircle2,
  Clock,
  XCircle,
  Building,
  Image
} from 'lucide-react';

export const Payments = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    month: 'October 2026',
    amount: '4500',
    slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
    notes: 'Online bank deposit'
  });

  const fetchPayments = async () => {
    const data = await apiService.getStudentPayments(user?.id);
    setPayments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, [user]);

  const handleSubmitSlip = async (e) => {
    e.preventDefault();
    setUploading(true);
    await apiService.uploadPaymentSlip({
      studentId: user?.id || (user?.studentId ? 'std-' + user.studentId : 'std-0001'),
      studentName: user?.name || 'Student',
      ...formData
    });
    setUploading(false);
    setSuccessMsg('Payment slip submitted successfully! Pending admin approval.');
    fetchPayments();
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const getStatusBadge = (status, rejectionReason) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3.5 h-3.5" /> Approved
          </span>
        );
      case 'Rejected':
        return (
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40"
            title={rejectionReason}
          >
            <XCircle className="w-3.5 h-3.5" /> Rejected ({rejectionReason || 'Invalid Slip'})
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Clock className="w-3.5 h-3.5" /> Pending Verification
          </span>
        );
    }
  };

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
        <div className="p-3 rounded-2xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
          <CreditCard className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Monthly Fee Payments & Slip Upload</h1>
          <p className="text-xs text-slate-400">Upload bank receipt slips and view monthly approval status</p>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-amber-400" />
            <span>Upload Payment Slip</span>
          </h2>

          <form onSubmit={handleSubmitSlip} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Select Tuition Month</label>
              <select
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="October 2026">October 2026</option>
                <option value="November 2026">November 2026</option>
                <option value="December 2026">December 2026</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Paid Amount (LKR)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Receipt Image URL / File Link</label>
              <input
                type="text"
                value={formData.slipUrl}
                onChange={(e) => setFormData({ ...formData, slipUrl: e.target.value })}
                placeholder="https://image-url-or-slip.jpg"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Image Preview Box */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Slip Preview</span>
              <div className="aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                <img
                  src={formData.slipUrl}
                  alt="Receipt Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full py-2.5 rounded-xl font-semibold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-2"
            >
              {uploading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  <span>Submit Payment Slip</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Payment History & Bank Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bank Info */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-4 h-4 text-amber-400" />
              <span>Official Bank Transfer Details</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-400 text-[10px]">Bank:</span>
                <p className="font-semibold text-white">Commercial Bank PLC</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Account Name:</span>
                <p className="font-semibold text-white">PLMS Education Institute</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Account No:</span>
                <p className="font-mono font-bold text-amber-400">800-1122-3344-90</p>
              </div>
            </div>
          </div>

          {/* History Table */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Payment Submission History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Month</th>
                    <th className="py-3 px-4">Submitted At</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Slip</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {payments.map((pay) => (
                    <tr key={pay.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white">{pay.month}</td>
                      <td className="py-3.5 px-4 text-slate-400">{pay.submittedAt}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                        LKR {pay.amount.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <a
                          href={pay.slipUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1"
                        >
                          <Image className="w-3.5 h-3.5" /> View Slip
                        </a>
                      </td>
                      <td className="py-3.5 px-4">{getStatusBadge(pay.status, pay.rejectionReason)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
