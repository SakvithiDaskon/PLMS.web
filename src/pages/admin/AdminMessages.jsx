import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import {
  MessageSquare, Send, CheckCircle2, Clock, User, GraduationCap,
  BookOpen, Filter, Loader2, AlertCircle, Eye, EyeOff, ChevronDown, ChevronUp
} from 'lucide-react';

const GRADES = ['', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'];

const StatusBadge = ({ status }) => {
  const isAnswered = status === 'answered' || status === 'replied';
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
      isAnswered ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
    }`}>
      {isAnswered ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
      {isAnswered ? 'Answered' : 'Pending'}
    </span>
  );
};

const MessageCard = ({ msg, onReply, onMarkRead }) => {
  const [expanded, setExpanded] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);

  const isAnswered = msg.status === 'answered' || msg.status === 'replied';

  const handleSend = async () => {
    if (!replyText.trim()) return;
    setSending(true);
    try {
      await onReply(msg.message_id || msg.id, replyText);
      setReplyText('');
      setShowReply(false);
    } finally {
      setSending(false);
    }
  };

  const sentDate = msg.created_at || msg.sent_at || msg.sentAt;
  const repliedDate = msg.replied_at || msg.repliedAt;

  return (
    <div className={`rounded-2xl border bg-white shadow-sm overflow-hidden border-l-4 ${isAnswered ? 'border-l-emerald-400' : 'border-l-amber-400'}`}>
      {/* Card Header */}
      <div className={`px-5 py-4 flex flex-col sm:flex-row sm:items-start gap-3 ${isAnswered ? 'bg-emerald-50' : 'bg-amber-50'} border-b border-[#e6f0f7]`}>
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-sm font-black text-slate-800">
              <User className="w-4 h-4 text-[#003153]" />
              {msg.student_name || msg.studentName || 'Unknown Student'}
              {msg.index_no && (
                <span className="text-xs text-slate-500 font-bold">({msg.index_no})</span>
              )}
            </div>
            {msg.grade && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#003153]/10 text-[#003153] border border-[#003153]/20">
                <GraduationCap className="w-3 h-3" />
                {msg.grade}
              </span>
            )}
            <StatusBadge status={msg.status} />
            {!msg.is_read && !isAnswered && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-700 border border-blue-200">NEW</span>
            )}
          </div>

          {(msg.subject || msg.lesson) && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
              {msg.subject && <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{msg.subject}</span>}
              {msg.lesson && <span className="text-slate-400">· Lesson: {msg.lesson}</span>}
            </div>
          )}

          <p className="text-sm font-bold text-slate-900">{msg.subject_line || msg.subjectLine || 'No subject'}</p>

          {sentDate && (
            <p className="text-[10px] text-slate-400 font-medium">
              Sent: {new Date(sentDate).toLocaleString()}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!isAnswered && !msg.is_read && (
            <button
              onClick={() => onMarkRead(msg.message_id || msg.id)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#c0d9ec] text-xs font-bold text-slate-700 hover:bg-[#e6f0f7] transition-all"
            >
              <Eye className="w-3.5 h-3.5" /> Mark Read
            </button>
          )}
          <button
            onClick={() => setExpanded(p => !p)}
            className="p-1.5 rounded-xl hover:bg-white/70 transition-all"
          >
            {expanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>
        </div>
      </div>

      {/* Expandable body */}
      {expanded && (
        <div className="px-5 py-4 space-y-4">
          {/* Question */}
          <div>
            <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1">Student's Question</p>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{msg.question || msg.message || msg.body || '(No content)'}</p>
          </div>

          {/* Existing reply */}
          {isAnswered && (msg.reply || msg.reply_text) && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <p className="text-xs font-black text-emerald-700 uppercase tracking-wider">Reply</p>
              <p className="text-sm text-slate-700 whitespace-pre-wrap">{msg.reply || msg.reply_text}</p>
              {(msg.replied_by || msg.repliedBy) && (
                <p className="text-[10px] text-slate-500">By: {msg.replied_by || msg.repliedBy}{repliedDate ? ` · ${new Date(repliedDate).toLocaleString()}` : ''}</p>
              )}
            </div>
          )}

          {/* Reply form */}
          {!showReply ? (
            <button
              onClick={() => setShowReply(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#003153] text-white text-xs font-bold hover:bg-[#004575] transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              {isAnswered ? 'Send Another Reply' : 'Reply'}
            </button>
          ) : (
            <div className="space-y-3">
              <label className="block text-xs font-black text-[#003153]">Your Reply</label>
              <textarea
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#c0d9ec] text-sm focus:outline-none focus:ring-2 focus:ring-[#003153]/30 min-h-[100px]"
                placeholder="Type your reply here…"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSend}
                  disabled={sending || !replyText.trim()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#003153] text-white text-xs font-bold hover:bg-[#004575] transition-all disabled:opacity-50"
                >
                  {sending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  Send Reply
                </button>
                <button
                  onClick={() => { setShowReply(false); setReplyText(''); }}
                  className="px-4 py-2 rounded-xl bg-white border border-[#c0d9ec] text-xs font-bold text-slate-700 hover:bg-[#e6f0f7] transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const AdminMessages = ({ defaultGrade = '' }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ grade: defaultGrade, status: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  // Update grade filter if defaultGrade prop changes
  useEffect(() => {
    if (defaultGrade) setFilter(f => ({ ...f, grade: defaultGrade }));
  }, [defaultGrade]);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await apiService.getStudentMessages();
      const arr = Array.isArray(data) ? data : (data?.messages || []);
      setMessages(arr);
    } catch (err) {
      console.error('Failed to load messages:', err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg) => { setSuccessMsg(msg); setTimeout(() => setSuccessMsg(''), 3000); };
  const showError = (msg) => { setErrorMsg(msg); setTimeout(() => setErrorMsg(''), 4000); };

  const handleReply = async (msgId, replyText) => {
    try {
      await apiService.replyToMessage(msgId, replyText);
      showSuccess('Reply sent!');
      await loadMessages();
    } catch (err) {
      showError('Failed to send reply: ' + (err.message || 'Unknown error'));
    }
  };

  const handleMarkRead = async (msgId) => {
    try {
      await apiService.markMessageRead(msgId);
      await loadMessages();
    } catch (err) {
      showError('Failed to mark as read.');
    }
  };

  // Filter messages
  const filtered = messages.filter(m => {
    const gradeMatch = !filter.grade || m.grade === filter.grade;
    const isAnswered = m.status === 'answered' || m.status === 'replied';
    const statusMatch = !filter.status || (filter.status === 'answered' ? isAnswered : !isAnswered);
    return gradeMatch && statusMatch;
  }).sort((a, b) => {
    const dA = new Date(a.created_at || a.sent_at || 0);
    const dB = new Date(b.created_at || b.sent_at || 0);
    return dB - dA;
  });

  const totalCount = messages.length;
  const pendingCount = messages.filter(m => m.status !== 'answered' && m.status !== 'replied').length;
  const answeredCount = messages.filter(m => m.status === 'answered' || m.status === 'replied').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-r from-[#003153] to-[#00223d] text-white shadow-xl border border-[#004575]">
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          <MessageSquare className="w-40 h-40" />
        </div>
        <div className="relative z-10 space-y-1">
          <h1 className="text-2xl font-black tracking-tight">Student Messages</h1>
          <p className="text-sm text-blue-200">View and reply to questions from students across all grades.</p>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold">
          <CheckCircle2 className="w-4 h-4 shrink-0" />{successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-bold">
          <AlertCircle className="w-4 h-4 shrink-0" />{errorMsg}
        </div>
      )}

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Messages', value: totalCount, color: 'text-[#003153]', bg: 'bg-[#e6f0f7]' },
          { label: 'Pending', value: pendingCount, color: 'text-amber-700', bg: 'bg-amber-50' },
          { label: 'Answered', value: answeredCount, color: 'text-emerald-700', bg: 'bg-emerald-50' },
        ].map(stat => (
          <div key={stat.label} className={`p-4 rounded-2xl ${stat.bg} border border-[#c0d9ec] text-center`}>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-500 font-bold mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="p-4 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm flex flex-wrap gap-3 items-center">
        <Filter className="w-4 h-4 text-[#003153] shrink-0" />
        <span className="text-xs font-black text-[#003153] uppercase tracking-wider">Filters:</span>

        {/* Grade Filter */}
        <div className="relative">
          <select
            value={filter.grade}
            onChange={e => setFilter(f => ({ ...f, grade: e.target.value }))}
            className="pl-3 pr-7 py-1.5 rounded-xl border border-[#c0d9ec] text-xs font-bold text-[#003153] bg-white focus:outline-none focus:ring-2 focus:ring-[#003153]/30 appearance-none cursor-pointer"
          >
            <option value="">All Grades</option>
            {GRADES.filter(Boolean).map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#003153] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          {[{ val: '', label: 'All' }, { val: 'pending', label: 'Pending' }, { val: 'answered', label: 'Answered' }].map(opt => (
            <button
              key={opt.val}
              onClick={() => setFilter(f => ({ ...f, status: opt.val }))}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${filter.status === opt.val ? 'bg-[#003153] text-white border-[#003153]' : 'bg-white text-slate-700 border-[#c0d9ec] hover:bg-[#e6f0f7]'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <button
          onClick={loadMessages}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#c0d9ec] text-xs font-bold text-slate-700 hover:bg-[#e6f0f7] transition-all"
        >
          <Loader2 className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {/* Message List */}
      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-slate-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-medium">Loading messages…</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400 space-y-2">
          <MessageSquare className="w-10 h-10 opacity-30" />
          <p className="text-sm font-bold">No messages found</p>
          <p className="text-xs">Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xs text-slate-500 font-bold">Showing {filtered.length} of {totalCount} messages</p>
          {filtered.map(msg => (
            <MessageCard
              key={msg.message_id || msg.id}
              msg={msg}
              onReply={handleReply}
              onMarkRead={handleMarkRead}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
