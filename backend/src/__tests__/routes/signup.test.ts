/**
 * Signup Route Tests
 * Tests for POST /api/signup endpoint
 */

import request from "supertest";
import { createTestApp } from "../helpers/testApp.js";
import prisma from "../../lib/prisma.js";

const app = createTestApp();
const prismaMock = prisma as jest.Mocked<typeof prisma>;

describe("POST /api/signup", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Successful signup", () => {
    it("should create a new user and return 201 with token cookie", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prismaMock.user.create as jest.Mock).mockResolvedValue({
        id: "new-user-id",
        firstname: "John",
        lastname: "Doe",
        email: "john@test.com",
      });

      const response = await request(app).post("/api/signup").send({
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
        password: "SecurePass123!",
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("New user info saved successfully");
      expect(response.headers["set-cookie"]).toBeDefined();
      expect(response.headers["set-cookie"][0]).toContain("token=");
    });
  });

  describe("Email validation", () => {
    it("should return 400 for invalid email format", async () => {
      const response = await request(app).post("/api/signup").send({
        firstName: "John",
        lastName: "Doe",
        email: "invalid-email",
        password: "SecurePass123!",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Email provided was not valid");
    });

    it("should return 400 for empty email", async () => {
      const response = await request(app).post("/api/signup").send({
        firstName: "John",
        lastName: "Doe",
        email: "",
        password: "SecurePass123!",
      });

      expect(response.status).toBe(400);
    });
  });

  describe("Password validation", () => {
    it("should return 400 for password shorter than 9 characters", async () => {
      const response = await request(app).post("/api/signup").send({
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
        password: "Short1!",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Given password does not fulfil the criteria",
      );
    });

    it("should return 400 for password without uppercase", async () => {
      const response = await request(app).post("/api/signup").send({
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
        password: "lowercase123!",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Given password does not fulfil the criteria",
      );
    });

    it("should return 400 for password without lowercase", async () => {
      const response = await request(app).post("/api/signup").send({
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
        password: "UPPERCASE123!",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Given password does not fulfil the criteria",
      );
    });

    it("should return 400 for password without digit", async () => {
      const response = await request(app).post("/api/signup").send({
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
        password: "NoDigitPass!",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Given password does not fulfil the criteria",
      );
    });

    it("should return 400 for password without special character", async () => {
      const response = await request(app).post("/api/signup").send({
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
        password: "NoSpecial123",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Given password does not fulfil the criteria",
      );
    });

    it("should return 400 for password with whitespace", async () => {
      const response = await request(app).post("/api/signup").send({
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
        password: "Has Space 123!",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Given password does not fulfil the criteria",
      );
    });
  });

  describe("Duplicate email handling", () => {
    it("should return 409 when email already exists", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue({
        id: "existing-user-id",
        email: "existing@test.com",
      });

      const response = await request(app).post("/api/signup").send({
        firstName: "John",
        lastName: "Doe",
        email: "existing@test.com",
        password: "SecurePass123!",
      });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe(
        "An account with this email has already been signed up.",
      );
    });
  });

  describe("Server error handling", () => {
    it("should return 500 when database throws unexpected error", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockRejectedValue(
        new Error("Database connection failed"),
      );

      const response = await request(app).post("/api/signup").send({
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
        password: "SecurePass123!",
      });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Failed to sign up");
    });
  });
});
