import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { InvalidPasswordError, UserNotFoundError } from "../errors/auth";

export function validatePassword(password: string): boolean {
  // password length is less than 9 characters
  if (password.length < 9) return false;

  // no whitespace
  if (/\s/.test(password)) return false;

  // regex to ensure password contains at least:
  // 9 chars,
  // 1 uppercase,
  // 1 lowercase,
  // 1 digit, and
  // 1 special character
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-\\/]).{9,}$/;
  if (!passwordRegEx.test(password)) return false;

  return true;
}

export async function authenticateUser(
  email: string,
  password: string,
): Promise<{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  courses: string[];
}> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      password: true,
      courses: true,
    },
  });

  if (!user) {
    throw new UserNotFoundError();
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new InvalidPasswordError();
  }

  return {
    id: user.id,
    firstName: user.firstname,
    lastName: user.lastname,
    email: user.email,
    courses: user.courses || [],
  };
}
