"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./profile.module.css";

interface UserData {
  userId: string;
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
  const [courses, setCourses] = useState<string[]>(["", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const fetchUserData = () => {
    fetch("/api/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData({
          userId: data.userId,
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
  };

  useEffect(() => {
    fetchUserData();
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

  const handleCourseChange = (index: number, value: string) => {
    const newCourses = [...courses];
    newCourses[index] = value.toUpperCase();
    setCourses(newCourses);
  };

  const handleStartEditing = () => {
    // Pre-fill with existing courses
    const existingCourses = userData?.courses || [];
    setCourses([
      existingCourses[0] || "",
      existingCourses[1] || "",
      existingCourses[2] || "",
    ]);
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setCourses(["", "", ""]);
  };

  const handleSubmitCourses = async (e: React.FormEvent) => {
    e.preventDefault();

    const validCourses = courses.filter((course) => course.trim() !== "");

    if (validCourses.length < 2) {
      alert("Please enter at least 2 courses");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/new-courses`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            courses: validCourses,
            userId: userData?.userId,
          }),
        },
      );

      if (!response.ok) {
        alert("Failed to update courses");
        return;
      }

      setCourses(["", "", ""]);
      setIsEditing(false);
      fetchUserData();
    } catch (err) {
      console.log("Error: ", err);
      alert("Error updating courses");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className={styles.profileContainer}>
        <div className={styles.profileContent}>
          {/* Skeleton Title */}
          <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />

          {/* Skeleton Profile Card */}
          <div className={styles.skeletonProfileCard}>
            <div className={styles.skeletonAvatarSection}>
              <div className={`${styles.skeleton} ${styles.skeletonAvatar}`} />
              <div className={styles.skeletonUserInfo}>
                <div className={`${styles.skeleton} ${styles.skeletonName}`} />
                <div className={`${styles.skeleton} ${styles.skeletonEmail}`} />
              </div>
            </div>
            <div className={styles.skeletonInfoRow}>
              <div
                className={`${styles.skeleton} ${styles.skeletonInfoLabel}`}
              />
              <div
                className={`${styles.skeleton} ${styles.skeletonInfoValue}`}
              />
            </div>
          </div>

          {/* Skeleton Courses Card */}
          <div className={styles.skeletonSectionCard}>
            <div
              className={`${styles.skeleton} ${styles.skeletonSectionTitle}`}
            />
            <div className={styles.skeletonCoursesList}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`${styles.skeleton} ${styles.skeletonCourseTag}`}
                />
              ))}
            </div>
          </div>

          {/* Skeleton Stats Card */}
          <div className={styles.skeletonSectionCard}>
            <div
              className={`${styles.skeleton} ${styles.skeletonSectionTitle}`}
            />
            <div className={styles.skeletonStatsGrid}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={styles.skeletonStatItem}>
                  <div
                    className={`${styles.skeleton} ${styles.skeletonStatValue}`}
                  />
                  <div
                    className={`${styles.skeleton} ${styles.skeletonStatLabel}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Skeleton Logout Button */}
          <div
            className={`${styles.skeleton} ${styles.skeletonLogoutButton}`}
          />
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
              <span className={styles.infoLabel}>Joined on</span>
              <span className={styles.infoValue}>
                {userData?.createdAt ? formatDate(userData.createdAt) : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Courses Card */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>📚 Your Courses</h3>
            {!isEditing && (
              <button
                onClick={handleStartEditing}
                className={styles.editButton}
              >
                {userData?.courses && userData.courses.length > 0
                  ? "Edit"
                  : "Add"}
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmitCourses} className={styles.coursesForm}>
              <div className={styles.inputsColumn}>
                <input
                  type="text"
                  value={courses[0]}
                  onChange={(e) => handleCourseChange(0, e.target.value)}
                  placeholder="e.g. COMP2521"
                  className={styles.input}
                />
                <input
                  type="text"
                  value={courses[1]}
                  onChange={(e) => handleCourseChange(1, e.target.value)}
                  placeholder="e.g. MATH1131"
                  className={styles.input}
                />
                <input
                  type="text"
                  value={courses[2]}
                  onChange={(e) => handleCourseChange(2, e.target.value)}
                  placeholder="e.g. COMP1531 (Optional &mdash; if doing 3 courses)"
                  className={styles.input}
                />
              </div>
              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={handleCancelEditing}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.saveCoursesButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Courses"}
                </button>
              </div>
            </form>
          ) : (
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
          )}
        </div>

        {/* Stats Summary Card */}
        <div className={styles.sectionCard}>
          <h3 className={styles.sectionTitle}>📊 Lifetime Study Summary</h3>
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
