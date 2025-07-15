'use client'

import Navbar from "@/components/Navbar";
import styles from "./dashboard.module.css"

export default function DashboardPage() {
  const handleNewSession = () => {
    // placeholder
  }

  return (
    <>
      <Navbar onNewSessionClick={handleNewSession}/>
      <main className={styles.dashboardContainer}>
        <div className={styles.dashboardContent}>
          <div className={styles.welcomeSection}>
            <h1 className={styles.welcomeMessage}>
              Welcome back, <span className={styles.highlightUser}>Piyush!</span>
            </h1>
          </div>
          
          <div className={styles.contentWrapper}>
            <div className={styles.mainContent}>
              <div className={styles.mainCard}>
                {/* do something */}
              </div>
            </div>
            
            <div className={styles.sidebar}>
              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>Upcoming Tasks</h3>
                <div className={styles.sidebarContent}>
                  {/* Placeholder for upcoming tasks */}
                  <p>No upcoming tasks</p>
                </div>
              </div>
              
              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>Academic Goals</h3>
                <div className={styles.sidebarContent}>
                  {/* Placeholder for academic goals */}
                  <p>No goals set</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};