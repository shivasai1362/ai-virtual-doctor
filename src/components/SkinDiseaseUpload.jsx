import React, { useState } from 'react';

const SkinDiseaseUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setResult(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Class name mappings
  const classNames = {
    'akiec': 'Actinic Keratoses and Intraepithelial Carcinoma',
    'bcc': 'Basal Cell Carcinoma',
    'bkl': 'Benign Keratosis-like Lesions',
    'df': 'Dermatofibroma',
    'mel': 'Melanoma',
    'nv': 'Melanocytic Nevi',
    'vasc': 'Vascular Lesions'
  };

  // Get severity level based on condition and confidence
  const getSeverity = (className, confidence) => {
    const malignantConditions = ['mel', 'bcc', 'akiec'];
    const benignConditions = ['nv', 'bkl', 'df', 'vasc'];
    
    if (malignantConditions.includes(className)) {
      if (confidence > 70) return 'High Risk - Requires Immediate Medical Attention';
      if (confidence > 50) return 'Moderate Risk - Medical Consultation Recommended';
      return 'Low Risk - Monitor and Consult if Concerned';
    } else if (benignConditions.includes(className)) {
      if (confidence > 80) return 'Likely Benign - Routine Monitoring';
      if (confidence > 60) return 'Probably Benign - Consider Medical Review';
      return 'Uncertain - Medical Evaluation Recommended';
    }
    return 'Medical Evaluation Recommended';
  };

  // Get recommendations based on condition
  const getRecommendations = (className, confidence) => {
    const malignantConditions = ['mel', 'bcc', 'akiec'];
    const commonRecommendations = [
      'Consult a dermatologist for professional diagnosis',
      'Avoid excessive sun exposure',
      'Use broad-spectrum sunscreen (SPF 30+)',
      'Monitor for any changes in size, color, or texture'
    ];

    if (malignantConditions.includes(className) && confidence > 60) {
      return [
        'URGENT: Schedule immediate dermatologist appointment',
        'Do not delay medical consultation',
        'Avoid scratching or irritating the area',
        'Document any changes with photos',
        'Consider getting a second medical opinion'
      ];
    } else if (className === 'nv' && confidence > 70) {
      return [
        'Regular monitoring for changes recommended',
        'Perform monthly self-examinations',
        'Annual dermatologist check-up advised',
        'Protect from sun exposure',
        'Note any changes in ABCDE criteria (Asymmetry, Border, Color, Diameter, Evolving)'
      ];
    } else {
      return commonRecommendations;
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    setResult(null);
    
    try {
      // Create FormData to send the image
      const formData = new FormData();
      formData.append('image', selectedFile); // Changed from 'file' to 'image'

      // Send request to backend
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle the nested response format from backend
      if (data.predictions && data.predictions.length > 0) {
        const predictions = data.predictions;
        // Get the top prediction
        const topPrediction = predictions[0];
        const fullConditionName = classNames[topPrediction.class] || topPrediction.class;
        const confidence = topPrediction.confidence;
        
        setResult({
          predictions: predictions,
          topPrediction: {
            class: topPrediction.class,
            condition: fullConditionName,
            confidence: confidence
          },
          severity: getSeverity(topPrediction.class, confidence),
          recommendations: getRecommendations(topPrediction.class, confidence),
          disclaimer: 'This is an AI prediction and should not replace professional medical diagnosis. Please consult a qualified dermatologist for accurate diagnosis and treatment.'
        });
      } else {
        throw new Error('No predictions received from the model');
      }
    } catch (error) {
      console.error('Error analyzing image:', error);
      setResult({
        error: true,
        message: error.message.includes('Failed to fetch') 
          ? 'Unable to connect to the analysis server. Please ensure the backend is running at http://127.0.0.1:8000'
          : `Analysis failed: ${error.message}`,
        recommendations: [
          'Check your internet connection',
          'Ensure the backend server is running',
          'Try uploading a different image',
          'Contact support if the problem persists'
        ]
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Skin Disease Detection</h2>
        <p className="text-gray-600 mb-2">Upload a photo for AI-powered dermatological analysis</p>
        <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Connected to AI Model at http://127.0.0.1:8000
        </div>
      </div>

      {!previewUrl ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-green-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="space-y-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drop your image here, or click to browse
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Supports JPG, PNG, GIF up to 10MB
              </p>
              <label className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Choose File
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Image Preview */}
          <div className="relative">
            <img
              src={previewUrl}
              alt="Uploaded skin image"
              className="w-full max-w-md mx-auto rounded-lg shadow-md"
            />
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Analyze Button */}
          {!result && !isAnalyzing && (
            <div className="text-center">
              <button
                onClick={analyzeImage}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium"
              >
                Analyze Image
              </button>
            </div>
          )}

          {/* Loading State */}
          {isAnalyzing && (
            <div className="text-center py-8">
              <div className="inline-flex flex-col items-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <span className="text-lg font-medium text-gray-700 mt-4">Analyzing skin condition...</span>
                <p className="text-sm text-gray-500 mt-2">Connecting to AI model at http://127.0.0.1:8000</p>
                <p className="text-xs text-gray-400 mt-1">This may take a few seconds</p>
              </div>
            </div>
          )}

          {/* Results */}
          {result && !result.error && (
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Analysis Results</h3>
              
              {/* Top Prediction */}
              <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-700 mb-2">Primary Diagnosis</h4>
                <p className="text-lg font-medium text-green-600">{result.topPrediction.condition}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Confidence: <span className="font-semibold">{result.topPrediction.confidence.toFixed(1)}%</span>
                </p>
              </div>

              {/* All Predictions */}
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-3">All Predictions</h4>
                <div className="space-y-3">
                  {result.predictions.map((pred, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {classNames[pred.class] || pred.class}
                        </p>
                        <p className="text-sm text-gray-600">({pred.class})</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{pred.confidence.toFixed(1)}%</p>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full ${
                              index === 0 ? 'bg-green-500' : 
                              index === 1 ? 'bg-blue-500' : 'bg-gray-400'
                            }`}
                            style={{ width: `${Math.min(pred.confidence, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Severity Assessment */}
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Risk Assessment</h4>
                <p className={`text-lg font-medium ${
                  result.severity.includes('High Risk') ? 'text-red-600' :
                  result.severity.includes('Moderate Risk') ? 'text-orange-600' :
                  result.severity.includes('Low Risk') ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  {result.severity}
                </p>
              </div>

              {/* Recommendations */}
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-3">Recommendations</h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${
                        rec.includes('URGENT') ? 'bg-red-500' : 'bg-green-500'
                      }`}></span>
                      <span className={`${
                        rec.includes('URGENT') ? 'text-red-700 font-semibold' : 'text-gray-700'
                      }`}>
                        {rec}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Medical Disclaimer */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h5 className="font-medium text-yellow-800">Important Medical Disclaimer</h5>
                    <p className="text-sm text-yellow-700 mt-1">{result.disclaimer}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={clearImage}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Upload New Image
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Consult Doctor
                </button>
              </div>
            </div>
          )}

          {/* Error Display */}
          {result && result.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 space-y-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-red-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Analysis Failed</h3>
                  <p className="text-red-700 mb-4">{result.message}</p>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-red-700 mb-2">Troubleshooting Steps:</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-red-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={clearImage}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Try Another Image
                </button>
                <button
                  onClick={analyzeImage}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry Analysis
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Photography Tips</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Ensure good lighting (natural light preferred)</li>
            <li>• Keep the camera steady and focused</li>
            <li>• Fill the frame with the affected area</li>
            <li>• Avoid shadows or reflections</li>
            <li>• Take photos from multiple angles if needed</li>
          </ul>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">Detectable Conditions</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Melanoma (mel)</li>
            <li>• Basal Cell Carcinoma (bcc)</li>
            <li>• Melanocytic Nevi (nv)</li>
            <li>• Actinic Keratoses (akiec)</li>
            <li>• Benign Keratosis-like Lesions (bkl)</li>
            <li>• Dermatofibroma (df)</li>
            <li>• Vascular Lesions (vasc)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkinDiseaseUpload;
