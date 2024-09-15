import React, { useState } from 'react';
import '../styles/Chat.css';
import appleImage from '../images/apple.jpeg';
import orangeImage from '../images/orange.jpeg';
import bananaImage from '../images/banana.jpeg';


const fruitsData = [
  { id: 1, name: 'Orange', price: 8.00, img: orangeImage, description: 'A sweet and juicy orange.' },
  { id: 2, name: 'Apple', price: 11.76, img: appleImage, description: 'A fresh and crunchy apple.' },
  { id: 3, name: 'banana', price: 6.40, img: bananaImage, description: 'A fresh banana.' }
];

const Chat = () => {
  const [selectedFruit, setSelectedFruit] = useState(null);  // Track the selected fruit
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! You can view a list of fruits or click on any fruit for more details.' }
  ]);
  const [userInput, setUserInput] = useState('');  // Track user's input
  const [quantities, setQuantities] = useState(fruitsData.map(() => 1));  // Track quantities
  const [canSend, setCanSend] = useState(false);  // To enable/disable send button

  // Handle sending a message
  const handleSendMessage = () => {
    if (quantities.every(q => q === 1)) return;  // Disable if no item quantity is incremented

    const selectedFruits = fruitsData
      .filter((fruit, index) => quantities[index] > 1)
      .map((fruit, index) => `${fruit.name} x${quantities[index]}`);

    const newMessages = [...messages, { sender: 'user', text: `Selected: ${selectedFruits.join(', ')}` }];
    setMessages(newMessages);
    
    // Clear the input and reset
    setSelectedFruit(null);
    setQuantities(fruitsData.map(() => 1));
    setCanSend(false);  // Disable the send button again

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = 'Thank you for your selection!';
      setMessages([...newMessages, { sender: 'bot', text: botResponse }]);
    }, 1000);
  };

  // Handle quantity increment/decrement
  const updateQuantity = (index, delta) => {
    const newQuantities = quantities.map((q, i) => i === index ? Math.max(1, q + delta) : q);
    setQuantities(newQuantities);

    // Enable send button if any quantity > 1
    setCanSend(newQuantities.some(q => q > 1));
  };

  return (
    <div className="chat-container light">
      <div className="chat-interface">
        <div className="header">
          <h2>ChatBot</h2>
        </div>

        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}

          {/* Fruit List or Individual Fruit Detail */}
          {selectedFruit ? (
            <FruitDetailCard
              fruit={selectedFruit}
              quantity={quantities[selectedFruit.id - 1]}
              updateQuantity={updateQuantity}
              goBack={() => setSelectedFruit(null)}
            />
          ) : (
            <FruitCardList fruits={fruitsData} selectFruit={setSelectedFruit} />
          )}
        </div>

        {/* Input Area */}
        <div className="input-area">
          <button 
            className={`send-button ${canSend ? 'active' : ''}`} 
            onClick={handleSendMessage} 
            disabled={!canSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

// Component to render fruit list as cards
const FruitCardList = ({ fruits, selectFruit }) => {
  return (
    <div className="fruit-list">
      {fruits.map(fruit => (
        <div key={fruit.id} className="fruit-card" onClick={() => selectFruit(fruit)}>
          <img src={fruit.img} alt={fruit.name} />
          <h3>{fruit.name}</h3>
          <p>${fruit.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

// Component to render detailed view of a selected fruit
const FruitDetailCard = ({ fruit, quantity, updateQuantity, goBack }) => {
  const index = fruit.id - 1;  // Get the index from the fruit ID

  return (
    <div className="fruit-detail">
      <button onClick={goBack} className="back-button">Back to list</button>
      <img src={fruit.img} alt={fruit.name} />
      <h2>{fruit.name}</h2>
      <p>${fruit.price.toFixed(2)}</p>
      <p>{fruit.description}</p>

      <div className="quantity-controls">
        <button className="quantity-button" onClick={() => updateQuantity(index, -1)}>-</button>
        <span className="quantity-display">{quantity}</span>
        <button className="quantity-button" onClick={() => updateQuantity(index, 1)}>+</button>
      </div>

      <p className="fruit-total-price">Total: ${(fruit.price * quantity).toFixed(2)}</p>
    </div>
  );
};

export default Chat;
