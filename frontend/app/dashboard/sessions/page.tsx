"use client";

import { useEffect, useState } from "react";

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/past-sessions`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Past sessions:", data);
        setSessions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to get past study sessions", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <main>Loading sessions...</main>;
  }

  return (
    <>
      <main>
        <h1>Past Study Sessions</h1>
        <pre>{JSON.stringify(sessions, null, 2)}</pre>
      </main>
    </>
  );
}
