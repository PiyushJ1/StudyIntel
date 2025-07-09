import validator from "validator";
import { Router, Request, Response } from "express";
import { saveEmailToWaitlist } from "../utils/waitlistStorage";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email provided was invalid" });
  }

  try {
    await saveEmailToWaitlist(email);
    return res.status(201).json({ message: "Waitlist joined successfully" });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "This email is already in the waitlist."
    ) {
      return res
        .status(409)
        .json({ message: "This email is already in the waitlist." });
    } else {
      return res.status(500).json({ message: "Failed to join waitlist" });
    }
  }
});

export default router;
