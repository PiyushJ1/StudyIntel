import { Router, Request, Response } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { userId, endTime, status } = req.body;

  try {
  } catch (err) {}
});

export default router;
