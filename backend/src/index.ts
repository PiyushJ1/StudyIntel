import express, { Request, Response } from "express";
import cors from "cors";
import waitlistRoutes from "./routes/waitlistRoutes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: ["https://studyintel.app", "http://localhost:3000"] }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Backend running successfully.");
});

app.use("/api/waitlist", waitlistRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
