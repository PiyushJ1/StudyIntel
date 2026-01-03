import { Router, Request, Response } from "express";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

const router = Router();

// Helper function to calculate study streak
function calculateStreak(sessionDates: Date[]): number {
  if (sessionDates.length === 0) return 0;

  // Get unique dates (as date strings to ignore time)
  const uniqueDates = [
    ...new Set(
      sessionDates.map((d) => new Date(d).toISOString().split("T")[0]),
    ),
  ].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  // Check if most recent session is today or yesterday
  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
    return 0; // Streak broken
  }

  let streak = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const prevDate = new Date(uniqueDates[i - 1]);
    const currDate = new Date(uniqueDates[i]);
    const diffDays = Math.floor(
      (prevDate.getTime() - currDate.getTime()) / 86400000,
    );

    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

// Helper function to get weekly activity (hours per day for last 7 days)
function getWeeklyActivity(
  sessions: { startTime: Date; duration: number | null }[],
): Record<string, number> {
  const weeklyData: Record<string, number> = {};
  const today = new Date();

  // Initialize last 7 days with 0
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    weeklyData[dateStr] = 0;
  }

  // Sum up durations per day
  for (const session of sessions) {
    if (session.duration) {
      const dateStr = new Date(session.startTime).toISOString().split("T")[0];
      if (weeklyData.hasOwnProperty(dateStr)) {
        weeklyData[dateStr] += session.duration;
      }
    }
  }

  return weeklyData;
}

router.get("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  // check header for auth
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // get token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Token doesn't exist" });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    // check if user is trying to access another user's info
    if (decoded.userId !== userId) {
      return res.status(403).json({ error: "Forbidden action" });
    }

    // couldn't find cache for items (cache miss)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        courses: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // fetch all the study sessions for the current user
    const sessions = await prisma.studySession.findMany({
      where: { userId },
      select: {
        id: true,
        courseCode: true,
        duration: true,
        startTime: true,
        endTime: true,
      },
      orderBy: {
        startTime: "desc",
      },
    });

    // Calculate stats
    const totalStudyTimes: Record<string, number> = {};
    let totalSeconds = 0;
    let sessionCount = 0;
    const sessionDates: Date[] = [];

    for (const session of sessions) {
      if (session.duration) {
        // Total per course
        if (!totalStudyTimes[session.courseCode]) {
          totalStudyTimes[session.courseCode] = 0;
        }
        totalStudyTimes[session.courseCode] += session.duration;

        // Overall totals
        totalSeconds += session.duration;
        sessionCount++;
        sessionDates.push(session.startTime);
      }
    }

    // Calculate derived stats
    const averageSessionSeconds =
      sessionCount > 0 ? Math.round(totalSeconds / sessionCount) : 0;
    const streak = calculateStreak(sessionDates);
    const weeklyActivity = getWeeklyActivity(sessions);

    // Find longest session
    const longestSession = sessions.reduce(
      (
        max: { duration: number; date: Date | null; course: string },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Temporary ignore
        session,
      ) => {
        if (session.duration && session.duration > (max.duration || 0)) {
          return {
            duration: session.duration,
            date: session.startTime,
            course: session.courseCode,
          };
        }
        return max;
      },
      { duration: 0, date: null as Date | null, course: "" },
    );

    return res.status(200).json({
      user,
      stats: {
        totalSeconds,
        sessionCount,
        averageSessionSeconds,
        streak,
        totalStudyTimes,
        weeklyActivity,
        longestSession,
      },
    });
  } catch (err) {
    console.log("Error fetch user info: ", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
