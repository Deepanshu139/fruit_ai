import React from 'react';
import { MdTranslate } from 'react-icons/md'; 
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="header">
        <h1>Fruit.AI</h1>
        <p>"Stay Healthy, Stay Fresh!"</p>
      </div>
      
      <div className="grid-container">
        <a href="/chat" className="grid-item chat">  
          Chat
        </a>
        <a href="/translator" className="grid-item translator">  
          <MdTranslate size={50} color="white" />  
        </a>
        <a href="/faq" className="grid-item faqs">  
          FAQs
        </a>
        <a href="/about" className="grid-item about"> 
          About
        </a>
      </div>

      <div className="footer">
        <div className="dots"></div>
      </div>
    </div>
  );
};

export default Home;
