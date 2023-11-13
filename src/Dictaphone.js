import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = ({setTextValue, language}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleStart = () => {
    SpeechRecognition.startListening({ continuous: true, language: language })
  }
  const handleStop = () => {
    SpeechRecognition.stopListening()
    setTextValue(transcript);
    console.log(transcript);
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      { listening ? 
        <button onClick={handleStop}>Stop</button>
        :
        <button onClick={handleStart}>Start</button>
      }
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;