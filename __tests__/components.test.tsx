// @vitest-environment jsdom
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

// Mock next/link to render a plain anchor
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock React Three Fiber and drei to avoid WebGL issues in tests
vi.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useFrame: () => {},
}));

vi.mock("@react-three/drei", () => ({
  OrbitControls: () => null,
  Float: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

import NavigationHeader from "@/components/NavigationHeader";
import PortfolioCard from "@/components/PortfolioCard";
import ContactForm from "@/components/ContactForm";
import { PORTFOLIO_ITEMS } from "@/lib/portfolio";

describe("NavigationHeader", () => {
  it("renders the 'Quantum Leap Ventures' brand name", () => {
    render(<NavigationHeader />);
    expect(screen.getByText("Quantum Leap Ventures")).toBeInTheDocument();
  });

  it("renders Home, Products, Portfolio, About, and Contact links", () => {
    render(<NavigationHeader />);

    // Desktop + mobile nav renders links twice, use getAllByText
    expect(screen.getAllByText("Home").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Products").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Portfolio").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("About").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Contact").length).toBeGreaterThanOrEqual(1);
  });

  it("shows 'App Builder' as first item in Products dropdown when opened", () => {
    render(<NavigationHeader />);

    // There are two Products buttons (desktop + mobile), get the desktop one with aria-haspopup
    const desktopButton = screen.getAllByRole("button", { name: /products/i })
      .find((btn) => btn.getAttribute("aria-haspopup") === "true")!;
    fireEvent.click(desktopButton);

    // The dropdown should contain App Builder linking to /products/app-builder
    const appBuilderLinks = screen.getAllByText("App Builder");
    const appBuilderLink = appBuilderLinks[0];
    expect(appBuilderLink).toBeInTheDocument();
    expect(appBuilderLink.closest("a")).toHaveAttribute(
      "href",
      "/products/app-builder"
    );
  });
});

describe("PortfolioCard", () => {
  it("renders pdfedit4u.com card with correct name and link", () => {
    const pdfItem = PORTFOLIO_ITEMS.find((item) => item.id === "pdfedit4u")!;
    render(
      <PortfolioCard
        name={pdfItem.name}
        url={pdfItem.url}
        description={pdfItem.description}
      />
    );

    expect(screen.getByText("PDFEdit4U")).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://pdfedit4u.com");
  });

  it("renders suburbintel.com card with correct name and link", () => {
    const suburbItem = PORTFOLIO_ITEMS.find(
      (item) => item.id === "suburbintel"
    )!;
    render(
      <PortfolioCard
        name={suburbItem.name}
        url={suburbItem.url}
        description={suburbItem.description}
      />
    );

    expect(screen.getByText("SuburbIntel")).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://suburbintel.com");
  });

  it("does NOT contain 'AI-powered' text in any portfolio card", () => {
    PORTFOLIO_ITEMS.forEach((item) => {
      const { container } = render(
        <PortfolioCard
          name={item.name}
          url={item.url}
          description={item.description}
        />
      );

      expect(container.textContent).not.toMatch(/ai[- ]powered/i);
    });
  });
});

describe("ContactForm", () => {
  it("renders name input, email input, message textarea, and submit button", () => {
    render(<ContactForm />);

    // Name input
    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toBeInTheDocument();
    expect(nameInput.tagName.toLowerCase()).toBe("input");

    // Email input
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.tagName.toLowerCase()).toBe("input");

    // Message textarea
    const messageTextarea = screen.getByLabelText(/message/i);
    expect(messageTextarea).toBeInTheDocument();
    expect(messageTextarea.tagName.toLowerCase()).toBe("textarea");

    // Submit button
    const submitButton = screen.getByRole("button", { name: /send message/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
  });
});
