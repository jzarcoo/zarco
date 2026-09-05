# Tech Stack Steering

## Runtime

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js | ^15.0.3 | App Router. Static export (`output: "export"`). |
| UI runtime | React | ^19 (stable) | Currently on a pre-release RC; upgrade to stable React 19. |
| Language | TypeScript | ^5 | Strict mode enabled. |
| Styling | Tailwind CSS | ^3.4 | `darkMode: "class"` strategy. |
| Fonts | Geist Sans / Geist Mono | — | Loaded via `next/font/local` from `.woff` variable fonts in `src/app/fonts/`. |
| Icons | react-icons | ^5.4 | Named imports only (see Conventions). |
| Carousel | Swiper.js | ^11.1 | `EffectFade` + `Mousewheel` modules. |
| Dark mode | next-themes | ^0.4.3 | **Currently installed but unused.** Must be wired up — see Architecture. |

## Dev Tooling

| Tool | Config file | Notes |
|---|---|---|
| ESLint | `.eslintrc.json` | Extends `next/core-web-vitals` + `next/typescript`. Do not loosen these rules. |
| PostCSS | `postcss.config.mjs` | Autoprefixer included. |
| TypeScript | `tsconfig.json` | `strict: true`. Path alias `@/*` → `./src/*`. |

## Build and Deployment

| Step | Command / Tool |
|---|---|
| Dev server | `npm run dev` |
| Production build | `npm run build` (runs `next build` with `output: "export"`) |
| CI/CD | GitHub Actions — `.github/workflows/nextjs.yml` |
| Hosting | GitHub Pages (`basePath: "/zarco"` in production) |
| Image optimization | Disabled (`images: { unoptimized: true }`) — required by static export. Manual optimization is mandatory. |

> **Static export constraint:** Because the site uses `output: "export"`, there is no Node.js server at runtime. This rules out server components that use dynamic data, API routes, server actions, and `next/image` optimization. All pages are pre-rendered to static HTML.

## Tailwind Configuration

- Config file: `tailwind.config.ts` (canonical). `tailwind.config.js` is a duplicate and should be deleted.
- Dark mode: `"class"` — a `dark` class on a root element enables dark variants.
- Content paths: `src/pages/**`, `src/components/**`, `src/app/**`.
- Extended colors `background` and `foreground` reference CSS variables that are not currently defined. Either define them in `globals.css` or remove the extension.

## CSS

`src/app/globals.css` contains only:
- `@tailwind` directives (base, components, utilities)
- A minimal reset (`margin: 0`, `padding: 0`, `box-sizing: border-box`)

Do not add component-level styles to `globals.css`. Use Tailwind utility classes in components. If a complex animation or style cannot be expressed in Tailwind utilities, add it as a Tailwind plugin or a CSS module scoped to the component.

## Dependency Rules

- Do not add new runtime dependencies without a clear, documented reason.
- Prefer packages already in the stack (Tailwind, react-icons, Swiper) over new libraries for new UI needs.
- All new dependencies must pin exact major versions. Use caret ranges only when the ecosystem requires it.
- Remove unused dependencies promptly: `next-themes` must either be wired up or removed; `gh-pages` is superseded by GitHub Actions and should be removed.

## Dependency Health

| Package | Status | Action |
|---|---|---|
| `react` | Pre-release RC in use | Upgrade to stable React 19 |
| `@types/react` | Pinned to ^18, mismatches runtime | Upgrade to ^19 |
| `next-themes` | Installed, not used | Wire up (required for dark mode fix) |
| `gh-pages` | Superseded by GitHub Actions | Remove |
| `tailwind.config.js` | Duplicate of `.ts` config | Delete |
