import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { User, UserAuthResult } from "../models/interfaces";

export function validateEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;

  const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegEx.test(email);
}

export function validatePassword(password: string): boolean {
  // password length is less than 9 characters
  if (password.length < 9) return false;

  // no whitespace
  if (/\s/.test(password)) return false;

  // regex to ensure password contains at least 9 chars, at least 1 uppercase,
  // 1 lowercase, 1 digit, and 1 special character
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-\\/]).{9,}$/;
  if (!passwordRegEx.test(password)) return false;

  return true;
}

export async function authenticateUser(email: string, password: string): Promise<UserAuthResult> {
  // find user details from local JSON file
  const filePath = path.join(__dirname, "..", "..", "data", "users.json");
  const fileData = fs.readFileSync(filePath, "utf-8");

  // create users array from the file's data
  let users: User[] = [];
  users = JSON.parse(fileData);

  // no account exists associated to the email
  const user = users.find((u) => u.email === email);
  if (!user) {
    return { result: false, message: "A user with this email does not exist" };
  }

  // check if entered password is correct
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { result: false, message: "Incorrect password" };
  }

  // user log in auth successul
  return { result: true, message: "Log in successful" };
}
