import React, { useState, useRef, useCallback, useEffect } from 'react';
import './Carousel.css';

const Carousel = ({ items, onActiveIndexChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);

  // Минимальное расстояние свайпа для срабатывания
  const minSwipeDistance = 0;

  // Уведомляем родительский компонент об изменении активного индекса
  useEffect(() => {
    if (onActiveIndexChange) {
      onActiveIndexChange(activeIndex);
    }
  }, [activeIndex, onActiveIndexChange]);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const handleRadioChange = (index) => {
    setActiveIndex(index);
  };

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % items.length);
  }, [items.length]);

  const goToPrev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  }, [items.length]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
  };

  // Обработчики для мыши (для десктопов)
  const onMouseDown = (e) => {
    setTouchEnd(null);
    setTouchStart(e.clientX);
  };

  const onMouseMove = (e) => {
    if (touchStart === null) return;
    setTouchEnd(e.clientX);
  };

  const onMouseUp = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
    
    // Сброс значений
    setTouchStart(null);
    setTouchEnd(null);
  };

  const getItemClassName = (index) => {
    if (index === activeIndex) return 'carousel-item active';
    if (index === (activeIndex - 1 + items.length) % items.length) return 'carousel-item left';
    if (index === (activeIndex + 1) % items.length) return 'carousel-item right';
    return 'carousel-item hidden';
  };

  const getLabelClassName = (index) => {
    let className = 'control-label';
    
    if (items[index]?.labelClassName) {
      className += ` ${items[index].labelClassName}`;
    }
    
    if (index === activeIndex) {
      className += ' active';
    }
    
    return className;
  };

  const getOrderedControls = () => {
    if (items.length <= 1) return items.map((_, index) => index);
    
    const controls = [];
    for (let i = 0; i < items.length; i++) {
      if (i !== activeIndex) {
        controls.push(i);
      }
    }
    
    controls.splice(1, 0, activeIndex);
    return controls;
  };

  const orderedControls = getOrderedControls();

  return (
    <div className="carousel-container">
      <div 
        className="carousel"
        ref={carouselRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp} // Если курсор вышел за пределы элемента
        style={{ cursor: 'grab' }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={getItemClassName(index)}
            onClick={() => handleItemClick(index)}
            style={{ transition: 'all 0.3s ease' }}
          >
            {item.content}
          </div>
        ))}
      </div>
      
      <div className="carousel-controls">
        {orderedControls.map((controlIndex) => (
          <label
            key={controlIndex}
            htmlFor={`carousel-radio-${controlIndex}`}
            className={getLabelClassName(controlIndex)}
          >
            <input
              type="radio"
              name="carousel-radio"
              className="control-radio"
              checked={controlIndex === activeIndex}
              onChange={() => handleRadioChange(controlIndex)}
              id={`carousel-radio-${controlIndex}`}
              hidden
            />
            {items[controlIndex].label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Carousel;