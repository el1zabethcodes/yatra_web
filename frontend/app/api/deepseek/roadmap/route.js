import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a career roadmap generator. Given a user's learning goal, respond ONLY with valid JSON — no markdown, no explanation, no code fences.

Use this exact structure:
{
  "roadmapTitle": "30-Day Roadmap: <short goal summary>",
  "waves": [
    { "week": 1, "theme": "Foundation", "milestones": ["milestone 1", "milestone 2", "milestone 3"] },
    { "week": 2, "theme": "Building", "milestones": ["milestone 1", "milestone 2", "milestone 3"] },
    { "week": 3, "theme": "Practice", "milestones": ["milestone 1", "milestone 2", "milestone 3"] },
    { "week": 4, "theme": "Deploy", "milestones": ["milestone 1", "milestone 2", "milestone 3"] }
  ]
}

Keep milestones short (5-8 words each). Be practical and actionable. Output JSON only.`;

export async function POST(req) {
  try {
    const { goal } = await req.json();

    if (!goal || typeof goal !== "string") {
      return NextResponse.json({ error: "goal is required." }, { status: 400 });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer":
            process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
          "X-Title": "Yatra Career Navigator",
        },
        body: JSON.stringify({
          model: "google/gemma-4-26b-a4b-it:free",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: `Generate a 30-day roadmap for this goal: "${goal}"`,
            },
          ],
          temperature: 0.4,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", data);
      return NextResponse.json(
        { error: data.error?.message || "The compass is spinning!" },
        { status: response.status },
      );
    }

    const rawText = data.choices?.[0]?.message?.content ?? "";

    // Strip markdown code fences if the model wraps JSON in ```
    const cleaned = rawText
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    let roadmap;
    try {
      roadmap = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse roadmap JSON:", rawText);
      return NextResponse.json(
        { error: "Could not parse roadmap from AI response." },
        { status: 500 },
      );
    }

    return NextResponse.json({ roadmap });
  } catch (error) {
    console.error("Roadmap route error:", error);
    return NextResponse.json(
      { error: "The compass is spinning!" },
      { status: 500 },
    );
  }
}
