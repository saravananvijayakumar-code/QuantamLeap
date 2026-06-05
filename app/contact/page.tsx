"use client";

import ContactForm from "@/components/ContactForm";
import { ThreeScene } from "@/components/ThreeScene";
import ThreeSceneErrorBoundary from "@/components/ThreeSceneErrorBoundary";
import { Starfield } from "@/components/three";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-dark-primary overflow-hidden">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ThreeSceneErrorBoundary>
          <ThreeScene className="w-full h-full">
            <Starfield
              count={1000}
              spread={22}
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
      <div className="relative z-10 max-w-3xl 2xl:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-16 sm:py-24 2xl:py-32">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-bold text-[#f0f0f0] mb-4">
            Get in <span className="text-neon-cyan">Touch</span>
          </h1>
          <p className="text-base sm:text-lg 2xl:text-xl text-[#a0a0b0] max-w-xl mx-auto">
            Have a project in mind or want to learn more? Send us a message and
            we&apos;ll get back to you.
          </p>
          {/* Decorative neon line */}
          <div className="mt-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
        </div>

        {/* Contact Form Card */}
        <div className="rounded-xl border border-neon-cyan/20 bg-dark-secondary/50 backdrop-blur-sm p-8 transition-all duration-300 hover:border-neon-cyan/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.05)]">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
