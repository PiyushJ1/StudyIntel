import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sessions | StudyIntel",
  icons: {
    icon: "/assets/StudyIntel.png"
  }
};

export default function SessionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {/* Optional shared layout UI here */}
      {children}
    </section>
  );
};