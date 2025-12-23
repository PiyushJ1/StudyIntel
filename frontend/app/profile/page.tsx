"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./profile.module.css";

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  courses: string[];
  createdAt: string;
  stats: {
    totalSeconds: number;
    sessionCount: number;
    averageSessionSeconds: number;
    streak: number;
  };
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          courses: data.courses || [],
          createdAt: data.createdAt,
          stats: data.stats,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err);
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      // Clear localStorage
      localStorage.removeItem("firstName");

      // Clear the cookie by making a request or setting it to expire
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Redirect to home
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
      setLoggingOut(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  if (loading) {
    return (
      <main className={styles.profileContainer}>
        <div className={styles.profileContent}>
          <div className={styles.loading}>Loading profile...</div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.profileContainer}>
      <div className={styles.profileContent}>
        <h1 className={styles.pageTitle}>Profile</h1>

        {/* User Info Card */}
        <div className={styles.profileCard}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              {userData?.firstname?.[0]?.toUpperCase() || "?"}
            </div>
            <div className={styles.userInfo}>
              <h2 className={styles.userName}>
                {userData?.firstname} {userData?.lastname}
              </h2>
              <p className={styles.userEmail}>{userData?.email}</p>
            </div>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Member since</span>
              <span className={styles.infoValue}>
                {userData?.createdAt ? formatDate(userData.createdAt) : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Courses Card */}
        <div className={styles.sectionCard}>
          <h3 className={styles.sectionTitle}>📚 Your Courses</h3>
          <div className={styles.coursesList}>
            {userData?.courses && userData.courses.length > 0 ? (
              userData.courses.map((course) => (
                <span key={course} className={styles.courseTag}>
                  {course}
                </span>
              ))
            ) : (
              <p className={styles.emptyText}>No courses added yet</p>
            )}
          </div>
        </div>

        {/* Stats Summary Card */}
        <div className={styles.sectionCard}>
          <h3 className={styles.sectionTitle}>📊 Study Summary</h3>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {userData?.stats
                  ? Math.round((userData.stats.totalSeconds / 3600) * 10) / 10
                  : 0}
                h
              </span>
              <span className={styles.statLabel}>Total Hours</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {userData?.stats?.sessionCount || 0}
              </span>
              <span className={styles.statLabel}>Sessions</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {userData?.stats
                  ? formatTime(userData.stats.averageSessionSeconds)
                  : "—"}
              </span>
              <span className={styles.statLabel}>Avg Session</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {userData?.stats?.streak || 0}
              </span>
              <span className={styles.statLabel}>Day Streak</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className={styles.logoutButton}
        >
          {loggingOut ? "Logging out..." : "Sign Out"}
        </button>
      </div>
    </main>
  );
}
