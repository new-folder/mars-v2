import React, { useState, useEffect } from 'react';
import HangarPage from '../Hangar/HangarPage';
import HallPage from '../Hall/HallPage'; 
import './TimeBasedPage.css';

const TimeBasedPage = () => {
  const [timeClass, setTimeClass] = useState('');
  const [currentPage, setCurrentPage] = useState('main'); // 'main' или 'hangar'

  useEffect(() => {
    const getCurrentTimeClass = () => {
      const now = new Date();
      const currentHour = now.getHours();
      
      if (currentHour >= 6 && currentHour < 19) {
        return 'day';
      } else {
        return 'night';
      }
    };

    const updateTimeClass = () => {
      const newTimeClass = getCurrentTimeClass();
      setTimeClass(newTimeClass);
    };

    updateTimeClass();
    const intervalId = setInterval(updateTimeClass, 60000);

    return () => clearInterval(intervalId);
  }, []);



if (currentPage === 'hangar') {
  return <HangarPage onBack={() => setCurrentPage('main')} />;
}

if (currentPage === 'hall') {
  return <HallPage onBack={() => setCurrentPage('main')} />;
}

  return (
    <div className={`time-based-page ${timeClass}`}>
      <div className='main-square'>
        <div className='main-elements'>
            <div className='cargo-academy'></div>
            <div className='pilot-academy'></div>
            <div className='call-station'></div>
            <div className='corporate_center'></div>
            <div className='bank'></div>
            <div className='hall' onClick={() => setCurrentPage('hall')}></div>
            <div className='hangar' onClick={() => setCurrentPage('hangar')}></div>
            <div className='launchpad'></div>
            <div className='road'></div>
        </div>
      </div>
    </div>
  );
};

export default TimeBasedPage;