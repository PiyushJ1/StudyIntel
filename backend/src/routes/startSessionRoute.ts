import { Router, Request, Response } from "express";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    const { courseCode } = req.body;

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    if (!courseCode) {
      return res.status(400).json({
        error: "Can't start a session without the corresponding course code",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    let course = await prisma.course.findUnique({
      where: { code: courseCode },
    });
    if (!course) {
      course = await prisma.course.create({
        data: {
          code: courseCode,
          name: "Course",
        },
      });
    }

    const newSession = await prisma.studySession.create({
      data: {
        userId: payload.userId,
        courseCode,
        startTime: new Date(), // current timestamp
        // endTime is stored in finish session route
      },
    });

    return res.status(201).json({ sessionId: newSession.id });
  } catch (err) {
    console.error("Error creating and saving study session", err);
    return res.status(500).json({ error: "Could not start new study session" });
  }
});

export default router;
