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

