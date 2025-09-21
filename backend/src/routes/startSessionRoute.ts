import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    const userId = payload.userId;

    const courseCode = "COMP2511";

    // Create new course if it doesnt already exist
    // const newCourse = await prisma.course.create({
    //   data: {
    //     code: "hello",
    //     name: "fdfsfsd"
    //   },
    // })

    const newSession = await prisma.studySession.create({
      data: {
        userId,
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
