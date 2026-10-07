import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('plms_auth_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    // Default demo user (Student)
    return {
      id: 'std-1',
      name: 'Kasun Perera',
      email: 'student@plms.com',
      role: 'student',
      phone: '+94 77 123 4567',
      grade: 'Grade 11 (O/L Mathematics)',
      studentId: 'STU-2026-889',
      indexNo: 'STU-2026-889'
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem('plms_auth_token') || 'demo-token-123');
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

  const login = async (email, password, role = 'student') => {
    setLoading(true);
    try {
      const res = await apiService.login({ email, password, role });
      if (res.success) {
        setUser(res.user);
        setToken(res.token);
        return { success: true, user: res.user };
      }
      return { success: false, message: 'Invalid credentials' };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const res = await apiService.registerStudent(formData);
      if (res.success) {
        setUser(res.user);
        setToken('mock-jwt-register-token');
        return { success: true, user: res.user };
      }
      return { success: false, message: 'Registration failed' };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const switchRole = (newRole) => {
    let mockUser;
    if (newRole === 'admin') {
      mockUser = {
        id: 'adm-1',
        name: 'Sir Daskon (Admin)',
        email: 'admin@plms.com',
        role: 'admin',
        phone: '+94 77 000 1122',
        designation: 'Head Educator & Admin'
      };
    } else if (newRole === 'parent') {
      mockUser = {
        id: 'prn-1',
        name: 'Sunil Perera',
        email: 'parent@plms.com',
        role: 'parent',
        phone: '+94 70 333 2211',
        occupation: 'Civil Engineer',
        linkedStudentIds: ['std-1']
      };
    } else {
      mockUser = {
        id: 'std-1',
        name: 'Kasun Perera',
        email: 'student@plms.com',
        role: 'student',
        phone: '+94 77 123 4567',
        grade: 'Grade 11 (O/L Mathematics)',
        studentId: 'STU-2026-889',
        indexNo: 'STU-2026-889'
      };
    }
    setUser(mockUser);
    setToken(`demo-token-${newRole}`);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
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
