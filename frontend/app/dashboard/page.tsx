'use client'

import styles from "./dashboard.module.css";
import DecryptedText from "../../components/DecryptedText";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [timeStudied, setTimeStudied] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        // get user's first name to display welcome message
        if (data.firstName) {
          setFirstName(data.firstName);
        }
        setLoading(false);

        // get user's study time in last 1 week
        if (data.timeStudied) {
          setTimeStudied(data.timeStudied ?? "X");
        }
      })
      .catch(err => {
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
            />
            {" "}
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
            You studied {" "}
            {timeStudied ? (
              `${timeStudied}`
            ) : ( "X" )}
            {" "}hours today. Great work!
          </h2>
        </div>

        <div>
          <h2>Add Courses</h2>
          <form>
            <input
              type="text"
              id="course1"
              name="course1"
              placeholder="Add course code"
              // value={course1}
              // onChange={e => setCourse1(e.target.value)}
            />
            <input
              type="text"
              id="course2"
              name="course2"
              placeholder="Add course code"
              // value={course2}
              // onChange={e => setCourse2(e.target.value)}
            />
            <input
              type="text"
              id="course3"
              name="course3"
              placeholder="Add course code"
              // value={course3}
              // onChange={e => setCourse3(e.target.value)}
            />
            <button type="submit">Add Courses</button>
          </form>
        </div>

        <div>
          <h2>
            Your Courses:
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
};