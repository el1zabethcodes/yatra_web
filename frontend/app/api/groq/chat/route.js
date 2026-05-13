import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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
        { status: 400 }
      );
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...chatHistory.map((m) => ({
        role: m.role === "model" ? "assistant" : "user",
        content: m.text,
      })),
      { role: "user", content: userMessage },
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_completion_tokens: 512,
      stream: false,
    });

    const text = chatCompletion.choices[0]?.message?.content ?? "";
    return NextResponse.json({ text });
  } catch (error) {
    console.error("Groq chat error:", error);
    return NextResponse.json(
      { error: "The currents are too strong. Try again." },
      { status: 500 }
    );
  }
}
