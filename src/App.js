// src/App.js
import React from 'react';
import './App.css';
import TimeBasedPage from './components/FirstScreen/TimeBasedPage';
import GettingStart from './components/GettingStarted/Start';

function App() {
  const getCurrentPage = () => {
    const path = window.location.pathname;
    
    if (path === '/getting-started' || path === '/start') {
      return <GettingStart />;
    }
    
    return <TimeBasedPage />;
  };

  return (
    <div className="App">
      {getCurrentPage()}
    </div>
  );
}

export default App;