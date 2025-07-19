import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'hover' | 'view';
  revealDirection?: 'left' | 'right' | 'center';
}

const defaultCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!?@#$%^&*';

const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 50,
  maxIterations = 15,
  characters = defaultCharacters,
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  revealDirection = 'left',
}) => {
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (animateOn === 'view' && isInView && !revealed) {
      startReveal();
    }
  }, [isInView]);

  // Reset animation when text changes
  useEffect(() => {
    setRevealed(false);
    setDisplayedText([]);
    // If already in view and animateOn is 'view', start animation immediately
    if (animateOn === 'view' && isInView) {
      // Small delay to ensure state is reset first
      setTimeout(() => {
        startReveal();
      }, 50);
    }
  }, [text]);

  const startReveal = () => {
    let iterations = 0;
    const original = text.split('');
    let tempText = [...original].map(() => '');

    const interval = setInterval(() => {
      tempText = tempText.map((char, i) => {
        if (iterations >= maxIterations || Math.random() < iterations / maxIterations) {
          return original[i];
        }
        return characters[Math.floor(Math.random() * characters.length)];
      });

      setDisplayedText([...tempText]);

      iterations++;
      if (iterations > maxIterations) {
        clearInterval(interval);
        setRevealed(true);
      }
    }, speed);
  };

  const handleMouseEnter = () => {
    if (animateOn === 'hover' && !revealed) {
      startReveal();
    }
  };

  const getDisplay = () => {
    // If animation is complete and all characters are revealed, render as single span with gradient
    if (revealed && displayedText.length > 0 && displayedText.every((char, idx) => char === text[idx])) {
      return (
        <span className={className}>
          {text}
        </span>
      );
    }
    
    // If animation hasn't started yet, show initial text
    if (displayedText.length === 0) return text;
    
    // During animation, render individual characters
    return displayedText.map((char, idx) => (
      <span key={idx} className={char === text[idx] ? className : encryptedClassName}>
        {char}
      </span>
    ));
  };

  return (
    <span
      ref={ref}
      onMouseEnter={handleMouseEnter}
      className={parentClassName}
      style={{ display: 'inline-block', fontFamily: 'monospace' }}
    >
      {getDisplay()}
    </span>
  );
};

export default DecryptedText;
