import express, { Request, Response } from "express";
import cors from "cors";
import waitlistRoutes from "./routes/waitlistRoutes";
import registerUserRoutes from "./routes/registerUserRoutes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: ["https://studyintel.app", "http://localhost:3000"] }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Backend running successfully.");
});

// save email to waitlist
app.use("/api/waitlist", waitlistRoutes);

// register new user and save their info
app.use("/api/register", registerUserRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
