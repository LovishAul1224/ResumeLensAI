# ResumeLens — AI-Powered Resume Analyzer

A full-stack resume analyzer with a landing page, real authentication, a
FastAPI + Gemini backend, and a dashboard with persistent analysis history.

## App flow

```
Landing page (/)  →  Sign in / Sign up (/login)  →  Dashboard (/dashboard)
```

- `/` — public marketing landing page (Framer Motion animations)
- `/login` — sign in or sign up (email/password + Google via Firebase)
- `/dashboard` — authenticated app: upload, results, history, settings

If you're already logged in, `/` and `/login` redirect straight to
`/dashboard`. If you're not logged in, `/dashboard` redirects to `/login`.

## Features

- **Landing page** — animated hero, feature cards, "how it works" steps, CTA
- **PDF + DOCX upload** — drag-and-drop or click to upload
- **AI score engine** — overall 0–100 + section breakdown (Experience, Skills, Education, Projects, Formatting)
- **ATS compatibility check** — pass / warn / fail flags for formatting issues
- **Top 5 specific improvements** — actionable tips with descriptions
- **Missing keywords** — high-impact terms absent from the resume
- **Real authentication** — email/password + Google OAuth via Firebase, with persistent sessions (no reload-to-login bug)
- **Persistent history** — saved to `localStorage` per user, survives page reloads
- **Custom ResumeLens logo** — gradient document/network icon used across all pages

---

## Project Structure

```
resume-analyzer/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Logo.jsx          # Shared gradient logo
│   │   │   ├── Landing.jsx       # Public landing page
│   │   │   ├── Auth.jsx          # Sign in / sign up page
│   │   │   ├── Layout.jsx        # Authenticated app sidebar
│   │   │   ├── Upload.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── History.jsx
│   │   │   └── Settings.jsx
│   │   ├── hooks/
│   │   │   └── usePersistentHistory.js   # localStorage-backed history
│   │   ├── firebase.js
│   │   ├── App.jsx                # React Router routes
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/
    ├── utils/
    │   └── parser.py
    ├── main.py
    ├── requirements.txt
    └── .env.example
```

---

## Setup

### 1. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate     # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# Edit .env and add: GEMINI_API_KEY=your_key_here

uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Get a free Gemini API key at: https://aistudio.google.com/app/apikey

Verify it's running: open `http://localhost:8000/health` —
you should see `"gemini_api_key_set": true`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 — you'll land on the marketing page.

---

## Firebase setup (required for auth)

1. Go to https://console.firebase.google.com → Create project
2. Add a **Web app** → copy the config object
3. Go to **Authentication** → Sign-in method → enable **Email/Password** and **Google**
4. Paste your config into `frontend/src/firebase.js`

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};
```

Sessions persist automatically via Firebase — reloading the page on
`/dashboard` will NOT log you out.

---

## History persistence

Analysis history is stored in `localStorage` under the key
`resumelens_history_<uid>`, scoped per signed-in user. It survives page
reloads and browser restarts. Use the "Clear history" button on the
History page to wipe it.

---

## API

### `POST /upload`

Upload a resume file.

**Request:** `multipart/form-data` with `file` field (PDF or DOCX, max 5 MB)

**Response:**
```json
{
  "analysis": {
    "score": 82,
    "ats_compatibility": "Good",
    "sections": [...],
    "strengths": [...],
    "weaknesses": [...],
    "missing_keywords": [...],
    "improvements": [{"title": "...", "desc": "..."}],
    "ats_issues": [{"status": "pass|warn|fail", "label": "...", "desc": "..."}],
    "recruiter_verdict": "..."
  }
}
```

---

## Deployment

**Backend:** Deploy to Railway, Render, or Fly.io. Set `GEMINI_API_KEY` as an environment variable.

**Frontend:** Build with `npm run build` and deploy the `dist/` folder to Vercel or Netlify.
Set `VITE_API_URL` env var if the backend isn't on the same domain, and update
the proxy in `vite.config.js` for local dev.
