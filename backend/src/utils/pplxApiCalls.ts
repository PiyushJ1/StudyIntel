export async function getCourseTopics(
  courseCode: string,
): Promise<Record<string, string>> {
  const payload = {
    model: "sonar-pro",
    messages: [
      {
        role: "user",
        content: `Provide a week-by-week list of main lecture topics for the UNSW course ${courseCode} 
          for 2025 Term 3 from Weeks 1-10. Since Week 6 is flex week don't mention any topic and just say 
          "Flex Week". Output exactly in this format with Week [number]: [topic] one per line, 
          no extra explanation or formatting.`,
      },
    ],
  };

  try {
    const res = await fetch(`${process.env.PPLX_API_URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PPLX_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`API Error ${res.status}, ${res.status}`);
    }

    const data = await res.json();
    const rawText: string = data.choices[0].message.content;

    const topics: Record<string, string> = {};
    for (const line of rawText.split("\n")) {
      const cleaned = line.replace(/\[\d+\]/g, "").trim();
      const match = cleaned.match(/^Week\s*(\d+):\s*(.+)$/i);
      if (match) {
        const [, week, topic] = match;
        topics[`Week ${week}`] = topic;
      }
    }

    return topics;
  } catch (error) {
    console.error("Error calling Perplexity API:", error);
    throw new Error("Failed to fetch topics from pplx API");
  }
}
