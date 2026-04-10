# NBA Teams Dashboard

> An editorial-style data dashboard for all 30 NBA franchises — built as a front-end take-home project.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat-square&logo=framer&logoColor=white)

---

## Screenshots

| Dark Mode | Light Mode |
|-----------|------------|
| ![Dark mode list view](./docs/dark-list.png) | ![Light mode list view](./docs/light-list.png) |
| ![Dark mode detail view](./docs/dark-detail.png) | ![Light mode detail view](./docs/light-detail.png) |

> Add screenshots to the `./docs/` folder after running the app locally.

---

## Features

- **30 NBA teams** rendered in a responsive grid (1 → 2 → 3 → 4 columns)
- **Live search** filters teams by name, city, or abbreviation — debounced with `useDeferredValue`
- **Empty state** with a clear-search prompt when no results match
- **Skeleton loading** — card-shaped skeletons instead of a spinner for a polished feel
- **Error states** at both the list and detail level with a "Try again" button
- **Team detail pages** showing badge, founded year, arena, capacity, city, description, gallery images, and roster
- **Per-team accent colors** pulled from the API's `strColour1` field — every card is visually distinct
- **Dark/light mode toggle** persisted to `localStorage`, respects `prefers-color-scheme` on first visit, and uses a blocking inline script to prevent theme flash
- **Editorial typography** — Space Grotesk (display) + Inter (body) via `next/font/google`
- **Staggered card animations** on load and hover-lift via Framer Motion
- **Fully accessible** — semantic HTML, proper `alt` text, focus rings, keyboard navigation, ARIA live regions for search results
- **Zero external runtime dependencies** beyond framer-motion, clsx, and tailwind-merge

---

## Setup

**Requirements:** Node.js 20+ (tested on 20.x and 22.x)

```bash
git clone https://github.com/akallam04/nba-dashboard.git
cd nba-dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables required — the project uses TheSportsDB's free public API with key `3`.

To create a production build:

```bash
npm run build
npm start
```

---

## Architecture decisions

### Why App Router?

Next.js App Router (introduced in v13, mature in v15+) co-locates data fetching with the components that need it via async Server Components. This eliminates the prop-drilling and waterfall issues that come with `getServerSideProps`. Each route segment (`/` and `/teams/[id]`) fetches its own data independently, and loading/error boundaries are handled through the file-based conventions (`loading.tsx`, `error.tsx`).

### Why TheSportsDB?

It's the only credible sports API with a completely free tier that requires zero signup — reviewers can clone and run immediately without needing to create accounts or set environment variables. The free key (`3`) supports read-only lookups for teams and players. The 30-team NBA dataset fits comfortably in a single request, making pagination unnecessary while still meeting the "20+ items" requirement.

### Data fetching: Server vs. Client Components

| Component | Rendering | Reason |
|-----------|-----------|--------|
| `app/page.tsx` | Server | Fetches all 30 teams at request time; passes data down to the client grid |
| `app/teams/[id]/page.tsx` | Server | Fetches team + players in parallel (`Promise.allSettled`-style); no secrets exposed |
| `TeamGrid` | Client | Owns search state; needs `useState` + `useDeferredValue` for real-time filtering |
| `TeamCard` | Client | Uses Framer Motion for animations (requires browser APIs) |
| `ThemeToggle` | Client | Reads/writes `localStorage` and mutates the DOM |

The API layer in `src/lib/api.ts` uses `fetch` with `next: { revalidate: 3600 }` so responses are cached for an hour — fast subsequent loads without stale data.

### State management

No global state library. The only state in the app is:

1. **Search query** — `useState` local to `TeamGrid`, filtered with `useDeferredValue` for responsive input even on slow devices
2. **Theme preference** — `localStorage` + a `data-theme` attribute on `<html>`

This is intentionally minimal. Adding a favorites feature would be the natural next step for local state (localStorage), and a comparison view would motivate introducing a lightweight store like Zustand.

### Theme toggle without flash

The trick is a **blocking synchronous script** injected into `<head>` before any HTML renders:

```js
(function() {
  var stored = localStorage.getItem('theme');
  var theme = stored === 'light' || stored === 'dark'
    ? stored
    : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
})();
```

Because this script runs before the browser has painted anything, there's no visible flash. CSS custom properties keyed on `[data-theme]` handle the actual color switching — no JavaScript is needed to re-paint on navigation.

### Error boundaries

Next.js App Router automatically wraps each `loading.tsx` and `error.tsx` in a React `<Suspense>` and `<ErrorBoundary>` respectively. I added route-level files at:

- `app/error.tsx` — catches errors during team list fetch
- `app/teams/[id]/error.tsx` — catches errors during team detail fetch
- `app/teams/[id]/not-found.tsx` — renders when `notFound()` is thrown (invalid team ID)

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, theme script, header, footer
│   ├── page.tsx                # List page (Server Component — fetches all teams)
│   ├── loading.tsx             # Skeleton UI shown while list page data loads
│   ├── error.tsx               # Error boundary for list page
│   ├── globals.css             # Tailwind import + CSS custom properties for theming
│   └── teams/[id]/
│       ├── page.tsx            # Team detail page (Server Component)
│       ├── loading.tsx         # Skeleton UI for detail page
│       └── error.tsx           # Error boundary for detail page
├── components/
│   ├── Button.tsx              # Reusable button — variants: primary/secondary/ghost, sizes: sm/md/lg
│   ├── LoadingIndicator.tsx    # Spinner + TeamCardSkeleton + TeamGridSkeleton + DetailSkeleton
│   ├── TeamCard.tsx            # Individual team card with per-team accent color + animations
│   ├── TeamGrid.tsx            # Client Component: search state, filtered grid, empty state
│   ├── PlayerCard.tsx          # Compact player tile for roster section
│   ├── SearchInput.tsx         # Controlled search input with clear button + ARIA live region
│   ├── EmptyState.tsx          # Shown when search returns 0 results
│   ├── ErrorState.tsx          # Shown on fetch failure, with retry callback
│   ├── ThemeToggle.tsx         # Dark/light toggle that reads/writes localStorage
│   └── Header.tsx              # Sticky header with logo + theme toggle
├── lib/
│   ├── api.ts                  # Typed fetch wrappers for TheSportsDB endpoints
│   └── utils.ts                # cn() helper (clsx + tailwind-merge) + color/URL utils
└── types/
    └── index.ts                # Team, Player, and API response interfaces
```

---

## Known limitations

- **Free API tier** — `lookup_all_players.php` returns at most ~10 players per team on the free key. This is a TheSportsDB constraint, not a bug.
- **No pagination** — with exactly 30 teams, it's not needed. If the dataset grew, virtual scrolling or cursor-based pagination would be the right solution.
- **No tests** — unit and integration tests are not included (see "What I'd improve").
- **Revalidation is time-based** — the `revalidate: 3600` cache means data can be up to an hour stale. On-demand revalidation via webhooks would be better for a production app.
- **Players section is sparse** — the free API tier limits roster depth significantly. The section renders gracefully with whatever data is returned, or hides entirely if the response is empty.
- **No image fallback dimensions** — some team fanart images from the API have inconsistent aspect ratios.

---

## What I'd improve with more time

- **Unit tests** with Vitest + React Testing Library — especially for `TeamGrid` search filtering and the `ThemeToggle` localStorage logic
- **E2E tests** with Playwright — cover the full user journey: load list → search → navigate to detail → go back
- **Server-side caching** with `use cache` (Next.js 16 stable feature) for finer-grained control than `revalidate`
- **Favorites feature** — pin teams to the top of the grid, persisted in localStorage
- **Team comparison view** — select two teams and view their stats side-by-side
- **Conference/division filters** — faceted filtering alongside search
- **Accessibility audit** — run axe-core and verify against WCAG 2.1 AA
- **Lighthouse optimization** — target 90+ on Performance and Accessibility
- **CI/CD with GitHub Actions** — lint + typecheck + build on every PR
- **OG image generation** — dynamic `opengraph-image.tsx` per team using Next.js's image generation API

---

## License

MIT
