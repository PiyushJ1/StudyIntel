import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "..", "..", "data", "waitlist.json");

export function saveEmailToWaitlist(email: string): void {
  let emails: string[] = [];

  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf-8");
    try {
      emails = JSON.parse(fileData);
    } catch {
      throw new Error("Could not parse waitlist file");
    }
  }

  emails.push(email);
  fs.writeFileSync(filePath, JSON.stringify(emails, null, 2));
}
