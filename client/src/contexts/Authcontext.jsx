import React, { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';

/**
 * Authentication Context
 * Provides authentication state and methods throughout the app
 */
const AuthContext = createContext(undefined);

/**
 * AuthProvider component
 * Wraps the app and provides auth state
 */
export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use the auth context
 * @throws {Error} if used outside of AuthProvider
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;
