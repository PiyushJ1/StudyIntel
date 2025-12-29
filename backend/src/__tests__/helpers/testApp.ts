/**
 * Test Application Helper
 * Creates an Express app instance for testing
 */

import express from "express";
import cookieParser from "cookie-parser";
import routes from "../../routes/index.js";

export function createTestApp() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.get("/", (req, res) => {
    res.send("Backend running successfully.");
  });

  app.use("/api", routes);

  return app;
}

export default createTestApp;
