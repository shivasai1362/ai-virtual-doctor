import React, { useState } from 'react'
import Header from './components/Header'
import ChatBot from './components/ChatBot'
import SkinDiseaseUpload from './components/SkinDiseaseUpload'
import Footer from './components/Footer'

function App() {
  const [activeTab, setActiveTab] = useState('chat')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Welcome to AI Virtual Doctor
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get instant medical guidance and health support designed specifically for rural communities. 
            Chat with our AI doctor or analyze skin conditions with our advanced image recognition technology.
          </p>
        </div>

        {/* Service Tabs */}
        <div className="flex flex-col md:flex-row justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'chat'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                <span>AI Chat Doctor</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('skin')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'skin'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <span>Skin Analysis</span>
              </div>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'chat' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ChatBot />
              </div>
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium text-red-800">Emergency Symptoms</span>
                      </div>
                    </button>
                    <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-blue-800">General Health Check</span>
                      </div>
                    </button>
                    <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium text-green-800">Preventive Care</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Health Tips */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Health Tips</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="font-medium text-yellow-800">💧 Stay Hydrated</p>
                      <p className="text-yellow-700">Drink at least 8 glasses of water daily</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-green-800">🥗 Eat Balanced</p>
                      <p className="text-green-700">Include fruits and vegetables in every meal</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-800">🚶‍♂️ Stay Active</p>
                      <p className="text-blue-700">Take a 30-minute walk daily</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skin' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <SkinDiseaseUpload />
              </div>
              <div className="space-y-6">
                {/* Common Skin Conditions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Common Skin Conditions</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                      <p className="font-medium text-blue-800">Eczema</p>
                      <p className="text-blue-700">Dry, itchy, inflamed skin patches</p>
                    </div>
                    <div className="p-3 border-l-4 border-green-500 bg-green-50">
                      <p className="font-medium text-green-800">Acne</p>
                      <p className="text-green-700">Pimples, blackheads, and cysts</p>
                    </div>
                    <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                      <p className="font-medium text-yellow-800">Psoriasis</p>
                      <p className="text-yellow-700">Scaly, red skin patches</p>
                    </div>
                    <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
                      <p className="font-medium text-purple-800">Dermatitis</p>
                      <p className="text-purple-700">Contact-related skin irritation</p>
                    </div>
                  </div>
                </div>

                {/* Skin Care Tips */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Skin Care Tips</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <p className="text-gray-700">Keep skin clean and moisturized daily</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <p className="text-gray-700">Use sunscreen when going outdoors</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <p className="text-gray-700">Avoid harsh soaps and chemicals</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <p className="text-gray-700">Stay hydrated and eat healthy foods</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Chat Support</h3>
            <p className="text-gray-600">24/7 medical assistance with multi-language voice support for easy communication</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Skin Disease Detection</h3>
            <p className="text-gray-600">Advanced AI-powered image analysis for early detection of common skin conditions</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Emergency Access</h3>
            <p className="text-gray-600">Quick access to emergency services and nearby healthcare facilities</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App