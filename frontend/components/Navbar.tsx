'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import NewSessionPopup from "./NewSessionPopup";

export default function Navbar({ }) {
  const [isNewSessionPopupOpen, setIsNewSessionPopupOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  
  const pathName = usePathname();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (running) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (s: number) => {
    const hours = String(Math.floor(s / 3600)).padStart(2, '0');
    const mins = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const secs = String(s % 60).padStart(2, '0');
    return `${hours}:${mins}:${secs}`;
  };

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
            <Link href="/dashboard/sessions" className={`${styles.navLink} ${pathName === '/dashboard/sessions' ? styles.active : ''}`}>⏱️ Sessions</Link>
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