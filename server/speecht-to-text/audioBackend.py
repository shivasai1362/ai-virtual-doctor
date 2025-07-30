import whisper
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the Whisper model once
model = whisper.load_model('small')  # Or 'base', 'medium', etc.

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']
    if audio_file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    # Save the file temporarily
    temp_path = 'temp_audio.wav'
    audio_file.save(temp_path)

    try:
        # Use Whisper to transcribe
        result = model.transcribe(temp_path)
        return jsonify({'transcription': result['text']})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
