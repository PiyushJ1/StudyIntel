import { Metadata } from "next";

export const metadata: Metadata = {
  title: "StudyIntel | Sign In",
  icons: {
    icon: "/assets/StudyIntel.png",
  },
};

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Optional shared layout UI here */}
      {children}
    </section>
  );
}
