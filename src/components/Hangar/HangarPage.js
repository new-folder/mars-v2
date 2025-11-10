import React, { useState, useEffect } from 'react';
import './HangarPage.css';
import hangarData from './hangarData.json';
import ExpeditionDetails from './ExpeditionDetails';

const HangarPage = ({ onBack, onMain, onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [prevActiveIndex, setPrevActiveIndex] = useState(1);
  const [elements, setElements] = useState([]);
  const [showExpeditionDetails, setShowExpeditionDetails] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    setElements(hangarData.elements);
  }, []);

  const handleNavigateToInsurance = (element) => {
    if (onNavigate) {
      onNavigate('insurance', { rocketElement: element });
    }
  };

  const handleElementClick = (index) => {
    if (index === activeIndex) {
      handleExpeditionClick(elements[index]);
    } else {
      setPrevActiveIndex(activeIndex);
      setActiveIndex(index);
    }
  };

  const handleExpeditionClick = (element) => {
    setSelectedElement(element);
    setShowExpeditionDetails(true);
  };

  const handleBackFromExpedition = () => {
    setShowExpeditionDetails(false);
    setSelectedElement(null);
  };

  // Добавляем обработчик возврата из InsurancePage
  const handleBackFromInsurance = () => {
    setShowExpeditionDetails(true);
  };

  if (showExpeditionDetails && selectedElement) {
    return (
      <ExpeditionDetails 
        element={selectedElement} 
        onBack={handleBackFromExpedition}
        onNavigateToInsurance={handleNavigateToInsurance}
        onBackFromInsurance={handleBackFromInsurance} // Передаем колбэк
      />
    );
  }

  if (elements.length === 0) {
    return <div className="hangar-page">Loading...</div>;
  }

  const activeElement = elements[activeIndex];
  const sideIndices = elements.map((_, index) => index).filter(i => i !== activeIndex);

  return (
    <div className="hangar-page">
      <div className="back-button arrow-back" onClick={onBack}>
      </div>
      
      <div 
        className={`hangar-info-block ${activeElement.type}-info active-expedition`}
        onClick={() => handleExpeditionClick(activeElement)}
      >
        <p className="hangar-info-main">{activeElement.price}</p>
        <p>cost of the expedition</p>
        <p className="hangar-info-main">{activeElement.time}</p>
        <p>time to arrive</p>
      </div>

      <div className="hangar-elements-container">
        {elements.map((element, index) => {
          const isActive = index === activeIndex;
          const wasActive = index === prevActiveIndex;
          const position = index === sideIndices[0] ? 'left' : 
                          index === sideIndices[1] ? 'right' : 'center';
          
          return (
            <div
              key={element.id}
              className={`hangar-element ${element.type}
                ${isActive ? 'hangar-element-active' : 'hangar-element-side'}
                ${position}
                ${wasActive && !isActive ? 'sliding-out' : ''}
                ${!wasActive && isActive ? 'sliding-in' : ''}`}
              onClick={() => handleElementClick(index)}
            >
              {!isActive && (
                <div className="side-element-preview">
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HangarPage;