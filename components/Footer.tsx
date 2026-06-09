import Link from "next/link";
import { ROUTES } from "@/lib/navigation";

const FOOTER_LINKS = [
  { label: "Home", href: ROUTES.home },
  { label: "Products", href: ROUTES.appBuilder },
  { label: "Portfolio", href: ROUTES.portfolio },
  { label: "Pricing", href: ROUTES.pricing },
  { label: "Blog", href: ROUTES.blog },
  { label: "About", href: ROUTES.about },
  { label: "Contact", href: ROUTES.contact },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-dark-primary border-t border-neon-cyan/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link
              href={ROUTES.home}
              className="text-xl font-bold text-white hover:text-neon-cyan transition-colors duration-300"
            >
              Quantum Leap Ventures
            </Link>
            <p className="text-[#a0a0b0] text-sm leading-relaxed">
              Building the future with innovative technology solutions. We craft
              cutting-edge digital products with immersive experiences.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#a0a0b0] hover:text-neon-cyan transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Get in Touch
            </h3>
            <p className="text-sm text-[#a0a0b0]">
              Have a project in mind? We&apos;d love to hear from you.
            </p>
            <Link
              href={ROUTES.contact}
              className="inline-block text-sm text-neon-cyan hover:text-white transition-colors duration-300"
            >
              Contact Us →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-neon-cyan/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#a0a0b0]">
              © {currentYear} Quantum Leap Ventures. All rights reserved.
            </p>
            <div className="h-px w-16 bg-gradient-to-r from-neon-cyan/50 to-neon-purple/50 sm:hidden" />
          </div>
        </div>
      </div>
    </footer>
  );
}
