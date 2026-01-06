/**
 * Course Topics Route Tests
 * Tests for POST /api/scrape-course/:courseCode (AI scraping)
 */

import request from "supertest";
import { createTestApp } from "../helpers/testApp.js";

const app = createTestApp();

describe("POST /api/scrape-course/:courseCode", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Successful topic scraping", () => {
    it("should return topics from Perplexity API", async () => {
      // eslint-disable-next-line
      const mockTopics = {
        "Week 1": "Introduction to Programming",
        "Week 2": "Variables and Types",
        "Week 3": "Control Flow",
        "Week 4": "Functions",
        "Week 5": "Arrays",
        "Week 6": "Flex Week",
        "Week 7": "Pointers",
        "Week 8": "Memory Management",
        "Week 9": "Structs",
        "Week 10": "File I/O",
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [
            {
              message: {
                content: `Week 1: Introduction to Programming
Week 2: Variables and Types
Week 3: Control Flow
Week 4: Functions
Week 5: Arrays
Week 6: Flex Week
Week 7: Pointers
Week 8: Memory Management
Week 9: Structs
Week 10: File I/O`,
              },
            },
          ],
        }),
      });

      const response = await request(app).post("/api/scrape-course/COMP1511");

      expect(response.status).toBe(200);
      expect(response.body.topics).toBeDefined();
      expect(response.body.topics["Week 1"]).toBe(
        "Introduction to Programming",
      );
      expect(response.body.topics["Week 6"]).toBe("Flex Week");
    });

    it("should parse topics correctly from API response", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [
            {
              message: {
                content: `Week 1: Topic One
Week 2: Topic Two with extra info
Week 3: Topic Three`,
              },
            },
          ],
        }),
      });

      const response = await request(app).post("/api/scrape-course/COMP1521");

      expect(response.status).toBe(200);
      expect(Object.keys(response.body.topics).length).toBe(3);
    });

    it("should handle course codes with numbers", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [
            {
              message: {
                content: "Week 1: Topic",
              },
            },
          ],
        }),
      });

      const response = await request(app).post("/api/scrape-course/MATH1131");

      expect(response.status).toBe(200);
    });
  });

  describe("API Error handling", () => {
    it("should return 500 when Perplexity API returns error", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
      });

      const response = await request(app).post("/api/scrape-course/COMP1511");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to call PerplexityAI API ");
    });

    it("should return 500 when fetch throws error", async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

      const response = await request(app).post("/api/scrape-course/COMP1511");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to call PerplexityAI API ");
    });

    it("should return 500 when API response is malformed", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({}), // Missing choices array
      });

      const response = await request(app).post("/api/scrape-course/COMP1511");

      expect(response.status).toBe(500);
    });
  });
});


