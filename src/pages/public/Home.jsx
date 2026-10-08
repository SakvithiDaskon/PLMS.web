import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.jpeg';
import posterImg from '../../assets/poster.jpeg';

import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Users,
  ShieldCheck,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const Home = () => {
  return (
    <div className="space-y-10 pb-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 rounded-3xl bg-[#003153] text-white shadow-xl p-6 md:p-12 border border-[#00223d]">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold">
            <img
              src={logoImg}
              alt="PLMS Logo"
              className="w-5 h-5 rounded-full object-cover border border-white/30"
            />
            <span>Private Learning Management System (PLMS)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Transform Your Mathematics Journey: Grade 6 to 11 with{' '}
            <span className="text-blue-200">
              Sir Parakum Bandara
            </span>
          </h1>

          <p className="text-blue-50 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            The dedicated private learning portal for Grade 6 to 11 Mathematics students. Join live Zoom lectures, review recorded video modules, practice geometry and algebra step-by-step, and track your term marks.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/login"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#003153] bg-white hover:bg-[#e6f0f7] shadow-lg transition-all hover:scale-105"
            >
              <span>Access Student Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/register"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#00223d] hover:bg-[#00192e] border border-[#004575] transition-all hover:scale-105"
            >
              <GraduationCap className="w-4 h-4 text-blue-200" />
              <span>Student Registration</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Registration Guidance Banner (Between Hero & User Portals) */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#003153] to-[#00223d] text-white shadow-lg border border-[#004575] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold border border-white/10">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Registration Assistance</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">New to PLMS? Learn How to Register</h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
            Get step-by-step instructions on how students register for classes and how parents link their child's account to monitor academic progress.
          </p>
        </div>

        <Link
          to="/how-to-register"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#003153] bg-white hover:bg-[#e6f0f7] shadow-lg transition-all hover:scale-105 whitespace-nowrap shrink-0"
        >
          <span>How to Register</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Official Class Poster Section */}
      <section className="relative overflow-hidden rounded-3xl bg-white border border-[#c0d9ec] shadow-xl p-4 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#c0d9ec]/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#003153] text-white shadow">
              <Sparkles className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h3 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Official Class Announcement & Timetable
              </h3>
              <p className="text-xs text-slate-600">
                Grade 6 to 11 Mathematics classes conducted by Sir Parakum Bandara
              </p>
            </div>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-[#e6f0f7] text-[#003153] text-xs font-bold border border-[#b0d1e8] whitespace-nowrap">
            2026 Academic Session
          </span>
        </div>

        <div className="relative group overflow-hidden rounded-2xl bg-slate-900/5 border border-slate-200 flex items-center justify-center p-2 sm:p-4">
          <img
            src={posterImg}
            alt="Sir Parakum Bandara Mathematics Class Poster"
            className="w-full h-auto max-w-4xl object-contain rounded-xl shadow-md transition-transform duration-500 group-hover:scale-[1.005]"
          />
        </div>
      </section>

      {/* User Portals Section */}
      <section className="space-y-6">

        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            System User Portals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Student Portal */}
          <div className="p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm hover:border-[#003153] transition-all space-y-4">

            <div className="w-12 h-12 rounded-xl bg-[#003153] text-white flex items-center justify-center font-bold shadow">
              <GraduationCap className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              Student Portal
            </h3>

            <ul className="space-y-2 text-xs text-slate-600 font-medium">

              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#003153]" />
                Live Zoom class link access
              </li>

              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#003153]" />
                Recorded video lesson library
              </li>

              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#003153]" />
                Quizzes & O/L model test marks
              </li>

              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#003153]" />
                Easy monthly fee slip upload
              </li>

            </ul>

            <Link
              to="/login"
              className="inline-flex items-center text-xs font-bold text-[#003153] hover:underline gap-1 pt-2"
            >
              Login as Student &rarr;
            </Link>

          </div>

          {/* Parent Portal */}
          <div className="p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm hover:border-[#003153] transition-all space-y-4">

            <div className="w-12 h-12 rounded-xl bg-[#003153] text-white flex items-center justify-center font-bold shadow">
              <Users className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              Parent Portal
            </h3>

            <ul className="space-y-2 text-xs text-slate-600 font-medium">

              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#003153]" />
                Monitor Grade 6-11 child progress
              </li>

              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#003153]" />
                View test marks & Sir Parakum's notes
              </li>

              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#003153]" />
                Class attendance records
              </li>

              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#003153]" />
                Monthly fee payment receipts
              </li>

            </ul>

            <Link
              to="/login"
              className="inline-flex items-center text-xs font-bold text-[#003153] hover:underline gap-1 pt-2"
            >
              Login as Parent &rarr;
            </Link>

          </div>

          {/* Admin Portal */}
          <div className="p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm hover:border-[#003153] transition-all space-y-4">

            <div className="w-12 h-12 rounded-xl bg-[#003153] text-white flex items-center justify-center font-bold shadow">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              Sir Parakum Admin
            </h3>

            <ul className="space-y-2 text-xs text-slate-600 font-medium">

              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#003153]" />
                Schedule Zoom class sessions
              </li>

              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#003153]" />
                Manage Grade 6-11 student rosters
              </li>

              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#003153]" />
                Publish recorded video lessons
              </li>

              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#003153]" />
                Assign test marks & teacher remarks
              </li>

            </ul>

            <Link
              to="/login"
              className="inline-flex items-center text-xs font-bold text-[#003153] hover:underline gap-1 pt-2"
            >
              Login as Sir Admin &rarr;
            </Link>

          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;