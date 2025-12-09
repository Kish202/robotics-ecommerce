import { useState, useEffect } from 'react';
import { useLocalStorage } from './uselocalstorage';
import api from '../services/api';

/**
 * Custom hook for managing authentication
 * Connected to RoboTech backend API
 */
export const useAuth = () => {
  const [user, setUser] = useLocalStorage('admin', null);
  const [token, setToken] = useLocalStorage('token', null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is authenticated
  const isAuthenticated = !!token && !!user;

  // Check if user is admin
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  // Check if user is superadmin
  const isSuperAdmin = user?.role === 'superadmin';

  // Login function - calls real backend
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.auth.login(email, password);

      if (response.success) {
        setUser(response.admin);
        setToken(response.token);

        // LocalStorage handled by hook

        return { success: true, user: response.admin };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
  };

  // Register function - calls real backend
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.auth.register(userData);

      if (response.success) {
        setUser(response.admin);
        setToken(response.token);

        // LocalStorage handled by hook

        return { success: true, user: response.admin };
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.auth.updateProfile(updates);

      if (response.success) {
        setUser(response.data);
        // LocalStorage handled by hook

        return { success: true, user: response.data };
      } else {
        throw new Error(response.message || 'Update failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Update failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.auth.changePassword(currentPassword, newPassword);

      if (response.success) {
        // Update token if backend returns new one
        if (response.token) {
          setToken(response.token);
          // LocalStorage handled by hook
        }

        return { success: true, message: response.message };
      } else {
        throw new Error(response.message || 'Password change failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Password change failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Get current user from backend (verify token)
  const refreshUser = async () => {
    if (!token) return;

    setLoading(true);

    try {
      const response = await api.auth.getMe();

      if (response.success) {
        setUser(response.data);
        // LocalStorage handled by hook
      }
    } catch (error) {
      // Token invalid or expired
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Verify token on mount and restore session
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('admin');

        if (storedToken && storedUser) {
          // Parse values (handle potential JSON strings from useLocalStorage)
          let parsedToken = storedToken;
          let parsedUser = null;

          try {
            parsedToken = JSON.parse(storedToken);
            parsedUser = JSON.parse(storedUser);
          } catch (e) {
            // If parsing fails, use as is (legacy/raw string)
            console.warn('Error parsing stored auth data:', e);
          }

          if (parsedToken && parsedUser) {
            setUser(parsedUser);
            setToken(parsedToken);

            // Verify token validity
            try {
              const response = await api.auth.getMe();
              if (response.success) {
                setUser(response.data);
              } else {
                logout();
              }
            } catch (error) {
              console.error('Token verification failed:', error);
              logout();
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);


  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    isSuperAdmin,
    loading,
    error,
    login,
    logout,
    register,
    updateProfile,
    changePassword,
    refreshUser,
  };
};

export default useAuth;
