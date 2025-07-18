import jwt from "jsonwebtoken";
import { Router, Request, Response } from "express";
import { authenticateUser } from "../utils/validation";
import { InvalidPasswordError, UserNotFoundError } from "../errors/auth";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    await authenticateUser(email, password);

    // generate jwt token if user was authenticated
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: "5h",
    });

    console.log("Setting cookie with token:", token.substring(0, 20) + "...");

    // create cookie to send through browser
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Always use secure in production for cross-domain
      sameSite: "none", // Required for cross-domain cookies
      maxAge: 5 * 60 * 60 * 1000, // 5 hours in milliseconds
      path: "/",
      domain: undefined, // Let browser handle domain automatically
    });

    // Also set CORS headers explicitly for cookie handling
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', 'https://studyintel.app');

    console.log("Cookie should be set in response headers");
    
    return res.status(200).json({ 
      message: "Login was successful",
      token: token // Fallback if cookies don't work
    });
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
        .json({ message: "Login was unsuccessful. Please try again" });
    }
  }
});

export default router;
