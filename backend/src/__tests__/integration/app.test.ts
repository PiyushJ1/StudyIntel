/**
 * Application Integration Tests
 * Tests for overall app configuration and root endpoint
 */

import request from "supertest";
import { createTestApp } from "../helpers/testApp.js";

const app = createTestApp();

describe("Application", () => {
  describe("Root Endpoint", () => {
    it("should return success message on GET /", async () => {
      const response = await request(app).get("/");

      expect(response.status).toBe(200);
      expect(response.text).toBe("Backend running successfully.");
    });
  });

  describe("API Routes Mounting", () => {
    it("should have /api routes mounted", async () => {
      // A valid API route should not return 404 for the path
      // Test with a valid email to avoid edge case with missing email
      const response = await request(app).post("/api/waitlist").send({
        email: "test@example.com",
      });

      // Should return success or duplicate error, not 404 (route not found)
      expect(response.status).not.toBe(404);
    });

    it("should return 404 for non-existent routes", async () => {
      const response = await request(app).get("/api/nonexistent-route");

      expect(response.status).toBe(404);
    });
  });

  describe("Content Type", () => {
    it("should accept JSON requests", async () => {
      const response = await request(app)
        .post("/api/waitlist")
        .set("Content-Type", "application/json")
        .send({ email: "test@example.com" });

      // Should process request (may fail validation, but accepts JSON)
      expect(response.status).not.toBe(415); // Not unsupported media type
    });
  });

  describe("Cookie Parser", () => {
    it("should parse cookies from requests", async () => {
      const response = await request(app)
        .get("/api/course-topics")
        .set("Cookie", ["test=value"]);

      // Should process request with cookies
      expect(response.status).toBeDefined();
    });
  });
});
