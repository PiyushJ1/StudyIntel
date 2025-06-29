import { Router, Request, Response } from "express";
import { saveNewUserAccount } from "../utils/registerUserStorage";
import { User } from "../models/interfaces";
import { validateEmail, validatePassword } from "../utils/validation";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const newUser = req.body as User;

  // email regex validation
  if (!validateEmail(newUser.email)) {
    return res.status(400).json({ error: "Email provided was not valid" });
  }

  // validate password to fulfil basic criteria 
  if (!validatePassword(newUser.password)) {
    return res.status(400).json({ error: "Given password does not fulfil the criteria" });    
  }

  try {
    await saveNewUserAccount(newUser);
    return res
      .status(201)
      .json({ message: "New user info saved successfully" });
  } catch (err) {
    console.log("Couldnt save new user info", err);
    return res.status(500).json({ message: "Failed to save new user info" });
  }
});

export default router;
