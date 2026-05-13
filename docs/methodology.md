# Methodology — Crisis to Care

## Problem Statement

First-generation college students face a disproportionate mental health burden: they are more likely to experience acute psychological distress and significantly less likely to seek help. Two factors drive the help-seeking gap: stigma (amplified in communities where mental health treatment is not normalized) and access friction (not knowing which resource applies to which situation — campus counseling, crisis hotline, peer support, emergency services).

Crisis to Care addresses the access friction problem. It does not solve stigma directly, but it reduces the decision cost of reaching out by replacing an ambiguous search ("what do I do?") with a brief, structured intake that produces a specific, actionable routing decision.

---

## Routing Architecture

### Intake Flow

The Navigator conducts a structured two-stage intake:

1. **Situation classification**: A short open-ended prompt surfaces the student's situation in their own words. The system classifies the response along two axes: immediacy (acute/chronic) and domain (academic, relational, psychological, safety).

2. **Resource matching**: Based on classification, the system routes to one of four resource tiers:
   - **Tier 1 — Emergency services**: Immediate physical safety threat
   - **Tier 2 — Crisis hotline**: Acute psychological crisis without immediate physical danger (988 Lifeline, Crisis Text Line)
   - **Tier 3 — Campus counseling**: Non-acute clinical need, scheduling available
   - **Tier 4 — Peer support**: Mild distress, community connection, stigma reduction

### AI Classification (Gemini API)

Routing uses the Gemini 1.5 Flash model via the Google Generative AI API. The intake prompt instructs the model to:
- Identify urgency markers in the student's input
- Return a structured JSON object with `tier`, `domain`, and `reasoning` fields
- Preserve the student's phrasing in the reasoning rather than rephrasing clinically

The structured output contract means the application can display the model's reasoning transparently — the student sees why they were routed to a particular resource, not just where.

### Transparency Principle

The routing logic is visible to the student at any point in the session. This is a deliberate product decision: mental health tools lose trust when they produce opaque recommendations. Showing the classification rationale ("We're routing you to campus counseling because you described ongoing academic stress rather than an immediate crisis") normalizes help-seeking by framing it as a decision the student made, not one made for them.

---

## Community Component

The Community section is a static peer experience board. Unlike the Navigator, it does not use AI. The design decision is intentional: AI-moderated community spaces introduce latency and moderation ambiguity in a context where immediacy and authenticity matter. Peer posts are displayed as-is with category tags.

---

## Technical Decisions

### Gemini 1.5 Flash over GPT-4
Flash provides sufficient classification accuracy for a two-axis routing decision at significantly lower latency and cost. The routing task does not require extended reasoning — it requires fast, consistent JSON-structured output.

### Static Deployment (GitHub Pages)
No backend server means no server-side storage of student mental health disclosures. This eliminates a significant privacy and compliance risk. All session state is in-memory and discarded on page close.

### React Router with `basename`
GitHub Pages serves from a subdirectory (`/crisis-to-care/`), requiring `basename` configuration in React Router to resolve nested routes correctly without a custom server.

---

## Limitations

1. The Gemini API classification is not clinically validated — it approximates appropriate routing but should not be the sole determinant for safety-critical decisions.
2. Resource inventory (hotline numbers, campus counseling URLs) requires manual maintenance as contact information changes.
3. The system does not retain session history — each interaction starts fresh.
