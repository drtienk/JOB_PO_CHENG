# Job Search Review Dashboard

A full-stack Next.js app to aggregate and review jobs found by daily profile-based searches.

## Tech Stack
- Next.js 14 + TypeScript + App Router
- Prisma + PostgreSQL
- Tailwind CSS + shadcn-style reusable UI components
- Provider architecture for source ingestion

## Architecture
- `app/`: pages, API routes, route groups
- `components/`: UI, job table, layout
- `lib/providers/`: extensible job source providers
- `lib/services/`: orchestration, dedupe logic, domain services
- `lib/actions/`: server actions (`Run Search Now`)
- `prisma/`: schema + seed
- `scripts/`: manual search runner

## Source ingestion policy
- `mock`: **production-safe for demo**, deterministic mock feed.
- `rss-placeholder`: architecture stub for legal/public RSS/API integration.
- No brittle scraping logic is included by default.

## Dedupe strategy
1. Primary dedupe key: `source + externalId`
2. Secondary fallback: normalized hash of `title + company + location + normalized source URL`
3. Store hash in `JobPosting.dedupeHash`

## Implemented pages
- Sign in placeholder: `/auth/sign-in`
- Dashboard: `/dashboard`
- Search Profiles: `/profiles`
- Job Listings: `/jobs`
- Job Detail: `/jobs/[id]`
- Search Runs: `/runs`
- Settings: `/settings`

## Scheduler design
- Development: manual trigger via dashboard button and `POST /api/search/run`.
- Production: schedule calling API route or `scripts/run-search.ts` using cron/scheduler.

## Local setup
1. Install dependencies
   ```bash
   npm install
   ```
2. Copy env
   ```bash
   cp .env.example .env
   ```
3. Start PostgreSQL and set `DATABASE_URL`
4. Prisma generate + migrate + seed
   ```bash
   npm run prisma:generate
   npm run prisma:migrate -- --name init
   npm run prisma:seed
   ```
5. Start app
   ```bash
   npm run dev
   ```

## Current status
### Completed
- Core schema models required by spec
- Provider interface and mock providers
- Search orchestration, dedupe, run history
- Dashboard/review pages and job table with batch-select UI
- Manual run button + API route + script
- In-app summary support and email architecture placeholder

### Not completed yet
- Real auth/authorization
- Fully interactive sort/filter status mutations in table (API and optimistic updates)
- Real email delivery integration
- Production scheduler wiring (depends on deployment target)

## Next steps
- Add auth (NextAuth or Clerk)
- Implement profile CRUD forms + validation
- Add bulk action and status update APIs
- Add public API providers per legal terms
- Add tests (unit for dedupe/provider; integration for run pipeline)
