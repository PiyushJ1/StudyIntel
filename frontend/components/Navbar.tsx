'use client';

import React from "react";
// import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

interface NavbarProps {
  onNewSessionClick?: (e: React.MouseEvent) => void;
}


export default function Navbar({ onNewSessionClick }: NavbarProps) {
  // const [isNewSessionPopupOpen, setIsNewSessionPopupOpen] = useState(false);
  // isNewSessionPopupOpen;
  // setIsNewSessionPopupOpen;
  
  const pathName = usePathname();

  // const handleNewSession = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   setIsNewSessionPopupOpen(true)
  // };

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
            <Link href="/dashboard/profile" className={styles.profileButton}>👤 Profile</Link>
            <button onClick={onNewSessionClick} className={styles.newSessionButton} aria-label="Add New Session">+ New Session</button>
          </div>
        </div>
      </header>
    </>
  );
};