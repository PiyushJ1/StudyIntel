"use client";

import Navbar from "./Navbar";

interface DashboardWrapperProps {
  children: React.ReactNode;
}

export default function DashboardWrapper({ children }: DashboardWrapperProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
