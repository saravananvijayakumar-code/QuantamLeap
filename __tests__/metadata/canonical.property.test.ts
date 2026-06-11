import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { generatePageMetadata } from "@/lib/metadata/generate-metadata";
import { BASE_URL } from "@/lib/metadata/constants";

/**
 * Property 7: Canonical URL Matches Page Path
 *
 * For any page path passed to generatePageMetadata, the alternates.canonical
 * value SHALL equal the base domain concatenated with the page path.
 *
 * **Validates: Requirements 7.1**
 */
describe("Property 7: Canonical URL Matches Page Path", () => {
  // Generator for path segments: alphanumeric strings with hyphens and underscores
  const segmentArb = fc
    .string({ minLength: 1, maxLength: 20 })
    .map((s) => s.replace(/[^a-z0-9\-_]/gi, ""))
    .filter((s) => s.length > 0);

  // Generator for page paths: "/" followed by 0-5 segments joined by "/"
  const pathArb = fc
    .array(segmentArb, { minLength: 0, maxLength: 5 })
    .map((segments) => "/" + segments.join("/"));

  it("alternates.canonical equals BASE_URL + path for any valid page path", () => {
    fc.assert(
      fc.property(pathArb, (path) => {
        const result = generatePageMetadata({
          title: "Test Page",
          description: "A test description",
          path,
        });

        const expectedCanonical = `${BASE_URL}${path}`;

        expect(result.alternates).toBeDefined();
        expect(result.alternates!.canonical).toBe(expectedCanonical);
      }),
      { numRuns: 150 }
    );
  });
});
