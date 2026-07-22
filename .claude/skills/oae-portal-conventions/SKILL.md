---
name: oae-portal-conventions
description: Conventions for the ØAE Portal prototype — design tokens, copy rules, mock data, and persona/RBAC model. Use whenever writing or editing code in this repo.
---

# ØAE Portal conventions

This is a **frontend-only, mocked-data interactive prototype** of the ØAE Portal
(Ørsted AI Ecosystem). It must feel real for stakeholder demos and must be
**re-skinnable to Ørsted's real design system by editing one folder**. Follow
these conventions on every change.

## Design tokens & the portability seam (hard rules)

1. **All design decisions live in `src/theme/tokens.ts`** — colour, typography,
   spacing, radii, elevation, motion. No hex, font names, px, or shadows exist
   anywhere else in the codebase.
2. **`src/theme/index.ts` adapts tokens → the MUI theme.** It is the only
   MUI-aware theme file and the only place that reads raw token values to build
   a component-library theme. Swapping libraries means rewriting this one file.
3. **Components never import MUI theme internals or raw values.** Use `sx` with
   an `(t) => ...` callback reading `t.tokens.*`, or standard MUI theme keys
   (`color="primary"`, `color="text.secondary"`). Never a `#hex` in a component.
4. **Semantic token names only** — `color.status.certified`,
   `color.surface.raised`, `color.action.primary`. Never literal names like
   `green500` or `navy`.
5. **Wrap a MUI component in `src/components/ui/` only when it carries a design
   decision or real logic** (`StatusBadge`, `TypeIcon`, `EnergyFlowUnderline`).
   Do not create pass-through wrappers — see rule 1 of Code Quality.
6. **A second theme proves portability.** `src/theme/tokens.alt.ts` is a
   deliberately different palette/type set. The hidden dev toggle `?theme=alt`
   swaps it; the whole app must re-skin with zero breakage.
7. **No inline styles or CSS files with hardcoded values.** Everything flows
   through tokens.

**One semantic layer:** tokens are exactly one hop from a raw value. A local
`raw` map of hex values → semantic slots is fine; a chain of token-to-token
references is not. No `color.action.primary.hover.disabled.dark`.

## Code Quality Rules (non-negotiable — all 20)

Anti-over-engineering:
1. Wrap a component only after its third use. Used once or twice? Import MUI
   directly. A wrapper with no logic beyond forwarding props must be deleted.
2. Tokens are exactly one semantic layer over raw values. No token referencing
   another token more than one hop.
3. No abstraction before the third repetition. No generic factories,
   config-driven renderers, or "flexible" helpers. Two similar things stay
   duplicated; three become shared.
4. No premature performance work. No `useMemo`/`useCallback` without a measured
   problem. No virtualization on a 20-row table.
5. No barrel files (`index.ts` re-export hubs) except the one theme adapter.
   Import from source paths.

Structure limits:
6. Max 200 lines per component file. Over that, split by responsibility, never
   by arbitrary line count. (Data seeds in `src/data/` and `tokens.ts` are the
   source-of-truth exceptions — they are data, not components.)
7. Max 3 levels of JSX nesting inside a single component. Deeper → extract a
   subcomponent.
8. One component per file, named the same as the file. Subcomponents used only
   by that parent may live in the same file if under 40 lines.
9. Flat props. No prop objects passed just to avoid listing 4 props. (A genuine
   domain/state object such as `MarketplaceFilters` is fine.)

TypeScript:
10. No `any`. No `@ts-ignore`. If typing is hard, the design is wrong.
11. Shared domain types in `src/types.ts`. Component-local and feature-local
    view/filter types stay next to their feature.
12. Discriminated unions for state (e.g. `RequestState`), not boolean soup.

Naming & copy:
13. Components `PascalCase`, hooks `useCamelCase`, files match their export,
    mock data files `kebab-case.ts`.
14. Names say what a thing is or does, never how it looks. `StatusBadge`, not
    `GreenPill`.
15. No commented-out code. No TODO comments. Build it or leave it out.
16. Comments explain why, never what.

Verification (run before declaring done):
17. `npm run build` — zero TS errors, zero warnings.
18. `npx eslint . --max-warnings=0` — clean.
19. Grep check: no hex colours, font-family declarations, or hardcoded px
    outside `src/theme/`.
20. No unused files, exports, or dependencies.

**Self-review:** after each module, re-read the diff and delete anything not
earning its place. Prefer boring, obvious code — a designer will re-skin this.

## Copy rules

- Plain language for a non-technical audience. Explain jargon; a technical term
  gets a tooltip or a one-line plain explanation.
- Sentence case everywhere. Buttons name their action ("Request MCP server",
  "Add to my workspace"), never "Submit".
- Errors explain what happened and how to fix it.
- No lorem ipsum. Every string is realistic and Ørsted-flavoured (wind,
  offshore, finance, HSE, bid management, trading).

## Mock data conventions

- One coherent world: names, squads, owners, and stats stay consistent across
  Search, Marketplace, and Inventory. The Inventory reuses Marketplace names for
  deployed assets; Search results link back to them.
- Squad names are the real ØAE delivery squads: **MiniMax, Gemma, Kimi,
  Vector** (plus **Community** for community-maintained items).
- Typed interfaces in `src/types.ts`; data in `src/data/*.ts`.
- Deliberate governance hooks that must stay true: two catalog items are
  `deprecated` yet Active in the Inventory ("Deprecated still active"); several
  Inventory assets have incomplete compliance ("Pending review"); four are
  High risk (EU AI Act).

## Persona / RBAC model (three personas)

Persona lives in `usePersonaStore`; switch it from the avatar menu ("Demo:
switch persona"). `useActivePersona()` resolves the full persona object.

1. **Employee** (`employee`) — non-technical. Sees Search, Marketplace,
   Self-service (simplified copy, fewer config fields), Docs, Help.
2. **Engineer** (`engineer`) — technical. Same, plus technical detail views
   (MCP specs, config snippets, the Technical tab).
3. **ØAE Member** (`oae`) — platform team. Everything, plus the **AI Inventory**
   (`canSeeInventory`) and the Self-service **Approvals** queue.

Gate on `persona.technical` (technical detail) and `persona.canSeeInventory`
(Inventory + Approvals). Non-ØAE navigation to `/inventory` shows the friendly
`AccessDenied` screen, never a blank or an error.
