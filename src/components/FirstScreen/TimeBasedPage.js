import React, { useState, useEffect } from 'react';
import HangarPage from '../Hangar/HangarPage';
import HallPage from '../Hall/HallPage';
import CargoAcademy from '../CargoAcademy/CargoAcademy';
import PilotAcademy from '../PilotAcademy/PilotAcademy';
import CallStation from '../CallStation/CallStation';
import CorporateCenter from '../CorporateCenter/CorporateCenter';
import Bank from '../Bank/Bank';
import ExpeditionInsurance from '../Hangar/ExpeditionInsurance'; 
import './TimeBasedPage.css';

const TimeBasedPage = () => {
  const [timeClass, setTimeClass] = useState('');
  const [currentPage, setCurrentPage] = useState('main');
  const [pageHistory, setPageHistory] = useState(['main']);
  const [pageProps, setPageProps] = useState({}); 

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

  // Функция для перехода на страницу с параметрами
  const navigateTo = (page, props = {}) => {
    setCurrentPage(page);
    setPageHistory(prev => [...prev, page]);
    setPageProps(props); // Сохраняем пропсы для следующей страницы
  };

  // Функция для возврата назад
  const goBack = () => {
    if (pageHistory.length > 1) {
      const newHistory = [...pageHistory];
      newHistory.pop(); // Удаляем текущую страницу
      const previousPage = newHistory[newHistory.length - 1];
      setCurrentPage(previousPage);
      setPageHistory(newHistory);
      setPageProps({}); // Очищаем пропсы при возврате
    }
  };

  // Функция для возврата на главную
  const goToMain = () => {
    setCurrentPage('main');
    setPageHistory(['main']);
    setPageProps({});
  };

  // Пропс для передачи в дочерние компоненты
  const navigationProps = {
    onBack: goBack,
    onMain: goToMain,
    onNavigate: navigateTo // Теперь передаем улучшенную функцию
  };

  // Рендер главной страницы
  const renderMainPage = () => (
    <div className={`time-based-page ${timeClass}`}>
      <div className='main-square'>
        <div className='main-elements'>
          <div className='cargo-academy' onClick={() => navigateTo('cargo')}></div>
          <div className='pilot-academy' onClick={() => navigateTo('pilot')}></div>
          <div className='call-station' onClick={() => navigateTo('station')}></div>
          <div className='corporate_center' onClick={() => navigateTo('corporate')}></div>
          <div className='bank' onClick={() => navigateTo('bank')}></div>
          <div className='hall' onClick={() => navigateTo('hall')}></div>
          <div className='hangar' onClick={() => navigateTo('hangar')}></div>
          <div className='launchpad'></div>
          <div className='road'></div>
        </div>
      </div>
    </div>
  );

  // Рендер текущей страницы
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'hangar':
        return <HangarPage {...navigationProps} />;
      case 'hall':
        return <HallPage {...navigationProps} />;
      case 'cargo':
        return <CargoAcademy {...navigationProps} />;
      case 'pilot':
        return <PilotAcademy {...navigationProps} />;
      case 'station':
        return <CallStation {...navigationProps} />;
      case 'corporate':
        return <CorporateCenter {...navigationProps} />;
      case 'bank':
        return <Bank {...navigationProps} />;
      case 'insurance': 
        return <ExpeditionInsurance 
          {...navigationProps} 
          rocketElement={pageProps.rocketElement} 
        />;
      case 'main':
      default:
        return renderMainPage();
    }
  };

  return renderCurrentPage();
};

export default TimeBasedPage;