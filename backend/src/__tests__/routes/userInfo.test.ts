/**
 * User Info Route Tests
 * Tests for GET /api/users/:userId endpoint
 */

import request from "supertest";
import { createTestApp } from "../helpers/testApp.js";
import { generateTestToken } from "../helpers/jwt.js";
import prisma from "../../lib/prisma.js";

const app = createTestApp();
const prismaMock = prisma as jest.Mocked<typeof prisma>;

describe("GET /api/users/:userId", () => {
  const userId = "550e8400-e29b-41d4-a716-446655440000";
  const validToken = generateTestToken(userId);

  const mockUser = {
    id: userId,
    firstname: "John",
    lastname: "Doe",
    email: "john@test.com",
    courses: ["COMP1511", "COMP1521"],
    createdAt: new Date("2024-01-01"),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Successful user info retrieval", () => {
    it("should return user info with stats", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prismaMock.studySession.findMany as jest.Mock).mockResolvedValue([]);

      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${validToken}`);

      expect(response.status).toBe(200);
      expect(response.body.user).toBeDefined();
      expect(response.body.user.firstname).toBe("John");
      expect(response.body.user.lastname).toBe("Doe");
      expect(response.body.user.email).toBe("john@test.com");
      expect(response.body.stats).toBeDefined();
    });

    it("should return correct stats with no sessions", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prismaMock.studySession.findMany as jest.Mock).mockResolvedValue([]);

      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${validToken}`);

      expect(response.body.stats.totalSeconds).toBe(0);
      expect(response.body.stats.sessionCount).toBe(0);
      expect(response.body.stats.averageSessionSeconds).toBe(0);
      expect(response.body.stats.streak).toBe(0);
    });

    it("should calculate correct total study time", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prismaMock.studySession.findMany as jest.Mock).mockResolvedValue([
        {
          id: "session-1",
          courseCode: "COMP1511",
          duration: 3600,
          startTime: new Date(),
          endTime: new Date(),
        },
        {
          id: "session-2",
          courseCode: "COMP1511",
          duration: 1800,
          startTime: new Date(),
          endTime: new Date(),
        },
        {
          id: "session-3",
          courseCode: "COMP1521",
          duration: 2700,
          startTime: new Date(),
          endTime: new Date(),
        },
      ]);

      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${validToken}`);

      expect(response.body.stats.totalSeconds).toBe(8100); // 3600 + 1800 + 2700
      expect(response.body.stats.sessionCount).toBe(3);
      expect(response.body.stats.averageSessionSeconds).toBe(2700); // 8100 / 3
    });

    it("should calculate study time per course", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prismaMock.studySession.findMany as jest.Mock).mockResolvedValue([
        {
          id: "session-1",
          courseCode: "COMP1511",
          duration: 3600,
          startTime: new Date(),
          endTime: new Date(),
        },
        {
          id: "session-2",
          courseCode: "COMP1521",
          duration: 1800,
          startTime: new Date(),
          endTime: new Date(),
        },
      ]);

      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${validToken}`);

      expect(response.body.stats.totalStudyTimes["COMP1511"]).toBe(3600);
      expect(response.body.stats.totalStudyTimes["COMP1521"]).toBe(1800);
    });

    it("should identify longest session", async () => {
      const sessionDate = new Date("2024-01-15T10:00:00Z");

      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prismaMock.studySession.findMany as jest.Mock).mockResolvedValue([
        {
          id: "session-1",
          courseCode: "COMP1511",
          duration: 3600,
          startTime: sessionDate,
          endTime: new Date(),
        },
        {
          id: "session-2",
          courseCode: "COMP1521",
          duration: 7200, // longest
          startTime: new Date("2024-01-16T10:00:00Z"),
          endTime: new Date(),
        },
      ]);

      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${validToken}`);

      expect(response.body.stats.longestSession.duration).toBe(7200);
      expect(response.body.stats.longestSession.course).toBe("COMP1521");
    });
  });

  describe("Study streak calculation", () => {
    it("should calculate streak for consecutive days", async () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prismaMock.studySession.findMany as jest.Mock).mockResolvedValue([
        {
          id: "session-1",
          courseCode: "COMP1511",
          duration: 3600,
          startTime: today,
          endTime: today,
        },
        {
          id: "session-2",
          courseCode: "COMP1511",
          duration: 1800,
          startTime: yesterday,
          endTime: yesterday,
        },
        {
          id: "session-3",
          courseCode: "COMP1511",
          duration: 2700,
          startTime: twoDaysAgo,
          endTime: twoDaysAgo,
        },
      ]);

      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${validToken}`);

      expect(response.body.stats.streak).toBe(3);
    });

    it("should return 0 streak when last session was more than a day ago", async () => {
      const fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prismaMock.studySession.findMany as jest.Mock).mockResolvedValue([
        {
          id: "session-1",
          courseCode: "COMP1511",
          duration: 3600,
          startTime: fiveDaysAgo,
          endTime: fiveDaysAgo,
        },
      ]);

      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${validToken}`);

      expect(response.body.stats.streak).toBe(0);
    });
  });

  describe("Authentication", () => {
    it("should return 401 when no token provided", async () => {
      const response = await request(app).get(`/api/users/${userId}`);

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Token doesn't exist");
    });

    it("should return 403 when accessing another user's data", async () => {
      const differentUserId = "different-user-id-123";
      const tokenForDifferentUser = generateTestToken(differentUserId);

      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${tokenForDifferentUser}`);

      expect(response.status).toBe(403);
      expect(response.body.error).toBe("Forbidden action");
    });
  });

  describe("User not found", () => {
    it("should return 404 when user doesn't exist", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${validToken}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("User not found");
    });
  });

  describe("Server error handling", () => {
    it("should return 500 when database throws error", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set("Authorization", `Bearer ${validToken}`);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Server error");
    });
  });
});


