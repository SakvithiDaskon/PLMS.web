import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.jpeg';

import {
  ArrowRight,
  AlertCircle,
  IdCard,
  CheckCircle2,
  LogIn
} from 'lucide-react';

export const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: 'Grade 11 (O/L Mathematics)',
    password: '',
    confirmPassword: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [registeredStudent, setRegisteredStudent] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    const res = await register(formData);

    if (res.success) {
      setRegisteredStudent(res.user);
    } else {
      setErrorMsg(res.message || 'Registration failed');
    }
  };

  // Success view
  if (registeredStudent) {
    return (
      <div className="max-w-md mx-auto py-10 space-y-6">
        <div className="p-8 rounded-2xl bg-white border border-[#c0d9ec] shadow-xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-slate-900">Registration Complete!</h1>
            <p className="text-xs text-slate-600">
              Welcome to Sir Parakum Bandara's PLMS classes, <strong>{registeredStudent.name}</strong>.
            </p>
          </div>

          {/* Student ID */}
          <div className="p-5 rounded-2xl bg-[#f4f8fb] border-2 border-[#003153]/20 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#003153] text-white text-[11px] font-bold">
              <IdCard className="w-3.5 h-3.5" />
              <span>Official Student ID</span>
            </div>

            <div className="text-4xl font-extrabold font-mono text-[#003153] tracking-wider py-1">
              {registeredStudent.studentId}
            </div>

            <p className="text-xs text-slate-600 font-medium">
              Please take note of your <strong>Student ID: {registeredStudent.studentId}</strong>.
              You will enter this ID instead of an email address on the Sign In page.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() =>
                navigate('/login', {
                  state: {
                    studentId: registeredStudent.studentId,
                    message: `Registration successful! Your Student ID is ${registeredStudent.studentId}.`
                  }
                })
              }
              className="w-full py-3.5 rounded-xl font-extrabold text-xs text-white bg-[#003153] hover:bg-[#00223d] shadow-md transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Go to Sign In (Enter Student ID)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/student')}
              className="w-full py-2.5 rounded-xl font-bold text-xs text-[#003153] hover:bg-[#e6f0f7] transition-all"
            >
              Continue directly to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-8 space-y-6">

      {/* Page Header */}
      <div className="text-center space-y-2">

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md mb-1 overflow-hidden border border-slate-700">
          <img
            src={logoImg}
            alt="PLMS Logo"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Student Registration
        </h1>

        <p className="text-xs sm:text-sm text-slate-600">
          Grade 6 to 11 Mathematics Classes conducted by Sir Parakum Bandara
        </p>

      </div>

      {/* Registration Form Card */}
      <div className="p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-xl space-y-6">

        {/* Error Message */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs focus:outline-none focus:border-[#003153]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="student@domain.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs focus:outline-none focus:border-[#003153]"
              />
            </div>

          </div>

          {/* Phone and Grade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Contact Number (WhatsApp)
              </label>

              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+94 77 123 4567"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs focus:outline-none focus:border-[#003153]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Enrolled Grade
              </label>

              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs font-semibold focus:outline-none focus:border-[#003153]"
              >
                <option value="Grade 11 (O/L Mathematics)">
                  Grade 11 (O/L Mathematics)
                </option>

                <option value="Grade 10 Mathematics">
                  Grade 10 Mathematics
                </option>

                <option value="Grade 9 Mathematics">
                  Grade 9 Mathematics
                </option>

                <option value="Grade 8 Mathematics">
                  Grade 8 Mathematics
                </option>

                <option value="Grade 7 Mathematics">
                  Grade 7 Mathematics
                </option>

                <option value="Grade 6 Mathematics">
                  Grade 6 Mathematics
                </option>
              </select>
            </div>

          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>

              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs focus:outline-none focus:border-[#003153]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs focus:outline-none focus:border-[#003153]"
              />
            </div>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 rounded-xl font-extrabold text-xs text-white bg-[#003153] hover:bg-[#00223d] shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>
      </div>

      {/* Login Link */}
      <p className="text-center text-xs text-slate-600">
        Already registered?{' '}
        <Link
          to="/login"
          className="font-bold text-[#003153] hover:underline"
        >
          Sign In Here
        </Link>
      </p>

    </div>
  );
};

export default Register;