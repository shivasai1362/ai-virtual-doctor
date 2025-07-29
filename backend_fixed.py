import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.preprocessing import image
import numpy as np
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load model once
model = tf.keras.models.load_model('skin_model.h5')

# Class labels (must match training order)
class_names = ['akiec', 'bcc', 'bkl', 'df', 'mel', 'nv', 'vasc']

# Prediction function
def predict_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)[0]
    sorted_indices = np.argsort(predictions)[::-1]

    top3 = [{
        'class': class_names[i],
        'confidence': float(predictions[i] * 100)  # Removed f-string formatting, just multiply by 100
    } for i in sorted_indices[:3]]

    return top3

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if image file is present
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'}), 400

        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'Empty filename'}), 400

        # Validate file type
        allowed_extensions = {'png', 'jpg', 'jpeg', 'gif', 'bmp'}
        if not ('.' in file.filename and file.filename.rsplit('.', 1)[1].lower() in allowed_extensions):
            return jsonify({'error': 'Invalid file type. Please upload an image file.'}), 400

        # Create uploads directory if it doesn't exist
        os.makedirs('uploads', exist_ok=True)
        
        # Save file with a secure filename
        import uuid
        file_extension = file.filename.rsplit('.', 1)[1].lower()
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        filepath = os.path.join('uploads', unique_filename)
        file.save(filepath)

        # Get predictions
        predictions = predict_image(filepath)
        
        # Clean up: delete the uploaded file after prediction
        try:
            os.remove(filepath)
        except OSError:
            pass  # File might already be deleted or not accessible
        
        # Return predictions in the expected format
        return jsonify({'predictions': predictions})
        
    except Exception as e:
        # Clean up file in case of error
        try:
            if 'filepath' in locals():
                os.remove(filepath)
        except OSError:
            pass
        
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify server is running"""
    return jsonify({
        'status': 'healthy',
        'message': 'Skin disease detection API is running',
        'model_loaded': model is not None,
        'supported_classes': class_names
    })

if __name__ == '__main__':
    print("Starting Skin Disease Detection API...")
    print("Model loaded successfully!" if model else "Failed to load model!")
    print("Supported classes:", class_names)
    print("Server running at: http://127.0.0.1:8000")
    app.run(debug=True, host='127.0.0.1', port=8000)
