import db from "../db";

export async function saveEmailToWaitlist(email: string): Promise<void> {
  // check if email is already in waitlist
  const existingEmail = await db.query(
    "SELECT 1 FROM waitlistemails WHERE emails = $1",
    [email],
  );

  if (existingEmail.rowCount ?? 0 > 0) {
    throw new Error("This email is already in the waitlist.");
  }

  await db.query("INSERT INTO waitlistemails (emails) VALUES ($1)", [email]);
}
