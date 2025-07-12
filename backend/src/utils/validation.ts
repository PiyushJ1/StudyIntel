import bcrypt from "bcrypt";
import db from "../db";
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
): Promise<void> {
  const result = await db.query(
    "SELECT id, firstName, lastName, email, password FROM users WHERE email = $1",
    [email],
  );

  if (result.rowCount === 0) {
    throw new UserNotFoundError();
  }

  const user = result.rows[0];

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new InvalidPasswordError();
  }
}
