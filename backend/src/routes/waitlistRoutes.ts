import { Router, Request, Response } from "express";
import { validateEmail } from "../utils/validation";
import { saveEmailToWaitlist } from "../utils/waitlistStorage";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  console.log("📥 /api/waitlist POST route hit");
  console.log("Request body:", req.body);

  const { email } = req.body;
  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Email provided was invalid" });
  }

  try {
    await saveEmailToWaitlist(email);
    return res.status(201).json({ message: "Waitlist joined successfully" });
  } catch (err) {
    console.error("❌ Error in POST /api/waitlist:", err); 
    return res.status(500).json({ message: "Failed to join waitlist" });
  }
});


export default router;
