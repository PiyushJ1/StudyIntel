'use client'

import Navbar from "@/components/Navbar";

export default function InsightsPage() {
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