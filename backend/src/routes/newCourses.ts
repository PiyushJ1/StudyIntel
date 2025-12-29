import { Router, Request, Response } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { courses, userId } = req.body;

  if (!courses) {
    return res.status(400).json({ error: "Could not get user courses" });
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { courses: courses },
    });

    return res.status(201).json({ message: "Courses added successfully" });
  } catch (err) {
    console.log("Database err: ", err);
    return res.status(500).json({ message: "Could not add courses" });
  }
});

export default router;
