import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "hover" | "view";
  revealDirection?: "left" | "right" | "center"; // Not used but reserved
}

const defaultCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!?@#$%^&*";

const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 50,
  maxIterations = 15,
  characters = defaultCharacters,
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
}) => {
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const startReveal = useCallback(() => {
    let iterations = 0;
    const original = text.split("");
    let tempText = [...original].map(() => "");

    const interval = setInterval(() => {
      tempText = tempText.map((char, i) => {
        if (
          iterations >= maxIterations ||
          Math.random() < iterations / maxIterations
        ) {
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
  }, [text, maxIterations, characters, speed]);

  // Reset animation when `text` changes
  useEffect(() => {
    setRevealed(false);
    setDisplayedText([]);

    if (animateOn === "view" && isInView) {
      setTimeout(() => {
        startReveal();
      }, 100);
    }
  }, [text, animateOn, isInView, startReveal]);

  // Trigger animation when in view
  useEffect(() => {
    if (animateOn === "view" && isInView && !revealed) {
      startReveal();
    }
  }, [animateOn, isInView, revealed, startReveal]);

  const handleMouseEnter = () => {
    if (animateOn === "hover" && !revealed) {
      startReveal();
    }
  };

  const getDisplay = () => {
    if (
      revealed &&
      displayedText.length > 0 &&
      displayedText.every((char, idx) => char === text[idx])
    ) {
      return <span className={className}>{text}</span>;
    }

    if (displayedText.length === 0) return text;

    return displayedText.map((char, idx) => (
      <span
        key={idx}
        className={char === text[idx] ? className : encryptedClassName}
      >
        {char}
      </span>
    ));
  };

  return (
    <span
      ref={ref}
      onMouseEnter={handleMouseEnter}
      className={parentClassName}
      style={{ display: "inline-block", fontFamily: "monospace" }}
    >
      {getDisplay()}
    </span>
  );
};

export default DecryptedText;
