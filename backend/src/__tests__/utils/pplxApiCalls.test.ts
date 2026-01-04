/**
 * Perplexity API Calls Tests
 * Tests for course topics fetching from Perplexity AI
 */

import { getCourseTopics } from "../../utils/pplxApiCalls.js";

describe("getCourseTopics", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Successful API calls", () => {
    it("should return parsed topics from API response", async () => {
      const mockResponse = `Week 1: Introduction to Programming
Week 2: Variables and Data Types
Week 3: Control Structures
Week 4: Functions
Week 5: Arrays and Strings
Week 6: Flex Week
Week 7: Pointers
Week 8: Memory Management
Week 9: Structs
Week 10: File I/O`;

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: mockResponse } }],
        }),
      });

      const result = await getCourseTopics("COMP1511");

      expect(result).toEqual({
        "Week 1": "Introduction to Programming",
        "Week 2": "Variables and Data Types",
        "Week 3": "Control Structures",
        "Week 4": "Functions",
        "Week 5": "Arrays and Strings",
        "Week 6": "Flex Week",
        "Week 7": "Pointers",
        "Week 8": "Memory Management",
        "Week 9": "Structs",
        "Week 10": "File I/O",
      });
    });

    it("should call API with correct payload", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: "Week 1: Test" } }],
        }),
      });

      await getCourseTopics("COMP1521");

      expect(global.fetch).toHaveBeenCalledWith(
        process.env.PPLX_API_URL,
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: `Bearer ${process.env.PPLX_API_KEY}`,
            "Content-Type": "application/json",
          }),
          body: expect.stringContaining("COMP1521"),
        }),
      );
    });

    it("should handle response with citation references", async () => {
      const mockResponseWithCitations = `Week 1: Introduction to Programming [1]
Week 2: Variables and Types [2][3]
Week 3: Control Flow [4]`;

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: mockResponseWithCitations } }],
        }),
      });

      const result = await getCourseTopics("COMP1511");

      // Citation references should be stripped
      expect(result["Week 1"]).toBe("Introduction to Programming");
      expect(result["Week 2"]).toBe("Variables and Types");
      expect(result["Week 3"]).toBe("Control Flow");
    });

    it("should handle varying week number formats", async () => {
      const mockResponse = `Week1: Topic One
Week 2: Topic Two
Week  3: Topic Three`;

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: mockResponse } }],
        }),
      });

      const result = await getCourseTopics("COMP1511");

      expect(result["Week 1"]).toBe("Topic One");
      expect(result["Week 2"]).toBe("Topic Two");
      expect(result["Week 3"]).toBe("Topic Three");
    });

    it("should skip lines that don't match week format", async () => {
      const mockResponse = `Week 1: Introduction
This is extra text
Week 2: Variables
Some other info here`;

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: mockResponse } }],
        }),
      });

      const result = await getCourseTopics("COMP1511");

      expect(Object.keys(result).length).toBe(2);
      expect(result["Week 1"]).toBe("Introduction");
      expect(result["Week 2"]).toBe("Variables");
    });

    it("should use sonar-pro model", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: "Week 1: Test" } }],
        }),
      });

      await getCourseTopics("COMP1511");

      const callBody = JSON.parse(
        (global.fetch as jest.Mock).mock.calls[0][1].body,
      );
      expect(callBody.model).toBe("sonar-pro");
    });
  });

  describe("API error handling", () => {
    it("should throw error when API returns non-ok response", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
      });

      await expect(getCourseTopics("COMP1511")).rejects.toThrow(
        "Failed to fetch topics from pplx API",
      );
    });

    it("should throw error when API returns 401", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 401,
      });

      await expect(getCourseTopics("COMP1511")).rejects.toThrow();
    });

    it("should throw error when API returns 429 (rate limited)", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 429,
      });

      await expect(getCourseTopics("COMP1511")).rejects.toThrow();
    });

    it("should throw error when fetch fails", async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

      await expect(getCourseTopics("COMP1511")).rejects.toThrow(
        "Failed to fetch topics from pplx API",
      );
    });

    it("should throw error when response JSON is invalid", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => {
          throw new Error("Invalid JSON");
        },
      });

      await expect(getCourseTopics("COMP1511")).rejects.toThrow();
    });
  });

  describe("Edge cases", () => {
    it("should handle empty response content", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: "" } }],
        }),
      });

      const result = await getCourseTopics("COMP1511");

      expect(result).toEqual({});
    });

    it("should handle course codes with different formats", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: "Week 1: Test Topic" } }],
        }),
      });

      // Should work with various course code formats
      await expect(getCourseTopics("MATH1131")).resolves.toBeDefined();
      await expect(getCourseTopics("FINS3616")).resolves.toBeDefined();
      await expect(getCourseTopics("COMP9444")).resolves.toBeDefined();
    });

    it("should handle topic text with colons", async () => {
      const mockResponse = "Week 1: Introduction: Getting Started with C";

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: mockResponse } }],
        }),
      });

      const result = await getCourseTopics("COMP1511");

      expect(result["Week 1"]).toBe("Introduction: Getting Started with C");
    });
  });
});
