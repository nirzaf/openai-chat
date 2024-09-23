import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar({ tokenCount, updateTokenCount, updateContext }) {
  const [context, setContext] = useState('');

  const handleChange = (event) => {
    setContext(event.target.value);
    updateTokenCount(countTokens(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateContext(context);
    setContext('');
  };

  const countTokens = (text) => {
    return Math.ceil(text.length / 4);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Additional Context</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="context-input"
          value={context}
          onChange={handleChange}
          placeholder="Paste additional context here..."
        />
        <div className="token-count">
          Token Count: {tokenCount}
        </div>
        <button type="submit" className="submit-button">
          Add Context
        </button>
      </form>
    </div>
  );
}

export default Sidebar;