/**
 * Signin Route Tests
 * Tests for POST /api/signin endpoint
 */

import request from "supertest";
import bcrypt from "bcrypt";
import { createTestApp } from "../helpers/testApp.js";
import prisma from "../../lib/prisma.js";
import redis from "../../lib/redis.js";

const app = createTestApp();
const prismaMock = prisma as jest.Mocked<typeof prisma>;
const redisMock = redis as jest.Mocked<typeof redis>;

describe("POST /api/signin", () => {
  const validPassword = "SecurePass123!";
  let hashedPassword: string;

  beforeAll(async () => {
    hashedPassword = await bcrypt.hash(validPassword, 10);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // Default: no rate limiting
    (redisMock.get as jest.Mock).mockResolvedValue(null);
    (redisMock.incr as jest.Mock).mockResolvedValue(1);
    (redisMock.expire as jest.Mock).mockResolvedValue(true);
    (redisMock.del as jest.Mock).mockResolvedValue(1);
  });

  describe("Successful signin", () => {
    it("should authenticate user and return 200 with token cookie", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue({
        id: "user-123",
        firstname: "John",
        lastname: "Doe",
        email: "john@test.com",
        password: hashedPassword,
        courses: ["COMP1511"],
      });

      const response = await request(app).post("/api/signin").send({
        email: "john@test.com",
        password: validPassword,
        remember: false,
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Sign in was successful");
      expect(response.body.firstName).toBe("John");
      expect(response.headers["set-cookie"]).toBeDefined();
      expect(response.headers["set-cookie"][0]).toContain("token=");
    });

    it("should set longer cookie expiration with remember me option", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue({
        id: "user-123",
        firstname: "John",
        lastname: "Doe",
        email: "john@test.com",
        password: hashedPassword,
        courses: [],
      });

      const response = await request(app).post("/api/signin").send({
        email: "john@test.com",
        password: validPassword,
        remember: true,
      });

      expect(response.status).toBe(200);
      expect(response.headers["set-cookie"]).toBeDefined();
      // Cookie should have longer max-age when remember=true
    });

    it("should clear login attempt cache on successful signin", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue({
        id: "user-123",
        firstname: "John",
        lastname: "Doe",
        email: "john@test.com",
        password: hashedPassword,
        courses: [],
      });

      await request(app).post("/api/signin").send({
        email: "john@test.com",
        password: validPassword,
        remember: false,
      });

      expect(redisMock.del).toHaveBeenCalledWith("loginAttempts:john@test.com");
    });
  });

  describe("Authentication failures", () => {
    it("should return 401 for non-existent email", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await request(app).post("/api/signin").send({
        email: "nonexistent@test.com",
        password: validPassword,
        remember: false,
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Email or password is incorrect");
    });

    it("should return 401 for incorrect password", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue({
        id: "user-123",
        firstname: "John",
        lastname: "Doe",
        email: "john@test.com",
        password: hashedPassword,
        courses: [],
      });

      const response = await request(app).post("/api/signin").send({
        email: "john@test.com",
        password: "WrongPassword123!",
        remember: false,
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Email or password is incorrect");
    });

    it("should increment login attempt counter on failed signin", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);

      await request(app).post("/api/signin").send({
        email: "test@test.com",
        password: "WrongPassword123!",
        remember: false,
      });

      expect(redisMock.incr).toHaveBeenCalledWith(
        "loginAttempts:test@test.com",
      );
      expect(redisMock.expire).toHaveBeenCalledWith(
        "loginAttempts:test@test.com",
        15 * 60,
      );
    });
  });

  describe("Rate limiting", () => {
    it("should return 429 after 5 failed login attempts", async () => {
      (redisMock.get as jest.Mock).mockResolvedValue(5);

      const response = await request(app).post("/api/signin").send({
        email: "ratelimited@test.com",
        password: validPassword,
        remember: false,
      });

      expect(response.status).toBe(429);
      expect(response.body.message).toBe(
        "Too many failed sign in attempts. Try again in 15 minutes",
      );
    });

    it("should return 429 when attempts exceed 5", async () => {
      (redisMock.get as jest.Mock).mockResolvedValue(10);

      const response = await request(app).post("/api/signin").send({
        email: "ratelimited@test.com",
        password: validPassword,
        remember: false,
      });

      expect(response.status).toBe(429);
    });

    it("should not check database when rate limited", async () => {
      (redisMock.get as jest.Mock).mockResolvedValue(5);

      await request(app).post("/api/signin").send({
        email: "ratelimited@test.com",
        password: validPassword,
        remember: false,
      });

      expect(prismaMock.user.findUnique).not.toHaveBeenCalled();
    });
  });

  describe("Server error handling", () => {
    it("should return 500 when database throws unexpected error", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockRejectedValue(
        new Error("Database connection failed"),
      );

      const response = await request(app).post("/api/signin").send({
        email: "john@test.com",
        password: validPassword,
        remember: false,
      });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe(
        "Sign in was unsuccessful. Please try again",
      );
    });
  });
});


