# Product Steering — Portfolio

## Purpose

This is Antonio Zarco's personal portfolio website. It is the primary professional landing page for anyone evaluating his technical ability — recruiters, internship programs, researchers, professors, and other engineers.

The site must answer seven questions for every visitor, in as little time as possible:

1. **Who is he?** — Name, current academic status, and a concrete one-sentence positioning statement.
2. **What does he specialize in?** — His technical focus areas, stated precisely and backed by evidence.
3. **What has he built?** — A curated set of projects with enough detail to judge scope and complexity.
4. **What technical problems did he solve?** — The challenge behind each project, not just what it is.
5. **What results did he achieve?** — Measurable outcomes, performance numbers, or qualitative impact where available.
6. **What technologies did he actually use?** — Specific tools and languages, shown in context, not as a skills list.
7. **What is he currently interested in?** — A signal of direction: what he is working on or studying now.

## Positioning

Antonio is a Computer Science student with demonstrated depth in:

- **Algorithms and data structures** — applied in real systems (maze simulator, game engines, marketplace)
- **Competitive programming** — precision in problem decomposition and solution design
- **Artificial intelligence and machine learning** — neural networks (BERT, CNNs), NLP, supervised learning applied to real datasets
- **Computer vision** — kanji character recognition using PyTorch, OCR on mobile via Flutter
- **Software engineering** — full-stack systems, design patterns, sockets, threading, unit testing
- **Research** — academic work with documented methodology and results (Fake News Detection, Kanji Ji)

The portfolio communicates technical depth, not breadth of tool familiarity. Every project shown must demonstrate a non-trivial problem that required engineering judgment.

## Writing and Tone Rules

- **No unsupported claims.** Do not use "passionate," "enthusiastic," "technology lover," or any adjective that cannot be verified from the work. If it cannot be shown, do not say it.
- **Be specific.** "Analyzed 20,000 news articles" is stronger than "worked with large datasets." "Achieved 94% F1-score using BERT fine-tuning" is stronger than "applied NLP techniques."
- **Present-tense facts, not self-assessments.** "Implements graph algorithms" not "I have strong algorithm skills."
- **One sentence per idea.** Bio text should be short enough that a recruiter reads it in full — not scanned.

These rules apply to all copy on the site: hero description, project descriptions, and any future About/Skills section.

## Target Audience

Each audience has different primary questions. The site must serve all of them without requiring separate landing pages.

| Audience | Primary question | What satisfies them |
|---|---|---|
| Software engineering recruiters | Can he build production software? | Projects with real scope, links to repos, stack context |
| Internship recruiters | Is he a solid CS fundamentals candidate? | Algorithms, DS work, competitive programming evidence, university context |
| Researchers / professors | Has he done real research with documented methods and results? | ML projects with methodology, results, and paper/demo links |
| Technical hiring managers | Does he solve hard problems or just assemble libraries? | Projects where the challenge is explained, not just the output |
| Other programmers | Is there interesting work here worth looking at? | Code quality, interesting problem choices, GitHub links |

## Portfolio Goals

### Primary goals

- A visitor must be able to identify Antonio's specialization within 10 seconds of landing.
- Every project card must communicate the problem solved and the result, not just the title and tech stack.
- Contact channels (LinkedIn, GitHub, email) must be immediately visible and functional.

### Secondary goals

- The site itself must be technically credible: accessible, fast, correct HTML, no broken links.
- Adding a new project must require only editing a JSON file — no component changes.
- The user's dark/light mode preference must persist across page navigation.

### Anti-goals

- Do not pad the project list. Five strong, well-explained projects are better than ten shallow entries.
- Do not use the projects page as a resume dump. Each entry must earn its place by demonstrating something technically interesting.
- Do not make the site about the site. The technology choices for the portfolio itself are secondary to the content.

## Content Inventory

### Pages

| Route | Purpose |
|---|---|
| `/` | Hero: positioning statement, specialization areas, social links, profile photo |
| `/projects` | Curated project sections: Software Engineering, Machine Learning, Games |

The home page currently has only a name, title, one-line bio, and photo. It should be extended to also communicate specialization and current interests — without becoming a resume. See the improvement roadmap for specifics.

### Data files (in `/public`)

| File | Content |
|---|---|
| `public/projects/projects.json` | Software engineering projects (5 entries) |
| `public/games/games.json` | Game projects (6 entries) |
| `public/machinelearning/machinelearning.json` | ML/AI research projects (2 entries) |

Adding a new entry to any JSON file is the only action required to add a new project card.

### Project entry quality standard

Each JSON entry must include:

- **`img`** — a representative screenshot or diagram (not a placeholder)
- **`title`** — the project name
- **`description`** — one to two sentences that name the problem, the approach, and ideally a result or scale indicator. Not just "a project that does X."
- **`tools`** — only technologies actually central to the project, not every dependency touched
- **`repoLink`** — link to the GitHub repository
- **`siteLink`** — link to a live demo, paper, or presentation if one exists; otherwise the same as `repoLink`

**Example of a weak description (do not write this):**
> "A project for analyzing news articles using machine learning."

**Example of a strong description (write this):**
> "Trained and compared BERT, CNN, and LSTM models on a corpus of 20,000 labeled news articles to detect misinformation. Achieved 94% F1 using fine-tuned BERT."

## What This Site Is NOT

- Not a blog. Do not add a blog, CMS, or dynamic content pipeline unless explicitly requested.
- Not a full web application. No authentication, databases, or server-side logic. The site is a static export deployed to GitHub Pages.
- Not a rebuild. Improvements extend and refine the existing implementation. Existing working features must not be broken.
- Not a resume. The portfolio complements a resume; it does not replicate it. Focus on showing work, not listing qualifications.

## Guiding Principle for Improvements

> Show the work. Let the work make the argument.

Every content and UI improvement must make it easier for a visitor to find, understand, and be convinced by the technical work. Changes that add complexity without serving that goal should be rejected.

Every engineering improvement must be justifiable by: better accessibility, better performance, better UX for the target audience, or better maintainability. Cosmetic changes for their own sake are low priority.
