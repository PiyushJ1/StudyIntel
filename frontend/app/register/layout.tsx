import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "StudyIntel | Sign Up",
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