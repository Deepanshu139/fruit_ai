import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

// Import your components (pages)
import Login from './components/Login';
import Home from './components/Home';
import Chat from './components/Chat';
import Translator from './components/Translator';
import Faq from './components/Faq';
import About from './components/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/translator" element={<Translator />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Login />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;
