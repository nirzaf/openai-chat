import React, { useState } from 'react';
import './MessageInput.css';

function MessageInput({ onSendMessage, updateTokenCount }) {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
    updateTokenCount(countTokens(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
      updateTokenCount(0); // Reset token count after sending the message
    }
  };

  const countTokens = (text) => {
    return Math.ceil(text.length / 4);
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Enter your prompt..."
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageInput;