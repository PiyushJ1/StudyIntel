import db from "../db";

export async function saveEmailToWaitlist(email: string): Promise<void> {
  // check if email is already in waitlist
  const existingEmail = await db.query(
    "SELECT 1 FROM waitlistEmails WHERE email = $1",
    [email],
  );

  if (existingEmail.rowCount === 0) {
    await db.query("INSERT INTO waitlistEmails (email) VALUES ($1)", [email]);
  }
}
