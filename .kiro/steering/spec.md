# Portfolio Improvement Specification

## Current State Summary

The portfolio is a working Next.js 15 static-export application deployed to GitHub Pages. It has two routes (`/` and `/projects`), a hamburger drawer navigation, a full-screen hero section, and a Swiper-based project carousel. The visual identity (teal accent, dark/light gray backgrounds, Geist fonts) is coherent and worth preserving.

The problems fall into three categories:
1. **Content problems** — the hero bio is generic, project descriptions don't explain the work, and there is no section that communicates specialization.
2. **Technical bugs** — dark mode state resets on navigation, heading hierarchy is broken, icon-only buttons have no accessible names, images are uncompressed.
3. **Missing fundamentals** — no Open Graph metadata, no `robots.txt`, no skip link, no focus indicators.

None of these require rebuilding the application. Every fix is a targeted change to an existing file.

---

## 1. Requirements

### Functional requirements

| ID | Requirement | Why it is necessary |
|---|---|---|
| F-01 | Dark mode preference persists across page navigation | Current `useState` in each page resets on route change. Broken UX. |
| F-02 | Dark mode preference persists across browser sessions | Users who prefer dark mode should not re-toggle on every visit. |
| F-03 | All navigation links work and point to the correct destinations | Baseline correctness. |
| F-04 | Project cards link to the correct repo or live demo | Baseline correctness. Cards where `repoLink === siteLink` for repo-only projects should hide the live-demo icon. |
| F-05 | The home page communicates specialization without requiring navigation to `/projects` | Current home is one paragraph. A visitor who leaves after 5 seconds gets no signal about technical depth. |
| F-06 | Each project description communicates the problem, approach, and result | Current descriptions are feature summaries, not technical arguments. |

### Non-functional requirements

| ID | Requirement | Why it is necessary |
|---|---|---|
| NF-01 | WCAG 2.1 Level AA accessibility | Legal baseline and ethical obligation. Current failures include missing aria labels, broken heading order, and no focus indicators. |
| NF-02 | LCP < 2.5s on 4G | The 6.7 MB PNG is a direct blocker. Unacceptable load time for a first impression. |
| NF-03 | CLS < 0.1 | Images need explicit dimensions to prevent layout shifts. |
| NF-04 | Open Graph metadata on all pages | The portfolio URL is shared in job applications. Without OG tags it renders as a raw URL with no preview on LinkedIn, WhatsApp, etc. |
| NF-05 | Usable at 320px viewport width | Current card and icon layouts overflow on narrow mobile. |
| NF-06 | `npm run lint` passes with zero errors | Code quality baseline. |
| NF-07 | Zero dead or zombie dependencies | `gh-pages` is unused; `next-themes` is installed but not wired up. |

---

## 2. User Stories

**US-01 — Recruiter scans the home page**
> As a software engineering recruiter, I want to understand who Antonio is and what he specializes in within 10 seconds of landing, so I can decide whether to keep reading.
>
> Acceptance: The home page `<h1>` names him, a subtitle names his role, and below the fold (or inline) there is a visible list of specialization areas — each backed by the projects that evidence them.

**US-02 — Recruiter evaluates a project**
> As a recruiter, I want to read a project description and know what problem was solved, how it was solved, and what the result was, so I can assess problem-solving ability without opening the repo.
>
> Acceptance: Every project card description follows the pattern: problem → approach → result/scale. Generic phrases like "a classic arcade game with a modern twist" (currently in three cards) are replaced with specific facts.

**US-03 — Researcher evaluates ML work**
> As a professor or researcher, I want to see the methodology and results of Antonio's ML projects, not just a list of libraries used, so I can assess research rigor.
>
> Acceptance: ML project descriptions mention dataset scale, model architecture, evaluation metric, and a result value where one exists.

**US-04 — Visitor shares the portfolio URL**
> As a visitor sharing this URL on LinkedIn or WhatsApp, I want a rich preview with name, title, and a professional image, so the link looks credible and not like a raw URL.
>
> Acceptance: OG tags (`og:title`, `og:description`, `og:image`) are set. A 1200×630 OG image exists in `/public`.

**US-05 — Keyboard user navigates the site**
> As a keyboard-only user, I want to navigate all interactive elements without using a mouse, so I am not excluded from the content.
>
> Acceptance: Tab reaches every link and button; focus is always visibly indicated; the nav drawer traps focus while open; Escape closes the drawer.

**US-06 — Screen reader user reads the home page**
> As a screen reader user, I want landmark regions, logical heading order, and labeled buttons, so I can navigate by heading and understand the purpose of each interactive element.
>
> Acceptance: One `<h1>` per page; no skipped heading levels; all icon buttons have `aria-label`; skip-to-main link is the first focusable element.

**US-07 — Mobile visitor browses projects**
> As a mobile user on a 375px screen, I want the project cards to be fully readable and tappable without zooming or horizontal scrolling, so I can evaluate the projects on the go.
>
> Acceptance: Project card does not overflow viewport; all tap targets ≥ 44×44px; no horizontal scroll at 320px.

**US-08 — Visitor searches Google for "Antonio Zarco"**
> As someone who heard of Antonio and searches his name, I want the portfolio to appear in results with a meaningful description, so I can identify it as the right page.
>
> Acceptance: Page `<title>` and `<meta name="description">` are set correctly; `robots.txt` and `sitemap.xml` exist.

---

## 3. Design Principles

These principles govern every UI and content decision. When two options conflict, use these to decide.

**P-01: Evidence before assertion**
Show the work; do not describe personality. Replace "passionate about AI" with "trained BERT and CNN models on 20,000 articles." This applies to all copy on the site.

**P-02: Signal before noise**
The most important information appears first and largest. The name is the `<h1>`. The specialization is immediately visible. Tech stack badges are supporting detail, not the headline.

**P-03: Preserve the existing visual identity**
The teal/gray palette and Geist font are working well. Do not introduce new color families, typefaces, or a completely different layout. Improve what exists.

**P-04: Depth over breadth**
One project described well beats five described poorly. This applies to both copy and UI — the project card should have room for a real description, not just a two-word summary.

**P-05: Targeted changes over rewrites**
Every code change should touch the minimum surface area required. A fix to heading order does not require rewriting the Header component's layout. A dark mode fix does not require a new routing strategy.

**P-06: No new dependencies without justification**
The stack already has everything needed: Next.js, Tailwind, react-icons, Swiper, next-themes. A new dependency must either remove an existing one or solve a problem that cannot be solved with what is already there.

---

## 4. Information Architecture

### Current structure (preserved)
```
/ (Home)
  └── Hero section (name, title, bio, social links, photo)

/projects (Projects)
  ├── #projects    → Software engineering swiper
  ├── #machine-learning → ML/AI swiper
  └── #games       → Games swiper
```

This two-page structure is correct and sufficient. Do not add pages.

### Changes to home page content

The hero section currently contains: name, title (1 line), bio (1 sentence), social icons, photo.

It must be extended to add, below the photo: a **Specializations** section. This is not a resume skills list — it is a small set of labeled areas, each with a one-sentence statement of what he has done in that area.

```
/ (Home)
  └── Hero section
        ├── Name (h1)
        ├── Title (h2)
        ├── Bio (1–2 sentences, specific)
        ├── Social links (LinkedIn, GitHub, Email)
        ├── Profile photo
        └── Specializations (new, below photo)
              ├── Algorithms & Data Structures
              ├── Machine Learning & AI
              ├── Computer Vision
              ├── Software Engineering
              └── [optionally: Competitive Programming, Research]
```

The Specializations section must:
- Not look like a resume. No bullet lists of skills. Short, factual statement per area.
- Link visually or literally to the `/projects` page to create a navigation path.
- Be collapsible on mobile if vertical space is a concern.

### Changes to project content (data, not structure)

The `/projects` page structure is preserved. The three-section swiper layout remains. What changes are the JSON descriptions. See Section 7 for rewrite targets.

### Navigation changes

The navbar currently has four items: Home, Projects, ML, Games. These are correct. Add a fifth link: a direct anchor to the new `#specializations` section on the home page is not needed — the home page is short enough to not warrant internal navigation.

No structural nav changes are required.

---

## 5. Technical Design

### 5.1 Dark mode (fix existing bug — F-01, F-02)

**Problem:** `page.tsx` and `projects/page.tsx` each hold a `useState(true)` for dark mode. The state is local to each route. Navigating between pages resets it.

**Solution:** Wire up `next-themes`, which is already installed at `^0.4.3`.

Changes required:
1. `src/app/layout.tsx` — add a `ThemeProvider` wrapper:
   ```tsx
   // layout.tsx — wrap children
   import { ThemeProvider } from "next-themes";
   // ...
   <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
     {children}
   </ThemeProvider>
   ```
   This component must be a Client Component wrapper (a small `Providers.tsx` file) because `ThemeProvider` uses context. `layout.tsx` itself can remain a Server Component.

2. `src/app/page.tsx` — remove `useState(darkMode)`, remove the outer `<div className={darkMode ? "dark" : ""}>` wrapper, remove `DarkModeButton` props.

3. `src/app/projects/page.tsx` — same removals as above.

4. `src/components/DarkModeButton.tsx` — replace props with `useTheme()`:
   ```tsx
   "use client";
   import { useTheme } from "next-themes";
   // ...
   const { theme, setTheme } = useTheme();
   // toggle between "dark" and "light"
   ```

5. The `dark` class will now be applied to `<html>` by `next-themes`, which is exactly where `darkMode: "class"` in Tailwind expects it. No change to Tailwind config required.

**Why not a different approach:** `next-themes` is already a dependency. Using it is the path of minimum effort and zero new dependencies. Any alternative (React Context in layout, cookies, URL params) would be more code for the same result.

### 5.2 New `Providers.tsx` component

Because `ThemeProvider` is a client component but `layout.tsx` needs to remain a server component to export `metadata` correctly, a thin wrapper is required:

```
src/components/Providers.tsx   (new file, "use client")
```

This is the only new file required by the dark mode fix. It wraps `ThemeProvider` and re-exports `{children}`.

### 5.3 `DarkModeButton` accessibility fix (NF-01)

**Problem:** The toggle is a bare SVG icon inside a `<div>` with `onClick`. It is not keyboard-accessible and has no accessible name.

**Solution:**
```tsx
<button
  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
  className="fixed bottom-0 right-0 m-6 z-50 cursor-pointer text-2xl
             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
>
  <BsFillMoonStarsFill aria-hidden="true" />
</button>
```

The icon gets `aria-hidden="true"` because the button label carries the accessible name.

### 5.4 Navbar accessibility fixes (NF-01)

**Problem:** The hamburger button has no `aria-label`, no `aria-expanded`, and no focus styles. The drawer has no role. The drawer backdrop has no accessible affordance.

**Solution:**
- Hamburger button: add `aria-label="Open navigation menu"` and `aria-expanded={isOpen}` and `aria-controls="nav-drawer"`.
- Drawer div: add `id="nav-drawer"`, `role="dialog"`, `aria-modal="true"`, `aria-label="Navigation"`, and `aria-hidden={!isOpen}`.
- Close button: add `aria-label="Close navigation menu"`.
- Add focus trap: when drawer is open, Escape closes it and returns focus to the hamburger button. Use a `useEffect` that adds a `keydown` listener.
- Add `focus-visible` styles to all buttons (see Section 8).

### 5.5 Header heading hierarchy fix (NF-01)

**Problem:** In `Header.tsx`, the name is in `<h2>` and the title is in `<h3>`. There is no `<h1>` on the home page. On the projects page, three `<h1>` elements are used for section headings.

**Solution:**
- `Header.tsx`: change `<h2>` (name) → `<h1>`, change `<h3>` (title) → `<h2>`.
- `projects/page.tsx`: change the first `<h1>` ("Projects") → `<h1>`, change `<h1>` ("Machine Learning") → `<h2>`, change `<h1>` ("Games") → `<h2>`.

This is a one-line change per element. No layout impact.

### 5.6 Skip-to-main link (NF-01)

**Problem:** There is no skip link. Keyboard users must Tab through the entire navbar on every page.

**Solution:** Add as the first child of `<body>` in `layout.tsx`:
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
             focus:z-[100] focus:px-4 focus:py-2 focus:bg-teal-600 focus:text-white
             focus:rounded focus:outline-none"
>
  Skip to main content
</a>
```

Add `id="main-content"` to `<main>` in both page files.

### 5.7 HeaderIcon accessibility fix (NF-01)

**Problem:** `HeaderIcon` passes `title` to the `<a>` element but the icon inside has no accessible name. `title` is a tooltip, not an accessible name for screen readers.

**Solution:** Add `aria-label` prop to `HeaderIconProps` and apply it to the `<a>`. Update the three call sites in `Header.tsx`:
```tsx
<HeaderIcon
  icon={<AiFillLinkedin aria-hidden="true" />}
  link="https://www.linkedin.com/in/antoniozarco/"
  aria-label="LinkedIn profile"
  title="antoniozarco"
/>
```

### 5.8 Project card link labels (NF-01)

**Problem:** GitHub and site icon links inside `Slide` have no accessible names — just icons.

**Solution:** Add `aria-label` to each using the project title:
```tsx
<a
  href={repoLink}
  aria-label={`View ${title} on GitHub`}
  ...
>
  <FaGithub aria-hidden="true" size={24} />
</a>
```

Also: if `repoLink === siteLink`, hide the paperclip link entirely (render `null`) — it is a dead duplicate that adds confusion.

### 5.9 Image alt text (NF-01)

- `Header.tsx`: `alt="me"` → `alt="Antonio Zarco"`
- `ProjectSwipper.tsx` `Slide`: The blurred background image is decorative — `alt=""`. The sharp foreground image should use `alt={title}` (already done — keep it).

### 5.10 Focus indicator system (NF-01)

**Problem:** Tailwind's preflight removes browser default focus outlines. No custom focus styles are defined anywhere.

**Solution:** Add to `globals.css`:
```css
/* Visible focus indicator for keyboard navigation */
:focus-visible {
  outline: 2px solid theme('colors.teal.400');
  outline-offset: 2px;
}
```
This applies globally via CSS, avoiding per-component duplication. It uses the existing teal accent. Interactive components that need custom positioning may still use `focus-visible:` utilities.

### 5.11 Specializations section (F-05, US-01)

**Problem:** The home page communicates nothing about technical depth. A visitor who leaves after reading the hero section knows only: his name, that he is a "Web developer with a passion for programming, AI, and cybersecurity," and his social links.

**Solution:** Add a new `Specializations` component rendered in `Header.tsx` below the profile photo. It displays a short list of technical areas — each one is a two-part item: a label and a one-sentence evidence statement.

This is a presentational component with hardcoded content (same pattern as `name`, `title`, and `description` in `Header.tsx`). No new data file is needed.

Example structure:
```tsx
const specializations = [
  {
    area: "Algorithms & Data Structures",
    evidence: "Built a maze generator and solver implementing BFS, DFS, and A* in Java.",
  },
  {
    area: "Machine Learning & AI",
    evidence: "Fine-tuned BERT for fake news detection; trained CNNs for kanji character recognition.",
  },
  // ...
];
```

Rendered as a two-column grid on `md:` and single column below. Each item uses the existing teal accent for the area label.

### 5.12 Hero bio rewrite (P-01)

**Problem:** Current bio — "Web developer with a passion for programming, AI, and cybersecurity. Join me down below and let's get cracking!" — violates every rule: uses "passion," does not name a specialization, ends with a casual phrase that undermines credibility.

**Solution:** Replace the `description` constant in `Header.tsx` with a specific, factual statement. This is a content change only — no component structure change.

Example:
> "CS student at UNAM building systems across algorithms, machine learning, and computer vision."

One sentence. Specific. No adjectives that require faith.

### 5.13 Project description rewrites (F-06, US-02, US-03)

**Problem:** Current descriptions are shallow. Three game cards say "A classic arcade game with a modern twist" — this is a copy-paste placeholder.

**Solution:** Update all JSON files with descriptions following the pattern: problem → approach → result/scale. See Section 7 for all rewrites.

### 5.14 Image compression (NF-02)

**Problem:** `elescapedelosnuevecirculos.png` is 6.7 MB and `me.jpg` is 2.9 MB. These block page load.

**Solution:** Compress and convert all images to WebP format before committing. Convert filenames in JSON from `.png`/`.jpg`/`.jpeg` to `.webp`. Update `Header.tsx` import if the profile photo is renamed.

Target sizes: `me` < 150 KB, all project images < 200 KB each. See `requirements.md` for full table.

Note: `images: { unoptimized: true }` in `next.config.ts` must remain — it is required by `output: "export"`. Manual optimization is the only option.

### 5.15 Metadata and SEO (NF-04, US-08)

**Problem:** No Open Graph tags, no `robots.txt`, no `sitemap.xml`, description says "Portafolio."

**Solution:**
1. Update `layout.tsx` metadata with title template, corrected description, and `metadataBase`.
2. Add `metadata` export to `projects/page.tsx`.
3. Add `og:title`, `og:description`, `og:image`, `og:url` to home page metadata.
4. Create `public/robots.txt`.
5. Create `public/sitemap.xml`.
6. Add JSON-LD `Person` schema to home page via a `<script type="application/ld+json">` in a Server Component.
7. Create `public/og-image.png` (1200×630, branded).

### 5.16 Dependency cleanup (NF-07)

- Remove `gh-pages` from `devDependencies` (GitHub Actions handles deployment).
- Remove dead npm scripts `"export"` and `"deploy"` from `package.json`.
- Upgrade `@types/react` from `^18` to `^19`.
- Upgrade `react` and `react-dom` from the pre-release RC to stable React 19.
- Delete `tailwind.config.js` (duplicate of `.ts` config).
- Remove the dead `background`/`foreground` color extensions from `tailwind.config.ts` (they reference CSS variables that do not exist).

### 5.17 Responsive card fix (NF-05)

**Problem:** The project card in `Slide` uses `max-w-sm` (384px) as a fixed constraint. On screens narrower than ~400px, this clips or overflows.

**Solution:** Change to `w-[90vw] max-w-sm` — 90% of viewport width on small screens, capped at `max-w-sm` on larger ones.

Also reduce `gap-16` in the social icon row to `gap-8 sm:gap-12 md:gap-16` to prevent overflow on narrow viewports.

---

## 6. Component Changes

### `src/app/layout.tsx`

| Change | Why |
|---|---|
| Add `ThemeProvider` wrapper via `Providers.tsx` | Fix dark mode persistence (F-01, F-02) |
| Update `metadata` — title template, corrected description, `metadataBase` | SEO (NF-04) |
| Add skip-to-main link as first body child | Accessibility (NF-01) |
| Add JSON-LD `Person` schema | SEO |

### `src/components/Providers.tsx` (new file)

| Change | Why |
|---|---|
| New thin client wrapper for `ThemeProvider` | Needed because `ThemeProvider` requires a Client Component context, while `layout.tsx` must remain a Server Component to export `metadata` |

### `src/app/page.tsx`

| Change | Why |
|---|---|
| Remove `"use client"` directive | No longer needed after dark mode state is removed |
| Remove `useState(darkMode)` | Replaced by `next-themes` |
| Remove outer `<div className={darkMode ? "dark" : ""}>` | `next-themes` applies `dark` to `<html>` directly |
| Remove `DarkModeButton` props | Button is now self-contained |
| Add `id="main-content"` to `<main>` | Required by skip link |
| Add per-page `metadata` export | SEO (NF-04) |

### `src/app/projects/page.tsx`

| Change | Why |
|---|---|
| Remove `"use client"` directive | No longer needed |
| Remove `useState(darkMode)` and outer wrapper | Same as home page |
| Fix heading levels: first `h1` stays, other `h1`s → `h2` | Heading hierarchy (NF-01) |
| Add `id="main-content"` to `<main>` | Skip link |
| Add per-page `metadata` export | SEO |

### `src/components/DarkModeButton.tsx`

| Change | Why |
|---|---|
| Remove props (`darkMode`, `setDarkMode`) | State moves to `next-themes` |
| Replace `<div onClick>` wrapper with `<button>` | Keyboard accessibility (NF-01) |
| Add `aria-label` (dynamic based on current theme) | Screen reader support (NF-01) |
| Add `aria-hidden="true"` to icon | Prevents double-announcement |
| Call `useTheme()` to get and set theme | Required by `next-themes` |
| Add `focus-visible` styles | Focus indicator (NF-01) |

### `src/components/Navbar.tsx`

| Change | Why |
|---|---|
| Add `aria-label="Open navigation menu"` to hamburger button | Accessibility (NF-01) |
| Add `aria-expanded={isOpen}` to hamburger button | Screen reader state (NF-01) |
| Add `aria-controls="nav-drawer"` to hamburger button | Programmatic association |
| Add `id="nav-drawer"`, `role="dialog"`, `aria-modal="true"`, `aria-label="Navigation"` to drawer div | Accessibility (NF-01) |
| Add `aria-hidden={!isOpen}` to drawer | Hides from AT when closed |
| Add `aria-label="Close navigation menu"` to close button | Accessibility (NF-01) |
| Add Escape key handler that closes drawer and returns focus | Keyboard navigation (NF-01) |
| Increase hamburger button tap target to ≥ 44×44px | WCAG 2.5.5 (NF-01) |

### `src/components/NavbarItem.tsx`

No structural changes required. Existing `hover:text-teal-400` styles are preserved. May add `focus-visible` styles if global CSS in `globals.css` is insufficient.

### `src/components/Header.tsx`

| Change | Why |
|---|---|
| Change `<h2>` (name) → `<h1>` | Heading hierarchy (NF-01) |
| Change `<h3>` (title) → `<h2>` | Heading hierarchy (NF-01) |
| Update `description` constant — replace generic bio with specific statement | Content quality (P-01, US-01) |
| Update `alt="me"` → `alt="Antonio Zarco"` | Accessibility (NF-01) |
| Reduce social icon gap: `gap-16` → `gap-8 sm:gap-12 md:gap-16` | Responsive (NF-05) |
| Scale photo size down for small screens | Responsive (NF-05) |
| Add `Specializations` section below photo | Identity/depth communication (F-05, US-01) |

### `src/components/HeaderIcon.tsx`

| Change | Why |
|---|---|
| Add `ariaLabel` to `HeaderIconProps` interface | Accessibility |
| Apply `aria-label` to the `<a>` element | Screen reader support (NF-01) |
| Pass `aria-hidden="true"` to icon (handled at call site) | Prevents double-announcement |

### `src/components/ProjectSwipper.tsx` (rename to `ProjectSwiper.tsx`)

| Change | Why |
|---|---|
| Rename file from `ProjectSwipper.tsx` → `ProjectSwiper.tsx` | Typo correction. Update import in `projects/page.tsx`. |
| In `Slide`: change blurred background `<Image>` alt from `{title}` → `""` | It is decorative (NF-01) |
| In `Slide`: add `aria-label={`View ${title} on GitHub`}` to GitHub link | Accessibility (NF-01) |
| In `Slide`: add `aria-label={`Visit ${title} live site`}` to site link | Accessibility (NF-01) |
| In `Slide`: add `aria-hidden="true"` to both link icons | Prevents double-announcement |
| In `Slide`: if `repoLink === siteLink`, render `null` for paperclip link | UX — removes meaningless duplicate |
| In `Slide`: change `max-w-sm` → `w-[90vw] max-w-sm` on card | Responsive (NF-05) |

### `src/components/Footer.tsx`

No changes required. Copyright text and Geist Mono styling are correct.

### New: `src/components/Specializations.tsx`

New presentational component. Hardcoded content (same pattern as `name`/`title`/`description` in `Header.tsx`). Renders a grid of specialization areas with evidence statements. Called from `Header.tsx` below the profile photo.

---

## 7. Page and Section Changes

### Home page (`/`)

**Hero section — current state:**
- `<h2>` — name
- `<h3>` — "Computer Scientist"
- `<p>` — "Web developer with a passion for programming, AI, and cybersecurity. Join me down below and let's get cracking!"
- Social icon row (LinkedIn, GitHub, Email)
- Profile photo (2.9 MB, `alt="me"`)

**Hero section — target state:**
- `<h1>` — name (no class change, just element)
- `<h2>` — "Computer Science Student" (more accurate than "Computer Scientist")
- `<p>` — Rewritten bio: specific, one sentence, no unsupported claims
- Social icon row — same, with `aria-label` added to each icon link
- Profile photo — compressed to WebP < 150 KB, `alt="Antonio Zarco"`
- `<section id="specializations">` — new section below photo (see below)

**Specializations section — new:**

Six specialization items. Each has:
- A label (e.g., "Algorithms & Data Structures")
- A one-sentence evidence statement tied to an existing project

Proposed content:

| Label | Evidence statement |
|---|---|
| Algorithms & Data Structures | Implemented BFS, DFS, Prim's, and Kruskal's algorithms in a maze generator and solver. |
| Machine Learning | Compared BERT, CNN, and LSTM models for fake news detection on labeled news corpora. |
| Computer Vision | Trained a PyTorch CNN to recognize handwritten kanji characters for the Kanji Ji app. |
| Software Engineering | Built a concurrent marketplace system using design patterns, sockets, threading, and unit tests in Java. |
| Web Development | Shipped Kanji Ji, a full-stack kanji dictionary using Next.js, React, and Supabase. |
| Systems Programming | Wrote a maze-solving game in C with terminal rendering and custom memory management. |

Layout: two-column grid on `md:`, single column on mobile. Teal accent on area labels. No icons (avoids ambiguity). No links — the projects page is the destination.

A subtle "View projects →" link below the grid navigates to `/projects`.

### Projects page (`/projects`)

**Structure preserved:** Three swiper sections. No layout changes.

**Heading hierarchy fix:**
- "Projects" → `<h1>` (was `<h1>`, stays `<h1>`)
- "Machine Learning" → `<h2>` (was `<h1>`)
- "Games" → `<h2>` (was `<h1>`)

**Project description rewrites (all JSON files):**

`projects.json`:

| Project | Current description | Target description |
|---|---|---|
| Maze Simulator | "A program that generates, solves, and visualizes mazes using various algorithms." | "Generates, solves, and visualizes mazes using BFS, DFS, Prim's, and Kruskal's algorithms. Includes interactive step-by-step visualization of each algorithm's execution." |
| Kanji Ji App | "A kanji dictionary web app to help users learn and explore Japanese kanji characters." | "Full-stack kanji dictionary serving 2,000+ characters with reading, meaning, and stroke-order data. Built with Next.js, React, and Supabase." |
| Portal Vaquita | "A scalable marketplace app using design patterns, sockets, threads, and unit testing" | "Concurrent marketplace system implementing Publisher-Subscriber and Observer patterns, socket-based communication, and thread synchronization. Includes a full unit test suite." |
| Coyo6 | "A virtual classroom system for UNAM students to address educational needs during the pandemic" | "PHP/MariaDB virtual classroom platform built during the COVID-19 pandemic for UNAM. Handles course management, assignment submission, and student enrollment." |
| OCR | "A project that captures or selects images, extracts text in real time using google_mlkit_text_recognition, and reads it aloud via text-to-speech (TTS)." | "Flutter mobile app that extracts text from images in real time using Google ML Kit OCR and reads it aloud via TTS — built for accessibility use cases." |

`machinelearning.json`:

| Project | Current description | Target description |
|---|---|---|
| Fake News Detection | "A project for analyzing and predicting the veracity of news articles using supervised learning, NLP techniques, and transformer-based models such as BERT." | "Compared BERT, CNN, and LSTM architectures for fake news detection. Fine-tuned BERT achieved the highest F1-score on a corpus of labeled news articles, outperforming traditional NLP baselines." |
| Kanji Ji (ML) | "A project focused on predicting and identifying kanji characters using neural networks to facilitate Japanese language learning." | "Trained a CNN in PyTorch to recognize handwritten kanji characters. Model serves as the recognition backbone for the Kanji Ji app." |

`games.json`:

| Project | Current description | Target description |
|---|---|---|
| Exo-Arcade | "An immersive educational game crafted to teach students about exoplanets through an array of fun mini-games" | "Browser-based educational game about exoplanets featuring five mini-games and Gemini API-powered hints. Developed for NASA's 2024 Space Apps Challenge." |
| El Escape de los Nueve Círculos | "A maze-solving video game inspired by 'The Divine Comedy'" | "Terminal-based maze game in C, inspired by Dante's Inferno. Implements custom maze generation, collision detection, and terminal rendering without a game library." |
| 2048 | "A classic arcade game with a modern twist" | "React implementation of the 2048 sliding-tile puzzle. Handles tile merging logic, keyboard and touch input, and win/loss detection." |
| Frogger | "A classic arcade game with a modern twist" | "Vanilla JavaScript Frogger clone with sprite-based animation, collision detection, and increasing difficulty levels." |
| Juego 15 | "A sliding puzzle game with a twist" | "Browser-based 15-puzzle with randomized board generation, move counter, and solvability checking." |
| Tetris | "A classic arcade game with a modern twist" | "Vanilla JavaScript Tetris with piece rotation, line clearing, and level-based speed progression." |

---

## 8. Accessibility Requirements

All items are requirements, not suggestions. Each maps to a WCAG 2.1 SC.

| # | Requirement | WCAG SC | Affected files |
|---|---|---|---|
| A-01 | One `<h1>` per page, no skipped heading levels | 1.3.1 | `Header.tsx`, `projects/page.tsx` |
| A-02 | All `<button>` elements have accessible names via `aria-label` or visible text | 4.1.2 | `DarkModeButton.tsx`, `Navbar.tsx` |
| A-03 | All icon-only links have `aria-label` | 4.1.2 | `HeaderIcon.tsx`, `ProjectSwiper.tsx` |
| A-04 | All decorative icons have `aria-hidden="true"` | 1.1.1 | All components with icons in interactive elements |
| A-05 | All images have descriptive `alt` text; decorative images have `alt=""` | 1.1.1 | `Header.tsx`, `ProjectSwiper.tsx` |
| A-06 | Navigation drawer: `role="dialog"`, `aria-modal="true"`, `aria-hidden` when closed | 4.1.2 | `Navbar.tsx` |
| A-07 | Hamburger button: `aria-expanded`, `aria-controls` | 4.1.2 | `Navbar.tsx` |
| A-08 | Focus trap in nav drawer while open | 2.1.2 | `Navbar.tsx` |
| A-09 | Escape key closes drawer and returns focus to trigger | 2.1.1 | `Navbar.tsx` |
| A-10 | All interactive elements have visible focus indicators | 2.4.7 | `globals.css` |
| A-11 | Skip-to-main link as first focusable element | 2.4.1 | `layout.tsx` |
| A-12 | Minimum tap target 44×44px for all touch targets | 2.5.5 | `Navbar.tsx`, `DarkModeButton.tsx` |
| A-13 | Color contrast ≥ 4.5:1 for normal text, ≥ 3:1 for large text | 1.4.3 | Verify all text/bg combinations listed in `requirements.md` |
| A-14 | All interactive elements operable by keyboard (Tab, Enter, Space) | 2.1.1 | Global |

---

## 9. Performance Requirements

| # | Requirement | Target | Rationale |
|---|---|---|---|
| P-01 | `me.jpg` / `me.webp` size | < 150 KB | 2.9 MB hero image causes LCP failure |
| P-02 | `elescapedelosnuevecirculos.webp` size | < 200 KB | 6.7 MB PNG is the worst single offender |
| P-03 | All other project images | < 200 KB each | Aggregate download weight for the projects page |
| P-04 | LCP | < 2.5s on 4G | Core Web Vitals passing threshold |
| P-05 | CLS | < 0.1 | All `<Image>` elements use `fill` or explicit `width`+`height` |
| P-06 | FCP | < 1.8s | First meaningful paint |
| P-07 | All images in WebP format | — | 25–35% smaller than JPEG/PNG at equivalent quality |
| P-08 | Hero image uses `priority` | — | Already correct; must be preserved |
| P-09 | No new client-side dependencies > 20 KB gzipped | — | Bundle size discipline |
| P-10 | react-icons imports remain named (not wildcard) | — | Already correct; must be preserved |
| P-11 | Swiper: only `EffectFade` and `Mousewheel` modules imported | — | Already correct; must be preserved |

Image conversion must happen before committing updated images. Acceptable tools: `cwebp`, `squoosh` CLI, `sharp`. The JSON files must be updated to reference `.webp` filenames when images are renamed.

---

## 10. SEO Requirements

| # | Requirement | Implementation |
|---|---|---|
| S-01 | `layout.tsx`: title template `"%s | Antonio Zarco"` | Update `metadata` in `layout.tsx` |
| S-02 | `layout.tsx`: corrected description (no "Portafolio") | Update `metadata.description` |
| S-03 | `layout.tsx`: `metadataBase` set to canonical URL | `new URL("https://jzarcoo.github.io/zarco")` |
| S-04 | `page.tsx` (home): full OG tags + Twitter card | Add `openGraph` and `twitter` to `metadata` export |
| S-05 | `projects/page.tsx`: `metadata` export with title + description | Add `export const metadata` |
| S-06 | OG image: `public/og-image.png`, 1200×630px | Create branded image |
| S-07 | `public/robots.txt` | `User-agent: *\nAllow: /\nSitemap: .../sitemap.xml` |
| S-08 | `public/sitemap.xml` | Two entries: `/` and `/projects` |
| S-09 | JSON-LD `Person` schema on home page | `<script type="application/ld+json">` in Server Component |
| S-10 | `<html lang="en">` preserved | Already correct; do not change |

---

## 11. Testing Strategy

This is a static portfolio with no business logic. The testing strategy is therefore focused on correctness and quality, not unit or integration tests of application logic.

### Manual testing checklist (before every deploy)

**Functionality**
- [ ] Dark mode toggles correctly on `/`
- [ ] Dark mode preference persists when navigating `/` → `/projects` → `/`
- [ ] Dark mode preference persists on page reload (localStorage)
- [ ] All four navbar links navigate to the correct destination
- [ ] All project repo links and site links open the correct URLs in a new tab
- [ ] `repoLink === siteLink` cards show only one link icon (no duplicate paperclip)

**Accessibility**
- [ ] Tab through entire home page: every interactive element is reachable in logical order
- [ ] Tab through entire projects page: same
- [ ] Focus indicator is visible on all interactive elements
- [ ] Hamburger menu: Tab into drawer, Escape closes, focus returns to hamburger
- [ ] Skip link appears on first Tab and skips to main content
- [ ] Run axe DevTools (browser extension) on both pages; zero critical violations
- [ ] Test with VoiceOver (macOS) or NVDA (Windows): heading navigation, button announcements

**Responsive**
- [ ] 320px: no horizontal scroll, all content readable, card not clipped
- [ ] 375px: same
- [ ] 768px: same
- [ ] 1440px: same
- [ ] Profile photo scales down correctly on mobile

**Performance**
- [ ] Run Lighthouse on production URL (not localhost) — score targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 95
- [ ] Verify all images are in WebP format and under target sizes (`ls -lh public/*.webp`)
- [ ] Verify LCP element is the profile photo and it uses `priority`

**SEO**
- [ ] Open deployed URL in `https://developers.facebook.com/tools/debug/` — OG preview correct
- [ ] View page source: `<title>`, `<meta name="description">`, `<link rel="canonical">` present
- [ ] `robots.txt` accessible at `/zarco/robots.txt`
- [ ] JSON-LD in `<head>`: validate at `https://validator.schema.org/`

**Build**
- [ ] `npm run lint` — zero errors
- [ ] `npm run build` — zero TypeScript errors, zero build errors

### Automated lint check

ESLint (`npm run lint`) is the only automated check currently in the project. It must pass with zero errors. This is enforced in CI via the GitHub Actions workflow.

If a test framework is added in future, the standard choice for this stack is **Playwright** (for end-to-end tests) or **Vitest** (for unit tests of any utility functions added). Do not add a testing framework for this spec — the manual checklist is sufficient for a static portfolio.

---

## 12. Implementation Tasks

Each task is atomic — it can be completed, reviewed, and committed independently. Tasks are ordered by dependency: each task's prerequisites are listed.

| # | Task | Classification | Depends on | Files changed |
|---|---|---|---|---|
| T-01 | Compress and convert all images to WebP | Critical | — | `public/*.{jpg,png,jpeg}` → `public/*.webp` |
| T-02 | Update JSON files to reference `.webp` filenames | Critical | T-01 | `public/*/**.json` |
| T-03 | Update `Header.tsx` photo import to reference new WebP filename | Critical | T-01 | `Header.tsx` |
| T-04 | Create `src/components/Providers.tsx` with `ThemeProvider` | Critical | — | new file |
| T-05 | Update `layout.tsx`: add `Providers`, skip link, updated metadata, JSON-LD | Critical | T-04 | `layout.tsx` |
| T-06 | Update `DarkModeButton.tsx`: `<button>`, `useTheme`, `aria-label`, focus styles | Critical | T-04 | `DarkModeButton.tsx` |
| T-07 | Update `page.tsx` (home): remove dark mode state, add `id="main-content"`, add metadata | Critical | T-05, T-06 | `page.tsx` |
| T-08 | Update `projects/page.tsx`: remove dark mode state, fix headings, add `id="main-content"`, add metadata | Critical | T-05, T-06 | `projects/page.tsx` |
| T-09 | Update `Header.tsx`: fix heading levels, rewrite bio, fix alt text, fix icon gaps | High | — | `Header.tsx` |
| T-10 | Update `HeaderIcon.tsx`: add `ariaLabel` prop, apply to `<a>` | High | — | `HeaderIcon.tsx` |
| T-11 | Update `Navbar.tsx`: aria attributes, focus trap, Escape handler, tap target size | High | — | `Navbar.tsx` |
| T-12 | Add global focus indicator to `globals.css` | High | — | `globals.css` |
| T-13 | Rename `ProjectSwipper.tsx` → `ProjectSwiper.tsx`, fix accessibility in Slide, fix card width, hide duplicate link | High | — | `ProjectSwiper.tsx`, `projects/page.tsx` |
| T-14 | Rewrite all project descriptions in JSON files | High | — | all three JSON files |
| T-15 | Create `src/components/Specializations.tsx` with hardcoded content | High | — | new file |
| T-16 | Add `<Specializations />` to `Header.tsx` below photo | High | T-15 | `Header.tsx` |
| T-17 | Create `public/robots.txt` | Medium | — | new file |
| T-18 | Create `public/sitemap.xml` | Medium | — | new file |
| T-19 | Create `public/og-image.png` (1200×630) | Medium | — | new file |
| T-20 | Clean up `package.json`: remove `gh-pages`, dead scripts | Medium | — | `package.json` |
| T-21 | Upgrade `react`, `react-dom`, `@types/react` to stable React 19 | Medium | — | `package.json` |
| T-22 | Delete `tailwind.config.js` (duplicate) | Low | — | delete file |
| T-23 | Remove dead `background`/`foreground` color extensions from `tailwind.config.ts` | Low | — | `tailwind.config.ts` |

### Recommended execution order

**Phase 1 — Critical fixes (unblock the site)**
T-01 → T-02 → T-03 (images first, unblocks performance)
T-04 → T-05 → T-06 → T-07 → T-08 (dark mode fix, layout, pages)

**Phase 2 — Accessibility and content**
T-09, T-10, T-11, T-12, T-13 (can be done in parallel)
T-14 (content rewrites — independent)
T-15 → T-16 (specializations section)

**Phase 3 — SEO and housekeeping**
T-17, T-18, T-19 (independent of each other)
T-20, T-21, T-22, T-23 (cleanup)

---

## What Is Not Changing

The following are explicitly out of scope for this specification:

- The two-page routing structure (`/` and `/projects`) — preserved as-is
- The Swiper carousel layout and behavior on the projects page — preserved
- The hamburger drawer navigation pattern — preserved (only accessibility attributes added)
- The teal/gray color palette — preserved
- The Geist font family — preserved
- The gradient teal ring on the profile photo — preserved
- The full-screen slide layout in `ProjectSwiper` — preserved
- The tech stack badge (teal pill) design in `Logos` — preserved
- The GitHub Actions deployment workflow — unchanged
- The `output: "export"` + GitHub Pages hosting strategy — unchanged
- The JSON-file data layer — format preserved, only content improved
