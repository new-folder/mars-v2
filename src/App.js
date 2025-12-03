// src/App.js
import React from 'react';
import './App.css';
import TimeBasedPage from './components/FirstScreen/TimeBasedPage';
import GettingReplenish from './components/Replenish/ReplenishScreen';

function App() {
  const getCurrentPage = () => {
    const path = window.location.pathname;
    
    if (path === '/getting-replenish' || path === '/replenish') {
      return <GettingReplenish />;
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