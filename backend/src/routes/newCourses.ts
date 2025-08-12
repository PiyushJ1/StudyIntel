import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req: Request, res: Response) => {
  const { courses, userId } = req.body;

  if (!courses) {
    return res.status(400).json({ error: "" });
  }

  let finalUserId: string;
  if (process.env.NODE_ENV === "development") {
    finalUserId = "f8ccedbe-1fb4-494d-acd8-cd6c9c756c99";
  } else {
    finalUserId = userId;
  }

  try {
    await prisma.user.update({
      where: { id: finalUserId },
      data: { courses: courses },
    });

    return res.status(201).json({ message: "Courses added successfully" });
  } catch (err) {
    console.log("Database err: ", err);
    return res.status(500).json({ message: "Could not add courses" });
  }
});

export default router;
