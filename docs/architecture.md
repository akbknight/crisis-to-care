# Architecture — Crisis to Care

## System Overview

Crisis to Care is a static single-page application deployed to GitHub Pages. It has no backend server, no database, and no persistent storage. All session state is in-memory. The only external service call is the Gemini API for crisis routing classification.

```
Browser (React SPA)
    │
    ├── Navigator Component
    │   ├── IntakeForm → GeminiClient → RoutingResult
    │   └── ResourceCard (renders matched resource)
    │
    ├── Community Component
    │   └── PeerPosts (static content, no API)
    │
    └── Crisis Session Component
        └── GuidedSteps (step-by-step support flow)
```

---

## Component Structure

```
src/
├── components/
│   ├── Navigator/
│   │   ├── IntakeForm.tsx          ← Structured intake prompt
│   │   ├── RoutingResult.tsx       ← Classification display + resource card
│   │   └── ResourceCard.tsx        ← Tier-appropriate resource details
│   ├── Community/
│   │   ├── PostFeed.tsx            ← Peer experience posts
│   │   └── PostCard.tsx            ← Individual post with category tag
│   └── CrisisSession/
│       └── GuidedSteps.tsx         ← Step-by-step support flow
├── lib/
│   └── gemini.ts                   ← Gemini API client, routing prompt
├── types/
│   └── routing.ts                  ← RoutingTier, Domain, ClassificationResult types
├── App.tsx                         ← Router setup with basename
└── main.tsx                        ← Vite entry point
```

---

## Data Flow

```
Student types situation
        │
        ▼
IntakeForm.onSubmit()
        │
        ▼
gemini.ts: classifyIntake(text)
  → Gemini 1.5 Flash
  → Returns: { tier: 1-4, domain: string, reasoning: string }
        │
        ▼
RoutingResult renders:
  - Tier label and urgency indicator
  - Matched resource (name, phone, URL)
  - Model reasoning (transparent display)
        │
        ▼
Student sees: why → where → how to reach
```

---

## Routing Tiers

| Tier | Condition | Resource |
|------|-----------|----------|
| 1 | Immediate physical safety threat | 911 / Emergency services |
| 2 | Acute psychological crisis | 988 Lifeline / Crisis Text Line |
| 3 | Non-acute clinical need | Campus counseling center |
| 4 | Mild distress / stigma | Peer support / community |

---

## Deployment

- **Host**: GitHub Pages (`akbknight.github.io/crisis-to-care`)
- **Build**: Vite production build (`npm run build`) outputs to `dist/`
- **Routing**: React Router v6 with `basename="/crisis-to-care"` for subdirectory hosting
- **Environment**: `VITE_GEMINI_API_KEY` required at build time (injected as env var)
- **No server**: Pure static file delivery; Gemini API called directly from browser

---

## Security Notes

- Gemini API key is a client-side environment variable — visible in browser network tab. This is acceptable for a course project where usage is low-volume; production deployment would require a proxy server to gate API calls.
- No user data is stored or transmitted to any server other than Gemini (the intake text only).
- All mental health resource links point to public national services; no PII is required to access them.
