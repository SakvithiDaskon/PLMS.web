import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  ShieldCheck,
  FileText,
  UserPlus,
  Lock,
  PhoneCall,
  Sparkles
} from 'lucide-react';

export const HowToRegister = () => {
  const [activeTab, setActiveTab] = useState('student');

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#003153] hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Landing Page</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How to Register on PLMS
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Step-by-step registration guide for Students and Parents on Sir Parakum Bandara's PLMS Platform.
          </p>
        </div>

        <Link
          to="/register"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#003153] text-white text-xs font-bold shadow hover:bg-[#00223d] transition-all self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register Now</span>
        </Link>
      </div>

      {/* Role Selection Tabs */}
      <div className="flex rounded-2xl bg-[#e6f0f7] p-1.5 border border-[#c0d9ec] shadow-inner">
        <button
          onClick={() => setActiveTab('student')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'student'
              ? 'bg-[#003153] text-white shadow-md'
              : 'text-slate-700 hover:bg-[#c0d9ec]/60'
          }`}
        >
          <GraduationCap className="w-5 h-5" />
          <span>Student Registration Guide</span>
        </button>

        <button
          onClick={() => setActiveTab('parent')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'parent'
              ? 'bg-[#003153] text-white shadow-md'
              : 'text-slate-700 hover:bg-[#c0d9ec]/60'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Parent Registration Guide</span>
        </button>
      </div>

      {/* Student Registration Instructions */}
      {activeTab === 'student' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#003153] text-white flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Student Account Registration Steps</h2>
                <p className="text-xs text-slate-500">Follow these 4 simple steps to set up your student portal account.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Step 1 */}
              <div className="p-5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-[#003153] text-white text-xs font-bold">Step 1</span>
                  <UserPlus className="w-5 h-5 text-[#003153]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Navigate to Student Registration</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Click on the <strong>"Student Registration"</strong> or <strong>"Register Now"</strong> button at the top header or on the public landing page.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-[#003153] text-white text-xs font-bold">Step 2</span>
                  <FileText className="w-5 h-5 text-[#003153]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Fill Personal & Academic Details</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter your Full Name, Email, WhatsApp Phone Number, and select your class grade (e.g. <em>Grade 6 - 11 Mathematics</em>).
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-[#003153] text-white text-xs font-bold">Step 3</span>
                  <Lock className="w-5 h-5 text-[#003153]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Create Password & Submit</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Choose a secure password, confirm it, and submit the registration form. Your unique Student ID will be generated automatically.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-[#003153] text-white text-xs font-bold">Step 4</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Access Student Portal</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Log in to access your live Zoom class links, video tutorial recordings, term marks, and upload monthly bank fee slips for approval.
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="p-4 rounded-xl bg-[#003153] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold">Ready to Register as a Student?</h4>
                <p className="text-xs text-blue-100">Create your account in under 2 minutes and start learning.</p>
              </div>
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-lg bg-white text-[#003153] font-bold text-xs hover:bg-blue-50 transition-all shadow flex items-center gap-2 whitespace-nowrap"
              >
                <span>Go to Student Registration</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Parent Registration Instructions */}
      {activeTab === 'parent' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#003153] text-white flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Parent Portal Registration & Access</h2>
                <p className="text-xs text-slate-500">How parents can access child academic progress, marks, and payment records.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Step 1 */}
              <div className="p-5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-[#003153] text-white text-xs font-bold">Step 1</span>
                  <GraduationCap className="w-5 h-5 text-[#003153]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Get Your Child's Student ID (STU-ID)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ask your registered child for their unique <strong>Student ID</strong> (e.g., <em>STU-2026-001</em>) available in their profile or registered profile slip.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-[#003153] text-white text-xs font-bold">Step 2</span>
                  <Users className="w-5 h-5 text-[#003153]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Select Parent Portal Login</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Go to the <strong>Login Page</strong> and switch the role tab to <strong>Parent View</strong> to access the parent portal login interface.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-[#003153] text-white text-xs font-bold">Step 3</span>
                  <ShieldCheck className="w-5 h-5 text-[#003153]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Link Child Account with Admin / Sir</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If your parent account is not yet linked, provide the Student ID to Sir Parakum Bandara's administration team for automatic account verification and binding.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-[#003153] text-white text-xs font-bold">Step 4</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Track Attendance, Marks & Receipts</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Once logged in, parents can monitor attendance logs, quiz scores, teacher performance notes, and verified monthly fee payments.
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="p-4 rounded-xl bg-[#003153] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold">Access Parent Portal</h4>
                <p className="text-xs text-blue-100">Log in as Parent or view linked student performance.</p>
              </div>
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-lg bg-white text-[#003153] font-bold text-xs hover:bg-blue-50 transition-all shadow flex items-center gap-2 whitespace-nowrap"
              >
                <span>Login to Parent Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Helpful Info Box */}
      <div className="p-6 rounded-2xl bg-[#e6f0f7] border border-[#c0d9ec] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-[#003153] text-white mt-0.5">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Need Registration Assistance?</h4>
            <p className="text-xs text-slate-600 mt-0.5">
              If you have questions regarding your class stream, STU ID, or fee verification, reach out directly to Parakum Bandara, support.
            </p>
          </div>
        </div>
        <a
          href="tel:+94770000000"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#003153] text-white text-xs font-bold hover:bg-[#00223d] transition-all whitespace-nowrap self-stretch sm:self-auto justify-center"
        >
          <PhoneCall className="w-4 h-4 text-blue-200" />
          <span>Contact Support</span>
        </a>
      </div>
    </div>
  );
};

export default HowToRegister;
