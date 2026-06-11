import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { generatePageMetadata } from "@/lib/metadata/generate-metadata";
import { PageMetadataConfig } from "@/lib/structured-data/types";
import { BASE_URL } from "@/lib/metadata/constants";

/**
 * Property 6: Page Metadata Contains All Required Fields
 * Validates: Requirements 6.1, 7.1
 *
 * For any PageMetadataConfig passed to generatePageMetadata, the output SHALL
 * contain: title (≤60 characters), description (≤160 characters),
 * alternates.canonical (absolute URL), openGraph with title/description/url/
 * siteName/type/locale, and twitter with card/title/description.
 */

const arbPageMetadataConfig: fc.Arbitrary<PageMetadataConfig> = fc.record({
  title: fc.string({ minLength: 1, maxLength: 60 }),
  description: fc.string({ minLength: 1, maxLength: 160 }),
  path: fc.stringMatching(/^\/[a-z0-9\-\/]*$/).filter((s) => s.length >= 1 && s.length <= 100),
  ogType: fc.oneof(fc.constant("website"), fc.constant("article"), fc.constant(undefined)),
  image: fc.oneof(
    fc.constant(undefined),
    fc.webUrl()
  ),
});

describe("Page Metadata Generator - Property Tests", () => {
  it("should contain all required metadata fields for any valid PageMetadataConfig", () => {
    fc.assert(
      fc.property(arbPageMetadataConfig, (config) => {
        const result = generatePageMetadata(config);

        // Assert title matches input title and is ≤60 characters
        expect(result.title).toBe(config.title);
        expect(config.title.length).toBeLessThanOrEqual(60);

        // Assert description matches input description and is ≤160 characters
        expect(result.description).toBe(config.description);
        expect(config.description.length).toBeLessThanOrEqual(160);

        // Assert alternates.canonical is an absolute URL starting with BASE_URL
        expect(result.alternates).toBeDefined();
        const alternates = result.alternates as { canonical: string };
        expect(alternates.canonical).toBeDefined();
        expect(alternates.canonical).toMatch(/^https?:\/\//);
        expect(alternates.canonical).toBe(`${BASE_URL}${config.path}`);

        // Assert openGraph contains required fields
        expect(result.openGraph).toBeDefined();
        const og = result.openGraph as Record<string, unknown>;
        expect(og.title).toBe(config.title);
        expect(og.description).toBe(config.description);
        expect(og.url).toBe(`${BASE_URL}${config.path}`);
        expect(og.siteName).toBe("Quantum Leap Ventures");
        expect(og.type).toBeDefined();
        expect(og.locale).toBe("en_AU");

        // Assert twitter contains required fields
        expect(result.twitter).toBeDefined();
        const twitter = result.twitter as Record<string, unknown>;
        expect(twitter.card).toBe("summary_large_image");
        expect(twitter.title).toBe(config.title);
        expect(twitter.description).toBe(config.description);
      }),
      { numRuns: 150 }
    );
  });
});
