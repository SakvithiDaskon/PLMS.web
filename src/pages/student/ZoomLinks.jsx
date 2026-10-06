import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { Video, Calendar, Clock, Lock, ExternalLink, Copy, Check, Radio } from 'lucide-react';

export const ZoomLinks = () => {
  const [zoomLinks, setZoomLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      const data = await apiService.getZoomLinks();
      setZoomLinks(data);
      setLoading(false);
    };
    fetchLinks();
  }, []);

  const handleCopyPasscode = (id, passcode) => {
    navigator.clipboard.writeText(passcode);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-200">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Live Zoom Classes</h1>
            <p className="text-xs text-slate-600">Join scheduled live lectures & problem solving masterclasses</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold">
          <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Live Sessions Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {zoomLinks.map((session) => (
          <div
            key={session.id}
            className={`p-6 rounded-2xl bg-white border shadow-sm transition-all space-y-4 ${
              session.isLive ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  {session.subject}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2 leading-snug">{session.title}</h3>
                <p className="text-xs text-slate-600 mt-1">Educator: <span className="text-slate-900 font-bold">{session.teacher}</span></p>
              </div>

              {session.isLive && (
                <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-full bg-emerald-600 text-white animate-pulse">
                  LIVE NOW
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold">
              <div className="flex items-center gap-2 text-slate-700">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>{session.date}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>{session.time}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs font-mono font-bold text-slate-800">Passcode: {session.passcode}</span>
                <button
                  onClick={() => handleCopyPasscode(session.id, session.passcode)}
                  className="p-1 hover:text-blue-600 text-slate-500 transition-colors"
                  title="Copy Passcode"
                >
                  {copiedId === session.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <a
                href={session.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all"
              >
                <span>Launch Zoom</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZoomLinks;
