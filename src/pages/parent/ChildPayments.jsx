import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { CreditCard, CheckCircle2, Clock, XCircle, Image } from 'lucide-react';

export const ChildPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      const data = await apiService.getChildPayments('std-1');
      setPayments(data);
      setLoading(false);
    };
    fetchPayments();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3.5 h-3.5" /> Approved
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40">
            <XCircle className="w-3.5 h-3.5" /> Rejected
          </span>
        );
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
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
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
          <h1 className="text-2xl font-bold text-white">Child Payment Status & Records</h1>
          <p className="text-xs text-slate-400">Read-only tuition fee history and receipt slip verification status</p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Tuition Month</th>
                <th className="py-3 px-4">Submission Date</th>
                <th className="py-3 px-4">Amount Paid</th>
                <th className="py-3 px-4">Receipt Slip</th>
                <th className="py-3 px-4">Approval Status</th>
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
                  <td className="py-3.5 px-4">{getStatusBadge(pay.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChildPayments;
