import fs from "fs";
import path from "path";
import bcrypt from 'bcrypt';
import { User } from "../models/interfaces";
import { v4 as uuidv4 } from "uuid";

const filePath = path.join(__dirname, "..", "..", "data", "users.json");

export async function saveNewUserAccount(newUser: Omit<User, "id">): Promise<void> {
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

  // error checking: given email already has an account registered with it
  if (users.find(u => u.email === newUser.email)) {
    throw new Error("An account with this email already exists");
  }

  // create a unique user id for each new user (temp solution change later)
  const modifiedNewUser: User = {
    id: uuidv4(),
    ...newUser,
  };

  // hash the user's password
  modifiedNewUser.password = await bcrypt.hash(newUser.password, 10);

  // add the new user to the list of existing users
  users.push(modifiedNewUser);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
}
