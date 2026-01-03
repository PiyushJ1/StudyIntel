import "dotenv/config";
// import { PrismaClient } from "../../prisma/generated/client.js";
import { PrismaClient } from "@prisma/generated/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000, // increased timeout for cloud DBs
  ssl: {
    rejectUnauthorized: false, // required for Railway and similar cloud providers
  },
});

const prisma = new PrismaClient({ adapter });

export default prisma;
