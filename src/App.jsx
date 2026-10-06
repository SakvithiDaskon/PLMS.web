import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ResetPassword from './pages/public/ResetPassword';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import Profile from './pages/student/Profile';
import ZoomLinks from './pages/student/ZoomLinks';
import ClassRecordings from './pages/student/ClassRecordings';
import Tutorials from './pages/student/Tutorials';
import Quizzes from './pages/student/Quizzes';
import Grades from './pages/student/Grades';
import Payments from './pages/student/Payments';

// Parent Pages
import ParentDashboard from './pages/parent/ParentDashboard';
import ChildDetails from './pages/parent/ChildDetails';
import ChildProgress from './pages/parent/ChildProgress';
import ChildGrades from './pages/parent/ChildGrades';
import ChildPayments from './pages/parent/ChildPayments';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentManagement from './pages/admin/StudentManagement';
import ParentManagement from './pages/admin/ParentManagement';
import ZoomManagement from './pages/admin/ZoomManagement';
import RecordingManagement from './pages/admin/RecordingManagement';
import TutorialManagement from './pages/admin/TutorialManagement';
import QuizManagement from './pages/admin/QuizManagement';
import GradeManagement from './pages/admin/GradeManagement';
import PaymentManagement from './pages/admin/PaymentManagement';

export const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-blue-50/60 text-slate-900 flex flex-col font-sans">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="flex-1 flex">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-64 max-w-7xl mx-auto w-full transition-all">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Student Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={['student', 'admin']} />}>
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/profile" element={<Profile />} />
              <Route path="/student/zoom" element={<ZoomLinks />} />
              <Route path="/student/recordings" element={<ClassRecordings />} />
              <Route path="/student/tutorials" element={<Tutorials />} />
              <Route path="/student/quizzes" element={<Quizzes />} />
              <Route path="/student/grades" element={<Grades />} />
              <Route path="/student/payments" element={<Payments />} />
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
              <Route path="/admin/students" element={<StudentManagement />} />
              <Route path="/admin/parents" element={<ParentManagement />} />
              <Route path="/admin/zoom" element={<ZoomManagement />} />
              <Route path="/admin/recordings" element={<RecordingManagement />} />
              <Route path="/admin/tutorials" element={<TutorialManagement />} />
              <Route path="/admin/quizzes" element={<QuizManagement />} />
              <Route path="/admin/grades" element={<GradeManagement />} />
              <Route path="/admin/payments" element={<PaymentManagement />} />
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
