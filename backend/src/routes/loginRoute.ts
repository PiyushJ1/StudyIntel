import { Router, Request, Response } from "express";
import { authenticateUser } from "../utils/validation";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const response = await authenticateUser(email, password);
  if (response.result) {
    res.status(200).json({ message: response.message });
  } else {
    res.status(401).json({ error: response.message });
  }
});

export default router;