'use client';

import React, { useState } from "react";
import styles from "./NewSessionPopup.module.css";

interface NewSessionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewSessionPopup({ isOpen, onClose }: NewSessionPopupProps) {
  const [formData, setFormData] = useState({
    sessionName: '',
    subject: '',
    studyGoals: '',
    duration: '30',
  });

  const [isStarting, setIsStarting] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsStarting(true);

    // Simulate session creation
    try {
      // Here you would typically send the data to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsStarted(true);
    } catch (error) {
      console.error('Error starting session:', error);
    } finally {
      setIsStarting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const resetForm = () => {
    setFormData({
      sessionName: '',
      subject: '',
      studyGoals: '',
      duration: '30',
    });
    setIsStarting(false);
    setIsStarted(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.popup}>
        {!isStarted ? (
          <>
            <button className={styles.closeButton} onClick={handleClose}>
              ×
            </button>
            
            <div className={styles.header}>
              <h2 className={styles.title}>Start New Study Session</h2>
              <p className={styles.subtitle}>
                Set up your study session with AI-powered insights and tracking. 
                Let's make this session productive!
              </p>
            </div>

            <form onSubmit={handleStart} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="sessionName" className={styles.label}>
                  Session Name *
                </label>
                <input
                  type="text"
                  id="sessionName"
                  name="sessionName"
                  value={formData.sessionName}
                  onChange={handleChange}
                  placeholder="e.g., Math Calculus Review"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="subject" className={styles.label}>
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Mathematics, Chemistry, History"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="studyGoals" className={styles.label}>
                  Study Goals
                </label>
                <textarea
                  id="studyGoals"
                  name="studyGoals"
                  value={formData.studyGoals}
                  onChange={handleChange}
                  placeholder="What do you want to accomplish in this session?"
                  className={styles.textarea}
                  rows={3}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="duration" className={styles.label}>
                  Planned Duration (minutes)
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div className={styles.features}>
                <h3 className={styles.featuresTitle}>What you'll get:</h3>
                <ul className={styles.featuresList}>
                  <li>⏱️ Smart time tracking with breaks</li>
                  <li>🎯 Goal-based progress monitoring</li>
                  <li>📊 Real-time productivity insights</li>
                  <li>🧠 AI-powered study recommendations</li>
                </ul>
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isStarting || !formData.sessionName || !formData.subject}
              >
                {isStarting ? (
                  <span className={styles.loading}>
                    <span className={styles.spinner}></span>
                    Starting Session...
                  </span>
                ) : (
                  'Start Study Session'
                )}
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>🚀</div>
            <h2 className={styles.successTitle}>Session Started Successfully!</h2>
            <p className={styles.successText}>
              Your study session &quot;{formData.sessionName}&quot; is now active. 
              Time to focus and achieve your goals!
            </p>
            <div className={styles.sessionInfo}>
              <div className={styles.sessionDetail}>
                <span className={styles.sessionLabel}>Subject:</span> {formData.subject}
              </div>
              <div className={styles.sessionDetail}>
                <span className={styles.sessionLabel}>Duration:</span> {formData.duration} minutes
              </div>
            </div>
            <button 
              onClick={handleClose}
              className={styles.returnButton}
            >
              Go to Session Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}