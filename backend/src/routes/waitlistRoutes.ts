import { Router, Request, Response } from "express";
import { validateEmail } from "../utils/validation";
import { saveEmailToWaitlist } from "../utils/waitlistStorage";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  const { email } = req.body;
  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Email provided was invalid" });
  }

  try {
    saveEmailToWaitlist(email);
    return res.status(201).json({ message: "Waitlist joined succesffully" });
  } catch (err) {
    console.log("Could not save to waitlist", err);
    return res.status(500).json({ message: "Failed to join waitlist" });
  }
});

export default router;
