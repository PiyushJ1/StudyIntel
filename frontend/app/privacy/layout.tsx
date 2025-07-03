import { Metadata } from "next";

export const metadata: Metadata = {
  title: "StudyIntel | Privacy Policy",
  icons: {
    icon: "assets/StudyIntel.png"
  }
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {/* Optional shared layout UI here */}
      {children}
    </section>
  );
};