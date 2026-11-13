import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof localStorage === 'undefined') return null;
    const saved = localStorage.getItem('plms_auth_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return null;
  });

  const [token, setToken] = useState(() => {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem('plms_auth_token') || null;
  });

  const [loading, setLoading] = useState(false);

  // Sync token into localStorage
  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    if (token) {
      localStorage.setItem('plms_auth_token', token);
    } else {
      localStorage.removeItem('plms_auth_token');
    }
  }, [token]);

  // Sync user into localStorage
  useEffect(() => {
    if (typeof localStorage === 'undefined') return;
    if (user) {
      localStorage.setItem('plms_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('plms_auth_user');
    }
  }, [user]);

  // Real-Time Database Synchronization on Mount / Page Refresh
  useEffect(() => {
    let isMounted = true;
    const syncCurrentUser = async () => {
      const storedToken = typeof localStorage !== 'undefined' ? localStorage.getItem('plms_auth_token') : null;
      if (!storedToken) return;

      try {
        const res = await apiService.getMe();
        if (isMounted && res && res.success && res.user) {
          setUser(res.user);
          localStorage.setItem('plms_auth_user', JSON.stringify(res.user));
        } else if (isMounted && res && !res.success && res.message?.includes('expired')) {
          // If token expired or account removed
          setUser(null);
          setToken(null);
          localStorage.removeItem('plms_auth_user');
          localStorage.removeItem('plms_auth_token');
        }
      } catch (err) {
        console.warn('Initial session sync failed, using cached session:', err.message);
      }
    };

    syncCurrentUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email, password, role = 'student') => {
    setLoading(true);
    try {
      const res = await apiService.login({ email, password, role });
      if (res && res.success) {
        setUser(res.user);
        setToken(res.token);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('plms_auth_token', res.token);
          localStorage.setItem('plms_auth_user', JSON.stringify(res.user));
        }
        return { success: true, user: res.user, token: res.token };
      }
      return { success: false, message: res?.message || 'Invalid credentials' };
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
      if (res && res.success) {
        setUser(res.user);
        if (res.token) {
          setToken(res.token);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('plms_auth_token', res.token);
            localStorage.setItem('plms_auth_user', JSON.stringify(res.user));
          }
        }
        return { success: true, user: res.user, token: res.token };
      }
      return { success: false, message: res?.message || 'Registration failed' };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Switch role logic
  const switchRole = (newRole, _extraId) => {
    let mockUser;
    if (newRole === 'admin') {
      mockUser = {
        id: 'adm-1',
        userId: 1,
        name: 'Sir Parakum Bandara (Admin)',
        email: 'admin@plms.com',
        role: 'admin',
        phone: '+94 77 000 1122',
        designation: 'Head Educator & Admin'
      };
    } else if (newRole === 'parent') {
      mockUser = {
        id: 'prn-1',
        userId: 2,
        name: 'Sunil Perera',
        email: 'parent@plms.com',
        role: 'parent',
        phone: '+94 70 333 2211',
        occupation: 'Civil Engineer',
        linkedStudentIds: ['std-1']
      };
    } else {
      mockUser = {
        id: 'std-23',
        userId: 26,
        name: 'Ann',
        email: 'ann@gmail.com',
        role: 'student',
        phone: '+94 77 123 4567',
        grade: 'Grade 6 Mathematics',
        studentId: '0005',
        indexNo: '0005',
        enrollmentStatus: 'Currently Enrolled',
        subject: 'Mathematics'
      };
    }
    setUser(mockUser);
    setToken(`demo-token-${newRole}`);
  };

  // Switch active student
  const switchStudent = (studentId) => {
    if (user && user.role === 'student' && (user.id === studentId || user.studentId === studentId)) {
      return;
    }
    apiService.getStudentById(studentId).then((found) => {
      if (found) {
        setUser(found);
        setToken(`plms-token-${found.userId || found.id}-${Date.now()}`);
      }
    });
  };

  // Real-time Update Current Student Profile & Database Sync
  const updateProfile = async (formData) => {
    setLoading(true);
    try {
      const activeId = user?.userId || user?.id || 'me';
      const res = await apiService.updateStudentProfile(activeId, formData);
      if (res && res.success) {
        const updatedUser = {
          ...user,
          ...formData,
          ...(res.student || res.user || {})
        };
        setUser(updatedUser);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('plms_auth_user', JSON.stringify(updatedUser));
        }
        return { success: true, user: updatedUser };
      }
      return { success: false, message: res?.message || 'Update failed' };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('plms_auth_user');
      localStorage.removeItem('plms_auth_token');
    }
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
        switchRole,
        switchStudent,
        updateProfile
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
