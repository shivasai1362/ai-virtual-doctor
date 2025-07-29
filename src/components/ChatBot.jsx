import React, { useState } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI Virtual Doctor. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "Thank you for your message. I'm processing your query and will provide medical guidance shortly.",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording functionality will be implemented later
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-lg">AI Virtual Doctor</h3>
            <p className="text-blue-100 text-sm">Online • Ready to help</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Language Selector */}
      <div className="px-4 py-2 border-t border-gray-100">
        <select className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="en">English</option>
          <option value="hi">हिंदी (Hindi)</option>
          <option value="bn">বাংলা (Bengali)</option>
          <option value="te">తెలుగు (Telugu)</option>
          <option value="ta">தமிழ் (Tamil)</option>
          <option value="mr">मराठी (Marathi)</option>
          <option value="gu">ગુજરાતી (Gujarati)</option>
          <option value="kn">ಕನ್ನಡ (Kannada)</option>
          <option value="ml">മലയാളം (Malayalam)</option>
          <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
        </select>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your health concern here..."
              className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={toggleRecording}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
                isRecording 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        {isRecording && (
          <p className="text-sm text-red-600 mt-2 flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></span>
            Recording... Speak now
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
