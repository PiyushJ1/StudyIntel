'use client'

import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  const handleNewSession = () => {
    // placeholder
  }

  return (
    <>
      <Navbar onNewSessionClick={handleNewSession}/>
      <main>{/* actual page content here */}</main>
    </>
  );
};