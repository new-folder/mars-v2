import React, { useState } from 'react'; // Добавлен импорт useState
import './HallPage.css';

const HallPage = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [prevActiveIndex, setPrevActiveIndex] = useState(1);

  const elements = [
    {
      id: 0,
      name: "NFT Name",
      bonus: "20% bonus 3x power for the flight",
      img: '../images/nft-mars.jpg',
      type: "mars"
    },
    {
      id: 1,
      name: "NFT Name",
      bonus: "20% bonus 3x power for the flight",
      img: '../images/nft-moon.jpg',
      type: "moon"
    },
    {
      id: 2,
      name: "NFT Name",
      bonus: "20% bonus 3x power for the flight",
      img: '../images/nft-venus.jpg',
      type: "venus"
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
    <div className="hall-page">
      {/* Информационный блок */}
      <div className={`nft-card nft-${activeElement.type}`}>
        <p>{activeElement.name}</p>
        <img 
            src={activeElement.img} 
            alt={activeElement.name}
            className="rocket-image"
          />
        <p className="hall-time">{activeElement.bonus}</p>
      </div>

      {/* Контейнер для элементов */}
      <div className="hall-elements-container">
        {elements.map((element, index) => {
          const isActive = index === activeIndex;
          const wasActive = index === prevActiveIndex;
          const position = index === sideIndices[0] ? 'left' : 
                          index === sideIndices[1] ? 'right' : 'center';
          
          return (
            <div
              key={element.id}
              className={`hall-element ${element.type}
                ${isActive ? 'hall-element-active' : 'hall-element-side'}
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

export default HallPage;