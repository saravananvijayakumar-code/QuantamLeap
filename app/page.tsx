import Link from "next/link";
import { HeroScene } from "@/components/HeroScene";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
        {/* 3D Background with floating geometric shapes and particle effects */}
        <HeroScene />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 2xl:px-12 max-w-4xl 2xl:max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold text-glow-cyan text-white mb-6">
            Building the Future with Technology
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl text-[#f0f0f0] mb-4 max-w-2xl mx-auto">
            Quantum Leap Ventures — Pioneering Innovative Solutions
          </p>
          <p className="text-base sm:text-lg 2xl:text-xl text-[#a0a0b0] mb-10 max-w-xl mx-auto">
            We design and build next-generation digital products — from powerful
            app builders to intelligent platforms — helping businesses leap into
            the future.
          </p>

          {/* CTA Buttons with neon accents */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products/app-builder"
              className="inline-flex items-center px-6 sm:px-8 py-3 rounded-lg bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-neon-cyan/20 hover:shadow-neon-cyan hover:scale-105 glow-cyan"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 sm:px-8 py-3 rounded-lg border border-neon-purple/50 text-neon-purple font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-neon-purple/10 hover:shadow-neon-purple hover:scale-105"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-primary to-transparent pointer-events-none" />
      </section>
    </main>
  );
}
