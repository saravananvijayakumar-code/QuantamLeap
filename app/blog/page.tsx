import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Quantum Leap Ventures",
  description: "Insights and case studies from Quantum Leap Ventures",
};

const BLOG_POSTS = [
  {
    slug: "we-built-privacy-first-pdf-editor",
    title: "We Built a Privacy-First PDF Editor That Never Touches Your Files",
    excerpt:
      "How we engineered PDFEdit4U — a browser-based document tool where every operation happens on the user's device. Zero uploads, zero server processing, zero trust required.",
    date: "June 2025",
  },
  {
    slug: "building-suburbintel-australian-property-intelligence",
    title: "Building SuburbIntel — An Australian Property Intelligence Platform",
    excerpt:
      "How we built a full-stack property analytics platform covering 14,500+ Australian suburbs with real government data, AI-powered insights, and cloud-native infrastructure.",
    date: "June 2025",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-dark-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#f0f0f0] mb-4">
          <span className="text-neon-cyan">Blog</span>
        </h1>
        <p className="text-lg text-[#a0a0b0] mb-12">
          Case studies and insights from building real products.
        </p>
        <div className="space-y-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-neon-cyan/20 bg-dark-secondary/50 p-6 transition-all duration-300 hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.08)]"
            >
              <p className="text-sm text-neon-cyan mb-2">{post.date}</p>
              <h2 className="text-xl font-semibold text-[#f0f0f0] mb-2">
                {post.title}
              </h2>
              <p className="text-[#a0a0b0] text-sm leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
