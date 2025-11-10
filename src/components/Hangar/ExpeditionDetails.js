import React, { useState } from 'react';
import './HangarPage.css';
import hangarData from './hangarData.json';
import InsurancePage from './ExpeditionInsurance'; // Импортируем InsurancePage

const ExpeditionDetails = ({ element, onBack, onNavigateToInsurance, onBackFromInsurance }) => {
  const [rocketParts, setRocketParts] = useState(() => {
    const initialRocketData = hangarData.elements.find(rocket => 
      rocket.id === element.id || rocket.type === element.type
    ) || hangarData.elements[0];
    
    return initialRocketData.parts.map(part => ({
      ...part,
      status: part.status || 'close' 
    }));
  });

  // Добавляем состояние для отображения страницы страхования
  const [showInsurance, setShowInsurance] = useState(false);

  // Обработчик переключения статуса элемента
  const togglePartStatus = (partIndex) => {
    setRocketParts(prevParts => 
      prevParts.map((part, index) => 
        index === partIndex 
          ? { ...part, status: part.status === 'close' ? 'open' : 'close' }
          : part
      )
    );
  };

  // Обработчик клика по кнопке запуска - теперь показываем InsurancePage
  const handleLaunchClick = () => {
    setShowInsurance(true);
  };

  // Обработчик возврата из InsurancePage
  const handleBackFromInsurance = () => {
    setShowInsurance(false);
    if (onBackFromInsurance) {
      onBackFromInsurance();
    }
  };

  const rocketType = hangarData.elements.find(rocket => 
    rocket.id === element.id || rocket.type === element.type
  )?.type || hangarData.elements[0].type;

  // Если нужно показать страницу страхования
  if (showInsurance) {
    return (
      <InsurancePage 
        element={element} 
        onBackExpeditionDetails={handleBackFromInsurance} 
      />
    );
  }

  return (
    <div className={`expedition-details expedition-details-${element.type}`}>
      <div className="expedition-header">
        <div className="back-button arrow-back" onClick={onBack}>
        </div>
      </div>
      
      <div className="expedition-content">
        <div className="expedition-nft">
            <div className='expedition-nft-item unactive'>
                <img src='../images/nft-mars.jpg' alt="Предмет экспедиции 1"/>
            </div>
            <div className='expedition-nft-item'>
                <img src='../images/nft-venus.jpg' alt="Предмет экспедиции 2"/>
            </div>
            <div className='expedition-nft-item'>
                <img src='../images/nft-moon.jpg' alt="Предмет экспедиции 3"/>
            </div>
        </div>
        
        <div className={`expedition-rocket expedition-${rocketType}`}>
          <div className="rocket-parts">
            {rocketParts.map((part, index) => (
              <div 
                key={part.id}
                className={`${rocketType}-part-${index + 1} ${part.status}`}
              >
              </div>
            ))}
          </div>
        </div>
        
        <div className={`expedition-options expedition-options-${rocketType}`}>
            {rocketParts.slice(0, 4).map((part, index) => (
              <label key={part.id} className={`part-control part-control-${part.status}`}>
                <input
                  type="checkbox"
                  checked={part.status === 'open'}
                  onChange={() => togglePartStatus(index)}
                  className="part-checkbox"
                />
                <span className={`part-control-label`}>
                  {part.name} 
                </span>
              </label>
            ))}
        </div>
        <div className={`expedition-cost expedition-cost-${rocketType}`}>total cost of the expedition <span className={`expedition-cost-count`}>$29</span></div>
        <button 
          className={`launch-btn launch-btn-${element.type}`}
          onClick={handleLaunchClick}
        >
          Ready to launch
        </button>
      </div>
    </div>
  );
};

export default ExpeditionDetails;