import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">AI Virtual Doctor</h1>
              <p className="text-blue-100 text-sm md:text-base">Healthcare for Rural Communities</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <p className="text-sm font-medium">24/7 Available</p>
              <p className="text-xs text-blue-100">Always here to help</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">Multi-Language</p>
              <p className="text-xs text-blue-100">10+ Languages supported</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">Free Service</p>
              <p className="text-xs text-blue-100">No cost healthcare</p>
            </div>
          </div>
        </div>
        
        {/* Mobile info cards */}
        <div className="md:hidden mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="bg-blue-700 bg-opacity-50 rounded-lg p-2">
            <p className="text-xs font-medium">24/7 Available</p>
          </div>
          <div className="bg-blue-700 bg-opacity-50 rounded-lg p-2">
            <p className="text-xs font-medium">Multi-Language</p>
          </div>
          <div className="bg-blue-700 bg-opacity-50 rounded-lg p-2">
            <p className="text-xs font-medium">Free Service</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
