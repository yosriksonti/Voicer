import React, { useState, useCallback, useEffect } from "react";
import EasySpeech from 'easy-speech'

const VoiceSelector = ({ selected = 0, setSelectedVoice, setSelectedIndex, synth, setLanguage }) => {
    const [voices, setVoices] = useState([]);
  
    const populateVoiceList = useCallback(() => {
      const newVoices = EasySpeech.voices();
      setVoices(newVoices);
    }, []);
  
    const handleOnSelected = (e) => {
        setSelectedVoice(voices[e.target.value]);
        setSelectedIndex(e.target.value);
        setLanguage(voices[e.target.value].lang)
        }

    useEffect(() => {
      populateVoiceList();
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = populateVoiceList;
      }
    }, [populateVoiceList]);
  
    return (
      <select
        value={selected}
        onChange={handleOnSelected}
      >
        {voices.map((voice, index) => (
          <option key={index} value={index}>
            {voice.name} ({voice.lang}) {voice.default && ' [Default]'}
          </option>
        ))}
      </select>
    );
  };

  export default VoiceSelector;