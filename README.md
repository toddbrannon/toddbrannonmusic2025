# Todd Brannon Music

The marketing site, lesson-inquiry pipeline, and private student portal for
[toddbrannonmusic.com](https://www.toddbrannonmusic.com) — a React + TypeScript single-page app
served by a small Express API that handles email, lead-magnet delivery, and a Postgres-backed
signup list.

---

## Table of contents

- [Stack](#stack)
- [Quick start](#quick-start)
- [Running the full stack locally](#running-the-full-stack-locally)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Routes](#routes)
- [API reference](#api-reference)
- [Database](#database)
- [Admin dashboard](#admin-dashboard)
- [Lead magnets](#lead-magnets)
- [Accessibility](#accessibility)
- [Build and deploy](#build-and-deploy)
- [Git workflow](#git-workflow)
- [Troubleshooting](#troubleshooting)

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite 5, React Router 7, Tailwind CSS 3 |
| Icons | `lucide-react`, `react-icons` |
| Backend | Node 20+, Express 5 (ESM) |
| Database | PostgreSQL (`pg`) |
| Transactional email | [Resend](https://resend.com) (inquiries) and Nodemailer/SMTP (lead-magnet delivery) |
| Auth | `express-session` with a single admin credential pair, rate-limited login |
| Linting | ESLint 9 + `typescript-eslint` |
| A11y tooling | `axe-core` |

---

## Quick start

Requires **Node 20 or newer**.

```bash
npm install
npm run dev
```

The Vite dev server is configured for **port 5000** (`vite.config.ts`, `strictPort: true`).

> **macOS note:** port 5000 is claimed by the AirPlay Receiver (Control Center) on recent macOS
> versions, and `strictPort` means Vite will exit rather than pick another port. Either disable
> AirPlay Receiver under *System Settings → General → AirDrop & Handoff*, or start on a different
> port:
>
> ```bash
> npx vite --port 5173 --strictPort false
> ```

The frontend alone is enough to review layout, copy, and navigation. Anything that submits a form
needs the API server as well.

### npm scripts

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR on port 5000 |
| `npm run build` | Type-checked production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | ESLint across the repo |

There is no script for the API server — start it directly with `node server.js`.

---

## Running the full stack locally

Three processes, each in its own terminal:

```bash
# 1. Frontend (port 5000) — proxies /api/* to localhost:3001
npm run dev

# 2. API server (port 3001) — email, lead magnets, waitlist, admin
node server.js

# 3. Optional: standalone admin viewer (port 4000)
node admin-server.js
```

`vite.config.ts` proxies `/api` to `http://localhost:3001`, so the frontend calls relative paths
(`/api/inquire`) in both development and production.

**`server.js` will exit immediately** if `RESEND_API_KEY` or `CONTACT_EMAIL` is missing, and it
calls `init()` against Postgres before listening — so `DATABASE_URL` must point at a reachable
database or the process exits with `Failed to initialize database`.

---

## Environment variables

Copy `.env.example` to `.env` and fill it in. Note that `.env.example` is currently incomplete —
the full set of variables read by the backend is below.

### Required by `server.js`

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key; the process exits without it |
| `CONTACT_EMAIL` | Recipient for inquiry notification emails; the process exits without it |
| `DATABASE_URL` | Postgres connection string (SSL is enabled when `NODE_ENV=production`) |

### Lead-magnet delivery (SMTP, via `mailer.js`)

| Variable | Purpose |
|---|---|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | SMTP transport credentials |
| `SMTP_SECURE` | `"true"` for implicit TLS (port 465) |
| `FROM_NAME`, `FROM_EMAIL` | Sender identity on the download email |
| `BASE_URL` | Public origin used to build `{BASE_URL}/download/{token}` links |
| `LEAD_MAGNET_TITLE` | Title shown in the download email copy |
| `PDF_PATH` | Path to the PDF on disk (default `/data/lead-magnet.pdf`) |
| `PDF_FILENAME` | Filename sent in `Content-Disposition` (default `todd-brannon-music-guide.pdf`) |

### Admin

| Variable | Purpose |
|---|---|
| `ADMIN_USERNAME`, `ADMIN_PASSWORD` | Credentials for `/admin/login` |
| `SESSION_SECRET` | Session signing secret — **set this in production**; it falls back to `'supersecret'` |
| `ADMIN_PORT` | Port for the standalone `admin-server.js` (default `4000`) |
| `RENDER_POSTGRES_URL` | Preferred over `DATABASE_URL` by `admin-server.js` only |

### Optional / legacy

`GOOGLE_SHEETS_WEBHOOK_URL`, `GOOGLE_SHEET_ID`, `GOOGLE_SHEET_NAME`,
`GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SERVICE_ACCOUNT_JSON` appear in
`.env.example` and `googleapis` is installed, but no current server code reads them.

---

## Project structure

```
.
├── index.html                  # Vite entry; also carries the CSP meta tag
├── vite.config.ts              # Port 5000, /api proxy → :3001
├── server.js                   # Main Express API (port 3001) + SPA catch-all
├── admin-server.js             # Standalone signup viewer (port 4000)
├── db.js                       # pg Pool + CREATE TABLE IF NOT EXISTS bootstrap
├── mailer.js                   # Nodemailer transport + download-link email template
├── leadMagnets.json            # Lead magnet copy, keyed by URL slug
├── leadMagnets.js              # Slug → title helper for the server
├── login.html / admin.html     # Static admin login + dashboard (vanilla JS)
├── public/
│   ├── art-of-strumming.html   # Standalone static resource page
│   ├── resources/              # Additional static resource pages
│   ├── sitemap.xml
│   └── tbm_brand.png
└── src/
    ├── main.tsx                # React root + BrowserRouter
    ├── App.tsx                 # Route table
    ├── HomePage.tsx            # Hero, About, Featured Work, Services, Get in Touch
    ├── InquiryForm.tsx         # Lesson inquiry (modal, auto-opens after 3s)
    ├── CoachingInquiryForm.tsx # Worship prep / recording / songwriting coaching
    ├── GeneralContactForm.tsx  # General contact
    ├── PrivacyPolicy.tsx
    ├── index.css               # Tailwind layers + custom animations
    ├── assets/                 # Album art, live photos, logos, video thumbnails
    ├── pages/
    │   ├── FreeResources.tsx   # Index of free downloads
    │   ├── LeadMagnetPage.tsx  # Slug-driven opt-in page
    │   └── confidentmusician/  # Private student hub: Index, Lessons, PDFs, Videos, Audio
    └── components/confidentmusician/CMLayout.tsx
```

---

## Routes

Client-side routes are declared in [`src/App.tsx`](src/App.tsx):

| Path | Page |
|---|---|
| `/` | Home — hero, about, featured work, services, contact |
| `/free-resources` | Index of available free downloads |
| `/free/:slug` | Lead magnet opt-in page, driven by `leadMagnets.json` |
| `/privacy-policy` | Privacy policy |
| `/summer-2026` | Retired — redirects to `/` |
| `/confidentmusician` | "The Confident Musician" student hub |
| `/confidentmusician/lessons` | Deeper-dive lesson write-ups |
| `/confidentmusician/pdfs` | Printable charts and reference sheets |
| `/confidentmusician/videos` | Demonstration and technique videos |
| `/confidentmusician/audio` | Backing tracks and ear-training audio |

The student hub is unlisted rather than authenticated — access is by link only.

In production `server.js` serves `dist/` statically and falls back to `dist/index.html` for any
path that is not `/api/*` or `/admin`, so deep links resolve correctly on refresh.

---

## API reference

All endpoints live in [`server.js`](server.js). Request bodies are JSON, capped at 100 kB.

### `POST /api/inquire`

Backs all three forms — lesson, coaching, and general contact — distinguished by `inquiryType`,
which becomes the email subject. Sends a formatted notification to `CONTACT_EMAIL` via Resend.

```jsonc
{
  "inquiryType": "Lesson Inquiry",   // free text, ≤100 chars
  "name": "…",                       // required
  "email": "…",                      // required, format-validated
  "phone": "…",
  "studentType": "myself | my-child | both",
  "experience": "beginner | some-experience | intermediate | advanced",
  "interests": ["guitar-lessons", "worship-prep", "home-recording", "songwriting", "not-sure"],
  "availability": ["after-school", "daytime", "homeschool", "flexible", "open"],
  "message": "…"                     // ≤2000 chars
}
```

Enum fields are whitelisted server-side and silently dropped if invalid; all free text is
length-clamped and HTML-escaped before being placed in the email body.

### `POST /api/submit`

Lead-magnet opt-in. Takes `{ "email": "…" }`, upserts a row in `leads` with a UUID token (reusing
the existing token if the email has already registered), and emails a download link.

### `GET /download/:token`

Looks up the token, stamps `downloaded_at` on first use, and streams `PDF_PATH` as an attachment.
Returns 404 for an unknown token and 503 if the PDF is not present on disk.

### `POST /api/waitlist`

Takes `{ "email": "…", "emailOptIn": true }` and inserts into `summer2026_signups` with
`ON CONFLICT (email) DO NOTHING`.

> The Summer 2026 landing page that called this endpoint has been removed, so nothing in the
> frontend posts here any more. The endpoint, the `summer2026_signups` table, and the admin view of
> it are all still live so previously collected signups remain accessible.

### Admin endpoints

| Endpoint | Notes |
|---|---|
| `POST /admin/login` | Rate-limited to 10 attempts per 15 minutes per IP |
| `POST /admin/logout` | Destroys the session |
| `GET /admin/signups` | Session-protected; Summer 2026 waitlist rows |
| `GET /admin/leads` | Session-protected; lead-magnet rows |
| `GET /admin` | Serves `admin.html` when logged in, otherwise `login.html` |

---

## Database

`db.js` creates both tables on boot via `init()` — no separate migration step.

```sql
leads (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  token TEXT NOT NULL UNIQUE,
  downloaded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)

summer2026_signups (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  email_opt_in BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
)
```

Schema changes are made by editing the `CREATE TABLE` statements in `db.js` — note that
`CREATE TABLE IF NOT EXISTS` will not alter an existing table, so column changes need to be applied
to the live database by hand.

---

## Admin dashboard

Visit `/admin` on the API server. `login.html` posts credentials to `/admin/login`; on success
`admin.html` fetches `/admin/signups` and `/admin/leads` and renders each in its own table — the
waitlist with email, marketing opt-in, and signup date; the leads with email, download status, and
signup date — plus a logout button.

`admin-server.js` is an older, standalone version of the same viewer on port 4000. `server.js`
supersedes it — it is kept for the Render deployment where the admin viewer runs as its own service.

---

## Lead magnets

Each lead magnet is one entry in [`leadMagnets.json`](leadMagnets.json), keyed by its URL slug:

```jsonc
{
  "major-scale-for-guitarists": {
    "title": "The Major Scale for Guitarists",
    "subtitle": "🎁 Free Download",
    "description": "…",
    "bullets": ["…", "…", "…"],
    "formHeading": "Send it to my inbox"
  }
}
```

Adding a slug makes `/free/<slug>` render immediately — `LeadMagnetPage.tsx` imports the JSON
directly and shows a "Page Not Found" state for unknown slugs. The server reads the same file
through `leadMagnets.js` for email subject lines.

One caveat: `PDF_PATH` is a single global path, so every slug currently delivers the same PDF.
Per-slug files require threading the slug through `/api/submit` into `sendDownloadLink`.

---

## Accessibility

The site targets **WCAG 2.1 Level AA**. The full audit — 39 criteria, contrast tables, and the
fixes applied — is in [`WCAG_2.1_AA_AUDIT_REPORT.md`](WCAG_2.1_AA_AUDIT_REPORT.md).

Conventions worth preserving when editing components:

- Every section uses `aria-labelledby` pointing at its heading.
- The home page opens with a "Skip to main content" link; `#main-content` is focusable
  (`tabIndex={-1}`) so it can receive that focus.
- Views that appear without a full page load — the three forms and the privacy policy — move focus
  to their heading on mount (`headingRef`) so screen readers announce the change.
- Interactive elements carry `data-testid` attributes — keep them when refactoring.
- Iframe `title` attributes must be descriptive, not generic ("Worship Guitar – Performance Short").
- Non-text contrast: inactive borders use `border-gray-500` or lighter on dark backgrounds.

`axe-core` is available as a dev dependency for automated contrast and DOM checks.

---

## Build and deploy

```bash
npm run build     # → dist/
npm run preview   # verify the built output
```

In production a single `node server.js` process serves both the API and the built SPA from `dist/`,
so only port 3001 needs to be exposed. The `/admin` path is excluded from the SPA catch-all.

Deployment is on Render — hence `RENDER_POSTGRES_URL`, which `admin-server.js` prefers over
`DATABASE_URL`. Build with `npm run build`, then start with `node server.js`.

### Content Security Policy

The CSP lives in a `<meta http-equiv>` tag in [`index.html`](index.html) and currently allows
`'self'` plus YouTube for frames and scripts, with `connect-src` limited to `'self'` and
`ws://localhost:*` for HMR. Any new third-party embed, font host, or analytics script must be added
there or it will be blocked silently.

### Sitemap

[`public/sitemap.xml`](public/sitemap.xml) lists the public routes: home, `/free-resources`,
each `/free/<slug>` opt-in page, the static `/resources/art-of-strumming.html`, and
`/privacy-policy`. It is maintained by hand — adding a
route or a lead magnet means adding an entry here.

The `/confidentmusician/*` student hub is deliberately excluded: it is unlisted rather than
authenticated, so it should stay out of search indexes.

---

## Git workflow

- `main` — production
- `stage` — integration branch; work lands here first

Branch from `stage`, open a PR into `stage`, then promote `stage` → `main` for release.

---

## Troubleshooting

**`Error: Port 5000 is already in use`** — macOS AirPlay Receiver. Disable it in System Settings or
run `npx vite --port 5173 --strictPort false`.

**`Missing required environment variables: RESEND_API_KEY and/or CONTACT_EMAIL`** — `server.js`
exits on boot without these. Create `.env` from `.env.example`.

**`Failed to initialize database`** — `DATABASE_URL` is unset or unreachable. The API server cannot
start without Postgres, even for routes that do not touch the database.

**Forms return a network error in dev** — the API server is not running. Start `node server.js`;
Vite only proxies `/api`, it does not host it.

**Download link returns 503** — no file at `PDF_PATH`. In local development, point `PDF_PATH` at a
PDF on your machine rather than the production `/data/lead-magnet.pdf`.

**A third-party embed renders blank with no console error** — check the CSP meta tag in
`index.html`.
