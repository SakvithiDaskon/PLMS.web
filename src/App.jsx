import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ResetPassword from './pages/public/ResetPassword';
import HowToRegister from './pages/public/HowToRegister';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import Profile from './pages/student/Profile';
import ZoomLinks from './pages/student/ZoomLinks';

// Parent Pages
import ParentDashboard from './pages/parent/ParentDashboard';
import ChildDetails from './pages/parent/ChildDetails';
import ChildProgress from './pages/parent/ChildProgress';
import ChildGrades from './pages/parent/ChildGrades';
import ChildPayments from './pages/parent/ChildPayments';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentManagement from './pages/admin/StudentManagement';
import ZoomManagement from './pages/admin/ZoomManagement';
import GradeManagement from './pages/admin/GradeManagement';
import GradeView from './pages/admin/GradeView';

export const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isPortalRoute = location.pathname.startsWith('/student') ||
                        location.pathname.startsWith('/parent') ||
                        location.pathname.startsWith('/admin');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-blue-50/60 text-slate-900 flex flex-col font-sans">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} showSidebarButton={isPortalRoute} />

      <div className="flex-1 flex">
        {isPortalRoute && <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />}

        <main className={`flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full transition-all ${isPortalRoute ? 'lg:ml-64' : ''}`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/how-to-register" element={<HowToRegister />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* ============================================================ */}
            {/* UPDATED TODAY - STUDENT PROTECTED ROUTES                      */}
            {/* Streamlined routes for Student Portal (Dashboard, Profile, Zoom) */}
            {/* ============================================================ */}
            <Route element={<ProtectedRoute allowedRoles={['student', 'admin']} />}>
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/profile" element={<Profile />} />
              <Route path="/student/zoom" element={<ZoomLinks />} />
            </Route>

            {/* Parent Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['parent', 'admin']} />}>
              <Route path="/parent" element={<ParentDashboard />} />
              <Route path="/parent/child-details" element={<ChildDetails />} />
              <Route path="/parent/child-progress" element={<ChildProgress />} />
              <Route path="/parent/child-grades" element={<ChildGrades />} />
              <Route path="/parent/child-payments" element={<ChildPayments />} />
            </Route>

            {/* Admin Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/zoom" element={<ZoomManagement />} />
              <Route path="/admin/students" element={<StudentManagement />} />
              <Route path="/admin/grades" element={<GradeManagement />} />
              <Route path="/admin/grade/:gradeId" element={<GradeView />} />
            </Route>

            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
