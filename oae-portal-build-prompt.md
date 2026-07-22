# ØAE Portal — Interactive Prototype Build Prompt

Paste everything below into Claude Code (or your coding agent) at the root of the new repo.

---

## Context & Goal

Build a high-fidelity, fully clickable **interactive prototype** of the **ØAE Portal** — the internal AI Ecosystem portal for Ørsted. The ØAE (Ørsted AI Ecosystem) team sits within the AI, Data & Architecture Tech Platform and provides AI capabilities, tooling, and governance to the whole company.

This is a **frontend-only prototype with mocked data** — no real backend, no real auth. It must *feel* real enough for stakeholder demos across the organization. Every screen must be reachable through navigation; no dead ends.

## Audience (critical)

The portal serves the **entire Ørsted organization — technical AND non-technical employees**, not just the ØAE team:

- **Non-technical employees** (majority): want to find approved AI tools, ask questions, request access. Copy must be plain-language — no jargon like "provision an MCP endpoint" without explanation. Every technical term gets a tooltip or one-line plain explanation.
- **Technical employees / engineers**: want MCP server details, skill specs, provisioning workflows, documentation.
- **ØAE members** (platform team): everything above, **plus the AI Inventory module** — this module is role-gated and hidden for everyone else.

Copy tone: helpful, plain, action-oriented. Buttons say what they do ("Request MCP server", not "Submit"). Sentence case. Errors explain what happened and how to fix it.

## Tech Stack

- **Vite + React 18 + TypeScript**
- **MUI (Material UI) v6+** — we are committing to Material Design 3 aesthetics
- **React Router v6** for navigation
- **Zustand** (or React Context if simpler) for global state: current user/role, provisioning requests, notifications
- Mocked data as typed TS modules under `src/data/`
- No CSS frameworks beyond MUI's styling system (`sx` / styled). No Tailwind.
- ESLint + Prettier configured. Repo must run with `npm install && npm run dev`.

## Design Direction

Material Design 3 is the **starting skin, not the commitment**. Ørsted has its own design system, and this prototype will likely need to be re-skinned to it later. **Design-system portability is a hard requirement** — see the section below.

- **Palette (placeholder Ørsted-flavoured)**: deep ocean navy as primary (`#0A2540`-family), white/very light gray surfaces, a confident cool blue accent (`#3663F5`-family), success green reserved for "Certified/Approved" states, amber for pending. Light mode first; dark mode optional.
- **Typography**: clean sans, clear type scale, generous whitespace. Do not hardcode font families in components — they come from tokens only.
- **Signature element**: a subtle animated "energy flow" motif — a thin animated gradient line under the AI Search bar, evoking wind/energy. Motion sparingly; respect `prefers-reduced-motion`.
- Rounded shapes, tonal surfaces, elevation used sparingly. No default-MUI-purple anywhere.
- **Quality floor**: responsive down to tablet (desktop-first — demo target is a laptop + projector), visible keyboard focus states, semantic HTML, alt text.

## Design-System Portability (hard requirement)

Someone must be able to re-skin this entire prototype to Ørsted's real design system by editing **one folder**. Build for that from day one.

**Rules:**

1. **All design decisions live in `src/theme/tokens.ts`** — a plain, framework-agnostic object: color, typography, spacing scale, radii, elevation, motion durations. No hex codes, font names, px values, or shadows anywhere else in the codebase.
2. **`src/theme/index.ts` adapts tokens → MUI theme.** MUI is the *consumer* of tokens, never the source. Swapping to another component library means rewriting this one adapter file, not the app.
3. **Components never import MUI theme internals directly.** Use `sx` referencing theme keys, or semantic token names. No `#0A2540` in a component. Ever.
4. **Use semantic token names, not literal ones**: `color.status.certified`, `color.surface.raised`, `color.action.primary` — not `green500`, `navy`, `blue`. Semantic names survive a design system swap; literal names don't.
5. **Wrap every MUI component you use more than twice** in a thin local component under `src/components/ui/` (e.g. `<AppButton>`, `<AppCard>`, `<AppTable>`, `<StatusBadge>`). The app imports these, not MUI. This is the seam that makes a design-system migration a contained job.
6. **Ship a second theme to prove it works**: include `src/theme/tokens.alt.ts` — a deliberately different palette/type set — and a hidden dev toggle (e.g. `?theme=alt`) that swaps it. If the whole app re-skins cleanly with no visual breakage, portability is proven. Document this in the README as "how to apply the Ørsted design system."
7. **No inline styles, no CSS files with hardcoded values.** Everything flows through tokens.

## App Shell

- Left navigation rail (MD3 style) with icons + labels: **Home/Search, Marketplace, Self-Service, AI Inventory (ØAE only), Docs, Help**
- Top app bar: portal wordmark ("ØAE Portal"), global search shortcut, notifications bell (with mock notifications: e.g., "Your MCP server request was approved"), avatar menu with **role switcher** (see Roles)
- Footer or About drawer: "Run by the AI Ecosystem team — AI, Data & Architecture"

## Roles & Access (prototype mechanic)

Mock login sets a persona. Persona is switchable anytime from the avatar menu (this is a demo superpower — label it "Demo: switch persona").

1. **Employee** (non-technical, any department) — sees Search, Marketplace, Self-Service (simplified), Docs
2. **Engineer** (technical, any department) — same + technical detail views (MCP specs, API snippets)
3. **ØAE Member** (platform team) — everything + **AI Inventory** + admin affordances (approve requests, edit catalog entries — mocked)

When a non-ØAE persona somehow navigates to `/inventory`, show a friendly access screen: what the page is, why it's restricted, and a "Request ØAE access" action (mock).

## Modules

### 1. Login (`/login`)
- Ørsted-branded card on a full-bleed hero background (abstract wind/ocean gradient — CSS only, no stock photos)
- Primary action: **"Sign in with Microsoft"** (mock SSO — click leads to persona picker)
- Persona picker: three cards (Employee / Engineer / ØAE Member) with one-line descriptions
- Small print: "Internal use only · Ørsted A/S"

### 2. AI Search — the hero (`/` home)
Google-AI-mode-style experience. The homepage IS the search.

- Large centered search bar with the animated signature underline; placeholder rotates through example questions ("How do I get access to an approved AI model?", "What is an MCP server?", "Which skills exist for finance?")
- Suggested prompt chips beneath
- On submit: results page with
  - **AI answer panel** at top: streams in word-by-word (simulated typing effect), written in plain language, with **source citation chips** (e.g., "ØAE Docs · Getting started", "Governance · Model approval") that link to mock doc pages
  - Follow-up input at the bottom of the answer panel ("Ask a follow-up")
  - Below: classic result cards (title, snippet, source badge, type icon: Doc / Skill / MCP / Video)
- Pre-can 5–6 realistic Q&A pairs in mock data (access requests, MCP explainer, approved models, responsible-AI guidelines, how to publish a skill, cost/chargeback). Any other query returns a graceful generic answer + top docs.

### 3. Self-Service Provisioning (`/self-service`)
Governed request flows using an **MD3 stepper**.

- Entry screen: "What do you need?" — cards: **MCP Server · Skill · Agent Workspace · AI Model Access**
- Stepper (4 steps): **Choose & describe** (name, purpose, owning team/squad) → **Configure** (environment: Sandbox/Dev/Prod; data classification: Public/Internal/Confidential; for MCP: transport, target system) → **Governance** (auto-shown checklist based on data classification — e.g., Confidential triggers "Security review required" notice; responsible-AI acknowledgment checkbox) → **Review & submit**
- On submit: success screen with request ID + link to **My Requests** (`/self-service/requests`): status table with states *Submitted → In review → Approved → Provisioned* (seed 3–4 mock requests in various states)
- Non-technical persona sees simplified copy and fewer config fields (sensible defaults applied silently)
- ØAE persona additionally sees an **Approvals queue** tab (approve/reject with comment — mock)

### 4. Marketplace (`/marketplace`)
Discoverability for the whole org.

- Filter/facet sidebar: **Type** (MCP Server / Skill / Tool / Agent), **Owner squad** (MiniMax, Gemma, Kimi, Vector, Community), **Maturity** (Sandbox / Certified / Deprecated), **Business area**
- Search-within-marketplace field; sort by popularity/newest
- Card grid: icon, name, one-line description, maturity badge (Certified = green, Sandbox = amber, Deprecated = gray), install/usage count, star rating
- **Detail drawer/page** per item: README-style overview, "What it can do" in plain language, permissions requested (list with warning styling for broad scopes), owner + support channel, changelog, and primary action **"Add to my workspace"** (mock success toast) — Engineer/ØAE personas also see a technical tab (endpoint, transport, config snippet, version)
- Seed **12–16 realistic mock items**, e.g.: "SAP Finance MCP", "SharePoint Knowledge MCP", "Wind Farm Telemetry MCP (Sandbox)", "Meeting Minutes Skill", "Contract Summarizer Skill", "Translation Skill", "HSE Incident Triage Agent", "Bid Support Agent (Deprecated)" — spread across squads and maturity levels

### 5. AI Inventory (`/inventory`) — ØAE members only
The governance control tower.

- KPI header row: total AI assets, by status, monthly cost (mock), active agents, pending reviews
- **Data table** (sortable, filterable, dense-mode toggle): Name · Type · Owner squad · Business owner · Status (Active/Pilot/Retired) · **Risk tier (EU AI Act: Minimal / Limited / High)** · Data classification · Monthly cost · Last activity
- Row click → detail panel: description, lineage ("uses: SharePoint Knowledge MCP + Translation Skill"), compliance checklist status, cost trend sparkline (mock)
- Filter presets as chips: "High risk", "Pending review", "Deprecated still active" (this one should surface 1–2 items — a nice governance talking point)
- Export button (mock CSV download is fine)
- Seed ~20 inventory rows consistent with the Marketplace items (same names where applicable — the data must feel like one coherent ecosystem)

### Docs (`/docs`) — supporting, lightweight
4–5 static mock doc pages that search citations link to: Getting Started, What is an MCP Server (plain-language), Responsible AI Guidelines, Publishing to the Marketplace, Model Approval Process. Simple article layout with a table of contents.

## Mock Data Rules

- One coherent world: names, squads, owners, and stats must be consistent across Search, Marketplace, and Inventory
- Typed interfaces in `src/types.ts`; data in `src/data/*.ts`
- No lorem ipsum anywhere — every string is realistic, plain-language, Ørsted-flavored (wind, offshore, finance, HSE, bid management, trading)
- Squad names: **MiniMax, Gemma, Kimi, Vector** (real ØAE delivery squads)

## Project Structure

```
src/
  main.tsx / App.tsx  (router + theme provider + shell)
  theme/
    tokens.ts         (THE source of truth — all design decisions)
    tokens.alt.ts     (proof-of-portability alternate theme)
    index.ts          (tokens → MUI theme adapter; the only MUI-aware theme file)
  types.ts
  store/              (persona, requests, notifications)
  data/               (search-answers, marketplace, inventory, docs, requests)
  components/
    ui/               (thin wrappers: AppButton, AppCard, AppTable, StatusBadge…)
    …                 (shell, search, cards, stepper, tables, drawers)
  pages/              (Login, Home/Search, Marketplace, SelfService, Inventory, Docs, AccessDenied)
```

## Skills Setup (do this first, before writing any code)

Run these in Claude Code at the repo root.

**1. Install the official Anthropic skills marketplace:**

```
/plugin marketplace add anthropics/skills
/plugin install example-skills@anthropic-agent-skills
```

This gives you **frontend-design** (deliberate visual choices instead of templated defaults — directly relevant to the token architecture above) and **webapp-testing** (browser-driven verification of the running app; use it to prove persona-gating actually hides the AI Inventory).

**2. Bundled skills — already available, just invoke them:**

- `/code-review` — run after each module commit
- `/debug` — for state bugs in the stepper and persona switching
- `/doctor` — if the environment misbehaves

**3. Create a project skill for this repo** at `.claude/skills/oae-portal-conventions/SKILL.md`. Claude Code auto-discovers project skills, so this keeps conventions consistent across sessions (the agent has no memory between them — without this, session 5 invents a new blue and renames a squad).

Its `SKILL.md` must contain:

```
---
name: oae-portal-conventions
description: Conventions for the ØAE Portal prototype — design tokens, copy rules, mock data, and persona/RBAC model. Use whenever writing or editing code in this repo.
---
```

…followed by: the token architecture rules (all 7 above), the semantic token naming convention, **the full Code Quality Rules section below (all 20 — these matter most, since they're what stop the agent over-abstracting in later sessions)**, copy rules (plain language, sentence case, jargon gets a tooltip, buttons name their action), mock data conventions (squad names MiniMax/Gemma/Kimi/Vector, the "one coherent world" rule), and the three-persona RBAC model.

**Generate this file as part of the build.**

## Code Quality Rules (non-negotiable)

The portability requirements above create a real risk of over-abstraction. Guard against it.

**Anti-over-engineering:**

1. **Wrap a component only after its third use.** Used once or twice? Import MUI directly. If a wrapper file has no logic beyond passing props through unchanged, delete it and use MUI directly.
2. **Tokens are exactly one semantic layer over raw values.** `color.status.certified` — good. `color.action.primary.hover.disabled.dark` — never. No token referencing another token more than one hop.
3. **No abstraction before the third repetition.** Do not build generic factories, config-driven renderers, or "flexible" helpers for a prototype. Two similar things stay duplicated; three become shared.
4. **No premature performance work.** No `useMemo`/`useCallback` unless there's a measured problem. No virtualization on a 20-row table.
5. **No barrel files** (`index.ts` re-export hubs) except the one theme adapter. Import from source paths.

**Structure limits:**

6. **Max 200 lines per component file.** Over that, split by responsibility — never by arbitrary line count.
7. **Max 3 levels of JSX nesting inside a single component.** Deeper means extract a subcomponent.
8. **One component per file**, named the same as the file. Subcomponents used only by that parent may live in the same file if under 40 lines.
9. **Flat props.** No prop objects passed just to avoid listing 4 props.

**TypeScript:**

10. **No `any`. No `@ts-ignore`.** If typing is hard, the design is wrong.
11. **All shared types in `src/types.ts`.** Component-local types stay local.
12. **Discriminated unions for state** (e.g. request status), not boolean soup (`isLoading && !isError && hasData`).

**Naming & copy:**

13. Components `PascalCase`, hooks `useCamelCase`, files match their export, mock data files `kebab-case.ts`.
14. Names say what a thing *is or does*, never how it looks. `StatusBadge` not `GreenPill`.
15. **No commented-out code. No TODO comments.** Either build it or leave it out.
16. **Comments explain why, never what.** If a line needs a "what" comment, rename things instead.

**Verification (run before declaring done):**

17. `npm run build` — zero TS errors, zero warnings
18. `npx eslint . --max-warnings=0` — clean
19. Grep check: no hex colors, font-family declarations, or hardcoded px spacing outside `src/theme/`
20. No unused files, exports, or dependencies. If it isn't imported, delete it.

**Self-review pass:** after each module, re-read your own diff and delete anything that isn't earning its place. Prefer boring, obvious code over clever code — this prototype will be read by other people and re-skinned by a designer.

## Definition of Done

1. `npm install && npm run dev` works first try; `npm run build` passes with zero TS errors
2. Every module reachable and clickable; persona switching changes nav + content instantly
3. AI Inventory hidden from non-ØAE personas, with friendly access screen on direct navigation
4. Simulated AI-answer streaming works and cites clickable sources
5. Provisioning flow completes end-to-end and appears in My Requests
6. **Portability proven**: `?theme=alt` re-skins the entire app with zero visual breakage; grep confirms no hex codes, font names, or hardcoded px values outside `src/theme/`
7. `.claude/skills/oae-portal-conventions/SKILL.md` exists and is accurate
8. **Code quality gates pass**: `npx eslint . --max-warnings=0` clean, no `any`, no file over 200 lines, no unused exports, no commented-out code
9. README.md: what this is, how to run, persona guide for demo drivers, a 5-minute demo script, and a **"How to apply the Ørsted design system"** section explaining the token swap

## Out of Scope (do not build)

Real auth/SSO, real backend or API calls, real MCP connections, persistence beyond in-memory state, i18n, full mobile optimization.

---

*Build in this order: skills setup → project skill → tokens + theme adapter → shell → mock data → Search → Marketplace → Self-Service → Inventory → Login/personas → portability check (`?theme=alt`) → polish pass.*

*Commit per module. Run `/code-review` after each commit and fix what it finds before moving on — do not batch fixes to the end.*
