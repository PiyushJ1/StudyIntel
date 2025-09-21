import { Metadata } from "next";
import DashboardWrapper from "@/components/DashboardWrapper";

export const metadata: Metadata = {
  title: "Insights | StudyIntel",
  icons: {
    icon: "/assets/StudyIntel.png",
  },
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <DashboardWrapper>{children}</DashboardWrapper>
    </section>
  );
}
