"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./Courses.module.css";

interface CourseStats {
  totalStudyTimes: Record<string, number>;
  sessionCount: number;
}

type TopicsMap = Record<string, Record<string, string>>;

export default function CoursesPage() {
  const [courses, setCourses] = useState<string[]>(["", "", ""]);
  const [displayCourses, setDisplayCourses] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [courseStats, setCourseStats] = useState<CourseStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Topics state
  const [savedTopics, setSavedTopics] = useState<TopicsMap>({});
  const [editableTopics, setEditableTopics] = useState<TopicsMap>({});
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [savingTopics, setSavingTopics] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<
    Record<string, boolean>
  >({});

  // Fetch saved topics from database
  const fetchSavedTopics = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/course-topics`,
        {
          credentials: "include",
        },
      );
      if (res.ok) {
        const data = await res.json();
        if (data.topics) {
          setSavedTopics(data.topics);
          setEditableTopics(data.topics);
        }
      }
    } catch (err) {
      console.error("Failed to fetch saved topics:", err);
    }
  }, []);

  const fetchUserData = useCallback((isInitial = false) => {
    fetch("/api/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.userId) {
          setUserId(data.userId);
        }
        if (data.courses) {
          setDisplayCourses(data.courses);
        }
        if (data.stats) {
          setCourseStats({
            totalStudyTimes: data.stats.totalStudyTimes || {},
            sessionCount: data.stats.sessionCount || 0,
          });
        }
        if (isInitial) {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err);
        if (isInitial) {
          setLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    fetchUserData(true);
    fetchSavedTopics();
  }, [fetchUserData, fetchSavedTopics]);

  const handleCourseChange = (index: number, value: string) => {
    const newCourses = [...courses];
    newCourses[index] = value.toUpperCase();
    setCourses(newCourses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
            userId: userId,
          }),
        },
      );

      if (!response.ok) {
        alert("Submission failed");
        return;
      }

      setCourses(["", "", ""]);
      setDisplayCourses(validCourses);
      fetchUserData();
    } catch (err) {
      console.log("Error: ", err);
      alert("Error adding courses");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch topics from AI for a specific course
  const handleFetchTopicsForCourse = async (courseCode: string) => {
    setLoadingTopics(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/scrape-course/${courseCode}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseCode }),
        },
      );

      if (res.ok) {
        const data = await res.json();
        if (data.topics) {
          setEditableTopics((prev) => ({
            ...prev,
            [courseCode]: data.topics,
          }));
          setHasUnsavedChanges((prev) => ({
            ...prev,
            [courseCode]: true,
          }));
        }
      }
    } catch (err) {
      console.error("Error fetching topics:", err);
    } finally {
      setLoadingTopics(false);
    }
  };

  // Handle topic text change
  const handleTopicChange = (
    courseCode: string,
    weekKey: string,
    value: string,
  ) => {
    setEditableTopics((prev) => ({
      ...prev,
      [courseCode]: {
        ...prev[courseCode],
        [weekKey]: value,
      },
    }));
    setHasUnsavedChanges((prev) => ({
      ...prev,
      [courseCode]: true,
    }));
  };

  // Save topics to database
  const handleSaveTopics = async (courseCode: string) => {
    setSavingTopics(courseCode);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/course-topics`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            courseCode,
            topics: editableTopics[courseCode],
          }),
        },
      );

      if (res.ok) {
        setSavedTopics((prev) => ({
          ...prev,
          [courseCode]: editableTopics[courseCode],
        }));
        setHasUnsavedChanges((prev) => ({
          ...prev,
          [courseCode]: false,
        }));
      } else {
        alert("Failed to save topics");
      }
    } catch (err) {
      console.error("Error saving topics:", err);
      alert("Error saving topics");
    } finally {
      setSavingTopics(null);
    }
  };

  // Helper functions
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const toHours = (seconds: number) => {
    return Math.round((seconds / 3600) * 10) / 10;
  };

  const totalStudyTime = courseStats
    ? Object.values(courseStats.totalStudyTimes).reduce((a, b) => a + b, 0)
    : 0;

  const getCoursePercentage = (courseCode: string) => {
    if (!courseStats || totalStudyTime === 0) return 0;
    const courseTime = courseStats.totalStudyTimes[courseCode] || 0;
    return Math.round((courseTime / totalStudyTime) * 100);
  };

  const getCourseSessionEstimate = (courseCode: string) => {
    if (!courseStats || totalStudyTime === 0) return 0;
    const courseTime = courseStats.totalStudyTimes[courseCode] || 0;
    const proportion = courseTime / totalStudyTime;
    return Math.round(courseStats.sessionCount * proportion);
  };

  const courseColors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];

  // Loading skeleton
  if (loading) {
    return (
      <main className={styles.coursesContainer}>
        <div className={styles.coursesContent}>
          {/* Skeleton Header */}
          <div className={styles.pageHeader}>
            <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
            <div className={`${styles.skeleton} ${styles.skeletonSubtitle}`} />
          </div>

          {/* Skeleton Course Cards */}
          <div className={styles.courseCardsSection}>
            <div className={styles.courseCardsGrid}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.skeletonCourseCard}>
                  <div className={styles.skeletonCourseHeader}>
                    <div className={`${styles.skeleton} ${styles.skeletonCourseCode}`} />
                    <div className={`${styles.skeleton} ${styles.skeletonCourseBadge}`} />
                  </div>
                  <div className={styles.skeletonStatsRow}>
                    {[1, 2, 3].map((j) => (
                      <div key={j} className={styles.skeletonStatItem}>
                        <div className={`${styles.skeleton} ${styles.skeletonStatValue}`} />
                        <div className={`${styles.skeleton} ${styles.skeletonStatLabel}`} />
                      </div>
                    ))}
                  </div>
                  <div className={`${styles.skeleton} ${styles.skeletonProgressBar}`} />
                </div>
              ))}
            </div>

            {/* Skeleton Balance Card */}
            <div className={styles.skeletonBalanceCard}>
              <div className={`${styles.skeleton} ${styles.skeletonBalanceTitle}`} />
              <div className={`${styles.skeleton} ${styles.skeletonBalanceBar}`} />
              <div className={styles.skeletonLegend}>
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`${styles.skeleton} ${styles.skeletonLegendItem}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Skeleton Form Card */}
          <div className={styles.skeletonFormCard}>
            <div className={`${styles.skeleton} ${styles.skeletonFormTitle}`} />
            <div className={styles.skeletonInputsRow}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={`${styles.skeleton} ${styles.skeletonInput}`} />
              ))}
            </div>
            <div className={`${styles.skeleton} ${styles.skeletonButton}`} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.coursesContainer}>
      <div className={styles.coursesContent}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>📚 My Courses</h1>
          <p className={styles.pageSubtitle}>
            Manage your courses and track progress for each subject
          </p>
        </div>

        {/* Course Cards */}
        {displayCourses.length > 0 && (
          <div className={styles.courseCardsSection}>
            <div className={styles.courseCardsGrid}>
              {displayCourses.map((course, index) => {
                const courseTime = courseStats?.totalStudyTimes[course] || 0;
                const percentage = getCoursePercentage(course);
                const sessions = getCourseSessionEstimate(course);
                const color = courseColors[index % courseColors.length];

                return (
                  <div
                    key={course}
                    className={styles.courseCard}
                    style={{ borderTopColor: color }}
                  >
                    <div className={styles.courseCardHeader}>
                      <h3 className={styles.courseCode}>{course}</h3>
                      <span
                        className={styles.coursePercentBadge}
                        style={{ backgroundColor: `${color}20`, color }}
                      >
                        {percentage}%
                      </span>
                    </div>

                    <div className={styles.courseStatsRow}>
                      <div className={styles.courseStat}>
                        <span className={styles.courseStatValue}>
                          {toHours(courseTime)}h
                        </span>
                        <span className={styles.courseStatLabel}>
                          Total Time
                        </span>
                      </div>
                      <div className={styles.courseStat}>
                        <span className={styles.courseStatValue}>
                          {sessions}
                        </span>
                        <span className={styles.courseStatLabel}>Sessions</span>
                      </div>
                      <div className={styles.courseStat}>
                        <span className={styles.courseStatValue}>
                          {sessions > 0
                            ? formatTime(Math.round(courseTime / sessions))
                            : "—"}
                        </span>
                        <span className={styles.courseStatLabel}>Avg</span>
                      </div>
                    </div>

                    <div className={styles.courseProgressBar}>
                      <div
                        className={styles.courseProgressFill}
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Overall Balance Card */}
            <div className={styles.balanceCard}>
              <h3 className={styles.balanceTitle}>📊 Study Balance</h3>
              <div className={styles.balanceBarContainer}>
                {displayCourses.map((course, index) => {
                  const percentage = getCoursePercentage(course);
                  const color = courseColors[index % courseColors.length];
                  if (percentage === 0) return null;
                  return (
                    <div
                      key={course}
                      className={styles.balanceSegment}
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: color,
                      }}
                      title={`${course}: ${percentage}%`}
                    />
                  );
                })}
              </div>
              <div className={styles.balanceLegend}>
                {displayCourses.map((course, index) => {
                  const color = courseColors[index % courseColors.length];
                  return (
                    <div key={course} className={styles.legendItem}>
                      <span
                        className={styles.legendDot}
                        style={{ backgroundColor: color }}
                      />
                      <span className={styles.legendText}>{course}</span>
                    </div>
                  );
                })}
              </div>
              {totalStudyTime === 0 && (
                <p className={styles.balanceEmpty}>
                  Start studying to see your time distribution!
                </p>
              )}
            </div>
          </div>
        )}

        {/* Add Courses Form */}
        <div className={styles.addCoursesCard}>
          <h2 className={styles.addCoursesTitle}>
            {displayCourses.length > 0 ? "Update Courses" : "Add Your Courses"}
          </h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputsRow}>
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
                placeholder="e.g. COMP1531 (Optional)"
                className={styles.input}
              />
            </div>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Courses"}
            </button>
          </form>
        </div>

        {/* Course Topics Section */}
        {displayCourses.length > 0 && (
          <div className={styles.topicsSection}>
            <div className={styles.topicsHeader}>
              <div>
                <h2 className={styles.topicsTitle}>📖 Weekly Topics</h2>
                <p className={styles.topicsSubtitle}>
                  Fetch AI-generated outlines, edit as needed, and save to your
                  account
                </p>
              </div>
            </div>

            <div className={styles.topicsGrid}>
              {displayCourses.map((course, index) => {
                const topics = editableTopics[course] || {};
                const hasSaved = !!savedTopics[course];
                const hasTopics = Object.keys(topics).length > 0;
                const color = courseColors[index % courseColors.length];
                const isUnsaved = hasUnsavedChanges[course];

                return (
                  <div
                    key={course}
                    className={styles.topicsCard}
                    style={{ borderTopColor: color }}
                  >
                    <div className={styles.topicsCardHeader}>
                      <h3 className={styles.topicsCardTitle}>{course}</h3>
                      <div className={styles.topicsCardActions}>
                        {!hasTopics && (
                          <button
                            onClick={() => handleFetchTopicsForCourse(course)}
                            className={styles.fetchButton}
                            disabled={loadingTopics}
                          >
                            {loadingTopics ? "..." : "Fetch"}
                          </button>
                        )}
                        {hasTopics && (
                          <>
                            <button
                              onClick={() => handleFetchTopicsForCourse(course)}
                              className={styles.refetchButton}
                              disabled={loadingTopics}
                              title="Re-fetch from AI"
                            >
                              ↻
                            </button>
                            <button
                              onClick={() => handleSaveTopics(course)}
                              className={`${styles.saveButton} ${isUnsaved ? styles.saveButtonActive : ""}`}
                              disabled={savingTopics === course || !isUnsaved}
                            >
                              {savingTopics === course
                                ? "Saving..."
                                : isUnsaved
                                  ? "Save"
                                  : "Saved ✓"}
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {hasTopics ? (
                      <ul className={styles.topicsList}>
                        {Object.entries(topics)
                          .sort((a, b) => {
                            const numA = parseInt(
                              a[0].match(/\d+/)?.[0] || "0",
                            );
                            const numB = parseInt(
                              b[0].match(/\d+/)?.[0] || "0",
                            );
                            return numA - numB;
                          })
                          .map(([week, topic]) => (
                            <li key={week} className={styles.topicItem}>
                              <span className={styles.weekLabel}>{week}</span>
                              <input
                                type="text"
                                value={topic}
                                onChange={(e) =>
                                  handleTopicChange(
                                    course,
                                    week,
                                    e.target.value,
                                  )
                                }
                                className={styles.topicInput}
                              />
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <div className={styles.topicsCardEmpty}>
                        <p>
                          {hasSaved
                            ? "Loading saved topics..."
                            : 'Click "Fetch" to get AI-generated topics'}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
