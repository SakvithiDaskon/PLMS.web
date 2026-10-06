import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import {
  CheckSquare,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  X,
  AlertTriangle
} from 'lucide-react';

export const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewSlip, setPreviewSlip] = useState(null);
  const [rejectingPayment, setRejectingPayment] = useState(null);
  const [rejectReason, setRejectReason] = useState('Illegible receipt scan');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchPayments = async () => {
    const data = await apiService.getAllPayments();
    setPayments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleApprove = async (id) => {
    await apiService.approvePayment(id);
    setSuccessMsg('Payment slip approved successfully!');
    fetchPayments();
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleRejectSubmit = async (e) => {
    e.preventDefault();
    if (!rejectingPayment) return;
    await apiService.rejectPayment(rejectingPayment.id, rejectReason);
    setRejectingPayment(null);
    setSuccessMsg('Payment status marked as Rejected.');
    fetchPayments();
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-200">
          <CheckSquare className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Submitted Slip Verification & Approvals</h1>
          <p className="text-xs text-slate-600">Review student fee payment receipts and update authorization status</p>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Slips Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Tuition Month</th>
                <th className="py-3 px-4">Submitted At</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Receipt Slip</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((pay) => (
                <tr key={pay.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{pay.studentName}</td>
                  <td className="py-3.5 px-4 font-bold text-blue-700">{pay.month}</td>
                  <td className="py-3.5 px-4 text-slate-500">{pay.submittedAt}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    LKR {pay.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setPreviewSlip(pay)}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> Inspect Slip
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    {pay.status === 'Approved' ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 w-max">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Approved
                      </span>
                    ) : pay.status === 'Rejected' ? (
                      <span
                        className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1 w-max"
                        title={pay.rejectionReason}
                      >
                        <XCircle className="w-3 h-3 text-rose-600" /> Rejected
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1 w-max">
                        <Clock className="w-3 h-3 text-amber-600" /> Pending Verification
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApprove(pay.id)}
                        disabled={pay.status === 'Approved'}
                        className="px-3 py-1.5 rounded-lg font-bold text-[11px] text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setRejectingPayment(pay)}
                        disabled={pay.status === 'Rejected'}
                        className="px-3 py-1.5 rounded-lg font-bold text-[11px] text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Slip Modal */}
      {previewSlip && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Payment Slip Inspection</h3>
                <p className="text-xs text-slate-500">
                  Student: {previewSlip.studentName} ({previewSlip.month})
                </p>
              </div>
              <button onClick={() => setPreviewSlip(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200 flex items-center justify-center">
              <img src={previewSlip.slipUrl} alt="Submitted Slip" className="w-full h-full object-contain" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono font-bold text-slate-900">
                Amount: LKR {previewSlip.amount.toLocaleString()}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleApprove(previewSlip.id);
                    setPreviewSlip(null);
                  }}
                  className="px-4 py-1.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500"
                >
                  Approve Slip Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Slip Modal */}
      {rejectingPayment && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-rose-600">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-base font-bold text-slate-900">Reject Payment Slip</h3>
              </div>
              <button onClick={() => setRejectingPayment(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Reason for Rejection</label>
                <textarea
                  rows={3}
                  required
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="e.g. Deposit slip image is unreadable."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-rose-600"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRejectingPayment(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;
