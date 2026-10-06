import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  User,
  Video,
  PlaySquare,
  BookOpen,
  FileQuestion,
  Award,
  CreditCard,
  Users,
  UserPlus,
  Radio,
  CheckSquare,
  FilePlus,
  Home,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const role = user?.role || 'student';

  // Student Navigation Items
  const studentNav = [
    { label: 'Dashboard', path: '/student', icon: LayoutDashboard },
    { label: 'My Profile', path: '/student/profile', icon: User },
    { label: 'Zoom Classes', path: '/student/zoom', icon: Video, badge: 'Live' },
    { label: 'Class Recordings', path: '/student/recordings', icon: PlaySquare },
    { label: 'Tutorial Modules', path: '/student/tutorials', icon: BookOpen },
    { label: 'Quizzes & Tests', path: '/student/quizzes', icon: FileQuestion },
    { label: 'Grades & Results', path: '/student/grades', icon: Award },
    { label: 'Payments & Slips', path: '/student/payments', icon: CreditCard }
  ];

  // Admin Navigation Items (Zoom Schedules is NOW ACTIVE)
  const adminNav = [
    { label: 'Admin Dashboard', path: '/admin', icon: LayoutDashboard, active: true },
    { label: 'Student Mgmt', path: '/admin/students', icon: Users, active: true },
    { label: 'Parent Mgmt', path: '#', icon: UserPlus, active: false },
    { label: 'Zoom Schedules', path: '/admin/zoom', icon: Radio, active: true, badge: 'Live' },
    { label: 'Recording Uploads', path: '/admin/recordings', icon: PlaySquare, active: true },
    { label: 'Tutorial Creator', path: '#', icon: BookOpen, active: false },
    { label: 'Quiz Builder', path: '#', icon: FilePlus, active: false },
    { label: 'Grade Mgmt', path: '/admin/grades', icon: Award, active: true },
    { label: 'Payment Verification', path: '#', icon: CheckSquare, active: false }
  ];

  const navItems = role === 'admin' ? adminNav : studentNav;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-[#003153]/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-30 w-64 bg-white border-r border-[#c0d9ec] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        } flex flex-col justify-between overflow-y-auto`}
      >
        <div className="p-4 space-y-6">
          {/* User Role Card */}
          <div className="p-3.5 rounded-xl bg-[#e6f0f7] border border-[#b0d1e8] flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#003153] text-white flex items-center justify-center font-bold shadow">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">{user?.name}</p>
              <p className="text-[10px] text-[#003153] font-extrabold uppercase tracking-wider">
                {role} Portal
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            <p className="px-3 text-[10px] font-bold text-[#003153] uppercase tracking-widest mb-2">
              System Menu
            </p>

            {navItems.map((item, idx) => {
              const Icon = item.icon;

              // Non-navigating option
              if (item.active === false) {
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => e.preventDefault()}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-[#003153] hover:bg-[#e6f0f7] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              }

              // Active route link
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#003153] text-white shadow-md font-bold'
                        : 'text-slate-700 hover:text-[#003153] hover:bg-[#e6f0f7]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded bg-emerald-600 text-white shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100">
          <NavLink
            to="/"
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:text-[#003153] hover:bg-[#e6f0f7] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4 text-[#003153]" />
              <span>Public Landing</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
