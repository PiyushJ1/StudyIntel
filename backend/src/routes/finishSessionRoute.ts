import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.patch("/", async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res
        .status(400)
        .json({ error: "sessionId is required to end the session " });
    }

    const updatedSession = await prisma.studySession.update({
      where: { id: sessionId },
      data: { endTime: new Date() },
    });

    return res.status(200).json({ sessionId: updatedSession.id });
  } catch (err) {
    console.error("Error finishing and saving study session", err);
    return res.status(500).json({ error: "Could not finish study session" });
  }
});

export default router;
