import dotenv from "dotenv";
dotenv.config();

export async function getCourseTopics(courseCode: string): Promise<any> {
  const url = "https://api.perplexity.ai/chat/completions";
  const headers = {
    Authorization: `Bearer ${process.env.PPLX_API_KEY}`,
    "Content-Type": "application/json",
  };

  const payload = {
    model: "sonar-pro",
    messages: [
      {
        role: "user",
        content: `Provide a week-by-week list of main lecture topics for the UNSW course ${courseCode} 
          for 2025 Term 2 from Weeks 1-10. Since Week 6 is flex week don't mention any topic and just say 
          "Flex Week". Output exactly in this format with Week [number]: [topic] one per line, 
          no extra explanation or formatting. Return the output in JSON format`,
      },
    ],
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    // clean JSON output
    const rawTopics = data.choices[0].message.content;
    const cleanTopics = rawTopics.replace(/```json|```/g, "").trim();

    const topics = JSON.parse(cleanTopics);

    return topics;
  } catch (error) {
    console.error("Error calling Perplexity API:", error);
    throw new Error("Failed to fetch topics from Pplx API");
  }
}
