import React, { useState } from 'react';
import './start.css';

const Start = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [agreementAccepted, setAgreementAccepted] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setName(value);
    
    // Простая валидация (если не нужна, снеси)
    if (value.length > 0 && value.length < 2) {
      setError('Имя должно содержать минимум 2 символа');
    } else {
      setError('');
    }
  };

  const handleBack = () => {
    console.log('Back button clicked');
  };

  const handleAgreementChange = (e) => {
    setAgreementAccepted(e.target.checked);
  };

  return (
    <div className="start-page">
      <div className="start-header">
        <button className="back-button arrow-back" onClick={handleBack}>
        </button>  
      </div>
      
      <div className="start-content">
        <h1 className='start-title'>
          Getting Started
        </h1>

        <div className='start-name'>
          <div className='name-title'>Edit nickname:</div>     
          <input 
            id="name"
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="user1234"
            className={"name-input"}
          />
          {error && <div className="error-message">{error}</div>}
        </div>

        <div className='start-agreement'>
            <div className='agreement-title'>User Agreement:</div>    
            <div className='agreement-text'>
                <p>Pay an insurance premium of 5% of the amount, and we will lock in the current exchange rate for you. If within the next 24 hours the rate changes to your disadvantage, you will be able to execute the exchange at the favorable rate that was active at the time the insurance was purchased. Pay an insurance premium of 5% of the amount, and we will lock in the current exchange rate for you. If within the next 24 hours the rate changes to your disadvantage, you will be able to execute the exchange at the favorable rate that was active at the time the insurance was purchased. Pay an insurance premium of 5% of the amount, and we will lock in the current exchange rate for you. If within the next 24 hours the rate changes to your disadvantage, you will be able to execute the exchange at the favorable rate that was active at the time the insurance was purchased.</p>
                
                <div className="agreement-accept">
                  <input 
                    type="checkbox" 
                    id="agreement-checkbox"
                    checked={agreementAccepted}
                    onChange={handleAgreementChange}
                  />
                  <label htmlFor="agreement-checkbox">
                    I accept the User Agreement
                  </label>
                </div>
            </div>  
        </div>
        
        <button className={`start-button ${agreementAccepted ? 'active' : ''}`}>
          Start
        </button>
      </div>
    </div>
  );
};

export default Start;