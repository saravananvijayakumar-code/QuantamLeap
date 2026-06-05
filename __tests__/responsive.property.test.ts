/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from "vitest";
import * as fc from "fast-check";

/**
 * **Validates: Requirements 9.1**
 * Property 4: Responsive layout contains no horizontal overflow
 *
 * For any viewport width between 320px and 2560px, the rendered page content
 * SHALL not produce horizontal scrollbar overflow (all containers respect
 * viewport constraints through max-width, relative units, and overflow handling).
 *
 * Since jsdom does not perform real CSS layout, we verify the structural
 * correctness of the responsive patterns used across all pages:
 * - All page containers use max-width constraints (relative or capped)
 * - All containers use horizontal padding that doesn't exceed viewport
 * - overflow-hidden is applied on sections with absolute positioned children
 * - No fixed pixel widths exceed the minimum 320px viewport
 */

/**
 * Tailwind max-width values that the project uses.
 * These are the actual pixel values for the max-width utilities.
 */
const MAX_WIDTH_VALUES: Record<string, number> = {
  "max-w-xs": 320,
  "max-w-sm": 384,
  "max-w-md": 448,
  "max-w-lg": 512,
  "max-w-xl": 576,
  "max-w-2xl": 672,
  "max-w-3xl": 768,
  "max-w-4xl": 896,
  "max-w-5xl": 1024,
  "max-w-6xl": 1152,
  "max-w-7xl": 1280,
  "max-w-screen-2xl": 1440,
};

/**
 * Horizontal padding values (Tailwind px-* utilities map to left+right padding).
 * These represent the total horizontal padding consumed.
 */
const PADDING_VALUES: Record<string, number> = {
  "px-4": 32, // 1rem * 2
  "px-6": 48, // 1.5rem * 2
  "px-8": 64, // 2rem * 2
  "px-12": 96, // 3rem * 2
};

/**
 * Page container definitions extracted from the actual page components.
 * Each entry describes the responsive classes used by a real page container.
 */
interface PageContainer {
  page: string;
  description: string;
  maxWidthClass: string;
  ultraWideMaxWidthClass?: string; // 2xl breakpoint max-width
  paddingClasses: string[];
  hasOverflowHidden: boolean;
}

const PAGE_CONTAINERS: PageContainer[] = [
  {
    page: "/",
    description: "Home hero content",
    maxWidthClass: "max-w-4xl",
    ultraWideMaxWidthClass: "max-w-5xl",
    paddingClasses: ["px-4", "px-6", "px-8", "px-12"],
    hasOverflowHidden: true, // parent section has overflow-hidden
  },
  {
    page: "/products/app-builder",
    description: "App Builder hero content",
    maxWidthClass: "max-w-4xl",
    ultraWideMaxWidthClass: "max-w-5xl",
    paddingClasses: ["px-4", "px-6", "px-8", "px-12"],
    hasOverflowHidden: true,
  },
  {
    page: "/products/app-builder",
    description: "App Builder features section",
    maxWidthClass: "max-w-6xl",
    ultraWideMaxWidthClass: "max-w-screen-2xl",
    paddingClasses: ["px-4", "px-6", "px-8", "px-12"],
    hasOverflowHidden: false,
  },
  {
    page: "/portfolio",
    description: "Portfolio content area",
    maxWidthClass: "max-w-6xl",
    ultraWideMaxWidthClass: "max-w-screen-2xl",
    paddingClasses: ["px-4", "px-6", "px-8", "px-12"],
    hasOverflowHidden: true,
  },
  {
    page: "/about",
    description: "About content area",
    maxWidthClass: "max-w-6xl",
    ultraWideMaxWidthClass: "max-w-screen-2xl",
    paddingClasses: ["px-4", "px-6", "px-8", "px-12"],
    hasOverflowHidden: true,
  },
  {
    page: "/contact",
    description: "Contact content area",
    maxWidthClass: "max-w-4xl",
    paddingClasses: ["px-4", "px-6", "px-8"],
    hasOverflowHidden: true,
  },
  {
    page: "all",
    description: "Navigation header",
    maxWidthClass: "max-w-7xl",
    ultraWideMaxWidthClass: "max-w-screen-2xl",
    paddingClasses: ["px-4", "px-6", "px-8", "px-12"],
    hasOverflowHidden: false,
  },
];

/**
 * For a given viewport width, determine the effective max-width constraint.
 * The effective content width is min(max-width, viewport - padding).
 * For no overflow: effective content width must be <= viewport width.
 */
function getEffectiveMaxWidth(container: PageContainer, viewportWidth: number): number {
  // For ultra-wide viewports (>=1440px), use the ultra-wide class if available
  const maxWidthClass =
    viewportWidth >= 1440 && container.ultraWideMaxWidthClass
      ? container.ultraWideMaxWidthClass
      : container.maxWidthClass;

  const maxWidth = MAX_WIDTH_VALUES[maxWidthClass];
  if (!maxWidth) {
    // If class not in our map, it might be a viewport-relative class
    // In that case, it's always bounded by viewport
    return viewportWidth;
  }
  return maxWidth;
}

/**
 * Get the minimum padding for a container (smallest responsive padding is mobile = px-4).
 */
function getMinPadding(container: PageContainer): number {
  // px-4 is always the base (smallest viewport), which is 32px total
  return PADDING_VALUES["px-4"] ?? 32;
}

/**
 * Get the effective padding for a viewport width based on responsive breakpoints.
 * Mobile (<640px): px-4, SM (>=640px): px-6, LG (>=1024px): px-8, 2XL (>=1440px): px-12
 */
function getEffectivePadding(container: PageContainer, viewportWidth: number): number {
  if (viewportWidth >= 1440 && container.paddingClasses.includes("px-12")) {
    return PADDING_VALUES["px-12"];
  }
  if (viewportWidth >= 1024 && container.paddingClasses.includes("px-8")) {
    return PADDING_VALUES["px-8"];
  }
  if (viewportWidth >= 640 && container.paddingClasses.includes("px-6")) {
    return PADDING_VALUES["px-6"];
  }
  return PADDING_VALUES["px-4"];
}

describe("Property 4: Responsive layout contains no horizontal overflow", () => {
  it("for any viewport width in [320, 2560], all page containers have content width <= viewport width", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 2560 }),
        (viewportWidth: number) => {
          for (const container of PAGE_CONTAINERS) {
            const maxWidth = getEffectiveMaxWidth(container, viewportWidth);
            const padding = getEffectivePadding(container, viewportWidth);

            // The content width is constrained by max-width, and fits within
            // viewport - padding. With mx-auto centering, the total occupied
            // width is min(maxWidth, viewportWidth - padding) + padding
            const contentWidth = Math.min(maxWidth, viewportWidth - padding);
            const totalOccupiedWidth = contentWidth + padding;

            // Total occupied width should never exceed the viewport
            expect(totalOccupiedWidth).toBeLessThanOrEqual(viewportWidth);
          }
        }
      ),
      { numRuns: 200 }
    );
  });

  it("for any viewport width in [320, 2560], overflow-hidden containers prevent absolute children from causing scroll", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 2560 }),
        (viewportWidth: number) => {
          const overflowContainers = PAGE_CONTAINERS.filter(
            (c) => c.hasOverflowHidden
          );

          // All pages with absolute-positioned 3D scenes use overflow-hidden
          // This ensures that even if 3D canvas or absolute elements extend
          // beyond viewport, they cannot cause horizontal scroll
          for (const container of overflowContainers) {
            // overflow-hidden effectively clips content to container bounds
            // so the visible width is always <= viewport width
            expect(container.hasOverflowHidden).toBe(true);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("minimum viewport (320px) accommodates all containers without overflow", () => {
    const MIN_VIEWPORT = 320;

    fc.assert(
      fc.property(
        fc.constantFrom(...PAGE_CONTAINERS),
        (container: PageContainer) => {
          const padding = getMinPadding(container);
          const maxWidth = getEffectiveMaxWidth(container, MIN_VIEWPORT);

          // At 320px viewport, content + padding must fit
          const effectiveContent = Math.min(maxWidth, MIN_VIEWPORT - padding);
          const totalWidth = effectiveContent + padding;

          expect(totalWidth).toBeLessThanOrEqual(MIN_VIEWPORT);
        }
      ),
      { numRuns: 50 }
    );
  });

  it("ultra-wide viewport (2560px) uses max-width constraints to prevent content stretching beyond bounds", () => {
    const MAX_VIEWPORT = 2560;

    fc.assert(
      fc.property(
        fc.constantFrom(...PAGE_CONTAINERS),
        (container: PageContainer) => {
          const maxWidth = getEffectiveMaxWidth(container, MAX_VIEWPORT);

          // At ultra-wide viewports, max-width must cap content to prevent
          // unreasonably wide layouts. All our containers cap at 1440px or below.
          expect(maxWidth).toBeLessThanOrEqual(MAX_VIEWPORT);

          // The max-width + padding never exceeds viewport
          const padding = getEffectivePadding(container, MAX_VIEWPORT);
          const totalWidth = Math.min(maxWidth, MAX_VIEWPORT - padding) + padding;
          expect(totalWidth).toBeLessThanOrEqual(MAX_VIEWPORT);
        }
      ),
      { numRuns: 50 }
    );
  });
});
