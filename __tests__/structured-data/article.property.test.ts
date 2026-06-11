import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { generateArticleJsonLd } from "@/lib/structured-data/article";
import { ArticleData, OrganizationData } from "@/lib/structured-data/types";

/**
 * Property 3: Article JSON-LD Contains All Required Properties
 *
 * For any blog post metadata passed to generateArticleJsonLd, the output SHALL
 * contain headline, description, datePublished, dateModified, author (with name),
 * publisher (with name and logo), and mainEntityOfPage — all with non-empty values.
 *
 * **Validates: Requirements 3.1, 3.2**
 */

// Arbitrary for non-empty strings
const nonEmptyString = fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0);

// Arbitrary for URL-like strings
const urlString = fc.webUrl();

// Arbitrary for ISO date strings using integer timestamps to avoid invalid dates
const isoDateString = fc
  .integer({ min: 946684800000, max: 1924991999000 }) // 2000-01-01 to 2030-12-31
  .map((ts) => new Date(ts).toISOString());

// Arbitrary for ArticleData
const articleDataArb: fc.Arbitrary<ArticleData> = fc.record({
  headline: nonEmptyString,
  description: nonEmptyString,
  datePublished: isoDateString,
  dateModified: isoDateString,
  image: fc.option(urlString, { nil: undefined }),
  canonicalUrl: urlString,
  speakableSelectors: fc.option(
    fc.array(nonEmptyString, { minLength: 1, maxLength: 5 }),
    { nil: undefined }
  ),
});

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

describe("Property 3: Article JSON-LD Contains All Required Properties", () => {
  it("should always contain @context set to https://schema.org", () => {
    fc.assert(
      fc.property(articleDataArb, organizationDataArb, (articleData, orgData) => {
        const result = generateArticleJsonLd(articleData, orgData);
        expect(result["@context"]).toBe("https://schema.org");
      }),
      { numRuns: 100 }
    );
  });

  it("should always contain @type set to Article", () => {
    fc.assert(
      fc.property(articleDataArb, organizationDataArb, (articleData, orgData) => {
        const result = generateArticleJsonLd(articleData, orgData);
        expect(result["@type"]).toBe("Article");
      }),
      { numRuns: 100 }
    );
  });

  it("should always contain headline, description, datePublished, dateModified with non-empty values", () => {
    fc.assert(
      fc.property(articleDataArb, organizationDataArb, (articleData, orgData) => {
        const result = generateArticleJsonLd(articleData, orgData);

        expect(result.headline).toBeTruthy();
        expect(typeof result.headline).toBe("string");
        expect((result.headline as string).length).toBeGreaterThan(0);

        expect(result.description).toBeTruthy();
        expect(typeof result.description).toBe("string");
        expect((result.description as string).length).toBeGreaterThan(0);

        expect(result.datePublished).toBeTruthy();
        expect(typeof result.datePublished).toBe("string");
        expect((result.datePublished as string).length).toBeGreaterThan(0);

        expect(result.dateModified).toBeTruthy();
        expect(typeof result.dateModified).toBe("string");
        expect((result.dateModified as string).length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it("should always contain author with @type Person and non-empty name", () => {
    fc.assert(
      fc.property(articleDataArb, organizationDataArb, (articleData, orgData) => {
        const result = generateArticleJsonLd(articleData, orgData);
        const author = result.author as Record<string, unknown>;

        expect(author).toBeDefined();
        expect(author["@type"]).toBe("Person");
        expect(author.name).toBeTruthy();
        expect(typeof author.name).toBe("string");
        expect((author.name as string).length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it("should always contain publisher with @type Organization, non-empty name, and logo with url", () => {
    fc.assert(
      fc.property(articleDataArb, organizationDataArb, (articleData, orgData) => {
        const result = generateArticleJsonLd(articleData, orgData);
        const publisher = result.publisher as Record<string, unknown>;

        expect(publisher).toBeDefined();
        expect(publisher["@type"]).toBe("Organization");
        expect(publisher.name).toBeTruthy();
        expect(typeof publisher.name).toBe("string");
        expect((publisher.name as string).length).toBeGreaterThan(0);

        const logo = publisher.logo as Record<string, unknown>;
        expect(logo).toBeDefined();
        expect(logo.url).toBeTruthy();
        expect(typeof logo.url).toBe("string");
        expect((logo.url as string).length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it("should always contain mainEntityOfPage with @type WebPage and non-empty @id", () => {
    fc.assert(
      fc.property(articleDataArb, organizationDataArb, (articleData, orgData) => {
        const result = generateArticleJsonLd(articleData, orgData);
        const mainEntity = result.mainEntityOfPage as Record<string, unknown>;

        expect(mainEntity).toBeDefined();
        expect(mainEntity["@type"]).toBe("WebPage");
        expect(mainEntity["@id"]).toBeTruthy();
        expect(typeof mainEntity["@id"]).toBe("string");
        expect((mainEntity["@id"] as string).length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it("should include speakable property with cssSelector array when speakableSelectors provided", () => {
    const articleWithSpeakable = fc.record({
      headline: nonEmptyString,
      description: nonEmptyString,
      datePublished: isoDateString,
      dateModified: isoDateString,
      image: fc.option(urlString, { nil: undefined }),
      canonicalUrl: urlString,
      speakableSelectors: fc.array(nonEmptyString, { minLength: 1, maxLength: 5 }),
    });

    fc.assert(
      fc.property(articleWithSpeakable, organizationDataArb, (articleData, orgData) => {
        const result = generateArticleJsonLd(articleData, orgData);
        const speakable = result.speakable as Record<string, unknown>;

        expect(speakable).toBeDefined();
        expect(speakable["@type"]).toBe("SpeakableSpecification");
        expect(Array.isArray(speakable.cssSelector)).toBe(true);
        expect((speakable.cssSelector as string[]).length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });
});
