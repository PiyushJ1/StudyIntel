"use client";

import { useEffect, useState } from "react";

interface StudySession {
  id: string;
  courseCode: string;
  startTime: string;
  endTime: string | null;
  duration: number | null;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/past-sessions`, {
      credentials: "include",
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // If the API ever stops sorting, ensure most-recent-first here.
        const sorted = [...data].sort(
          (a, b) =>
            new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
        );
        setSessions(sorted);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error("Failed to get past study sessions", err);
        setError("Unable to load study sessions. Please try again.");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "—";

    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const courseColors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];

  const totalMinutes = sessions.reduce(
    (sum, s) => sum + (s.duration ?? 0) / 60,
    0,
  );
  const totalHours = Math.round((totalMinutes / 60) * 10) / 10;
  const totalSessions = sessions.length;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-['Inter'] pt-24 px-6 animate-fade-in">
      <div className="max-w-7xl mt-6 mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Study Sessions
          </h1>
          <p className="text-gray-400 text-lg">
            Track your recent sessions and time spent across courses.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 text-red-200 px-4 py-3">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/60 to-gray-800/60 animate-pulse"
                />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl p-6 border border-gray-800 animate-pulse"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="h-6 bg-gray-700 rounded w-24"></div>
                    <div className="h-6 bg-gray-700 rounded w-16"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-4 bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Summary Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent px-5 py-4">
                <p className="text-sm text-gray-400 mb-1">Total Sessions</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-white">
                    {totalSessions}
                  </span>
                  <span className="text-sm text-gray-500">sessions</span>
                </div>
              </div>
              <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent px-5 py-4">
                <p className="text-sm text-gray-400 mb-1">Total Time</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-white">
                    {totalHours}
                  </span>
                  <span className="text-sm text-gray-500">hours</span>
                </div>
              </div>
              <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent px-5 py-4">
                <p className="text-sm text-gray-400 mb-1">Avg / Session</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-white">
                    {totalSessions > 0
                      ? formatDuration(
                          Math.round((totalMinutes * 60) / totalSessions),
                        )
                      : "—"}
                  </span>
                  <span className="text-sm text-gray-500">per session</span>
                </div>
              </div>
            </div>

            {/* Sessions List */}
            {sessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.map((session, index) => {
                  const color = courseColors[index % courseColors.length];
                  const minutes = session.duration
                    ? Math.round(session.duration / 60)
                    : null;

                  return (
                    <div
                      key={session.id}
                      className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-black/30"
                      style={{ borderTop: `3px solid ${color}` }}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-gray-500">
                            Course
                          </p>
                          <h3 className="text-xl font-semibold text-white">
                            {session.courseCode}
                          </h3>
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: `${color}20`,
                            color: color,
                            border: `1px solid ${color}40`,
                          }}
                        >
                          {formatDuration(session.duration)}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                              Date
                            </p>
                            <p className="text-white font-medium text-sm">
                              {formatDate(session.startTime)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                              Time
                            </p>
                            <p className="text-white font-medium text-sm">
                              {formatTime(session.startTime)}
                              {session.endTime &&
                                ` - ${formatTime(session.endTime)}`}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="rounded-lg border border-gray-800 bg-gray-900/40 px-3 py-2">
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                              Duration
                            </p>
                            <p className="text-white font-semibold text-sm">
                              {formatDuration(session.duration)}
                            </p>
                          </div>
                          <div className="rounded-lg border border-gray-800 bg-gray-900/40 px-3 py-2">
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                              Minutes
                            </p>
                            <p className="text-white font-semibold text-sm">
                              {minutes ?? "—"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 rounded-xl border border-dashed border-gray-800 bg-gray-900/40">
                <div className="text-6xl mb-4">📖</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No Study Sessions Yet
                </h3>
                <p className="text-gray-400">
                  Start studying to see your sessions appear here!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
