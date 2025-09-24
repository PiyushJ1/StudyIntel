"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles/NewSessionPopup.module.css";

interface NewSessionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  seconds: number;
  _running: boolean;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewSessionPopup({
  isOpen,
  onClose,
  seconds,
  _running,
  setSeconds,
  setRunning,
}: NewSessionPopupProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [displayCourses, setDisplayCourses] = useState<string[]>([]);
  const [trackedCourse, setTrackedCourse] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.courses) {
          setDisplayCourses(data.courses)
        }
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err);
      });
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleStartSession = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!trackedCourse) {
      alert("Please select a course");
      return;
    }
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/start-session`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseCode: trackedCourse }), 
        },
      );

      if (!response.ok) {
        console.log("Could not start and save new study session");
        return;
      }

      const data = await response.json();
      setSessionId(data.sessionId);
      setRunning(true);
    } catch (err) {
      alert("Could not save session start info");
      console.log("Error:", err);
    }
  };

  const handleFinishSession = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!sessionId) {
      alert("No session to finish");
      return;
    }

    // save study session info to db
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/finish-session`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        },
      );

      if (!response.ok) {
        console.log("Could not finish session");
      }

      setSeconds(0);
      setRunning(false);
      setSessionId(null);
    } catch (err) {
      alert("Could not save session end info");
      console.log("Error:", err);
    }
  };

  const formatTime = (s: number) => {
    const hours = String(Math.floor(s / 3600)).padStart(2, "0");
    const mins = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const secs = String(s % 60).padStart(2, "0");
    return `${hours}:${mins}:${secs}`;
  };

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
              Let&apos;s get started. What course would you like to study for?
            </p>
          </div>

          <div className={styles.userCourses}>
            {displayCourses.map(course => (
              <label key={course} className={styles.courseOption}>
                <input
                  type="radio"
                  name="course"
                  value={course}
                  checked={trackedCourse === course}
                  onChange={() => setTrackedCourse(course)}
                />
                {course}
              </label>
            ))}
          </div>

          <div className={styles.stopwatch}>{formatTime(seconds)}</div>

          <div className={styles.buttonContainer}>
            <button className={styles.startButton} onClick={handleStartSession}>
              Start
            </button>
            <button
              className={styles.pauseButton}
              onClick={() => setRunning(false)}
            >
              Pause
            </button>
            <button
              className={styles.finishButton}
              onClick={handleFinishSession}
            >
              Finish
            </button>
            <button
              className={styles.resetButton}
              onClick={() => (setSeconds(0), setRunning(false))}
            >
              Reset
            </button>
          </div>
        </>
      </div>
    </div>
  );
}
