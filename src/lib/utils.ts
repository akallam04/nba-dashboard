import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeColor(hex: string | null | undefined): string {
  if (!hex) return "#888888";
  const trimmed = hex.trim();
  if (trimmed.startsWith("#")) return trimmed;
  if (/^[0-9a-fA-F]{3,8}$/.test(trimmed)) return `#${trimmed}`;
  return trimmed || "#888888";
}

// Known corrections for URLs that TheSportsDB has wrong or stale.
// Key is the raw value from the API (after whitespace trim, before adding protocol).
const SOCIAL_CORRECTIONS: Record<string, string> = {
  // API returns /hawks which is an unrelated page; official Hawks page is /atlhawks
  "www.facebook.com/hawks": "www.facebook.com/atlhawks",
};

const SOCIAL_DOMAINS: Record<string, string[]> = {
  facebook: ["facebook.com"],
  twitter: ["twitter.com", "x.com"],
  instagram: ["instagram.com"],
};

/**
 * Normalize and validate a social/website URL from TheSportsDB.
 * Returns a clean https URL, or null if the value is missing, malformed,
 * or doesn't match the expected domain for the given type.
 */
export function normalizeSocialUrl(
  url: string | null | undefined,
  type: "website" | "facebook" | "twitter" | "instagram"
): string | null {
  if (!url) return null;

  // Strip leading/trailing whitespace and trailing slashes, hashes, and fragments
  let raw = url.trim().replace(/[#/\s]+$/, "");
  if (!raw) return null;

  // Apply known corrections before adding protocol
  if (SOCIAL_CORRECTIONS[raw]) {
    raw = SOCIAL_CORRECTIONS[raw];
  }

  // Prepend https:// if no protocol present
  if (!raw.startsWith("http://") && !raw.startsWith("https://")) {
    raw = `https://${raw}`;
  }

  // Validate as a URL
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return null;
  }

  // Must be http(s)
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;

  if (type === "website") {
    return parsed.hostname ? raw : null;
  }

  // Social: verify the URL's hostname matches the expected platform
  const domains = SOCIAL_DOMAINS[type];
  const hostname = parsed.hostname.replace(/^www\./, "");
  const domainMatch = domains.some(
    (d) => hostname === d || hostname.endsWith(`.${d}`)
  );
  if (!domainMatch) return null;

  // Must have a real path segment after the domain (not just facebook.com or facebook.com/)
  const pathSegments = parsed.pathname.split("/").filter(Boolean);
  if (pathSegments.length === 0) return null;

  return raw;
}
