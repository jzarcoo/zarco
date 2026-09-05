# Conventions Steering

## TypeScript

- **Strict mode is required.** `"strict": true` in `tsconfig.json` must remain enabled. Do not suppress errors with `as any` or `@ts-ignore`.
- **Explicit interfaces for all props.** Every component that accepts props must have a named interface (e.g., `interface SlideProps { ... }`). Do not use inline type literals for props.
- **Explicit interfaces for all JSON data shapes.** Define a `Project` interface (or similar) for the JSON structure used in `projects.json`, `games.json`, and `machinelearning.json`, and use it everywhere the data is consumed.
- **No implicit `any`.** All function parameters and return values must be typed.
- **Use path alias `@/`** for imports from `src/`. Use `@/components/Foo` rather than `../../components/Foo`.

## File and Folder Naming

- **React components:** PascalCase file names matching the component name. Example: `ProjectSwiper.tsx` (not `projectSwiper.tsx` or `project-swiper.tsx`).
- **Pages:** lowercase `page.tsx` as required by the Next.js App Router.
- **Utility files** (if added): camelCase. Example: `formatDate.ts`.
- **Interfaces/types** (if extracted to separate files): PascalCase. Example: `types/Project.ts`.

## Component Conventions

- **One component per file.** Do not export multiple primary components from a single file. Small helper sub-components (e.g., `Logos`, `Slide`) may live in the same file as their parent only if they are never used elsewhere.
- **Server components by default.** Only add `"use client"` when a component genuinely requires browser APIs or React hooks (state, effects, event handlers). Currently `page.tsx` files are client components due to dark mode state; after migrating to `next-themes`, these can become server components.
- **Props-down, events-up.** Pass data down as props. Callbacks and state setters go up from child to parent via props. Do not reach up the tree from a child.
- **No inline styles.** Use Tailwind utility classes exclusively. The only exception is `style={{ objectFit: "cover" }}` and similar CSS properties that Tailwind does not cover well.
- **No hardcoded magic numbers.** If a size or color value is used more than once, extract it to a Tailwind config extension or a shared constant.

## Styling Conventions

### Tailwind

- Use Tailwind utility classes for all styling.
- Follow the **mobile-first** breakpoint order: default styles target mobile; use `sm:`, `md:`, `lg:` to progressively enhance for larger screens.
  - `sm:` ≥ 640px
  - `md:` ≥ 768px
  - `lg:` ≥ 1024px
- Always pair a dark mode utility with its light counterpart. Example: `bg-gray-200 dark:bg-gray-900`, never just `dark:bg-gray-900` alone.
- Do not use `@apply` in `globals.css` for component-specific styles. That belongs in the component file.

### Color Palette (defined by the existing design)

| Role | Light mode | Dark mode |
|---|---|---|
| Page background | `bg-gray-200` | `dark:bg-gray-900` |
| Primary text | `text-gray-900` | `dark:text-gray-200` |
| Secondary text | `text-gray-800` | `dark:text-gray-300` |
| Accent (primary) | `text-teal-600` | `dark:text-teal-400` |
| Accent (bg) | `bg-teal-600` | — |
| Card background | `bg-gray-100` | `dark:bg-gray-800` |
| Card border | `border-gray-200` | `dark:border-gray-700` |
| Card hover | `hover:bg-gray-50` | `dark:hover:bg-gray-700` |
| Nav drawer | `bg-gradient-to-b from-teal-900 to-transparent` | same |

Do not introduce new brand colors without updating this table. Teal is the single accent family.

### Typography

| Element | Classes |
|---|---|
| Page title / hero name | `text-5xl md:text-6xl font-medium text-teal-600 dark:text-teal-400` |
| Subtitle | `text-2xl md:text-3xl` |
| Body / description | `text-md md:text-xl leading-8` |
| Section heading | `text-4xl font-bold text-teal-600` |
| Project card title | `text-2xl font-bold text-teal-500 dark:text-teal-400` |
| Footer | `font-[family-name:var(--font-geist-mono)]` |

### Dark Mode

- Dark mode is controlled by `next-themes` `ThemeProvider` (to be wired up). The `dark` class is applied to `<html>` by the provider.
- Do not re-implement dark mode toggling inside individual page or component state.
- `DarkModeButton` is the single toggle point. It calls `useTheme()` from `next-themes`.

## Icon Usage (react-icons)

- Always use named imports. Example: `import { AiFillGithub } from "react-icons/ai"`.
- Do not import an entire icon family.
- Every icon used as an interactive element (button, link) must have an accessible label — see Accessibility Requirements.
- Icon-only buttons must be `<button>` elements with `aria-label`. Icon-only links must be `<a>` elements with `aria-label`.

## Image Conventions

- Use `next/image` (`<Image>`) for all images. Do not use raw `<img>` tags.
- All images must have descriptive `alt` text. `alt=""` is only correct for purely decorative images.
- Images must be pre-optimized to WebP format and compressed before adding to `/public`. See Performance Requirements for size targets.
- For the profile photo: import via TypeScript `import me from "../../public/me.jpg"` — this is the existing pattern and should be preserved.
- For project screenshots referenced in JSON: use absolute paths from the public root (e.g., `/mazesimulator.png`).

## Data / JSON Conventions

### Project entry schema

Every entry in `projects.json`, `games.json`, and `machinelearning.json` must conform to:

```typescript
interface Project {
  img: string;          // filename in /public, e.g. "mazesimulator.png"
  title: string;        // display title
  description: string;  // one to two sentences
  tools: string[];      // names matching keys in toolsMap in ProjectSwiper.tsx
  repoLink: string;     // URL to the GitHub repository
  siteLink: string;     // URL to the live demo, or same as repoLink if no live demo
}
```

- `tools` values must exactly match a key in `toolsMap` inside `ProjectSwiper.tsx`. If a new tool is added to a JSON file, add the corresponding icon entry to `toolsMap` first.
- If a project has no live demo, `siteLink` may equal `repoLink`. Do not leave it empty or as a placeholder URL.

## Linting and Formatting

- ESLint rules (`next/core-web-vitals` + `next/typescript`) must pass with zero errors before any commit.
- Run `npm run lint` before opening a pull request.
- No `eslint-disable` comments unless accompanied by an explanation.
- Consider adding `prettier` for consistent formatting. If added, do not use `prettier` rules that conflict with ESLint — use `eslint-config-prettier`.

## Git Conventions

- Commits targeting a specific component or area should say what changed and why (e.g., `fix: lift dark mode state to layout using next-themes`).
- Do not commit build output (`.next/`, `out/`). Both are in `.gitignore`.
- Do not commit `.env*` files.
- Branch `main` is the production branch. GitHub Actions deploys on every push to `main`. Use feature branches for work in progress.
