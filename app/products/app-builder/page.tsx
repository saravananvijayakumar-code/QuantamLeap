"use client";

import { ThreeScene } from "@/components/ThreeScene";
import { Starfield } from "@/components/three";
import ThreeSceneErrorBoundary from "@/components/ThreeSceneErrorBoundary";

const features = [
  {
    title: "LLM-Powered Development",
    description:
      "We use Claude, OpenAI, and Gemini as core development tools to build production-ready web applications rapidly and reliably.",
    icon: "🤖",
    glow: "cyan" as const,
  },
  {
    title: "AI Agents & RAG Pipelines",
    description:
      "Custom AI agents with tool-calling capabilities and Retrieval-Augmented Generation pipelines for intelligent, context-aware applications.",
    icon: "🧠",
    glow: "purple" as const,
  },
  {
    title: "Full-Stack Delivery",
    description:
      "End-to-end development with Next.js, TypeScript, Node.js, and Python — from frontend to backend, database to deployment.",
    icon: "⚡",
    glow: "green" as const,
  },
  {
    title: "Cloud-Native Architecture",
    description:
      "Built for scale on GCP Cloud Run, Cloud SQL, and Docker. Production-grade infrastructure that handles real-world traffic.",
    icon: "☁️",
    glow: "cyan" as const,
  },
  {
    title: "Data Pipelines & Automation",
    description:
      "Automated data ingestion, transformation, and processing pipelines using Python and SQL to power intelligent applications.",
    icon: "🔄",
    glow: "purple" as const,
  },
  {
    title: "Ship Fast, Ship Real",
    description:
      "Vibe Coding methodology — leveraging AI to move from concept to production-ready product in days, not months.",
    icon: "🚀",
    glow: "green" as const,
  },
];

const glowStyles = {
  cyan: {
    border: "border-neon-cyan/30",
    shadow: "glow-cyan",
    text: "text-neon-cyan",
    bg: "bg-neon-cyan/5",
    hoverBg: "hover:bg-neon-cyan/10",
  },
  purple: {
    border: "border-neon-purple/30",
    shadow: "glow-purple",
    text: "text-neon-purple",
    bg: "bg-neon-purple/5",
    hoverBg: "hover:bg-neon-purple/10",
  },
  green: {
    border: "border-neon-green/30",
    shadow: "glow-green",
    text: "text-neon-green",
    bg: "bg-neon-green/5",
    hoverBg: "hover:bg-neon-green/10",
  },
};

export default function AppBuilderPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden gradient-hero">
        {/* 3D Background */}
        <ThreeSceneErrorBoundary
          fallback={
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 70%)",
              }}
              aria-label="3D scene fallback"
            />
          }
        >
          <ThreeScene className="absolute inset-0 w-full h-full pointer-events-none">
            <Starfield
              count={1500}
              spread={30}
              speed={0.04}
              color="#ffffff"
              maxSize={0.07}
            />
          </ThreeScene>
        </ThreeSceneErrorBoundary>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 2xl:px-12 max-w-4xl 2xl:max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold text-glow-cyan text-white mb-6">
            Vibe Coding
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl text-[#a0a0b0] mb-4 max-w-2xl mx-auto">
            AI-native builder shipping production-ready, LLM-powered web applications.
          </p>
          <p className="text-base sm:text-lg 2xl:text-xl text-[#a0a0b0] max-w-xl mx-auto">
            Using Claude, OpenAI, and Gemini as core development tools to move fast and deliver real products.
          </p>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-primary to-transparent pointer-events-none" />
      </section>

      {/* Features Section */}
      <section className="gradient-section py-16 sm:py-20 2xl:py-28 px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="max-w-6xl 2xl:max-w-screen-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-bold text-center text-white mb-4 text-glow-purple">
            What We Build With
          </h2>
          <p className="text-center text-[#a0a0b0] mb-12 max-w-2xl mx-auto text-base sm:text-lg 2xl:text-xl">
            A modern AI-native stack for shipping real products, fast.
          </p>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 2xl:gap-8">
            {features.map((feature) => {
              const style = glowStyles[feature.glow];
              return (
                <div
                  key={feature.title}
                  className={`rounded-xl border ${style.border} ${style.bg} ${style.hoverBg} p-6 transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3
                    className={`text-xl font-semibold ${style.text} mb-2`}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-[#a0a0b0] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-dark py-16 sm:py-20 2xl:py-28 px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="max-w-3xl 2xl:max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-bold text-white mb-4 text-glow-green">
            Have an Idea?
          </h2>
          <p className="text-[#a0a0b0] text-base sm:text-lg 2xl:text-xl mb-8">
            Let&apos;s turn it into a production-ready application. Fast.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-3 rounded-lg bg-neon-cyan/10 border border-neon-cyan/50 text-neon-cyan font-semibold text-lg transition-all duration-300 hover:bg-neon-cyan/20 hover:shadow-neon-cyan hover:scale-105 glow-cyan"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  );
}
