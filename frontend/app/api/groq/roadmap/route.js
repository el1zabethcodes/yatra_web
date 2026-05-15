import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Generate a 30-day roadmap for this goal: "${goal}"` },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.4,
      max_completion_tokens: 1024,
      stream: false,
    });

    const rawText = chatCompletion.choices[0]?.message?.content ?? "";

    // Strip markdown code fences if model wraps JSON in ```
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
        { status: 500 }
      );
    }

    return NextResponse.json({ roadmap });
  } catch (error) {
    console.error("Groq roadmap error:", error);
    return NextResponse.json(
      { error: "The compass is spinning!" },
      { status: 500 }
    );
  }
}
