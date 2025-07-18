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
    
    // Cookie settings for cross-domain
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none" as const,
      maxAge: 5 * 60 * 60 * 1000, // 5 hours in milliseconds
      path: "/",
    };
    
    console.log("Cookie options:", cookieOptions);

    // Set cookie using Express method
    res.cookie("token", token, cookieOptions);
    
    // Set CORS headers for cookie handling
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', 'https://studyintel.app');

    console.log("Cookie should be set in response headers");
    console.log("Response headers:", res.getHeaders());
    
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
