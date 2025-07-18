'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './Navbar';

interface DashboardWrapperProps {
  children: React.ReactNode;
}

export default function DashboardWrapper({ children }: DashboardWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const router = useRouter();

  // Authentication check
  useEffect(() => {
    const checkAuth = () => {
      console.log('DashboardWrapper: Checking authentication');
      
      // Check for token in localStorage (fallback method)
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        console.log('DashboardWrapper: No token found');
        setIsAuthenticated(false);
        router.push('/login');
        return;
      }

      console.log('DashboardWrapper: Token found in localStorage');
      
      // Don't verify JWT on client-side for security reasons
      // Just check if token exists - server will validate it
      if (token && token.length > 0) {
        console.log('DashboardWrapper: Token exists, allowing access');
        setIsAuthenticated(true);
      } else {
        console.log('DashboardWrapper: Invalid token');
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  // Timer functionality
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

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Checking authentication...
      </div>
    );
  }

  // Show nothing if not authenticated (redirect in progress)
  if (!isAuthenticated) {
    return null;
  }

  // Render dashboard content if authenticated
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