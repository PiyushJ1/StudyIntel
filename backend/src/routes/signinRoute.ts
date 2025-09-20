import jwt from "jsonwebtoken";
import { Router, Request, Response } from "express";
import { authenticateUser } from "../utils/validation";
import { InvalidPasswordError, UserNotFoundError } from "../errors/auth";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, password, remember } = req.body;

  try {
    const user = await authenticateUser(email, password);

    // generate jwt token after user is authenticated
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: remember ? "720h" : "5h", // 1 month or 5 hours
    });

    // set a longer cookie expiration time if user selects "Remember Me"
    const maxDuration = remember ? 1000 * 60 * 60 * 720 : 1000 * 60 * 60 * 5;

    // create cookie to send through browser
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: maxDuration,
      path: "/",
      ...(isProd && { domain: ".studyintel.app" }), // only set in production
    });

    return res.status(200).json({ message: "Sign in was successful" });
  } catch (error) {
    if (
      error instanceof UserNotFoundError ||
      error instanceof InvalidPasswordError
    ) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    } else {
      return res
        .status(500)
        .json({ message: "Sign in was unsuccessful. Please try again" });
    }
  }
});

export default router;
