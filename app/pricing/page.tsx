"use client";

import { ThreeScene } from "@/components/ThreeScene";
import ThreeSceneErrorBoundary from "@/components/ThreeSceneErrorBoundary";
import { Starfield } from "@/components/three";
import Link from "next/link";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  glow: "cyan" | "purple" | "green";
}

const PRICING_TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "$2,499",
    period: "per project",
    description:
      "Perfect for MVPs and landing pages. Get a production-ready app shipped fast.",
    features: [
      "Single-page or simple multi-page app",
      "Responsive design (mobile + desktop)",
      "Basic hosting setup (Vercel / GCP)",
      "1 round of revisions",
      "Delivery in 1–2 weeks",
      "Source code handover",
    ],
    cta: "Get Started",
    highlighted: false,
    glow: "cyan",
  },
  {
    name: "Pro",
    price: "$5,999",
    period: "per project",
    description:
      "Full-featured web applications with AI integrations and cloud infrastructure.",
    features: [
      "Multi-page app with dynamic features",
      "LLM integration (Claude / OpenAI / Gemini)",
      "Database & API development",
      "Cloud deployment (GCP Cloud Run)",
      "Authentication & user management",
      "3 rounds of revisions",
      "Delivery in 3–4 weeks",
      "30 days post-launch support",
    ],
    cta: "Most Popular",
    highlighted: true,
    glow: "purple",
  },
  {
    name: "Enterprise",
    price: "$12,999+",
    period: "per project",
    description:
      "Complex AI platforms with custom pipelines, agents, and full-stack architecture.",
    features: [
      "AI agents with tool-calling & RAG",
      "Custom data pipelines & automation",
      "Multi-service cloud architecture",
      "Advanced security & compliance",
      "CI/CD pipeline setup",
      "Performance testing & optimization",
      "Unlimited revisions during build",
      "Delivery in 6–8 weeks",
      "90 days post-launch support",
      "Dedicated Slack channel",
    ],
    cta: "Contact Us",
    highlighted: false,
    glow: "green",
  },
];

const glowStyles = {
  cyan: {
    border: "border-neon-cyan/30",
    borderHighlight: "border-neon-cyan",
    shadow: "shadow-neon-cyan",
    text: "text-neon-cyan",
    bg: "bg-neon-cyan/5",
    button: "bg-neon-cyan/10 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/20 hover:shadow-neon-cyan",
  },
  purple: {
    border: "border-neon-purple/30",
    borderHighlight: "border-neon-purple",
    shadow: "shadow-neon-purple",
    text: "text-neon-purple",
    bg: "bg-neon-purple/5",
    button: "bg-neon-purple/10 border-neon-purple text-neon-purple hover:bg-neon-purple/20 hover:shadow-neon-purple",
  },
  green: {
    border: "border-neon-green/30",
    borderHighlight: "border-neon-green",
    shadow: "shadow-neon-green",
    text: "text-neon-green",
    bg: "bg-neon-green/5",
    button: "bg-neon-green/10 border-neon-green text-neon-green hover:bg-neon-green/20 hover:shadow-neon-green",
  },
};

export default function PricingPage() {
  return (
    <main className="relative min-h-screen bg-dark-primary overflow-hidden">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ThreeSceneErrorBoundary>
          <ThreeScene className="w-full h-full">
            <Starfield
              count={1200}
              spread={25}
              speed={0.02}
              color="#ffffff"
              maxSize={0.06}
            />
          </ThreeScene>
        </ThreeSceneErrorBoundary>
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-dark-primary/80 via-dark-primary/60 to-dark-primary/90 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f0f0f0] mb-4">
            Simple, Transparent{" "}
            <span className="text-neon-cyan">Pricing</span>
          </h1>
          <p className="text-lg text-[#a0a0b0] max-w-2xl mx-auto">
            Fixed-price projects. No hourly billing surprises. You know exactly what you&apos;re getting and what it costs.
          </p>
          <div className="mt-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier) => {
            const style = glowStyles[tier.glow];
            return (
              <div
                key={tier.name}
                className={`relative rounded-2xl border ${
                  tier.highlighted ? style.borderHighlight : style.border
                } ${style.bg} backdrop-blur-sm p-8 flex flex-col transition-all duration-300 hover:scale-[1.02] ${
                  tier.highlighted ? style.shadow : ""
                }`}
              >
                {tier.highlighted && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold ${style.text} border ${style.borderHighlight} bg-dark-primary`}>
                    Most Popular
                  </div>
                )}

                <h3 className={`text-2xl font-bold ${style.text} mb-2`}>
                  {tier.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-[#f0f0f0]">
                    {tier.price}
                  </span>
                  <span className="text-[#a0a0b0] ml-2">{tier.period}</span>
                </div>
                <p className="text-[#a0a0b0] text-sm mb-6 leading-relaxed">
                  {tier.description}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg
                        className={`w-5 h-5 ${style.text} shrink-0 mt-0.5`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-[#a0a0b0]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block text-center px-6 py-3 rounded-lg border font-semibold transition-all duration-300 hover:scale-105 ${style.button}`}
                >
                  {tier.cta}
                </Link>
              </div>
            );
          })}
        </div>

        {/* FAQ / Note */}
        <div className="mt-16 text-center">
          <p className="text-[#a0a0b0] text-sm max-w-xl mx-auto">
            All prices in AUD. Need something custom? 
            <Link href="/contact" className="text-neon-cyan hover:underline ml-1">
              Get in touch
            </Link>{" "}
            and we&apos;ll scope it together.
          </p>
        </div>
      </div>
    </main>
  );
}
