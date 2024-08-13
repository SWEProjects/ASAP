import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './Typing.css';

const TypingAnimation = ({ texts, typingSpeed = 100, pauseSpeed = 1000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  
  const animationProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 0 }
  });

  useEffect(() => {
    const currentText = texts[textIndex];
    let timer;

    if (index < currentText.length) {
      timer = setInterval(() => {
        setIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          setDisplayedText(currentText.slice(0, nextIndex));
          return nextIndex;
        });
      }, typingSpeed);
    } else {
      clearInterval(timer);
      const pauseTimer = setTimeout(() => {
        setTextIndex(prevTextIndex => (prevTextIndex + 1) % texts.length);
        setIndex(0);
        setDisplayedText('');
      }, pauseSpeed);

      return () => clearTimeout(pauseTimer);
    }

    return () => clearInterval(timer);
  }, [index, textIndex, texts, typingSpeed, pauseSpeed]);

  return (
    <animated.div style={animationProps} className="typing-text">
      {displayedText}
    </animated.div>
  );
};

export default TypingAnimation;
