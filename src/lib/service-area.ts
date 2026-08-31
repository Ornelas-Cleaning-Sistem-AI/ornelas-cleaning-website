// Exactly the 13 cities Ornelas Cleaning covers. Do not add or remove
// without explicit sign-off from the business owner — this list is
// contractual copy, not a guess. Everett must never appear here.
export const SERVICE_AREA_CITIES = [
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
] as const;

export type ServiceAreaCity = (typeof SERVICE_AREA_CITIES)[number];

/**
 * Checks whether a free-typed city name matches one of the covered cities.
 * Case-insensitive, trims surrounding whitespace. Empty input is never a match.
 */
export function isCityInServiceArea(input: string): boolean {
  const normalized = input.trim().toLowerCase();
  if (normalized === "") return false;
  return SERVICE_AREA_CITIES.some((city) => city.toLowerCase() === normalized);
}
