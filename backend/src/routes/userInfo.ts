import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();

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
    // if (decoded.userId !== userId) {
    //   return res.status(403).json({ error: "Forbidden action" });
    // }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstname: true,
        courses: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // fetch all the study sessions for the current user
    const sessions = await prisma.studySession.findMany({
      where: { userId },
      select: {
        courseCode: true,
        duration: true,
      },
    });

    // add all of the sessions and group them by course
    const totalStudyTimes: Record<string, number> = {};
    for (const session of sessions) {
      // check if duration is not null
      if (session.duration) {
        // init total duration for current course to 0 if it doesn't exist
        if (!totalStudyTimes[session.courseCode]) {
          totalStudyTimes[session.courseCode] = 0;
        }
        // add duration for current course
        totalStudyTimes[session.courseCode] += session.duration;
      }
    }

    return res.status(200).json({
      user,
      totalStudyTimes,
    });
  } catch (err) {
    console.log("Error fetch user info: ", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
