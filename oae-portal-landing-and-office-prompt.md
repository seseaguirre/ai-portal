# ØAE Portal — Follow-Up Build Prompt: Landing Page & Meet ØAE

Paste into Claude Code at the root of the existing ØAE Portal repo.

---

## Context

The ØAE Portal prototype is already built and shipped. This is a follow-up increment adding two things:

1. A **marketing landing page** at `/` that sells the AI Ecosystem to first-time, mostly non-technical visitors
2. A **Meet ØAE pixel office** — an animated canvas showing the team, doubling as the portal's signature delight object

**Read `.claude/skills/oae-portal-conventions/SKILL.md` first and follow it exactly.** All existing conventions apply unchanged: design tokens as the single source of truth, semantic token names, no hardcoded hex/font/px outside `src/theme/`, the UI wrapper layer, the 20 code quality rules, plain-language copy, and the three-persona RBAC model. Nothing in this document overrides them.

## Routing change

AI Search currently lives at `/`. Move it.

- `/` → new **Landing** page
- `/search` → existing AI Search results experience, unchanged in behaviour
- The hero search bar on `/` submits to `/search?q=...`
- Update the nav rail: **Home** and **Search** are now separate items
- Any existing internal links or redirects pointing at `/` for search must be updated. Verify none are left.

## Part 1 — Landing Page (`/`)

Most visitors arrive cold and non-technical. The page must explain what ØAE is, prove it's alive, and route people to the right module — while keeping search one click away.

**Do NOT build a carousel or rotating banner.** They get ignored, hurt accessibility, and read as dated intranet. Rotating placeholder text inside the search bar covers the same need. If tempted to add one later, don't.

### Section a — Hero
- Single clear value-proposition headline in plain language (e.g. "Find, request, and build with approved AI at Ørsted")
- Supporting line naming ØAE as the team behind it
- **Large search bar embedded here** with the existing animated energy-flow underline; placeholder rotates through example questions
- Suggested prompt chips beneath, same set as the current search page
- Background: CSS-only abstract wind/ocean gradient from theme tokens
- **One frosted-glass panel — used here and nowhere else in the app.** It's a spice, not a base.

### Section b — Live stats strip
- Count-up-on-scroll numbers, sourced from existing mock data (derive from the marketplace and inventory arrays; do not hardcode separate numbers that could drift): skills published, MCP servers available, employees onboarded, requests fulfilled this month
- Must read as a living system, not a brochure

### Section c — Bento grid, "What's inside"
- Asymmetric MD3 tile layout, deliberately **not** a uniform 3-column grid
- Largest tile: **Marketplace**, with 2–3 real item cards peeking from existing mock data
- Medium: **Self-Service**, **AI Search**
- Small: **Docs**, **AI Inventory** — the Inventory tile shows a lock affordance and "ØAE team only" for non-ØAE personas, and links through for ØAE members
- Every tile links to its module

### Section d — Meet ØAE
The pixel office. See Part 2.

### Section e — How it works
- Three numbered steps, plain language: *Find what you need → Request access → Start using it*
- One-line explanation and an icon each

### Section f — Final CTA
- "Not sure where to start?" → link to Docs / Getting Started, plus the team's support channel

### Motion
Scroll-triggered fade/slide reveals as each section enters the viewport — subtle, staggered, IntersectionObserver-driven. Fully disabled under `prefers-reduced-motion`. No parallax, no autoplay video.

### Files
`src/components/landing/` — `Hero.tsx`, `StatsStrip.tsx`, `BentoGrid.tsx`, `HowItWorks.tsx`, `FinalCta.tsx`. Page composes them at `src/pages/Landing.tsx`. Respect the 200-line ceiling.

## Part 2 — Meet ØAE Pixel Office

A tile-based pixel-art office rendered on canvas. Each ØAE team member has a desk and an animated sprite. This is simultaneously the "who are we" content and the artifact people screenshot and share internally.

### Inspiration, not dependency

Reference implementations: `paulrobello/claude-office` (Next.js + PixiJS + Zustand) and `pixel-agents-hq/pixel-agents` (MIT, open-source office assets).

**Do not vendor, fork, or install either.** claude-office ships a FastAPI Python backend and a Claude Code transcript watcher — we need neither, and our data source is people and (later) GitHub Projects, not agent sessions. Borrow only the architectural pattern: **PixiJS canvas for the scene, React + MUI overlay for all UI.**

### Tech
- **PixiJS v8** for canvas rendering, sprites, and the ticker loop
- **React + MUI overlay** for every piece of UI — person cards, legend, controls. Never draw UI text into the canvas.
- Lives in `src/components/office/`, fully self-contained
- **Lazy-loaded via `React.lazy` + `Suspense`.** PixiJS must not appear in the initial bundle. Verify with a build-size check.

### Data contract — build to this from day one

```ts
// src/types.ts
export type OfficeStatus = 'idle' | 'working' | 'reviewing' | 'blocked' | 'away'

export interface OfficeAgent {
  id: string
  name: string
  role: string                    // "Delivery Manager", "Solution Architect", …
  squad: 'MiniMax' | 'Gemma' | 'Kimi' | 'Vector' | 'Platform'
  desk: { x: number; y: number }  // grid coords
  spriteKey: string
  status: OfficeStatus
  currentTask?: string            // ← future GitHub Projects hook
  contact?: string                // Teams/email handle (mock)
}
```

Everything the canvas renders comes from `OfficeAgent[]` and nothing else. **This seam is the entire point.** Sprite logic must never reach around it into raw mock data — when GitHub Projects is wired later, one adapter file changes and the canvas doesn't.

Seed 8–12 agents across the squads, consistent with squad names already used elsewhere in the app.

### Behaviour
- Tile grid roughly 20×14: floors, walls, desks, plants
- Sprites idle at desks with a subtle 2-frame animation; occasionally walk to another tile and back using simple BFS/A* pathfinding on the grid
- Status drives appearance:
  - `working` → typing animation
  - `reviewing` → reading animation
  - `blocked` → speech bubble with an alert glyph
  - `idle` → idle animation at desk
  - `away` → sprite absent, desk empty
- **Click a sprite** → MUI card overlay with name, role, squad, what they work on, contact link. This is the real "Meet the team" content, not a decoration.
- **Legend** below the canvas mapping each status to plain-language meaning — non-technical visitors must be able to read the scene without guessing
- Ticker pauses when the section is off-screen (IntersectionObserver)
- Under `prefers-reduced-motion`: render a single static frame, no ticker

### Fallback (required, not optional)
If PixiJS fails to initialise — locked-down browser, GPU-less VDI, canvas blocked — render a plain MUI card grid of the same `OfficeAgent[]`. Ørsted will have machines like this. A blank rectangle where "Meet ØAE" should be is worse than never building the section.

### Assets & licensing
Open-source office assets (furniture, floors, walls) from `pixel-agents-hq/pixel-agents` under `webview-ui/public/assets/` are MIT and may be used.

**The character sprites are a separate question.** They derive from JIK-A-4's Metro City pack on itch.io, where "free" ranges from CC0 to personal-use-only. **Verify that pack's own license before using it.** If the license is unclear or restricts commercial/internal-corporate use, generate simple 16×16 sprites from the theme palette instead. Either way, record the decision and the license in the README.

### Quality bar
Deliberately retro, not cheap. Tight pixel grid, `image-rendering: pixelated`, integer zoom levels only, palette pulled from design tokens. A half-finished pixel office actively undercuts the "we're savvy" signal it exists to send — if it can't look intentional, cut it.

### Future scope — document only, do not build
GitHub Projects GraphQL integration driving `status` and `currentTask` from real work items. Needs a token, so it requires a server-side proxy (Azure Function, or a scheduled GitHub Action publishing static JSON). **A browser-held PAT is not acceptable.** The `OfficeAgent` adapter should be the only file that needs to change. Write this up in the README under "Future: GitHub Projects integration."

## Build Order

1. Route change: `/` → Landing, `/search` → Search. Verify no broken links.
2. Landing sections a, b, c, e, f — everything except Meet ØAE
3. Scroll reveal motion + reduced-motion handling
4. `OfficeAgent` type + mock data + **card-grid fallback component first**
5. PixiJS canvas, sprites, pathfinding, status animations
6. Click-to-card overlay + legend
7. Lazy-loading, IntersectionObserver pause, bundle check

Building the fallback before the canvas is deliberate — it guarantees the section works even if PixiJS is cut for time.

## Definition of Done

1. `npm run build` passes with zero TS errors; `npx eslint . --max-warnings=0` clean
2. `/` renders the full landing page; `/search` works exactly as before; no dead links anywhere
3. Hero search submits to `/search` with the query preserved
4. Bento Inventory tile shows locked state for Employee and Engineer personas, links through for ØAE Member
5. Stats derive from existing mock data — no duplicated hardcoded numbers
6. Reveal animations fully disabled under `prefers-reduced-motion`
7. Pixel office: sprites animate, clicking opens a person card, legend is present and readable
8. **PixiJS absent from the initial bundle** — confirm via build output
9. Ticker pauses off-screen; static frame under reduced motion
10. **Fallback card grid renders when canvas init fails** — test by forcing the failure path
11. `?theme=alt` still re-skins everything including the new sections; no hex/font/px outside `src/theme/`
12. No file over 200 lines, no `any`, no commented-out code, no unused exports
13. README updated: landing page structure, pixel office asset licensing decision, and the "Future: GitHub Projects integration" section

## Out of Scope

Carousels. Real GitHub Projects integration. Claude Code session watching or transcript parsing. The claude-office FastAPI backend. A pixel office layout editor. Parallax. Video backgrounds.

---

*Commit per section. Run `/code-review` after each commit and fix what it finds before moving on — do not batch fixes to the end.*
