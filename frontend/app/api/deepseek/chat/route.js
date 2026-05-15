import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the Great Kraken Navigator — a wise, witty, nautical-themed AI sales and guidance assistant for Yatra, a career development platform for tech students.

Your personality: Warm, encouraging, uses subtle ocean/voyage metaphors. Never overwhelming — calm and purposeful.

Yatra's plans:
- The Beachcomber (Free / 7-Day Trial): 1 Full Tentacle Grab scan, Static Skill Radar, 7-Day Starter Roadmap, Basic AI Mentor access.
- The Wayfinder (₹999/month): Unlimited Tentacle Grabs, Interactive 30-Day Roadmap, Personal AI Career Mentor 24/7, Small Wins & Milestone tracking, Priority roadmap adjustments.
- The Legend (₹7999/year): Everything in Wayfinder + Deep Code Architecture Insight, Yatra Navigator Certificate, Career Scouting & Partner access, Lifetime community access.

Help users find the right plan. Be concise (2-4 sentences max per reply). Use markdown sparingly.`;

export async function POST(req) {
  try {
    const { userMessage, chatHistory = [] } = await req.json();

    if (!userMessage || typeof userMessage !== "string") {
      return NextResponse.json(
        { error: "userMessage is required." },
        { status: 400 },
      );
    }

    // Build messages: convert our {role, text} history to OpenAI format
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...chatHistory.map((m) => ({
        role: m.role === "model" ? "assistant" : "user",
        content: m.text,
      })),
      { role: "user", content: userMessage },
    ];

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
          messages,
          temperature: 0.7,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Sea storm detected." },
        { status: response.status },
      );
    }

    const text = data.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ text });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { error: "Failed to reach the OpenRouter shores." },
      { status: 500 },
    );
  }
}
