// Builds a pre-filled mailto: link for the estimate form. No server, no
// persistence — the browser's own mail client sends it. Keep this pure and
// testable: no DOM access here, just string in, string out.

const ESTIMATE_EMAIL = "ornelascleaning@gmail.com";

export interface EstimateFormData {
  name: string;
  cityOrAddress: string;
  serviceType: string;
  details: string;
}

export function buildEstimateMailto(data: EstimateFormData): string {
  const subject = "Free Estimate Request";

  const bodyLines = [
    `Name: ${data.name || "-"}`,
    `City / Address: ${data.cityOrAddress || "-"}`,
    `Service Type: ${data.serviceType || "-"}`,
    "",
    "Details:",
    data.details || "-",
  ];
  const body = bodyLines.join("\n");

  // encodeURIComponent (not URLSearchParams) so spaces become %20, not "+" —
  // mailto: links follow RFC 6068, not application/x-www-form-urlencoded.
  const query = [`subject=${encodeURIComponent(subject)}`, `body=${encodeURIComponent(body)}`].join(
    "&",
  );
  return `mailto:${ESTIMATE_EMAIL}?${query}`;
}
