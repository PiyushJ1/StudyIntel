'use client';

import styles from "./dashboard.module.css";
import Link from "next/link";

export default function DashboardPage() {
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
            <Link href="/dashboard/profile" className={styles.navLink}>📊 Dashboard</Link>
            <Link href="/dashboard/sessions" className={styles.navLink}>⏱️ Sessions</Link>
            <Link href="/dashboard/insights" className={styles.navLink}>💡 Insights</Link>
          </nav>

          <div className={styles.navRight}>
            <Link href="/dashboard/profile" className={styles.loginButton}>👤 Profile</Link>
            <Link href="/dashboard/profile" className={styles.signupButtonNav}>+ Add Session</Link>



            {/* <Link href="/login" className={`${styles.loginButton}`}>
              Sign In
            </Link>
            <Link href="/register" className={`${styles.signupButtonNav} ${styles.disabled}`}>
              Sign Up
            </Link>
            {/* <button onClick={handleSmoothScroll} className={styles.joinWaitlistButton}>
              Join Waitlist
            </button> */}
          </div>
        </div>
      </header>
    </>
  );
};