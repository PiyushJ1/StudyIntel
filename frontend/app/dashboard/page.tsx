"use client";

import styles from "./dashboard.module.css";
import DecryptedText from "../../components/DecryptedText";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [firstName, setFirstName] = useState(() => localStorage.getItem("firstName") || "")
  const [loading, setLoading] = useState(() => !localStorage.getItem("firstName"));
  const [timeStudied, setTimeStudied] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // get user's lifetime study time
        if (data.timestudied) {
          setTimeStudied(data.timestudied);
        }
        // setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        <div className={styles.welcomeSection}>
          <h1 className={styles.welcomeMessage}>
            <DecryptedText
              text={"Welcome back,"}
              speed={60}
              maxIterations={18}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!?1234567890"
              className={styles.welcomeMessage}
              parentClassName=""
              encryptedClassName=""
              animateOn="view"
            />{" "}
            {loading ? (
              <span className={styles.highlightUser}></span>
            ) : (
              <DecryptedText
                text={firstName ? `${firstName}!` : "Guest!"}
                speed={60}
                maxIterations={18}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!?1234567890"
                className={styles.highlightUser}
                parentClassName=""
                encryptedClassName=""
                animateOn="view"
              />
            )}
          </h1>
        </div>

        <div className={styles.subtitleSection}>
          <h2 className={styles.subtitleText}>
            Ready to keep levelling up your study journey?
          </h2>
        </div>

        <div className={styles.progressSection}>
          <h2 className={styles.progressText}>
            <p>Total time spent studying</p>
            {Object.entries(timeStudied).map(([course, seconds]) => (
              <div key={course}>
                {course}: {Math.floor(seconds / 3600)} hours,{" "}
                {Math.floor((seconds % 3600) / 60)} minutes, {seconds % 60}{" "}
                seconds
              </div>
            ))}
          </h2>
        </div>

        {/* <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            {/* <div className={styles.mainCard}>
              
            </div> 
          </div>
            
          <div className={styles.sidebar}>
            {/* const tasks = [];
              const goals = [];
              <ul className={styles.sidebarContent}>
                {tasks.length === 0
                  ? <li>No tasks set</li>
                  : tasks.map((task, i) => <li key={i}>{task.title}</li>)}
              </ul> 

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

            {/* Academic Goals Section *
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
        </div> */}
      </div>
    </main>
  );
}
