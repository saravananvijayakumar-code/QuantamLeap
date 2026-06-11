# Design Document: GEO & AEO Optimization

## Overview

This design implements comprehensive Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) for the Quantum Leap Ventures website. The architecture introduces a modular JSON-LD structured data system, enhanced metadata generation, machine-readable content files, FAQ sections with schema markup, and SEO header configuration — all built on Next.js 15 App Router conventions.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                         │
├─────────────────────────────────────────────────────────────┤
│  Root Layout (layout.tsx)                                     │
│  ├── metadataBase configuration                              │
│  ├── <OrganizationJsonLd /> (global structured data)         │
│  └── <WebSiteJsonLd /> (homepage only)                       │
├─────────────────────────────────────────────────────────────┤
│  Page Components                                             │
│  ├── metadata export (per-page SEO metadata)                 │
│  ├── <BreadcrumbJsonLd /> (all pages except homepage)        │
│  ├── <ServiceJsonLd /> (products/pricing pages)              │
│  ├── <ArticleJsonLd /> (blog posts)                          │
│  ├── <FAQJsonLd /> (products/pricing pages)                  │
│  └── <SpeakableJsonLd /> (homepage/blog posts)               │
├─────────────────────────────────────────────────────────────┤
│  lib/structured-data/                                        │
│  ├── types.ts (TypeScript interfaces for all schemas)        │
│  ├── organization.ts (Organization + Person generators)      │
│  ├── breadcrumb.ts (BreadcrumbList generator)                │
│  ├── service.ts (Service + Offer generators)                 │
│  ├── article.ts (Article generator)                          │
│  ├── faq.ts (FAQPage generator)                              │
│  ├── website.ts (WebSite generator)                          │
│  └── speakable.ts (Speakable property generator)             │
├─────────────────────────────────────────────────────────────┤
│  lib/metadata/                                               │
│  ├── types.ts (Metadata configuration types)                 │
│  ├── generate-metadata.ts (per-page metadata factory)        │
│  └── constants.ts (shared metadata constants)                │
├─────────────────────────────────────────────────────────────┤
│  public/                                                     │
│  ├── llms.txt (updated with llms-full.txt reference)         │
│  └── llms-full.txt (comprehensive AI content file)           │
├─────────────────────────────────────────────────────────────┤
│  next.config.ts (SEO headers + caching configuration)        │
└─────────────────────────────────────────────────────────────┘
```

### Design Decisions

1. **Server Components for JSON-LD**: JSON-LD components are React Server Components that render `<script type="application/ld+json">` tags. This avoids client-side hydration overhead and ensures structured data is present in the initial HTML for crawlers.

2. **Pure Function Generators**: Each schema type has a pure function generator in `lib/structured-data/` that accepts typed input and returns a JSON-LD object. This separation enables unit testing without DOM dependencies.

3. **Centralized Metadata Factory**: A `generatePageMetadata()` helper standardizes metadata generation across all pages, enforcing consistent structure and character limits.

4. **About Page Refactoring**: The About page uses `"use client"` but needs metadata exports. Solution: extract interactive parts into a client component (`AboutContent.tsx`) while making `page.tsx` a server component that exports metadata.

5. **FAQ Data Co-location**: FAQ content lives as typed constants in each page file, consumed by both the visible FAQ UI component and the FAQPage JSON-LD generator to guarantee consistency.

## Components and Interfaces

### JSON-LD Injection Component

```typescript
// components/JsonLd.tsx
interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

### FAQ Section Component

```typescript
// components/FAQSection.tsx
import { FAQItem } from "@/lib/structured-data/types";

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
}

export function FAQSection({ items, title = "Frequently Asked Questions" }: FAQSectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" id="faq">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
          {title}
        </h2>
        <div className="space-y-6">
          {items.map((item, index) => (
            <details
              key={index}
              className="rounded-xl border border-white/10 bg-dark-secondary/40 backdrop-blur-sm p-6 group"
            >
              <summary className="text-lg font-semibold text-[#f0f0f0] cursor-pointer">
                {item.question}
              </summary>
              <p className="mt-4 text-[#a0a0b0] leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## Data Models

### Structured Data Types

```typescript
// lib/structured-data/types.ts

export interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  description: string;
  founder: PersonData;
  foundingDate: string;
  contactPoint: ContactPointData;
  sameAs: string[];
}

export interface PersonData {
  name: string;
  jobTitle: string;
  sameAs: string[];
}

export interface ContactPointData {
  contactType: string;
  url: string;
  availableLanguage: string;
}

export interface ServiceData {
  name: string;
  description: string;
  provider: OrganizationData;
  offers: OfferData[];
}

export interface OfferData {
  name: string;
  price: string;
  priceCurrency: string;
  description: string;
}

export interface ArticleData {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  canonicalUrl: string;
  speakableSelectors?: string[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface WebSiteData {
  name: string;
  url: string;
}

export interface SpeakableData {
  cssSelectors: string[];
}

export interface PageMetadataConfig {
  title: string;
  description: string;
  path: string;
  ogType?: string;
  image?: string;
}
```

### Generator Functions

```typescript
// lib/structured-data/organization.ts
export function generateOrganizationJsonLd(data: OrganizationData): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    url: data.url,
    logo: data.logo,
    description: data.description,
    founder: {
      "@type": "Person",
      name: data.founder.name,
      jobTitle: data.founder.jobTitle,
      worksFor: { "@type": "Organization", name: data.name },
      sameAs: data.founder.sameAs,
    },
    foundingDate: data.foundingDate,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: data.contactPoint.contactType,
      url: data.contactPoint.url,
      availableLanguage: data.contactPoint.availableLanguage,
    },
    sameAs: data.sameAs,
  };
}

// lib/structured-data/breadcrumb.ts
export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// lib/structured-data/faq.ts
export function generateFAQPageJsonLd(items: FAQItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// lib/structured-data/article.ts
export function generateArticleJsonLd(
  data: ArticleData,
  organization: OrganizationData
): Record<string, unknown> {
  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    description: data.description,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    author: {
      "@type": "Person",
      name: organization.founder.name,
    },
    publisher: {
      "@type": "Organization",
      name: organization.name,
      logo: { "@type": "ImageObject", url: organization.logo },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": data.canonicalUrl,
    },
  };

  if (data.image) {
    article.image = data.image;
  }

  if (data.speakableSelectors) {
    article.speakable = {
      "@type": "SpeakableSpecification",
      cssSelector: data.speakableSelectors,
    };
  }

  return article;
}

// lib/structured-data/service.ts
export function generateServiceJsonLd(data: ServiceData): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    description: data.description,
    provider: {
      "@type": "Organization",
      name: data.provider.name,
      url: data.provider.url,
    },
    offers: data.offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      price: offer.price,
      priceCurrency: offer.priceCurrency,
      description: offer.description,
    })),
  };
}

// lib/structured-data/website.ts
export function generateWebSiteJsonLd(data: WebSiteData): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: data.name,
    url: data.url,
    publisher: {
      "@type": "Organization",
      name: data.name,
      url: data.url,
    },
  };
}
```

### Metadata Factory

```typescript
// lib/metadata/generate-metadata.ts
import { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "./constants";
import { PageMetadataConfig } from "@/lib/structured-data/types";

export function generatePageMetadata(config: PageMetadataConfig): Metadata {
  const canonicalUrl = `${BASE_URL}${config.path}`;

  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: (config.ogType as "website" | "article") || "website",
      locale: "en_AU",
      ...(config.image && { images: [{ url: config.image }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
    },
  };
}

// lib/metadata/constants.ts
export const BASE_URL = "https://www.quantumleapventures.com.au";
export const SITE_NAME = "Quantum Leap Ventures";
```

## Error Handling

1. **Invalid Schema Data**: Generator functions validate required fields at the type level via TypeScript. Runtime validation is handled by ensuring data constants are complete before passing to generators.

2. **Missing Metadata**: The `generatePageMetadata()` factory enforces all required fields via its typed input. If a page lacks metadata, the build will surface TypeScript errors.

3. **FAQ Content Mismatch**: FAQ data is defined once as a typed constant and consumed by both the UI component and the JSON-LD generator, eliminating drift between visible content and schema markup.

4. **File Size Limits**: The `llms-full.txt` file is authored to stay under 100KB. A build-time check can validate this constraint.

5. **Client/Server Boundary**: Pages that need both metadata exports (server) and interactive features (client) use the pattern of a server-component page.tsx wrapping a client-component content file.

## Testing Strategy

### Unit Tests
- Verify specific schema output for each page (homepage, pricing, blog posts)
- Test metadata generation for edge cases (empty paths, long titles)
- Validate FAQ content rendering and schema consistency

### Property-Based Tests
- Use `fast-check` (already in devDependencies) to generate random inputs for generator functions
- Test all 9 correctness properties with 100+ iterations each
- Focus on: Organization schema completeness, BreadcrumbList sequential ordering, FAQ roundtrip, metadata field presence, Article property completeness

### Integration Tests
- Google Rich Results Test validation (manual/CI)
- Crawl pages and verify `<script type="application/ld+json">` presence
- Verify HTTP headers from next.config.ts

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Organization JSON-LD Contains All Required Properties

*For any* page context passed to `generateOrganizationJsonLd`, the output object SHALL contain the properties `@context`, `@type`, `name`, `url`, `logo`, `description`, `founder`, `foundingDate`, `contactPoint`, and `sameAs` — all with non-empty values.

**Validates: Requirements 1.1**

### Property 2: Offer Entities Preserve Pricing Tier Data

*For any* array of pricing tier objects passed to `generateServiceJsonLd`, the output `offers` array SHALL contain an Offer entity for each input tier, and each Offer SHALL contain `name`, `price`, `priceCurrency` set to `"AUD"`, and `description` matching the corresponding input tier.

**Validates: Requirements 2.2**

### Property 3: Article JSON-LD Contains All Required Properties

*For any* blog post metadata passed to `generateArticleJsonLd`, the output SHALL contain `headline`, `description`, `datePublished`, `dateModified`, `author` (with name), `publisher` (with name and logo), and `mainEntityOfPage` — all with non-empty values.

**Validates: Requirements 3.1, 3.2**

### Property 4: Breadcrumb Positions Are Sequential Starting At 1

*For any* array of breadcrumb items passed to `generateBreadcrumbJsonLd`, the output `itemListElement` SHALL have sequential `position` values starting at 1, and each item SHALL contain `name` (non-empty string) and `item` (valid URL string).

**Validates: Requirements 4.1, 4.2**

### Property 5: FAQ Schema Matches Input Data

*For any* array of FAQ items (question/answer pairs) passed to `generateFAQPageJsonLd`, the output SHALL contain a `mainEntity` array where each Question entity's `name` equals the input question text and each `acceptedAnswer.text` equals the input answer text, preserving order and count.

**Validates: Requirements 5.3**

### Property 6: Page Metadata Contains All Required Fields

*For any* `PageMetadataConfig` passed to `generatePageMetadata`, the output SHALL contain: `title` (≤60 characters), `description` (≤160 characters), `alternates.canonical` (absolute URL), `openGraph` with title/description/url/siteName/type/locale, and `twitter` with card/title/description.

**Validates: Requirements 6.1, 7.1**

### Property 7: Canonical URL Matches Page Path

*For any* page path passed to `generatePageMetadata`, the `alternates.canonical` value SHALL equal the base domain concatenated with the page path.

**Validates: Requirements 7.1**

### Property 8: LLMs-full.txt Heading Hierarchy Is Valid

*For any* heading in the llms-full.txt content, the heading level SHALL not skip levels (no H3 without a preceding H2, no H2 without a preceding H1), ensuring valid Markdown heading hierarchy.

**Validates: Requirements 8.2**

### Property 9: Blog Post Speakable Selectors Are Present

*For any* blog post article data with `speakableSelectors` provided, the generated Article JSON-LD SHALL include a `speakable` property with a `cssSelector` array containing all provided selectors.

**Validates: Requirements 9.2**
