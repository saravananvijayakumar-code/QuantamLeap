# Implementation Plan: GEO & AEO Optimization

## Overview

Implement comprehensive Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) for the Quantum Leap Ventures website. This involves building a modular JSON-LD structured data system, enhanced metadata generation, machine-readable content files, FAQ sections with schema markup, and SEO header configuration — all using Next.js 15 App Router conventions and TypeScript.

## Tasks

- [x] 1. Create structured data types and core infrastructure
  - [x] 1.1 Create `lib/structured-data/types.ts` with all TypeScript interfaces
    - Define interfaces: `OrganizationData`, `PersonData`, `ContactPointData`, `ServiceData`, `OfferData`, `ArticleData`, `BreadcrumbItem`, `FAQItem`, `WebSiteData`, `SpeakableData`, `PageMetadataConfig`
    - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.3_

  - [x] 1.2 Create `components/JsonLd.tsx` server component for JSON-LD injection
    - Implement a reusable component that renders `<script type="application/ld+json">` with serialized data
    - Accept a `data: Record<string, unknown>` prop
    - _Requirements: 1.2_

  - [x] 1.3 Create `lib/metadata/constants.ts` with shared metadata constants
    - Define `BASE_URL` as `"https://www.quantumleapventures.com.au"`
    - Define `SITE_NAME` as `"Quantum Leap Ventures"`
    - _Requirements: 6.4, 7.1_

  - [x] 1.4 Create `lib/metadata/generate-metadata.ts` metadata factory function
    - Implement `generatePageMetadata(config: PageMetadataConfig): Metadata` that generates full Next.js metadata objects with title, description, canonical URL, OpenGraph, and Twitter Card properties
    - _Requirements: 6.1, 7.1_

- [x] 2. Implement structured data generator functions
  - [x] 2.1 Create `lib/structured-data/organization.ts` with Organization and Person generators
    - Implement `generateOrganizationJsonLd(data: OrganizationData)` returning full Organization schema with nested founder Person entity and contactPoint
    - Include `sameAs` array for knowledge graph signals
    - _Requirements: 1.1, 1.3, 10.1, 10.2_

  - [x] 2.2 Create `lib/structured-data/breadcrumb.ts` with BreadcrumbList generator
    - Implement `generateBreadcrumbJsonLd(items: BreadcrumbItem[])` returning BreadcrumbList schema with sequential positions starting at 1
    - _Requirements: 4.1, 4.2_

  - [x] 2.3 Create `lib/structured-data/service.ts` with Service and Offer generators
    - Implement `generateServiceJsonLd(data: ServiceData)` returning Service schema with nested Offer entities preserving pricing tier data
    - _Requirements: 2.1, 2.2_

  - [x] 2.4 Create `lib/structured-data/article.ts` with Article generator
    - Implement `generateArticleJsonLd(data: ArticleData, organization: OrganizationData)` returning Article schema with author, publisher, mainEntityOfPage, and optional speakable property
    - _Requirements: 3.1, 3.2, 9.2_

  - [x] 2.5 Create `lib/structured-data/faq.ts` with FAQPage generator
    - Implement `generateFAQPageJsonLd(items: FAQItem[])` returning FAQPage schema with Question and acceptedAnswer entities
    - _Requirements: 5.3_

  - [x] 2.6 Create `lib/structured-data/website.ts` with WebSite generator
    - Implement `generateWebSiteJsonLd(data: WebSiteData)` returning WebSite schema with publisher reference
    - _Requirements: 12.1_

  - [x] 2.7 Write property tests for Organization JSON-LD generator
    - **Property 1: Organization JSON-LD Contains All Required Properties**
    - **Validates: Requirements 1.1**

  - [x] 2.8 Write property tests for BreadcrumbList generator
    - **Property 4: Breadcrumb Positions Are Sequential Starting At 1**
    - **Validates: Requirements 4.1, 4.2**

  - [x] 2.9 Write property tests for Service/Offer generator
    - **Property 2: Offer Entities Preserve Pricing Tier Data**
    - **Validates: Requirements 2.2**

  - [x] 2.10 Write property tests for Article generator
    - **Property 3: Article JSON-LD Contains All Required Properties**
    - **Validates: Requirements 3.1, 3.2**

  - [x] 2.11 Write property tests for FAQ generator
    - **Property 5: FAQ Schema Matches Input Data**
    - **Validates: Requirements 5.3**

- [x] 3. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement metadata and root layout integration
  - [x] 4.1 Update `app/layout.tsx` to add `metadataBase`, Organization JSON-LD, and WebSite JSON-LD
    - Set `metadataBase` to `new URL("https://www.quantumleapventures.com.au")`
    - Inject Organization JSON-LD on every page via root layout
    - Inject WebSite JSON-LD conditionally for the homepage (or place it in the homepage page component)
    - _Requirements: 1.2, 6.4, 12.1_

  - [x] 4.2 Add metadata export to `app/page.tsx` (homepage)
    - Use `generatePageMetadata` to add title, description, canonical URL, OpenGraph, and Twitter Card metadata
    - Add WebSite JSON-LD component to the homepage
    - Add speakable structured data pointing to main heading and description
    - _Requirements: 6.2, 9.1, 12.1_

  - [x] 4.3 Refactor `app/about/page.tsx` to support metadata export
    - Convert to server component, extracting interactive parts into `components/AboutContent.tsx` client component
    - Add metadata export using `generatePageMetadata`
    - Add BreadcrumbList JSON-LD
    - _Requirements: 6.3, 4.1_

  - [x] 4.4 Add metadata and BreadcrumbList to `app/contact/page.tsx`
    - Add metadata export with title, description, canonical URL
    - Add BreadcrumbList JSON-LD for Home > Contact
    - _Requirements: 6.1, 4.1, 7.1_

  - [x] 4.5 Add metadata and BreadcrumbList to `app/portfolio/page.tsx`
    - Add metadata export with title, description, canonical URL
    - Add BreadcrumbList JSON-LD for Home > Portfolio
    - _Requirements: 6.1, 4.1, 7.1_

  - [x] 4.6 Write property tests for metadata generation
    - **Property 6: Page Metadata Contains All Required Fields**
    - **Validates: Requirements 6.1, 7.1**

  - [x] 4.7 Write property tests for canonical URL generation
    - **Property 7: Canonical URL Matches Page Path**
    - **Validates: Requirements 7.1**

- [x] 5. Implement FAQ sections and product/pricing page enhancements
  - [x] 5.1 Create `components/FAQSection.tsx` component
    - Implement accessible FAQ section using `<details>/<summary>` pattern
    - Accept `items: FAQItem[]` and optional `title` props
    - Style with Tailwind classes consistent with existing design
    - _Requirements: 5.1, 5.2_

  - [x] 5.2 Add FAQ content, metadata, structured data to `app/products/app-builder/page.tsx`
    - Define FAQ constant with 4+ question-answer pairs about Vibe Coding App Builder
    - Add FAQSection component to the page
    - Add FAQPage JSON-LD, Service JSON-LD, and BreadcrumbList JSON-LD
    - Add metadata export using `generatePageMetadata`
    - _Requirements: 5.1, 5.3, 2.1, 4.1, 6.1_

  - [x] 5.3 Add FAQ content, metadata, structured data to `app/pricing/page.tsx`
    - Define FAQ constant with 4+ question-answer pairs about pricing, deliverables, and process
    - Add FAQSection component to the page
    - Add FAQPage JSON-LD and Service JSON-LD with Offer entities for Starter/Pro/Enterprise tiers
    - Add BreadcrumbList JSON-LD and metadata export
    - _Requirements: 5.2, 5.3, 2.2, 4.1, 6.1_

- [x] 6. Implement blog post structured data and speakable schema
  - [x] 6.1 Add Article JSON-LD, speakable, metadata, and breadcrumbs to `app/blog/page.tsx`
    - Add metadata export and BreadcrumbList JSON-LD for the blog listing page
    - _Requirements: 6.1, 4.1_

  - [x] 6.2 Add Article JSON-LD, speakable, metadata, and breadcrumbs to `app/blog/building-suburbintel-australian-property-intelligence/page.tsx`
    - Add Article JSON-LD with headline, datePublished, dateModified, author, publisher, image, and speakable selectors
    - Add BreadcrumbList JSON-LD (Home > Blog > Article Title)
    - Add metadata export with blog post details
    - _Requirements: 3.1, 3.2, 9.2, 4.1, 6.1_

  - [x] 6.3 Add Article JSON-LD, speakable, metadata, and breadcrumbs to `app/blog/we-built-privacy-first-pdf-editor/page.tsx`
    - Add Article JSON-LD with headline, datePublished, dateModified, author, publisher, image, and speakable selectors
    - Add BreadcrumbList JSON-LD (Home > Blog > Article Title)
    - Add metadata export with blog post details
    - _Requirements: 3.1, 3.2, 9.2, 4.1, 6.1_

  - [x] 6.4 Write property tests for blog post speakable selectors
    - **Property 9: Blog Post Speakable Selectors Are Present**
    - **Validates: Requirements 9.2**

- [x] 7. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Create comprehensive LLMs content file and update existing llms.txt
  - [x] 8.1 Create `public/llms-full.txt` with comprehensive company content
    - Write detailed Markdown content with: company overview, founder biography and expertise, complete service descriptions, full portfolio case studies with technical details, pricing information, technology stack, contact details, and FAQs
    - Use proper heading hierarchy (H1 for company name, H2 for sections, H3 for subsections)
    - Keep under 100KB
    - _Requirements: 8.1, 8.2, 8.4_

  - [x] 8.2 Update `public/llms.txt` to reference llms-full.txt
    - Add a reference link to `/llms-full.txt` for AI systems that support extended content retrieval
    - _Requirements: 8.3_

  - [x] 8.3 Write property test for llms-full.txt heading hierarchy
    - **Property 8: LLMs-full.txt Heading Hierarchy Is Valid**
    - **Validates: Requirements 8.2**

- [x] 9. Configure Next.js SEO headers
  - [x] 9.1 Update `next.config.ts` with security and caching headers
    - Add `X-Content-Type-Options: nosniff`
    - Add `X-Frame-Options: SAMEORIGIN`
    - Add `Referrer-Policy: strict-origin-when-cross-origin`
    - Add `Cache-Control: public, max-age=86400` for static assets
    - _Requirements: 11.1, 11.2_

- [x] 10. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design using `fast-check`
- Unit tests validate specific examples and edge cases
- The project uses Next.js 15 App Router with TypeScript and Tailwind CSS
- `fast-check` is already available in devDependencies for property-based testing
- JSON-LD components are React Server Components for SEO crawler compatibility

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.3"] },
    { "id": 1, "tasks": ["1.2", "1.4"] },
    { "id": 2, "tasks": ["2.1", "2.2", "2.3", "2.4", "2.5", "2.6"] },
    { "id": 3, "tasks": ["2.7", "2.8", "2.9", "2.10", "2.11", "5.1"] },
    { "id": 4, "tasks": ["4.1", "4.2", "4.3", "4.4", "4.5"] },
    { "id": 5, "tasks": ["4.6", "4.7", "5.2", "5.3"] },
    { "id": 6, "tasks": ["6.1", "6.2", "6.3"] },
    { "id": 7, "tasks": ["6.4", "8.1", "9.1"] },
    { "id": 8, "tasks": ["8.2", "8.3"] }
  ]
}
```
