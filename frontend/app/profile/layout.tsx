import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Settings | StudyIntel",
  icons: {
    icon: "/assets/StudyIntel.png"
  }
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {/* Optional shared layout UI here */}
      {children}
    </section>
  );
};