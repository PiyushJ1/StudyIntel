import express, { Request, Response } from "express";
import cors from "cors";
import waitlistRoutes from "./routes/waitlistRoutes";
import signupUserRoute from "./routes/signupUserRoute";
import signinRoute from "./routes/signinRoute";
import startSession from "./routes/startSessionRoute";
import finishSession from "./routes/finishSessionRoute";
import newCourses from "./routes/newCourses";
import userInfo from "./routes/userInfo";
import courseTopics from "./routes/courseTopics";

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
app.use("/api/signup", signupUserRoute);

// authentice user log in
app.use("/api/signin", signinRoute);

// fetch user info
app.use("/api/users", userInfo);

// TO-DO: start new study session
app.use("/api/start-session", startSession);

// TO-DO: finish and save study session info
app.use("/api/finish-session", finishSession);

// add the user's courses which they are studying
app.use("/api/new-courses", newCourses);

// web scrape the course's topics in week-by-week format with PerplexityAI
app.use("/api/scrape-course", courseTopics);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
