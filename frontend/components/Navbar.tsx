'use client';

import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";

interface NavbarProps {
  onNewSessionClick?: (e: React.MouseEvent) => void;
}

export default function Navbar({ onNewSessionClick }: NavbarProps) {
  // const [isNewSessionPopupOpen, setIsNewSessionPopupOpen] = useState(false);

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
            <Link href="/dashboard" className={styles.navLink}>📊 Dashboard</Link>
            <Link href="/dashboard/sessions" className={styles.navLink}>⏱️ Sessions</Link>
            <Link href="/dashboard/insights" className={styles.navLink}>💡 Insights</Link>
          </nav>

          <div className={styles.navRight}>
            <Link href="/dashboard/profile" className={styles.loginButton}>👤 Profile</Link>
            <button onClick={onNewSessionClick} className={styles.signupButtonNav} aria-label="Add New Session">+ New Session</button>
          </div>
        </div>
      </header>
    </>
  );
};