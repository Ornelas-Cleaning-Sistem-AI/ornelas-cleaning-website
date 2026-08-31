# Ornelas Cleaning — Website

Static marketing/conversion site for Ornelas Cleaning (house cleaning,
Boston + North Shore, MA). Built from scratch — no backend, no database.
Contact happens via `tel:`, `sms:`, and a `mailto:` estimate form that runs
entirely in the browser.

## Stack

- **Astro** (static output, no server adapter) — chosen because the site is
  100% static content with a couple of small interactive islands (the
  estimate form), which is exactly what Astro is built for. It ships zero
  JS by default and only the estimate-form script is loaded.
- **TypeScript** for the two pure business-logic modules (`src/lib/`).
- **Vitest** (+ Astro's `experimental_AstroContainer`) for tests — pure
  function tests plus a rendered-HTML content test for the homepage.
- Images imported through `astro:assets` (`<Image />`), which optimizes and
  converts the already-resized JPGs to `.webp` at build time (see numbers
  below).

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` (static HTML/CSS/JS) |
| `npm run preview` | Preview the production build locally |
| `npx vitest run` | Run the test suite once (no watch) |

## Project structure

```
src/
  assets/images/   # source photos (real client homes), optimized at build
  components/      # one Astro component per homepage section
  layouts/Layout.astro
  lib/
    mailto.ts        # pure function: form data -> mailto: URL
    service-area.ts  # the 13 covered cities + a case-insensitive checker
  pages/index.astro  # assembles all sections
  styles/global.css  # brand colors, type, shared utility classes
tests/
  mailto.test.ts       # unit tests for the mailto builder
  service-area.test.ts # unit tests for the service-area checker
  homepage.test.ts     # renders the homepage and asserts on the HTML
```

## Brand

- Colors: Ornelas Blue `#1B4B66`, Soft Sky `#7FB3D5`, Warm White `#F7F5F2`,
  body text `#333333` — all as CSS variables in `src/styles/global.css`.
- Type: Poppins (headings) + Inter (body), loaded from Google Fonts.
- Contact numbers/emails are the real business ones: `(617) 867-5878`
  (call/text) and `ornelascleaning@gmail.com`.

## Contact/estimate flow (no backend)

The estimate form in `src/components/Contact.astro` never submits to a
server. On submit, it builds a `mailto:` link (via the pure, tested
`buildEstimateMailto` function) and redirects the browser to it, which opens
the visitor's own email client with the message pre-filled. Nothing is
persisted, nothing leaves the browser except through the visitor's own mail
app.
