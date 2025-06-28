import { Metadata } from "next";

export const metadata: Metadata = {
  title: "StudyIntel | Dashboard",
  icons: {
    icon: "/assets/StudyIntel.png"
  }
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {/* Optional shared layout UI here */}
      {children}
    </section>
  );
};