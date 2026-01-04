/**
 * New Courses Route Tests
 * Tests for POST /api/new-courses endpoint
 */

import request from "supertest";
import { createTestApp } from "../helpers/testApp.js";
import prisma from "../../lib/prisma.js";

const app = createTestApp();
const prismaMock = prisma as jest.Mocked<typeof prisma>;

describe("POST /api/new-courses", () => {
  const userId = "550e8400-e29b-41d4-a716-446655440000";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Successful course addition", () => {
    it("should add courses to user and return 201", async () => {
      (prismaMock.user.update as jest.Mock).mockResolvedValue({
        id: userId,
        courses: ["COMP1511", "COMP1521", "COMP2521"],
      });

      const response = await request(app)
        .post("/api/new-courses")
        .send({
          userId,
          courses: ["COMP1511", "COMP1521", "COMP2521"],
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Courses added successfully");
    });

    it("should call update with correct data", async () => {
      const courses = ["MATH1131", "MATH1231"];
      (prismaMock.user.update as jest.Mock).mockResolvedValue({
        id: userId,
        courses,
      });

      await request(app).post("/api/new-courses").send({
        userId,
        courses,
      });

      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { courses },
      });
    });

    it("should handle empty courses array", async () => {
      (prismaMock.user.update as jest.Mock).mockResolvedValue({
        id: userId,
        courses: [],
      });

      const response = await request(app).post("/api/new-courses").send({
        userId,
        courses: [],
      });

      expect(response.status).toBe(201);
    });

    it("should handle single course", async () => {
      (prismaMock.user.update as jest.Mock).mockResolvedValue({
        id: userId,
        courses: ["COMP1511"],
      });

      const response = await request(app)
        .post("/api/new-courses")
        .send({
          userId,
          courses: ["COMP1511"],
        });

      expect(response.status).toBe(201);
    });
  });

  describe("Validation", () => {
    it("should return 400 when courses is missing", async () => {
      const response = await request(app)
        .post("/api/new-courses")
        .send({ userId });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Could not get user courses");
    });

    it("should return 400 when courses is null", async () => {
      const response = await request(app).post("/api/new-courses").send({
        userId,
        courses: null,
      });

      expect(response.status).toBe(400);
    });
  });

  describe("Server error handling", () => {
    it("should return 500 when database throws error", async () => {
      (prismaMock.user.update as jest.Mock).mockRejectedValue(
        new Error("Database error"),
      );

      const response = await request(app)
        .post("/api/new-courses")
        .send({
          userId,
          courses: ["COMP1511"],
        });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Could not add courses");
    });

    it("should return 500 when user doesn't exist", async () => {
      (prismaMock.user.update as jest.Mock).mockRejectedValue(
        new Error("Record to update not found"),
      );

      const response = await request(app)
        .post("/api/new-courses")
        .send({
          userId: "nonexistent-user-id",
          courses: ["COMP1511"],
        });

      expect(response.status).toBe(500);
    });
  });
});

