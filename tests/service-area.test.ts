import { describe, it, expect } from "vitest";
import { SERVICE_AREA_CITIES, isCityInServiceArea } from "../src/lib/service-area";

describe("SERVICE_AREA_CITIES", () => {
  it("has exactly the 13 approved cities, no more, no less", () => {
    expect(SERVICE_AREA_CITIES).toHaveLength(13);
    expect(SERVICE_AREA_CITIES).toEqual([
      "Andover",
      "Swampscott",
      "Danvers",
      "Lexington",
      "Boston",
      "Watertown",
      "Newton",
      "Revere",
      "West Roxbury",
      "Weston",
      "Essex",
      "Weymouth",
      "Dorchester",
    ]);
  });

  it("never includes Everett", () => {
    expect(SERVICE_AREA_CITIES).not.toContain("Everett");
  });
});

describe("isCityInServiceArea", () => {
  it("returns true for a city that is in the list, exact case", () => {
    expect(isCityInServiceArea("Boston")).toBe(true);
  });

  it("returns true regardless of case (case-insensitive match)", () => {
    expect(isCityInServiceArea("boston")).toBe(true);
    expect(isCityInServiceArea("WATERTOWN")).toBe(true);
    expect(isCityInServiceArea("west roxbury")).toBe(true);
  });

  it("returns true when the input has surrounding whitespace", () => {
    expect(isCityInServiceArea("  Newton  ")).toBe(true);
  });

  it("returns false for Everett specifically", () => {
    expect(isCityInServiceArea("Everett")).toBe(false);
  });

  it("returns false for a city outside the coverage area", () => {
    expect(isCityInServiceArea("Cambridge")).toBe(false);
  });

  it("returns false for empty or garbage input", () => {
    expect(isCityInServiceArea("")).toBe(false);
    expect(isCityInServiceArea("   ")).toBe(false);
  });
});
