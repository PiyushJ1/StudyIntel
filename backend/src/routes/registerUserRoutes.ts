import { Router, Request, Response } from "express";
import { saveNewUserAccount } from "../utils/registerUserStorage";
import { User } from "../models/interfaces";
import { validatePassword } from "../utils/validation";
import validator from "validator";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const newUser = req.body as User;

  if (!validator.isEmail(newUser.email)) {
    return res.status(400).json({ error: "Email provided was not valid" });
  }

  // validate password to fulfil basic criteria
  if (!validatePassword(newUser.password)) {
    return res
      .status(400)
      .json({ error: "Given password does not fulfil the criteria" });
  }

  try {
    await saveNewUserAccount(newUser);
    return res
      .status(201)
      .json({ message: "New user info saved successfully" });
  } catch (err) {
    if (
      err instanceof Error &&
      err.message === "An account with this email has already been registered."
    ) {
      return res.status(409).json({
        message: "An account with this email has already been registered.",
      });
    }

    return res.status(500).json({ message: "Failed to sign up" });
  }
});

export default router;
