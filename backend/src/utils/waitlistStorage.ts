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

  const emailHtmlContent = `<body style="margin:0; padding:0; background-color:#000; font-family: roboto, sans-serif; color:#fff;">
    <div style="max-width: 800px; margin: auto; padding: 20px;">
      <div style="
        font-family: roboto, sans-serif; 
        line-height: 1.5; 
        padding: 20px; 
        background-color: #000; 
        border: 1px solid #ddd;
        border-radius: 8px;
      ">
        <h2 style="font-weight: 750; color: #fff;">
          Welcome to the 
          <span style="
            background: linear-gradient(90deg, #286FD9, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
          ">
            StudyIntel
          </span> 
          waitlist! 🎉
        </h2>
        
        <div style="color: #fff;">
          <h4 style="color:#fff;">Thank you so much for joining the waitlist! We're thrilled to have you on board.</h4>
          <br>
          <p>
            As we build the platform, we'll keep you updated with exciting new features and updates designed to help you unlock your academic potential.
            <br><br>
            In the meantime, we'd love to hear your ideas or feedback. Your input will help make StudyIntel the best study intelligence tool out there.
          </p>
          <br>
          <p>Thanks again for your support!</p>
        </div>
        <br>
        <p style="color:#fff;">Best Regards,</p>
        
        <h5 style="font-weight: 750;">
          <span style="
            background: linear-gradient(90deg, #286FD9, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
          ">
            StudyIntel | A study intelligence platform
          </span>
        </h5>
      </div>
    </div>
  </body>
  `;

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
