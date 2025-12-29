/**
 * Signup User Storage Tests
 * Tests for user account creation storage function
 */

import bcrypt from "bcrypt";
import { saveNewUserAccount } from "../../utils/signupUserStorage.js";
import prisma from "../../lib/prisma.js";
import { AccountAlreadyExistsError } from "../../errors/auth.js";

const prismaMock = prisma as jest.Mocked<typeof prisma>;

// Mock uuid
jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid-12345"),
}));

describe("saveNewUserAccount", () => {
  const newUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john@test.com",
    password: "SecurePass123!",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Successful account creation", () => {
    it("should create a new user and return the user ID", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prismaMock.user.create as jest.Mock).mockResolvedValue({
        id: "mocked-uuid-12345",
        firstname: "John",
        lastname: "Doe",
        email: "john@test.com",
      });

      const result = await saveNewUserAccount(newUser);

      expect(result).toBe("mocked-uuid-12345");
    });

    it("should hash the password before storing", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prismaMock.user.create as jest.Mock).mockImplementation(
        async (args: { data: { password: string } }) => {
          // Verify password is hashed (bcrypt hashes start with $2b$)
          expect(args.data.password).toMatch(/^\$2b\$/);
          // Verify it's not the plain text password
          expect(args.data.password).not.toBe("SecurePass123!");
          return { id: "mocked-uuid-12345" };
        },
      );

      await saveNewUserAccount(newUser);

      expect(prismaMock.user.create).toHaveBeenCalled();
    });

    it("should store user with correct field mapping", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prismaMock.user.create as jest.Mock).mockResolvedValue({
        id: "mocked-uuid-12345",
      });

      await saveNewUserAccount(newUser);

      expect(prismaMock.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            id: "mocked-uuid-12345",
            firstname: "John",
            lastname: "Doe",
            email: "john@test.com",
          }),
        }),
      );
    });

    it("should generate a unique UUID for each user", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prismaMock.user.create as jest.Mock).mockResolvedValue({
        id: "mocked-uuid-12345",
      });

      const result = await saveNewUserAccount(newUser);

      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });
  });

  describe("Duplicate email handling", () => {
    it("should throw AccountAlreadyExistsError if email exists", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue({
        id: "existing-user-id",
        email: "john@test.com",
      });

      await expect(saveNewUserAccount(newUser)).rejects.toThrow(
        AccountAlreadyExistsError,
      );
    });

    it("should check for existing email before creating", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue({
        id: "existing-user-id",
        email: "john@test.com",
      });

      try {
        await saveNewUserAccount(newUser);
      } catch {
        // Expected to throw
      }

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: "john@test.com" },
      });
      // Should not attempt to create if email exists
      expect(prismaMock.user.create).not.toHaveBeenCalled();
    });
  });

  describe("Password hashing", () => {
    it("should use bcrypt with cost factor of 10", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prismaMock.user.create as jest.Mock).mockImplementation(
        async (args: { data: { password: string } }) => {
          // Cost factor 10 produces hash with $2b$10$
          expect(args.data.password).toMatch(/^\$2b\$10\$/);
          return { id: "mocked-uuid-12345" };
        },
      );

      await saveNewUserAccount(newUser);
    });

    it("should hash password correctly for verification", async () => {
      let storedHash: string = "";

      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prismaMock.user.create as jest.Mock).mockImplementation(
        async (args: { data: { password: string } }) => {
          storedHash = args.data.password;
          return { id: "mocked-uuid-12345" };
        },
      );

      await saveNewUserAccount(newUser);

      // Verify the original password can be verified against the hash
      const isMatch = await bcrypt.compare("SecurePass123!", storedHash);
      expect(isMatch).toBe(true);
    });
  });

  describe("Error handling", () => {
    it("should propagate database errors", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prismaMock.user.create as jest.Mock).mockRejectedValue(
        new Error("Database connection failed"),
      );

      await expect(saveNewUserAccount(newUser)).rejects.toThrow(
        "Database connection failed",
      );
    });

    it("should propagate findUnique errors", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockRejectedValue(
        new Error("Query timeout"),
      );

      await expect(saveNewUserAccount(newUser)).rejects.toThrow(
        "Query timeout",
      );
    });
  });
});
