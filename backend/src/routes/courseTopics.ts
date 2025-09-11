import { Router, Request, Response } from "express";
import { getCourseTopics } from "../utils/pplxApiCalls";

const router = Router();

router.get("/:courseCode", async (req: Request, res: Response) => {
  const { courseCode } = req.params;

  try {
    const topics = await getCourseTopics(courseCode);
    return res.status(200).json({ topics });
  } catch (err) {
    return res.status(500).json({ error: "Failed to call Perplexity API " });
  }
});

export default router;
