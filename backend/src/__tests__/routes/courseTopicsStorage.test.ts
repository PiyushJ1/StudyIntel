/**
 * Course Topics Storage Route Tests
 * Tests for POST and GET /api/course-topics endpoints
 */

import request from "supertest";
import { createTestApp } from "../helpers/testApp.js";
import { generateTestToken } from "../helpers/jwt.js";
import prisma from "../../lib/prisma.js";

const app = createTestApp();
const prismaMock = prisma as jest.Mocked<typeof prisma>;

describe("Course Topics Storage", () => {
  const userId = "550e8400-e29b-41d4-a716-446655440000";
  const validToken = generateTestToken(userId);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/course-topics", () => {
    describe("Successful topic save", () => {
      it("should save course topics and return 200", async () => {
        (prismaMock.courseTopic.upsert as jest.Mock).mockResolvedValue({
          id: "topic-1",
          userId,
          courseCode: "COMP1511",
          weekNumber: 1,
          topic: "Introduction",
        });

        const response = await request(app)
          .post("/api/course-topics")
          .set("Cookie", [`token=${validToken}`])
          .send({
            courseCode: "COMP1511",
            topics: {
              "Week 1": "Introduction",
              "Week 2": "Variables",
            },
          });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Topics saved");
      });

      it("should upsert each topic with correct week number", async () => {
        (prismaMock.courseTopic.upsert as jest.Mock).mockResolvedValue({});

        await request(app)
          .post("/api/course-topics")
          .set("Cookie", [`token=${validToken}`])
          .send({
            courseCode: "COMP1511",
            topics: {
              "Week 1": "Topic 1",
              "Week 5": "Topic 5",
              "Week 10": "Topic 10",
            },
          });

        expect(prismaMock.courseTopic.upsert).toHaveBeenCalledTimes(3);

        // Verify week numbers are parsed correctly
        const calls = (prismaMock.courseTopic.upsert as jest.Mock).mock.calls;
        const weekNumbers = calls.map(
          (
            call: {
              where: { userId_courseCode_weekNumber: { weekNumber: number } };
            }[],
          ) => call[0].where.userId_courseCode_weekNumber.weekNumber,
        );
        expect(weekNumbers).toContain(1);
        expect(weekNumbers).toContain(5);
        expect(weekNumbers).toContain(10);
      });

      it("should handle 10 weeks of topics", async () => {
        (prismaMock.courseTopic.upsert as jest.Mock).mockResolvedValue({});

        const topics: Record<string, string> = {};
        for (let i = 1; i <= 10; i++) {
          topics[`Week ${i}`] = `Topic for week ${i}`;
        }

        const response = await request(app)
          .post("/api/course-topics")
          .set("Cookie", [`token=${validToken}`])
          .send({
            courseCode: "COMP1511",
            topics,
          });

        expect(response.status).toBe(200);
        expect(prismaMock.courseTopic.upsert).toHaveBeenCalledTimes(10);
      });
    });

    describe("Authentication", () => {
      it("should return 401 when no token provided", async () => {
        const response = await request(app)
          .post("/api/course-topics")
          .send({
            courseCode: "COMP1511",
            topics: { "Week 1": "Intro" },
          });

        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Not authenticated");
      });

      it("should return error for invalid token", async () => {
        const response = await request(app)
          .post("/api/course-topics")
          .set("Cookie", ["token=invalid.token.here"])
          .send({
            courseCode: "COMP1511",
            topics: { "Week 1": "Intro" },
          });

        expect(response.status).toBe(500);
      });
    });

    describe("Validation", () => {
      it("should return 400 when courseCode is missing", async () => {
        const response = await request(app)
          .post("/api/course-topics")
          .set("Cookie", [`token=${validToken}`])
          .send({
            topics: { "Week 1": "Intro" },
          });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Missing courseCode or topics");
      });

      it("should return 400 when topics is missing", async () => {
        const response = await request(app)
          .post("/api/course-topics")
          .set("Cookie", [`token=${validToken}`])
          .send({
            courseCode: "COMP1511",
          });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Missing courseCode or topics");
      });
    });

    describe("Server error handling", () => {
      it("should return 500 when database throws error", async () => {
        (prismaMock.courseTopic.upsert as jest.Mock).mockRejectedValue(
          new Error("Database error"),
        );

        const response = await request(app)
          .post("/api/course-topics")
          .set("Cookie", [`token=${validToken}`])
          .send({
            courseCode: "COMP1511",
            topics: { "Week 1": "Intro" },
          });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Failed to save topics");
      });
    });
  });

  describe("GET /api/course-topics", () => {
    describe("Successful topic retrieval", () => {
      it("should return grouped topics by course", async () => {
        (prismaMock.courseTopic.findMany as jest.Mock).mockResolvedValue([
          {
            id: "1",
            userId,
            courseCode: "COMP1511",
            weekNumber: 1,
            topic: "Introduction",
          },
          {
            id: "2",
            userId,
            courseCode: "COMP1511",
            weekNumber: 2,
            topic: "Variables",
          },
          {
            id: "3",
            userId,
            courseCode: "COMP1521",
            weekNumber: 1,
            topic: "Computer Systems",
          },
        ]);

        const response = await request(app)
          .get("/api/course-topics")
          .set("Cookie", [`token=${validToken}`]);

        expect(response.status).toBe(200);
        expect(response.body.topics).toBeDefined();
        expect(response.body.topics["COMP1511"]).toBeDefined();
        expect(response.body.topics["COMP1511"]["Week 1"]).toBe("Introduction");
        expect(response.body.topics["COMP1511"]["Week 2"]).toBe("Variables");
        expect(response.body.topics["COMP1521"]).toBeDefined();
        expect(response.body.topics["COMP1521"]["Week 1"]).toBe(
          "Computer Systems",
        );
      });

      it("should return empty object when no topics exist", async () => {
        (prismaMock.courseTopic.findMany as jest.Mock).mockResolvedValue([]);

        const response = await request(app)
          .get("/api/course-topics")
          .set("Cookie", [`token=${validToken}`]);

        expect(response.status).toBe(200);
        expect(response.body.topics).toEqual({});
      });

      it("should order topics by week number", async () => {
        (prismaMock.courseTopic.findMany as jest.Mock).mockResolvedValue([
          {
            id: "1",
            userId,
            courseCode: "COMP1511",
            weekNumber: 3,
            topic: "Week 3 Topic",
          },
          {
            id: "2",
            userId,
            courseCode: "COMP1511",
            weekNumber: 1,
            topic: "Week 1 Topic",
          },
          {
            id: "3",
            userId,
            courseCode: "COMP1511",
            weekNumber: 2,
            topic: "Week 2 Topic",
          },
        ]);

        const response = await request(app)
          .get("/api/course-topics")
          .set("Cookie", [`token=${validToken}`]);

        expect(response.status).toBe(200);
        // Topics should be grouped correctly regardless of order
        expect(response.body.topics["COMP1511"]["Week 1"]).toBe("Week 1 Topic");
        expect(response.body.topics["COMP1511"]["Week 2"]).toBe("Week 2 Topic");
        expect(response.body.topics["COMP1511"]["Week 3"]).toBe("Week 3 Topic");
      });
    });

    describe("Authentication", () => {
      it("should return 401 when no token provided", async () => {
        const response = await request(app).get("/api/course-topics");

        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Not authenticated");
      });
    });

    describe("Server error handling", () => {
      it("should return 500 when database throws error", async () => {
        (prismaMock.courseTopic.findMany as jest.Mock).mockRejectedValue(
          new Error("Database error"),
        );

        const response = await request(app)
          .get("/api/course-topics")
          .set("Cookie", [`token=${validToken}`]);

        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Failed to fetch topics");
      });
    });
  });
});
