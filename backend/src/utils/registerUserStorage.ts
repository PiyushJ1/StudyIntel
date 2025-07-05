import bcrypt from "bcrypt";
import { User } from "../models/interfaces";
import { v4 as uuidv4 } from "uuid";
import db from "../db";

export async function saveNewUserAccount(
  newUser: Omit<User, "id">
): Promise<void> {
  // check if the email already has an account registered with it
  const existingUser = await db.query(
    "SELECT 1 FROM users WHERE email = $1",
    [newUser.email]
  );
}