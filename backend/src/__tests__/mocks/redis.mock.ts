/**
 * Redis Mock Utilities
 * Helper functions for mocking Redis operations in tests
 */

import redis from "../../lib/redis.js";

// Type cast for mocked redis
export const redisMock = redis as jest.Mocked<typeof redis>;

// Helper to reset all Redis mocks
export function resetRedisMocks() {
  (redisMock.get as jest.Mock).mockReset();
  (redisMock.set as jest.Mock).mockReset();
  (redisMock.del as jest.Mock).mockReset();
  (redisMock.incr as jest.Mock).mockReset();
  (redisMock.expire as jest.Mock).mockReset();
}

// Helper to setup login attempt tracking
export function setupLoginAttemptMocks(options?: {
  currentAttempts?: number | null;
  afterIncr?: number;
}) {
  if (options?.currentAttempts !== undefined) {
    (redisMock.get as jest.Mock).mockResolvedValue(options.currentAttempts);
  }
  if (options?.afterIncr !== undefined) {
    (redisMock.incr as jest.Mock).mockResolvedValue(options.afterIncr);
  }
  (redisMock.expire as jest.Mock).mockResolvedValue(true);
  (redisMock.del as jest.Mock).mockResolvedValue(1);
}


