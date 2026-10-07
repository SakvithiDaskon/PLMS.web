import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  ShieldCheck,
  HelpCircle,
  BookOpen
} from 'lucide-react';

export const Home = () => {
  return (
    <div className="space-y-10 pb-12">
      {/* Hero Banner (#003153 Card) */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 rounded-3xl bg-[#003153] text-white shadow-xl p-6 md:p-12 border border-[#00223d]">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-blue-200" />
            <span>Private Learning Management System (PLMS)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Build Strong Mathematical Foundations for Grade 6 to 11
          </h1>

          <p className="text-blue-50 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            The complete educational suite tailored for Sri Lankan Grade 6 to 11 students, parents, and Sir Parakum Bandara. Experience live Zoom lectures, recorded modules, and instant payment approvals.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/login"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#003153] bg-white hover:bg-[#e6f0f7] shadow-lg transition-all hover:scale-105"
            >
              <span>Access Student Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#00223d] hover:bg-[#00192e] border border-[#004575] transition-all"
            >
              <GraduationCap className="w-4 h-4 text-blue-200" />
              <span>Student Registration</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How to Register Button / Callout Banner (Placed between top explain box and roles) */}
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
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#003153] bg-white hover:bg-[#e6f0f7] shadow-lg transition-all hover:scale-105 whitespace-nowrap"
        >
          <BookOpen className="w-4 h-4 text-[#003153]" />
          <span>How to Register</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Roles Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">System Roles & Portal Access</h2>
          <p className="text-slate-600 text-xs sm:text-sm">Dedicated portals designed for Students, Parents, and Sir Parakum Bandara Admin.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm hover:border-[#003153] transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#003153] text-white flex items-center justify-center font-bold shadow">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Student Portal</h3>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> One-click Zoom class access</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Recorded video lecture library</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Quizzes & term mark results</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Easy monthly fee slip upload</li>
            </ul>
            <Link to="/login" className="inline-flex items-center text-xs font-bold text-[#003153] hover:underline gap-1 pt-2">
              Login as Student &rarr;
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm hover:border-[#003153] transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#003153] text-white flex items-center justify-center font-bold shadow">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Parent Portal</h3>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Linked child progress metrics</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Test scores & teacher remarks</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Attendance logs & activity reports</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Fee payment status & receipts</li>
            </ul>
            <Link to="/login" className="inline-flex items-center text-xs font-bold text-[#003153] hover:underline gap-1 pt-2">
              Login as Parent &rarr;
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm hover:border-[#003153] transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#003153] text-white flex items-center justify-center font-bold shadow">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Sir / Admin Dashboard</h3>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Schedule Zoom links & recordings</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Link parents to student accounts</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Approve / Reject payment slips</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Create quizzes & publish term results</li>
            </ul>
            <Link to="/login" className="inline-flex items-center text-xs font-bold text-[#003153] hover:underline gap-1 pt-2">
              Login as Sir Admin &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
