import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  User,
  Video,
  PlaySquare,
  BookOpen,
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

  // ============================================================
  // UPDATED TODAY - STUDENT NAVIGATION ITEMS
  // Cleaned up student portal menu items (retained Dashboard, Profile, Zoom Classes)
  // ============================================================
  const studentNav = [
    { label: 'Dashboard', path: '/student', icon: LayoutDashboard },
    { label: 'My Profile', path: '/student/profile', icon: User },
    { label: 'Zoom Classes', path: '/student/zoom', icon: Video, badge: 'Live' }
  ];

  // Parent Navigation Items
  const parentNav = [
    { label: 'Parent Dashboard', path: '/parent', icon: LayoutDashboard },
    { label: 'Child Details', path: '/parent/child-details', icon: User },
    { label: 'Academic Progress', path: '/parent/child-progress', icon: BookOpen },
    { label: 'Grades & Results', path: '/parent/child-grades', icon: Award },
    { label: 'Payments & Fee Slips', path: '/parent/child-payments', icon: CreditCard }
  ];

  // Admin Navigation Items
  const adminNav = [
    { label: 'Admin Dashboard', path: '/admin', icon: LayoutDashboard, active: true },
    { label: 'Student Mgmt', path: '/admin/students', icon: Users, active: true },
    { label: 'Parent Mgmt', path: '/admin/parents', icon: UserPlus, active: true },
    { label: 'Zoom Schedules', path: '/admin/zoom', icon: Radio, active: true, badge: 'Live' },
    { label: 'Recording Uploads', path: '/admin/recordings', icon: PlaySquare, active: true },
    { label: 'Tutorial Creator', path: '/admin/tutorials', icon: BookOpen, active: true },
    { label: 'Quiz Builder', path: '/admin/quizzes', icon: FilePlus, active: true },
    { label: 'Grade Mgmt', path: '/admin/grades', icon: Award, active: true },
    { label: 'Payment Verification', path: '/admin/payments', icon: CheckSquare, active: true }
  ];

  const navItems = role === 'admin' ? adminNav : (role === 'parent' ? parentNav : studentNav);

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
          <div className="p-3.5 rounded-2xl bg-[#e6f0f7] border border-[#b0d1e8] flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#003153] text-white flex items-center justify-center font-bold shadow shrink-0">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div className="overflow-hidden min-w-0">
              <p className="text-sm font-extrabold text-slate-900 truncate">{user?.name}</p>
              <p className="text-[10px] text-[#003153] font-black uppercase tracking-wider">
                {role} Portal
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            <p className="px-3 text-xs font-black text-[#003153] uppercase tracking-wider mb-2.5">
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
                    className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-extrabold text-slate-700 hover:text-[#003153] hover:bg-[#e6f0f7] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-slate-600" />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              }

              // Active route link with exact matching (end={true})
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={true}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-extrabold transition-all ${
                      isActive
                        ? 'bg-[#003153] text-white shadow-md'
                        : 'text-slate-800 hover:text-[#003153] hover:bg-[#e6f0f7]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded-md bg-[#059669] text-white tracking-wider shadow-xs">
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
