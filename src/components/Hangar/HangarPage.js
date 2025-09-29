import React, { useState } from 'react'; // Добавлен импорт useState
import './HangarPage.css';

const HangarPage = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [prevActiveIndex, setPrevActiveIndex] = useState(1);

  const elements = [
    {
      id: 0,
      price: "29$",
      time: "01M:22d:14m:15s",
      type: "mars-rocket"
    },
    {
      id: 1,
      price: "29$",
      time: "01M:22d:14m:15s",
      type: "venus-rocket"
    },
    {
      id: 2,
      price: "29$",
      time: "01M:22d:14m:15s",
      type: "moon-rocket"
    }
  ];

  const handleElementClick = (index) => {
    if (index === activeIndex) return;
    
    setPrevActiveIndex(activeIndex);
    setActiveIndex(index);
  };

  const activeElement = elements[activeIndex];
  const sideIndices = elements.map((_, index) => index).filter(i => i !== activeIndex);

  return (
    <div className="hangar-page">
      {/* Информационный блок */}
      <div className={`hangar-info-block ${activeElement.type}-info`}>
        <p>{activeElement.price}</p>
        <p>cost of the expedition</p>
        <p className="hangar-time">{activeElement.time}</p>
        <p>time to arrive</p>
      </div>

      {/* Контейнер для элементов */}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HangarPage;