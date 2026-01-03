import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: ["https://studyintel.app", "http://localhost:3000"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Backend running successfully.");
});

app.get("/health", (req, res) => {
  res.send({ status: "Running", Time: Date().toLocaleString() });
});

// mount all API routes under "/api"
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
