import { PrismaClient } from "@prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  max: 10, // max concurrent pools allowed
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export default new PrismaClient({ adapter });
