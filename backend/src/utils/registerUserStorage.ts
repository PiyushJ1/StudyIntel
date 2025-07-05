import bcrypt from "bcrypt";
import { User } from "../models/interfaces";
import { v4 as uuidv4 } from "uuid";
import db from "../db";

export async function saveNewUserAccount(
  newUser: Omit<User, "id">,
): Promise<void> {
  // select user with given email
  const existingUser = await db.query("SELECT 1 FROM users WHERE email = $1", [
    newUser.email,
  ]);

  // check if the email already has an account registered with it
  if (existingUser.rowCount && existingUser.rowCount > 0) {
    throw new Error("An account with this email has already been registered.");
  }

  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  const id = uuidv4();

  await db.query(
    "INSERT INTO users (id, firstName, lastName, email, password) VALUES ($1, $2, $3, $4, $5)",
    [id, newUser.firstName, newUser.lastName, newUser.email, hashedPassword],
  );
}
