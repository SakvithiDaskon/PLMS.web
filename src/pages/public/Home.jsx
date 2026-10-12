import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import posterImg from '../../assets/poster.jpeg';
import { useAuth } from '../../context/AuthContext';

import {
  GraduationCap,
  ArrowRight,
  Video,
  Award
} from 'lucide-react';

export const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-18 md:pb-22 rounded-3xl bg-[#002c4b] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.2),rgba(0,0,0,0))] text-white shadow-2xl p-6 sm:p-10 md:p-14 border border-[#004575]">
        {/* Ambient background glows */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-7">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Transform Your Mathematics Journey: Grade 6 to 11 with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-sky-200 to-cyan-300">
              Mr Parakum Bandara
            </span>
          </h1>

          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-blue-100/95 text-sm sm:text-base md:text-lg leading-relaxed">
              Your online Mathematics learning portal for Grades 6–11. Join live classes, watch recorded lessons, and track your progress all in one place!
            </p>

            <p className="text-blue-100/90 text-xs sm:text-sm md:text-base leading-relaxed">
              6–11 ශ්‍රේණි සිසුන් සඳහා වූ මාර්ගගත ගණිත ඉගෙනුම් අවකාශය. සජීවී පන්තිවලට සහභාගී වන්න, පටිගත කළ පාඩම් නරඹන්න, ඔබේ ප්‍රගතිය නිරීක්ෂණය කරන්න සියල්ල එකම තැනකින්!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#user-portals"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('user-portals');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-[#003153] bg-white hover:bg-[#e6f0f7] shadow-xl hover:shadow-cyan-500/20 transition-all hover:scale-[1.02] border border-white cursor-pointer"
            >
              <span>Access Portal</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <Link
              to="/register"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-[#00223d] hover:bg-[#00192e] border border-cyan-400/40 shadow-xl transition-all hover:scale-[1.02]"
            >
              <GraduationCap className="w-4 h-4 text-cyan-300" />
              <span>Student Registration</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Registration Guidance Banner */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#003153] to-[#00223d] text-white shadow-xl border border-[#004575] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-xl sm:text-2xl font-bold">New to PLMS? Learn How to Register</h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
            Get step-by-step instructions on how students register for classes and how parents link their child's account to monitor academic progress.
          </p>
        </div>

        <Link
          to="/how-to-register"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#003153] bg-white hover:bg-[#e6f0f7] shadow-lg transition-all hover:scale-105 whitespace-nowrap shrink-0 border border-white"
        >
          <span>How to Register</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Official Class Poster Section */}
      <section className="relative overflow-hidden rounded-3xl bg-white border border-[#c0d9ec] shadow-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#c0d9ec]/60">
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="PLMS Logo"
              className="w-10 h-10 rounded-xl object-cover border border-[#c0d9ec] shadow-sm shrink-0"
            />
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Official Class Announcement
              </h3>
              <p className="text-xs text-slate-600">
                Mathematics classes for Grade 6 to 11 conducted by Mr Parakum Bandara
              </p>
            </div>
          </div>
          <span className="text-xs sm:text-sm font-bold text-[#003153] tracking-wide">
            2026 Academic Session
          </span>
        </div>

        {/* Poster Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-1">
          {/* Left Column: Highlights & Quick Info */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2.5">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#003153] bg-[#e6f0f7] px-3 py-1 rounded-none border border-[#b0d1e8]">
                Class Details
              </span>
              <h4 className="text-2xl font-extrabold text-slate-900 leading-snug">
                Mathematics Classes for Grade 6 to 11
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Mathematics classes for Grade 6 to 11 conducted by Mr Parakum Bandara. Join live Zoom sessions, access recorded modules, and build strong problem solving skills.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#003153] text-white flex items-center justify-center font-extrabold text-xs shrink-0 shadow-xs">
                  6-11
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Grades 6 to 11</h5>
                  <p className="text-[11px] text-slate-500 font-medium">Full Mathematics Syllabus</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#003153] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  <Video className="w-4 h-4 text-blue-200" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Live Zoom & Recorded</h5>
                  <p className="text-[11px] text-slate-500 font-medium">HD Recording Access</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#003153] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  <Award className="w-4 h-4 text-blue-200" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">O/L Paper Practice</h5>
                  <p className="text-[11px] text-slate-500 font-medium">Model Papers & Evaluation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Normal picture in a box, no click expand */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-xs sm:max-w-sm rounded-2xl bg-[#00223d] p-2.5 sm:p-3 shadow-md border border-[#004575]">
              <div className="overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center max-h-[400px]">
                <img
                  src={posterImg}
                  alt="Mr Parakum Bandara Mathematics Class Poster"
                  className="w-full h-auto max-h-[380px] object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Portals Section */}
      <section id="user-portals" className="space-y-6 scroll-mt-10">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            User Portals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Student Portal */}
          <Link
            to="/login"
            className="group relative p-7 sm:p-8 rounded-2xl bg-white hover:bg-[#f8fbfe] text-slate-900 border-2 border-[#d9e8f5] hover:border-[#003153] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6 cursor-pointer text-left overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#003153] via-sky-500 to-cyan-400" />
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-[#003153] transition-colors">
                Student Portal
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Access live Zoom classes, recorded lesson video library, and term test marks.
              </p>
            </div>

            <div className="pt-2">
              <div className="w-full py-3 px-4 rounded-none bg-[#003153] group-hover:bg-[#00223d] text-white text-xs sm:text-sm font-bold flex items-center justify-center transition-all shadow-sm group-hover:shadow-md">
                <span>Login to Student Portal</span>
              </div>
            </div>
          </Link>

          {/* Parent Portal */}
          <Link
            to="/login"
            className="group relative p-7 sm:p-8 rounded-2xl bg-white hover:bg-[#f8fbfe] text-slate-900 border-2 border-[#d9e8f5] hover:border-[#003153] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6 cursor-pointer text-left overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#003153] via-blue-500 to-sky-400" />
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-[#003153] transition-colors">
                Parent Portal
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Monitor student academic progress, attendance records, and term reports.
              </p>
            </div>

            <div className="pt-2">
              <div className="w-full py-3 px-4 rounded-none bg-[#003153] group-hover:bg-[#00223d] text-white text-xs sm:text-sm font-bold flex items-center justify-center transition-all shadow-sm group-hover:shadow-md">
                <span>Login to Parent Portal</span>
              </div>
            </div>
          </Link>

          {/* Admin */}
          <Link
            to="/login"
            className="group relative p-7 sm:p-8 rounded-2xl bg-white hover:bg-[#f8fbfe] text-slate-900 border-2 border-[#d9e8f5] hover:border-[#003153] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6 cursor-pointer text-left overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00223d] via-[#003153] to-cyan-500" />
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-[#003153] transition-colors">
                Admin
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Manage Grade 6–11 classes, schedules, and students.
              </p>
            </div>

            <div className="pt-2">
              <div className="w-full py-3 px-4 rounded-none bg-[#003153] group-hover:bg-[#00223d] text-white text-xs sm:text-sm font-bold flex items-center justify-center transition-all shadow-sm group-hover:shadow-md">
                <span>Login to Admin Portal</span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div >
  );
};

export default Home;