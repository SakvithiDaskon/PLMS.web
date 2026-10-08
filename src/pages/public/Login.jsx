import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.jpeg';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  IdCard,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';

export const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('student');
  const [identifier, setIdentifier] = useState(location.state?.studentId || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRoleTabChange = (role) => {
    if (role === 'parent') {
      // Looks completely normal, silently prevents switching role
      return;
    }
    setSelectedRole(role);
    if (role === 'admin') {
      setEmail('admin@plms.com');
    } else {
      setEmail('student@plms.com');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = await login(email, password, selectedRole);
    if (res.success) {
      if (res.user.role === 'admin') navigate('/admin');
      else navigate('/student');
    } else {
      setErrorMsg(res.message || 'Login failed. Please check credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md mb-2 overflow-hidden border border-[#c0d9ec]">
          <img src={logoImg} alt="PLMS Logo" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Sign In to PLMS</h1>
        <p className="text-xs sm:text-sm text-slate-600">Select your role to access your portal</p>
      </div>

      {/* Main Login Card */}
      <div className="rounded-2xl bg-white border border-[#c0d9ec] shadow-xl overflow-hidden transition-all">
        {/* Subtle Accent Line */}
        <div className="h-1 bg-gradient-to-r from-[#003153] via-sky-600 to-[#003153]" />

        <div className="p-6 sm:p-7 space-y-5">
          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-xl bg-[#e6f0f7] border border-[#c0d9ec]">
            <button
              type="button"
              onClick={() => handleRoleTabChange('student')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedRole === 'student'
                  ? 'bg-[#003153] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-[#c0d9ec]'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleTabChange('parent')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedRole === 'parent'
                  ? 'bg-[#003153] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-[#c0d9ec]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Parent</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleTabChange('admin')}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedRole === 'admin'
                  ? 'bg-[#003153] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-[#c0d9ec]'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sir / Admin</span>
            </button>
          </div>

          {/* Notice */}
          {successNotice && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <p>{successNotice}</p>
                <p className="text-[11px] font-normal text-emerald-700 mt-0.5">
                  Your Student ID has been filled in below. Enter your password to continue.
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {selectedRole === 'student' ? 'Student ID' : selectedRole === 'admin' ? 'Admin Email' : 'Student ID or Parent Email'}
              </label>
              <div className="relative">
                {selectedRole === 'student' ? (
                  <IdCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                ) : selectedRole === 'admin' ? (
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                ) : (
                  <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                )}
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (successNotice) setSuccessNotice('');
                  }}
                  placeholder={
                    selectedRole === 'student'
                      ? 'Enter Student ID (e.g. 0001)'
                      : selectedRole === 'admin'
                      ? 'admin@plms.com'
                      : 'Enter Student ID (e.g. 0001) or Email'
                  }
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#003153] focus:ring-2 focus:ring-[#003153]/15 focus:bg-white transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">Password</label>
                <Link to="/reset-password" className="text-[11px] font-semibold text-[#003153] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#003153] focus:ring-2 focus:ring-[#003153]/15 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-extrabold text-xs text-white bg-[#003153] hover:bg-[#00223d] shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Admin quick access */}
          <div className="pt-4 border-t border-slate-100 space-y-2 text-center">
            <p className="text-[11px] font-bold text-[#003153] uppercase tracking-wider">Educator & Admin Access</p>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleQuickAdmin}
                className="px-3 py-1.5 text-[11px] font-bold rounded-lg bg-[#e6f0f7] text-[#003153] border border-[#b0d1e8] hover:bg-blue-100 transition-colors cursor-pointer"
              >
                Fill Sir / Admin Credentials
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-slate-600">
        New Student?{' '}
        <Link to="/register" className="font-bold text-[#003153] hover:underline">
          Create Student Account
        </Link>
      </p>
    </div>
  );
};

export default Login;
