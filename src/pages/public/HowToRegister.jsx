import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Video,
  CreditCard,
  Award,
  HelpCircle,
  UserPlus,
  LogIn
} from 'lucide-react';

export const HowToRegister = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6 pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden p-6 sm:p-10 rounded-3xl bg-[#003153] text-white shadow-xl border border-[#00223d]">
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Portal Registration & User Guide
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Step-by-step instructions for Students and Parents on how to register, sign in, and access Grade 6 to 11 Mathematics classes with Sir Parakum Bandara.
            </p>
          </div>

          <div className="p-3 bg-white rounded-2xl border border-blue-100 shadow-md shrink-0">
            <img src={logo} alt="Parakum Bandara Logo" className="h-16 w-auto object-contain" />
          </div>
        </div>
      </div>

      {/* Guide 1: Student Registration & Login */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-blue-100">
          <div className="w-12 h-12 rounded-xl bg-[#003153] text-white flex items-center justify-center font-bold shadow">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Student Guide: Registration & Portal Access</h2>
            <p className="text-xs text-slate-600">How Grade 6 to 11 students join and navigate PLMS</p>
          </div>
        </div>

        {/* Step-by-Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#003153] text-white font-bold text-xs flex items-center justify-center">1</span>
            <h3 className="text-xs font-bold text-slate-900">Create Account</h3>
            <p className="text-xs text-slate-600">
              Click <strong>Register</strong> and enter your Full Name, Email, WhatsApp Phone, and select your Grade (Grade 6 to Grade 11).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#003153] text-white font-bold text-xs flex items-center justify-center">2</span>
            <h3 className="text-xs font-bold text-slate-900">Sign In to Portal</h3>
            <p className="text-xs text-slate-600">
              Go to <strong>Sign In</strong>, select the <em>Student</em> role tab, and log in with your registered email and password.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] space-y-2">
            <span className="w-7 h-7 rounded-full bg-[#003153] text-white font-bold text-xs flex items-center justify-center">3</span>
            <h3 className="text-xs font-bold text-slate-900">Access Classes</h3>
            <p className="text-xs text-slate-600">
              Join live Zoom classes, watch recorded video lessons, view term test marks, and upload monthly fee slips.
            </p>
          </div>
        </div>

        {/* What Students Can Access */}
        <div className="p-5 rounded-xl bg-[#e6f0f7] border border-[#b0d1e8] space-y-3">
          <h4 className="text-xs font-bold text-[#003153] uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>What Students Can Access in PLMS</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-[#003153]" />
              <span>Live Zoom Class Links & Passcodes</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#003153]" />
              <span>Recorded Video Lecture Library</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#003153]" />
              <span>O/L Model Test Marks & Teacher Advice</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#003153]" />
              <span>Monthly Bank Transfer Slip Upload</span>
            </div>
          </div>
        </div>
      </div>

      {/* Guide 2: Parent Portal Information */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-blue-100">
          <div className="w-12 h-12 rounded-xl bg-[#003153] text-white flex items-center justify-center font-bold shadow">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Parent Guide: Monitoring Child Progress</h2>
            <p className="text-xs text-slate-600">How parents track academic records for Grade 6 to 11 students</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-slate-700 leading-relaxed font-medium">
          <p>
            The Parent Portal allows parents to monitor their child's Grade 6-11 Mathematics progress conducted by Sir Parakum Bandara.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] space-y-1">
              <h4 className="font-bold text-[#003153]">Child Academic Marks</h4>
              <p className="text-slate-600 text-[11px]">View monthly test marks, term grades, and Sir Parakum Bandara's teacher remarks.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] space-y-1">
              <h4 className="font-bold text-[#003153]">Attendance & Payment Logs</h4>
              <p className="text-slate-600 text-[11px]">Check live Zoom class attendance percentages and verified monthly fee receipts.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Guide 3: Admin Overview */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-blue-100">
          <div className="w-12 h-12 rounded-xl bg-[#003153] text-white flex items-center justify-center font-bold shadow">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Sir Parakum Admin Management</h2>
            <p className="text-xs text-slate-600">Educator management tools</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 font-medium">
          <div className="p-3.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#003153]" />
            <span>Manage Grade 6-11 Student Rosters</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#003153]" />
            <span>Schedule Live Zoom Lectures & Passcodes</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#003153]" />
            <span>Publish Video Lessons & Math Notes</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#003153]" />
            <span>Assign Test Scores & Teacher Advice</span>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="p-8 rounded-3xl bg-[#003153] text-white text-center space-y-4 shadow-xl">
        <h3 className="text-xl font-extrabold">Ready to Join Grade 6-11 Mathematics Classes?</h3>
        <p className="text-xs text-blue-100 max-w-md mx-auto">
          Register your student account now and access live Zoom classes conducted by Sir Parakum Bandara.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/register"
            className="px-6 py-3 rounded-xl font-bold text-xs text-[#003153] bg-white hover:bg-[#e6f0f7] shadow transition-all"
          >
            Register Student Account
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-[#00223d] hover:bg-[#00192e] border border-[#004575]"
          >
            Sign In to Portal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowToRegister;
