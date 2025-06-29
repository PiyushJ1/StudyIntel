import { Router, Request, Response } from "express";
import { saveNewUserAccount } from "../utils/registerUserStorage";
import { User } from "../models/interfaces";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const newUser = req.body as User;

  // add potential info validation here?

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
