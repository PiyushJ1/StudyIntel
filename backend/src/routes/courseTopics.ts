import { Router, Request, Response } from "express";
import { getCourseTopics } from "../utils/pplxApiCalls.js";

const router = Router();

router.post("/:courseCode", async (req: Request, res: Response) => {
  const { courseCode } = req.params;

  try {
    const topics = await getCourseTopics(courseCode);
    return res.status(200).json({ topics });
  } catch (err) {
    console.error("Could not call pplx api: ", err);
    return res.status(500).json({ error: "Failed to call PerplexityAI API " });
  }
});

export default router;
