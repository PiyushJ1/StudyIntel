import { Metadata } from "next";
import DashboardWrapper from "@/components/DashboardWrapper";

export const metadata: Metadata = {
  title: "Sessions | StudyIntel",
  icons: {
    icon: "/assets/StudyIntel.png",
  },
};

export default function DashboardLayout({
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
