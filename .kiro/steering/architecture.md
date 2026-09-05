# Architecture Steering

## Overview

This is a **static-export Next.js application** deployed to GitHub Pages. There is no server at runtime — all pages are pre-rendered to HTML during `next build`. All data is embedded at build time from static JSON files.

## Directory Structure

```
zarco/
├── .github/
│   └── workflows/
│       └── nextjs.yml          # CI/CD: build + deploy to GitHub Pages on push to main
├── .kiro/
│   └── steering/               # Kiro steering documentation (this directory)
├── public/                     # Static assets served at the root path
│   ├── projects/
│   │   └── projects.json       # Software project data
│   ├── games/
│   │   └── games.json          # Game project data
│   ├── machinelearning/
│   │   └── machinelearning.json # ML project data
│   └── *.{png,jpg,jpeg}        # Project screenshots and profile photo
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── fonts/              # Local font files (Geist Sans + Mono .woff)
│   │   ├── projects/
│   │   │   └── page.tsx        # /projects route
│   │   ├── favicon.ico
│   │   ├── globals.css         # Global styles (Tailwind directives + minimal reset)
│   │   ├── layout.tsx          # Root layout: fonts, metadata, HTML shell
│   │   └── page.tsx            # / route (home)
│   └── components/             # Shared React components
│       ├── DarkModeButton.tsx
│       ├── Footer.tsx
│       ├── Header.tsx
│       ├── HeaderIcon.tsx
│       ├── Navbar.tsx
│       ├── NavbarItem.tsx
│       └── ProjectSwipper.tsx
├── next.config.ts              # Next.js config (static export, basePath, unoptimized images)
├── tailwind.config.ts          # Tailwind config (canonical)
├── tailwind.config.js          # DUPLICATE — should be deleted
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

## App Router Layout Hierarchy

```
RootLayout (layout.tsx)
  ├── <html lang="en">
  │     └── <body> (Geist fonts applied)
  │           └── {children}
  │
  ├── / → page.tsx
  │     └── <div dark> wrapper
  │           ├── Navbar
  │           │     └── NavbarItem (×4)
  │           ├── <main>
  │           │     └── Header
  │           │           └── HeaderIcon (×3: LinkedIn, GitHub, Email)
  │           ├── DarkModeButton
  │           └── Footer
  │
  └── /projects → projects/page.tsx
        └── <div dark> wrapper
              ├── Navbar
              ├── <main>
              │     ├── <section id="projects">
              │     │     └── ProjectSwipper (projects.json)
              │     │           └── Slide (×n)
              │     │                 └── Logos
              │     ├── <section id="machine-learning">
              │     │     └── ProjectSwipper (machinelearning.json)
              │     └── <section id="games">
              │           └── ProjectSwipper (gamesData)
              ├── DarkModeButton
              └── Footer
```

## Data Flow

Project content is static. The pipeline is:

```
JSON files in /public  →  imported in page.tsx  →  passed as props to ProjectSwipper  →  rendered as Swiper slides
```

JSON is imported at build time using `import ... from "../../../public/.../file.json"`. Because `tsconfig.json` has `"resolveJsonModule": true`, TypeScript infers the shape. There are no explicit TypeScript interfaces for the JSON schema — this is a gap to address (see Conventions).

## Dark Mode Architecture

**Current state (broken):** Each page holds its own `useState(true)` for dark mode. The state does not survive navigation between pages, so the preference resets on every route change.

**Target state:** Use `next-themes` `ThemeProvider`, which is already installed:

1. Wrap `{children}` in `layout.tsx` with `<ThemeProvider attribute="class" defaultTheme="dark">`.
2. Remove the `darkMode` state from both `page.tsx` and `projects/page.tsx`.
3. Remove the `className={darkMode ? "dark" : ""}` wrapper div from both pages.
4. Update `DarkModeButton` to call `useTheme()` from `next-themes` instead of accepting props.

The `dark` class will be applied to `<html>` by `next-themes`, matching the `darkMode: "class"` Tailwind strategy. The user's preference is persisted in `localStorage` automatically.

## Routing Conventions

- Routes are defined by the App Router file system: a `page.tsx` inside `src/app/[path]/` creates a route.
- Each page exports a default React component as the page content.
- Each page should also export a `metadata` object for SEO (see Requirements).
- Anchor-link navigation within the `/projects` page (e.g., `href="/projects#machine-learning"`) works because sections have matching `id` attributes.

## Static Assets

- All images live in `/public` at the root level or in category subdirectories.
- Images are referenced in JSON files by filename only (e.g., `"img": "mazesimulator.png"`). The `ProjectSwipper` component prepends `/` to resolve them as absolute paths from the public root. Adjust for `basePath` if needed.
- Images must be manually optimized before committing. See Performance Requirements.
- The profile photo (`me.jpg`) is imported directly in `Header.tsx` using a TypeScript import, which allows Next.js to inline the path. This is the correct pattern for the hero image.

## Component Responsibilities

| Component | Responsibility |
|---|---|
| `layout.tsx` | HTML shell, font loading, global metadata, ThemeProvider (once wired) |
| `page.tsx` (home) | Home page composition only. No business logic. |
| `projects/page.tsx` | Projects page composition. Imports JSON data and passes to ProjectSwipper. |
| `Navbar` | Navigation drawer state (open/closed). Renders links. |
| `NavbarItem` | Single navigation link. Pure presentational. |
| `Header` | Hero section: name, title, bio, icons, photo. All content is hardcoded constants. |
| `HeaderIcon` | Single social link with icon. Pure presentational. |
| `DarkModeButton` | Dark mode toggle. Will own the `useTheme()` call after refactor. |
| `ProjectSwipper` | Swiper wrapper + slide rendering. Receives `projects` array as prop. |
| `Footer` | Copyright line. Pure presentational. |

## Constraints

1. **No server-side code.** `output: "export"` means no API routes, no server components with dynamic data, no middleware.
2. **No new pages without a clear UX purpose.** The two-page structure (home + projects) is intentional and sufficient for this portfolio's goals.
3. **No new data fetching mechanisms.** JSON files in `/public` are the data layer. If data becomes complex, consider co-locating JSON closer to its consuming page, but do not introduce a CMS or remote API.
4. **Do not change the deployment pipeline** unless explicitly required. GitHub Actions + GitHub Pages is the production system.
