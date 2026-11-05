# Yojana Saathi — React portal (prototype)

**Har Haq, Har Ghar Tak** — a government-portal-style website for *Yojana Saathi*, an
independent social-impact initiative running a six-month pilot in **Bharauli village,
Shahpur block, Bhojpur district, Bihar**.

> This project is **not** a government website. It does not use any official logo,
> emblem or seal, and every page carries a disclaimer that eligibility and approval are
> decided only by the concerned government authority.

The entire interface is a **React 19 single-page application** using **React Router**,
**Tailwind CSS v4**, **lucide-react** icons and **Framer Motion**. The same component tree
runs in two ways:

| Mode | Command | Served at |
| --- | --- | --- |
| **Vite SPA (standalone React)** | `npx next dev` (API) + `npx vite` (UI) | http://localhost:5173 |
| Static SPA build | `npx vite build` | `dist/` (host with an `/api` proxy) |
| Hosted full-stack shell | `npm run build && npm run start` | http://localhost:3000 |

Both modes use the identical `src/App.tsx` route table; nothing is duplicated.

## Routes (React Router)

| Path | Page |
| --- | --- |
| `/` | Hero, pilot targets, mission, 5-step process, 8 scheme cards, why-us, pilot + map + 6-month timeline, impact preview, funding, stories |
| `/about` | Story, vision/mission, problem, approach, community model, transparency, Bharauli → Shahpur → Bhojpur roadmap |
| `/schemes` | Searchable, filterable scheme directory |
| `/schemes/:slug` | Scheme overview, potential eligibility, benefits, documents, process, official portal, assistance form |
| `/eligibility` | 10-question form → rule-based scheme matches with reasons + missing documents |
| `/become-a-saathi` | Role, responsibilities, training, requirements, stipend estimate, application form |
| `/impact` | Targets vs estimates vs verified results, monthly plan chart, coverage, financial model, empowerment metrics, stories |
| `/contact` | Category-aware form (`?category=support\|partnership\|feedback\|grievance\|volunteer\|media`) and grievance process |
| `/privacy`, `/accessibility` | Consent/data policy and accessibility statement |
| `*` | In-app not-found page |

## Front-end files

```
index.html                  Vite HTML entry (fonts, meta, #root)
vite.config.ts              Vite + React plugin, "@" alias, /api proxy → :3000
src/main.tsx                createRoot(<App />) — pure React entry
src/App.tsx                 React Router routes, providers, scroll + title effects
src/components/             Header, Footer, Logo, cards, charts, page sections
src/components/ui/          AppLink (router-aware <Link>), Section, Form kit, Charts, Reveal
src/components/forms/       EligibilityChecker, AssistanceRequestForm, SaathiForm, ContactForm
src/components/pages/       About/Privacy/Accessibility, Schemes/Eligibility, Saathi/Impact/Contact
src/data/                   schemes.ts (rules + bilingual copy), pilot.ts (targets, timeline, options)
src/lib/                    i18n (EN/HI), validation, eligibility matcher, API helpers
```

## Backend (unchanged)

Form submissions are plain `fetch` POSTs to route handlers, so they work from the SPA or
from any Express/Fastify server with the same endpoints:

| Endpoint | Stores |
| --- | --- |
| `POST /api/eligibility` | household answers + matched schemes → `eligibility_requests` |
| `POST /api/assistance` | scheme assistance request → `assistance_requests` |
| `POST /api/saathi` | Saathi recruitment application → `saathi_applications` |
| `POST /api/contact` | support/partnership/grievance message → `contact_messages` |
| `GET /api/stats` | live prototype counters for the impact dashboard |
| `GET /api/health` | health probe |

Validation, consent enforcement, honeypot and a minimum-fill-time check run server-side;
every successful write returns a reference number shown to the user.

## Run locally

```bash
npm install
cp .env.example .env        # DATABASE_URL=postgresql://user:pass@127.0.0.1:5432/app_db
npx drizzle-kit push        # creates the submission tables
```

**React SPA with hot reload**

```bash
npx next dev                # terminal 1 — API on :3000
npx vite                    # terminal 2 — React app on :5173 (proxied)
```

**Single process (hosted shell)**

```bash
npm run build
npm run start               # http://localhost:3000
```

## Features

- English / हिंदी across the interface and all scheme data, persisted in `localStorage`.
- Accessibility toolbar (three text-size steps), skip link, visible focus, labelled fields,
  reduced-motion support.
- Browser validation plus server validation, translated error messages, consent checkbox on
  every form, and reference numbers for follow-up.
- Interactive six-month pilot timeline and hand-built SVG charts (bars, grouped columns, rings).
- Honest reporting: targets, estimates and verified results are labelled separately, and the
  verified column is intentionally empty before fieldwork starts.

## Data & demo disclaimer

Figures shown (750 households / 600 applications / 450 benefits / 2 Saathis, the ₹70,000
budget, monthly plan, quotes) come from the project design document and are **targets or sample
data**, labelled as such. Contact details are placeholders. Scheme rules, amounts and portals were
checked against official sources (October 2026 — e.g. Bihar social security pension ₹1,100/month
from June 2025, PMAY-G ₹1.2 lakh plain-area unit, PMSBY ₹20 auto-debit via Jan Suraksha, ePDS
Bihar for ration cards) and should be re-verified before public launch.
