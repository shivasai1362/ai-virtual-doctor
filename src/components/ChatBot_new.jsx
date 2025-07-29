import React, { useState } from 'react';
import useAudioRecorder from '../hooks/useAudioRecorder';

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
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const { 
    isRecording, 
    isTranscribing, 
    startRecording, 
    stopRecording, 
    transcribeAudio 
  } = useAudioRecorder();

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

  const handleVoiceRecording = async () => {
    if (isRecording) {
      try {
        // Stop recording and get audio blob
        const audioBlob = await stopRecording();
        
        if (audioBlob) {
          // Show transcribing message
          const transcribingMessage = {
            id: messages.length + 1,
            text: "🎤 Transcribing your voice message...",
            sender: 'system',
            timestamp: new Date().toLocaleTimeString()
          };
          setMessages(prev => [...prev, transcribingMessage]);

          try {
            // Transcribe audio
            const transcription = await transcribeAudio(audioBlob);
            
            if (transcription && transcription.trim()) {
              // Remove transcribing message and add transcribed text to input
              setMessages(prev => prev.filter(msg => msg.id !== transcribingMessage.id));
              setInputMessage(transcription.trim());
              
              // Show success message
              const successMessage = {
                id: messages.length + 2,
                text: "✅ Voice message transcribed successfully! You can edit the text before sending.",
                sender: 'system',
                timestamp: new Date().toLocaleTimeString()
              };
              setMessages(prev => [...prev, successMessage]);
              
              // Remove success message after 3 seconds
              setTimeout(() => {
                setMessages(prev => prev.filter(msg => msg.id !== successMessage.id));
              }, 3000);
            } else {
              throw new Error('No speech detected');
            }
          } catch (transcriptionError) {
            // Remove transcribing message and show error
            setMessages(prev => prev.filter(msg => msg.id !== transcribingMessage.id));
            
            const errorMessage = {
              id: messages.length + 3,
              text: `❌ Transcription failed: ${transcriptionError.message}. Please try again or type your message.`,
              sender: 'system',
              timestamp: new Date().toLocaleTimeString()
            };
            setMessages(prev => [...prev, errorMessage]);
            
            // Remove error message after 5 seconds
            setTimeout(() => {
              setMessages(prev => prev.filter(msg => msg.id !== errorMessage.id));
            }, 5000);
          }
        }
      } catch (error) {
        console.error('Error handling voice recording:', error);
        const errorMessage = {
          id: messages.length + 1,
          text: `❌ Recording failed: ${error.message}`,
          sender: 'system',
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, errorMessage]);
        
        setTimeout(() => {
          setMessages(prev => prev.filter(msg => msg.id !== errorMessage.id));
        }, 5000);
      }
    } else {
      // Start recording
      try {
        const started = await startRecording();
        if (started) {
          const recordingMessage = {
            id: messages.length + 1,
            text: "🎤 Recording started... Speak clearly into your microphone. Click the microphone again to stop.",
            sender: 'system',
            timestamp: new Date().toLocaleTimeString()
          };
          setMessages(prev => [...prev, recordingMessage]);
          
          // Remove recording message after stopping
          setTimeout(() => {
            if (!isRecording) {
              setMessages(prev => prev.filter(msg => msg.id !== recordingMessage.id));
            }
          }, 1000);
        }
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    }
  };

  const getVoiceButtonState = () => {
    if (isTranscribing) {
      return {
        className: 'bg-yellow-500 text-white animate-pulse',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1z" />
            <path d="M5.707 14.707A1 1 0 015 14v-4a1 1 0 011.707-.707L10 12.586l3.293-3.293A1 1 0 0115 10v4a1 1 0 01-1.707.707L10 11.414l-3.293 3.293z" />
          </svg>
        ),
        disabled: true
      };
    }
    
    if (isRecording) {
      return {
        className: 'bg-red-500 text-white animate-pulse',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v6a1 1 0 002 0V3a1 1 0 00-1-1zM5.5 5a.5.5 0 00-.5.5v3a5 5 0 0010 0v-3a.5.5 0 00-1 0v3a4 4 0 01-8 0v-3a.5.5 0 00-.5-.5z" clipRule="evenodd" />
          </svg>
        ),
        disabled: false
      };
    }
    
    return {
      className: 'bg-gray-200 text-gray-600 hover:bg-gray-300',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
        </svg>
      ),
      disabled: false
    };
  };

  const voiceButtonState = getVoiceButtonState();

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
            className={`flex ${
              message.sender === 'user' 
                ? 'justify-end' 
                : message.sender === 'system'
                ? 'justify-center'
                : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : message.sender === 'system'
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' 
                  ? 'text-blue-100' 
                  : message.sender === 'system'
                  ? 'text-yellow-600'
                  : 'text-gray-500'
              }`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Language Selector */}
      <div className="px-4 py-2 border-t border-gray-100">
        <select 
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
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
              placeholder="Type your health concern here or use voice input..."
              className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && !voiceButtonState.disabled && handleSendMessage()}
              disabled={isRecording || isTranscribing}
            />
            <button
              onClick={handleVoiceRecording}
              disabled={voiceButtonState.disabled}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${voiceButtonState.className}`}
              title={
                isTranscribing 
                  ? 'Processing audio...' 
                  : isRecording 
                  ? 'Click to stop recording' 
                  : 'Click to start voice recording'
              }
            >
              {voiceButtonState.icon}
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isRecording || isTranscribing}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        
        {/* Voice Recording Status */}
        {isRecording && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></span>
              Recording in progress... Speak clearly into your microphone
            </p>
            <p className="text-xs text-red-500 mt-1">Click the microphone button again to stop recording</p>
          </div>
        )}
        
        {isTranscribing && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-600 flex items-center">
              <svg className="animate-spin h-4 w-4 text-yellow-600 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing your voice message...
            </p>
            <p className="text-xs text-yellow-600 mt-1">This may take a few seconds</p>
          </div>
        )}

        {/* Voice Recording Tips */}
        {!isRecording && !isTranscribing && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700 font-medium mb-1">🎤 Voice Recording Tips:</p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>• Speak clearly and at normal pace</li>
              <li>• Ensure you're in a quiet environment</li>
              <li>• Allow microphone access when prompted</li>
              <li>• Speak in your selected language: {
                selectedLanguage === 'en' ? 'English' :
                selectedLanguage === 'hi' ? 'Hindi' :
                selectedLanguage === 'bn' ? 'Bengali' :
                selectedLanguage === 'te' ? 'Telugu' :
                selectedLanguage === 'ta' ? 'Tamil' :
                selectedLanguage === 'mr' ? 'Marathi' :
                selectedLanguage === 'gu' ? 'Gujarati' :
                selectedLanguage === 'kn' ? 'Kannada' :
                selectedLanguage === 'ml' ? 'Malayalam' :
                selectedLanguage === 'pa' ? 'Punjabi' : 'English'
              }</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
