import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import MathRenderer from '../../components/MathRenderer';
import { PlaySquare, Search, Play, Clock, Calendar, X, BookOpen } from 'lucide-react';

export const ClassRecordings = () => {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const fetchRecs = async () => {
      const data = await apiService.getClassRecordings();
      setRecordings(data);
      setLoading(false);
    };
    fetchRecs();
  }, []);

  const filtered = recordings.filter(
    (r) =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-100 text-blue-700 border border-blue-200">
            <PlaySquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Class Recordings Library</h1>
            <p className="text-xs text-slate-600">Rewatch previous live lectures, problem tutorials & equation breakdowns</p>
          </div>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recordings..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((video) => (
          <div
            key={video.id}
            className="group rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden hover:border-blue-500 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail with Play Overlay */}
              <div
                onClick={() => setActiveVideo(video)}
                className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer group"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 text-[10px] font-mono text-white flex items-center gap-1 font-bold">
                  <Clock className="w-3 h-3 text-blue-400" /> {video.duration}
                </div>
              </div>

              {/* Details */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                    {video.subject}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-semibold">
                    <Calendar className="w-3 h-3" /> {video.date}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2">{video.description}</p>

                {/* Math notes attached */}
                {video.mathNotes && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1 mb-1">
                      <BookOpen className="w-3 h-3" /> Key Topic Formula
                    </span>
                    <MathRenderer math={video.mathNotes} inline />
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => setActiveVideo(video)}
                className="w-full py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Play className="w-3.5 h-3.5" /> Watch Recording
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xl space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-900 text-white">
              <div>
                <span className="text-[10px] font-bold text-blue-300 uppercase">{activeVideo.subject}</span>
                <h3 className="text-base font-bold text-white">{activeVideo.title}</h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-4">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-200">
                <iframe
                  src={activeVideo.videoUrl}
                  title={activeVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="p-4 space-y-2 text-slate-900">
              <h4 className="text-xs font-bold text-slate-900">Video Lesson Description:</h4>
              <p className="text-xs text-slate-600">{activeVideo.description}</p>
              {activeVideo.mathNotes && (
                <div className="pt-2">
                  <span className="text-xs font-bold text-blue-700">Featured KaTeX Formula:</span>
                  <MathRenderer math={activeVideo.mathNotes} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassRecordings;
