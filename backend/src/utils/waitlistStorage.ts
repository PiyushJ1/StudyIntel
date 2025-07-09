import db from "../db";
import { Resend } from "resend";

// send a confirmation email to the user
const resend = new Resend(process.env.RESEND_API_KEY);

export async function saveEmailToWaitlist(email: string): Promise<void> {
  // check if email is already in waitlist
  const existingEmail = await db.query(
    "SELECT 1 FROM waitlistemails WHERE emails = $1",
    [email],
  );

  if (existingEmail.rowCount ?? 0 > 0) {
    throw new Error("This email is already in the waitlist.");
  }

  // save email to db
  await db.query("INSERT INTO waitlistemails (emails) VALUES ($1)", [email]);

  const emailHtmlContent = `<body style="margin:0; padding:0; background-color:#ffffff; font-family: Roboto, sans-serif; color: rgb(0, 0, 0); font-size: 16px; line-height: 1.6;">
    <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
      <div style="
        font-family: Roboto, sans-serif; 
        padding: 24px; 
        background-color: #ffffff; 
        color: rgb(0, 0, 0);
        border: 1px solid #eee;
        border-radius: 8px;
      ">

        <h1 style="font-weight: 700; color: rgb(0, 0, 0); font-size: 26px; margin-top: 0;">
          Welcome to the 
          <span style="display: inline-block;">
            <span style="color: #286FD9;">Study</span><span style="color: #8b5cf6;">Intel</span>
          </span> 
          waitlist! 🎉
        </h1>

        <h2 style="font-weight: 500; font-size: 20px; margin-top: 28px; color: rgb(0, 0, 0);">
          Thank you so much for joining the waitlist — we're thrilled to have you on board.
        </h2>

        <p style="margin-top: 20px; color: rgb(0, 0, 0);">
          As we build the platform, we'll keep you updated with exciting new features and updates designed to help you unlock your academic potential.
        </p>

        <p style="color: rgb(0, 0, 0);">
          In the meantime, we'd love to hear your ideas or feedback. Your input will help make 
          <span style="color: #286FD9;">Study</span><span style="color: #8b5cf6;">Intel</span> the best study intelligence tool out there.
        </p>

        <p style="color: rgb(0, 0, 0);">Thanks again for your support!</p>

        <p style="margin-top: 40px; color: rgb(0, 0, 0);">Best regards,</p>

        <p style="font-weight: 600; font-size: 15px; margin-bottom: 0; color: rgb(0, 0, 0);">
          <span style="color: #286FD9;">Study</span><span style="color: #8b5cf6;">Intel</span> | A study intelligence platform
        </p>
      </div>
    </div>
  </body>`;

  const emailTextContent = `
    Welcome to the StudyIntel waitlist!

    Thank you so much for joining the waitlist! We're thrilled to have you on board.

    As we build the platform, we'll keep you updated with exciting new features and updates designed to help you unlock your academic potential.

    In the meantime, we'd love to hear your ideas or feedback. Your input will help make StudyIntel the best study intelligence tool out there.

    Thanks again for your support!

    Best Regards,
    StudyIntel | A study intelligence platform
  `;

  try {
    await resend.emails.send({
      from: "StudyIntel <no-reply@studyintel.app>",
      to: [email],
      subject: "Thanks for joining the StudyIntel waitlist!",
      text: emailTextContent,
      html: emailHtmlContent,
    });
  } catch (err) {
    console.error("Failed to send confirmation email:", err);
  }
}
