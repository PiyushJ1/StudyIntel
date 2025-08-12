import { Metadata } from "next";
import DashboardWrapper from "@/components/DashboardWrapper";

export const metadata: Metadata = {
  title: "Courses | StudyIntel",
  icons: {
    icon: "/assets/StudyIntel.png"
  }
};

export default function SessionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <DashboardWrapper>
        {children}
      </DashboardWrapper>
    </section>
  );
};