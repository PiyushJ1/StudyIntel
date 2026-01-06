/**
 * Error Classes Tests
 * Tests for custom error classes used throughout the application
 */

import {
  UserNotFoundError,
  AccountAlreadyExistsError,
  InvalidPasswordError,
  EmailAlreadyInWaitlistError,
} from "../../errors/auth.js";

describe("Custom Error Classes", () => {
  describe("UserNotFoundError", () => {
    it("should create error with default message", () => {
      const error = new UserNotFoundError();

      expect(error.message).toBe(
        "This email does not have an acccount signed up",
      );
      expect(error.name).toBe("UserNotFoundError");
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(UserNotFoundError);
    });

    it("should create error with custom message", () => {
      const customMessage = "Custom user not found message";
      const error = new UserNotFoundError(customMessage);

      expect(error.message).toBe(customMessage);
      expect(error.name).toBe("UserNotFoundError");
    });
  });

  describe("AccountAlreadyExistsError", () => {
    it("should create error with default message", () => {
      const error = new AccountAlreadyExistsError();

      expect(error.message).toBe(
        "An account with this email has already been signed up.",
      );
      expect(error.name).toBe("AccountAlreadyExistsError");
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(AccountAlreadyExistsError);
    });

    it("should create error with custom message", () => {
      const customMessage = "Duplicate account detected";
      const error = new AccountAlreadyExistsError(customMessage);

      expect(error.message).toBe(customMessage);
      expect(error.name).toBe("AccountAlreadyExistsError");
    });
  });

  describe("InvalidPasswordError", () => {
    it("should create error with default message", () => {
      const error = new InvalidPasswordError();

      expect(error.message).toBe("Incorrect password");
      expect(error.name).toBe("InvalidPasswordError");
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(InvalidPasswordError);
    });

    it("should create error with custom message", () => {
      const customMessage = "Password does not match";
      const error = new InvalidPasswordError(customMessage);

      expect(error.message).toBe(customMessage);
      expect(error.name).toBe("InvalidPasswordError");
    });
  });

  describe("EmailAlreadyInWaitlistError", () => {
    it("should create error with default message", () => {
      const error = new EmailAlreadyInWaitlistError();

      expect(error.message).toBe("This email is already in the waitlist");
      expect(error.name).toBe("EmailAlreadyInWaitlistError");
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(EmailAlreadyInWaitlistError);
    });

    it("should create error with custom message", () => {
      const customMessage = "Waitlist duplicate detected";
      const error = new EmailAlreadyInWaitlistError(customMessage);

      expect(error.message).toBe(customMessage);
      expect(error.name).toBe("EmailAlreadyInWaitlistError");
    });
  });

  describe("Error inheritance", () => {
    it("should allow catching by Error type", () => {
      const throwError = () => {
        throw new UserNotFoundError();
      };

      expect(throwError).toThrow(Error);
    });

    it("should allow catching by specific type", () => {
      const throwError = () => {
        throw new InvalidPasswordError();
      };

      expect(throwError).toThrow(InvalidPasswordError);
    });

    it("should preserve stack trace", () => {
      const error = new AccountAlreadyExistsError();

      expect(error.stack).toBeDefined();
      expect(error.stack).toContain("AccountAlreadyExistsError");
    });
  });

  describe("Error type checking", () => {
    it("should correctly identify error types with instanceof", () => {
      const errors = [
        new UserNotFoundError(),
        new AccountAlreadyExistsError(),
        new InvalidPasswordError(),
        new EmailAlreadyInWaitlistError(),
      ];

      expect(errors[0] instanceof UserNotFoundError).toBe(true);
      expect(errors[0] instanceof AccountAlreadyExistsError).toBe(false);

      expect(errors[1] instanceof AccountAlreadyExistsError).toBe(true);
      expect(errors[1] instanceof InvalidPasswordError).toBe(false);

      expect(errors[2] instanceof InvalidPasswordError).toBe(true);
      expect(errors[2] instanceof EmailAlreadyInWaitlistError).toBe(false);

      expect(errors[3] instanceof EmailAlreadyInWaitlistError).toBe(true);
      expect(errors[3] instanceof UserNotFoundError).toBe(false);
    });
  });
});


