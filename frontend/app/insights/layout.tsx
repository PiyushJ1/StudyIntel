import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights | StudyIntel",
  icons: {
    icon: "/assets/StudyIntel.png"
  }
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {/* Optional shared layout UI here */}
      {children}
    </section>
  );
};