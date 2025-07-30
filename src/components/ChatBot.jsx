import React, { useState, useRef, useEffect } from 'react';
import useAudioRecorder from '../hooks/useAudioRecorder';

// Medical Knowledge Base
const medicalKnowledgeBase = {
  diabetes: {
    condition: "Diabetes Mellitus",
    symptoms: ["Increased thirst", "Frequent urination", "Extreme fatigue", "Blurred vision", "Slow-healing cuts", "Weight loss (Type 1)", "Tingling in hands/feet"],
    causes: ["Genetic factors", "Autoimmune destruction of beta cells (Type 1)", "Insulin resistance (Type 2)", "Obesity", "Sedentary lifestyle", "Age over 45"],
    treatments: ["Insulin therapy", "Metformin", "Blood glucose monitoring", "Dietary modifications", "Regular exercise", "Weight management"],
    recommendations: ["Monitor blood sugar regularly", "Follow diabetic diet", "Exercise 150 minutes/week", "Regular medical checkups", "Foot care", "Eye examinations"]
  },
  hypertension: {
    condition: "High Blood Pressure (Hypertension)",
    symptoms: ["Often no symptoms (silent killer)", "Headaches", "Shortness of breath", "Nosebleeds", "Chest pain", "Vision problems"],
    causes: ["Family history", "Age", "Obesity", "High sodium intake", "Lack of exercise", "Stress", "Smoking", "Alcohol consumption"],
    treatments: ["ACE inhibitors", "Beta-blockers", "Diuretics", "Calcium channel blockers", "Lifestyle modifications"],
    recommendations: ["Reduce sodium intake", "Regular exercise", "Maintain healthy weight", "Limit alcohol", "Quit smoking", "Stress management"]
  },
  migraine: {
    condition: "Migraine Headaches",
    symptoms: ["Severe throbbing headache", "Nausea and vomiting", "Sensitivity to light", "Sensitivity to sound", "Visual aura", "Dizziness"],
    causes: ["Genetic predisposition", "Hormonal changes", "Stress", "Certain foods", "Sleep changes", "Weather changes", "Strong smells"],
    treatments: ["Triptans", "NSAIDs", "Anti-nausea medications", "Preventive medications", "Botox injections", "CGRP inhibitors"],
    recommendations: ["Identify triggers", "Maintain regular sleep schedule", "Stay hydrated", "Manage stress", "Regular meals", "Avoid known triggers"]
  },
  aspirin: {
    condition: "Aspirin (Drug Information)",
    symptoms: ["Used for pain relief", "Anti-inflammatory", "Fever reduction", "Blood thinning"],
    causes: ["Pain conditions", "Inflammation", "Cardiovascular protection", "Stroke prevention"],
    treatments: ["Low-dose for heart protection", "Regular dose for pain", "Enteric-coated formulations"],
    recommendations: ["Take with food", "Avoid if allergic", "Consult doctor for long-term use", "Monitor for bleeding", "Avoid with certain medications"]
  },
  fever: {
    condition: "Fever",
    symptoms: ["Elevated body temperature (>100.4°F)", "Chills", "Sweating", "Headache", "Muscle aches", "Fatigue", "Loss of appetite"],
    causes: ["Viral infections", "Bacterial infections", "Inflammatory conditions", "Heat exhaustion", "Medications", "Vaccines"],
    treatments: ["Acetaminophen", "Ibuprofen", "Rest", "Hydration", "Cool compresses", "Treat underlying cause"],
    recommendations: ["Stay hydrated", "Rest", "Monitor temperature", "Seek medical care if >103°F", "Avoid aspirin in children", "Light clothing"]
  },
  anxiety: {
    condition: "Anxiety Disorders",
    symptoms: ["Excessive worry", "Restlessness", "Fatigue", "Difficulty concentrating", "Muscle tension", "Sleep disturbances", "Panic attacks"],
    causes: ["Genetic factors", "Brain chemistry", "Stress", "Trauma", "Medical conditions", "Substance use", "Personality factors"],
    treatments: ["Cognitive behavioral therapy", "SSRIs", "Benzodiazepines (short-term)", "Beta-blockers", "Relaxation techniques", "Mindfulness"],
    recommendations: ["Regular exercise", "Stress management", "Adequate sleep", "Limit caffeine", "Practice mindfulness", "Social support"]
  },
  depression: {
    condition: "Depression",
    symptoms: ["Persistent sadness", "Loss of interest", "Fatigue", "Sleep changes", "Appetite changes", "Difficulty concentrating", "Feelings of worthlessness"],
    causes: ["Genetic factors", "Brain chemistry", "Life events", "Medical conditions", "Medications", "Substance abuse", "Hormonal changes"],
    treatments: ["Antidepressants", "Psychotherapy", "ECT (severe cases)", "Light therapy", "Exercise therapy", "Support groups"],
    recommendations: ["Regular exercise", "Healthy sleep schedule", "Social connections", "Stress management", "Avoid alcohol/drugs", "Professional help"]
  }
};

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Medical AI Assistant with built-in medical knowledge. I can help you with medical information, symptoms analysis, drug interactions, and health-related queries. You can type or use voice input. Please note that I provide informational content only and cannot replace professional medical advice. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const { 
    isRecording, 
    isTranscribing, 
    startRecording, 
    stopRecording, 
    transcribeAudio 
  } = useAudioRecorder();

  // Improved scroll to bottom - only when new messages are added and user is near bottom
  useEffect(() => {
    if (shouldAutoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, shouldAutoScroll]);

  // Check if user is near bottom of chat
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
      setShouldAutoScroll(isNearBottom);
    }
  };

  // Function to generate medical responses
  const generateMedicalResponse = (query) => {
    const lowerQuery = query.toLowerCase();

    // Find matching medical condition
    let matchedCondition = null;

    for (const [key, condition] of Object.entries(medicalKnowledgeBase)) {
      if (lowerQuery.includes(key) ||
          lowerQuery.includes(condition.condition.toLowerCase()) ||
          condition.symptoms.some(symptom => lowerQuery.includes(symptom.toLowerCase())) ||
          condition.causes.some(cause => lowerQuery.includes(cause.toLowerCase()))) {
        matchedCondition = condition;
        break;
      }
    }

    if (matchedCondition) {
      return `📋 Medical Information:

🏥 Condition/Topic: ${matchedCondition.condition}

🔍 Symptoms:
${matchedCondition.symptoms.map(symptom => `• ${symptom}`).join('\n')}

⚠️ Causes/Risk Factors:
${matchedCondition.causes.map(cause => `• ${cause}`).join('\n')}

💊 Treatment Options:
${matchedCondition.treatments.map(treatment => `• ${treatment}`).join('\n')}

📝 Recommendations:
${matchedCondition.recommendations.map(rec => `• ${rec}`).join('\n')}

⚡ Important Note: This information is for educational purposes only. Always consult with a healthcare professional for proper diagnosis and treatment.`;
    }

    // Check for general medical queries
    if (lowerQuery.includes('emergency') || lowerQuery.includes('urgent') || lowerQuery.includes('911')) {
      return `🚨 Emergency Information:

If you're experiencing a medical emergency, please:
• Call 911 immediately (US)
• Go to the nearest emergency room
• Contact your local emergency services

Common emergency symptoms:
• Chest pain or difficulty breathing
• Severe allergic reactions
• Loss of consciousness
• Severe bleeding
• Stroke symptoms (FAST: Face, Arms, Speech, Time)

This AI assistant cannot provide emergency medical care. Please seek immediate professional help for urgent medical situations.`;
    }

    // General medical response for unmatched queries
    return `🏥 Medical Information:

📋 Query: ${query}

💡 General Medical Guidance:
• I can provide information about common conditions like diabetes, hypertension, migraines, fever, anxiety, depression, and medications like aspirin
• For specific symptoms, please describe them in detail
• Common topics I can help with: symptoms, causes, treatments, and general recommendations

📚 Available Topics:
• Diabetes and blood sugar management
• Hypertension (high blood pressure)  
• Migraine headaches
• Fever and temperature management
• Anxiety and stress management
• Depression and mental health
• Aspirin and drug interactions

⚠️ Important Note: This is a medical information system. For urgent medical concerns, please contact a healthcare provider immediately. This information cannot replace professional medical advice.

💭 Suggestion: Try asking about specific conditions like "diabetes symptoms", "migraine treatment", or "anxiety management" for detailed information.`;
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([...messages, newMessage]);
      const currentInput = inputMessage;
      setInputMessage('');
      
      // Enable auto-scroll when user sends a message
      setShouldAutoScroll(true);
      
      // Generate medical response based on knowledge base
      setTimeout(() => {
        try {
          const botResponseText = generateMedicalResponse(currentInput);
          
          const botResponse = {
            id: messages.length + 2,
            text: botResponseText,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString()
          };
          setMessages(prev => [...prev, botResponse]);
          setShouldAutoScroll(true); // Enable auto-scroll for bot responses
        } catch (error) {
          console.error('Error generating response:', error);
          const errorResponse = {
            id: messages.length + 2,
            text: "Sorry, I encountered an error while processing your medical query. Please try again or rephrase your question.",
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString()
          };
          setMessages(prev => [...prev, errorResponse]);
          setShouldAutoScroll(true); // Enable auto-scroll for error responses
        }
      }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
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
                text: "✅ Voice message transcribed successfully! You can edit the text before sending or press Enter to send immediately.",
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
      className: 'bg-slate-200 text-slate-600 hover:bg-slate-300 hover:text-slate-700 border border-slate-300 shadow-sm hover:shadow-md',
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
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 rounded-xl shadow-xl shadow-slate-200/50 backdrop-blur-sm">
      {/* Chat Header */}
      <div className="relative bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 p-6 rounded-t-xl">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-t-xl"></div>
        <div className="relative flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.5 4.5L12 12l-7.5-7.5M4.5 19.5L12 12l7.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-xl text-white tracking-tight">Medical AI Assistant</h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <p className="text-white/90 text-sm font-medium">Online • Medical Knowledge Ready</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-white/80">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zM11 8a1 1 0 112 0v4a1 1 0 11-2 0V8z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">AI Powered</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="relative flex-1 overflow-y-auto p-6 space-y-6 max-h-96 bg-gradient-to-b from-slate-50/50 to-transparent"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' 
                ? 'justify-end' 
                : message.sender === 'system'
                ? 'justify-center'
                : 'justify-start'
            } animate-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-5 py-4 rounded-2xl shadow-sm border transition-all duration-200 hover:shadow-md ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white border-transparent shadow-emerald-500/20'
                  : message.sender === 'system'
                  ? 'bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-800 border-amber-200/50 shadow-amber-500/10'
                  : 'bg-white text-slate-700 border-slate-200/60 shadow-slate-200/50'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-line font-medium">{message.text}</p>
              <p className={`text-xs mt-2 font-medium ${
                message.sender === 'user' 
                  ? 'text-white/80' 
                  : message.sender === 'system'
                  ? 'text-amber-600/80'
                  : 'text-slate-500'
              }`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        
        {/* Scroll to bottom button */}
        {!shouldAutoScroll && (
          <div className="absolute bottom-4 right-4">
            <button
              onClick={() => {
                setShouldAutoScroll(true);
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
              title="Scroll to bottom"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Language Selector */}
      <div className="px-6 py-4 border-t border-slate-200/60 bg-slate-50/50">
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-600 mb-2 tracking-wide uppercase">
            Preferred Language
          </label>
          <select 
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full p-3 text-sm bg-white border border-slate-200/60 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-slate-700"
          >
            <option value="en">🇺🇸 English</option>
            <option value="hi">🇮🇳 हिंदी (Hindi)</option>
            <option value="bn">🇧🇩 বাংলা (Bengali)</option>
            <option value="te">🇮🇳 తెలుగు (Telugu)</option>
            <option value="ta">🇮🇳 தமிழ் (Tamil)</option>
            <option value="mr">🇮🇳 मराठी (Marathi)</option>
            <option value="gu">🇮🇳 ગુજરાતી (Gujarati)</option>
            <option value="kn">🇮🇳 ಕನ್ನಡ (Kannada)</option>
            <option value="ml">🇮🇳 മലയാളം (Malayalam)</option>
            <option value="pa">🇮🇳 ਪੰਜਾਬੀ (Punjabi)</option>
          </select>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-slate-200/60 bg-white">
        <div className="flex space-x-3">
          <div className="flex-1 relative group">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about symptoms, conditions, medications, or medical information..."
              className="w-full p-4 pr-14 text-sm bg-slate-50 border border-slate-200/60 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 focus:bg-white transition-all duration-200 placeholder:text-slate-400 font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              onKeyPress={(e) => e.key === 'Enter' && !voiceButtonState.disabled && handleSendMessage()}
              disabled={isRecording || isTranscribing}
            />
            <button
              onClick={handleVoiceRecording}
              disabled={voiceButtonState.disabled}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${voiceButtonState.className}`}
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
            className="px-6 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl hover:from-emerald-600 hover:to-blue-600 focus:ring-2 focus:ring-emerald-500/20 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        
        <div ref={messagesEndRef} />
        
        {/* Voice Recording Status */}
        {isRecording && (
          <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/60 rounded-xl shadow-sm">
            <p className="text-sm text-red-700 flex items-center font-medium">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse mr-3 shadow-lg shadow-red-500/50"></span>
              Recording in progress... Speak clearly into your microphone
            </p>
            <p className="text-xs text-red-600/80 mt-2 ml-5">Click the microphone button again to stop recording</p>
          </div>
        )}
        
        {isTranscribing && (
          <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200/60 rounded-xl shadow-sm">
            <p className="text-sm text-yellow-700 flex items-center font-medium">
              <svg className="animate-spin h-5 w-5 text-yellow-600 mr-3" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing your voice message...
            </p>
            <p className="text-xs text-yellow-600/80 mt-2 ml-8">This may take a few seconds</p>
          </div>
        )}

        {/* Medical Knowledge Tips */}
        {!isRecording && !isTranscribing && (
          <div className="mt-4 p-4 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 border border-emerald-200/60 rounded-xl shadow-sm">
            <p className="text-xs text-green-700 font-medium mb-1">� Medical Knowledge Base:</p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• Ask about conditions: diabetes, hypertension, migraines, fever, anxiety, depression</li>
              <li>• Get medication info: aspirin, drug interactions, dosages</li>
              <li>• Learn about symptoms, causes, treatments, and recommendations</li>
              <li>• Use voice input in your selected language: {
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
              <li>• ⚠️ For emergencies, call 911 or contact emergency services immediately</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
