# Requirements Steering

## Accessibility

The site must meet **WCAG 2.1 Level AA**. The following requirements address known gaps identified in the existing codebase.

### Interactive Elements

- Every `<button>` must have an accessible name via visible text or `aria-label`.
  - `DarkModeButton`: must be a `<button>` element with `aria-label="Toggle dark mode"` (or equivalent). The current implementation uses a raw icon with an `onClick` on a `div` — this must be corrected.
  - Hamburger menu button: must have `aria-label="Open navigation menu"` and `aria-expanded={isOpen}`.
  - Close button inside the drawer: must have `aria-label="Close navigation menu"`.
- Every icon-only link must have `aria-label` describing the destination.
  - `HeaderIcon` links (LinkedIn, GitHub, Email) must have `aria-label` in addition to `title`. Example: `aria-label="Visit Antonio's LinkedIn profile"`.
  - GitHub and site links inside project cards must have `aria-label` describing the specific project. Example: `aria-label="View Maze Simulator on GitHub"`.

### Keyboard Navigation

- All interactive elements must be reachable and operable via keyboard (Tab, Enter, Space, Escape).
- The navigation drawer must implement a **focus trap** while open: Tab cycles only through elements inside the drawer; Escape closes the drawer and returns focus to the hamburger button.
- Visible focus indicators are required on all interactive elements. Define focus styles using `focus-visible:outline` or `focus-visible:ring` utilities. Do not rely on browser defaults alone (Tailwind's base reset removes them).

### Heading Hierarchy

- Each page must have exactly one `<h1>`. It must be the primary identifying heading for that page.
  - Home page (`/`): The name "Antonio Zarco" is the `<h1>`. The current `<h2>` must be promoted to `<h1>`, and "Computer Scientist" becomes `<h2>`.
  - Projects page (`/projects`): "Projects" is the `<h1>`. Section headings "Machine Learning" and "Games" are `<h2>`.
- Do not skip heading levels (e.g., `<h1>` followed by `<h3>` with no `<h2>`).

### Images

- All `<Image>` components must have meaningful `alt` text.
  - Profile photo: `alt="Antonio Zarco"` (not `alt="me"`).
  - Project screenshots: `alt` must describe the project, e.g., `alt="Screenshot of Maze Simulator"`. The `title` field from the JSON is an acceptable `alt` value.
- Decorative images (if any) must use `alt=""`.

### Semantic HTML

- The navigation drawer must use `role="dialog"` and `aria-modal="true"` when open, or be converted to a `<nav>` element that is always in the DOM but hidden with CSS transforms (current approach). If keeping the transform approach, add `aria-hidden={!isOpen}` to the drawer to hide it from assistive technology when closed, and remove `aria-hidden` when open.
- Landmark regions should be present: `<header>`, `<nav>`, `<main>`, `<footer>`. All are currently used correctly except that `<main>` lacks `id="main-content"` for a skip link (see below).
- Add a **skip-to-main-content link** as the first focusable element in the page. It should be visually hidden by default and revealed on focus.

### Color Contrast

- All text must meet minimum contrast ratios:
  - Normal text (< 18pt / < 14pt bold): 4.5:1
  - Large text (≥ 18pt / ≥ 14pt bold): 3:1
- Verify these specific combinations before shipping:
  - `text-teal-600` on `bg-gray-200` (light mode headings)
  - `dark:text-teal-400` on `dark:bg-gray-900` (dark mode headings)
  - `text-gray-800` on `bg-gray-200` (body text, light)
  - `dark:text-gray-300` on `dark:bg-gray-900` (body text, dark)
  - `text-gray-100` on `bg-teal-600` (tech stack badges)

---

## Responsive Design

The site must be usable and visually correct at all viewport widths from 320px to 1920px.

### Breakpoint Strategy

Use Tailwind's **mobile-first** approach. Add responsive variants in this order: default (mobile) → `sm:` (640px) → `md:` (768px) → `lg:` (1024px).

Currently the codebase only uses `md:` variants. The `sm:` breakpoint (480–767px) must be audited and addressed.

### Minimum Requirements by Component

**Navbar**
- The hamburger button tap target must be at least 44×44px (WCAG 2.5.5). Wrap the icon in a `<button>` with `p-2` or equivalent padding.
- The drawer must not overflow the viewport on any screen width. Max width: `w-60` (240px) is fine; verify on 320px screens.

**Header (hero)**
- Profile photo: `w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96` — scale down on narrow viewports.
- Social icon row: `gap-8 sm:gap-12 md:gap-16` — reduce gap on small screens to prevent overflow.
- Body text: must not overflow or cause horizontal scroll on 320px viewports.

**ProjectSwipper / Slide**
- The project info card must be readable and fully visible on all screen sizes. On viewports narrower than `sm`, the card should use `w-[90vw]` or similar relative sizing instead of the fixed `max-w-sm`.
- On touch devices, the swiper's vertical touch behavior must not break page scroll. The `touchStartPreventDefault={false}` setting is correct; document why it is set.

**Footer**
- On the Projects page, the footer must not be obscured by or overlap the Swiper. Ensure the Swiper container's height does not bleed over the footer.

### Testing Targets

Test at these viewport widths:
- 320px (smallest supported mobile)
- 375px (iPhone SE)
- 390px (iPhone 14)
- 768px (iPad portrait)
- 1024px (iPad landscape / small laptop)
- 1440px (standard desktop)

---

## Performance

### Image Optimization (Critical)

Because `images: { unoptimized: true }` is required for static export, all optimization must happen at source. This is a hard requirement — no exceptions.

| Image | Current size | Target size | Format |
|---|---|---|---|
| `me.jpg` | 2.9 MB | < 150 KB | WebP |
| `elescapedelosnuevecirculos.png` | 6.7 MB | < 200 KB | WebP |
| `fakenewsdetection.png` | 326 KB | < 150 KB | WebP |
| `mazesimulator.png` | 316 KB | < 150 KB | WebP |
| `kanjiji.png` | 151 KB | < 100 KB | WebP |
| All other images | — | < 150 KB | WebP or JPEG |

Acceptable compression tools: `cwebp`, `squoosh`, `sharp`, or any lossless/lossy compressor that meets the targets without visible quality degradation at the intended display size.

### Bundle Size

- Do not import entire libraries. All `react-icons` imports are already named — maintain this.
- Swiper: only import the modules actually used (`EffectFade`, `Mousewheel`). Do not import `swiper/css/bundle`.
- If a new dependency adds > 20 KB (gzipped) to the client bundle, it must be justified.

### Loading Performance Targets

- **Largest Contentful Paint (LCP):** < 2.5 seconds on a simulated 4G connection.
- **Cumulative Layout Shift (CLS):** < 0.1. All images must have explicit `width` and `height` props on `<Image>` (or use `fill` correctly) to prevent layout shifts.
- **First Contentful Paint (FCP):** < 1.8 seconds.

### Lazy Loading

- The hero profile photo uses `priority` — this is correct. It is the LCP element.
- Project images do not need `priority`. They will be lazy-loaded by default via `next/image`.
- The two lower swiper sections (`#machine-learning`, `#games`) on the Projects page should not initialize their Swiper instances until they are scrolled into view. Use `IntersectionObserver` or a lazy wrapper to defer initialization.

### Resource Hints

- Add `<link rel="preconnect">` for any external origins (currently none, but if CDN assets are added later).
- Fonts are local — no preconnect needed. Font loading is handled optimally by `next/font/local`.

---

## SEO

### Metadata (Required on Every Page)

Each page must export a `metadata` object from its `page.tsx` file. The root `layout.tsx` provides defaults; pages override them.

**Root layout (`layout.tsx`) — defaults:**
```typescript
export const metadata: Metadata = {
  title: {
    template: "%s | Antonio Zarco",
    default: "Antonio Zarco — Computer Scientist",
  },
  description: "Portfolio of Antonio Zarco, computer scientist specializing in web development, AI, and cybersecurity.",
  metadataBase: new URL("https://jzarcoo.github.io/zarco"), // adjust to actual URL
};
```

**Home page (`page.tsx`):**
```typescript
export const metadata: Metadata = {
  title: "Antonio Zarco — Computer Scientist",
  description: "Personal portfolio of Antonio Zarco ...",
  openGraph: {
    title: "Antonio Zarco — Computer Scientist",
    description: "...",
    url: "https://jzarcoo.github.io/zarco",
    siteName: "Antonio Zarco",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antonio Zarco — Computer Scientist",
    description: "...",
    images: ["/og-image.png"],
  },
};
```

**Projects page (`projects/page.tsx`):**
```typescript
export const metadata: Metadata = {
  title: "Projects",
  description: "Software projects, machine learning research, and games by Antonio Zarco.",
};
```

### Open Graph Image

- Create a 1200×630px OG image (`public/og-image.png`) for social sharing previews.
- Content: name, title, and a simple branded design consistent with the teal/dark palette.

### Other SEO Requirements

- Fix the metadata description typo: `"Portafolio"` → `"Portfolio"`.
- `<html lang="en">` is correct and must be preserved.
- Add `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://jzarcoo.github.io/zarco/sitemap.xml
  ```
- Add `public/sitemap.xml` listing the two routes (`/` and `/projects`) with `<lastmod>` and `<priority>`.
- Add JSON-LD structured data (`Person` schema) to the home page for rich search results:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Antonio Zarco",
    "url": "https://jzarcoo.github.io/zarco",
    "sameAs": [
      "https://www.linkedin.com/in/antoniozarco/",
      "https://github.com/jzarcoo"
    ],
    "jobTitle": "Computer Scientist"
  }
  ```

### Language

- The primary site language is English (`lang="en"`).
- Project titles and descriptions in Spanish (e.g., "El Escape de los Nueve Círculos") are acceptable as proper names. Do not add `lang` attributes to individual text nodes for this purpose.
