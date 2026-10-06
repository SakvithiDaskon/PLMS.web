import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute guards routes based on user role authorization.
 * @param {Array<string>} allowedRoles - Roles permitted to access the route.
 */
export const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Redirect user to their designated dashboard if unauthorized for this route
    if (user?.role === 'admin') return <Navigate to="/admin" replace />;
    if (user?.role === 'parent') return <Navigate to="/parent" replace />;
    return <Navigate to="/student" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
