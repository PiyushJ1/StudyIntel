'use client';

import React, { useEffect, useState } from "react";
import styles from "./NewSessionPopup.module.css";

interface NewSessionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewSessionPopup({ /*isOpen,*/ onClose }: NewSessionPopupProps) {
  // const [formData, setFormData] = useState({
  //   sessionName: '',
  //   subject: '',
  //   studyGoals: '',
  //   duration: '30',
  // });

  // const [isStarting, setIsStarting] = useState(false);
  // const [isStarted, setIsStarted] = useState(false);

  // const handleStart = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsStarting(true);

  //   // Simulate session creation
  //   try {
  //     // Here you would typically send the data to your backend
  //     await new Promise(resolve => setTimeout(resolve, 1000));
  //     setIsStarted(true);
  //   } catch (error) {
  //     console.error('Error starting session:', error);
  //   } finally {
  //     setIsStarting(false);
  //   }
  // };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClose = () => {
    // resetForm();
    onClose();
  };

  // stopwatch simulation
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

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
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.popup}>
        <>
          <button className={styles.closeButton} onClick={handleClose}>
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
            <button className={styles.resetButton} onClick={() => setSeconds(0)}>Reset</button>
          </div>
        </>
      </div>
    </div>
  );
}