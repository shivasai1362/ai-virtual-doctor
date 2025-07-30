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
  const messagesEndRef = useRef(null);

  const { 
    isRecording, 
    isTranscribing, 
    startRecording, 
    stopRecording, 
    transcribeAudio 
  } = useAudioRecorder();

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
        } catch (error) {
          console.error('Error generating response:', error);
          const errorResponse = {
            id: messages.length + 2,
            text: "Sorry, I encountered an error while processing your medical query. Please try again or rephrase your question.",
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString()
          };
          setMessages(prev => [...prev, errorResponse]);
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
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-lg">🏥 Medical AI Assistant</h3>
            <p className="text-green-100 text-sm">Online • Medical Knowledge Base Ready</p>
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
                  ? 'bg-green-600 text-white'
                  : message.sender === 'system'
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' 
                  ? 'text-green-100' 
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
              placeholder="Ask about symptoms, conditions, medications, or medical information..."
              className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        
        <div ref={messagesEndRef} />
        
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

        {/* Medical Knowledge Tips */}
        {!isRecording && !isTranscribing && (
          <div className="mt-3 p-3 bg-green-50 rounded-lg">
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
