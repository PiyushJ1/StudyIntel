"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles/NewSessionPopup.module.css";
import { useSession } from "@/lib/SessionContext";

interface NewSessionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewSessionPopup({
  isOpen,
  onClose,
}: NewSessionPopupProps) {
  const {
    seconds,
    running,
    sessionId,
    trackedCourse,
    setSeconds,
    setRunning,
    setSessionId,
    setTrackedCourse,
    formatTime,
    resetSession,
  } = useSession();

  const [displayCourses, setDisplayCourses] = useState<string[]>([]);
  const [isStarting, setIsStarting] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    fetch("/api/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.courses) {
          setDisplayCourses(data.courses);
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

    setIsStarting(true);
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
    } finally {
      setIsStarting(false);
    }
  };

  const handleFinishSession = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!sessionId) {
      alert("No session to finish");
      return;
    }

    setIsFinishing(true);
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

      resetSession();
    } catch (err) {
      alert("Could not save session end info");
      console.log("Error:", err);
    } finally {
      setIsFinishing(false);
    }
  };

  if (!isOpen) return null;

  const isActive = sessionId !== null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.header}>
          <h2 className={styles.title}>
            {isActive ? `Studying ${trackedCourse}` : "New Study Session"}
          </h2>
          <p className={styles.subtitle}>
            {isActive ? "Stay focused!" : "Select a course to begin"}
          </p>
        </div>

        {isActive && (
          <div className={styles.activeInfo}>
            <span className={styles.activeBadge}>
              <span className={styles.activeDot} />
              Recording
            </span>
          </div>
        )}

        <div className={styles.stopwatch}>{formatTime(seconds)}</div>

        {!isActive && (
          <div className={styles.courseSection}>
            <div className={styles.sectionLabel}>Course</div>
            <div className={styles.userCourses}>
              {displayCourses.map((course) => (
                <label key={course} className={styles.courseOption}>
                  <input
                    type="radio"
                    name="course"
                    value={course}
                    checked={trackedCourse === course}
                    onChange={() => setTrackedCourse(course)}
                  />
                  <span className={styles.courseLabel}>{course}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className={styles.buttonContainer}>
          {!isActive ? (
            <button
              className={styles.startButton}
              onClick={handleStartSession}
              disabled={!trackedCourse || isStarting}
            >
              {isStarting ? (
                <>
                  <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Starting...
                </>
              ) : (
                "Start Session"
              )}
            </button>
          ) : (
            <>
              {running ? (
                <button
                  className={styles.pauseButton}
                  onClick={() => setRunning(false)}
                  disabled={isFinishing}
                >
                  Pause
                </button>
              ) : (
                <button
                  className={styles.resumeButton}
                  onClick={() => setRunning(true)}
                  disabled={isFinishing}
                >
                  Resume
                </button>
              )}
              <button
                className={styles.resetButton}
                onClick={() => {
                  setSeconds(0);
                  setRunning(false);
                }}
                disabled={isFinishing}
              >
                Reset
              </button>
              <button
                className={styles.finishButton}
                onClick={handleFinishSession}
                disabled={isFinishing}
              >
                {isFinishing ? (
                  <>
                    <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Finishing...
                  </>
                ) : (
                  "Finish Session"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
