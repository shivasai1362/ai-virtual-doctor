import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Header = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  };

  const handleSignUp = () => {
    setAuthModalTab('register');
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">AI Virtual Doctor</h1>
                <p className="text-blue-100 text-sm md:text-base">Healthcare for Rural Communities</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Service Features */}
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium">24/7 Available</p>
                  </div>
                  <p className="text-xs text-blue-100">Always here to help</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium">Multi-Language</p>
                  </div>
                  <p className="text-xs text-blue-100">10+ Languages</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium">Free Service</p>
                  </div>
                  <p className="text-xs text-blue-100">No cost healthcare</p>
                </div>
              </div>

              {/* Authentication Section */}
              <div className="flex items-center space-x-4 border-l border-white border-opacity-20 pl-6">
                {isAuthenticated && user ? (
                  <div className="flex items-center space-x-4">
                    {/* User Profile */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center ring-2 ring-white ring-opacity-30">
                        {user.avatar ? (
                          <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                        ) : (
                          <span className="text-sm font-bold text-white">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-blue-100">{user.consultations || 0} consultations</p>
                      </div>
                    </div>
                    
                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 disabled:opacity-50 text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleLogin}
                      disabled={isLoading}
                      className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 disabled:opacity-50 text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Login</span>
                    </button>
                    <button 
                      onClick={handleSignUp}
                      disabled={isLoading}
                      className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 text-sm"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              {isAuthenticated && user && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center ring-2 ring-white ring-opacity-30">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                  ) : (
                    <span className="text-xs font-bold text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Service Features */}
          <div className="lg:hidden mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="bg-blue-700 bg-opacity-50 rounded-lg p-2">
              <div className="flex items-center justify-center mb-1">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <p className="text-xs font-medium">24/7</p>
              </div>
            </div>
            <div className="bg-blue-700 bg-opacity-50 rounded-lg p-2">
              <div className="flex items-center justify-center mb-1">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
                </svg>
                <p className="text-xs font-medium">Multi-Lang</p>
              </div>
            </div>
            <div className="bg-blue-700 bg-opacity-50 rounded-lg p-2">
              <div className="flex items-center justify-center mb-1">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-xs font-medium">Free</p>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 bg-blue-700 bg-opacity-30 rounded-lg p-4 space-y-4">
              {/* Mobile Authentication */}
              <div className="border-t border-white border-opacity-20 pt-4">
                {isAuthenticated && user ? (
                  <div className="space-y-3">
                    {/* Mobile User Profile */}
                    <div className="flex items-center space-x-3 p-3 bg-white bg-opacity-10 rounded-lg">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        {user.avatar ? (
                          <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                        ) : (
                          <span className="text-sm font-bold text-white">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-blue-100">Member since {user.memberSince}</p>
                        <p className="text-xs text-blue-100">{user.consultations || 0} consultations completed</p>
                      </div>
                    </div>
                    
                    {/* Mobile Logout */}
                    <button
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Mobile Login */}
                    <button
                      onClick={handleLogin}
                      disabled={isLoading}
                      className="w-full bg-white text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Login to Your Account</span>
                    </button>
                    
                    {/* Mobile Sign Up */}
                    <button 
                      onClick={handleSignUp}
                      disabled={isLoading}
                      className="w-full border-2 border-white text-white hover:bg-white hover:text-blue-600 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                      Create New Account
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authModalTab}
      />
    </>
  );
};

export default Header;
