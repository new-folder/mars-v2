import React, { useState, useRef, useEffect, useCallback } from 'react';

const CurrencyInput = ({
  value = '',
  onChange,
  placeholder = '0',
  maxLength,
  disabled = false,
  decimalSeparator = '.',
  thousandSeparator = ',',
  decimalScale = 2,
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState('');
  const inputRef = useRef(null);
  const isUpdatingRef = useRef(false);

  // Форматирование числа
  const formatNumber = useCallback((num) => {
    if (num === '' || num === null || num === undefined) return '';
    
    const str = num.toString();
    // Очищаем от всего, кроме цифр и первой точки
    let clean = str.replace(/[^\d.]/g, '');
    const firstDotIndex = clean.indexOf('.');
    if (firstDotIndex !== -1) {
      clean = clean.slice(0, firstDotIndex + 1) + clean.slice(firstDotIndex + 1).replace(/\./g, '');
    }
    
    const [integerPart = '', decimalPart = ''] = clean.split('.');
    
    // Форматируем целую часть с разделителями тысяч
    let formattedInteger = '';
    for (let i = integerPart.length - 1, count = 0; i >= 0; i--) {
      formattedInteger = integerPart[i] + formattedInteger;
      count++;
      if (count === 3 && i > 0) {
        formattedInteger = thousandSeparator + formattedInteger;
        count = 0;
      }
    }
    
    // Обрабатываем десятичную часть
    if (decimalPart !== undefined) {
      const limitedDecimal = decimalPart.slice(0, decimalScale);
      return `${formattedInteger}${decimalSeparator}${limitedDecimal}`;
    }
    
    return formattedInteger || '';
  }, [decimalSeparator, thousandSeparator, decimalScale]);

  // Преобразование форматированной строки в число
  const parseNumber = useCallback((formatted) => {
    if (!formatted) return '';
    return formatted
      .replace(new RegExp(`\\${thousandSeparator}`, 'g'), '')
      .replace(decimalSeparator, '.');
  }, [decimalSeparator, thousandSeparator]);

  // Инициализация значения
  useEffect(() => {
    const formatted = formatNumber(value);
    setDisplayValue(formatted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Обновление displayValue при изменении value извне
  useEffect(() => {
    if (!isUpdatingRef.current) {
      const formatted = formatNumber(value);
      if (formatted !== displayValue) {
        setDisplayValue(formatted);
      }
    }
  }, [value, formatNumber, displayValue]);

  // Обработка изменений
  const handleChange = (e) => {
    if (isUpdatingRef.current) {
      isUpdatingRef.current = false;
      return;
    }
    
    const input = e.target;
    const newValue = input.value;
    const cursorPos = input.selectionStart;
    
    // Парсим новое значение
    const rawValue = parseNumber(newValue);
    
    // Проверяем количество точек
    const dotCount = (rawValue.match(/\./g) || []).length;
    if (dotCount > 1) {
      // Восстанавливаем предыдущее значение
      isUpdatingRef.current = true;
      input.value = displayValue;
      input.setSelectionRange(cursorPos, cursorPos);
      return;
    }
    
    // Проверяем maxLength
    if (maxLength) {
      const digitsOnly = rawValue.replace('.', '');
      if (digitsOnly.length > maxLength) {
        isUpdatingRef.current = true;
        input.value = displayValue;
        input.setSelectionRange(cursorPos, cursorPos);
        return;
      }
    }
    
    // Форматируем
    const formattedValue = formatNumber(rawValue);
    
    // Обновляем состояние
    setDisplayValue(formattedValue);
    
    // Вызываем колбэк
    if (onChange) {
      const numericValue = rawValue ? parseFloat(rawValue) : null;
      onChange(formattedValue, numericValue);
    }
    
    // Корректируем позицию курсора
    setTimeout(() => {
      if (inputRef.current) {
        // Простая логика: пытаемся сохранить позицию
        let newPos = cursorPos;
        
        // Если курсор был рядом с разделителем, корректируем
        if (cursorPos > 0 && newValue[cursorPos - 1] === thousandSeparator) {
          newPos = Math.min(cursorPos + 1, formattedValue.length);
        }
        
        inputRef.current.setSelectionRange(newPos, newPos);
      }
    }, 0);
  };

  // Обработка вставки
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    if (!pasteData) return;
    
    const input = inputRef.current;
    if (!input) return;
    
    const { selectionStart, selectionEnd } = input;
    const currentValue = input.value;
    
    // Очищаем вставленные данные
    let cleaned = pasteData.replace(/[^\d.]/g, '');
    
    // Оставляем только первую точку
    const dotIndex = cleaned.indexOf('.');
    if (dotIndex !== -1) {
      cleaned = cleaned.slice(0, dotIndex + 1) + cleaned.slice(dotIndex + 1).replace(/\./g, '');
    }
    
    // Вставляем данные
    const before = currentValue.slice(0, selectionStart);
    const after = currentValue.slice(selectionEnd);
    const newValue = before + cleaned + after;
    
    // Имитируем ввод
    input.value = newValue;
    const event = new Event('input', { bubbles: true });
    input.dispatchEvent(event);
  };

  // Обработка фокуса для улучшения UX
  const handleFocus = (e) => {
    if (!displayValue && placeholder === '0') {
      // При фокусе на пустом поле показываем курсор
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(0, 0);
        }
      }, 0);
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="decimal"
      value={displayValue}
      placeholder={placeholder}
      disabled={disabled}
      onChange={handleChange}
      onPaste={handlePaste}
      onFocus={handleFocus}
      {...props}
    />
  );
};

export default CurrencyInput;