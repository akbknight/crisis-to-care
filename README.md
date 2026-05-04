# Crisis to Care

A resource routing platform connecting first-generation college students in mental health crisis with immediate support options — using AI-powered triage to cut the gap between "I need help" and "here is help." Live at [akbknight.github.io/crisis-to-care](https://akbknight.github.io/crisis-to-care/).

## What this project does

First-generation college students face a disproportionate mental health burden with dramatically lower rates of help-seeking behavior. Crisis to Care addresses the access gap on two fronts: an AI-powered Navigator that routes students to the right resource for their situation in real-time, and a Community space where peer experiences reduce the stigma of reaching out.

The Navigator uses the Gemini API to conduct a brief, structured intake conversation and route to the most relevant resource — campus counseling, crisis hotline, peer support, or emergency services — based on the student's input. The routing logic is transparent and can be reviewed by the student at any point.

## Key features

- AI-powered crisis routing via Gemini API (structured intake → matched resources)
- Community space for first-gen peer experiences and shared resources
- Crisis session interface with step-by-step guided support
- Accessible design — readable at all screen sizes, keyboard navigable
- Static deployment via GitHub Pages with `basename` routing
- Apache 2.0 licensed for downstream use by student organizations

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript |
| AI | Google Gemini API |
| Routing | React Router v6 |
| Styling | CSS Modules / index.css |
| Deployment | GitHub Pages |

## How to run

```bash
# Clone the repository
git clone https://github.com/akbknight/crisis-to-care.git
cd crisis-to-care

# Install dependencies
npm install

# Configure environment variables
# Create a .env.local file:
# VITE_GEMINI_API_KEY=your_gemini_api_key

# Start development server
npm run dev
# Opens at http://localhost:5173

# Build for GitHub Pages
npm run build
```

**Requirements:** Node.js 18+. A Google Gemini API key with access to the Gemini 1.5 Flash model.

## Results and outputs

- Live deployed application with public access
- AI routing tested against common crisis scenarios (academic distress, isolation, acute crisis)
- Resources vetted for accuracy — all hotline numbers and campus counseling links verified

## Skills demonstrated

- **AI application development:** structured prompt engineering for sensitive-use triage, Gemini API integration
- **Product design for high-stakes use cases:** trauma-informed UX, transparent AI routing, non-judgmental copy
- **React architecture:** multi-page SPA with context-driven state, route-level code splitting, accessible markup
- **Deployment:** GitHub Actions-free static export, `basename` configuration for Pages subdirectory routing

## Author

**Akshay Kumar**
[linkedin.com/in/akshaykumardl](https://www.linkedin.com/in/akshaykumardl/)
