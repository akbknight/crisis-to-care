# Project Plan — Crisis to Care

## Objective

Build a resource routing platform for first-generation college students in mental health crisis. Use AI-powered triage (Gemini API) to classify the student's situation and route them to the appropriate resource tier in real time — cutting the gap between "I need help" and "here is help."

## Scope

### In Scope
- AI-powered Navigator: structured intake → tier classification → resource routing
- Community space: peer experience posts with category tags
- Crisis session: guided step-by-step support flow
- Static GitHub Pages deployment (no backend, no storage)
- Accessible design at all screen sizes

### Out of Scope
- Server-side session storage or mental health record keeping
- SMS or push notification follow-up
- Clinical validation of routing accuracy
- Multi-institution configuration

## Architecture Decision

Static SPA with no backend is the correct architecture for a tool handling mental health disclosures. Storing student intake conversations introduces FERPA and HIPAA-adjacent obligations that are out of scope. The Gemini API is called directly from the browser; session data is discarded on close.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Language | TypeScript |
| AI | Google Gemini 1.5 Flash |
| Routing | React Router v6 (basename for GitHub Pages) |
| Deployment | GitHub Pages |

## Execution Phases

### Phase 1 — Core Application (Complete)
- [x] Intake form + Gemini routing integration
- [x] Four-tier resource matching
- [x] Transparent routing rationale display
- [x] Community peer experience board
- [x] Crisis session guided flow

### Phase 2 — Documentation Upgrade (Complete)
- [x] docs/methodology.md — routing architecture, AI classification, transparency principle
- [x] docs/architecture.md — component structure, data flow, deployment
- [x] docs/decision_log.md — 5 key decisions with rationale
- [x] PROJECT_PLAN.md, FINAL_REVIEW.md

## Success Criteria

- [x] Routing logic transparent to students (rationale shown, not hidden)
- [x] No backend — no storage of mental health disclosures
- [x] Accessible design (keyboard navigable, readable at all screen sizes)
- [x] Live GitHub Pages deployment
- [x] No AI-generated residue in any file
