import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About AI Virtual Doctor</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Bringing accessible healthcare to rural communities through AI-powered medical assistance. 
              Get instant health guidance, disease detection, and medical consultations from anywhere.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Emergency Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Find Nearby Clinics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Health Tips</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          {/* Contact & Emergency */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-300">Emergency: 108</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-gray-300">support@aivirtualdoctor.com</span>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-red-400 text-xs font-medium mb-2">⚠️ Medical Disclaimer</p>
              <p className="text-gray-400 text-xs">
                This AI service is for informational purposes only and does not replace professional medical advice. 
                Always consult qualified healthcare providers for serious conditions.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 AI Virtual Doctor. All rights reserved. | Made with ❤️ for rural healthcare access.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
