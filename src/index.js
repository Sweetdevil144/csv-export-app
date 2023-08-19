import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ConnectingDots from './components/ConnectingDots';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConnectingDots />
    <App />
  </React.StrictMode>
);

