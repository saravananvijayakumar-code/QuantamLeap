import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { generateServiceJsonLd } from "@/lib/structured-data/service";
import { ServiceData, OfferData } from "@/lib/structured-data/types";

/**
 * Property 2: Offer Entities Preserve Pricing Tier Data
 *
 * For any array of pricing tier objects passed to `generateServiceJsonLd`,
 * the output `offers` array SHALL contain an Offer entity for each input tier,
 * and each Offer SHALL contain `name`, `price`, `priceCurrency` set to "AUD",
 * and `description` matching the corresponding input tier.
 *
 * **Validates: Requirements 2.2**
 */

const offerArbitrary: fc.Arbitrary<OfferData> = fc.record({
  name: fc.string({ minLength: 1 }),
  price: fc.string({ minLength: 1 }),
  priceCurrency: fc.constant("AUD"),
  description: fc.string({ minLength: 1 }),
});

const serviceDataArbitrary: fc.Arbitrary<ServiceData> = fc.record({
  name: fc.string({ minLength: 1 }),
  description: fc.string({ minLength: 1 }),
  provider: fc.record({
    name: fc.string({ minLength: 1 }),
    url: fc.webUrl(),
    logo: fc.webUrl(),
    description: fc.string({ minLength: 1 }),
    founder: fc.record({
      name: fc.string({ minLength: 1 }),
      jobTitle: fc.string({ minLength: 1 }),
      sameAs: fc.array(fc.webUrl(), { minLength: 0, maxLength: 3 }),
    }),
    foundingDate: fc.date().map((d) => d.toISOString().split("T")[0]),
    contactPoint: fc.record({
      contactType: fc.string({ minLength: 1 }),
      url: fc.webUrl(),
      availableLanguage: fc.constantFrom("en", "en-AU", "fr", "de"),
    }),
    sameAs: fc.array(fc.webUrl(), { minLength: 0, maxLength: 3 }),
  }),
  offers: fc.array(offerArbitrary, { minLength: 1, maxLength: 10 }),
});

describe("Service JSON-LD Generator - Property Tests", () => {
  it("Property 2: Offer Entities Preserve Pricing Tier Data - Validates: Requirements 2.2", () => {
    fc.assert(
      fc.property(serviceDataArbitrary, (serviceData: ServiceData) => {
        const result = generateServiceJsonLd(serviceData);

        // Assert @context equals "https://schema.org"
        expect(result["@context"]).toBe("https://schema.org");

        // Assert @type equals "Service"
        expect(result["@type"]).toBe("Service");

        // Assert offers array length matches input offers length
        const offers = result.offers as Array<Record<string, unknown>>;
        expect(offers).toHaveLength(serviceData.offers.length);

        // Assert each Offer preserves data from corresponding input tier
        for (let i = 0; i < serviceData.offers.length; i++) {
          const inputOffer = serviceData.offers[i];
          const outputOffer = offers[i];

          // Assert each Offer has @type "Offer"
          expect(outputOffer["@type"]).toBe("Offer");

          // Assert each Offer preserves name, price, priceCurrency, and description
          expect(outputOffer.name).toBe(inputOffer.name);
          expect(outputOffer.price).toBe(inputOffer.price);
          expect(outputOffer.priceCurrency).toBe(inputOffer.priceCurrency);
          expect(outputOffer.description).toBe(inputOffer.description);

          // Assert priceCurrency is "AUD" for all offers
          expect(outputOffer.priceCurrency).toBe("AUD");
        }
      }),
      { numRuns: 150 }
    );
  });
});
