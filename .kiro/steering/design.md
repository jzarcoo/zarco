# Detailed Design Document

## What Is Being Preserved

Before listing changes, these things are **not changing**. They work well and define the visual identity:

- Teal/gray color palette (`teal-400/600/900`, `gray-200/800/900`) — coherent, distinctive, professional
- Geist Sans + Geist Mono typeface pair — clean, technical, modern
- Hamburger drawer navigation — distinctive and functional
- Gradient teal ring on the profile photo — a strong visual anchor
- Full-screen Swiper slide layout for projects — immersive, scroll-jacked experience that differentiates the portfolio
- Blurred background + sharp foreground image technique in slides — visually effective
- Teal pill badges for tech stack — consistent with the accent color system
- `transition-all duration-300` hover pattern — present throughout, keep it
- Dark mode class strategy — keep `darkMode: "class"` in Tailwind, keep the dark/light palette split as-is

---

## Design Token System

All values below are expressed as Tailwind classes derived from the **existing** palette. No new colors are introduced.

### Colors

```
Background (page)
  Light:  bg-gray-200       (#e5e7eb)
  Dark:   bg-gray-900       (#111827)

Surface (cards, panels)
  Light:  bg-gray-100       (#f3f4f6)
  Dark:   bg-gray-800       (#1f2937)

Surface hover
  Light:  bg-gray-50        (#f9fafb)
  Dark:   bg-gray-700       (#374151)

Border
  Light:  border-gray-200   (#e5e7eb)
  Dark:   border-gray-700   (#374151)

Text — primary
  Light:  text-gray-900     (#111827)
  Dark:   text-gray-200     (#e5e7eb)

Text — secondary
  Light:  text-gray-600     (#4b5563)
  Dark:   text-gray-400     (#9ca3af)

Text — muted
  Light:  text-gray-500     (#6b7280)
  Dark:   text-gray-500     (#6b7280)

Accent — text
  Light:  text-teal-600     (#0d9488)
  Dark:   text-teal-400     (#2dd4bf)

Accent — background
  Both:   bg-teal-600       (#0d9488)

Accent — strong (nav drawer)
  Both:   from-teal-900     (#134e4a)

Focus ring
  Both:   outline-teal-400  (#2dd4bf)  — 2px solid, 2px offset
```

### Typography

All type is Geist Sans except the footer, which uses Geist Mono. No new fonts.

```
Name / h1 (hero)
  Mobile:   text-5xl font-medium              (48px, 500)
  Desktop:  md:text-6xl                       (60px, 500)
  Color:    text-teal-600 dark:text-teal-400

Role / h2 (hero)
  Mobile:   text-2xl                          (24px)
  Desktop:  md:text-3xl                       (30px)
  Color:    text-gray-900 dark:text-gray-200

Bio / p
  Mobile:   text-base leading-8              (16px, 2rem line-height)
  Desktop:  md:text-xl                        (20px)
  Color:    text-gray-800 dark:text-gray-300
  Max-width: max-w-xl mx-auto

Section heading (projects page) / h1 or h2
  Both:     text-4xl font-bold               (36px, 700)
  Color:    text-teal-600

Specialization label
  Both:     text-sm font-semibold uppercase tracking-wider   (14px, 600, spaced)
  Color:    text-teal-600 dark:text-teal-400

Specialization evidence
  Both:     text-sm leading-relaxed          (14px, 1.625)
  Color:    text-gray-600 dark:text-gray-400

Project card title / h2 or h3
  Both:     text-2xl font-bold tracking-tight  (24px, 700)
  Color:    text-teal-500 dark:text-teal-400

Project card description
  Both:     text-sm leading-relaxed          (14px, 1.625)
  Color:    text-gray-600 dark:text-gray-400

Navbar links
  Both:     text-2xl                          (24px)
  Color:    text-gray-200
  Hover:    text-teal-400

Footer
  Both:     font-[family-name:var(--font-geist-mono)] text-sm
  Color:    text-gray-600 dark:text-gray-400
```

### Spacing

The existing site uses Tailwind's default scale. Preserve it. Key values:

```
Page horizontal padding:   px-6
Hero vertical padding:     py-2 (per element), my-20 (photo)
Section spacing:           mb-20 (first), m-20 (subsequent)
Card padding:              p-6
Card gap (badges):         gap-2
Icon row gap:              gap-8 sm:gap-12 md:gap-16   (updated from gap-16)
Nav drawer padding:        p-6, pt-20 (list)
Nav item spacing:          space-y-8
```

### Border Radius

```
Cards:        rounded-lg
Badges:       rounded-full
Photo:        rounded-full
Nav drawer:   no radius (edge-to-edge)
Buttons:      rounded-md (for new button elements)
Skip link:    rounded
```

### Shadows

```
Card:         shadow-md shadow-gray-800 dark:shadow-gray-800   (existing, keep)
Icon hover:   hover:shadow-lg hover:shadow-[teal]              (existing, keep)
Focus ring:   outline-2 outline-offset-2 outline-teal-400      (new, global)
```

### Transitions

All existing transitions use `duration-300 ease-in-out`. New elements must match this:
```
Standard:     transition-all duration-300
Transform:    transition-transform duration-300 ease-in-out
Colors:       transition-colors duration-200
```

---

## 1. Layout

### Global page layout

**What exists:** Each page has a root `<div>` applying dark mode class, inside which a second `<div>` applies colors and font. `Navbar` is fixed (drawer). `<main>` takes the remaining space. `DarkModeButton` is fixed bottom-right. `Footer` is at the bottom.

**What changes:** The dark mode wrapper `<div className={darkMode ? "dark" : ""}>` is removed from both pages. `next-themes` applies `dark` to `<html>`. The second wrapper `<div className="text-gray-900 dark:text-gray-200 dark:bg-gray-900 bg-gray-200 ...">` is promoted to the direct page root. A `<Providers>` wrapper is added in `layout.tsx` around `{children}`.

**Why:** Dark mode state lives in the layout, not per-page, so it persists across navigation. No visual change to the layout itself.

```
<html class="dark">                         ← next-themes applies here
  <body>
    <SkipLink />                            ← new, first focusable element
    <Providers>                             ← new ThemeProvider wrapper
      <div class="text-gray-900 dark:text-gray-200 ...">   ← existing, now page root
        <Navbar />
        <main id="main-content">
          {page content}
        </main>
        <DarkModeButton />
        <Footer />
      </div>
    </Providers>
  </body>
</html>
```

### Home page layout

**What exists:** Single `<header>` inside `<main>`, centered with `grid place-items-center min-h-screen`. All content in one `text-center` div.

**What changes:** The `<header>` retains `min-h-screen grid place-items-center` for the above-fold content. Below the profile photo, a new `<section id="specializations">` is appended — still inside the centered div, but it breaks out of the strict `min-h-screen` constraint. The page now scrolls.

```
<main id="main-content">
  <header class="min-h-screen grid place-items-center">
    <div class="text-center px-6">
      <h1>Antonio Zarco</h1>
      <h2>CS Student</h2>
      <p>bio</p>
      <div>social icons</div>
      <div>profile photo</div>
      <Specializations />         ← new, below photo, inside same centered container
    </div>
  </header>
</main>
```

The `<header>` element's `min-h-screen` means the name/title/bio/photo fills the first viewport. The Specializations section appears naturally below when the user scrolls. No JS scroll required — the vertical rhythm handles it.

### Projects page layout

**What exists:** `<main class="pt-5">` with three `<section>` elements each containing an `<h1>` and a `<ProjectSwipper>`. Each swiper is `min-h-screen max-h-screen`.

**What changes:** Section headings corrected to `<h1>` (Projects), `<h2>` (ML), `<h2>` (Games). No layout change.

---

## 2. Spacing

### Hero section

```
Name (h1):          py-2
Role (h2):          py-2
Bio (p):            py-2 (currently implicit, make explicit)
Icon row:           py-3
Photo:              my-16 md:my-20   (reduce slightly on mobile, keeps it from dominating)
Specializations:    pt-8 pb-16       (breathing room below photo, generous bottom padding)
```

### Specializations grid

```
Grid gap:           gap-x-8 gap-y-6
Item:               no extra padding (text only)
Label:              mb-1 (tight spacing between label and evidence)
CTA link:           mt-10 (clear separation from grid)
```

### Projects page sections

```
Section heading:    mb-20 (first), m-20 (rest) — existing, keep
```

### Project card

```
Card padding:       p-6 (existing, keep)
Card min-width:     w-[90vw] max-w-sm (change from max-w-sm alone)
Title margin:       mb-2 (existing, keep)
Description margin: mb-0 (existing, keep)
Badges margin:      mt-4 (existing, keep)
Link icons:         top-4 right-4 / top-4 right-12 (existing, keep)
```

---

## 3. Component Hierarchy

```
RootLayout (Server Component)
  ├── SkipLink (new, inline in layout or separate component)
  ├── Providers (new, "use client", wraps ThemeProvider)
  │     └── {children}
  │           ├── page.tsx (Home) — Server Component after refactor
  │           │     └── <div> (page root with colors)
  │           │           ├── Navbar ("use client" — has useState)
  │           │           │     └── NavbarItem (×4)
  │           │           ├── <main id="main-content">
  │           │           │     └── Header (Server Component)
  │           │           │           ├── <h1> name
  │           │           │           ├── <h2> role
  │           │           │           ├── <p> bio
  │           │           │           ├── <div> social icons
  │           │           │           │     └── HeaderIcon (×3) — props updated
  │           │           │           ├── <div> photo
  │           │           │           └── Specializations (new, Server Component)
  │           │           ├── DarkModeButton ("use client" — uses useTheme)
  │           │           └── Footer
  │           │
  │           └── projects/page.tsx — Server Component after refactor
  │                 └── <div> (page root with colors)
  │                       ├── Navbar
  │                       ├── <main id="main-content">
  │                       │     ├── <section id="projects">
  │                       │     │     └── ProjectSwiper (projects.json)
  │                       │     ├── <section id="machine-learning">
  │                       │     │     └── ProjectSwiper (machinelearning.json)
  │                       │     └── <section id="games">
  │                       │           └── ProjectSwiper (games.json)
  │                       ├── DarkModeButton
  │                       └── Footer
```

---

## 4. Navigation Design

### Hamburger button

**What exists:** `<button>` at `fixed top-6 left-6 z-50`, `text-3xl`, color conditional: `text-gray-900 dark:text-gray-200` when closed, no color override when open. Icon: `AiOutlineMenu`. No aria attributes. No padding.

**What changes:**
- Add `p-2` for a minimum 44px tap target (icon is `text-3xl` = 30px; with `p-2` = 8px each side, total ≈ 46px ✓)
- Add `aria-label="Open navigation menu"`, `aria-expanded={isOpen}`, `aria-controls="nav-drawer"`
- Add `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 rounded-md`
- Keep existing color logic and hover: `hover:text-teal-400`
- Keep `z-50`, `fixed top-6 left-6`

**Why:** Tap target too small on mobile. No accessible name. No focus indicator.

```tsx
<button
  onClick={() => setIsOpen(!isOpen)}
  aria-label="Open navigation menu"
  aria-expanded={isOpen}
  aria-controls="nav-drawer"
  className={`fixed top-6 left-6 z-50 p-2 rounded-md text-3xl
    hover:text-teal-400 transition-colors duration-200
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400
    ${isOpen ? "text-gray-200" : "text-gray-900 dark:text-gray-200"}`}
>
  <AiOutlineMenu aria-hidden="true" />
</button>
```

### Drawer panel

**What exists:** `fixed top-0 left-0 w-60 h-full p-6`, `bg-gradient-to-b from-teal-900 to-transparent`, slide-in/out via `translate-x-0 / -translate-x-full transition-transform duration-300 ease-in-out`, `z-40`. Contains close button and `<ul>` of links.

**What changes:**
- Add `id="nav-drawer"`, `role="dialog"`, `aria-modal="true"`, `aria-label="Navigation"`
- Add `aria-hidden={!isOpen}` — hides from assistive technology when closed
- Add `tabIndex={-1}` — makes the panel itself programmatically focusable for focus management
- No visual changes to the panel itself

**Why:** Screen readers currently encounter all drawer links regardless of whether the drawer is open.

### Close button

**What exists:** `<button>` at `absolute top-6 right-6`, `text-3xl`, `hover:text-teal-400`. No aria label.

**What changes:**
- Add `aria-label="Close navigation menu"`
- Add `focus-visible` styles
- Add `p-2` for tap target

```tsx
<button
  onClick={() => setIsOpen(false)}
  aria-label="Close navigation menu"
  className="text-3xl absolute top-6 right-6 p-2 rounded-md
    hover:text-teal-400 transition-colors duration-200
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
>
  <AiOutlineClose aria-hidden="true" />
</button>
```

### Focus trap

**What exists:** None.

**What changes:** When `isOpen` becomes true, a `useEffect` in `Navbar`:
1. Moves focus into the drawer (to the close button or first NavbarItem)
2. Adds a `keydown` listener that intercepts Escape (closes drawer, returns focus to hamburger)
3. Intercepts Tab to cycle focus within the drawer

Implementation uses native DOM `querySelectorAll` to collect focusable elements — no new library.

```tsx
useEffect(() => {
  if (!isOpen) return;
  const drawer = document.getElementById("nav-drawer");
  const focusable = drawer?.querySelectorAll<HTMLElement>(
    'a, button, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable?.[0];
  const last = focusable?.[focusable.length - 1];
  first?.focus();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      hamburgerRef.current?.focus();
    }
    if (e.key === "Tab") {
      if (!focusable || focusable.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
  };
  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
}, [isOpen]);
```

`hamburgerRef` is a `useRef<HTMLButtonElement>` attached to the hamburger button.

### Backdrop

**What exists:** `fixed` black div with `opacity-60`, full viewport, closes on click.

**What changes:** Add `aria-hidden="true"` (it is purely visual). No other changes.

### NavbarItem

**What exists:** `<Link>` with `text-2xl hover:text-teal-400`. No focus styles.

**What changes:**
- Add `focus-visible:text-teal-400 focus-visible:underline` (or covered by global focus rule in `globals.css`)
- No structural changes

---

## 5. Home Page — Hero Section Design

### Name (h1)

**What exists:** `<h2 className="py-2 md:text-6xl text-5xl text-teal-600 font-medium dark:text-teal-400">`

**What changes:** Element changes from `h2` → `h1`. Classes are **identical**. No visual change.

**Why:** There is no `<h1>` on the home page. This is the only element that qualifies.

### Role (h2)

**What exists:** `<h3 className="py-2 text-2xl md:text-3xl">`

**What changes:**
- Element changes from `h3` → `h2`
- Text changes from `"Computer Scientist"` → `"CS Student · UNAM"` — more accurate and signals university context for internship recruiters

**Why:** Incorrect heading level. "Computer Scientist" implies a professional title, not a student.

### Bio paragraph

**What exists:** `"Web developer with a passion for programming, AI, and cybersecurity. Join me down below and let's get cracking!"`

**What changes:** Replaced with:
`"CS student at UNAM building systems across algorithms, machine learning, and computer vision."`

Same element, same classes. One sentence, specific, no unsupported adjectives.

**Why:** Current bio is generic and casual. The word "passion" is the single most over-used phrase in developer portfolios. "Let's get cracking" is informal in a context where the primary readers are hiring managers.

### Social icon row

**What exists:** `<div class="text-5xl flex justify-center gap-16 py-3 dark:text-gray-300">` with three `<HeaderIcon>` components.

**What changes:**
- `gap-16` → `gap-8 sm:gap-12 md:gap-16` — prevents overflow at 320px
- Each `HeaderIcon` receives a new `ariaLabel` prop

**Why:** On a 320px viewport, three icons at `text-5xl` (48px) with `gap-16` (64px) = 3×48 + 2×64 = 272px minimum, which overflows. Reducing gap to `gap-8` (32px) = 3×48 + 2×32 = 208px — fits comfortably.

### Profile photo

**What exists:** `<div class="mx-auto bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 relative overflow-hidden my-20 md:h-96 md:w-96">` containing `<Image src={me} style={{ objectFit: 'cover' }} alt="me" priority />`

**What changes:**
- `alt="me"` → `alt="Antonio Zarco"`
- Size: `w-80 h-80` → `w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96`
- Margin: `my-20` → `my-12 md:my-20` — slightly tighter on mobile
- Image file: `me.jpg` → `me.webp` (after compression)

**Why:** `alt="me"` is not descriptive. The photo is 320px wide at default but the image file was 2.9 MB — must be compressed. Size steps prevent the photo from dominating on small screens.

The gradient ring (`bg-gradient-to-b from-teal-500 rounded-full overflow-hidden`) is the strongest visual element on the page. It is not changing.

---

## 6. Specializations Section Design

**What exists:** Nothing. The hero currently ends with the profile photo.

**What is being created:** A new `Specializations` component, appended inside the same `text-center` container in `Header.tsx`, below the photo.

### Layout

On desktop (`md:`): two-column grid.
On mobile: single column.

```
w-full max-w-2xl mx-auto
grid grid-cols-1 md:grid-cols-2
gap-x-8 gap-y-6
text-left
```

`text-left` overrides the parent's `text-center` for the grid items — evidence statements are prose and read better left-aligned. The grid itself is centered in the page via `mx-auto`.

### Each item

```
<div>
  <p class="text-sm font-semibold uppercase tracking-wider
            text-teal-600 dark:text-teal-400 mb-1">
    {label}
  </p>
  <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
    {evidence}
  </p>
</div>
```

No borders, no icons, no cards. Intentionally minimal — the teal label color provides the visual anchor, and the clean grid provides structure without adding visual weight.

**Why no icons per specialization area:** Icons introduce ambiguity (what does a "brain" icon mean vs. a "chip" icon for AI?). Labels in teal already establish the visual hierarchy. Adding icons would increase visual noise without adding information.

**Why not a card per item:** Cards add background color, border, padding, and shadow. At six items that is a lot of visual mass below the hero, and it would conflict with the cleaner look of the rest of the home page. Flat text with teal labels is lighter.

### CTA link

Below the grid:

```
<a href="/projects"
   class="inline-block mt-10 text-sm font-medium text-teal-600 dark:text-teal-400
          border border-teal-600 dark:border-teal-400
          px-5 py-2 rounded-md
          hover:bg-teal-600 hover:text-white dark:hover:bg-teal-400 dark:hover:text-gray-900
          transition-colors duration-200
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400">
  View projects →
</a>
```

**Why a border button (ghost style) rather than filled:** The filled teal is already used for the badge pills and the photo ring. Using it for the CTA too would devalue the accent. Ghost button (border only) creates a clear call to action without adding another filled teal element. On hover it fills — reward without noise.

**Why `inline-block` and not a `<Link>`:** Use Next.js `<Link>` (not `<a>`) for client-side navigation. `inline-block` is needed because the parent is `text-center`.

### Content

```typescript
const specializations = [
  {
    label: "Algorithms & Data Structures",
    evidence: "Implemented BFS, DFS, Prim's, and Kruskal's for maze generation and solving in Java.",
  },
  {
    label: "Machine Learning",
    evidence: "Fine-tuned BERT and trained CNN/LSTM models for fake news detection.",
  },
  {
    label: "Computer Vision",
    evidence: "Built a PyTorch CNN for kanji character recognition used in production.",
  },
  {
    label: "Software Engineering",
    evidence: "Designed concurrent systems using sockets, threads, and Observer/Publisher patterns.",
  },
  {
    label: "Web Development",
    evidence: "Shipped Kanji Ji — a full-stack dictionary with Next.js, React, and Supabase.",
  },
  {
    label: "Systems Programming",
    evidence: "Wrote a terminal-based maze game in C with custom rendering and memory management.",
  },
];
```

Six items, two columns on desktop = three rows. Balanced.

### Section heading

No heading above the grid. The profile photo is the visual separator — the grid flows naturally from the photo without needing a label like "What I do." The teal labels on each item are self-explanatory.

**Why no section `<h3>` heading:** Adding "What I specialize in" or "Focus areas" would be redundant narration. The items speak for themselves. It also avoids adding another heading level that would complicate the already-simple hierarchy.

---

## 7. DarkModeButton Design

**What exists:** `<div>` wrapper, `BsFillMoonStarsFill` icon with `onClick`, `fixed bottom-0 right-0 m-6 z-50 cursor-pointer text-2xl`.

**What changes:**

```tsx
<button
  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
  className="fixed bottom-6 right-6 z-50
             p-2 rounded-md
             text-gray-900 dark:text-gray-200
             hover:text-teal-400 dark:hover:text-teal-400
             transition-colors duration-200
             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
>
  <BsFillMoonStarsFill aria-hidden="true" className="text-2xl" />
</button>
```

Key changes:
- `<div>` → `<button>` — keyboard accessible
- `aria-label` is dynamic: reflects current state so the screen reader says "Switch to light mode" (not "Toggle dark mode" which tells you nothing about current state)
- `p-2` for ≥ 44px tap target
- Explicit `text-gray-900 dark:text-gray-200` + `hover:text-teal-400` — the existing icon had no color set, inheriting inconsistently
- `bottom-0 right-0 m-6` → `bottom-6 right-6` — same result, more explicit
- `focus-visible` styles

**Why not a sun/moon toggle:** The existing moon icon is recognizable. Swapping icons (moon ↔ sun) would be a nice improvement but it is a new icon import and a new visual element. For this spec, the existing icon is kept. The `aria-label` dynamically describes the action, so the visual ambiguity is an accessibility non-issue.

---

## 8. HeaderIcon Design

**What exists:**
```tsx
interface HeaderIconProps {
  icon: React.ReactNode;
  link: string;
  title: string;
}
// renders: <a class="hover:shadow-lg hover:shadow-[teal] hover:scale-105 ...">
```

**What changes:**

Add `ariaLabel` to the interface and apply it:

```tsx
interface HeaderIconProps {
  icon: React.ReactNode;
  link: string;
  title: string;
  ariaLabel: string;   // new
}

<a
  aria-label={ariaLabel}   // new
  className="hover:shadow-lg hover:shadow-[teal] hover:scale-105 transform transition-all duration-300
             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 rounded-sm"
  href={link}
  target="_blank"
  rel="noopener noreferrer"
  title={title}
>
  {icon}
</a>
```

Call sites in `Header.tsx`:
```tsx
<HeaderIcon
  icon={<AiFillLinkedin aria-hidden="true" />}
  link="https://www.linkedin.com/in/antoniozarco/"
  ariaLabel="Antonio Zarco on LinkedIn"
  title="antoniozarco"
/>
<HeaderIcon
  icon={<AiFillGithub aria-hidden="true" />}
  link="https://github.com/jzarcoo"
  ariaLabel="Antonio Zarco on GitHub"
  title="jzarcoo"
/>
<HeaderIcon
  icon={<AiFillMail aria-hidden="true" />}
  link="mailto:zarco@ieee.org"
  ariaLabel="Email Antonio Zarco"
  title="zarco@ieee.org"
/>
```

**Why keep `title`:** `title` provides a tooltip on hover. It remains for sighted users. `aria-label` overrides it for screen readers, which is correct.

Hover behavior (`hover:scale-105 hover:shadow-lg hover:shadow-[teal]`) is preserved exactly.

---

## 9. ProjectSwiper — Slide Card Design

### Card

**What exists:** `absolute max-w-sm p-6 bg-gray-100 border border-gray-200 rounded-lg shadow-md shadow-gray-800 dark:shadow-gray-800 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`

**What changes:**
- `max-w-sm` → `w-[90vw] max-w-sm` — responsive fix

Everything else stays identical. The card design is correct.

**Why:** `max-w-sm` alone = 384px maximum, no minimum. On a 320px screen, `absolute` + `max-w-sm` can produce overflow. `w-[90vw]` sets the width to 90% of viewport, capped at 384px.

### GitHub link

**What exists:** `<a href={repoLink} ...><FaGithub size={24} /></a>` — no accessible name.

**What changes:**
```tsx
<a
  href={repoLink}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={`View ${title} on GitHub`}
  className="absolute top-4 right-4 text-gray-600 dark:text-gray-400
             hover:text-gray-800 dark:hover:text-gray-200
             transition-colors duration-200
             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 rounded-sm"
>
  <FaGithub size={24} aria-hidden="true" />
</a>
```

### Site/demo link

**What exists:** `<a href={siteLink} ...><FaPaperclip size={24} /></a>` — no accessible name.

**What changes:**
- When `siteLink === repoLink`: render `null` — this is a dead duplicate. Removes the confusing paperclip icon.
- When `siteLink !== repoLink`: render with `aria-label`:

```tsx
{siteLink !== repoLink && (
  <a
    href={siteLink}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`View ${title} live demo`}
    className="absolute top-4 right-12 text-gray-600 dark:text-gray-400
               hover:text-gray-800 dark:hover:text-gray-200
               transition-colors duration-200
               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 rounded-sm"
  >
    <FaPaperclip size={24} aria-hidden="true" />
  </a>
)}
```

**Why hide duplicate:** Currently 9 of 13 projects have `siteLink === repoLink`. The paperclip icon is visible but links to the same place as the GitHub icon. A user who clicks it expecting a live demo gets the repo instead — a misleading affordance. Hiding it when there's no separate URL is more honest.

### Background images

**What exists:** Two stacked `<Image fill>` elements — one blurred (cover), one sharp (contain). Both have `alt={title}`.

**What changes:**
- Blurred image: `alt=""` (it is decorative — same image as the sharp one, just blurred for effect)
- Sharp image: `alt={title}` (keep — it is the primary image)

**Why:** Two images with the same `alt` text causes screen readers to announce the description twice. The blurred layer is purely cosmetic.

### Slide navigation indicators

**What exists:** No navigation indicators. Users do not know how many slides exist, what position they are at, or that scrolling will advance the slides.

**What changes:** Add a vertical dot indicator on the right side of each slide.

```tsx
// Inside ProjectSwiper, alongside the Swiper component
// Pass total and active index via Swiper's onSlideChange + useState
<div
  aria-hidden="true"
  className="absolute right-4 top-1/2 -translate-y-1/2 z-10
             flex flex-col gap-2"
>
  {projects.map((_, i) => (
    <span
      key={i}
      className={`block w-1.5 rounded-full transition-all duration-300
        ${i === activeIndex
          ? "h-6 bg-teal-400"
          : "h-1.5 bg-gray-400 dark:bg-gray-600"}`}
    />
  ))}
</div>
```

Active dot is elongated (taller, teal). Inactive dots are small circles (gray). The visual language is: current position is highlighted, others are available.

`aria-hidden="true"` because the dots are pure visual chrome — screen readers don't need them, and the Swiper manages its own position.

**Why this matters:** Without indicators, users on mobile have no affordance that there are more slides. The grab cursor works on desktop but not on touch. The indicators solve discoverability without requiring any interaction.

**No library needed:** Pure CSS + Tailwind with a `useSwiper` or `onSlideChange` callback.

---

## 10. Skip Link Design

**What exists:** None.

**What is created:**

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
             focus:z-[100] focus:px-4 focus:py-2
             focus:bg-teal-600 focus:text-white focus:text-sm
             focus:rounded focus:outline-none focus:shadow-lg"
>
  Skip to main content
</a>
```

Placed as the **first child of `<body>`** in `layout.tsx`. Visually hidden via `sr-only` until focused. On focus, appears top-left as a teal button above all content (`z-[100]`).

**Why `focus:not-sr-only`:** `sr-only` sets `position: absolute; clip: rect(0,0,0,0)`. `not-sr-only` removes those styles. Together, `sr-only focus:not-sr-only` is the standard pattern for skip links.

---

## 11. Focus State System

**What exists:** Tailwind base reset removes browser default focus outlines. No custom focus styles exist anywhere.

**What changes:** Add to `globals.css`:

```css
/* Global focus indicator — applies to all interactive elements via keyboard */
:focus-visible {
  outline: 2px solid #2dd4bf; /* teal-400 */
  outline-offset: 2px;
  border-radius: 4px;
}
```

This is the only addition to `globals.css`. It uses the existing teal-400 value. The `border-radius: 4px` softens the outline on rounded elements.

**Why `:focus-visible` not `:focus`:** `:focus-visible` only shows the outline when the element was reached via keyboard or programmatic focus — not when clicked with a mouse. This is the correct modern pattern. Mouse users don't need visible focus rings; keyboard users do.

**Individual overrides:** Components that need a tighter or different focus style (e.g., the DarkModeButton at the bottom-right corner) can use Tailwind `focus-visible:` utilities to override the global CSS. The global rule is the baseline.

---

## 12. Hover States

All existing hover states are preserved. New additions:

| Element | Hover state |
|---|---|
| Hamburger button | `hover:text-teal-400` — existing, keep |
| Close button | `hover:text-teal-400` — existing, keep |
| NavbarItem | `hover:text-teal-400` — existing, keep |
| HeaderIcon | `hover:scale-105 hover:shadow-lg hover:shadow-[teal]` — existing, keep |
| DarkModeButton | `hover:text-teal-400 dark:hover:text-teal-400` — new explicit colors |
| Project card (card body) | `hover:bg-gray-50 dark:hover:bg-gray-700` — existing, keep |
| GitHub link | `hover:text-gray-800 dark:hover:text-gray-200` — existing, keep |
| Demo link | `hover:text-gray-800 dark:hover:text-gray-200` — existing, keep |
| CTA "View projects" | `hover:bg-teal-600 hover:text-white dark:hover:bg-teal-400 dark:hover:text-gray-900` — new |
| Swipe dots | passive, no hover needed (touch target) |
| Footer | no hover |

All use `transition-colors duration-200` or `transition-all duration-300` to match the existing animation rhythm.

---

## 13. Animations

**What exists:**
- Nav drawer: `transition-transform duration-300 ease-in-out` (slide in/out) — keep exactly
- HeaderIcon: `hover:scale-105 transform transition-all duration-300` — keep exactly
- No other animations

**What is added:**
- Swipe dot active state: `transition-all duration-300` on height and color — the elongated dot transition as you swipe
- CTA link: `transition-colors duration-200` on fill animation
- DarkModeButton: `transition-colors duration-200` on color

**What is explicitly not added:** No entrance animations (fade-in, slide-up on scroll), no loading spinners for content, no skeleton screens, no parallax. The existing Swiper `EffectFade` with `crossFade: true` already provides a polished transition between slides. Adding more motion would add complexity without serving the portfolio's goal.

---

## 14. Responsive Behavior

### Breakpoints

```
Default (mobile-first): ≥ 0px
sm:                     ≥ 640px
md:                     ≥ 768px
lg:                     ≥ 1024px
```

### Home page — per viewport

**320px (iPhone SE, smallest):**
- Name: `text-5xl` (48px) — fits in 320px
- Social icons: `gap-8` (32px) — 3×48 + 2×32 = 208px total, fits
- Photo: `w-64 h-64` (256px) — fits with `mx-auto`
- Specializations: single column, full width

**375px–639px:**
- Social icons: `gap-8` still
- Photo: `w-64 h-64` still

**640px–767px (sm):**
- Social icons: `gap-12`
- Photo: `w-72 h-72` (288px)
- Specializations: single column still

**768px+ (md):**
- Name: `text-6xl`
- Social icons: `gap-16`
- Photo: `w-80 h-80` (320px), lg: `w-96 h-96`
- Specializations: 2-column grid

### Projects page — per viewport

**< 640px:**
- Project card: `w-[90vw]` — fills 90% of screen, centered
- Slide dots: visible on right edge

**640px+:**
- Project card: `max-w-sm` (384px) kicks in

**Touch devices:**
- Swiper `touchStartPreventDefault={false}` allows normal scroll on the page; swipe gesture within the Swiper triggers slide change
- The existing setting is correct; document it with a comment

### Navbar drawer

- `w-60` (240px) — at 320px viewport this leaves 80px visible; the backdrop makes the remaining space dark. This is fine.
- The drawer does not resize responsively — it doesn't need to at 240px width.

---

## 15. Loading States

**What exists:** None.

**What is needed:** Very little, because this is a static site with no async data fetching.

**Profile photo (`priority`):** Loaded immediately via `priority`. The teal gradient ring container (`rounded-full overflow-hidden`) is visible as soon as the page paints — the ring itself acts as a visual placeholder. No additional loading state needed.

**Project images (in Swiper):** Next.js `<Image>` lazy-loads by default. The blurred background image appears first (it's the same image, just blurred/scaled down, so it appears immediately from cache once any slide is viewed). The sharp contain image overlays it on load. This is effectively a progressive load — no additional skeleton needed.

**Page transition (dark mode):** `next-themes` with `suppressHydrationWarning` on `<html>` handles the flash-of-unstyled-content (FOUC) prevention. No additional loading state needed.

**Conclusion:** No loading skeleton or spinner components are needed for this static portfolio. The existing progressive image loading pattern in the Swiper is sufficient.

---

## 16. Empty States

**What exists:** None needed currently.

**Potential scenario:** A project JSON array is empty (e.g., someone removes all entries from `games.json`). Currently `ProjectSwiper` would render a Swiper with zero slides — this could cause a Swiper error or blank slide.

**What is added:** A guard in `ProjectSwiper`:

```tsx
if (!projects || projects.length === 0) {
  return null; // section still renders with its heading; swiper just doesn't appear
}
```

This is a one-line defensive guard. No visible UI change in normal use.

---

## 17. Component Decision Summary

| Component | Status | Change type |
|---|---|---|
| `layout.tsx` | Modify | Add `Providers`, skip link, updated metadata |
| `Providers.tsx` | Create new | Thin `ThemeProvider` wrapper |
| `page.tsx` (home) | Modify | Remove dark mode state, add `id`, add metadata |
| `projects/page.tsx` | Modify | Same + fix heading levels |
| `Navbar.tsx` | Modify | Aria attributes, focus trap, tap target |
| `NavbarItem.tsx` | No change | Global focus CSS covers it |
| `Header.tsx` | Modify | Heading levels, bio text, alt text, photo size, social gap, add Specializations |
| `HeaderIcon.tsx` | Modify | Add `ariaLabel` prop |
| `DarkModeButton.tsx` | Modify | `<div>` → `<button>`, `useTheme`, aria |
| `ProjectSwipper.tsx` | Modify + rename | → `ProjectSwiper.tsx`, card width, link labels, dot indicator, empty guard |
| `Footer.tsx` | No change | Already correct |
| `Specializations.tsx` | Create new | Hardcoded content, grid layout |
| `globals.css` | Modify | Add `:focus-visible` rule |
| `tailwind.config.ts` | Modify | Remove dead color extensions |

**Total new files:** 2 (`Providers.tsx`, `Specializations.tsx`)
**Total modified files:** 9
**Total deleted files:** 1 (`tailwind.config.js`)
**No new dependencies**

---

## 18. What Explicitly Does Not Change

The following are locked. Any proposal to change these must be treated as out of scope:

- Teal/gray color palette values
- Geist Sans + Mono font choice
- Full-screen Swiper slide layout and the blurred background + sharp foreground technique
- Gradient teal ring on the profile photo
- Teal pill badges for tech stack (`bg-teal-600 rounded-full px-3 py-1 text-sm text-gray-100`)
- `nav-drawer` slide-in transition timing (`duration-300 ease-in-out`)
- The `AiFillLinkedin`, `AiFillGithub`, `AiFillMail` icons in the hero
- GitHub Actions deployment pipeline
- `output: "export"` + GitHub Pages strategy
- `images: { unoptimized: true }` (required by static export)
- `basePath: "/zarco"` in production
