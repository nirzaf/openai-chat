import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './ChatWindow.css';

function ChatWindow({ messages }) {
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const copyToClipboard = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  return (
    <div className="chat-window" ref={chatWindowRef}>
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.sender}-message`}>
          <div className="message-content">
            <ReactMarkdown>{message.text}</ReactMarkdown>
            <button
              className="copy-button"
              onClick={() => copyToClipboard(message.text)}
            >
              Copy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatWindow;