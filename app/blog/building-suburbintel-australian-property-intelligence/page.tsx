import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Building SuburbIntel — Australian Property Intelligence Platform | Quantum Leap Ventures",
  description:
    "A deep dive into building SuburbIntel, a full-stack property analytics platform covering 14,500+ Australian suburbs with real government data and AI-powered insights.",
};

export default function SuburbIntelBlogPost() {
  return (
    <main className="min-h-screen bg-dark-primary">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-neon-cyan hover:underline mb-8"
        >
          ← Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <p className="text-sm text-neon-cyan mb-3">June 2025 • Case Study</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f0f0] mb-6 leading-tight">
            Building SuburbIntel — An Australian Property Intelligence Platform
          </h1>
          <p className="text-lg text-[#a0a0b0] leading-relaxed">
            How I built and deployed a full-stack property intelligence platform
            covering 14,500+ Australian suburbs — integrating real government
            data sources to deliver investment analytics, scoring, and market
            insights for property investors and first-home buyers.
          </p>
          <div className="mt-6">
            <a
              href="https://suburbintel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neon-cyan/50 text-neon-cyan text-sm font-medium transition-all duration-300 hover:bg-neon-cyan/10 hover:shadow-neon-cyan"
            >
              🔗 Visit SuburbIntel.com
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </header>

        {/* Content */}
        <div className="prose-custom space-y-8 text-[#c8c8d0] leading-relaxed">

          {/* Free access note */}
          <div className="rounded-lg border border-neon-green/30 bg-neon-green/5 p-4">
            <p className="text-neon-green font-medium mb-1">🎉 Free for Everyone</p>
            <p className="text-sm text-[#a0a0b0]">
              Sign-in/signup and Stripe payments are currently disabled — the entire platform is open and free to use for everyone. Explore any suburb, run comparisons, and access all analytics without creating an account.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-[#f0f0f0] mt-10">The Problem</h2>
          <p>
            Property investors in Australia face a fragmented information landscape. Government data is
            scattered across multiple sources — ABS Census, state valuer-general databases, infrastructure
            records, and development applications — none of which talk to each other. Investors end up
            spending hours cross-referencing spreadsheets just to evaluate a single suburb.
          </p>
          <p>
            I wanted to build something that brings all of this together in one place: a platform where you
            type in a suburb name and instantly get a complete picture — demographics, growth trends,
            rental yields, infrastructure projects, and a clear investment score.
          </p>

          <h2 className="text-2xl font-bold text-[#f0f0f0] mt-10">What I Built</h2>
          <p>
            SuburbIntel is a production SaaS platform built with Next.js 15 (App Router), React 18,
            TypeScript, Tailwind CSS, and PostgreSQL with Prisma ORM. It covers over 14,500 Australian
            suburbs with real, verified government data.
          </p>
          <p>The platform includes 44+ pages featuring:</p>
          <ul className="list-disc list-inside space-y-2 text-[#a0a0b0]">
            <li>Interactive heatmaps showing investment potential across regions</li>
            <li>Suburb comparison tools for side-by-side analysis</li>
            <li>Investment calculators for yield, growth, and affordability</li>
            <li>Real-time market analytics and trend visualizations</li>
            <li>A proprietary investment scoring engine (0-100) with weighted algorithms</li>
            <li>AI-powered suburb summaries and buyer persona generation</li>
            <li>An agent marketplace with featured placements and lead management</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#f0f0f0] mt-10">Data Engineering & ETL</h2>
          <p>
            The backbone of SuburbIntel is a custom ETL pipeline that ingests data from five
            government sources:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#a0a0b0]">
            <li><strong className="text-[#f0f0f0]">ABS Census 2021</strong> — 1.4GB+ across 119 data tables (demographics, income, housing, employment, transport)</li>
            <li><strong className="text-[#f0f0f0]">NSW Valuer-General</strong> — Property sales and valuations</li>
            <li><strong className="text-[#f0f0f0]">VIC Open Data</strong> — Victorian property market data</li>
            <li><strong className="text-[#f0f0f0]">Infrastructure databases</strong> — Planned and current projects</li>
            <li><strong className="text-[#f0f0f0]">Development applications</strong> — Council-approved building activity</li>
          </ul>
          <p>
            I built custom CSV/XLSX parsers with fuzzy suburb-name matching and geographic validation
            to handle inconsistencies across data sources. Processing 15,000+ suburbs worth of census
            data alone required careful batching and error handling.
          </p>

          <h2 className="text-2xl font-bold text-[#f0f0f0] mt-10">AI Integration</h2>
          <p>
            The platform integrates OpenAI GPT-4 for intelligent features:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#a0a0b0]">
            <li>AI-powered suburb summaries that synthesize complex data into plain English</li>
            <li>Investment risk analysis and buyer persona generation</li>
            <li>A RAG (Retrieval Augmented Generation) system with vector embeddings stored in PostgreSQL for contextual property Q&A</li>
          </ul>
          <p>
            Security was a priority — I implemented comprehensive AI safety measures including prompt
            injection detection (30+ attack patterns), input/output sanitization, and role manipulation blocking.
          </p>

          <h2 className="text-2xl font-bold text-[#f0f0f0] mt-10">Cloud Infrastructure</h2>
          <p>
            SuburbIntel runs on Google Cloud Platform with an architecture built for reliability and scale:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#a0a0b0]">
            <li>Google Cloud Run with auto-scaling (1-10 instances, 2 vCPU/2GB each)</li>
            <li>Multi-stage Docker builds with standalone Next.js output</li>
            <li>CI/CD via GitHub Actions: TypeScript checks → Playwright E2E tests → Docker build → Artifact Registry → Cloud Run deploy → smoke tests</li>
            <li>Secrets managed through GCP Secret Manager</li>
            <li>Database on Supabase with PgBouncer connection pooling</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#f0f0f0] mt-10">Security Engineering</h2>
          <p>
            Given the platform handles user data and financial analytics, security was built in from
            the start:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#a0a0b0]">
            <li>Database-backed rate limiting with tiered limits per endpoint type, supporting horizontal scaling</li>
            <li>Input sanitization middleware covering XSS, SQL injection, CSV injection, and path traversal</li>
            <li>Webhook idempotency for Stripe event processing</li>
            <li>Comprehensive AI prompt injection detection and blocking</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#f0f0f0] mt-10">Testing & Quality</h2>
          <p>
            Quality assurance covers multiple layers:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#a0a0b0]">
            <li>13 Playwright E2E test suites covering cross-browser testing (Chromium, Firefox, WebKit), mobile viewports, API endpoints, data quality, performance/SEO, and visual regression</li>
            <li>Type safety across 30+ Prisma data models and 50+ API routes with Zod schema validation</li>
            <li>Automated smoke tests as part of the deployment pipeline</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#f0f0f0] mt-10">Agent Marketplace</h2>
          <p>
            Beyond analytics, I built a real estate agent marketplace with signup, verification,
            listings CRUD, lead management, and admin moderation. The system includes featured
            placements with CPC/impression billing via Stripe integration.
          </p>

          <h2 className="text-2xl font-bold text-[#f0f0f0] mt-10">Key Numbers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6">
            {[
              { value: "14,500+", label: "Suburbs indexed" },
              { value: "5", label: "Government data sources" },
              { value: "44+", label: "Application pages" },
              { value: "30+", label: "Database models" },
              { value: "50+", label: "API endpoints" },
              { value: "1.4GB+", label: "Census data processed" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-neon-cyan/20 bg-dark-secondary/40 p-4 text-center"
              >
                <p className="text-2xl font-bold text-neon-cyan">{stat.value}</p>
                <p className="text-xs text-[#a0a0b0] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#f0f0f0] mt-10">Tech Stack</h2>
          <div className="flex flex-wrap gap-2 my-4">
            {[
              "Next.js", "React", "TypeScript", "PostgreSQL", "Prisma ORM",
              "Google Cloud Run", "Docker", "GitHub Actions", "CI/CD",
              "OpenAI API", "RAG", "Vector Embeddings", "ETL Pipelines",
              "Playwright", "Tailwind CSS", "Node.js", "REST APIs", "Zod",
              "Data Engineering", "Security Engineering", "Stripe", "Recharts",
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full text-xs border border-neon-purple/30 text-neon-purple bg-neon-purple/5"
              >
                {skill}
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[#f0f0f0] mt-10">Try It Yourself</h2>
          <p>
            SuburbIntel is currently free and open for everyone to use — no account required. Sign-in,
            signup, and Stripe payments are disabled so you can explore the full platform without
            any barriers. Search any Australian suburb, compare neighbourhoods, and see the investment
            scoring in action.
          </p>
          <div className="mt-6">
            <a
              href="https://suburbintel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan font-semibold transition-all duration-300 hover:bg-neon-cyan/20 hover:shadow-neon-cyan hover:scale-105"
            >
              Explore SuburbIntel →
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
