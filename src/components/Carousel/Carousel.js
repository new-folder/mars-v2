import React, { useState } from 'react';
import './Carousel.css'; // Стили вынесены в отдельный файл

const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const handleRadioChange = (index) => {
    setActiveIndex(index);
  };

  const getItemClassName = (index) => {
    if (index === activeIndex) return 'carousel-item active';
    if (index === (activeIndex - 1 + items.length) % items.length) return 'carousel-item left';
    if (index === (activeIndex + 1) % items.length) return 'carousel-item right';
    return 'carousel-item hidden';
  };

  // Создаем массив контролов с выбранным элементом на второй позиции
  const getOrderedControls = () => {
    if (items.length <= 1) return items.map((_, index) => index);
    
    const controls = [];
    for (let i = 0; i < items.length; i++) {
      if (i !== activeIndex) {
        controls.push(i);
      }
    }
    
    // Вставляем активный индекс на вторую позицию
    controls.splice(1, 0, activeIndex);
    return controls;
  };

  const orderedControls = getOrderedControls();

  return (
    <div className="carousel-container">
      <div className="carousel">
        {items.map((item, index) => (
          <div
            key={index}
            className={getItemClassName(index)}
            onClick={() => handleItemClick(index)}
            style={{ transition: 'all 0.3s ease' }} // Добавлена анимация
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
            className="control-label"
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