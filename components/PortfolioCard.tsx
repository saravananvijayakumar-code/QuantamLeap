"use client";

import { PortfolioItem } from "@/lib/portfolio";

type PortfolioCardProps = Pick<PortfolioItem, "name" | "url" | "description" | "thumbnail">;

export default function PortfolioCard({
  name,
  url,
  description,
  thumbnail,
}: PortfolioCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-neon-cyan/20 bg-dark-secondary/60 backdrop-blur-sm p-6 transition-all duration-300 hover:border-neon-cyan/60 hover:shadow-neon-cyan hover:scale-[1.02]"
    >
      {thumbnail && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <img
            src={thumbnail}
            alt={`${name} screenshot`}
            className="w-full h-40 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <h3 className="text-xl font-semibold text-[#f0f0f0] mb-2 group-hover:text-neon-cyan transition-colors duration-300">
        {name}
      </h3>

      <p className="text-[#a0a0b0] text-sm leading-relaxed mb-4">
        {description}
      </p>

      <span className="inline-flex items-center gap-1 text-sm text-neon-cyan/80 group-hover:text-neon-cyan transition-colors duration-300">
        Visit Live Site
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </span>
    </a>
  );
}
