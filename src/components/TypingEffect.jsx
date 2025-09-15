import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 100); // Tippgeschwindigkeit in Millisekunden

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span style={{ position: 'relative' }}>
      <span style={{ visibility: 'hidden' }}>{text}</span>
      <span style={{ position: 'absolute', left: 0, top: 0 }}>{currentText}</span>
    </span>
  );
};

export default TypingEffect; 