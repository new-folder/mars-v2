import React, { useState } from 'react';

const InsurancePage = ({ element, onBackExpeditionDetails }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleBackClick = () => {
    if (onBackExpeditionDetails) {
      onBackExpeditionDetails();
    }
  };

  const handleAcceptClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="insurance-page">
      <div className="insurance-header">
        <button className="back-button arrow-back" onClick={handleBackClick}>
        </button>  
      </div>
      
      <div className="insurance-content">
        <h1 className='insurance-title'>
          Exchange Rate <br />
          Drop Protection 
        </h1>
        <p className='insurance-subtitle'>24-Hour Rate Lock: </p>
        <p className='insurance-text'>Lock your rate for just 5%. Your price is protected for 24 hours.</p>
        <p className='insurance-subtitle'>Protect your income:</p>
        <p className='insurance-text'>Pay an insurance premium of 5% of the amount, and we will lock in the current exchange rate for you. If within the next 24 hours the rate changes to your disadvantage, you will be able to execute the exchange at the favorable rate that was active at the time the insurance was purchased.</p>
      
        <div className='insurance-bar'>
          <button className='insurance-accept' onClick={handleAcceptClick}>Accept</button>
          <button className='insurance-refusal' onClick={handleBackClick}>Not now</button>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="popup-close" onClick={handleClosePopup}>
              ×
            </button>
            <div className="popup-content">
              <div className='nft-options'>
                <div className='nft-option'>
                  <p>nft name: <b>elite station</b></p>
                  <p>cost: <b>$100</b></p>
                </div>
                <div className='nft-option'>
                  <p>nft name: <b>elite station</b></p>
                  <p>cost: <b>$100</b></p>
                </div>
                <div className='nft-option'>
                  <p>nft name: <b>elite station</b></p>
                  <p>cost: <b>$100</b></p>
                </div>   
              </div>           
              <div className='nft-total-cost'>
                total cost: $340
              </div>
              <button className="nft-confirm">Сonfirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsurancePage;