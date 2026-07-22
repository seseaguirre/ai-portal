# ØAE Portal — interactive prototype

A high-fidelity, fully clickable prototype of the **ØAE Portal** — the internal
AI Ecosystem portal for Ørsted. The ØAE (Ørsted AI Ecosystem) team sits within
the AI, Data & Architecture Tech Platform and provides AI capabilities, tooling,
and governance to the whole company.

This is a **frontend-only prototype with mocked data** — no real backend, auth,
or MCP connections. It is built to *feel* real for stakeholder demos, and to be
**re-skinned to Ørsted's real design system by editing one folder**.

## Tech stack

- Vite + React 18 + TypeScript
- MUI (Material UI) v6 — Material Design 3 aesthetics as the starting skin
- React Router v6, Zustand for global state (persona, requests, notifications)
- Typed mock data under `src/data/`

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. You'll land on the login screen — click
**Sign in with Microsoft** (mock) and pick a persona.

Other scripts:

```bash
npm run build   # type-check + production build
npm run lint    # eslint, zero warnings allowed
npm run format  # prettier
```

## Personas (for demo drivers)

Sign in picks a persona; you can switch anytime from the **avatar menu →
"Demo: switch persona"**. Nav and content update instantly.

| Persona | Who | Sees |
| --- | --- | --- |
| **Employee** | Non-technical colleague | Search, Marketplace, Self-service (simplified), Docs, Help |
| **Engineer** | Technical colleague | The above + technical detail (MCP specs, config snippets) |
| **ØAE Member** | Platform team | Everything + **AI Inventory** + Self-service **Approvals** |

The **AI Inventory** is hidden from the nav for non-ØAE personas. Navigating
directly to `/inventory` as a non-ØAE persona shows a friendly access screen.

## 5-minute demo script

1. **Sign in** as **Employee**. On the home page, click a suggested question
   (e.g. *"What is an MCP server?"*). Watch the answer stream in with clickable
   **source citations**; click one to open the doc. Ask a follow-up.
2. Go to **Marketplace**. Filter by **Type → MCP server** and **Maturity →
   Certified**. Open **SharePoint Knowledge MCP** — read what it can do and the
   permissions it requests. Click **Add to my workspace** (toast).
3. Go to **Self-service → New request**. Choose **MCP server**, fill in the
   steps. On **Configure**, set **Data classification → Confidential** and watch
   the **Governance** step surface a *"Security review required"* notice. Submit
   and follow the link to **My requests**.
4. Open the **avatar menu → switch to ØAE Member**. The **AI Inventory** appears
   in the nav. Open it: KPIs across the top, then the data table. Click the
   preset chip **"Deprecated still active"** — a real governance talking point.
   Click a row to see lineage, compliance, and the cost trend. Try **Export
   CSV** and the **Dense** toggle.
5. Back in **Self-service**, open the **Approvals** tab (ØAE only) and approve or
   reject a pending request — then switch back to Employee and see the status
   update in **My requests**.
6. **Prove portability:** add `?theme=alt` to the URL (e.g.
   `http://localhost:5173/?theme=alt`). The entire app re-skins to a different
   palette, type, and shape with no visual breakage. Remove it with
   `?theme=default`.

## How to apply the Ørsted design system

Design-system portability is a hard requirement, and the whole architecture is
built around it. To re-skin the app:

1. **Edit `src/theme/tokens.ts`.** This is the single source of truth for every
   design decision: colour, typography, spacing, radii, elevation, and motion.
   Replace the raw values with Ørsted's real brand values. Keep the **semantic
   token names** the same (`color.status.certified`, `color.surface.raised`,
   `color.action.primary`, …) — components reference those names, so they keep
   working.
2. **That's usually all.** Components never contain hex codes, font names, or
   px values — they read tokens through `sx={(t) => t.tokens...}` or standard
   MUI theme keys. There is nothing else to hunt down.
3. **If you switch component library** (away from MUI), rewrite the single
   adapter `src/theme/index.ts`, which maps tokens onto the library's theme.
   Nothing else imports library theme internals.
4. **Prove it as you go** with `?theme=alt`, which loads the alternate token set
   in `src/theme/tokens.alt.ts`. If the app re-skins cleanly there, your real
   theme will too.

Enforcement: no hex, font-family, or hardcoded px may exist outside
`src/theme/`. Verify with:

```bash
grep -rEn "#[0-9a-fA-F]{3,8}|[0-9]+px|fontFamily" src --include="*.ts" --include="*.tsx" | grep -v "src/theme/"
```

## Project structure

```
src/
  App.tsx / main.tsx      router + theme provider + shell
  theme/
    tokens.ts             THE source of truth — all design decisions
    tokens.alt.ts         proof-of-portability alternate theme
    index.ts              tokens → MUI theme adapter (only MUI-aware theme file)
  types.ts                shared domain types
  store/                  persona, requests, notifications (Zustand)
  data/                   marketplace, inventory, search-answers, docs, …
  lib/                    small pure helpers (formatting, filtering, matching)
  components/
    ui/                   thin, logic-bearing wrappers (StatusBadge, TypeIcon, …)
    shell/                nav rail, top bar, layout, auth gate
    search/ marketplace/ selfservice/ inventory/   feature components
  pages/                  Login, Home, Marketplace, SelfService, Inventory, Docs, …
```

Conventions for future work live in
`.claude/skills/oae-portal-conventions/SKILL.md` (auto-discovered by Claude
Code).

## Out of scope

Real auth/SSO, real backend or API calls, real MCP connections, persistence
beyond in-memory state, i18n, full mobile optimization. State resets on refresh
by design.

---

Run by the AI Ecosystem team — AI, Data & Architecture · Internal use only ·
Ørsted A/S
