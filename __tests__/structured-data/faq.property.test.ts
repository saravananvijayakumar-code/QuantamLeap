import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { generateFAQPageJsonLd } from "@/lib/structured-data/faq";
import { FAQItem } from "@/lib/structured-data/types";

/**
 * **Validates: Requirements 5.3**
 * Property 5: FAQ Schema Matches Input Data
 *
 * For any array of FAQ items (question/answer pairs) passed to generateFAQPageJsonLd,
 * the output SHALL contain a mainEntity array where each Question entity's name equals
 * the input question text and each acceptedAnswer.text equals the input answer text,
 * preserving order and count.
 */
describe("Property 5: FAQ Schema Matches Input Data", () => {
  // Generator for non-empty FAQ items
  const faqItemArb: fc.Arbitrary<FAQItem> = fc.record({
    question: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
    answer: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
  });

  // Generator for arrays of FAQ items (1 to 20 items)
  const faqItemsArb = fc.array(faqItemArb, { minLength: 1, maxLength: 20 });

  it("output @context equals 'https://schema.org'", () => {
    fc.assert(
      fc.property(faqItemsArb, (items) => {
        const result = generateFAQPageJsonLd(items);
        expect(result["@context"]).toBe("https://schema.org");
      }),
      { numRuns: 100 }
    );
  });

  it("output @type equals 'FAQPage'", () => {
    fc.assert(
      fc.property(faqItemsArb, (items) => {
        const result = generateFAQPageJsonLd(items);
        expect(result["@type"]).toBe("FAQPage");
      }),
      { numRuns: 100 }
    );
  });

  it("mainEntity array has same length as input", () => {
    fc.assert(
      fc.property(faqItemsArb, (items) => {
        const result = generateFAQPageJsonLd(items);
        const mainEntity = result.mainEntity as unknown[];
        expect(mainEntity).toHaveLength(items.length);
      }),
      { numRuns: 100 }
    );
  });

  it("each entry has @type 'Question'", () => {
    fc.assert(
      fc.property(faqItemsArb, (items) => {
        const result = generateFAQPageJsonLd(items);
        const mainEntity = result.mainEntity as Array<Record<string, unknown>>;
        for (const entity of mainEntity) {
          expect(entity["@type"]).toBe("Question");
        }
      }),
      { numRuns: 100 }
    );
  });

  it("each entry's name equals the corresponding input question", () => {
    fc.assert(
      fc.property(faqItemsArb, (items) => {
        const result = generateFAQPageJsonLd(items);
        const mainEntity = result.mainEntity as Array<Record<string, unknown>>;
        for (let i = 0; i < items.length; i++) {
          expect(mainEntity[i].name).toBe(items[i].question);
        }
      }),
      { numRuns: 100 }
    );
  });

  it("each entry's acceptedAnswer.text equals the corresponding input answer", () => {
    fc.assert(
      fc.property(faqItemsArb, (items) => {
        const result = generateFAQPageJsonLd(items);
        const mainEntity = result.mainEntity as Array<Record<string, unknown>>;
        for (let i = 0; i < items.length; i++) {
          const acceptedAnswer = mainEntity[i].acceptedAnswer as Record<string, unknown>;
          expect(acceptedAnswer.text).toBe(items[i].answer);
        }
      }),
      { numRuns: 100 }
    );
  });

  it("each acceptedAnswer has @type 'Answer'", () => {
    fc.assert(
      fc.property(faqItemsArb, (items) => {
        const result = generateFAQPageJsonLd(items);
        const mainEntity = result.mainEntity as Array<Record<string, unknown>>;
        for (const entity of mainEntity) {
          const acceptedAnswer = entity.acceptedAnswer as Record<string, unknown>;
          expect(acceptedAnswer["@type"]).toBe("Answer");
        }
      }),
      { numRuns: 100 }
    );
  });
});
