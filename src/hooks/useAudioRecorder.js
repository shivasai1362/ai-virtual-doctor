import { useState, useRef, useCallback } from 'react';

const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        } 
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);

      return true;
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Microphone access denied. Please allow microphone access and try again.');
      return false;
    }
  }, []);

  const stopRecording = useCallback(() => {
    return new Promise((resolve) => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { 
            type: 'audio/webm;codecs=opus' 
          });
          
          // Stop all tracks to release microphone
          const stream = mediaRecorderRef.current.stream;
          if (stream) {
            stream.getTracks().forEach(track => track.stop());
          }
          
          setIsRecording(false);
          resolve(audioBlob);
        };

        mediaRecorderRef.current.stop();
      } else {
        setIsRecording(false);
        resolve(null);
      }
    });
  }, [isRecording]);

  const transcribeAudio = useCallback(async (audioBlob) => {
    if (!audioBlob) return null;

    setIsTranscribing(true);
    
    try {
      // Convert webm to wav for better compatibility
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      // Create WAV file
      const wavBlob = await audioBufferToWav(audioBuffer);
      
      const formData = new FormData();
      formData.append('audio', wavBlob, 'recording.wav');

      const response = await fetch(import.meta.env.VITE_AUDIO_TRANSCRIBE_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      return data.transcription;
    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw new Error(`Transcription failed: ${error.message}`);
    } finally {
      setIsTranscribing(false);
    }
  }, []);

  const recordAndTranscribe = useCallback(async () => {
    try {
      const started = await startRecording();
      if (!started) return null;

      // Return promise that resolves when recording is stopped and transcribed
      return new Promise((resolve, reject) => {
        const checkRecording = async () => {
          if (isRecording) {
            setTimeout(checkRecording, 100);
          } else {
            try {
              const audioBlob = await stopRecording();
              const transcription = await transcribeAudio(audioBlob);
              resolve(transcription);
            } catch (error) {
              reject(error);
            }
          }
        };
        checkRecording();
      });
    } catch (error) {
      console.error('Error in recordAndTranscribe:', error);
      throw error;
    }
  }, [startRecording, stopRecording, transcribeAudio, isRecording]);

  return {
    isRecording,
    isTranscribing,
    startRecording,
    stopRecording,
    transcribeAudio,
    recordAndTranscribe,
  };
};

// Helper function to convert AudioBuffer to WAV
const audioBufferToWav = (audioBuffer) => {
  return new Promise((resolve) => {
    const length = audioBuffer.length;
    const sampleRate = audioBuffer.sampleRate;
    const arrayBuffer = new ArrayBuffer(44 + length * 2);
    const view = new DataView(arrayBuffer);
    const channels = audioBuffer.numberOfChannels;
    let offset = 0;

    // WAV header
    const writeString = (str) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
      offset += str.length;
    };

    const writeUint32 = (value) => {
      view.setUint32(offset, value, true);
      offset += 4;
    };

    const writeUint16 = (value) => {
      view.setUint16(offset, value, true);
      offset += 2;
    };

    writeString('RIFF');
    writeUint32(36 + length * 2);
    writeString('WAVE');
    writeString('fmt ');
    writeUint32(16);
    writeUint16(1);
    writeUint16(channels);
    writeUint32(sampleRate);
    writeUint32(sampleRate * 2);
    writeUint16(2);
    writeUint16(16);
    writeString('data');
    writeUint32(length * 2);

    // Convert audio data
    const channelData = audioBuffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      const sample = Math.max(-1, Math.min(1, channelData[i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }

    resolve(new Blob([arrayBuffer], { type: 'audio/wav' }));
  });
};

export default useAudioRecorder;
