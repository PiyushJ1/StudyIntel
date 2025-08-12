'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import NewSessionPopup from "./NewSessionPopup";

interface NavbarProps {
  seconds: number;
  running: boolean;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  formatTime: (s: number) => string;
}

export default function Navbar({ seconds, running, setSeconds, setRunning, formatTime }: NavbarProps) {
  const [isNewSessionPopupOpen, setIsNewSessionPopupOpen] = useState(false);
  
  const pathName = usePathname();

  const handleNewSession = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNewSessionPopupOpen(true);
  };

  const handleCloseNewSessionPopup = () => {
    setIsNewSessionPopupOpen(false);
  };

  let sessionButtonLabel = "+ New Session";
  if (seconds > 0 && running) {
    sessionButtonLabel = `⏱️ ${formatTime(seconds)}`;
  } else if (seconds > 0 && !running) {
    sessionButtonLabel = `⏸️ ${formatTime(seconds)}`
  }

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.navLeft}>
            <Link href="/dashboard" className={styles.logo}>
              StudyIntel
            </Link>
          </div>
            
          <nav className={styles.navCenter}>
            <Link href="/dashboard" className={`${styles.navLink} ${pathName === '/dashboard' ? styles.active : ''}`}>📊 Dashboard</Link>
            <Link href="/dashboard/courses" className={`${styles.navLink} ${pathName === '/dashboard/courses' ? styles.active : ''}`}>📚 Courses</Link>
            <Link href="/dashboard/insights" className={`${styles.navLink} ${pathName === '/dashboard/insights' ? styles.active : ''}`}>💡 Insights</Link>
          </nav>

          <div className={styles.navRight}>
            <button onClick={handleNewSession} 
              className={
                seconds > 0 
                  ? `${styles.newSessionButton} ${styles.sessionActive}` 
                  : styles.newSessionButton
              }
            >{sessionButtonLabel}
            </button>
            <Link href="/dashboard/profile" className={styles.profileButton}>👤 Profile</Link>
          </div>
        </div>
      </header>

      <NewSessionPopup 
        isOpen={isNewSessionPopupOpen} 
        onClose={handleCloseNewSessionPopup}
        seconds={seconds}
        _running={running}
        setSeconds={setSeconds}
        setRunning={setRunning}
      />
    </>
  );
};