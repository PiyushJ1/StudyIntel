import jwt from "jsonwebtoken";
import { Router, Request, Response } from "express";
import { authenticateUser } from "../utils/validation";
import { InvalidPasswordError, UserNotFoundError } from "../errors/auth";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    await authenticateUser(email, password);

    // generate jwt token after user is authenticated
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: "5h",
    });

    // create cookie to send through browser
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 3600 * 5000, // cookie valid for 5 hours
      path: "/",
      domain: ".studyintel.app",
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
