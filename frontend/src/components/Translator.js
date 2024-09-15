import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Translator.css'; 

const API_KEY = '665a4d685amsh7a732614a5dafa2p15888fjsn89c455cc92df';
const BASE_URL = 'https://microsoft-translator-text.p.rapidapi.com/translate?api-version=3.0';

const Translator = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const translate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(BASE_URL, [{
        Text: input
      }], {
        headers: {
          'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
          'X-RapidAPI-Key': API_KEY,
          'Content-Type': 'application/json'
        },
        params: {
          'to': 'hi', 
          'from': 'en' 
        }
      });
      setOutput(response.data[0].translations[0].text); 
    } catch (error) {
      setOutput('Translation failed');
      console.error('Error translating text:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="translator-container">
      <h2>Translator</h2>
      <input
        type="text"
        placeholder="Type text to translate"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={translate} disabled={loading}>
        {loading ? 'Translating...' : 'Translate'}
      </button>
      {output && <p className="output">{output}</p>}
    </div>
  );
};

export default Translator;
