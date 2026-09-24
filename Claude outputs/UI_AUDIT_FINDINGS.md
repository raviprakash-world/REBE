# UI audit — Folia storefront
Date: 2026-09-24 · Method: static code review against `docs/UI_VERIFICATION.md`'s own rules (grep + manual WCAG contrast math on the actual theme colors). **No code was changed.**

## Why not the live rendered audit (`scripts/ui-audit.js` / `viewport-audit.mjs`)
Both need a real browser. Neither path worked in this session: the sandboxed VM this runs in has no root and its network allowlist blocks every Chrome/Chromium download source; your actual browser (built-in or the Chrome extension) can't reach a dev server started inside that VM — different network namespace, not fixable by config. Running these needs to happen from your own terminal.

## Verified bug: newsletter placeholder text fails contrast
`apps/web/src/components/forms/NewsletterForm.tsx:67` — the email input's placeholder is `placeholder:text-cream/40`, inside an input styled `bg-cream-light/10` sitting on the pine (`#1f3329`) footer. Computed contrast (cream `#edeae1` at 40% over the actual composited background): **2.72:1** — fails WCAG AA 4.5:1 for normal text, and fails even the 3:1 large-text floor. On a phone in daylight this placeholder is close to invisible.

Fix: match the `/70` opacity already used one line above it (the field's own `<label>` uses `text-cream/70`, and it's the standard translucency level used everywhere else in this footer). Computed contrast at `/70` on the same background: **5.02:1** — passes. One-line change, no other code touched.

## Checked and clean (verified, not assumed)
- Fixed-fill contrast pairing (`bg-pine`→`text-cream*`, `bg-ochre`→`text-pine`): every instance in the codebase follows the rule correctly. No violations found.
- Footer's other translucent text (`text-cream/65`, `/70`, `/85` on the pine background): computed contrast ranges 5.7:1–11:1+ — all pass comfortably despite the reduced opacity.
- Hover-only visibility (`opacity-0 group-hover:opacity-100`): only 2 instances (`ServiceCards.tsx`, `Collections.tsx`), both a decorative arrow icon on a card that's a full `<Link>` with an always-visible text CTA underneath — not the sole entry point, so this doesn't repeat the old wishlist-heart bug.
- `<Link>` nested inside `<Button>`: none found.
- Money formatting (`₹899` browsing vs `₹899.00` at checkout): `utils/currency.ts` implements this split deliberately and correctly, with a comment explaining why.

## Worth a look, not verified as broken
`components/layout/Navbar.tsx:28` — the cart/notification count badge uses `text-[10px]`, under the 12px floor the audit tooling checks for. It's a 1-2 digit count badge, not body text, so this is a judgment call (small numeric badges are a common, usually-accepted exception) rather than a confirmed bug — flagging so you can decide, not fixing it.

## Your uncommitted route-error work (ErrorBoundary.tsx / RouteError.tsx)
Reviewed against the same checklist: clean. Sensible refactor (shared `ErrorFallback` between the class boundary and router's `errorElement`), correct color classes, safe `sessionStorage` access with a try/catch fallback, one-reload-per-stale-chunk logic well-reasoned in the comment. No UI rule violations. Looks done — safe to commit.
