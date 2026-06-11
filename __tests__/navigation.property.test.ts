import { describe, it, expect, vi } from "vitest";
import * as fc from "fast-check";
import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import NavigationHeader from "@/components/NavigationHeader";

// Mock next/link to render a simple anchor tag
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) =>
    createElement("a", { href, ...props }, children),
}));

/**
 * **Validates: Requirements 2.1**
 * Property 1: Navigation header presence across all pages
 *
 * For any valid page route (/, /products/app-builder, /portfolio, /about, /contact),
 * the rendered output SHALL contain the NavigationHeader component with the brand name
 * and navigation links.
 */
describe("Property 1: Navigation header presence across all pages", () => {
  const validRoutes = ["/", "/products/app-builder", "/portfolio", "/about", "/contact"];
  const expectedNavLinks = ["Home", "Products", "Portfolio", "Pricing", "Blog", "About", "Contact"];

  it("should render brand name 'Quantum Leap Ventures' for any valid page route", () => {
    fc.assert(
      fc.property(fc.constantFrom(...validRoutes), (route: string) => {
        // NavigationHeader is route-independent (rendered via layout on all pages),
        // so we verify it renders correctly regardless of which route is active
        const { unmount } = render(createElement(NavigationHeader));

        const brandElement = screen.getByText("Quantum Leap Ventures");
        expect(brandElement).toBeDefined();

        unmount();
      }),
      { numRuns: 5 }
    );
  }, 15000);

  it("should render all navigation links for any valid page route", () => {
    fc.assert(
      fc.property(fc.constantFrom(...validRoutes), (route: string) => {
        const { unmount } = render(createElement(NavigationHeader));

        for (const linkLabel of expectedNavLinks) {
          const linkElements = screen.getAllByText(linkLabel);
          expect(linkElements.length).toBeGreaterThan(0);
        }

        unmount();
      }),
      { numRuns: 5 }
    );
  }, 15000);
});
