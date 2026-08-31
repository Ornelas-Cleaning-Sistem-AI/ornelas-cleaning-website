import { describe, it, expect, beforeAll } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Index from "../src/pages/index.astro";
import { SERVICE_AREA_CITIES } from "../src/lib/service-area";

let html: string;

beforeAll(async () => {
  const container = await AstroContainer.create();
  html = await container.renderToString(Index);
});

describe("homepage content", () => {
  it("renders the hero headline, subheadline and primary CTA", () => {
    expect(html).toContain("The Same Trusted Team Cleans Your Home, Every Time");
    expect(html).toContain(
      "Reliable, recurring house cleaning across Boston and the North Shore",
    );
    expect(html).toContain("Get Your Free Estimate");
  });

  it("lists exactly the 13 approved service-area cities", () => {
    for (const city of SERVICE_AREA_CITIES) {
      expect(html).toContain(city);
    }
  });

  it("never mentions Everett anywhere on the page", () => {
    expect(html).not.toMatch(/everett/i);
  });

  it("never uses banned marketing phrases", () => {
    const banned = [
      "industry-leading",
      "best-in-class",
      "cheapest",
      "lowest price in town",
      "as soon as possible",
      "we apologize for any inconvenience",
      "our team of certified professionals",
      "24/7",
    ];
    const lowerHtml = html.toLowerCase();
    for (const phrase of banned) {
      expect(lowerHtml).not.toContain(phrase.toLowerCase());
    }
  });

  it("includes the contact channels: call, text, and email", () => {
    expect(html).toContain("tel:+16178675878");
    expect(html).toContain("sms:+16178675878");
    expect(html).toContain("mailto:ornelascleaning@gmail.com");
  });

  it("includes all five services offered", () => {
    expect(html).toContain("Recurring Cleaning");
    expect(html).toContain("Deep Cleaning");
    expect(html).toContain("Move-In/Move-Out Cleaning");
    expect(html).toContain("Airbnb Turnover Cleaning");
    expect(html).toContain("Office Cleaning");
  });

  it("includes the About Helena section and the phone number in the footer", () => {
    expect(html).toContain("Helena");
    expect(html).toContain("(617) 867-5878");
  });

  it("never calls the company 'Ornelas Clean' (missing the 's')", () => {
    expect(html).not.toContain("Ornelas Clean<");
    expect(html).not.toMatch(/Ornelas Clean(?!ing)/);
  });

  it("includes an estimate form with name, address, service type, and details fields", () => {
    expect(html).toContain('id="estimate"');
    expect(html).toContain('name="name"');
    expect(html).toContain('name="cityOrAddress"');
    expect(html).toContain('name="serviceType"');
    expect(html).toContain('name="details"');
  });

  it("includes a photo gallery of real client homes", () => {
    expect(html).toContain('id="gallery"');
  });
});
