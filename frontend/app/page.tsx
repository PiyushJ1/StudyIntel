'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

export default function HomePage() {
	const words = ['Get AI-powered study insights.', 'Visualize progress and patterns.', 'Unlock your academic potential.'];
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
      <>
        <header className="navbar">
          
        </header>

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
            <h2 className={styles.subtitle}>The first AI-powered study optimization tool. Built for students, by students.</h2>
            <div className={styles.descriptionSection}>
            <p className={styles.descriptionText}>
              TimeLyze transforms your study sessions into personalized academic strategies backed by your own data. Log your time, tag your subjects, and reflect on
              your focus levels. <br></br><br></br>Our AI analyzes this data and creates beautiful, interactive visualizations that reveal where your hard work
              truly goes—helping you optimize your study habits and unlock your academic potential.
            </p>
            </div>
          </div>

          <a href='https://google.com' target='_blank'>
            <button className={styles.interestButton}>
              Register Interest  
            </button>
          </a>
        </main>
      </>
  	);
}
