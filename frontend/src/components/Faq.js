import React, { useState } from 'react';
import '../styles/faq.css';
import appleImage from '../images/apple.jpeg';
import orangeImage from '../images/orange.jpeg';
import bananaImage from '../images/banana.jpeg';
import berriesImage from '../images/berries.jpeg';


const initialFaqData = [
  {
    id: 1,
    title: "What are the benefits of eating apples?",
    content: "Apples are rich in fiber, vitamins, and antioxidants. They promote heart health, support weight loss, and may lower the risk of diabetes.",
    imageUrl: appleImage    
  },
  {
    id: 2,
    title: "Why are bananas a good snack?",
    content: "Bananas are an excellent source of potassium, which helps maintain healthy blood pressure. They are also great for energy and digestion.",
    imageUrl: bananaImage
  },
  {
    id: 3,
    title: "How does eating oranges boost your immune system?",
    content: "Oranges are packed with vitamin C, which is essential for a strong immune system. They also contain antioxidants that promote overall health.",
    imageUrl: orangeImage

  },
  {
    id: 4,
    title: "What makes berries a superfood?",
    content: "Berries are high in antioxidants, fiber, and vitamins. They help reduce inflammation, improve heart health, and promote brain function.",
    imageUrl: berriesImage
  }
];

const FaqSection = () => {
  
  const [faqData, setFaqData] = useState(initialFaqData);
  const [newFaq, setNewFaq] = useState({ title: '', content: '', imageUrl: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFaq({ ...newFaq, [name]: value });
  };

  // Add new FAQ
  const handleAddFaq = () => {
    const newId = faqData.length ? faqData[faqData.length - 1].id + 1 : 1;
    setFaqData([...faqData, { ...newFaq, id: newId, imageUrl: appleImage }]); 
    setNewFaq({ title: '', content: '', imageUrl: '' });
  };

  // Edit FAQ
  const handleEditFaq = (faq) => {
    setNewFaq({ title: faq.title, content: faq.content, imageUrl: faq.imageUrl });
    setIsEditing(true);
    setEditingFaqId(faq.id);
  };

  // Update FAQ
  const handleUpdateFaq = () => {
    const updatedFaqs = faqData.map(faq => 
      faq.id === editingFaqId ? { ...faq, ...newFaq } : faq
    );
    setFaqData(updatedFaqs);
    setIsEditing(false);
    setNewFaq({ title: '', content: '', imageUrl: '' });
    setEditingFaqId(null);
  };

  // Delete FAQ
  const handleDeleteFaq = (id) => {
    const updatedFaqs = faqData.filter(faq => faq.id !== id);
    setFaqData(updatedFaqs);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">FAQs</h2>
      
     
      <div className="faq-form">
        <input
          type="text"
          name="title"
          placeholder="FAQ Title"
          value={newFaq.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="content"
          placeholder="FAQ Content"
          value={newFaq.content}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={newFaq.imageUrl}
          onChange={handleInputChange}
        />
        <br></br><br></br>
        <button onClick={isEditing ? handleUpdateFaq : handleAddFaq}>
          {isEditing ? 'Update FAQ' : 'Add FAQ'}
        </button>
      </div>

      {/* Display FAQs */}
      <div className="faq-items">
        {faqData.map((faq) => (
          <div key={faq.id} className="faq-item">
            <img src={faq.imageUrl} className="faq-image" alt="Fruit" />
            <div className="faq-content">
              <h3 className="faq-question">{faq.title}</h3>
              <p className="faq-answer">{faq.content}</p>
              <button className="faq-button" onClick={() => handleEditFaq(faq)}>Edit</button>
              <button className="faq-button" onClick={() => handleDeleteFaq(faq.id)}>Delete</button>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
