import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('plms_auth_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Clear legacy sample user
        if (
          parsed?.email === 'student@plms.com' ||
          parsed?.name === 'Kasun Perera' ||
          parsed?.email === 'nipuni@plms.com' ||
          parsed?.email === 'dilshan@plms.com' ||
          parsed?.email === 'parent@plms.com'
        ) {
          localStorage.removeItem('plms_auth_user');
          localStorage.removeItem('plms_auth_token');
          return null;
        }
        return parsed;
      } catch (e) {}
    }
    // Default unauthenticated
    return null;
  });

  const [token, setToken] = useState(() => {
    const savedUser = localStorage.getItem('plms_auth_user');
    if (!savedUser) return null;
    return localStorage.getItem('plms_auth_token') || null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('plms_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('plms_auth_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('plms_auth_token', token);
    } else {
      localStorage.removeItem('plms_auth_token');
    }
  }, [token]);

  const login = async (identifier, password, role = 'student') => {
    setLoading(true);
    try {
      const res = await apiService.login({ identifier, password, role });
      if (res.success) {
        setUser(res.user);
        setToken(res.token);
        return { success: true, user: res.user };
      }
      return { success: false, message: res.message || 'Invalid credentials' };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData, shouldAutoLogin = false) => {
    setLoading(true);
    try {
      const res = await apiService.registerStudent(formData);
      if (res.success) {
        if (shouldAutoLogin) {
          setUser(res.user);
          setToken(res.token || 'plms-token-' + res.user.id);
        }
        return { success: true, user: res.user };
      }
      return { success: false, message: res.message || 'Registration failed' };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const switchRole = async (newRole) => {
    if (newRole === 'admin') {
      const adminUser = {
        id: 'adm-1',
        name: 'Sir Parakum Bandara (Admin)',
        email: 'admin@plms.com',
        role: 'admin',
        phone: '+94 77 000 1122',
        designation: 'Head Educator & Admin'
      };
      setUser(adminUser);
      setToken('demo-token-admin');
    } else if (newRole === 'student') {
      const students = await apiService.getAllStudents();
      if (students.length > 0) {
        setUser(students[0]);
        setToken('plms-token-' + students[0].id);
      }
    } else if (newRole === 'parent') {
      const parents = await apiService.getAllParents();
      if (parents.length > 0) {
        setUser(parents[0]);
        setToken('plms-token-' + parents[0].id);
      }
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('plms_auth_user');
    localStorage.removeItem('plms_auth_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
