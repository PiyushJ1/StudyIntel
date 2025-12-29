/**
 * Finish Session Route Tests
 * Tests for PATCH /api/finish-session endpoint
 */

import request from "supertest";
import { createTestApp } from "../helpers/testApp.js";
import prisma from "../../lib/prisma.js";

const app = createTestApp();
const prismaMock = prisma as jest.Mocked<typeof prisma>;

describe("PATCH /api/finish-session", () => {
  const sessionId = "660e8400-e29b-41d4-a716-446655440001";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Successful session finish", () => {
    it("should update session with endTime and duration", async () => {
      const startTime = new Date(Date.now() - 3600000); // 1 hour ago

      (prismaMock.studySession.findUnique as jest.Mock).mockResolvedValue({
        id: sessionId,
        startTime,
        endTime: null,
        duration: null,
      });

      (prismaMock.studySession.update as jest.Mock).mockImplementation(
        async (args: { data: { endTime: Date; duration: number } }) => {
          expect(args.data.endTime).toBeInstanceOf(Date);
          expect(args.data.duration).toBeGreaterThan(0);
          // Duration should be approximately 1 hour (3600 seconds)
          expect(args.data.duration).toBeGreaterThanOrEqual(3590);
          expect(args.data.duration).toBeLessThanOrEqual(3610);
          return { id: sessionId, ...args.data };
        },
      );

      const response = await request(app)
        .patch("/api/finish-session")
        .send({ sessionId });

      expect(response.status).toBe(200);
      expect(response.body.sessionId).toBe(sessionId);
    });

    it("should calculate duration in seconds", async () => {
      const startTime = new Date(Date.now() - 7200000); // 2 hours ago

      (prismaMock.studySession.findUnique as jest.Mock).mockResolvedValue({
        id: sessionId,
        startTime,
        endTime: null,
        duration: null,
      });

      (prismaMock.studySession.update as jest.Mock).mockImplementation(
        async (args: { data: { duration: number } }) => {
          // Should be approximately 7200 seconds (2 hours)
          expect(args.data.duration).toBeGreaterThanOrEqual(7190);
          expect(args.data.duration).toBeLessThanOrEqual(7210);
          return { id: sessionId, ...args.data };
        },
      );

      await request(app).patch("/api/finish-session").send({ sessionId });

      expect(prismaMock.studySession.update).toHaveBeenCalled();
    });
  });

  describe("Validation", () => {
    it("should return 400 when sessionId is missing", async () => {
      const response = await request(app).patch("/api/finish-session").send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "sessionId is required to end the session ",
      );
    });

    it("should return 400 when sessionId is empty", async () => {
      const response = await request(app)
        .patch("/api/finish-session")
        .send({ sessionId: "" });

      expect(response.status).toBe(400);
    });
  });

  describe("Session not found", () => {
    it("should return 404 when session doesn't exist", async () => {
      (prismaMock.studySession.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .patch("/api/finish-session")
        .send({ sessionId: "nonexistent-session-id" });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("The session does not exist");
    });
  });

  describe("Server error handling", () => {
    it("should return 500 when findUnique throws error", async () => {
      (prismaMock.studySession.findUnique as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      const response = await request(app)
        .patch("/api/finish-session")
        .send({ sessionId });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Could not finish study session");
    });

    it("should return 500 when update throws error", async () => {
      (prismaMock.studySession.findUnique as jest.Mock).mockResolvedValue({
        id: sessionId,
        startTime: new Date(),
        endTime: null,
        duration: null,
      });
      (prismaMock.studySession.update as jest.Mock).mockRejectedValue(
        new Error("Update failed"),
      );

      const response = await request(app)
        .patch("/api/finish-session")
        .send({ sessionId });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Could not finish study session");
    });
  });
});
