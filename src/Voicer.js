import React , {useState} from 'react';
import VoiceSelector from './VoiceSelector';
import Dictaphone from './Dictaphone';
import EasySpeech from 'easy-speech'

const Voicer = () => {
  const [textValue, setTextValue] = useState('');
  const [selectedVoice, setSelectedVoice] = useState();
  const [selectedIndex, setSelectedIndex] = useState();
  const [language, setLanguage] = useState('en-US');
  
  let synth = EasySpeech.detect()
  EasySpeech.init({ maxTimeout: 5000, interval: 250 })
    .then(() => console.debug('load complete'))
    .catch(e => console.error(e))

  const speak = async (e) => {
    e.preventDefault();

    await EasySpeech.speak({
      text: textValue,
      voice: selectedVoice, // optional, will use a default or fallback
      pitch: 1,
      rate: 1,
      volume: 1,
      // there are more events, see the API for supported events
      boundary: e => console.debug('boundary reached')
    })
  };

  if (!synth)
    return <span>Aw... your browser does not support Speech Synthesis</span>;

  
    return (
        <div>
            <Dictaphone setTextValue={setTextValue} language={language}></Dictaphone>
            <VoiceSelector selected={selectedIndex} setSelectedVoice={setSelectedVoice} setSelectedIndex={setSelectedIndex} synth={synth} setLanguage={setLanguage} />
            <button onClick={speak}>Speak</button>
        </div>
    );
};

export default Voicer;
