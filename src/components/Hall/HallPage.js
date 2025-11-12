import React, { useState, useEffect } from 'react';
import './HallPage.css';
import dbData from './db.json';
import HallNft from './HallNft'; 

const HallPage = ({ onBack, onMain, onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState(0);
  const [nfts, setNfts] = useState([]);
  const [showHallNft, setShowHallNft] = useState(false);
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
    setShowHallNft(true);
  };


  if (showHallNft && selectedNFT) {
    return (
      <HallNft 
        nft={selectedNFT} 
      />
    );
  }

  if (!nfts || nfts.length === 0) {
    return <div className="hall-page">No NFTs found</div>;
  }

  const sideIndices = nfts.map((_, index) => index).filter(i => i !== activeIndex);

  return (
    <div className="hall-page">
      
      <div className="back-button arrow-back" onClick={onBack}></div>
      <div className='hall-title'>Choose the planet</div>
      <div className="hall-elements-container">
        {nfts.map((element, index) => {
          const isActive = index === activeIndex;
          const wasActive = index === prevActiveIndex;
          const position = index === sideIndices[0] ? 'left' : 
                          index === sideIndices[1] ? 'right' : 'center';
          
          return (
            <div
              key={element.id}
              className={`hall-element ${element.link}
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
      <div className='hall-info'>
        <div className='hall-text hall-text-large'>Mars
        </div>
        <div className='hall-text'>chosen planet
        </div>
        <div className='hall-text hall-text-large'>56,000,000km
        </div>
        <div className='hall-text'>distance
        </div>
      </div>
    </div>
  );
};

export default HallPage;