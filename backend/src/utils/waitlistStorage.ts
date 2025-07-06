import db from "../db";

export async function saveEmailToWaitlist(email: string): Promise<void> {
  try {
    // check if email is already in waitlist
    const existingEmail = await db.query(
      "SELECT 1 FROM waitlistemails WHERE email = $1",
      [email],
    );

    if (existingEmail.rowCount === 0) {
      await db.query("INSERT INTO waitlistemails (email) VALUES ($1)", [email]);
      console.log(`Email ${email} inserted successfully.`);
    }
  } catch (err) {
    console.error("DB error in saveEmailToWaitlist:", err);
    throw err;
  } 
}
