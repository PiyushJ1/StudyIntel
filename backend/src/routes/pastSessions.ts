import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    // validate token
    if (!token) {
      return res.status(401).json({ error: "Not Authenticated" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    // find and return all study sessions from most to least recent
    let sessions = await prisma.studySession.findMany({
      where: { userId: payload.userId },
      orderBy: {
        startTime: "desc",
      },
    });

    return res.status(200).json(sessions);
  } catch (err) {
    console.log("error: ", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch past study sessions" });
  }
});

export default router;
