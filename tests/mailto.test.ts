import { describe, it, expect } from "vitest";
import { buildEstimateMailto } from "../src/lib/mailto";

const ESTIMATE_EMAIL = "ornelascleaning@gmail.com";

describe("buildEstimateMailto", () => {
  it("targets the Ornelas Cleaning estimate inbox", () => {
    const url = buildEstimateMailto({
      name: "Jane Doe",
      cityOrAddress: "Newton, MA",
      serviceType: "Recurring Cleaning",
      details: "Two bedrooms, one bathroom, biweekly please.",
    });
    expect(url.startsWith(`mailto:${ESTIMATE_EMAIL}?`)).toBe(true);
  });

  it("includes a subject line mentioning the estimate request", () => {
    const url = buildEstimateMailto({
      name: "Jane Doe",
      cityOrAddress: "Newton, MA",
      serviceType: "Recurring Cleaning",
      details: "Two bedrooms, one bathroom, biweekly please.",
    });
    expect(url).toContain("subject=");
    expect(decodeURIComponent(url)).toContain("Estimate Request");
  });

  it("encodes name, city/address, service type and details into the body", () => {
    const url = buildEstimateMailto({
      name: "Jane Doe",
      cityOrAddress: "Newton, MA",
      serviceType: "Deep Cleaning",
      details: "Moving out end of month.",
    });
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain("Jane Doe");
    expect(decoded).toContain("Newton, MA");
    expect(decoded).toContain("Deep Cleaning");
    expect(decoded).toContain("Moving out end of month.");
  });

  it("produces a well-formed mailto URL with no raw spaces or line breaks", () => {
    const url = buildEstimateMailto({
      name: "Jane Doe",
      cityOrAddress: "Newton, MA",
      serviceType: "Deep Cleaning",
      details: "Line one\nLine two",
    });
    expect(url).not.toMatch(/[\s]/);
  });

  it("still produces a valid mailto link when optional fields are blank", () => {
    const url = buildEstimateMailto({
      name: "",
      cityOrAddress: "",
      serviceType: "",
      details: "",
    });
    expect(url.startsWith(`mailto:${ESTIMATE_EMAIL}?`)).toBe(true);
    expect(url).toContain("subject=");
    expect(url).toContain("body=");
  });
});
