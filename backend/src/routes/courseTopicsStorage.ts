import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const router = Router();

// Save or update course topics for a user
router.post("/", async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const { courseCode, topics } = req.body;

    if (!courseCode || !topics) {
      return res.status(400).json({ error: "Missing courseCode or topics" });
    }

    // topics is expected to be Record<string, string> like { "Week 1": "Intro", "Week 2": "Arrays" }
    const upsertPromises = Object.entries(topics).map(
      ([weekKey, topicText]) => {
        // Extract week number from "Week 1", "Week 2", etc.
        const weekMatch = weekKey.match(/\d+/);
        const weekNumber = weekMatch ? parseInt(weekMatch[0], 10) : 0;

        return prisma.courseTopic.upsert({
          where: {
            userId_courseCode_weekNumber: {
              userId: payload.userId,
              courseCode,
              weekNumber,
            },
          },
          update: {
            topic: topicText as string,
          },
          create: {
            userId: payload.userId,
            courseCode,
            weekNumber,
            topic: topicText as string,
          },
        });
      },
    );

    await Promise.all(upsertPromises);

    return res.status(200).json({ success: true, message: "Topics saved" });
  } catch (err) {
    console.error("Error saving course topics:", err);
    return res.status(500).json({ error: "Failed to save topics" });
  }
});

// Get all course topics for a user
router.get("/", async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const topics = await prisma.courseTopic.findMany({
      where: {
        userId: payload.userId,
      },
      orderBy: [{ courseCode: "asc" }, { weekNumber: "asc" }],
    });

    // Group by courseCode
    const grouped: Record<string, Record<string, string>> = {};

    for (const topic of topics) {
      if (!grouped[topic.courseCode]) {
        grouped[topic.courseCode] = {};
      }
      grouped[topic.courseCode][`Week ${topic.weekNumber}`] = topic.topic;
    }

    return res.status(200).json({ topics: grouped });
  } catch (err) {
    console.error("Error fetching course topics:", err);
    return res.status(500).json({ error: "Failed to fetch topics" });
  }
});

export default router;
