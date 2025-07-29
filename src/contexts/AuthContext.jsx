import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('virtualDoctorUser');
    const savedAuth = localStorage.getItem('virtualDoctorAuth');
    
    if (savedUser && savedAuth === 'true') {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - replace with actual API response
      const userData = {
        id: '1',
        name: email === 'demo@demo.com' ? 'Demo User' : 'John Doe',
        email: email,
        avatar: null,
        memberSince: '2024',
        consultations: Math.floor(Math.random() * 20) + 1,
        role: 'patient'
      };
      
      // Simulate login validation
      if (email === 'demo@demo.com' && password === 'demo123') {
        setUser(userData);
        setIsAuthenticated(true);
        
        // Store in localStorage
        localStorage.setItem('virtualDoctorUser', JSON.stringify(userData));
        localStorage.setItem('virtualDoctorAuth', 'true');
        
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: Date.now().toString(),
        name: name,
        email: email,
        avatar: null,
        memberSince: new Date().getFullYear().toString(),
        consultations: 0,
        role: 'patient'
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      
      // Store in localStorage
      localStorage.setItem('virtualDoctorUser', JSON.stringify(userData));
      localStorage.setItem('virtualDoctorAuth', 'true');
      
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    
    // Clear localStorage
    localStorage.removeItem('virtualDoctorUser');
    localStorage.removeItem('virtualDoctorAuth');
  };

  const updateProfile = async (updatedData) => {
    setIsLoading(true);
    try {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem('virtualDoctorUser', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
