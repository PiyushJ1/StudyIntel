import jwt from "jsonwebtoken";
import { Router, Request, Response } from "express";
import { authenticateUser } from "../utils/validation";
import { InvalidPasswordError, UserNotFoundError } from "../errors/auth";
import redis from "../lib/redis";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, password, remember } = req.body;
  const maxSignInAttempts = 5;

  try {
    // rate limit the login attempts
    const attempts = await redis.get(`loginAttempts:${email}`);
    if (Number(attempts) >= maxSignInAttempts) {
      return res.status(429).json({
        message: "Too many failed sign in attempts. Try again in 15 minutes",
      });
    }

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

    // delete cache if login was successful
    await redis.del(`loginAttempts:${email}`);

    return res
      .status(200)
      .json({ message: "Sign in was successful", firstName: user.firstName });
  } catch (error) {
    // // set failed attempt expiry
    // const TTL = await redis.ttl(`loginAttempts:${email}`);
    // if (TTL === 1) {
    //   await redis.expire(`loginAttempts:${email}`, 15 * 60); // 15 min expiry
    // }

    // // increase failed attempt count
    // await redis.incr(`loginAttempts:${email}`);

    const attempts = await redis.incr(`loginAttempts:${email}`);
    if (attempts >= 1) {
      await redis.expire(`loginAttempts:${email}`, 15 * 60); // 15 min expiry
    }

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
