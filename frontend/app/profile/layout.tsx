import DashboardWrapper from "@/components/DashboardWrapper";
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
      <DashboardWrapper>
        {children}
      </DashboardWrapper>
    </section>
  );
};