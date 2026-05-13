# Decision Log — Crisis to Care

## Decision 1: Gemini 1.5 Flash over GPT-4o for routing

**Decision:** Use Google Gemini 1.5 Flash as the routing classification model.

**Rationale:** The routing task requires fast, consistent JSON-structured output for a two-axis classification (immediacy × domain). GPT-4o is significantly more capable but adds latency and cost for a classification task that does not benefit from extended reasoning. Gemini Flash produces accurate tier + domain classifications in 1–2 seconds at a fraction of the cost.

**Tradeoff:** Less nuanced language understanding for edge cases. Accepted because tier classification is intentionally coarse (4 tiers) and erring toward a higher tier (more urgent resource) is a safer failure mode than under-classification.

---

## Decision 2: No backend, no storage

**Decision:** Deploy as a static SPA with no server-side storage of any student input.

**Rationale:** Storing mental health disclosures introduces FERPA, HIPAA-adjacent, and institutional privacy obligations that are out of scope for this project. A static deployment eliminates this risk entirely — session data lives only in the browser tab and is discarded on close.

**Tradeoff:** No session history, no follow-up, no aggregate analytics. The application cannot learn from past interactions or track whether students found resources helpful.

---

## Decision 3: Transparent routing rationale

**Decision:** Display the model's classification reasoning to the student, not just the routing destination.

**Rationale:** Opaque "you should call this number" recommendations reduce trust and agency, particularly for first-generation students who may be skeptical of automated systems making health-related decisions. Showing the reasoning ("We're suggesting campus counseling because you described ongoing stress rather than an immediate crisis") frames the system as a decision aid, not an authority.

**Tradeoff:** Exposes the model's limitations — if the reasoning contains an error or sounds mechanical, it may undermine confidence. This is preferable to hiding the reasoning and having students not understand why they were routed to a particular resource.

---

## Decision 4: Static Community board, no AI moderation

**Decision:** Implement the Community section as a static peer experience board without AI moderation or dynamic content.

**Rationale:** AI-moderated community spaces introduce latency, unpredictability, and moderation judgment calls in a context where authenticity and immediacy matter more than content quality optimization. A peer experience board that shows real posts in real time is more valuable for stigma reduction than a polished AI-curated feed.

**Tradeoff:** Static content requires manual curation. A production system would need a content management layer and moderation workflow.

---

## Decision 5: React Router basename for GitHub Pages subdirectory

**Decision:** Configure React Router v6 with `basename="/crisis-to-care"` rather than using hash routing.

**Rationale:** Hash routing (`/#/path`) degrades URL readability and breaks deep-link sharing. The `basename` configuration makes clean URLs work on GitHub Pages without requiring server-side rewrites.

**Tradeoff:** The `404.html` redirect hack is required for client-side navigation on page refresh. This is a standard GitHub Pages pattern for SPAs.
