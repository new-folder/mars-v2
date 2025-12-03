import React, { useState, useEffect } from 'react';
import './PilotAcademy.css';
import dbData from './db.json';
import Carousel from '../Carousel/Carousel';
import '../Carousel/Carousel.css';

const HallNft = ({ nft }) => {
  const [nftData, setNftData] = useState(nft);
  const [database, setDatabase] = useState(dbData);
  const [activeSpeedIndex, setActiveSpeedIndex] = useState(0);

  useEffect(() => {
    setDatabase(dbData);
  }, []);

  const handleCarouselChange = (index) => {
    setActiveSpeedIndex(index);
  };

  const handleBuyNFT = () => {
    if (!database || !nftData) return;

    // Определяем выбранную скорость на основе активного слайда
    const speedLevels = ['10%', '20%', '30%'];
    const selectedSpeed = speedLevels[activeSpeedIndex];

    const updatedNfts = database.nfts.map(item => 
      item.id === nftData.id ? { 
        ...item, 
        buy: "true",
        speed: selectedSpeed // Сохраняем выбранную скорость
      } : item
    );

    const updatedDatabase = { ...database, nfts: updatedNfts };
    
    setDatabase(updatedDatabase);
    setNftData({ ...nftData, buy: "true", speed: selectedSpeed });
    
    console.log(`NFT ${nftData.fullName} purchased with speed ${selectedSpeed}!`);
  };

  // Получение изображения из planetImages
  const getPlanetImage = (planet, speed) => {
    if (!database || !database.planetImages) return nftData.img;

    const planetData = database.planetImages.find(p => p.planet === planet);
    if (!planetData) return nftData.img;

    // Определяем уровень скорости
    const speedLevel = speed === '10%' ? 1 : speed === '20%' ? 2 : 3;
    
    return planetData.images[speedLevel];
  };

  // Для купленного NFT используем ту же логику получения изображения
  const getPurchasedNFTImage = () => {
    return getPlanetImage(nftData.link, nftData.speed);
  };

  // Генерация данных для карусели 
  const generateCarouselItems = () => {
    const speedLevels = [
      { speed: '10%', label: '+10% efficiency', level: 1 },
      { speed: '20%', label: '+20% efficiency', level: 2 },
      { speed: '30%', label: '+30% efficiency', level: 3 }
    ];

    return speedLevels.map((item, index) => {
      const planetImage = getPlanetImage(nftData.link, item.speed);
      
      return {
        content: (
          <div className={`${nftData.link}-content`}>
            <div className="nft-certificate">
              <h2>NFT Certificate of Ownership</h2>
              
              <div className="nft-image">
                <img 
                  src={planetImage} 
                  alt={`${nftData.fullName} - ${item.speed}`}
                  className={`planet-image speed-${item.level}`}
                />
              </div>
              
              <div className="nft-details">
                <h3>{nftData.fullName}</h3>
                
                <div className="nft-specs">
                  <p className="effect">
                    <span className="label">Effect: </span>
                    <span className="value">{nftData.effect}</span>
                  </p>
                  
                  <p className="linked-planet">
                    <span className="label">Linked planet: </span>
                    <span className="value">{nftData.link}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ),
        label: item.label,
        labelClassName: `label-${nftData.link} speed-${item.level}`
      };
    });
  };

  if (!nftData) {
    return <div>Loading NFT...</div>;
  }

  // Если NFT куплен, показываем одиночную версию
  if (nftData.buy === "true") {
    const purchasedImage = getPurchasedNFTImage();
    
    return (
      <div className={`nft-page`}>
        <div className="back-button arrow-back"></div>
        <div className={`nft-container ${nftData.link}-nft`}>            
          <div className="nft-certificate">
            <h2>NFT Certificate of Ownership</h2>
            
            <div className="nft-image">
              <img 
                src={purchasedImage} 
                alt={nftData.fullName}
                className={`planet-image purchased`}
              />
            </div>
            
            <div className="nft-details">
              <h3>{nftData.fullName}</h3>
              
              <div className="nft-specs">
                
                <p className="effect">
                  <span className="label">Effect: </span>
                  <span className="value">{nftData.effect}</span>
                </p>
                
                <p className="linked-planet">
                  <span className="label">Linked planet: </span>
                  <span className="value">{nftData.link}</span>
                </p>
              </div>
              
              <div className="nft-purchase">
                <div className="already-purchased">
                  <p>01M:22D:13h:06m</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Если NFT не куплен, показываем карусель 
  const carouselItems = generateCarouselItems();
  
  return (
    <div className={`nft-page`}>
      <div className="back-button arrow-back"></div>
      <div className="nft-carousel-section">
        <Carousel 
          items={carouselItems} 
          onActiveIndexChange={handleCarouselChange}
        />
      </div>
      
      <div className="nft-purchase">
        <button 
          className={`buy-button ${nftData.link}-button`}
          onClick={handleBuyNFT}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default HallNft;