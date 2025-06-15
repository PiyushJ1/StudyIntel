'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

export default function HomePage() {
  const words = ['Track your daily habits', 'Visualize your patterns', 'Get AI-powered insights'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        
        if (currentText === currentWord) {
          setIsPaused(true);
        }
      }
    }, isPaused ? 1500 : isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentWordIndex, words]);

  return (
    <main className={styles.heroContainer}>
      <div className={styles.constructionBanner}>
        Currently under construction, check back later.
      </div>
      
      <div className={styles.contentContainer}>
        <h1 className={styles.mainTitle}>
          <div className={styles.typingContainer}>
            <span className={styles.typingText}>{currentText}</span>
            <span className={styles.cursor}></span>
          </div>
        </h1>
        <h2 className={styles.subtitle}>The first productivity tool built specifically for students.</h2>
        
        <div className={styles.descriptionSection}>
          <p className={styles.descriptionText}>
            Stop guessing why some study sessions feel effortless while others drain you completely. TimeLyze automatically tracks when and how you study, then applies AI analysis to decode your unique productivity patterns. Discover your peak focus hours, identify what kills your momentum, and learn the timing strategies that help you retain more in less time. Finally, study insights that actually work for how students learn.
          </p>
        </div>
      </div>
    </main>
  );
}
