/**
 * JWT Test Helpers
 * Utility functions for creating test tokens
 */

import jwt, { Secret } from "jsonwebtoken";

const JWT_SECRET: Secret =
  process.env.JWT_SECRET || "test-jwt-secret-key-for-testing";

export function generateTestToken(
  userId: string,
  expiresInSeconds = 18000,
): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: expiresInSeconds });
}

export function generateExpiredToken(userId: string): string {
  // Create a token that expires in 1ms
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: 1 });
}

export function generateInvalidToken(): string {
  return "invalid.token.here";
}
