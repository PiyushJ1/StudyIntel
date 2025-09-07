import jwt from "jsonwebtoken";
import { Router, Request, Response } from "express";
import { authenticateUser } from "../utils/validation";
import { InvalidPasswordError, UserNotFoundError } from "../errors/auth";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await authenticateUser(email, password);

    // generate jwt token after user is authenticated
    const token = jwt.sign(
      {
        userId: user.id,
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
