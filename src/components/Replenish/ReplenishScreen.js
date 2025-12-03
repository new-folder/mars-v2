import React, { useState } from 'react';
import './replenish.css';
import CurrencyInput from '../CurrencyInput/CurrencyInput';

const Replenish = () => {
  const [amount, setAmount] = useState('');
  // Убрали неиспользуемые переменные
  const [agreementAccepted, setAgreementAccepted] = useState(false);

  const handleAmountChange = (formattedValue, numericValue) => {
    setAmount(formattedValue);
    console.log('Formatted:', formattedValue, 'Numeric:', numericValue);
  };

  const handleBack = () => {
    console.log('Back button clicked');
  };

  const handleAgreementChange = (e) => {
    setAgreementAccepted(e.target.checked);
  };

  return (
    <div className="replenish-page">
      <div className="replenish-header">
        <button className="back-button arrow-back" onClick={handleBack}>
        </button>  
      </div>
        <h1 className='replenish-title'>
          Replenish funds
        </h1>
        <p className='replenish-subtitle'>
          Select the required currency
        </p>
      
      <div className="replenish-content">

        <div className='replenish-name'>
          <div className='name-title'>Amount:</div>     
          <CurrencyInput 
            value={amount}
            onChange={handleAmountChange}
            placeholder="0"
            className="name-input"
            decimalScale={2}
            maxLength={15}
          />
        </div>

        <div className='replenish-agreement'>
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
        
        <button className={`replenish-button ${agreementAccepted ? 'active' : ''}`}>
          Start
        </button>
      </div>
    </div>
  );
};

export default Replenish;