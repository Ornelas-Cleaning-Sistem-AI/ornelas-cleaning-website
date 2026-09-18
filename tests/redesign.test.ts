import { describe, it, expect, beforeAll } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Index from "../src/pages/index.astro";
import reviews from "../src/data/reviews.json";

let html: string;

beforeAll(async () => {
  const container = await AstroContainer.create();
  html = await container.renderToString(Index);
});

describe("redesign: brand", () => {
  it("shows the Ornelas Cleaning logo in the header (not the Astro default favicon)", () => {
    // Header must render an <img> whose alt is the brand name.
    expect(html).toMatch(/<header[\s\S]*?<img[^>]+alt="Ornelas Cleaning"[\s\S]*?<\/header>/);
  });

  it("never mentions the old 'Painting' brand anywhere", () => {
    expect(html).not.toMatch(/painting/i);
  });

  it("does not load the generic Inter + Poppins font pairing", () => {
    expect(html).not.toMatch(/family=Inter/);
    expect(html).not.toMatch(/family=Poppins/);
  });
});

describe("redesign: sections", () => {
  it("has a trust strip instead of invented stat cards", () => {
    expect(html).toContain('id="trust"');
    expect(html).not.toContain("recurring clients trust us with their homes");
  });

  // The trust strip carried an insurance claim until 2026-09-17. It shipped
  // without paperwork backing the exact wording, so it is now a test failure
  // rather than a judgement call. What has to be true before such wording
  // ships is recorded in the company ledger — not here, this repo is public.
  it("makes no insured/bonded claim anywhere on the page", () => {
    expect(html.toLowerCase()).not.toMatch(/insured|bonded/);
  });

  it("renders a reviews section with the Google label", () => {
    expect(html).toContain('id="reviews"');
    expect(html).toContain("Google");
  });

  it("when reviews.json is empty, shows a 'Leave us a review' CTA and no empty review card", () => {
    if (reviews.length === 0) {
      expect(html).toContain("Leave us a review");
      expect(html).not.toContain('class="review-card"');
    } else {
      expect(html).toContain('class="review-card"');
    }
  });

  it("keeps the real-photo gallery and puts it before the reviews", () => {
    const gallery = html.indexOf('id="gallery"');
    const reviewsIdx = html.indexOf('id="reviews"');
    expect(gallery).toBeGreaterThan(-1);
    expect(reviewsIdx).toBeGreaterThan(-1);
    expect(gallery).toBeLessThan(reviewsIdx);
  });
});
