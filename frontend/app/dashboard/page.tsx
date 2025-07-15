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

          <div className={styles.subtitleSection}>
            <h2 className={styles.subtitleText}>
              Ready to keep levelling up your study journey?
            </h2>
          </div>
          
          <div className={styles.contentWrapper}>
            <div className={styles.mainContent}>
              <div className={styles.mainCard}>
                {/* do something */}
              </div>
            </div>
            
            <div className={styles.sidebar}>
              {/* const tasks = [];
              const goals = [];
              <ul className={styles.sidebarContent}>
                {tasks.length === 0
                  ? <li>No tasks set</li>
                  : tasks.map((task, i) => <li key={i}>{task.title}</li>)}
              </ul> */}

              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>Upcoming Tasks ✅</h3>
                <ul className={styles.sidebarContent}>
                  <li>No tasks set</li>
                  <li>No tasks set</li>
                  <li>No tasks set</li>
                  <li>No tasks set</li>
                </ul>
                <button className={styles.sidebarViewAll}>View All</button>
              </div>

              {/* Academic Goals Section */}
              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>Academic Goals 🎯</h3>
                <ul className={styles.sidebarContent}>
                  <li>No goals set</li>
                  <li>No goals set</li>
                  <li>No goals set</li>
                  <li>No goals set</li>
                </ul>
                <button className={styles.sidebarViewAll}>View All</button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
};