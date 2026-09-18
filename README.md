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
  assets/premium/  # editorial images for the hero and service cards
  assets/brand/    # logo files
  data/reviews.json
  lib/
    mailto.ts        # pure function: form data -> mailto: URL
    service-area.ts  # the 13 covered cities + a case-insensitive checker
    site.ts          # phone, e-mail and review link
  pages/index.astro  # assembles all sections
  styles/global.css  # brand colors, type, shared utility classes
tests/
  mailto.test.ts       # unit tests for the mailto builder
  service-area.test.ts # unit tests for the service-area checker
  homepage.test.ts     # renders the homepage and asserts on the HTML
  redesign.test.ts     # brand/section contract: logo, fonts, trust strip, reviews
```

## Brand

- Logo: `src/assets/brand/logo-ornelas-cleaning.png` (original, flat navy
  background) plus two derived transparent versions used on the site:
  `logo-on-light.png` (header, about) and `logo-on-dark.png` (footer,
  contact watermark, OG image). Favicons and `og-image.png` live in `public/`.
- Colors: navy `#0B4A8B` (primary), deep navy `#083A6E` (footer), sky
  `#3AB0E8` (decorative only), link/CTA blue `#0074BD` (AA on white),
  off-white `#F5F8FB`, body text `#1A2B3C` — all as CSS variables in
  `src/styles/global.css`.
- Type: Sora (headings) + Manrope (body), loaded from Google Fonts.
- Contact numbers/emails are the real business ones and live in
  `src/lib/site.ts`: `(617) 867-5878` (call/text) and
  `cleaningornelas@gmail.com`. `REVIEW_URL` there is a placeholder until the
  Google Business Profile review link is available.
- Reviews: `src/data/reviews.json`. Empty array = the section shows a
  "Leave us a review" call to action. Only real reviews go in this file.
- "Our Work" photos: `src/assets/images/`. The gallery lists them explicitly
  in `src/components/Gallery.astro`; photos showing names, faces, documents
  or other personal details are intentionally left out of that list.

## Contact/estimate flow (no backend)

The estimate form in `src/components/Contact.astro` never submits to a
server. On submit, it builds a `mailto:` link (via the pure, tested
`buildEstimateMailto` function) and redirects the browser to it, which opens
the visitor's own email client with the message pre-filled. Nothing is
persisted, nothing leaves the browser except through the visitor's own mail
app.
