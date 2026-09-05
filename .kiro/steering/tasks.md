# Implementation Tasks

All tasks derived from `design.md` and `spec.md`. Each task touches the minimum files necessary, has explicit acceptance criteria, and can be committed independently.

---

## Phase 0 — Images (no code changes, unblocks everything)

These must be done before any code task that references image filenames.

---

### TASK-01 — Compress and convert all public images to WebP

**Files changed:** `public/` (replace existing images)

**What to do:**
Convert every image in `/public` from its current format (`.jpg`, `.jpeg`, `.png`) to `.webp`. Compress to meet the size targets below. Keep the same base filename, change only the extension.

| Current file | Current size | Target size |
|---|---|---|
| `me.jpg` | 2.9 MB | < 150 KB |
| `elescapedelosnuevecirculos.png` | 6.7 MB | < 200 KB |
| `fakenewsdetection.png` | 326 KB | < 150 KB |
| `mazesimulator.png` | 316 KB | < 150 KB |
| `kanjiji.png` | 151 KB | < 100 KB |
| `kanjijiapp.jpg` | 41 KB | < 50 KB |
| `portalVaquita.png` | 61 KB | < 50 KB |
| `ocr.jpeg` | 65 KB | < 50 KB |
| `exoarcade.png` | 299 KB | < 150 KB |
| `2048.png` | 41 KB | < 30 KB |
| `frogger.jpeg` | 44 KB | < 30 KB |
| `juego15.png` | 23 KB | < 20 KB |
| `tetris.png` | 3 KB | keep as-is |
| `c6.jpeg` | 69 KB | < 50 KB |

Acceptable tools: `cwebp`, `squoosh` (https://squoosh.app), `sharp` CLI.

**Acceptance criteria:**
- [ ] All images in `/public` are `.webp` format
- [ ] Each file is under its target size
- [ ] No visible quality regression at the display dimensions used in the site
- [ ] Old `.jpg`/`.jpeg`/`.png` files removed from `/public` root and subdirectories

**Testing:** `ls -lh public/*.webp` — all files present and under target size.

---

## Phase 1 — Foundation (dark mode + layout)

These tasks fix the two biggest bugs (dark mode reset, broken build scripts) and establish the layout that every subsequent task depends on. Do Phase 0 first, then these four tasks can be done in dependency order.

---

### TASK-02 — Create `src/components/Providers.tsx`

**Files changed:** `src/components/Providers.tsx` (new file)

**Why:** `ThemeProvider` from `next-themes` requires a Client Component context. `layout.tsx` must stay a Server Component to export `metadata`. This thin wrapper bridges the two.

**What to do:**
Create a new file with a single Client Component that wraps `ThemeProvider`:

```tsx
"use client";

import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}
```

No other logic. No other imports.

**Acceptance criteria:**
- [ ] File exists at `src/components/Providers.tsx`
- [ ] Contains `"use client"` directive
- [ ] Exports a single default component
- [ ] `ThemeProvider` uses `attribute="class"`, `defaultTheme="dark"`, `enableSystem={false}`
- [ ] `npm run lint` passes

**Testing:** File can be imported without TypeScript errors. No runtime verification yet — dependent tasks will exercise it.

---

### TASK-03 — Update `src/app/layout.tsx`

**Files changed:** `src/app/layout.tsx`

**Depends on:** TASK-02

**Why:** Layout needs to wrap all pages in `Providers` (dark mode persistence), add the skip link (accessibility), and update metadata (SEO).

**What to do — four changes in one file:**

1. Import `Providers` and wrap `{children}`:
```tsx
import Providers from "@/components/Providers";
// ...
<body className={...}>
  <Providers>{children}</Providers>
</body>
```

2. Add skip link as first child of `<body>`, before `<Providers>`:
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
             focus:z-[100] focus:px-4 focus:py-2 focus:bg-teal-600 focus:text-white
             focus:text-sm focus:rounded focus:outline-none focus:shadow-lg"
>
  Skip to main content
</a>
```

3. Update `metadata` export:
```tsx
export const metadata: Metadata = {
  title: {
    template: "%s | Antonio Zarco",
    default: "Antonio Zarco — CS Student",
  },
  description:
    "Portfolio of Antonio Zarco, CS student at UNAM specializing in algorithms, machine learning, and computer vision.",
  metadataBase: new URL("https://jzarcoo.github.io/zarco"),
  icons: { icon: "./favicon.ico" },
};
```

4. Add JSON-LD Person schema inside `<head>` via a `<script>` tag:
```tsx
<head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Antonio Zarco",
        url: "https://jzarcoo.github.io/zarco",
        sameAs: [
          "https://www.linkedin.com/in/antoniozarco/",
          "https://github.com/jzarcoo",
        ],
        jobTitle: "Computer Science Student",
        alumniOf: "UNAM",
      }),
    }}
  />
</head>
```

**Acceptance criteria:**
- [ ] `<Providers>` wraps `{children}` in `<body>`
- [ ] Skip link is the first element in `<body>`, before `<Providers>`
- [ ] `metadata.title` is a template object
- [ ] `metadata.description` contains no "Portafolio" typo
- [ ] `metadata.metadataBase` is set
- [ ] JSON-LD script is present in `<head>`
- [ ] `suppressHydrationWarning` remains on `<html>`
- [ ] `npm run build` succeeds with zero errors

**Testing:** `npm run build`. View generated HTML source: confirm `<title>`, `<meta name="description">`, and `<script type="application/ld+json">` are present.

---

### TASK-04 — Update `src/components/DarkModeButton.tsx`

**Files changed:** `src/components/DarkModeButton.tsx`

**Depends on:** TASK-02

**Why:** The current implementation uses a `<div>` with `onClick` — not keyboard accessible, no accessible name, no focus indicator. Props are being replaced by `useTheme()`.

**What to do — full replacement of the component body:**

```tsx
"use client";

import { useTheme } from "next-themes";
import { BsFillMoonStarsFill } from "react-icons/bs";

export default function DarkModeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      className="fixed bottom-6 right-6 z-50 p-2 rounded-md
                 text-gray-900 dark:text-gray-200
                 hover:text-teal-400 dark:hover:text-teal-400
                 transition-colors duration-200"
    >
      <BsFillMoonStarsFill aria-hidden="true" className="text-2xl" />
    </button>
  );
}
```

Remove the `DarkModeButtonProps` interface entirely — the component is now self-contained.

**Acceptance criteria:**
- [ ] Component renders a `<button>` element, not a `<div>`
- [ ] No props — `DarkModeButtonProps` interface removed
- [ ] Uses `useTheme()` from `next-themes`
- [ ] `aria-label` is dynamic and reflects current theme state
- [ ] `BsFillMoonStarsFill` has `aria-hidden="true"`
- [ ] Button has `p-2` padding (≥ 44px tap target)
- [ ] `npm run lint` passes

**Testing:** After TASK-05 and TASK-06 are done: toggle dark/light on `/`, navigate to `/projects`, confirm theme persists. Reload page, confirm theme persists via localStorage.

---

### TASK-05 — Update `src/app/page.tsx` (home)

**Files changed:** `src/app/page.tsx`

**Depends on:** TASK-03, TASK-04

**Why:** The page holds local dark mode state that resets on navigation. After `Providers` wraps the layout, the state and wrapper div are no longer needed.

**What to do:**

```tsx
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import DarkModeButton from "@/components/DarkModeButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Antonio Zarco — CS Student",
  description:
    "Portfolio of Antonio Zarco, CS student at UNAM specializing in algorithms, machine learning, and computer vision.",
  openGraph: {
    title: "Antonio Zarco — CS Student",
    description:
      "Portfolio of Antonio Zarco, CS student at UNAM specializing in algorithms, machine learning, and computer vision.",
    url: "https://jzarcoo.github.io/zarco",
    siteName: "Antonio Zarco",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antonio Zarco — CS Student",
    description:
      "Portfolio of Antonio Zarco, CS student at UNAM specializing in algorithms, machine learning, and computer vision.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <div className="text-gray-900 dark:text-gray-200 dark:bg-gray-900 bg-gray-200 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main id="main-content" className="scroll-smooth pt-10">
        <Header />
      </main>
      <DarkModeButton />
      <Footer />
    </div>
  );
}
```

Key changes from current:
- Remove `"use client"` directive
- Remove `useState` import and `darkMode` state
- Remove outer `<div className={darkMode ? "dark" : ""}>` wrapper
- Remove props from `<DarkModeButton />`
- Add `id="main-content"` to `<main>`
- Add `metadata` export

**Acceptance criteria:**
- [ ] No `"use client"` directive
- [ ] No `useState` import
- [ ] No outer dark mode wrapper div
- [ ] `<main>` has `id="main-content"`
- [ ] `<DarkModeButton />` has no props
- [ ] `metadata` export present with OG and Twitter tags
- [ ] `npm run build` succeeds

**Testing:** `npm run dev`. Load `/`. Dark mode button works. Navigate to `/projects` and back — theme does not reset.

---

### TASK-06 — Update `src/app/projects/page.tsx`

**Files changed:** `src/app/projects/page.tsx`

**Depends on:** TASK-03, TASK-04

**Why:** Same dark mode state bug as the home page. Also has three `<h1>` elements — only the first section heading should be `<h1>`; the others must be `<h2>`.

**What to do:**

```tsx
import DarkModeButton from "@/components/DarkModeButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectSwiper from "@/components/ProjectSwiper";
import type { Metadata } from "next";

import projectsData from "../../../public/projects/projects.json";
import gamesData from "../../../public/games/games.json";
import machineLearningData from "../../../public/machinelearning/machinelearning.json";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Software engineering projects, machine learning research, and games by Antonio Zarco.",
};

export default function Projects() {
  return (
    <div className="text-gray-900 dark:text-gray-200 dark:bg-gray-900 bg-gray-200">
      <Navbar />
      <main id="main-content" className="pt-5">
        <section id="projects">
          <h1 className="text-center text-4xl font-bold mb-20 text-teal-600">
            Projects
          </h1>
          <ProjectSwiper projects={projectsData} />
        </section>

        <section id="machine-learning">
          <h2 className="text-center text-4xl font-bold m-20 text-teal-600">
            Machine Learning
          </h2>
          <ProjectSwiper projects={machineLearningData} />
        </section>

        <section id="games">
          <h2 className="text-center text-4xl font-bold m-20 text-teal-600">
            Games
          </h2>
          <ProjectSwiper projects={gamesData} />
        </section>
      </main>
      <DarkModeButton />
      <Footer />
    </div>
  );
}
```

Note the import change: `ProjectSwipper` → `ProjectSwiper` (anticipates TASK-09 rename, or can be done in same commit).

**Acceptance criteria:**
- [ ] No `"use client"` directive
- [ ] No `useState`
- [ ] `<main>` has `id="main-content"`
- [ ] `<DarkModeButton />` has no props
- [ ] "Projects" is `<h1>`, "Machine Learning" and "Games" are `<h2>`
- [ ] `metadata` export present
- [ ] `npm run build` succeeds

**Testing:** Navigate to `/projects`. Headings render correctly. Dark mode persists from home page.

---

## Phase 2 — Accessibility

These tasks are independent of each other and can be done in any order after Phase 1. Each one targets a specific WCAG failure.

---

### TASK-07 — Add global focus indicator to `src/app/globals.css`

**Files changed:** `src/app/globals.css`

**Why:** Tailwind's preflight removes browser default focus outlines. There are currently no visible focus indicators anywhere on the site — every keyboard user is affected.

**What to do:** Add after the existing reset rules:

```css
/* Visible focus indicator for keyboard navigation (WCAG 2.4.7) */
:focus-visible {
  outline: 2px solid #2dd4bf; /* teal-400 */
  outline-offset: 2px;
  border-radius: 4px;
}
```

No other changes to this file.

**Acceptance criteria:**
- [ ] `:focus-visible` rule added
- [ ] Uses `#2dd4bf` (teal-400)
- [ ] `outline-offset: 2px` and `border-radius: 4px` present
- [ ] Existing reset rules unchanged
- [ ] `npm run build` succeeds

**Testing:** `npm run dev`. Tab through the home page — a teal outline must be visible on every focused element: skip link, hamburger button, social icons, dark mode button. Click elements with mouse — no outline should appear.

---

### TASK-08 — Update `src/components/Navbar.tsx`

**Files changed:** `src/components/Navbar.tsx`

**Why:** Hamburger button has no accessible name, no `aria-expanded`, no focus-trap. Drawer has no ARIA role. Close button has no accessible name. Tap targets are too small.

**What to do — full replacement of the component:**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const drawer = document.getElementById("nav-drawer");
    const focusableSelectors = 'a, button, [tabindex]:not([tabindex="-1"])';
    const focusable = drawer?.querySelectorAll<HTMLElement>(focusableSelectors);
    if (!focusable || focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="relative text-gray-200">
      {/* Hamburger trigger */}
      <button
        ref={hamburgerRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="nav-drawer"
        className={`fixed top-6 left-6 z-50 p-2 rounded-md text-3xl
          hover:text-teal-400 transition-colors duration-200
          ${isOpen ? "text-gray-200" : "text-gray-900 dark:text-gray-200"}`}
      >
        <AiOutlineMenu aria-hidden="true" />
      </button>

      {/* Drawer */}
      <div
        id="nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        aria-hidden={!isOpen}
        tabIndex={-1}
        className={`fixed top-0 left-0 w-60 h-full p-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40
        bg-gradient-to-b from-teal-900 to-transparent`}
      >
        <button
          onClick={() => {
            setIsOpen(false);
            hamburgerRef.current?.focus();
          }}
          aria-label="Close navigation menu"
          className="text-3xl absolute top-6 right-6 p-2 rounded-md
            hover:text-teal-400 transition-colors duration-200"
        >
          <AiOutlineClose aria-hidden="true" />
        </button>

        <ul className="space-y-8 pt-20 px-1">
          <NavbarItem href="/" text="Home" />
          <NavbarItem href="/projects#projects" text="Projects" />
          <NavbarItem href="/projects#machine-learning" text="ML" />
          <NavbarItem href="/projects#games" text="Games" />
        </ul>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
          className="fixed top-0 left-0 w-full h-full bg-black opacity-60 z-30"
        />
      )}
    </div>
  );
};

export default Navbar;
```

**Acceptance criteria:**
- [ ] Hamburger button has `aria-label="Open navigation menu"`
- [ ] Hamburger button has `aria-expanded={isOpen}`
- [ ] Hamburger button has `aria-controls="nav-drawer"`
- [ ] Hamburger button has `ref={hamburgerRef}` and `p-2` padding
- [ ] Drawer has `id="nav-drawer"`, `role="dialog"`, `aria-modal="true"`, `aria-hidden={!isOpen}`
- [ ] Close button has `aria-label="Close navigation menu"` and `p-2`
- [ ] Close button returns focus to hamburger on click
- [ ] Escape key closes drawer and returns focus to hamburger
- [ ] Tab cycles within open drawer (focus trap)
- [ ] Backdrop has `aria-hidden="true"`
- [ ] Drawer slide animation unchanged (`transition-transform duration-300 ease-in-out`)
- [ ] `npm run lint` passes

**Testing:** Open navbar with keyboard (Tab → Enter). Verify focus moves into drawer. Tab through all links. Press Escape — drawer closes, focus returns to hamburger. Click backdrop — drawer closes.

---

### TASK-09 — Update `src/components/HeaderIcon.tsx`

**Files changed:** `src/components/HeaderIcon.tsx`

**Why:** Icon-only links have no accessible name. `title` is a tooltip, not an accessible name for screen readers.

**What to do:**

```tsx
interface HeaderIconProps {
  icon: React.ReactNode;
  link: string;
  title: string;
  ariaLabel: string;
}

const HeaderIcon = ({ icon, link, title, ariaLabel }: HeaderIconProps) => {
  return (
    <a
      aria-label={ariaLabel}
      className="hover:shadow-lg hover:shadow-[teal] hover:scale-105 transform transition-all duration-300"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
    >
      {icon}
    </a>
  );
};

export default HeaderIcon;
```

**Acceptance criteria:**
- [ ] `ariaLabel` added to `HeaderIconProps` interface
- [ ] `aria-label={ariaLabel}` applied to `<a>`
- [ ] Existing `title`, `hover`, `transition` classes unchanged
- [ ] `npm run lint` passes

**Testing:** After TASK-10 updates the call sites, screen reader announces link purpose. No visual change.

---

### TASK-10 — Update `src/components/Header.tsx`

**Files changed:** `src/components/Header.tsx`

**Depends on:** TASK-01 (for WebP filename), TASK-09 (for `ariaLabel` prop)

**Why:** Heading levels are wrong (`h2`/`h3` with no `h1`). Bio is generic. `alt="me"` is not descriptive. Social icon gap overflows on mobile. Photo is too large on small screens.

**What to do:**

```tsx
import { AiFillLinkedin, AiFillGithub, AiFillMail } from "react-icons/ai";
import HeaderIcon from "./HeaderIcon";
import Specializations from "./Specializations";
import Image from "next/image";
import me from "../../public/me.webp";  // updated extension after TASK-01

const name = "Antonio Zarco";
const title = "CS Student · UNAM";
const description =
  "CS student at UNAM building systems across algorithms, machine learning, and computer vision.";

const Header = () => {
  return (
    <header className="min-h-screen grid place-items-center">
      <div className="text-center px-6">
        <h1 className="py-2 md:text-6xl text-5xl text-teal-600 font-medium dark:text-teal-400">
          {name}
        </h1>
        <h2 className="py-2 text-2xl md:text-3xl">
          {title}
        </h2>
        <p className="text-md leading-8 max-w-xl mx-auto md:text-xl text-gray-800 dark:text-gray-300">
          {description}
        </p>

        <div className="text-5xl flex justify-center gap-8 sm:gap-12 md:gap-16 py-3 dark:text-gray-300">
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
        </div>

        <div className="mx-auto bg-gradient-to-b from-teal-500 rounded-full
                        w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96
                        relative overflow-hidden my-12 md:my-20">
          <Image
            src={me}
            style={{ objectFit: "cover" }}
            alt="Antonio Zarco"
            priority
          />
        </div>

        <Specializations />
      </div>
    </header>
  );
};

export default Header;
```

**Acceptance criteria:**
- [ ] Name is `<h1>` (was `<h2>`)
- [ ] Role is `<h2>` (was `<h3>`)
- [ ] Title text is `"CS Student · UNAM"` (was `"Computer Scientist"`)
- [ ] Bio text is specific and contains no "passion" or "let's get cracking"
- [ ] Social icon gap is `gap-8 sm:gap-12 md:gap-16` (was `gap-16`)
- [ ] Each `HeaderIcon` has an `ariaLabel` prop
- [ ] Each icon in `HeaderIcon` call site has `aria-hidden="true"`
- [ ] Photo `alt` is `"Antonio Zarco"` (was `"me"`)
- [ ] Photo container uses responsive sizing: `w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96`
- [ ] Gradient ring classes unchanged: `bg-gradient-to-b from-teal-500 rounded-full overflow-hidden`
- [ ] `<Specializations />` rendered below photo
- [ ] `npm run build` succeeds

**Testing:** Dev tools → Elements: confirm `<h1>` for name, `<h2>` for role. At 320px viewport: no horizontal overflow. Screen reader: name, role, bio, then three labeled links.

---

### TASK-11 — Rename and update `ProjectSwiper`

**Files changed:**
- `src/components/ProjectSwiper.tsx` (renamed from `ProjectSwipper.tsx`)
- `src/app/projects/page.tsx` (import update — already handled in TASK-06 if done together)

**Why:** Typo in filename. Card overflows on mobile. Icon links lack accessible names. Duplicate paperclip icon is misleading. Blurred background image announces duplicate alt text to screen readers. No slide position indicator.

**What to do — changes within the existing file structure:**

1. Rename the file: `ProjectSwipper.tsx` → `ProjectSwiper.tsx`

2. In `Slide` component — card width:
   ```tsx
   // change from:
   className="absolute max-w-sm p-6 ..."
   // to:
   className="absolute w-[90vw] max-w-sm p-6 ..."
   ```

3. In `Slide` — blurred background image alt:
   ```tsx
   // change from:
   alt={title}
   // to:
   alt=""
   ```
   (only on the blurred/cover image — keep `alt={title}` on the sharp/contain image)

4. In `Slide` — GitHub link:
   ```tsx
   <a
     href={repoLink}
     target="_blank"
     rel="noopener noreferrer"
     aria-label={`View ${title} on GitHub`}
     className="absolute top-4 right-4 text-gray-600 dark:text-gray-400
                hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
   >
     <FaGithub size={24} aria-hidden="true" />
   </a>
   ```

5. In `Slide` — demo link (conditional):
   ```tsx
   {siteLink !== repoLink && (
     <a
       href={siteLink}
       target="_blank"
       rel="noopener noreferrer"
       aria-label={`View ${title} live demo`}
       className="absolute top-4 right-12 text-gray-600 dark:text-gray-400
                  hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
     >
       <FaPaperclip size={24} aria-hidden="true" />
     </a>
   )}
   ```

6. In `ProjectSwiper` — add slide position dots and empty guard:
   ```tsx
   const ProjectSwiper = ({ projects }: ProjectProps) => {
     const [activeIndex, setActiveIndex] = useState(0);

     if (!projects || projects.length === 0) return null;

     return (
       <div className="relative min-h-screen max-h-screen">
         <Swiper
           className="min-h-screen max-h-screen"
           direction="vertical"
           slidesPerView={1}
           spaceBetween={0}
           effect="fade"
           fadeEffect={{ crossFade: true }}
           mousewheel={true}
           grabCursor={true}
           // touchStartPreventDefault={false} allows page scroll on touch devices
           touchStartPreventDefault={false}
           modules={[EffectFade, Mousewheel]}
           loop={true}
           onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
         >
           {projects.map((project, index) => (
             <SwiperSlide key={index}>
               <Slide {...project} />
             </SwiperSlide>
           ))}
         </Swiper>

         {/* Slide position indicator */}
         <div
           aria-hidden="true"
           className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2"
         >
           {projects.map((_, i) => (
             <span
               key={i}
               className={`block w-1.5 rounded-full transition-all duration-300 ${
                 i === activeIndex
                   ? "h-6 bg-teal-400"
                   : "h-1.5 bg-gray-400 dark:bg-gray-600"
               }`}
             />
           ))}
         </div>
       </div>
     );
   };
   ```

**Acceptance criteria:**
- [ ] File is named `ProjectSwiper.tsx` (single `p`)
- [ ] Card has `w-[90vw] max-w-sm` (not just `max-w-sm`)
- [ ] Blurred background `<Image>` has `alt=""`
- [ ] Sharp foreground `<Image>` retains `alt={title}`
- [ ] GitHub link has `aria-label={`View ${title} on GitHub`}`
- [ ] Demo link is hidden when `siteLink === repoLink`
- [ ] Demo link has `aria-label={`View ${title} live demo`}` when shown
- [ ] Both link icons have `aria-hidden="true"`
- [ ] Slide position dots are visible on the right side
- [ ] Active dot is teal and elongated; inactive dots are gray and small
- [ ] `if (!projects || projects.length === 0) return null` guard present
- [ ] `npm run lint` passes

**Testing:** At 320px: card does not overflow. On projects with `siteLink === repoLink` (e.g., Maze Simulator): only one icon visible. Scroll through slides: dots update. Screen reader: GitHub link announces project name.

---

## Phase 3 — Content

Content changes only. No component logic affected. Can be done in any order.

---

### TASK-12 — Create `src/components/Specializations.tsx`

**Files changed:** `src/components/Specializations.tsx` (new file)

**Depends on:** Nothing (TASK-10 renders it, but this file can be created independently)

**Why:** The home page currently ends with the profile photo. There is no section communicating what Antonio specializes in or what he has built. A recruiter who reads only the hero has no signal of technical depth.

**What to do:**

```tsx
import Link from "next/link";

const specializations = [
  {
    label: "Algorithms & Data Structures",
    evidence:
      "Implemented BFS, DFS, Prim's, and Kruskal's for maze generation and solving in Java.",
  },
  {
    label: "Machine Learning",
    evidence:
      "Fine-tuned BERT and trained CNN/LSTM models for fake news detection.",
  },
  {
    label: "Computer Vision",
    evidence:
      "Built a PyTorch CNN for kanji character recognition used in production.",
  },
  {
    label: "Software Engineering",
    evidence:
      "Designed concurrent systems using sockets, threads, and Observer/Publisher patterns.",
  },
  {
    label: "Web Development",
    evidence:
      "Shipped Kanji Ji — a full-stack dictionary with Next.js, React, and Supabase.",
  },
  {
    label: "Systems Programming",
    evidence:
      "Wrote a terminal-based maze game in C with custom rendering and memory management.",
  },
];

export default function Specializations() {
  return (
    <section id="specializations" className="pt-8 pb-16">
      <div className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-left">
        {specializations.map(({ label, evidence }) => (
          <div key={label}>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1">
              {label}
            </p>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {evidence}
            </p>
          </div>
        ))}
      </div>

      <Link
        href="/projects"
        className="inline-block mt-10 text-sm font-medium
                   text-teal-600 dark:text-teal-400
                   border border-teal-600 dark:border-teal-400
                   px-5 py-2 rounded-md
                   hover:bg-teal-600 hover:text-white
                   dark:hover:bg-teal-400 dark:hover:text-gray-900
                   transition-colors duration-200"
      >
        View projects →
      </Link>
    </section>
  );
}
```

**Acceptance criteria:**
- [ ] Six specialization items, each with `label` and `evidence`
- [ ] Two-column grid on `md:`, single column below
- [ ] Labels use `text-teal-600 dark:text-teal-400`
- [ ] Evidence uses `text-gray-600 dark:text-gray-400`
- [ ] "View projects →" link navigates to `/projects`
- [ ] Link uses ghost button style (border, fills on hover)
- [ ] No icons, no cards, no borders on items
- [ ] `npm run lint` passes

**Testing:** Home page renders the section below the photo. Resize to 320px — single column, no overflow. Resize to 768px — two columns. Click "View projects →" — navigates correctly. Dark mode: labels and evidence text update correctly.

---

### TASK-13 — Rewrite project descriptions in all JSON files

**Files changed:**
- `public/projects/projects.json`
- `public/machinelearning/machinelearning.json`
- `public/games/games.json`

**Also update image filenames in JSON** to `.webp` (depends on TASK-01).

**Why:** Current descriptions are feature summaries. They do not explain what problem was solved, what approach was taken, or what the result was. Three game entries share the identical description "A classic arcade game with a modern twist."

**What to do — replace `description` and `img` fields:**

`public/projects/projects.json`:
```json
[
  {
    "img": "mazesimulator.webp",
    "title": "Maze Simulator",
    "description": "Generates, solves, and visualizes mazes using BFS, DFS, Prim's, and Kruskal's. Includes step-by-step algorithm visualization.",
    "tools": ["Java", "Maven"],
    "repoLink": "https://github.com/jzarcoo/MazeSimulator",
    "siteLink": "https://github.com/jzarcoo/MazeSimulator"
  },
  {
    "img": "kanjijiapp.webp",
    "title": "Kanji Ji App",
    "description": "Full-stack kanji dictionary serving 2,000+ characters with readings, meanings, and stroke-order data. Built with Next.js, React, and Supabase.",
    "tools": ["Typescript", "Supabase", "Next.js", "React", "Tailwind"],
    "repoLink": "https://kanji-ji.com/",
    "siteLink": "https://kanji-ji.com/"
  },
  {
    "img": "portalVaquita.webp",
    "title": "Portal Vaquita",
    "description": "Concurrent marketplace system with Publisher-Subscriber and Observer patterns, socket-based communication, thread synchronization, and a full unit test suite.",
    "tools": ["Java", "Maven"],
    "repoLink": "https://github.com/jzarcoo/Portal-Vaquita",
    "siteLink": "https://github.com/jzarcoo/Portal-Vaquita"
  },
  {
    "img": "c6.webp",
    "title": "Coyo6",
    "description": "PHP/MariaDB virtual classroom built for UNAM during COVID-19. Handles course management, assignment submission, and student enrollment.",
    "tools": ["PHP", "MariaDB", "JavaScript", "Bootstrap", "CSS", "HTML"],
    "repoLink": "https://github.com/jzarcoo/Coyo6",
    "siteLink": "https://github.com/jzarcoo/Coyo6"
  },
  {
    "img": "ocr.webp",
    "title": "Optical Character Recognition",
    "description": "Flutter mobile app that extracts text from images in real time using Google ML Kit OCR and reads it aloud via TTS — built for accessibility use cases.",
    "tools": ["Dart", "Flutter"],
    "repoLink": "https://github.com/jzarcoo/ocr",
    "siteLink": "https://github.com/jzarcoo/ocr"
  }
]
```

`public/machinelearning/machinelearning.json`:
```json
[
  {
    "img": "fakenewsdetection.webp",
    "title": "Fake News Detection",
    "description": "Compared BERT, CNN, and LSTM architectures for fake news detection. Fine-tuned BERT achieved the highest F1-score on labeled news corpora, outperforming traditional NLP baselines.",
    "tools": ["Python", "TensorFlow", "Keras", "Plotly", "NetworkX", "Pandas", "NumPy", "Scikit-learn"],
    "repoLink": "https://github.com/jzarcoo/FakeNewsDetection",
    "siteLink": "https://www.canva.com/design/DAG-j3EfYGc/NVlZE4TYpKN2xCv9G9Uyxg/edit?utm_content=DAG-j3EfYGc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
  },
  {
    "img": "kanjiji.webp",
    "title": "Kanji Ji",
    "description": "Trained a CNN in PyTorch to recognize handwritten kanji characters. Model serves as the recognition backbone for the Kanji Ji production app.",
    "tools": ["Python", "PyTorch", "Streamlit", "Pandas", "NumPy", "Scikit-learn"],
    "repoLink": "https://kanji-ji.com/",
    "siteLink": "https://kanji-ji.com/"
  }
]
```

`public/games/games.json`:
```json
[
  {
    "img": "exoarcade.webp",
    "title": "Exo-Arcade",
    "description": "Browser-based educational game about exoplanets with five mini-games and Gemini API-powered hints. Built for NASA's 2024 Space Apps Challenge.",
    "tools": ["JavaScript", "Python", "Bootstrap", "Gemini API", "CSS", "HTML"],
    "repoLink": "https://github.com/jzarcoo/EXO-ARCADE",
    "siteLink": "https://github.com/jzarcoo/EXO-ARCADE"
  },
  {
    "img": "elescapedelosnuevecirculos.webp",
    "title": "El Escape de los Nueve Círculos",
    "description": "Terminal-based maze game in C, inspired by Dante's Inferno. Implements custom maze generation, collision detection, and rendering without a game library.",
    "tools": ["C"],
    "repoLink": "https://github.com/jzarcoo/El-Escape-de-los-Nueve-Circulos",
    "siteLink": "https://github.com/jzarcoo/El-Escape-de-los-Nueve-Circulos"
  },
  {
    "img": "2048.webp",
    "title": "2048",
    "description": "React implementation of the 2048 sliding-tile puzzle. Handles tile merging logic, keyboard and touch input, and win/loss detection.",
    "tools": ["JavaScript", "HTML", "CSS", "React"],
    "repoLink": "https://github.com/jzarcoo/2048-game",
    "siteLink": "https://github.com/jzarcoo/2048-game"
  },
  {
    "img": "frogger.webp",
    "title": "Frogger",
    "description": "Vanilla JavaScript Frogger clone with sprite-based animation, collision detection, and increasing difficulty levels.",
    "tools": ["JavaScript", "HTML", "CSS"],
    "repoLink": "https://github.com/jzarcoo/Frogger",
    "siteLink": "https://github.com/jzarcoo/Frogger"
  },
  {
    "img": "juego15.webp",
    "title": "Juego 15",
    "description": "Browser-based 15-puzzle with randomized board generation, move counter, and solvability checking.",
    "tools": ["JavaScript", "HTML", "CSS"],
    "repoLink": "https://github.com/jzarcoo/ProyectosWeb2022",
    "siteLink": "https://github.com/jzarcoo/ProyectosWeb2022"
  },
  {
    "img": "tetris.webp",
    "title": "Tetris",
    "description": "Vanilla JavaScript Tetris with piece rotation, line clearing, and level-based speed progression.",
    "tools": ["JavaScript", "HTML", "CSS"],
    "repoLink": "https://github.com/jzarcoo/ProyectosWeb2022",
    "siteLink": "https://github.com/jzarcoo/ProyectosWeb2022"
  }
]
```

**Acceptance criteria:**
- [ ] No description contains "passion", "enthusiast", "modern twist", or "immersive"
- [ ] All `img` fields reference `.webp` filenames
- [ ] Every description follows problem → approach → result/scale pattern
- [ ] No two descriptions are identical
- [ ] JSON is valid (no trailing commas, correct brackets)
- [ ] `npm run build` succeeds (JSON is imported at build time)

**Testing:** `npm run dev` → `/projects`. Read every card description. Each must name something specific about the technical work.

---

## Phase 4 — SEO and Static Files

Independent of all code tasks. Can be done at any point after Phase 1.

---

### TASK-14 — Create `public/robots.txt` and `public/sitemap.xml`

**Files changed:** `public/robots.txt` (new), `public/sitemap.xml` (new)

**Why:** No `robots.txt` means crawlers have no guidance. No `sitemap.xml` means Google cannot discover both pages efficiently.

**`public/robots.txt`:**
```
User-agent: *
Allow: /
Sitemap: https://jzarcoo.github.io/zarco/sitemap.xml
```

**`public/sitemap.xml`:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://jzarcoo.github.io/zarco/</loc>
    <lastmod>2026-01-16</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://jzarcoo.github.io/zarco/projects</loc>
    <lastmod>2026-01-16</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

**Acceptance criteria:**
- [ ] `public/robots.txt` exists and references the sitemap URL
- [ ] `public/sitemap.xml` lists both routes with `<loc>`, `<lastmod>`, `<priority>`
- [ ] Both files use the correct `basePath` (`/zarco`) in URLs
- [ ] `npm run build` succeeds

**Testing:** After deploy: `https://jzarcoo.github.io/zarco/robots.txt` returns the file. `https://jzarcoo.github.io/zarco/sitemap.xml` returns valid XML.

---

### TASK-15 — Create `public/og-image.png`

**Files changed:** `public/og-image.png` (new)

**Why:** Without an OG image, sharing the portfolio URL on LinkedIn or WhatsApp renders as a plain text link with no preview. This is the page's primary SEO conversion surface.

**Dimensions:** 1200×630px

**Content:** Name, role, teal accent — consistent with the site's visual identity. Does not need to be elaborate; it needs to be recognizable and professional.

**Design guidance:**
- Background: `#111827` (gray-900, the dark mode bg)
- Name "Antonio Zarco": large, `#2dd4bf` (teal-400)
- Role "CS Student · UNAM": smaller, white
- Optional: a thin teal horizontal line or minimal geometric element

Create with any tool: Figma, Canva, ImageMagick, or a script.

**Acceptance criteria:**
- [ ] File is exactly 1200×630px
- [ ] File size < 200 KB
- [ ] Name and role are legible at thumbnail size (240×126px preview)
- [ ] Visual style consistent with dark teal palette

**Testing:** After deploy: paste URL into https://opengraph.xyz — preview shows the image, name, and description correctly.

---

## Phase 5 — Housekeeping

Low-risk cleanup. No functional impact. Can be done last.

---

### TASK-16 — Clean up `package.json`

**Files changed:** `package.json`

**Why:** Dead scripts (`export`, `deploy`) reference a removed Next.js command and an unused package. `gh-pages` is superseded by GitHub Actions. `@types/react` version mismatches the React runtime.

**What to do:**
1. Remove scripts: `"export"` and `"deploy"`
2. Remove devDependency: `"gh-pages"`
3. Update `"@types/react": "^18"` → `"@types/react": "^19"`
4. Update `"@types/react-dom": "^18"` → `"@types/react-dom": "^19"`
5. Update `"react": "^19.0.0-rc-..."` → `"react": "^19.0.0"`
6. Update `"react-dom": "^19.0.0-rc-..."` → `"react-dom": "^19.0.0"`

Run `npm install` after editing.

**Acceptance criteria:**
- [ ] `"export"` and `"deploy"` scripts removed
- [ ] `"gh-pages"` removed from devDependencies
- [ ] `@types/react` and `@types/react-dom` are `^19`
- [ ] `react` and `react-dom` reference stable `^19.0.0`
- [ ] `npm install` succeeds with no peer dependency warnings
- [ ] `npm run build` succeeds

**Testing:** `npm run lint && npm run build` — both pass cleanly.

---

### TASK-17 — Clean up Tailwind config

**Files changed:** `tailwind.config.ts`, delete `tailwind.config.js`

**Why:** Two config files (`tailwind.config.js` and `tailwind.config.ts`) with identical content exist. One is dead. The `background`/`foreground` color extensions reference CSS variables (`var(--background)`, `var(--foreground)`) that are never defined anywhere.

**What to do:**
1. Delete `tailwind.config.js`
2. In `tailwind.config.ts`, remove the dead color extensions:
   ```ts
   // Remove this entire extend.colors block:
   extend: {
     colors: {
       background: "var(--background)",
       foreground: "var(--foreground)",
     },
   },
   ```
   Result: `theme: { extend: {} }` or just `theme: {}`.

**Acceptance criteria:**
- [ ] `tailwind.config.js` no longer exists
- [ ] `tailwind.config.ts` has no reference to `var(--background)` or `var(--foreground)`
- [ ] `npm run build` succeeds (no Tailwind compilation errors)
- [ ] Visual appearance unchanged (these classes were never used)

**Testing:** `npm run build`. Compare visual output before and after — should be identical.

---

## Dependency Graph Summary

```
TASK-01 (images)
  └── TASK-13 (JSON filenames)
  └── TASK-10 (me.webp import)

TASK-02 (Providers.tsx)
  └── TASK-03 (layout.tsx)
      └── TASK-05 (page.tsx)
      └── TASK-06 (projects/page.tsx)
  └── TASK-04 (DarkModeButton.tsx)
      └── TASK-05
      └── TASK-06

TASK-07 (globals.css)       — independent
TASK-08 (Navbar.tsx)        — independent
TASK-09 (HeaderIcon.tsx)
  └── TASK-10 (Header.tsx)
TASK-11 (ProjectSwiper.tsx) — independent (update import in TASK-06)
TASK-12 (Specializations.tsx)
  └── TASK-10 (renders it)

TASK-14 (robots + sitemap)  — independent
TASK-15 (og-image)          — independent
TASK-16 (package.json)      — independent
TASK-17 (tailwind cleanup)  — independent
```

## Task Count by Phase

| Phase | Tasks | Risk |
|---|---|---|
| 0 — Images | 1 | Medium (file replacement, no code) |
| 1 — Foundation | 5 | High (fixes dark mode bug, affects all pages) |
| 2 — Accessibility | 5 | Medium (isolated component changes) |
| 3 — Content | 2 | Low (data + new component) |
| 4 — SEO | 2 | Low (new static files) |
| 5 — Housekeeping | 2 | Low (cleanup only) |
| **Total** | **17** | |
