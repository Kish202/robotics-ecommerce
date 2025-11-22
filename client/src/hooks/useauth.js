import { useState, useEffect } from 'react';
import { useLocalStorage } from './uselocalstorage';

/**
 * Custom hook for managing authentication
 * Currently uses mock authentication - replace with real auth when backend is ready
 */
export const useAuth = () => {
  const [user, setUser] = useLocalStorage('user', null);
  const [token, setToken] = useLocalStorage('authToken', null);
  const [loading, setLoading] = useState(false);

  // Check if user is authenticated
  const isAuthenticated = !!token && !!user;

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  // Login function (mock)
  const login = async (credentials) => {
    setLoading(true);
    
    try {
      // Mock login - replace with actual API call
      // const response = await api.auth.login(credentials);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful login
      const mockUser = {
        id: 1,
        name: 'Admin User',
        email: credentials.email,
        role: 'admin',
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      setUser(mockUser);
      setToken(mockToken);

      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  // Register function (mock)
  const register = async (userData) => {
    setLoading(true);

    try {
      // Mock register - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = {
        id: Date.now(),
        ...userData,
        role: 'user',
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      setUser(mockUser);
      setToken(mockToken);

      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    setLoading(true);

    try {
      // Mock update - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);

      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    loading,
    login,
    logout,
    register,
    updateProfile,
  };
};

export default useAuth;
