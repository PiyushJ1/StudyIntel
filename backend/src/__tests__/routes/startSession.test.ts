/**
 * Start Session Route Tests
 * Tests for POST /api/start-session endpoint
 */

import request from "supertest";
import { createTestApp } from "../helpers/testApp.js";
import { generateTestToken } from "../helpers/jwt.js";
import prisma from "../../lib/prisma.js";

const app = createTestApp();
const prismaMock = prisma as jest.Mocked<typeof prisma>;

describe("POST /api/start-session", () => {
  const userId = "550e8400-e29b-41d4-a716-446655440000";
  const validToken = generateTestToken(userId);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Successful session creation", () => {
    it("should create a new study session and return 201", async () => {
      (prismaMock.course.findUnique as jest.Mock).mockResolvedValue({
        code: "COMP1511",
        name: "Programming Fundamentals",
      });
      (prismaMock.studySession.create as jest.Mock).mockResolvedValue({
        id: "session-123",
        userId,
        courseCode: "COMP1511",
        startTime: new Date(),
      });

      const response = await request(app)
        .post("/api/start-session")
        .set("Cookie", [`token=${validToken}`])
        .send({ courseCode: "COMP1511" });

      expect(response.status).toBe(201);
      expect(response.body.sessionId).toBe("session-123");
    });

    it("should create course if it doesn't exist", async () => {
      (prismaMock.course.findUnique as jest.Mock).mockResolvedValue(null);
      (prismaMock.course.create as jest.Mock).mockResolvedValue({
        code: "COMP1521",
        name: "Course",
      });
      (prismaMock.studySession.create as jest.Mock).mockResolvedValue({
        id: "session-456",
        userId,
        courseCode: "COMP1521",
        startTime: new Date(),
      });

      const response = await request(app)
        .post("/api/start-session")
        .set("Cookie", [`token=${validToken}`])
        .send({ courseCode: "COMP1521" });

      expect(response.status).toBe(201);
      expect(prismaMock.course.create).toHaveBeenCalledWith({
        data: {
          code: "COMP1521",
          name: "Course",
        },
      });
    });

    it("should save session with current timestamp", async () => {
      const beforeTime = new Date();

      (prismaMock.course.findUnique as jest.Mock).mockResolvedValue({
        code: "COMP1511",
        name: "Programming Fundamentals",
      });
      (prismaMock.studySession.create as jest.Mock).mockImplementation(
        async (args: { data: { startTime: Date } }) => {
          const afterTime = new Date();
          expect(args.data.startTime.getTime()).toBeGreaterThanOrEqual(
            beforeTime.getTime(),
          );
          expect(args.data.startTime.getTime()).toBeLessThanOrEqual(
            afterTime.getTime(),
          );
          return { id: "session-789", ...args.data };
        },
      );

      await request(app)
        .post("/api/start-session")
        .set("Cookie", [`token=${validToken}`])
        .send({ courseCode: "COMP1511" });

      expect(prismaMock.studySession.create).toHaveBeenCalled();
    });
  });

  describe("Authentication", () => {
    it("should return 401 when no token provided", async () => {
      const response = await request(app)
        .post("/api/start-session")
        .send({ courseCode: "COMP1511" });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Not authenticated");
    });

    it("should return error for invalid token", async () => {
      const response = await request(app)
        .post("/api/start-session")
        .set("Cookie", ["token=invalid.token.here"])
        .send({ courseCode: "COMP1511" });

      expect(response.status).toBe(500);
    });
  });

  describe("Validation", () => {
    it("should return 400 when courseCode is missing", async () => {
      const response = await request(app)
        .post("/api/start-session")
        .set("Cookie", [`token=${validToken}`])
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Can't start a session without the corresponding course code",
      );
    });

    it("should return 400 when courseCode is empty string", async () => {
      const response = await request(app)
        .post("/api/start-session")
        .set("Cookie", [`token=${validToken}`])
        .send({ courseCode: "" });

      expect(response.status).toBe(400);
    });
  });

  describe("Server error handling", () => {
    it("should return 500 when database throws error", async () => {
      (prismaMock.course.findUnique as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      const response = await request(app)
        .post("/api/start-session")
        .set("Cookie", [`token=${validToken}`])
        .send({ courseCode: "COMP1511" });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Could not start new study session");
    });
  });
});

