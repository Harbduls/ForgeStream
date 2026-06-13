# ForgeStream OSS Dashboard

ForgeStream OSS Dashboard is a Next.js maintainer dashboard for the ForgeStream Stellar Soroban toolkit. It presents repository health, smart contract modules, contribution issues, SDK references, contributors, and documentation links in a single internal interface.

## Tech Stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn-style UI primitives
- lucide-react icons
- Vercel Analytics in production

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Start the production build:

```bash
pnpm start
```

Lint the project:

```bash
pnpm lint
```

## Project Structure

```text
app/                 Next.js app entry, layout, and global styles
components/          Dashboard shell, navigation, pages, and reusable UI
components/pages/    Feature views rendered inside the dashboard
components/ui/       Shared UI primitives
lib/                 Static dashboard data and utilities
public/              Icons and static image assets
```

## Dashboard Sections

- Overview: repository stats, activity, and module status summary.
- Smart Contracts: Soroban contract descriptions, callable functions, and state variables.
- Modules: reusable workflow modules and maintainer signals.
- Issues: contribution board organized by issue difficulty and status.
- SDK: JavaScript and Rust client usage examples.
- Contributors: maintainer and contributor activity.
- Documentation: guide and reference entry points.

## Data Model

Most visible dashboard content comes from `lib/data.ts`. Update that file when changing demo statistics, contract definitions, workflow modules, issues, contributors, or activity feed entries.

## Notes

The current app is a static, client-side dashboard. Navigation is handled in `components/dashboard.tsx` with local React state, so switching sections does not change the route.
