import fs from "fs";
import path from "path";
import { User } from "../models/interfaces";

const filePath = path.join(__dirname, "..", "..", "data", "users.json");

export function saveNewUserAccount(newUser: User): void {
  let users: User[] = [];

  // check if file path already exists
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf-8");
    try {
      users = JSON.parse(fileData);
    } catch {
      throw new Error("Could not parse users.json");
    }
  }

  // add the user to the list of existing users
  users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
}
