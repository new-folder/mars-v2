import React, { useState, useEffect } from 'react';
import './PilotAcademy.css';
import dbData from './db.json';
import AcademyNft from './PilotAcademyNft'; 

const PilotAcademy = ({ onBack, onMain, onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState(0);
  const [nfts, setNfts] = useState([]);
  const [showAcademyNft, setShowAcademyNft] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);

  useEffect(() => {
    setNfts(dbData.nfts);
  }, []);

  const handleElementClick = (index) => {
    if (index === activeIndex) {
      // Если кликаем на уже активный элемент - открываем детальную страницу
      handleNFTClick(nfts[index]);
      return;
    }
    setPrevActiveIndex(activeIndex);
    setActiveIndex(index);
  };

  // Обработчик для показа детальной страницы NFT
  const handleNFTClick = (nft) => {
    setSelectedNFT(nft);
    setShowAcademyNft(true);
  };


  if (showAcademyNft && selectedNFT) {
    return (
      <AcademyNft 
        nft={selectedNFT} 
      />
    );
  }

  const sideIndices = nfts.map((_, index) => index).filter(i => i !== activeIndex);

  return (
    <div className="academy-page">
      
      <div className="back-button arrow-back" onClick={onBack}></div>
      <div className='academy-title'>Select flight direction</div>
      <div className="academy-elements-container">
        {nfts.map((element, index) => {
          const isActive = index === activeIndex;
          const wasActive = index === prevActiveIndex;
          const position = index === sideIndices[0] ? 'left' : 
                          index === sideIndices[1] ? 'right' : 'center';
          
          return (
            <div
              key={element.id}
              className={`academy-element ${element.link}
                ${isActive ? 'academy-element-active' : 'academy-element-side'}
                ${position}
                ${wasActive && !isActive ? 'sliding-out' : ''}
                ${!wasActive && isActive ? 'sliding-in' : ''}`}
              onClick={() => handleElementClick(index)}
            >
            </div>
          );
        })}
      </div>
      <div className='academy-info'>
        <div className='academy-text academy-text-large'>Mars
        </div>
        <div className='academy-text'>chosen planet
        </div>
        <div className='academy-text academy-text-large'>56,000,000km
        </div>
        <div className='academy-text'>distance
        </div>
      </div>
    </div>
  );
};

export default PilotAcademy;