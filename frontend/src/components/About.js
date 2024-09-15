import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <h2>Fruit.AI</h2>
      <p>
        Whether you're looking to discover new fruits, understand their nutritional values, or find the perfect fruit for your diet, our AI-driven chatbot is here to assist.
      </p>
      <p>
        We provide personalized fruit recommendations tailored to your health needs, making it easier for you to integrate the best fruits into your daily routine.
      </p>
      <button className="about-button">About</button>
    </div>
  );
};

export default About;
