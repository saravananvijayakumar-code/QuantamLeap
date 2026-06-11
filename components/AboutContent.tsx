"use client";

import { ThreeScene } from "@/components/ThreeScene";
import ThreeSceneErrorBoundary from "@/components/ThreeSceneErrorBoundary";
import { Starfield } from "@/components/three";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Saravanan Vijayakumar",
    role: "Founder & CEO",
    bio: "Performance testing expert with 14+ years of experience ensuring software reliability at scale, now building innovative apps through Vibe Coding.",
  },
];

export default function AboutContent() {
  return (
    <main className="relative min-h-screen bg-dark-primary overflow-hidden">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ThreeSceneErrorBoundary>
          <ThreeScene className="w-full h-full">
            <Starfield
              count={1200}
              spread={28}
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
            About{" "}
            <span className="text-neon-purple">Quantum Leap Ventures</span>
          </h1>
          <p className="text-base sm:text-lg 2xl:text-xl text-[#a0a0b0] max-w-2xl mx-auto">
            We are a forward-thinking software company dedicated to building
            digital solutions that shape the future.
          </p>
          {/* Decorative neon line */}
          <div className="mt-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-neon-purple to-transparent" />
        </div>

        {/* Mission & Vision Section */}
        <section className="mb-16 sm:mb-20 2xl:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 2xl:gap-10">
            {/* Mission */}
            <div className="rounded-xl border border-neon-cyan/20 bg-dark-secondary/50 backdrop-blur-sm p-8 transition-all duration-300 hover:border-neon-cyan/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-neon-cyan/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-neon-cyan"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#f0f0f0]">Our Mission</h2>
              </div>
              <p className="text-[#a0a0b0] leading-relaxed">
                To empower businesses and individuals through cutting-edge software
                that transforms ideas into reality. We bridge the gap between
                complex technology and intuitive user experiences, making advanced
                digital tools accessible to everyone.
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-xl border border-neon-purple/20 bg-dark-secondary/50 backdrop-blur-sm p-8 transition-all duration-300 hover:border-neon-purple/40 hover:shadow-[0_0_20px_rgba(180,0,255,0.1)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-neon-purple/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-neon-purple"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#f0f0f0]">Our Vision</h2>
              </div>
              <p className="text-[#a0a0b0] leading-relaxed">
                To be the catalyst for a new era of digital innovation, where
                every business can harness the power of modern technology to leap
                beyond traditional boundaries. We envision a world where software
                isn&apos;t just a tool — it&apos;s a competitive advantage.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16 sm:mb-20 2xl:mb-24">
          <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold text-[#f0f0f0] text-center mb-10">
            What Drives Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 2xl:gap-8">
            <div className="text-center p-6 rounded-lg border border-neon-green/20 bg-dark-secondary/30 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-neon-green/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-neon-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">Innovation</h3>
              <p className="text-[#a0a0b0] text-sm">
                Pushing boundaries with emerging technologies and creative solutions.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-neon-cyan/20 bg-dark-secondary/30 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-neon-cyan/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-neon-cyan"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">Quality</h3>
              <p className="text-[#a0a0b0] text-sm">
                Delivering robust, well-crafted software that stands the test of time.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-neon-purple/20 bg-dark-secondary/30 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-neon-purple/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-neon-purple"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#f0f0f0] mb-2">Collaboration</h3>
              <p className="text-[#a0a0b0] text-sm">
                Working closely with clients to turn their vision into working products.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold text-[#f0f0f0] text-center mb-4">
            Our <span className="text-neon-green">Team</span>
          </h2>
          <p className="text-center text-[#a0a0b0] mb-10 max-w-lg mx-auto text-base sm:text-lg">
            A passionate group of engineers, designers, and strategists united by
            a shared drive to build exceptional software.
          </p>
          {/* Decorative neon line */}
          <div className="mb-10 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-neon-green to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 2xl:gap-10">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-white/10 bg-dark-secondary/40 backdrop-blur-sm p-6 text-center transition-all duration-300 hover:border-neon-green/30 hover:shadow-[0_0_15px_rgba(0,255,136,0.08)]"
              >
                {/* Avatar placeholder */}
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 border border-white/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#f0f0f0]">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#f0f0f0] mb-1">
                  {member.name}
                </h3>
                <p className="text-neon-cyan text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-[#a0a0b0] text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
