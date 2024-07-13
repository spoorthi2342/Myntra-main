'use client'
import React, { useState, useEffect } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await fetch('/greet');
        const data = await response.json();
        addMessage('Maya', data.message);
      } catch (error) {
        console.error('Error fetching greeting:', error);
      }
    };

    fetchGreeting();
  }, []);

  const sendCommand = async () => {
    addMessage('User', userInput);

    if (!userName) {
      setUserName(userInput);
      addMessage('Maya', `Nice to meet you, ${userName}! How can I assist you with your fashion choices today?`);
    } else {
      try {
        const response = await fetch('/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: userInput }),
        });
        const data = await response.json();
        addMessage('Maya', data.response || "I'm not sure about that combination. Could you ask about a different color or style?");
      } catch (error) {
        console.error('Error:', error);
      }
    }

    setUserInput('');
  };

  const addMessage = (sender, message) => {
    setMessages(prevMessages => [...prevMessages, { sender, message }]);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            className={`chat-message ${msg.sender === 'User' ? 'chat-message-user' : 'chat-message-bot'}`}
            key={index}
          >
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type your command..."
      />
      <button className="chat-button" onClick={sendCommand}>Send</button>
      <style jsx>{`
        .chat-container {
          width: 600px;
          height: 700px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          display: flex;
          flex-direction: column;
          margin-top: 50px;
        }
        .chat-box {
          flex-grow: 1;
          overflow-y: scroll;
          border-bottom: 1px solid #ccc;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }
        input[type='text'] {
          width: 80%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          outline: none;
        }
        button {
          padding: 10px 20px;
          background-color: #bf2378;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #800080;
        }
        .chat-message {
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 5px;
        }
        .chat-message-user {
          background-color: #bf2378;
          color: white;
          align-self: flex-end;
          text-align: right;
        }
        .chat-message-bot {
          background-color: #f1f1f1;
          color: black;
          align-self: flex-start;
          text-align: left;
        }
        .chat-button {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
