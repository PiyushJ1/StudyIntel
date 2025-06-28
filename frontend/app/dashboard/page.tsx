import { Metadata } from "next";

export const metadata: Metadata = {
  title: "StudyIntel | Dashboard",
  icons: {
    icon: "/assets/StudyIntel.png"
  }
}

export default function DashboardPage() {
  return (
    <>
      <div>
        <center>Welcome to the StudyIntel dashboard!</center>
      </div>
    </>
  );
}