/**
 * Validation Utility Tests
 * Tests for password validation and user authentication functions
 */

import bcrypt from "bcrypt";
import { validatePassword, authenticateUser } from "../../utils/validation.js";
import prisma from "../../lib/prisma.js";
import { UserNotFoundError, InvalidPasswordError } from "../../errors/auth.js";

const prismaMock = prisma as jest.Mocked<typeof prisma>;

describe("validatePassword", () => {
  describe("Valid passwords", () => {
    it("should accept password with all requirements met", () => {
      expect(validatePassword("SecurePass123!")).toBe(true);
    });

    it("should accept password with exactly 9 characters", () => {
      expect(validatePassword("Abcd123!@")).toBe(true);
    });

    it("should accept password with various special characters", () => {
      const specialChars = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "_",
        "+",
        "{",
        "}",
        "[",
        "]",
        ":",
        ";",
        "<",
        ">",
        ",",
        ".",
        "?",
        "~",
        "-",
        "\\",
        "/",
      ];

      specialChars.forEach((char) => {
        const password = `Abcd1234${char}`;
        expect(validatePassword(password)).toBe(true);
      });
    });

    it("should accept long passwords", () => {
      expect(
        validatePassword("ThisIsAVeryLongSecurePassword123!WithManyCharacters"),
      ).toBe(true);
    });
  });

  describe("Password length validation", () => {
    it("should reject password shorter than 9 characters", () => {
      expect(validatePassword("Short1!")).toBe(false);
    });

    it("should reject 8 character password", () => {
      expect(validatePassword("Abcd12!@")).toBe(false);
    });

    it("should reject empty password", () => {
      expect(validatePassword("")).toBe(false);
    });
  });

  describe("Whitespace validation", () => {
    it("should reject password with spaces", () => {
      expect(validatePassword("Has Space 123!A")).toBe(false);
    });

    it("should reject password with tab", () => {
      expect(validatePassword("HasTab\t123!A")).toBe(false);
    });

    it("should reject password with newline", () => {
      expect(validatePassword("HasNewline\n123!A")).toBe(false);
    });

    it("should reject password starting with space", () => {
      expect(validatePassword(" SecurePass123!")).toBe(false);
    });

    it("should reject password ending with space", () => {
      expect(validatePassword("SecurePass123! ")).toBe(false);
    });
  });

  describe("Uppercase requirement", () => {
    it("should reject password without uppercase letter", () => {
      expect(validatePassword("lowercase123!")).toBe(false);
    });

    it("should accept password with uppercase in middle", () => {
      expect(validatePassword("lowerCase123!")).toBe(true);
    });

    it("should accept password with uppercase at end", () => {
      expect(validatePassword("lowercase12A!")).toBe(true);
    });
  });

  describe("Lowercase requirement", () => {
    it("should reject password without lowercase letter", () => {
      expect(validatePassword("UPPERCASE123!")).toBe(false);
    });

    it("should accept password with lowercase in middle", () => {
      expect(validatePassword("UPPERcASE123!")).toBe(true);
    });

    it("should accept password with lowercase at end", () => {
      expect(validatePassword("UPPERCASE12a!")).toBe(true);
    });
  });

  describe("Digit requirement", () => {
    it("should reject password without digits", () => {
      expect(validatePassword("NoDigitPass!")).toBe(false);
    });

    it("should accept password with single digit", () => {
      expect(validatePassword("HasOneDigit1!")).toBe(true);
    });

    it("should accept password with multiple digits", () => {
      expect(validatePassword("Has123Digits!")).toBe(true);
    });
  });

  describe("Special character requirement", () => {
    it("should reject password without special character", () => {
      expect(validatePassword("NoSpecial123")).toBe(false);
    });

    it("should reject password with only alphanumeric", () => {
      expect(validatePassword("AlphaNumeric123")).toBe(false);
    });
  });
});

describe("authenticateUser", () => {
  const validPassword = "SecurePass123!";
  let hashedPassword: string;

  beforeAll(async () => {
    hashedPassword = await bcrypt.hash(validPassword, 10);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Successful authentication", () => {
    it("should return user data on valid credentials", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue({
        id: "user-123",
        firstname: "John",
        lastname: "Doe",
        email: "john@test.com",
        password: hashedPassword,
        courses: ["COMP1511", "COMP1521"],
      });

      const result = await authenticateUser("john@test.com", validPassword);

      expect(result).toEqual({
        id: "user-123",
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
        courses: ["COMP1511", "COMP1521"],
      });
    });

    it("should return empty courses array when user has no courses", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue({
        id: "user-123",
        firstname: "John",
        lastname: "Doe",
        email: "john@test.com",
        password: hashedPassword,
        courses: null,
      });

      const result = await authenticateUser("john@test.com", validPassword);

      expect(result.courses).toEqual([]);
    });
  });

  describe("User not found", () => {
    it("should throw UserNotFoundError when email doesn't exist", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        authenticateUser("nonexistent@test.com", validPassword),
      ).rejects.toThrow(UserNotFoundError);
    });

    it("should call prisma with correct email", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(null);

      try {
        await authenticateUser("test@example.com", validPassword);
      } catch {
        // Expected to throw
      }

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          password: true,
          courses: true,
        },
      });
    });
  });

  describe("Invalid password", () => {
    it("should throw InvalidPasswordError for wrong password", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue({
        id: "user-123",
        firstname: "John",
        lastname: "Doe",
        email: "john@test.com",
        password: hashedPassword,
        courses: [],
      });

      await expect(
        authenticateUser("john@test.com", "WrongPassword123!"),
      ).rejects.toThrow(InvalidPasswordError);
    });

    it("should throw InvalidPasswordError for empty password", async () => {
      (prismaMock.user.findUnique as jest.Mock).mockResolvedValue({
        id: "user-123",
        firstname: "John",
        lastname: "Doe",
        email: "john@test.com",
        password: hashedPassword,
        courses: [],
      });

      await expect(authenticateUser("john@test.com", "")).rejects.toThrow(
        InvalidPasswordError,
      );
    });
  });
});
