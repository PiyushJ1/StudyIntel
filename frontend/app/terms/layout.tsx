import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StudyIntel | Terms of Service",
  icons: {
    icon: "/assets/StudyIntel.png"
  }
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {/* Optional shared layout UI here */}
      {children}
    </section>
  );
};