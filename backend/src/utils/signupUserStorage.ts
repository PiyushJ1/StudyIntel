import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { User } from "../models/interfaces";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function saveNewUserAccount(
  newUser: Omit<User, "id">,
): Promise<void> {
  const existingUser = await prisma.user.findUnique({
    where: { email: newUser.email },
  })

  // check if the email already has an account signed up with it
  if (existingUser) {
    throw new Error("An account with this email has already been signed up.");
  }

  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  const id = uuidv4();

  await prisma.user.create({
    data: {
      id: id,
      firstname: newUser.firstName,
      lastname: newUser.lastName,
      email: newUser.email,
      password: hashedPassword,
    }
  });
}
