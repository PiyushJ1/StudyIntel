"use client";

import styles from "./dashboard.module.css";
import DecryptedText from "../../components/DecryptedText";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

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

const CHART_COLORS = [
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#ec4899", // pink
];

export default function DashboardPage() {
  const [firstName, setFirstName] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("firstName") || ""
      : "",
  );
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.firstname) {
          setFirstName(data.firstname);
          localStorage.setItem("firstName", data.firstname);
        }
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

  // Format seconds to human readable
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  // Format seconds to decimal hours
  const toHours = (seconds: number) => {
    return Math.round((seconds / 3600) * 10) / 10;
  };

  // Prepare bar chart data for courses
  const courseChartData = stats
    ? Object.entries(stats.totalStudyTimes).map(([course, seconds], idx) => ({
        name: course,
        hours: toHours(seconds),
        color: CHART_COLORS[idx % CHART_COLORS.length],
      }))
    : [];

  // Prepare weekly activity data
  const weeklyChartData = stats
    ? Object.entries(stats.weeklyActivity).map(([date, seconds]) => ({
        day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        hours: toHours(seconds),
        minutes: Math.round(seconds / 60),
        seconds: seconds,
      }))
    : [];

  // Determine if we should show minutes or hours for weekly chart
  const maxWeeklySeconds = Math.max(
    ...weeklyChartData.map((d) => d.seconds),
    0,
  );
  const showMinutes = maxWeeklySeconds < 3600; // Less than 1 hour total

  // Get total hours
  const totalHours = stats ? toHours(stats.totalSeconds) : 0;

  // Loading skeleton
  if (loading) {
    return (
      <main className={styles.dashboardContainer}>
        <div className={styles.dashboardContent}>
          {/* Welcome Skeleton */}
          <div className={styles.welcomeSection}>
            <div className={styles.skeletonWelcome}>
              <div className={`${styles.skeleton} ${styles.skeletonTextLg}`} />
            </div>
          </div>

          <div className={styles.subtitleSection}>
            <div className={`${styles.skeleton} ${styles.skeletonTextMd}`} />
          </div>

          {/* Stats Skeleton */}
          <div className={styles.statsGrid}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.statCard}>
                <div className={`${styles.skeleton} ${styles.skeletonIcon}`} />
                <div
                  className={`${styles.skeleton} ${styles.skeletonStatValue}`}
                />
                <div
                  className={`${styles.skeleton} ${styles.skeletonStatLabel}`}
                />
              </div>
            ))}
          </div>

          {/* Charts Skeleton */}
          <div className={styles.chartsGrid}>
            <div className={styles.chartCard}>
              <div
                className={`${styles.skeleton} ${styles.skeletonChartTitle}`}
              />
              <div className={`${styles.skeleton} ${styles.skeletonChart}`} />
            </div>
            <div className={styles.chartCard}>
              <div
                className={`${styles.skeleton} ${styles.skeletonChartTitle}`}
              />
              <div className={`${styles.skeleton} ${styles.skeletonChart}`} />
            </div>
          </div>

          {/* Highlight Skeleton */}
          <div className={styles.highlightCard}>
            <div
              className={`${styles.skeleton} ${styles.skeletonHighlightIcon}`}
            />
            <div className={styles.highlightContent}>
              <div className={`${styles.skeleton} ${styles.skeletonTextSm}`} />
              <div
                className={`${styles.skeleton} ${styles.skeletonTextMd}`}
                style={{ marginTop: "0.5rem" }}
              />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        {/* Welcome Section */}
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
          </h1>
        </div>

        <div className={styles.subtitleSection}>
          <h2 className={styles.subtitleText}>
            Ready to keep levelling up your study journey?
          </h2>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>⏱️</div>
            <div className={styles.statValue}>{`${totalHours}h`}</div>
            <div className={styles.statLabel}>Total Study Time</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>📚</div>
            <div className={styles.statValue}>{stats?.sessionCount || 0}</div>
            <div className={styles.statLabel}>Sessions Completed</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>📊</div>
            <div className={styles.statValue}>
              {formatTime(stats?.averageSessionSeconds || 0)}
            </div>
            <div className={styles.statLabel}>Avg Session</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>🔥</div>
            <div
              className={styles.statValue}
            >{`${stats?.streak || 0} days`}</div>
            <div className={styles.statLabel}>Current Streak</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className={styles.chartsGrid}>
          {/* Hours by Course */}
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Hours by Course</h3>
            {courseChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={courseChartData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 60, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9ca3af" unit="h" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="#9ca3af"
                    width={50}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    formatter={(value) => [`${value} hours`, "Time"]}
                  />
                  <Bar dataKey="hours" radius={[0, 4, 4, 0]}>
                    {courseChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className={styles.emptyChart}>
                <p>No study sessions yet</p>
                <p className={styles.emptyChartSub}>
                  Start a session to see your progress!
                </p>
              </div>
            )}
          </div>

          {/* This Week Activity */}
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>This Week</h3>
            {weeklyChartData.some((d) => d.seconds > 0) ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={weeklyChartData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" unit={showMinutes ? "m" : "h"} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    formatter={(value) => [
                      `${value} ${showMinutes ? "minutes" : "hours"}`,
                      "Time",
                    ]}
                  />
                  <Bar
                    dataKey={showMinutes ? "minutes" : "hours"}
                    fill="#8b5cf6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className={styles.emptyChart}>
                <p>No activity this week</p>
                <p className={styles.emptyChartSub}>
                  Start studying to see your weekly progress!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Longest Session Card */}
        {stats?.longestSession?.duration ? (
          <div className={styles.highlightCard}>
            <div className={styles.highlightIcon}>🏆</div>
            <div className={styles.highlightContent}>
              <div className={styles.highlightTitle}>Longest Session</div>
              <div className={styles.highlightValue}>
                {formatTime(stats.longestSession.duration)} studying{" "}
                {stats.longestSession.course}
              </div>
              {stats.longestSession.date && (
                <div className={styles.highlightDate}>
                  on{" "}
                  {new Date(stats.longestSession.date).toLocaleDateString(
                    "en-AU",
                    {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    },
                  )}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
