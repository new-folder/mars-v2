import React, { useState, useEffect } from 'react';
import './HallPage.css';
import dbData from './db.json';
import Carousel from '../Carousel/Carousel';
import '../Carousel/Carousel.css';

const HallNft = ({ nft }) => {
  const [nftData, setNftData] = useState(nft);
  const [database, setDatabase] = useState(dbData);

  useEffect(() => {
    setDatabase(dbData);
  }, []);

  const handleBuyNFT = () => {
    if (!database || !nftData) return;

    const updatedNfts = database.nfts.map(item => 
      item.id === nftData.id ? { ...item, buy: "true" } : item
    );

    const updatedDatabase = { ...database, nfts: updatedNfts };
    
    setDatabase(updatedDatabase);
    setNftData({ ...nftData, buy: "true" });
    
    console.log(`NFT ${nftData.fullName} purchased!`);
  };

  // Данные для карусели Mars
  const marsCarouselItems = [
    {
      content: (
        <div className="mars-content">
          <div className="nft-certificate">
            <h2>NFT Certificate of Ownership</h2>
            
            <div className="nft-image">
              <img 
                src={nftData.img} 
                alt={nftData.fullName}
              />
            </div>
            
            <div className="nft-details">
              <h3>{nftData.fullName}</h3>
              
              <div className="nft-specs">
                <p className="speed">
                  <span className="value">10% speed</span>
                </p>
                
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
      label: '+10% speed'
    },
    {
      content: (
        <div className="mars-content">
          <div className="nft-certificate">
            <h2>NFT Certificate of Ownership</h2>
            
            <div className="nft-image">
              <img 
                src={nftData.img} 
                alt={nftData.fullName}
              />
            </div>
            
            <div className="nft-details">
              <h3>{nftData.fullName}</h3>
              
              <div className="nft-specs">
                <p className="speed">
                  <span className="value">20% speed</span>
                </p>
                
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
      label: '+20% speed'
    },
    {
      content: (
        <div className="mars-content">
          <div className="nft-certificate">
            <h2>NFT Certificate of Ownership</h2>
            
            <div className="nft-image">
              <img 
                src={nftData.img} 
                alt={nftData.fullName}
              />
            </div>
            
            <div className="nft-details">
              <h3>{nftData.fullName}</h3>
              
              <div className="nft-specs">
                <p className="speed">
                  <span className="value">30% speed</span>
                </p>
                
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
      label: '+30% speed'
    }
  ];

  // Данные для карусели Moon
  const moonCarouselItems = [
    {
      content: (
        <div className="moon-content">
          <div className="nft-certificate">
            <h2>NFT Certificate of Ownership</h2>
            
            <div className="nft-image">
              <img 
                src={nftData.img} 
                alt={nftData.fullName}
              />
            </div>
            
            <div className="nft-details">
              <h3>{nftData.fullName}</h3>
              
              <div className="nft-specs">
                <p className="speed">
                  <span className="value">{nftData.speed} speed</span>
                </p>
                
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
      label: '+10% speed'
    },
    {
      content: (
        <div className="moon-content">
          <div className="nft-certificate">
            <h2>NFT Certificate of Ownership</h2>
            
            <div className="nft-image">
              <img 
                src={nftData.img} 
                alt={nftData.fullName}
              />
            </div>
            
            <div className="nft-details">
              <h3>{nftData.fullName}</h3>
              
              <div className="nft-specs">
                <p className="speed">
                  <span className="value">{nftData.speed} speed</span>
                </p>
                
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
      label: '+20% speed'
    },
    {
      content: (
        <div className="moon-content">
          <div className="nft-certificate">
            <h2>NFT Certificate of Ownership</h2>
            
            <div className="nft-image">
              <img 
                src={nftData.img} 
                alt={nftData.fullName}
              />
            </div>
            
            <div className="nft-details">
              <h3>{nftData.fullName}</h3>
              
              <div className="nft-specs">
                <p className="speed">
                  <span className="value">{nftData.speed} speed</span>
                </p>
                
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
      label: '+30% speed'
    }
  ];

  if (!nftData) {
    return <div>Loading NFT...</div>;
  }

  // Рендерим карусель для Mars и Moon
  if (nftData.link === 'mars' || nftData.link === 'moon') {
    const carouselItems = nftData.link === 'mars' ? marsCarouselItems : moonCarouselItems;
    
    return (
      <div className={`nft-page`}>
        <div className="back-button arrow-back"></div>
          {/* Карусель для Mars/Moon */}
          <div className="nft-carousel-section">
            <Carousel items={carouselItems} />
          </div>
          
          {/* Блок с информацией об NFT */}
              
              <div className="nft-purchase">
                {nftData.buy === "true" ? (
                  <div className="already-purchased">
                    <p>01M:22D:13h:06m</p>
                  </div>
                ) : (
                  <button 
                    className="buy-button"
                    onClick={handleBuyNFT}
                  >
                    Buy
                  </button>
                )}
              </div>
      </div>
    );
  }

  // Для Venus
  return (
    <div className={`nft-page`}>
      <div className="back-button arrow-back"></div>
      <div className={`nft-container ${nftData.link}-nft`}>            
        <div className="nft-certificate">
          <h2>NFT Certificate of Ownership</h2>
          
          <div className="nft-image">
            <img 
              src={nftData.img} 
              alt={nftData.fullName}
            />
          </div>
          
          <div className="nft-details">
            <h3>{nftData.fullName}</h3>
            
            <div className="nft-specs">
              <p className="speed">
                <span className="value">{nftData.speed} speed</span>
              </p>
              
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
              {nftData.buy === "true" ? (
                <div className="already-purchased">
                  <p>01M:22D:13h:06m</p>
                </div>
              ) : (
                <button 
                  className="buy-button"
                  onClick={handleBuyNFT}
                >
                  Buy
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HallNft;