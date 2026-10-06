import React from 'react';
import { Link } from 'react-router-dom';
import MathRenderer from '../../components/MathRenderer';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Users,
  ShieldCheck
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
            Master Advanced Mathematics & Physics with PLMS
          </h1>

          <p className="text-blue-50 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            The complete educational suite tailored for Sri Lankan A/L & O/L students, parents, and Sir Daskon. Experience live Zoom lectures, recorded modules, instant payment approvals, and dynamic KaTeX math rendering.
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

      {/* Feature Section: KaTeX Engine (White Card) */}
      <section className="p-8 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm space-y-6 text-slate-900">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#e6f0f7] text-[#003153] border border-[#b0d1e8] font-bold">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Native KaTeX Mathematical Formula Engine</h2>
            <p className="text-slate-600 text-xs sm:text-sm">High-speed LaTeX equation rendering for Combined Maths & Physics proofs.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] space-y-3">
            <span className="text-xs font-bold text-[#003153] uppercase tracking-wider">Definite Integrals</span>
            <MathRenderer math="\int_{a}^{b} f(x) dx = F(b) - F(a)" />
            <p className="text-slate-600 text-xs">Used in Pure Mathematics for calculating enclosed region areas under curves.</p>
          </div>

          <div className="p-5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] space-y-3">
            <span className="text-xs font-bold text-[#003153] uppercase tracking-wider">Rotational Physics</span>
            <MathRenderer math="E = \frac{1}{2} I \omega^2 + \frac{1}{2} m v^2" />
            <p className="text-slate-600 text-xs">Rotational kinetic energy equation for rigid rotating bodies.</p>
          </div>
        </div>
      </section>

      {/* Roles Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Three System Roles</h2>
          <p className="text-slate-600 text-xs sm:text-sm">Clean Prussian Blue (#003153) portal interface for Students, Parents, and Admins.</p>
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
