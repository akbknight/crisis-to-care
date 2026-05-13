# Final Review — Crisis to Care

## Summary

Resource routing platform for first-generation college students in mental health crisis. An AI-powered Navigator uses the Gemini API to classify the student's situation across two axes (immediacy × domain) and route them to one of four resource tiers: emergency services, crisis hotline (988 Lifeline / Crisis Text Line), campus counseling, or peer support. A Community section provides peer experience posts for stigma reduction.

---

## What Was Built

### Navigator (Core Feature)
- Structured intake: student describes their situation in their own words
- Gemini 1.5 Flash classifies: `{ tier: 1-4, domain: string, reasoning: string }`
- Result displays: resource tier + specific resource + model reasoning (transparent to student)
- Routing tiers: Emergency (911) → Crisis Hotline (988) → Campus Counseling → Peer Support

### Community Section
- Static peer experience board with category tags
- No AI moderation — authenticity over curation
- Posts displayed as-is for stigma reduction

### Technical Implementation
- React 18 + TypeScript + Vite
- React Router v6 with `basename="/crisis-to-care"` for GitHub Pages subdirectory routing
- No backend, no database — session state in-memory only
- Gemini API called directly from browser (`VITE_GEMINI_API_KEY` env var)

---

## Documentation Added

- `docs/methodology.md` — problem statement, routing architecture, AI classification, transparency principle, Gemini decision, limitations
- `docs/architecture.md` — component structure, data flow diagram, routing tier table, deployment details, security notes
- `docs/decision_log.md` — 5 decisions: Gemini Flash over GPT-4o, no backend, transparent routing, static community, basename routing

---

## Stray Files Removed

The following artifact files were removed from root (lint outputs and metadata accumulated during development):
- `final_lint_output.txt`, `lint_output.txt`, `lint_output_utf8.txt`
- `list_files.txt`, `list_files_utf8.txt`
- `metadata.json`

---

## Known Limitations

1. Gemini API key is client-side — visible in browser network tab. Production deployment requires a proxy server
2. Resource inventory (hotline numbers, campus URLs) requires manual maintenance
3. Routing is not clinically validated; errs toward over-referral to higher tiers
4. No session history — each interaction starts fresh
