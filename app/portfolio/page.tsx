"use client";

import { PORTFOLIO_ITEMS } from "@/lib/portfolio";
import PortfolioCard from "@/components/PortfolioCard";
import { ThreeScene } from "@/components/ThreeScene";
import ThreeSceneErrorBoundary from "@/components/ThreeSceneErrorBoundary";
import { Starfield } from "@/components/three";

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen bg-dark-primary overflow-hidden">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ThreeSceneErrorBoundary>
          <ThreeScene className="w-full h-full">
            <Starfield
              count={1200}
              spread={25}
              speed={0.03}
              color="#ffffff"
              maxSize={0.06}
            />
          </ThreeScene>
        </ThreeSceneErrorBoundary>
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-dark-primary/80 via-dark-primary/60 to-dark-primary/90 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-16 sm:py-24 2xl:py-32">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-bold text-[#f0f0f0] mb-4">
            Our{" "}
            <span className="text-neon-cyan">Portfolio</span>
          </h1>
          <p className="text-base sm:text-lg 2xl:text-xl text-[#a0a0b0] max-w-2xl mx-auto">
            Explore the live applications we&apos;ve built. Each project
            reflects our commitment to quality, performance, and intuitive
            design.
          </p>
          {/* Decorative neon line */}
          <div className="mt-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 2xl:gap-10">
          {PORTFOLIO_ITEMS.map((item) => (
            <PortfolioCard
              key={item.id}
              name={item.name}
              url={item.url}
              description={item.description}
              thumbnail={item.thumbnail}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
