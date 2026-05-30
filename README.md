# Auth Demo (React, Tailwind) — Interview-ready scaffold

Quick scaffold demonstrating Signup, Login, Reset password, and minimal session handling using React + Tailwind. Backend is mocked and easy to swap for Supabase or an API later.

Setup

```bash
npm install
npm run dev
```

Notes
- Plain JavaScript (no TypeScript)
- TailwindCSS for styling
- The app uses a simple API client at `src/services/api.js`. Set the backend base URL with the Vite env variable `VITE_API_BASE` (e.g. `https://my-backend.onrender.com`).

Backend / CORS checklist
- Ensure the backend (Render) allows CORS for your frontend origin (Vercel URL) and local dev (`http://localhost:5173`).
- The frontend calls `/signup`, `/login`, `/forgot-password`, `/reset-password` on the backend. Tokens from `/login` are stored in `localStorage` under `auth.token`.

Swap notes
- To test without a backend, the previous mock service is available at `src/services/mockAuth.js`.

Interview notes & talking points
- Goal: Provide a clean, accessible React auth UI with a clear separation between presentation and API logic. Backend (Supabase) is handled server-side; frontend consumes a small REST contract.
- What I built: Signup, Login, Reset password, Dashboard, ProtectedRoute, AuthContext for session storage, API client (`src/services/api.js`) with `VITE_API_BASE` config, and a Toast system for UX.
- Security considerations: Tokens are stored in `localStorage` for simplicity — for higher security consider httpOnly cookies and server-side session management. Always use HTTPS and validate tokens on the backend. Limit token lifetime and rotate refresh tokens server-side.
- Accessibility: Skip link, main landmark, ARIA roles for alerts/status, focus outlines, keyboard-accessible controls, and visible focus states for interactive elements.
- Test plan & demo: Run locally with `npm run dev`, verify flows: sign up -> email verification (backend), login -> access dashboard, forgot password flow. Provide Postman/Paw collection to test backend endpoints directly.
- Deployment notes: Set `VITE_API_BASE` in Vercel to your Render backend URL; ensure backend CORS allows the Vercel origin and local dev origin.

Vercel SPA routing fix
- If your app shows a Vercel 404 on refresh or visiting deep links (e.g. `/login`), add a `vercel.json` with a rewrite to `index.html`. This repository includes `vercel.json` which rewrites all non-static routes to `/index.html` so client-side routing works after refresh.
- After pushing `vercel.json`, redeploy the Vercel project. If you still see the Vercel 404, try clearing the deployment cache or trigger a manual redeploy.

Render backend URL
- Backend Render URL example provided by the backend engineer: `https://authentication-page-oxqc.onrender.com`. Set `VITE_API_BASE` to this URL in your local `.env` and in Vercel environment variables.
Optional follow-ups I can add before your interview:
- Swap token storage to secure cookies and add refresh-token handling in `AuthContext`.
- Add E2E smoke tests (Cypress/Playwright) to show passing scenarios.
- Add unit tests for critical logic (AuthContext and API client).


