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

  const analyzeImage = () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    // Simulate analysis process
    setTimeout(() => {
      setResult({
        confidence: '87%',
        condition: 'Eczema (Dermatitis)',
        severity: 'Mild to Moderate',
        recommendations: [
          'Keep the affected area clean and dry',
          'Apply moisturizer regularly',
          'Avoid known triggers (allergens, irritants)',
          'Consider using mild topical corticosteroids',
          'Consult a dermatologist for proper diagnosis'
        ],
        disclaimer: 'This is an AI prediction and should not replace professional medical diagnosis.'
      });
      setIsAnalyzing(false);
    }, 3000);
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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Skin Disease Detection</h2>
        <p className="text-gray-600">Upload a photo for AI-powered skin condition analysis</p>
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
              <div className="inline-flex items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mr-3"></div>
                <span className="text-lg font-medium text-gray-700">Analyzing image...</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Analysis Results</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">Detected Condition</h4>
                  <p className="text-lg font-medium text-green-600">{result.condition}</p>
                  <p className="text-sm text-gray-600 mt-1">Confidence: {result.confidence}</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">Severity</h4>
                  <p className="text-lg font-medium text-orange-600">{result.severity}</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-3">Recommendations</h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h5 className="font-medium text-yellow-800">Important Disclaimer</h5>
                    <p className="text-sm text-yellow-700 mt-1">{result.disclaimer}</p>
                  </div>
                </div>
              </div>

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
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Photography Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Ensure good lighting (natural light preferred)</li>
          <li>• Keep the camera steady and focused</li>
          <li>• Fill the frame with the affected area</li>
          <li>• Avoid shadows or reflections</li>
          <li>• Take photos from multiple angles if needed</li>
        </ul>
      </div>
    </div>
  );
};

export default SkinDiseaseUpload;
