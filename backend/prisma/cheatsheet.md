# Prisma + PostgreSQL (Railway) Cheatsheet

for auto-linting: npx prisma format


## 🔧 SETUP

### 1. Install Prisma

npm install prisma --save-dev
npm install @prisma/client
npx prisma init

🏗️ WORKING WITH DATABASE
✅ Pull Existing Schema (Introspect)
npx prisma db pull
Use when the DB already has tables (don't want to overwrite existing data).

✅ Push Schema to DB

npx prisma db push
Fails if you add required fields to tables that already have rows.

⚠️ Force Push (Wipes All Data)

npx prisma db push --force-reset
Use ONLY in dev/testing. This drops and recreates everything.

⚙️ GENERATE PRISMA CLIENT
npx prisma generate
Run this after:

Pulling schema

Pushing schema

Changing schema.prisma

Imports from generated location:
import { PrismaClient } from "../generated/prisma";

🔍 PRISMA CLIENT USAGE

✅ Create Instance
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

✅ Create User
await prisma.user.create({
data: {
id: "uuid-v4-here",
firstname: "John",
lastname: "Doe",
email: "john@example.com",
password: "hashed_password_here"
}
});

✅ Find Unique User by Email
const user = await prisma.user.findUnique({
where: { email: "john@example.com" }
});

✅ Insert into Waitlist
await prisma.waitlistEmail.create({
data: { email: "someone@example.com" }
});

✅ Find Email in Waitlist
const entry = await prisma.waitlistEmail.findUnique({
where: { email: "someone@example.com" }
});

🔁 MIGRATIONS (Schema-Driven)

✅ Initialize Migration System
npx prisma migrate dev --name init

✅ Create a New Migration
npx prisma migrate dev --name add_new_feature
SQL is saved in prisma/migrations/.

🧼 NAMING RULES (Prisma vs PostgreSQL)
Prisma PostgreSQL Mapping
User users @@map("users")
email emails @map("emails")
createdAt created_at Implicitly handled

Always use @map or @@map when mapping to existing DB.

🛠️ TIPS / GOTCHAS
Prisma auto-generates camelCase, even if DB uses snake_case.

Don’t rename DB tables directly — use mapping instead.

You can still run raw SQL if needed:
await prisma.$queryRaw`SELECT * FROM users WHERE id = ${userId}`;

🧪 RESETTING DB (Dev Only)
npx prisma migrate reset
Drops DB, applies migrations, and seeds data.
