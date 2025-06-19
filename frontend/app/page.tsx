'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function HomePage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentText, setCurrentText] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
  
	useEffect(() => {
    const words = ['Visualize your study intelligence.', 'Transform data into insights.', 'See patterns, dominate academics.'];
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
  	}, [currentText, isDeleting, isPaused, currentWordIndex]);

  	return (
      <>
        <header className={styles.navbar}>
          <div className={styles.navContainer}>
            <div className={styles.navLeft}>
              <Link href="/" className={styles.logo}>
                StudyIntel
              </Link>
            </div>
            
            <nav className={styles.navCenter}>
              <Link href="/features" className={styles.navLink}>Features</Link>
              <Link href="/pricing" className={styles.navLink}>Pricing</Link>
              <Link href="/about" className={styles.navLink}>About</Link>
              <Link href="/contact" className={styles.navLink}>Contact</Link>
            </nav>
            
            <div className={styles.navRight}>
              <Link href="/login" className={styles.loginButton}>
                Sign In
              </Link>
              <Link href="/register" className={styles.signupButton}>
                Sign Up
              </Link>
            </div>
          </div>
        </header>

        <main className={styles.heroContainer}>
          <div className={styles.contentContainer}>
            <h1 className={styles.mainTitle}>
              <div className={styles.typingContainer}>
                <span className={styles.typingText}>{currentText}</span>
                <span className={styles.cursor}></span>
              </div>
            </h1>
            <h2 className={styles.subtitle}>AI-powered study intelligence with beautiful data visualization. See your study patterns, get personalized insights.</h2>
            <div className={styles.descriptionSection}>
              <p className={styles.descriptionText}>
                StudyIntel transforms your study sessions into stunning visual analytics and actionable intelligence. Our AI analyzes your learning patterns and creates beautiful, interactive dashboards that reveal hidden insights about your study habits. <br></br><br></br>From heat maps of your focus levels to trend analysis of subject performance—see your academic data like never before and get personalized recommendations that drive real results.
              </p>
            </div>
            
            <div className={styles.ctaSection}>
              <Link href="/waitlist" className={styles.waitlistButton}>
                Get Early Access
              </Link>
              <p className={styles.waitlistText}>
                Join elite students getting visual intel on their academic performance
              </p>
            </div>
          </div>
        </main>
      </>
  	);
}
