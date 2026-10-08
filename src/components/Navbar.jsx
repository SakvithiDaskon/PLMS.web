import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo.jpeg';
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
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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
          {isAuthenticated && showSidebarButton ? (
            /* User Profile Menu (Portal Pages Only) */
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#00223d] hover:bg-[#00192e] border border-[#004575] text-white shadow-sm transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-white text-[#003153] flex items-center justify-center font-bold text-xs shrink-0">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-xs font-bold text-white">
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
            /* Login & Signup Buttons (Home & Public Pages) */
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-all border border-white/20"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#003153] bg-white hover:bg-[#e6f0f7] shadow-md transition-all hover:scale-105"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
