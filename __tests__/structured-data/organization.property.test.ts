import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { generateOrganizationJsonLd } from "@/lib/structured-data/organization";
import { OrganizationData } from "@/lib/structured-data/types";

/**
 * Property 1: Organization JSON-LD Contains All Required Properties
 * Validates: Requirements 1.1
 *
 * For any valid OrganizationData passed to generateOrganizationJsonLd,
 * the output object SHALL contain the properties @context, @type, name, url,
 * logo, description, founder, foundingDate, contactPoint, and sameAs —
 * all with non-empty values.
 */

const arbPersonData = fc.record({
  name: fc.string({ minLength: 1 }),
  jobTitle: fc.string({ minLength: 1 }),
  sameAs: fc.array(
    fc.webUrl(),
    { minLength: 1, maxLength: 5 }
  ),
});

const arbContactPointData = fc.record({
  contactType: fc.string({ minLength: 1 }),
  url: fc.webUrl(),
  availableLanguage: fc.string({ minLength: 1 }),
});

const arbOrganizationData: fc.Arbitrary<OrganizationData> = fc.record({
  name: fc.string({ minLength: 1 }),
  url: fc.webUrl(),
  logo: fc.webUrl(),
  description: fc.string({ minLength: 1 }),
  founder: arbPersonData,
  foundingDate: fc.integer({ min: 1900, max: 2099 }).chain((year) =>
    fc.integer({ min: 1, max: 12 }).chain((month) =>
      fc.integer({ min: 1, max: 28 }).map((day) =>
        `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      )
    )
  ),
  contactPoint: arbContactPointData,
  sameAs: fc.array(
    fc.webUrl(),
    { minLength: 1, maxLength: 5 }
  ),
});

describe("Organization JSON-LD Generator - Property Tests", () => {
  it("should contain all required Schema.org properties with non-empty values", () => {
    fc.assert(
      fc.property(arbOrganizationData, (data) => {
        const result = generateOrganizationJsonLd(data);

        // Assert all required properties exist
        expect(result).toHaveProperty("@context");
        expect(result).toHaveProperty("@type");
        expect(result).toHaveProperty("name");
        expect(result).toHaveProperty("url");
        expect(result).toHaveProperty("logo");
        expect(result).toHaveProperty("description");
        expect(result).toHaveProperty("founder");
        expect(result).toHaveProperty("foundingDate");
        expect(result).toHaveProperty("contactPoint");
        expect(result).toHaveProperty("sameAs");

        // Assert @context equals "https://schema.org"
        expect(result["@context"]).toBe("https://schema.org");

        // Assert @type equals "Organization"
        expect(result["@type"]).toBe("Organization");

        // Assert all values are non-empty
        expect(result["name"]).not.toBe("");
        expect(result["url"]).not.toBe("");
        expect(result["logo"]).not.toBe("");
        expect(result["description"]).not.toBe("");
        expect(result["foundingDate"]).not.toBe("");

        // Assert founder nested object has @type "Person" with input founder data
        const founder = result["founder"] as Record<string, unknown>;
        expect(founder["@type"]).toBe("Person");
        expect(founder["name"]).toBe(data.founder.name);
        expect(founder["jobTitle"]).toBe(data.founder.jobTitle);
        expect(founder["sameAs"]).toEqual(data.founder.sameAs);

        // Assert sameAs is an array
        expect(Array.isArray(result["sameAs"])).toBe(true);
        expect((result["sameAs"] as string[]).length).toBeGreaterThan(0);
      }),
      { numRuns: 150 }
    );
  });
});
