import { Router, Request, Response } from "express";
import { saveNewUserAccount } from "../utils/signupUserStorage";
import { User } from "../models/interfaces";
import { validatePassword } from "../utils/validation";
import validator from "validator";
import jwt from "jsonwebtoken";

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

    // sign token for the new user
    const token = jwt.sign(
      {
        firstName: newUser.firstName,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "5h",
      },
    );

    // create cookie to send through browser
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 5, // 5 hour cookie duration
      path: "/",
      ...(isProd && { domain: ".studyintel.app" }), // only set in production
    });

    return res
      .status(201)
      .json({ message: "New user info saved successfully" });
  } catch (err) {
    if (
      err instanceof Error &&
      err.message === "An account with this email has already been signed up."
    ) {
      return res.status(409).json({
        message: "An account with this email has already been signed up.",
      });
    }

    return res.status(500).json({ message: "Failed to sign up" });
  }
});

export default router;
