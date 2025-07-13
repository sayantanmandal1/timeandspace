import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockAuthService } from '../services/mockAuthService';
import { NotificationContext } from '../components/NotificationToast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const useNotificationSafe = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    // Return fallback functions if notification context is not available
    return {
      success: (message) => console.log('Success:', message),
      error: (message) => console.error('Error:', message),
      info: (message) => console.log('Info:', message),
      warning: (message) => console.warn('Warning:', message),
    };
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Use the safe notification hook
  const { success, error: showError, info } = useNotificationSafe();

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (err) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      
      const data = await mockAuthService.login(email, password);
      
      // Store token and user data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      
      setUser(data.user);
      setIsAuthenticated(true);
      success('Login successful!');
      
      return { success: true };
    } catch (err) {
      showError(err.message || 'Login failed. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [success, showError]);

  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      
      const data = await mockAuthService.register(userData);
      
      // Store token and user data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      
      setUser(data.user);
      setIsAuthenticated(true);
      success('Registration successful! Welcome to DSA Visualizer Pro!');
      
      return { success: true };
    } catch (err) {
      showError(err.message || 'Registration failed. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [success, showError]);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
    info('Logged out successfully');
  }, [info]);

  const updateProfile = useCallback(async (profileData) => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('authToken');
      const data = await mockAuthService.updateProfile(token, profileData);
      
      // Update stored user data
      localStorage.setItem('userData', JSON.stringify(data.user));
      setUser(data.user);
      success('Profile updated successfully!');
      
      return { success: true };
    } catch (err) {
      showError(err.message || 'Profile update failed. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [success, showError]);

  const changePassword = useCallback(async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('authToken');
      await mockAuthService.changePassword(token, currentPassword, newPassword);

      success('Password changed successfully!');
      return { success: true };
    } catch (err) {
      showError(err.message || 'Password change failed. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [success, showError]);

  const forgotPassword = useCallback(async (email) => {
    try {
      setLoading(true);
      
      await mockAuthService.forgotPassword(email);

      success('Password reset email sent! Check your inbox.');
      return { success: true };
    } catch (err) {
      showError(err.message || 'Password reset request failed. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [success, showError]);

  const resetPassword = useCallback(async (token, newPassword) => {
    try {
      setLoading(true);
      
      await mockAuthService.resetPassword(token, newPassword);

      success('Password reset successfully! You can now login with your new password.');
      return { success: true };
    } catch (err) {
      showError(err.message || 'Password reset failed. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [success, showError]);

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 