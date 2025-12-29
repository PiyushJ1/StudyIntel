/**
 * Jest Global Test Setup
 * This file runs before all tests and sets up mocks and environment
 */

// Set test environment variables
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-jwt-secret-key-for-testing";
process.env.PORT = "4001";
process.env.UPSTASH_REDIS_REST_URL = "https://test-redis.upstash.io";
process.env.UPSTASH_REDIS_REST_TOKEN = "test-redis-token";
process.env.PPLX_API_URL = "https://api.perplexity.ai/chat/completions";
process.env.PPLX_API_KEY = "test-pplx-api-key";
process.env.RESEND_API_KEY = "test-resend-api-key";
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test";

// Mock external dependencies
jest.mock("../lib/prisma.js", () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    },
    waitlistEmail: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    studySession: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    },
    course: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    courseTopic: {
      upsert: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

jest.mock("../lib/redis.js", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    incr: jest.fn(),
    expire: jest.fn(),
  },
}));

// Mock resend
jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: "test-email-id" }),
    },
  })),
}));

// Mock fetch for external API calls
global.fetch = jest.fn();

// Console log silencing for cleaner test output (optional)
beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});
