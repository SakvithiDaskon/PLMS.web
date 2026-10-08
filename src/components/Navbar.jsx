import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import studentBoyClipArt from '../assets/student_boy_clipart.png';
import studentGirlClipArt from '../assets/student_girl_clipart.png';
import {
  LogOut,
  User,
  ShieldCheck,
  Users,
  UserCheck,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

export const Navbar = ({ toggleSidebar, isSidebarOpen, showSidebarButton = true }) => {
  const { user, isAuthenticated, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // ============================================================
  // UPDATED TODAY - STUDENT NAVIGATION CONDITIONAL
  // Hide the Student View / Role switcher button on student pages
  // ============================================================
  const isStudentPage = location.pathname.startsWith('/student') || user?.role === 'student';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return { label: 'Sir / Admin', icon: ShieldCheck };
      case 'parent':
        return { label: 'Parent View', icon: Users };
      case 'student':
      default:
        return { label: 'Student View', icon: UserCheck };
    }
  };

  const currentRoleInfo = getRoleBadge(user?.role);
  const RoleIcon = currentRoleInfo.icon;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#003153] text-white shadow-md border-b border-[#00223d]">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand & Mobile Menu */}
        <div className="flex items-center gap-3">
          {isAuthenticated && showSidebarButton && (
            <button
              onClick={toggleSidebar}
              className="p-2 text-white hover:bg-[#00223d] rounded-lg transition-colors lg:hidden"
              aria-label="Toggle Navigation"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-bold shadow overflow-hidden border border-white/20">
              <img src={logoImg} alt="PLMS Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                PLMS
              </span>
            </div>
          </Link>
        </div>

        {/* Right Action Menu */}
        <div className="flex items-center gap-3">
          {/* Role Switcher Pill (Hidden on student page) */}
          {isAuthenticated && !isStudentPage && (
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#00223d] text-white border border-[#004575] text-xs font-bold shadow-sm transition-all hover:bg-[#00192e]"
              >
                <RoleIcon className="w-4 h-4" />
                <span>{currentRoleInfo.label}</span>
                <ChevronDown className="w-3 h-3 opacity-90" />
              </button>

              {showRoleMenu && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-xl bg-white text-slate-900 border border-blue-100 shadow-2xl py-2 z-50"
                  onMouseLeave={() => setShowRoleMenu(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold text-[#003153] uppercase tracking-wider border-b border-blue-50">
                    Switch Role
                  </div>

                  {/* ===== ADDED TODAY: Dynamic Multi-Student Role Switcher ===== */}
                  <div className="space-y-0.5">
                    <button
                      onClick={() => {
                        switchRole('student', 'std-1');
                        setShowRoleMenu(false);
                        navigate('/student');
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#e6f0f7] font-semibold ${
                        user?.role === 'student' && user?.id === 'std-1' ? 'text-[#003153] bg-[#e6f0f7] font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <UserCheck className="w-3.5 h-3.5 text-[#003153]" />
                        <span>Kasun (Grade 11)</span>
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        switchRole('student', 'std-2');
                        setShowRoleMenu(false);
                        navigate('/student');
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#e6f0f7] font-semibold ${
                        user?.role === 'student' && user?.id === 'std-2' ? 'text-[#003153] bg-[#e6f0f7] font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <UserCheck className="w-3.5 h-3.5 text-[#003153]" />
                        <span>Nipuni (Grade 10)</span>
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        switchRole('student', 'std-3');
                        setShowRoleMenu(false);
                        navigate('/student');
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#e6f0f7] font-semibold ${
                        user?.role === 'student' && user?.id === 'std-3' ? 'text-[#003153] bg-[#e6f0f7] font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <UserCheck className="w-3.5 h-3.5 text-[#003153]" />
                        <span>Dilshan (Grade 9)</span>
                      </span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-[#e6f0f7] font-semibold ${
                      user?.role === 'parent' ? 'text-[#003153] bg-[#e6f0f7] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <Users className="w-4 h-4 text-[#003153]" /> Parent View
                  </button>

                  <button
                    onClick={() => {
                      switchRole('admin');
                      setShowRoleMenu(false);
                      navigate('/admin');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-[#e6f0f7] font-semibold ${
                      user?.role === 'admin' ? 'text-[#003153] bg-[#e6f0f7] font-bold' : 'text-slate-700'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-[#003153]" /> Sir / Admin View
                  </button>
                </div>
              )}
            </div>
          )}

          {/* User Account Menu */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00223d] hover:bg-[#00192e] border border-[#004575] text-white transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#003153] border border-blue-300/40 text-white flex items-center justify-center font-bold text-xs overflow-hidden shrink-0">
                  {user?.avatar && user.avatar !== 'initials' ? (
                    <img src={user.avatar} alt={user?.name} className="w-full h-full object-cover" />
                  ) : user?.avatar === 'initials' ? (
                    user?.name ? user.name.charAt(0).toUpperCase() : 'U'
                  ) : (
                    <img
                      src={/(ini|ani|athi|sha|ali|uni|uri|adi|ushi|ari|ika)$/i.test(((user?.name || '').trim().split(' ')[0])) || ['nipuni', 'amali', 'sanduni', 'kavindi', 'chamari', 'hiruni', 'ananya', 'priya'].includes(((user?.name || '').trim().toLowerCase().split(' ')[0])) ? studentGirlClipArt : studentBoyClipArt}
                      alt={user?.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <span className="hidden md:inline-block text-xs font-bold text-white">
                  {user?.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-blue-200" />
              </button>

              {showProfileMenu && (
                <div
                  className="absolute right-0 mt-2 w-52 rounded-xl bg-white text-slate-900 border border-blue-100 shadow-2xl py-2 z-50"
                  onMouseLeave={() => setShowProfileMenu(false)}
                >
                  <div className="px-4 py-2 border-b border-blue-50">
                    <p className="text-xs font-bold text-slate-900">{user?.name}</p>
                    <p className="text-[11px] text-[#003153] font-medium truncate">{user?.email}</p>
                  </div>

                  {user?.role === 'student' && (
                    <Link
                      to="/student/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-[#e6f0f7] flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-[#003153]" /> My Profile
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-slate-100"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-xs font-bold text-white hover:text-blue-100 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-xs font-bold text-[#003153] bg-white hover:bg-blue-50 rounded-lg shadow transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
