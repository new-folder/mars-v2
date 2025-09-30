import React, { useState, useEffect } from 'react';
import './HallPage.css';
import dbData from './db.json';
import HallNft from './HallNft'; 

const HallPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState(0);
  const [nfts, setNfts] = useState([]);
  const [showHallNft, setShowHallNft] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);

  useEffect(() => {
    setNfts(dbData.nfts);
  }, []);

  const handleElementClick = (index) => {
    if (index === activeIndex) return;
    setPrevActiveIndex(activeIndex);
    setActiveIndex(index);
  };

  // Обработчик для показа детальной страницы NFT
  const handleNFTClick = (nft) => {
    setSelectedNFT(nft);
    setShowHallNft(true);
  };

  // Если показываем HallNft, рендерим его
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

  const activeElement = nfts[activeIndex];
  const sideIndices = nfts.map((_, index) => index).filter(i => i !== activeIndex);

  return (
    <div className="hall-page">
      <div 
        className={`nft-card nft-${activeElement.link}`}
        onClick={() => handleNFTClick(activeElement)}
      >
        <p>{activeElement.name}</p>
        <img 
          src={activeElement.img} 
          alt={activeElement.name}
          className="hall-nft-image"
        />
        <p className="hall-time">{activeElement.bonus}</p>
      </div>

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
    </div>
  );
};

export default HallPage;