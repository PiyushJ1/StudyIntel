'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import WaitlistPopup from '../components/WaitlistPopup';

export default function HomePage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isWaitlistPopupOpen, setIsWaitlistPopupOpen] = useState(false);
  
  useEffect(() => {
    const words = ['Get personalized study insights.', 'Visualize your learning progress.', 'Reach your academic potential.'];
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
    }, isPaused ? 1500 : isDeleting ? 40 : 70);

		  return () => clearTimeout(timeout);
  	}, [currentText, isDeleting, isPaused, currentWordIndex]);

  const handleWaitlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWaitlistPopupOpen(true);
  };

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
            <span className={`${styles.loginButton} ${styles.disabled}`}>
                Sign In
            </span>
            <span className={`${styles.signupButton} ${styles.disabled}`}>
                Sign Up
            </span>
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
            <button 
              onClick={handleWaitlistClick}
              className={styles.waitlistButton}
            >
                Join Waitlist
            </button>
              
            <p className={styles.waitlistText}>
                Claim your spot in the future of academic excellence
            </p>
          </div>
        </div>
      </main>

      <WaitlistPopup 
        isOpen={isWaitlistPopupOpen}
        onClose={() => setIsWaitlistPopupOpen(false)}
      />
    </>
  	);
}
