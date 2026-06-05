"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/navigation";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavLink {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: ROUTES.home },
  {
    label: "Products",
    href: ROUTES.products,
    dropdown: [{ label: "App Builder", href: ROUTES.appBuilder }],
  },
  { label: "Portfolio", href: ROUTES.portfolio },
  { label: "Pricing", href: ROUTES.pricing },
  { label: "About", href: ROUTES.about },
  { label: "Contact", href: ROUTES.contact },
];

export default function NavigationHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsMobileProductsOpen(false);
  }, []);

  // Close mobile menu on Escape key and manage body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        closeMobileMenu();
        hamburgerRef.current?.focus();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Focus first menu item when mobile menu opens
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const firstFocusable = mobileMenuRef.current.querySelector<HTMLElement>(
        "a, button"
      );
      firstFocusable?.focus();
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-dark-primary/95 backdrop-blur-md border-b border-neon-cyan/10 shadow-[0_1px_10px_rgba(0,240,255,0.05)]">
      <nav className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            href={ROUTES.home}
            className="text-xl font-bold text-white hover:text-neon-cyan transition-colors duration-300"
          >
            Quantum Leap Ventures
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative">
                {link.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#a0a0b0] hover:text-neon-cyan transition-colors duration-300 rounded-md hover:bg-dark-secondary/50"
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Products Dropdown */}
                    <div
                      className={`absolute top-full left-0 mt-1 w-48 rounded-lg bg-dark-secondary border border-neon-cyan/30 shadow-neon-cyan overflow-hidden transition-all duration-200 ease-in-out ${
                        isDropdownOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      }`}
                      role="menu"
                      aria-label="Products submenu"
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          role="menuitem"
                          onClick={() => setIsDropdownOpen(false)}
                          className="block px-4 py-3 text-sm text-[#a0a0b0] hover:text-neon-cyan hover:bg-dark-primary/50 transition-colors duration-200"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium text-[#a0a0b0] hover:text-neon-cyan transition-colors duration-300 rounded-md hover:bg-dark-secondary/50"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={hamburgerRef}
            className="md:hidden p-2 text-[#a0a0b0] hover:text-neon-cyan transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        role="navigation"
        aria-label="Mobile navigation"
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-dark-primary/98 backdrop-blur-lg border-t border-neon-cyan/10 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col px-6 py-4 space-y-1 overflow-y-auto max-h-full">
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              {link.dropdown ? (
                <div>
                  {/* Products button with expandable sub-menu */}
                  <button
                    onClick={() =>
                      setIsMobileProductsOpen(!isMobileProductsOpen)
                    }
                    className="flex items-center justify-between w-full px-4 py-3 text-lg font-medium text-[#f0f0f0] hover:text-neon-cyan transition-colors duration-300 rounded-lg hover:bg-dark-secondary/50"
                    aria-expanded={isMobileProductsOpen}
                  >
                    {link.label}
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isMobileProductsOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {/* Sub-links */}
                  <div
                    className={`overflow-hidden transition-all duration-200 ease-in-out ${
                      isMobileProductsOpen
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {link.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        onClick={closeMobileMenu}
                        className="block pl-8 pr-4 py-2 text-base text-[#a0a0b0] hover:text-neon-cyan transition-colors duration-300 rounded-lg hover:bg-dark-secondary/30"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-lg font-medium text-[#f0f0f0] hover:text-neon-cyan transition-colors duration-300 rounded-lg hover:bg-dark-secondary/50"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}

          {/* Decorative neon divider */}
          <div className="pt-6">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
          </div>
        </div>
      </div>
    </header>
  );
}
