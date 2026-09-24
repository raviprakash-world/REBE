# APP IMPROVEMENT PLAN — Folia storefront (Product Manager view, Feature Freeze applied)
Date: 2026-09-21 · Scope: the repo at `~/Projects/folia` (read-only inspection; **no code was changed**; your uncommitted edits to `ErrorBoundary.tsx`, `routes/index.tsx` and new `RouteError.tsx` were left untouched).

## What I actually found (FACT, from files read)
- The app is far past "half built": monorepo (`apps/web` React/Vite, `apps/api` NestJS/Prisma, shared packages), multi-seller marketplace, seller-grouped cart, Razorpay code, Shiprocket code, admin, tracking, enquiries. Recent commits are polish and fixes.
- Your own `docs/PRODUCTION_STATUS.md` (updated 2026-09-19) says: engineering gate passed on a clean clone (lint, typecheck, 865/865 unit tests, 6/6 e2e, build) and **"Launch status: NOT READY — external/infrastructure/business blockers remain."** I did not re-run those checks. My own quick `tsc` was inconclusive (the root project file only holds references), so I do NOT claim a typecheck pass.
- Your own blocker register (`docs/MANUAL_SETUP_GUIDE.md` §13) lists as P0: known-password demo accounts possibly in production; **free Postgres expires ~2026-10-03 with no backups**; Razorpay not configured; no durable object storage; Vercel `VITE_REAL_*` flags unverified (production may be running mock checkout); **GST is a placeholder flat 8%**; legal pages and company identity are placeholders.
- The live site still shows the old catalog (per your docs); the current branch is not deployed.
- City/identity assumptions in code (41 references to Bengaluru in TS/TSX, mostly placeholder): invoice business address and state are "412 MG Road, Bengaluru, Karnataka" with a mock GSTIN; contact page shows a fictional Bengaluru address, `hello@folia.example` and a fake phone; "Store Pickup" says "our Bengaluru studio"; Same-Day delivery is tied to a "(fictional) Bengaluru depot"; the tracking simulation says "Origin facility, Bengaluru, KA".

## The challenge to the assumption "improve the app"
Nothing in the code is what stops your first 10 Delhi customers. Every P0 above is an account, money, legal or business-decision task, and the first-10 plan is blocked on supplier costs, delivery quotes and your cash cap. **Adding features now fails Feature Freeze** (no evidence of demand, high maintenance). The valuable "improvement" is a small **launch-minimum**: make what exists safe and honest for real customers.

## Feature Freeze verdicts on candidate improvements
| # | Improvement | Revenue / trust impact | Evidence | Verdict | Who must act first |
|---|---|---|---|---|---|
| 1 | **Back up the live database and choose a paid plan before ~2026-10-03** (guide §0.1, §8) | Prevents losing everything (users, orders) | Your own docs | **DO NOW (founder, not code)** | Founder (Render dashboard). I can prepare the `pg_dump` + restore-test steps |
| 2 | **Check production for demo accounts with known passwords; run seed with `SEED_LOCK_DEMO_ACCOUNTS=true`** (guide §0.2) | Security | Your docs | **DO NOW (founder + me)** | Founder runs; I can walk it step by step |
| 3 | **One-place business identity config** replacing scattered fake company/contact/pickup/depot text (invoice, ContactInfo, delivery methods, same-day depot, tracking origin) | Trust: fake phone/email/address on a real store kills conversion | Guide §10; grep results | **BUILD** (small, low risk) | Founder supplies real details (see below). Legal entity/GSTIN may stay UNKNOWN; site can show WhatsApp + email only |
| 4 | **Stop issuing invoices/charges that imply GST compliance** until Compliance + a CA set rates. Today tax is a placeholder flat 8% added at checkout and the invoice is labelled with a mock GSTIN | Legal/consumer risk on real orders | Guide §9 | **DECISION FIRST** (Compliance/CA), then a small code change | Founder + CA |
| 5 | **Delhi delivery config**: pincodes served, delivery fee bands, remove Bengaluru same-day depot logic | Delivery cost drives contribution | Depends on real delivery quote | **BLOCKED** until you have quotes and pick-up point | Founder |
| 6 | **Catalog for the first 10**: replace 55 fictional demo products/8 fake sellers with the 5–10 real items from a real Delhi supplier, Folia as the seller | Only real products can be sold | Guide §11 | **BLOCKED** until nursery calls give real products/prices | Founder |
| 7 | **Payments for the first 10**: (a) COD/UPI payment link via WhatsApp (manual-first), or (b) Razorpay live (needs KYC/keys). COD on live plants raises refusal risk — Finance to decide | Revenue enabler | Docs say COD verified live; Razorpay success path never exercised | **DECISION** | Founder + Finance |
| 8 | **Resend email + enquiry notifications** (enquiries currently only appear in Admin) | Missed leads | Guide §10 | **DEFER** until orders exist | — |
| 9 | Durable object storage for uploads | Needed only for seller image uploads | Guide §7 | **DEFER** if Folia is the only seller | — |
| 10 | Marketplace features, AI plant diagnosis, coupons, newsletter, wishlists, new pages | None proven | None | **DO NOT BUILD** | — |
| 11 | Commit or discard your in-progress route-error work | Prevents stale-tab blank screens after deploys | Your working tree | **Yours to finish**; I can review it and run the checks if you want | Founder |

## The one structural question
Folia's operating model (Delhi first, Folia buys from nurseries, pre-order) is **single-seller**. The app is a **marketplace with seller onboarding, KYC and payouts**. For the first 10 customers a marketplace adds cost and legal surface (payout model, TCS/TDS questions in guide §9–10) with no benefit. Recommended: **operate as the only seller** (admin-created "Folia" seller) and leave the marketplace code dormant. Revisit only when there is evidence of demand for third-party sellers.

## Proposed sequence
1. Founder: back up the DB and check demo accounts (items 1–2), this week.
2. Founder: supply real contact details + payment decision (below).
3. Me: item 3 (identity config) and, once decided, item 4 (stop non-compliant invoice/tax presentation) as small, tested changes on a branch, with QA-style verification and honest "NOT RUN" where I can't run something.
4. After nursery calls and delivery quotes: items 5–6 (Delhi delivery config, real catalog).
5. After first orders: revisit deferred items.

## What I will not do without your say-so
Touch production, run migrations or seeds, open or print `.env` or secrets, change GST/tax rules on my own guess, delete demo data, or commit/push anything.
