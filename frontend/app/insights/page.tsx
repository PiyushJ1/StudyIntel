"use client";

import { useState, useEffect } from "react";
import styles from "./insights.module.css";

interface Stats {
  totalSeconds: number;
  sessionCount: number;
  averageSessionSeconds: number;
  streak: number;
  totalStudyTimes: Record<string, number>;
  weeklyActivity: Record<string, number>;
  longestSession: {
    duration: number;
    date: string | null;
    course: string;
  };
}

interface Insight {
  icon: string;
  title: string;
  description: string;
  type: "success" | "warning" | "info" | "achievement";
}

export default function InsightsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) {
          setStats(data.stats);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err);
        setLoading(false);
      });
  }, []);

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

  // Generate insights based on stats
  const generateInsights = (): Insight[] => {
    if (!stats) return [];

    const insights: Insight[] = [];
    const courses = Object.entries(stats.totalStudyTimes);
    const weeklyData = Object.entries(stats.weeklyActivity);

    // Streak insights
    if (stats.streak >= 7) {
      insights.push({
        icon: "🔥",
        title: "Incredible streak!",
        description: `You've studied ${stats.streak} days in a row. That's amazing consistency!`,
        type: "achievement",
      });
    } else if (stats.streak >= 3) {
      insights.push({
        icon: "🔥",
        title: "Nice streak going!",
        description: `${stats.streak} days and counting. Keep it up to build a strong habit!`,
        type: "success",
      });
    } else if (stats.streak === 0 && stats.sessionCount > 0) {
      insights.push({
        icon: "⏰",
        title: "Time to get back on track",
        description:
          "Your streak has reset. Start a session today to build momentum!",
        type: "warning",
      });
    }

    // Course balance insights
    if (courses.length >= 2) {
      const sortedCourses = [...courses].sort((a, b) => b[1] - a[1]);
      const mostStudied = sortedCourses[0];
      const leastStudied = sortedCourses[sortedCourses.length - 1];
      const totalTime = courses.reduce((sum, [, time]) => sum + time, 0);

      const mostPercentage = Math.round((mostStudied[1] / totalTime) * 100);
      const leastPercentage = Math.round((leastStudied[1] / totalTime) * 100);

      insights.push({
        icon: "📚",
        title: "Most studied course",
        description: `${mostStudied[0]} takes up ${mostPercentage}% of your study time (${toHours(mostStudied[1])}h total).`,
        type: "info",
      });

      if (leastPercentage < 20 && courses.length > 2) {
        insights.push({
          icon: "⚠️",
          title: "Needs attention",
          description: `${leastStudied[0]} only has ${leastPercentage}% of your time. Consider balancing your workload.`,
          type: "warning",
        });
      }
    }

    // Session insights
    if (stats.sessionCount >= 10) {
      insights.push({
        icon: "🎯",
        title: "Consistent learner",
        description: `You've completed ${stats.sessionCount} study sessions. Great dedication!`,
        type: "achievement",
      });
    }

    // Average session length insights
    if (stats.averageSessionSeconds >= 3600) {
      insights.push({
        icon: "💪",
        title: "Deep focus sessions",
        description: `Your average session is ${formatTime(stats.averageSessionSeconds)}. You're great at sustained focus!`,
        type: "success",
      });
    } else if (
      stats.averageSessionSeconds > 0 &&
      stats.averageSessionSeconds < 1800
    ) {
      insights.push({
        icon: "💡",
        title: "Try longer sessions",
        description: `Your average is ${formatTime(stats.averageSessionSeconds)}. Try extending to 45-60 min for deeper learning.`,
        type: "info",
      });
    }

    // Weekly activity insights
    const thisWeekTotal = weeklyData.reduce((sum, [, time]) => sum + time, 0);
    const daysStudied = weeklyData.filter(([, time]) => time > 0).length;

    if (daysStudied >= 5) {
      insights.push({
        icon: "📅",
        title: "Consistent week!",
        description: `You studied ${daysStudied} out of 7 days this week. Excellent consistency!`,
        type: "success",
      });
    }

    if (thisWeekTotal > 0) {
      insights.push({
        icon: "📈",
        title: "This week's progress",
        description: `You've studied ${toHours(thisWeekTotal)} hours this week across ${daysStudied} days.`,
        type: "info",
      });
    }

    // Best day insight
    if (weeklyData.length > 0) {
      const bestDay = [...weeklyData].sort((a, b) => b[1] - a[1])[0];
      if (bestDay[1] > 0) {
        const dayName = new Date(bestDay[0]).toLocaleDateString("en-US", {
          weekday: "long",
        });
        insights.push({
          icon: "⭐",
          title: "Best study day",
          description: `${dayName} was your most productive day with ${toHours(bestDay[1])} hours.`,
          type: "info",
        });
      }
    }

    // Longest session insight
    if (stats.longestSession.duration >= 7200) {
      insights.push({
        icon: "🏆",
        title: "Marathon session!",
        description: `Your longest session was ${formatTime(stats.longestSession.duration)} on ${stats.longestSession.course}. Impressive endurance!`,
        type: "achievement",
      });
    }

    // If no insights (new user)
    if (insights.length === 0) {
      insights.push({
        icon: "👋",
        title: "Welcome to StudyIntel!",
        description:
          "Start tracking your study sessions to see personalised insights here.",
        type: "info",
      });
    }

    return insights;
  };

  const insights = generateInsights();

  if (loading) {
    return (
      <main className={styles.insightsContainer}>
        <div className={styles.insightsContent}>
          {/* Skeleton Header */}
          <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
          <div className={`${styles.skeleton} ${styles.skeletonSubtitle}`} />

          {/* Skeleton Cards */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={styles.skeletonCard}>
              <div className={`${styles.skeleton} ${styles.skeletonIcon}`} />
              <div className={styles.skeletonContent}>
                <div
                  className={`${styles.skeleton} ${styles.skeletonCardTitle}`}
                />
                <div
                  className={`${styles.skeleton} ${styles.skeletonCardText}`}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className={styles.insightsContainer}>
      <div className={styles.insightsContent}>
        <h1 className={styles.pageTitle}>Insights</h1>
        <p className={styles.pageSubtitle}>
          Personalised observations based on your study patterns
        </p>

        <div className={styles.insightsGrid}>
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`${styles.insightCard} ${styles[insight.type]}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.insightIcon}>{insight.icon}</div>
              <div className={styles.insightContent}>
                <h3 className={styles.insightTitle}>{insight.title}</h3>
                <p className={styles.insightDescription}>
                  {insight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
