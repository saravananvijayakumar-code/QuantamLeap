import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { generateArticleJsonLd } from "@/lib/structured-data/article";
import { ArticleData, OrganizationData } from "@/lib/structured-data/types";

/**
 * Property 9: Blog Post Speakable Selectors Are Present
 *
 * For any blog post article data with speakableSelectors provided, the generated
 * Article JSON-LD SHALL include a speakable property with a cssSelector array
 * containing all provided selectors.
 *
 * **Validates: Requirements 9.2**
 */

// Arbitrary for non-empty strings
const nonEmptyString = fc
  .string({ minLength: 1, maxLength: 100 })
  .filter((s) => s.trim().length > 0);

// Arbitrary for URL-like strings
const urlString = fc.webUrl();

// Arbitrary for ISO date strings
const isoDateString = fc
  .integer({ min: 946684800000, max: 1924991999000 })
  .map((ts) => new Date(ts).toISOString());

// Arbitrary for CSS selector-like strings
const cssSelectorString = fc
  .stringMatching(/^[a-z][a-z0-9\-]*(\.[a-z][a-z0-9\-]*)*$/)
  .filter((s) => s.length >= 1 && s.length <= 50);

// Arbitrary for OrganizationData
const organizationDataArb: fc.Arbitrary<OrganizationData> = fc.record({
  name: nonEmptyString,
  url: urlString,
  logo: urlString,
  description: nonEmptyString,
  founder: fc.record({
    name: nonEmptyString,
    jobTitle: nonEmptyString,
    sameAs: fc.array(urlString, { minLength: 0, maxLength: 3 }),
  }),
  foundingDate: isoDateString,
  contactPoint: fc.record({
    contactType: nonEmptyString,
    url: urlString,
    availableLanguage: nonEmptyString,
  }),
  sameAs: fc.array(urlString, { minLength: 0, maxLength: 3 }),
});

// Arbitrary for ArticleData WITH speakableSelectors (non-empty array)
const articleDataWithSpeakableArb: fc.Arbitrary<ArticleData> = fc.record({
  headline: nonEmptyString,
  description: nonEmptyString,
  datePublished: isoDateString,
  dateModified: isoDateString,
  image: fc.option(urlString, { nil: undefined }),
  canonicalUrl: urlString,
  speakableSelectors: fc.array(cssSelectorString, { minLength: 1, maxLength: 10 }),
});

// Arbitrary for ArticleData WITHOUT speakableSelectors
const articleDataWithoutSpeakableArb: fc.Arbitrary<ArticleData> = fc.record({
  headline: nonEmptyString,
  description: nonEmptyString,
  datePublished: isoDateString,
  dateModified: isoDateString,
  image: fc.option(urlString, { nil: undefined }),
  canonicalUrl: urlString,
  speakableSelectors: fc.constant(undefined),
});

describe("Property 9: Blog Post Speakable Selectors Are Present", () => {
  it("should include a speakable property when speakableSelectors are provided", () => {
    fc.assert(
      fc.property(
        articleDataWithSpeakableArb,
        organizationDataArb,
        (articleData, orgData) => {
          const result = generateArticleJsonLd(articleData, orgData);
          expect(result.speakable).toBeDefined();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should set speakable @type to SpeakableSpecification", () => {
    fc.assert(
      fc.property(
        articleDataWithSpeakableArb,
        organizationDataArb,
        (articleData, orgData) => {
          const result = generateArticleJsonLd(articleData, orgData);
          const speakable = result.speakable as Record<string, unknown>;
          expect(speakable["@type"]).toBe("SpeakableSpecification");
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should have speakable.cssSelector as an array", () => {
    fc.assert(
      fc.property(
        articleDataWithSpeakableArb,
        organizationDataArb,
        (articleData, orgData) => {
          const result = generateArticleJsonLd(articleData, orgData);
          const speakable = result.speakable as Record<string, unknown>;
          expect(Array.isArray(speakable.cssSelector)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should contain all selectors from the input speakableSelectors", () => {
    fc.assert(
      fc.property(
        articleDataWithSpeakableArb,
        organizationDataArb,
        (articleData, orgData) => {
          const result = generateArticleJsonLd(articleData, orgData);
          const speakable = result.speakable as Record<string, unknown>;
          const cssSelectors = speakable.cssSelector as string[];

          for (const selector of articleData.speakableSelectors!) {
            expect(cssSelectors).toContain(selector);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should have cssSelector array length equal to input speakableSelectors length", () => {
    fc.assert(
      fc.property(
        articleDataWithSpeakableArb,
        organizationDataArb,
        (articleData, orgData) => {
          const result = generateArticleJsonLd(articleData, orgData);
          const speakable = result.speakable as Record<string, unknown>;
          const cssSelectors = speakable.cssSelector as string[];

          expect(cssSelectors.length).toBe(articleData.speakableSelectors!.length);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("should NOT include a speakable property when speakableSelectors is undefined", () => {
    fc.assert(
      fc.property(
        articleDataWithoutSpeakableArb,
        organizationDataArb,
        (articleData, orgData) => {
          const result = generateArticleJsonLd(articleData, orgData);
          expect(result.speakable).toBeUndefined();
        }
      ),
      { numRuns: 100 }
    );
  });
});
