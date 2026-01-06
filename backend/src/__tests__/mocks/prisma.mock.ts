/**
 * Prisma Mock Utilities
 * Helper functions for mocking Prisma database operations in tests
 */

import prisma from "../../lib/prisma.js";

// Type cast for mocked prisma
export const prismaMock = prisma as jest.Mocked<typeof prisma>;

// Sample test data
export const mockUser = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@test.com",
  password: "$2b$10$hashedpasswordhere12345678901234567890",
  courses: ["COMP1511", "COMP1521"],
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

export const mockStudySession = {
  id: "660e8400-e29b-41d4-a716-446655440001",
  userId: mockUser.id,
  courseCode: "COMP1511",
  startTime: new Date("2024-01-15T10:00:00Z"),
  endTime: new Date("2024-01-15T12:00:00Z"),
  duration: 7200, // 2 hours in seconds
};

export const mockCourse = {
  code: "COMP1511",
  name: "Programming Fundamentals",
};

export const mockCourseTopic = {
  id: "770e8400-e29b-41d4-a716-446655440002",
  userId: mockUser.id,
  courseCode: "COMP1511",
  weekNumber: 1,
  topic: "Introduction to C Programming",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

export const mockWaitlistEmail = {
  email: "waitlist@test.com",
};

// Helper to reset all Prisma mocks
export function resetPrismaMocks() {
  jest.clearAllMocks();
}

// Helper to setup common mock responses
export function setupUserMocks(options?: {
  findUnique?: typeof mockUser | null;
  create?: typeof mockUser;
}) {
  if (options?.findUnique !== undefined) {
    (prismaMock.user.findUnique as jest.Mock).mockResolvedValue(
      options.findUnique,
    );
  }
  if (options?.create) {
    (prismaMock.user.create as jest.Mock).mockResolvedValue(options.create);
  }
}

export function setupSessionMocks(options?: {
  findUnique?: typeof mockStudySession | null;
  create?: typeof mockStudySession;
  update?: typeof mockStudySession;
  findMany?: (typeof mockStudySession)[];
}) {
  if (options?.findUnique !== undefined) {
    (prismaMock.studySession.findUnique as jest.Mock).mockResolvedValue(
      options.findUnique,
    );
  }
  if (options?.create) {
    (prismaMock.studySession.create as jest.Mock).mockResolvedValue(
      options.create,
    );
  }
  if (options?.update) {
    (prismaMock.studySession.update as jest.Mock).mockResolvedValue(
      options.update,
    );
  }
  if (options?.findMany) {
    (prismaMock.studySession.findMany as jest.Mock).mockResolvedValue(
      options.findMany,
    );
  }
}


