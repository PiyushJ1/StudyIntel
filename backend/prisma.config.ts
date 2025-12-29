import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Use process.env with fallback for CI (prisma generate doesn't need real DB)
    url: process.env.DATABASE_URL ?? "postgresql://placeholder:5432/db",
  },
});
