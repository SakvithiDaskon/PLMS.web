import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Users,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';

export const Home = () => {
  return (
    <div className="space-y-10 pb-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 rounded-3xl bg-[#003153] text-white shadow-xl p-6 md:p-12 border border-[#00223d]">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center mb-2">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/20 shadow-lg backdrop-blur-sm">
              <img src={logo} alt="Parakum Bandara PLMS Logo" className="h-16 w-auto object-contain" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Excel in Grade 6 to 11 Mathematics with{' '}
            <span className="text-blue-200">Sir Parakum Bandara</span>
          </h1>

          <p className="text-blue-50 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            The dedicated private learning portal for Grade 6 to 11 (O/L) Mathematics students. Join live Zoom lectures, review recorded video modules, practice geometry and algebra step-by-step, and track your term marks.
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
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#00223d] hover:bg-[#00192e] border border-[#004575] transition-all"
            >
              <GraduationCap className="w-4 h-4 text-blue-200" />
              <span>Student Registration</span>
            </Link>

            {/* How to Register Button -> Opens /how-to-register page */}
            <Link
              to="/how-to-register"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-blue-100 bg-white/10 hover:bg-white/20 border border-white/30 transition-all"
            >
              <HelpCircle className="w-4 h-4 text-blue-200" />
              <span>How to Register</span>
            </Link>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">New to PLMS? Learn How to Register</h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
            Get step-by-step instructions on how students register for classes and how parents link their child's account to monitor academic progress.
          </p>
        </div>
      </section>



      {/* User Portals Section */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">System User Portals</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm hover:border-[#003153] transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#003153] text-white flex items-center justify-center font-bold shadow">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Student Portal</h3>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Live Zoom class link access</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Recorded video lesson library</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Quizzes & O/L model test marks</li>
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
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Monitor Grade 6-11 child progress</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> View test marks & Sir Parakum's notes</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Class attendance records</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Monthly fee payment receipts</li>
            </ul>
            <Link to="/login" className="inline-flex items-center text-xs font-bold text-[#003153] hover:underline gap-1 pt-2">
              Login as Parent &rarr;
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm hover:border-[#003153] transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#003153] text-white flex items-center justify-center font-bold shadow">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Sir Parakum Admin</h3>
            <ul className="space-y-2 text-xs text-slate-600 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Schedule Zoom class sessions</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Manage Grade 6-11 student rosters</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Publish recorded video lessons</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#003153]" /> Assign test marks & teacher remarks</li>
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
