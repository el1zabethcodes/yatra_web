# Yatra — Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Frontend](#frontend)
3. [API Routes](#api-routes)
4. [Auth System](#auth-system)
5. [Dashboard Tabs](#dashboard-tabs)
6. [AI Prompts](#ai-prompts)
7. [Design System](#design-system)
8. [Assets](#assets)

---

## Architecture Overview

Yatra is a Next.js 16 App Router application with a lightweight FastAPI backend. The frontend handles all AI interactions directly via server-side API routes (no client-side API key exposure). Auth is client-side only using React Context + localStorage — no database required for the demo.

```
Browser → Next.js App Router
              ├── /app/page.jsx          (landing)
              ├── /app/login             (auth)
              ├── /app/dashboard         (protected)
              └── /app/api/groq/*        (server-side AI proxy)
                        ↓
                   Groq API (llama-3.3-70b-versatile)
```

---

## Frontend

### Pages

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.jsx` | Landing — sanctuary narrative |
| `/login` | `app/login/page.jsx` | Sign in / sign up with test accounts |
| `/dashboard` | `app/dashboard/page.jsx` | Protected — redirects to /login if no session |
| `/features` | `app/features/page.jsx` | Ashta story + feature showcase |
| `/pricing` | `app/pricing/page.jsx` | Plan comparison |

### Key Components

**Shared**
- `Header.jsx` — sticky glassmorphism nav, responsive burger menu
- `Footer.jsx` — slim single-row footer, shown on all pages except `/login`, `/signup`, `/dashboard`
- `FooterGate.jsx` — client wrapper using `usePathname` to conditionally render Footer

**Dashboard**
- `BottomNavBar.jsx` — floating pill nav with animated label expand (Dashboard / Roadmap / Mentor / Account)
- `DashboardTab.jsx` — welcome, progress bar, stat cards, TentacleGrab, SkillRadar, SmallWins
- `TentacleGrab.jsx` — URL input + file/GitHub/LinkedIn import UI + Kavi whisper bubble
- `SkillRadar.jsx` — pure SVG radar chart, accepts `scores` prop from user data
- `SmallWins.jsx` — 3 achievement cards styled as glowing pearls
- `MentorTab.jsx` — toggle between Chat and Resume Analyser
- `ResumeAnalyzer.jsx` — textarea/file input → POST `/api/groq/resume` → structured results
- `RoadmapTab.jsx` — coming soon placeholder with candle illustration
- `AccountTab.jsx` — profile info, subscription badge, password reset accordion, logout

---

## API Routes

All routes are Next.js Route Handlers under `app/api/groq/`.

### `POST /api/groq/chat`

Mentor chat. Accepts conversation history and returns a single reply.

**Request**
```json
{
  "userMessage": "What should I focus on this week?",
  "chatHistory": [
    { "role": "model", "text": "Hello, Captain!" }
  ]
}
```

**Response**
```json
{ "text": "Focus on DSA patterns..." }
```

Model: `llama-3.3-70b-versatile`, temp `0.7`, max `512` tokens.

---

### `POST /api/groq/roadmap`

Generates a 4-week roadmap from a goal string.

**Request**
```json
{ "goal": "Learn React and get a frontend job" }
```

**Response**
```json
{
  "roadmap": {
    "roadmapTitle": "30-Day Roadmap: React Frontend",
    "waves": [
      { "week": 1, "theme": "Foundation", "milestones": ["..."] }
    ]
  }
}
```

Model: `llama-3.3-70b-versatile`, temp `0.4`, max `1024` tokens. Returns strict JSON only.

---

### `POST /api/groq/resume`

Deep resume analysis. Returns a structured JSON report.

**Request**
```json
{ "resumeText": "Name: Arjun Sharma\nSkills: React, TypeScript..." }
```

**Response**
```json
{
  "report": {
    "name": "Arjun Sharma",
    "targetRole": "Frontend Engineer",
    "overallScore": 72,
    "scoreLabel": "Promising Navigator",
    "summary": "...",
    "hardSkills": [{ "name": "React", "level": "intermediate", "note": "..." }],
    "softSkills": [...],
    "strengths": [...],
    "weaknesses": [...],
    "gaps": [...],
    "quickWins": [...],
    "radarScores": { "Frontend": 0.72, "Backend": 0.38, ... }
  }
}
```

Score labels: `Lost at Sea` (1-30) → `Beachcomber` → `Wayfinder` → `Promising Navigator` → `Seasoned Captain` → `Legendary Kraken` (91-100).

Model: `llama-3.3-70b-versatile`, temp `0.3`, max `2048` tokens.

---

## Auth System

Client-side only. No database.

**Files**
- `lib/users.js` — array of test users + `authenticate(email, password)` + `getUserById(id)`
- `lib/AuthContext.jsx` — React Context with `login()`, `logout()`, session restore from `localStorage`

**Session key:** `yatra_session_uid` in localStorage.

**Flow**
1. User submits login form → `authenticate()` checks against `TEST_USERS`
2. On success → `login(user, remember)` stores user in context + optionally in localStorage
3. Dashboard page checks `user` from context; if null after loading → `router.replace('/login')`
4. Logout → clears context + localStorage → redirect to `/login`

**Test users** — see `docs/test-accounts.md`.

---

## Dashboard Tabs

### Dashboard
Shows: welcome message with first name, journey progress bar (%), streak/skills/pearls stat cards, TentacleGrab hero, SkillRadar (SVG, data from user profile), SmallWins list.

All data comes from the authenticated `user` object in AuthContext.

### Roadmap
Placeholder. Shows candle illustration + "The Map is Being Drawn" card + "Start Analysis" CTA.

### Mentor
Two sub-views toggled by a pill switcher:
- **Chat with Kavi** — full chat UI, messages sent to `/api/groq/chat`, typing indicator, Enter to send
- **Resume Analyser** — instruction card explaining honest resume writing, textarea + .txt upload, results with score ring, radar, skill pills, strengths/weaknesses/gaps/quick wins grid

### Account
Shows: logout button, subscription badge (Explorer/Navigator/Captain with colour coding), profile info rows (name, email, DOB, goal), password reset accordion (validates match, shows success state).

---

## AI Prompts

### Mentor Chat System Prompt
Kavi is a warm, honest, nautical-themed career mentor. Concise (2-5 sentences), practical, always ends with one actionable suggestion. Covers: career planning, resume review, interview prep, skill gaps, motivation/burnout. Uses ocean metaphors naturally.

### Resume Analyser System Prompt
Brutally honest but constructive. Bases findings strictly on resume text. Returns strict JSON only — no markdown fences. Infers skill levels (beginner/intermediate/advanced) from context. Radar scores are 0.0–1.0 floats.

### Roadmap Generator System Prompt
Returns strict JSON only. 4 weeks, 3 milestones each. Milestones are 5-8 words, practical and actionable.

---

## Design System

### Colours
| Token | Hex | Usage |
|---|---|---|
| Parchment | `#DFE0BF` | Page background |
| Deep Ink Green | `#1B3B18` | Primary text |
| Jungle Green | `#2D5A27` | Success, stats, active states |
| Terracotta | `#D35400` | CTAs, accents, logo |
| Cream | `#FFF9E3` | Text on dark backgrounds |

### Glass style
```js
{
  background: "rgba(255,255,255,0.26)",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.40)",
  boxShadow: "0 6px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.65)",
}
```

### Border radius
- Cards: `rounded-[28px]` or `rounded-[32px]`
- Buttons: `rounded-full` or `rounded-2xl`
- Pills: `rounded-full`

### Animations
All entrance animations use `framer-motion` with `ease: "easeOut"`, duration `0.5–0.8s`. No bounce (`type: "spring"` only on interactive hover/tap). `whileInView` with `once: true` for scroll-triggered sections.

---

## Assets

All assets live in `frontend/public/assets/`.

| Path | Usage |
|---|---|
| `main/octopus.png` | Hero section mascot |
| `main/logo.png` | Nav logo, decorative |
| `main/corrals_it.png` | Philosophy section visual |
| `main/2corrals.png` | Small Wins section side image |
| `main/coralls.png` | Footer bottom decoration |
| `dashboard/octochill.png` | Dashboard illustrations |
| `dashboard/lighthouse.png` | Mentor tab |
| `dashboard/compas.png` | Roadmap / compass |
| `dashboard/tentacle_grab.png` | TentacleGrab section |
| `assets/осьминог-Photoroom.png` | Kavi avatar in chat bubbles |
| `assets/маяк.png` | Mentor tab placeholder |
| `assets/3d_prof_anf.png` | Default user avatar |
