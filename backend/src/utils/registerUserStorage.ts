import fs from "fs";
import path from "path";
import { User } from "../models/interfaces";

const filePath = path.join(__dirname, "..", "..", "data", "users.json");

export function saveNewUserAccount(user: User): void {
  let users: User[] = [];

  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf-8");
    try {
      users = JSON.parse(fileData);
    } catch {
      throw new Error("Could not parse users.json");
    }
  }

  users.push(user);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
}
