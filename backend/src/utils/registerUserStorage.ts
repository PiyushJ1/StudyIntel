import fs from "fs";
import path from "path";
import { User } from "../models/interfaces";
import { v4 as uuidv4 } from "uuid";

const filePath = path.join(__dirname, "..", "..", "data", "users.json");

export function saveNewUserAccount(newUser: Omit<User, "id">): void {
  // create a unique user id for each new user (temp solution change later)
  const user: User = {
    id: uuidv4(),
    ...newUser,
  };

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


  // add the new user to the list of existing users
  users.push(user);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
}
