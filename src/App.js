import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import Sidebar from './Sidebar';
import CredentialManager from './CredentialManager';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [messages, setMessages] = useState([]);
  const [tokenCount, setTokenCount] = useState(0);
  const [additionalContext, setAdditionalContext] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    loadCredentials();
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(systemTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const loadCredentials = () => {
    const storedApiKey = localStorage.getItem('apiKey');
    const storedApiEndpoint = localStorage.getItem('apiEndpoint');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
    if (storedApiEndpoint) {
      setApiEndpoint(storedApiEndpoint);
    }
  };

  const onCredentialsChange = ({ apiKey, apiEndpoint }) => {
    setApiKey(apiKey);
    setApiEndpoint(apiEndpoint);
  };

  const handleSendMessage = async (message) => {
    setMessages([...messages, { text: message, sender: 'user' }]);
    
    const context = `Additional Context:\n${additionalContext}`;
    
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a helpful assistant. Use the following context to answer questions:\n\n" + context },
            { role: "user", content: message }
          ]
        })
      });

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        setMessages(prevMessages => [...prevMessages, { text: data.choices[0].message.content, sender: 'bot' }]);
      } else {
        console.error("Unexpected response format:", data);
        setMessages(prevMessages => [...prevMessages, { text: "An error occurred. Please try again later.", sender: 'bot' }]);
      }
    } catch (error) {
      console.error("Error sending request:", error);
      setMessages(prevMessages => [...prevMessages, { text: "An error occurred. Please try again later.", sender: 'bot' }]);
    }
  };

  const updateTokenCount = (count) => {
    setTokenCount(count);
  };

  const updateContext = (newContext) => {
    setAdditionalContext((prevContext) => prevContext + '\n' + newContext);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-container">
      <CredentialManager onCredentialsChange={onCredentialsChange} />
      <Sidebar tokenCount={tokenCount} updateTokenCount={updateTokenCount} updateContext={updateContext} />
      <div className="chat-area">
        <h3>Azure OpenAI Chatbot</h3>
        <ChatWindow messages={messages} contextFiles={[{ name: 'Additional Context', content: additionalContext }]} />
        <MessageInput onSendMessage={handleSendMessage} updateTokenCount={updateTokenCount} />
        <button onClick={toggleTheme} className="theme-toggle-button">
          <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
        </button>
      </div>
    </div>
  );
}

export default App;