'use client';

import React from "react";
import styles from "./NewSessionPopup.module.css";

interface NewSessionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  seconds: number;
  _running: boolean;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewSessionPopup({ isOpen, onClose, seconds, _running, setSeconds, setRunning }: NewSessionPopupProps) {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatTime = (s: number) => {
    const hours = String(Math.floor(s / 3600)).padStart(2, '0');
    const mins = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const secs = String(s % 60).padStart(2, '0');
    return `${hours}:${mins}:${secs}`;
  }

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.popup}>
        <>
          <button className={styles.closeButton} onClick={onClose}>
              ×
          </button>
            
          <div className={styles.header}>
            <h2 className={styles.title}>Start New Study Session</h2>
            <p className={styles.subtitle}>
                Let&apos;s get started! What and how long would you like to study?  
            </p>
          </div>

          <div className={styles.stopwatch}>
            {formatTime(seconds)}
          </div>
            
          <div className={styles.buttonContainer}>
            <button className={styles.startButton} onClick={() => setRunning(true)}>Start</button>
            <button className={styles.pauseButton} onClick={() => setRunning(false)}>Pause</button>
            <button className={styles.resetButton} onClick={() => (setSeconds(0), setRunning(false))}>Reset</button>
          </div>
        </>
      </div>
    </div>
  );
}