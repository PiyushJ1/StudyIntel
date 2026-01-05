"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

interface SessionState {
  seconds: number;
  running: boolean;
  sessionId: string | null;
  trackedCourse: string | null;
}

interface SessionContextType extends SessionState {
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  setRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setSessionId: React.Dispatch<React.SetStateAction<string | null>>;
  setTrackedCourse: React.Dispatch<React.SetStateAction<string | null>>;
  formatTime: (s: number) => string;
  resetSession: () => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

const STORAGE_KEY = "studyintel_session";

interface StoredSession {
  seconds: number;
  running: boolean;
  sessionId: string | null;
  trackedCourse: string | null;
  lastUpdated: number;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [trackedCourse, setTrackedCourse] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Restore state from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: StoredSession = JSON.parse(stored);

        // Calculate elapsed time since last update if timer was running
        let adjustedSeconds = parsed.seconds;
        if (parsed.running && parsed.lastUpdated) {
          const elapsedSinceLastUpdate = Math.floor(
            (Date.now() - parsed.lastUpdated) / 1000,
          );
          adjustedSeconds = parsed.seconds + elapsedSinceLastUpdate;
        }

        // eslint-disable-next-line
        setSeconds(adjustedSeconds);
        setRunning(parsed.running);
        setSessionId(parsed.sessionId);
        setTrackedCourse(parsed.trackedCourse);
      }
    } catch (err) {
      console.error("Failed to restore session state:", err);
    }
    setHydrated(true);
  }, []);

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    if (!hydrated) return;

    const sessionData: StoredSession = {
      seconds,
      running,
      sessionId,
      trackedCourse,
      lastUpdated: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
  }, [seconds, running, sessionId, trackedCourse, hydrated]);

  // Handle the stopwatch interval
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running]);

  const formatTime = useCallback((s: number) => {
    const hours = String(Math.floor(s / 3600)).padStart(2, "0");
    const mins = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const secs = String(s % 60).padStart(2, "0");
    return `${hours}:${mins}:${secs}`;
  }, []);

  const resetSession = useCallback(() => {
    setSeconds(0);
    setRunning(false);
    setSessionId(null);
    setTrackedCourse(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value: SessionContextType = {
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
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
