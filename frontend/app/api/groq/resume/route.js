import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are Kavi — a sharp, empathetic AI career analyst for Yatra, a career development platform for tech students and young professionals.

Your job: analyse the resume/CV text the user provides and return a structured, honest, actionable JSON report.

CRITICAL RULES:
1. Be brutally honest but constructive. Do NOT sugarcoat weaknesses.
2. Base EVERY finding strictly on what is written in the resume. Do not invent skills.
3. Hard skills = specific technologies, tools, languages, frameworks (e.g. React, Python, SQL, Figma).
4. Soft skills = communication, leadership, teamwork, problem-solving, adaptability, etc.
5. Skill levels: "beginner" | "intermediate" | "advanced" — infer from context (projects, years, descriptions).
6. Gaps = skills/experiences that are missing or underdeveloped for the stated goal.
7. Quick wins = 2-3 specific, actionable things the person can do THIS WEEK to improve.
8. Overall score = integer 1-100 reflecting readiness for the job market in their field.
9. Output ONLY valid JSON — no markdown, no code fences, no explanation outside the JSON.

JSON structure (follow exactly):
{
  "name": "candidate name or 'Unknown'",
  "targetRole": "inferred target role from resume",
  "overallScore": 72,
  "scoreLabel": "Promising Navigator",
  "summary": "2-3 sentence honest summary of the candidate's profile",
  "hardSkills": [
    { "name": "React", "level": "intermediate", "note": "Used in 2 projects but no production experience" }
  ],
  "softSkills": [
    { "name": "Communication", "level": "advanced", "note": "Led team presentations, wrote technical docs" }
  ],
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2", "weakness 3"],
  "gaps": ["gap 1", "gap 2", "gap 3"],
  "quickWins": ["actionable win 1", "actionable win 2", "actionable win 3"],
  "radarScores": {
    "Frontend": 0,
    "Backend": 0,
    "Logic": 0,
    "Design": 0,
    "SoftSkills": 0
  }
}

For radarScores: values are 0.0–1.0 floats. Infer from the resume content. If a category is not mentioned at all, use 0.1 as minimum.
scoreLabel mapping: 1-30 = "Lost at Sea", 31-50 = "Beachcomber", 51-65 = "Wayfinder", 66-80 = "Promising Navigator", 81-90 = "Seasoned Captain", 91-100 = "Legendary Kraken".`;

export async function POST(req) {
  try {
    let reqBody;
    try {
      reqBody = await req.json();
    } catch (err) {
      console.error("Invalid JSON in request:", err);
      return NextResponse.json(
        { error: "Invalid request format." },
        { status: 400 }
      );
    }

    const { resumeText } = reqBody;

    if (!resumeText || typeof resumeText !== "string" || resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: "Resume text is too short or missing." },
        { status: 400 }
      );
    }

    let completion;
    try {
      completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Here is my resume. Please analyse it thoroughly and return the JSON report:\n\n${resumeText.slice(0, 8000)}`,
          },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.3,
        max_completion_tokens: 2048,
        stream: false,
      });
    } catch (groqErr) {
      console.error("Groq API error:", groqErr.message || groqErr);
      if (groqErr.message?.includes("API key")) {
        return NextResponse.json(
          { error: "API configuration error. Please contact support." },
          { status: 503 }
        );
      }
      return NextResponse.json(
        { error: "AI service temporarily unavailable. Please try again in a moment." },
        { status: 503 }
      );
    }

    const rawText = completion.choices[0]?.message?.content ?? "";

    if (!rawText || rawText.trim().length === 0) {
      console.error("Empty response from Groq");
      return NextResponse.json(
        { error: "Kavi went silent. Please try again." },
        { status: 500 }
      );
    }

    const cleaned = rawText
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    if (!cleaned || cleaned.length === 0) {
      console.error("Cleaned response is empty");
      return NextResponse.json(
        { error: "Could not parse analysis. Please try again." },
        { status: 500 }
      );
    }

    let report;
    try {
      report = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("Failed to parse resume JSON:");
      console.error("Raw response:", rawText.substring(0, 300));
      console.error("Cleaned response:", cleaned.substring(0, 300));
      console.error("Parse error:", parseErr.message);
      return NextResponse.json(
        { error: "Resume analysis returned invalid data. Please try with a clearer resume." },
        { status: 500 }
      );
    }

    if (!report || typeof report !== "object") {
      console.error("Report is not a valid object");
      return NextResponse.json(
        { error: "Analysis returned invalid data structure." },
        { status: 500 }
      );
    }

    return NextResponse.json({ report });
  } catch (error) {
    console.error("Groq resume error:", error.message || error);
    return NextResponse.json(
      { error: "The currents are too strong. Try again." },
      { status: 500 }
    );
  }
}
