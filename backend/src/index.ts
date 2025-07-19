import express, { Request, Response } from "express";
import cors from "cors";
import waitlistRoutes from "./routes/waitlistRoutes";
import signupUserRoutes from "./routes/signupUserRoutes";
import signinRoute from "./routes/signinRoute";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: ["https://studyintel.app", "http://localhost:3000"],
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Backend running successfully.");
});

// save email to waitlist
app.use("/api/waitlist", waitlistRoutes);

// signup new user and save their info
app.use("/api/signup", signupUserRoutes);

// authentice user log in
app.use("/api/signin", signinRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
