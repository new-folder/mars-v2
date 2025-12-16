import React, { useState } from 'react';
import './replenish.css';
import { NumericFormat } from 'react-number-format';

const currencyOptions = [
  {
    id: 1,
    logo: "/images/cripto/ton.webp",
    title: "Tether USD",
    subtitle: "USDT"
  },
  {
    id: 2,
    logo: "/images/cripto/cat.webp",
    title: "CatCoin",
    subtitle: "CAT"
  },
  {
    id: 3,
    logo: "/images/cripto/tac.webp",
    title: "TAC",
    subtitle: "TAC"
  },
  {
    id: 4, 
    logo: "/images/cripto/not.webp",
    title: "Notcoin",
    subtitle: "NOT"
  },
  {
    id: 5,
    logo: "/images/cripto/ton.webp",
    title: "TON",
    subtitle: "TON"
  }
];

function CustomSelect({ selected, setSelected }) {
  const [open, setOpen] = useState(false);
  
  const filteredOptions = currencyOptions.filter(option => option.id !== selected.id);

  return (
    <div className="custom-select">
      <div className={`select-header ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
        <img src={selected.logo} alt={selected.title} />
        <div className="select-text">
          <span className="title">{selected.title}</span>
          <span className="subtitle">{selected.subtitle}</span>
        </div>
        <span className="arrow">
          {open ? (
            <img src="/images/select-up.webp" alt="Close" />
          ) : (
            <img src="/images/select-down.webp" alt="Expand" />
          )}
        </span>
      </div>
      {open && (
        <div className="select-list">
          {filteredOptions.map((option) => (
            <div
              key={option.id}
              className="select-item"
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
            >
              <img src={option.logo} alt={option.title} />
              <div className="item-text">
                <span className="title">{option.title}</span>
                <span className="subtitle">{option.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const Replenish = () => {
  const [agreementAccepted] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]);
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);
  
  const fullAddress = "UQADzgycgSyQj1O1iZ0UDLFmE9TNLe2PPVs9-1XuZQ6YzkjQ";
  
  const handleBack = () => {
    console.log('Back button clicked');
  };

  const formatAddress = (address) => {
    if (address.length <= 22) return address; // Если адрес короткий, не обрезаем
    
    const firstPart = address.substring(0, 18);
    const lastPart = address.substring(address.length - 4);
    return `${firstPart}...${lastPart}`;
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setShowCopiedTooltip(true);
      
      // Скрываем тултип через 2 секунды
      setTimeout(() => {
        setShowCopiedTooltip(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy address: ', err);
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea');
      textArea.value = fullAddress;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      setShowCopiedTooltip(true);
      setTimeout(() => {
        setShowCopiedTooltip(false);
      }, 2000);
    }
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

        <div className='replenish-amount'>
          <div className='amount-title'>Amount:</div>     
          <NumericFormat
            disabled
            className="amount-input"
            thousandSeparator=","
            decimalScale={2}
            fixedDecimalScale
            defaultValue={10000.00}
          />
          <span className='amount-currency'>
            USD
          </span>
          <div className='amount-recieve'>You will recieve: 10303.16 USDT </div>
        </div>

        <div className='replenish-currency'>
          <div className='currency-title'>Currency:</div>     
          <CustomSelect 
            selected={selectedCurrency} 
            setSelected={setSelectedCurrency} 
          />
          <div className='currency-recieve'>Exchange rate: 1 USDT = 1.0013 USD</div>
        </div>

        <div className='replenish-address'>
          <div className='address-title'>Address:</div> 
          <div 
            className='address-field'
            onClick={handleCopyAddress}
            style={{ cursor: 'pointer', position: 'relative' }}
          >
            {formatAddress(fullAddress)}
            {showCopiedTooltip && (
              <div className="copied-tooltip">
                Address copied
              </div>
            )}
          </div>
        </div>

        <div className='replenish-warning'>
          Funds will appear in your balance<br /> within a few minutes
        </div>
        
        <div className='replenish-buttons'>        
          <button className={`button-confirm ${agreementAccepted ? 'active' : ''}`}>
            Сonfirm
          </button>      
          <button className={`button-reset ${agreementAccepted ? 'active' : ''}`}>
            Reset wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Replenish;