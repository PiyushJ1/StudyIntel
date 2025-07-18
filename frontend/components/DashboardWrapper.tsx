'use client';

import { useState, useEffect } from "react";
import Navbar from "./Navbar";

interface DashboardWrapperProps {
  children: React.ReactNode;
}

export default function DashboardWrapper({ children }: DashboardWrapperProps) {
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
  };

  return (
    <>
      <Navbar 
        seconds={seconds}
        running={running}
        setSeconds={setSeconds}
        setRunning={setRunning}
        formatTime={formatTime}
      />
      {children}
    </>
  );
} 