  import React, { useState, useEffect } from 'react';
  import './CredentialManager.css';

  function CredentialManager({ onCredentialsChange }) {
    const [apiKey, setApiKey] = useState('');
    const [apiEndpoint, setApiEndpoint] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
      const loadCredentials = () => {
        const storedApiKey = localStorage.getItem('apiKey');
        const storedApiEndpoint = localStorage.getItem('apiEndpoint');
        if (storedApiKey) setApiKey(storedApiKey);
        if (storedApiEndpoint) setApiEndpoint(storedApiEndpoint);
        onCredentialsChange({ apiKey: storedApiKey, apiEndpoint: storedApiEndpoint });
      };
      loadCredentials();
    }, [onCredentialsChange]);

    const saveCredentials = () => {
      localStorage.setItem('apiKey', apiKey);
      localStorage.setItem('apiEndpoint', apiEndpoint);
      onCredentialsChange({ apiKey, apiEndpoint });
      setApiKey('');
      setApiEndpoint('');
      setIsExpanded(false);
    };

    const clearCredentials = () => {
      localStorage.removeItem('apiKey');
      localStorage.removeItem('apiEndpoint');
      setApiKey('');
      setApiEndpoint('');
      onCredentialsChange({ apiKey: '', apiEndpoint: '' });
    };

    return (
      <div className={`credential-manager ${isExpanded ? 'expanded' : ''}`}>
        <button className="expand-button" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '◀' : '▶'}
        </button>
        {isExpanded && (
          <div className="credential-inputs">
            <h3>API Credentials</h3>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API Key"
            />
            <input
              type="text"
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
              placeholder="Enter API Endpoint URL"
            />
            <button onClick={saveCredentials}>Save</button>
            <button onClick={clearCredentials}>Clear</button>
          </div>
        )}
      </div>
    );
  }

  export default CredentialManager;