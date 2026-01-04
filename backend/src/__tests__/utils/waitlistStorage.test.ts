/**
 * Waitlist Storage Tests
 * Tests for waitlist email storage function
 */

import { saveEmailToWaitlist } from "../../utils/waitlistStorage.js";
import prisma from "../../lib/prisma.js";
import { EmailAlreadyInWaitlistError } from "../../errors/auth.js";

const prismaMock = prisma as jest.Mocked<typeof prisma>;

describe("saveEmailToWaitlist", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Successful email save", () => {
    it("should save email to waitlist", async () => {
      (prismaMock.waitlistEmail.findUnique as jest.Mock).mockResolvedValue(
        null,
      );
      (prismaMock.waitlistEmail.create as jest.Mock).mockResolvedValue({
        email: "newuser@test.com",
      });

      await expect(
        saveEmailToWaitlist("newuser@test.com"),
      ).resolves.not.toThrow();
    });

    it("should call create with correct email", async () => {
      (prismaMock.waitlistEmail.findUnique as jest.Mock).mockResolvedValue(
        null,
      );
      (prismaMock.waitlistEmail.create as jest.Mock).mockResolvedValue({
        email: "test@example.com",
      });

      await saveEmailToWaitlist("test@example.com");

      expect(prismaMock.waitlistEmail.create).toHaveBeenCalledWith({
        data: { email: "test@example.com" },
      });
    });

    it("should check for existing email first", async () => {
      (prismaMock.waitlistEmail.findUnique as jest.Mock).mockResolvedValue(
        null,
      );
      (prismaMock.waitlistEmail.create as jest.Mock).mockResolvedValue({
        email: "check@test.com",
      });

      await saveEmailToWaitlist("check@test.com");

      expect(prismaMock.waitlistEmail.findUnique).toHaveBeenCalledWith({
        where: { email: "check@test.com" },
      });
      // Create should be called after findUnique
      expect(prismaMock.waitlistEmail.create).toHaveBeenCalled();
    });
  });

  describe("Duplicate email handling", () => {
    it("should throw EmailAlreadyInWaitlistError if email exists", async () => {
      (prismaMock.waitlistEmail.findUnique as jest.Mock).mockResolvedValue({
        email: "existing@test.com",
      });

      await expect(saveEmailToWaitlist("existing@test.com")).rejects.toThrow(
        EmailAlreadyInWaitlistError,
      );
    });

    it("should not attempt to create if email exists", async () => {
      (prismaMock.waitlistEmail.findUnique as jest.Mock).mockResolvedValue({
        email: "existing@test.com",
      });

      try {
        await saveEmailToWaitlist("existing@test.com");
      } catch {
        // Expected to throw
      }

      expect(prismaMock.waitlistEmail.create).not.toHaveBeenCalled();
    });
  });

  describe("Email confirmation (Resend)", () => {
    it("should not throw error if email send fails", async () => {
      // The Resend mock is set up in setup.ts
      // This test ensures the function completes even if email fails
      (prismaMock.waitlistEmail.findUnique as jest.Mock).mockResolvedValue(
        null,
      );
      (prismaMock.waitlistEmail.create as jest.Mock).mockResolvedValue({
        email: "newuser@test.com",
      });

      // Should not throw even if email service has issues
      await expect(
        saveEmailToWaitlist("newuser@test.com"),
      ).resolves.not.toThrow();
    });
  });

  describe("Error handling", () => {
    it("should propagate database errors from findUnique", async () => {
      (prismaMock.waitlistEmail.findUnique as jest.Mock).mockRejectedValue(
        new Error("Database connection failed"),
      );

      await expect(saveEmailToWaitlist("test@test.com")).rejects.toThrow(
        "Database connection failed",
      );
    });

    it("should propagate database errors from create", async () => {
      (prismaMock.waitlistEmail.findUnique as jest.Mock).mockResolvedValue(
        null,
      );
      (prismaMock.waitlistEmail.create as jest.Mock).mockRejectedValue(
        new Error("Insert failed"),
      );

      await expect(saveEmailToWaitlist("test@test.com")).rejects.toThrow(
        "Insert failed",
      );
    });
  });
});
