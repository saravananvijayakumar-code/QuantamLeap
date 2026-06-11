import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { generateBreadcrumbJsonLd } from "@/lib/structured-data/breadcrumb";
import { BreadcrumbItem } from "@/lib/structured-data/types";

/**
 * Property 4: Breadcrumb Positions Are Sequential Starting At 1
 *
 * For any array of breadcrumb items passed to generateBreadcrumbJsonLd,
 * the output itemListElement SHALL have sequential position values starting at 1,
 * and each item SHALL contain name (non-empty string) and item (valid URL string).
 *
 * **Validates: Requirements 4.1, 4.2**
 */
describe("Property 4: Breadcrumb Positions Are Sequential Starting At 1", () => {
  const breadcrumbItemArb: fc.Arbitrary<BreadcrumbItem> = fc.record({
    name: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
    url: fc.webUrl(),
  });

  const breadcrumbItemsArb: fc.Arbitrary<BreadcrumbItem[]> = fc.array(
    breadcrumbItemArb,
    { minLength: 1, maxLength: 20 }
  );

  it("should have @context equal to 'https://schema.org'", () => {
    fc.assert(
      fc.property(breadcrumbItemsArb, (items) => {
        const result = generateBreadcrumbJsonLd(items);
        expect(result["@context"]).toBe("https://schema.org");
      }),
      { numRuns: 100 }
    );
  });

  it("should have @type equal to 'BreadcrumbList'", () => {
    fc.assert(
      fc.property(breadcrumbItemsArb, (items) => {
        const result = generateBreadcrumbJsonLd(items);
        expect(result["@type"]).toBe("BreadcrumbList");
      }),
      { numRuns: 100 }
    );
  });

  it("should produce itemListElement with the same length as input", () => {
    fc.assert(
      fc.property(breadcrumbItemsArb, (items) => {
        const result = generateBreadcrumbJsonLd(items);
        const elements = result.itemListElement as unknown[];
        expect(elements).toHaveLength(items.length);
      }),
      { numRuns: 100 }
    );
  });

  it("should have sequential positions starting at 1", () => {
    fc.assert(
      fc.property(breadcrumbItemsArb, (items) => {
        const result = generateBreadcrumbJsonLd(items);
        const elements = result.itemListElement as Array<{
          position: number;
        }>;

        for (let i = 0; i < elements.length; i++) {
          expect(elements[i].position).toBe(i + 1);
        }
      }),
      { numRuns: 100 }
    );
  });

  it("should have a non-empty name string for each item", () => {
    fc.assert(
      fc.property(breadcrumbItemsArb, (items) => {
        const result = generateBreadcrumbJsonLd(items);
        const elements = result.itemListElement as Array<{
          name: string;
        }>;

        for (const element of elements) {
          expect(typeof element.name).toBe("string");
          expect(element.name.length).toBeGreaterThan(0);
        }
      }),
      { numRuns: 100 }
    );
  });

  it("should have a valid URL string for each item", () => {
    fc.assert(
      fc.property(breadcrumbItemsArb, (items) => {
        const result = generateBreadcrumbJsonLd(items);
        const elements = result.itemListElement as Array<{
          item: string;
        }>;

        for (const element of elements) {
          expect(typeof element.item).toBe("string");
          expect(element.item.length).toBeGreaterThan(0);
          // Validate it's a proper URL
          expect(() => new URL(element.item)).not.toThrow();
        }
      }),
      { numRuns: 100 }
    );
  });
});
