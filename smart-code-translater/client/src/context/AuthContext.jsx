import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { authService } from '../services/authService.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Load user on refresh
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);

  // ✅ LOGIN (REAL BACKEND)
  // LOGIN
const login = async (email, password) => {
  try {
    const res = await authService.login({ email, password });

    const { user, token } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);

    toast.success("Login success 🚀");
    return { success: true };

  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed");
    return { success: false };
  }
};

// REGISTER
const register = async (username, email, password) => {
  try {
    const res = await authService.register({
      username,
      email,
      password,
    });

    const { user, token } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);

    toast.success("Signup success 🎉");
    return { success: true };

  } catch (err) {
    toast.error(err.response?.data?.message || "Signup failed");
    return { success: false };
  }
};
  // ✅ GOOGLE LOGIN (TEMP FRONTEND ONLY)
  const googleLogin = (googleData) => {
    const mockUser = {
      id: 2,
      email: "googleuser@gmail.com",
      username: "GoogleUser"
    };

    localStorage.setItem('token', 'google-token');
    localStorage.setItem('user', JSON.stringify(mockUser));

    setUser(mockUser);

    toast.success('Google login success 🚀');
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out');
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('token');
  };

  const value = {
    user,
    loading,
    login,
    register,
    googleLogin,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};