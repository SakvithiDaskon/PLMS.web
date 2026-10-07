import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  IdCard,
  CheckCircle2
} from 'lucide-react';

export const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedRole, setSelectedRole] = useState('student');
  const [identifier, setIdentifier] = useState(location.state?.studentId || '');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successNotice, setSuccessNotice] = useState(location.state?.message || '');

  const handleRoleTabChange = (role) => {
    setSelectedRole(role);
    setErrorMsg('');
    if (role === 'admin') {
      setIdentifier('admin@plms.com');
      setPassword('password123');
    } else if (role === 'student') {
      setIdentifier(location.state?.studentId || '');
      setPassword('');
    } else {
      setIdentifier('');
      setPassword('');
    }
  };

  const handleQuickAdmin = () => {
    setSelectedRole('admin');
    setIdentifier('admin@plms.com');
    setPassword('password123');
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = await login(identifier, password, selectedRole);
    if (res.success) {
      if (res.user.role === 'admin') navigate('/admin');
      else if (res.user.role === 'parent') navigate('/parent');
      else navigate('/student');
    } else {
      setErrorMsg(res.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#003153] shadow-md text-white mb-2">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Sign In to PLMS</h1>
        <p className="text-xs sm:text-sm text-slate-600">Enter your credentials to access your portal</p>
      </div>

      {/* Role Switcher Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-xl bg-[#e6f0f7] border border-[#c0d9ec]">
        <button
          type="button"
          onClick={() => handleRoleTabChange('student')}
          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            selectedRole === 'student'
              ? 'bg-[#003153] text-white shadow'
              : 'text-slate-700 hover:bg-[#c0d9ec]'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Student</span>
        </button>

        <button
          type="button"
          onClick={() => handleRoleTabChange('parent')}
          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            selectedRole === 'parent'
              ? 'bg-[#003153] text-white shadow'
              : 'text-slate-700 hover:bg-[#c0d9ec]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Parent</span>
        </button>

        <button
          type="button"
          onClick={() => handleRoleTabChange('admin')}
          className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            selectedRole === 'admin'
              ? 'bg-[#003153] text-white shadow'
              : 'text-slate-700 hover:bg-[#c0d9ec]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Sir / Admin</span>
        </button>
      </div>

      {/* Form Card */}
      <div className="p-6 rounded-2xl bg-white border border-[#c0d9ec] shadow-lg space-y-6">
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#003153] focus:bg-white font-mono"
              />
            </div>
            {selectedRole === 'student' && (
              <p className="text-[11px] text-slate-500 mt-1">
                Enter your 4-digit Student ID (e.g., <strong className="text-[#003153]">0001</strong>, <strong className="text-[#003153]">0002</strong>) received during registration.
              </p>
            )}
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
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f4f8fb] border border-[#c0d9ec] text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#003153] focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-extrabold text-xs text-white bg-[#003153] hover:bg-[#00223d] shadow-md transition-all flex items-center justify-center gap-2"
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
              className="px-3 py-1.5 text-[11px] font-bold rounded-lg bg-[#e6f0f7] text-[#003153] border border-[#b0d1e8] hover:bg-blue-100 transition-colors"
            >
              Fill Sir / Admin Credentials
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-slate-600">
        New Student?{' '}
        <Link to="/register" className="font-bold text-[#003153] hover:underline">
          Create Student Account (ID starts from 0001)
        </Link>
      </p>
    </div>
  );
};

export default Login;
