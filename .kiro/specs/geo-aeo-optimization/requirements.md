# Requirements Document

## Introduction

This feature transforms the Quantum Leap Ventures website into a fully GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) optimized platform. The goal is to make the site highly discoverable and accurately representable by AI systems (ChatGPT, Gemini, Perplexity, Claude) and traditional search engines (Google, Bing) through structured data, enhanced metadata, semantic markup, and machine-readable content files.

## Glossary

- **Platform**: The Quantum Leap Ventures Next.js 15 App Router website at https://www.quantumleapventures.com.au
- **JSON-LD_Module**: A reusable module that generates and injects JSON-LD structured data scripts into page HTML
- **Metadata_System**: The Next.js metadata export mechanism used to define per-page title, description, OpenGraph, Twitter Card, and canonical URL metadata
- **LLMs_Content_System**: The set of plain-text files (llms.txt and llms-full.txt) served at the site root for AI crawler consumption
- **Structured_Data**: Schema.org vocabulary encoded as JSON-LD and embedded in page HTML for search engine and AI system consumption
- **GEO**: Generative Engine Optimization — techniques that make website content easily parseable and citable by AI-powered search and answer engines
- **AEO**: Answer Engine Optimization — techniques that position website content as direct answers in featured snippets and AI-generated responses
- **FAQ_Section**: A visible page section containing question-and-answer pairs with corresponding FAQPage schema markup

## Requirements

### Requirement 1: Organization Structured Data

**User Story:** As a search engine or AI crawler, I want to find Organization schema data on the website, so that I can accurately identify and represent the company in knowledge panels and AI responses.

#### Acceptance Criteria

1. THE JSON-LD_Module SHALL output a valid Schema.org Organization entity on every page of the Platform, containing the properties: name, url, logo, description, founder, foundingDate, contactPoint, and sameAs.
2. WHEN a page is rendered, THE JSON-LD_Module SHALL inject the Organization JSON-LD as a script element with type "application/ld+json" in the document head.
3. THE JSON-LD_Module SHALL include a Person entity for the founder with properties: name set to "Saravanan Vijayakumar", jobTitle set to "Founder & CEO", and worksFor referencing the Organization.
4. THE JSON-LD_Module SHALL pass Google Rich Results Test validation without errors for the Organization schema.

### Requirement 2: Service and Product Structured Data

**User Story:** As a search engine or AI system, I want to find Service and Product schema data on relevant pages, so that I can accurately describe the company's offerings in responses.

#### Acceptance Criteria

1. WHEN the Products App Builder page is rendered, THE JSON-LD_Module SHALL output a valid Schema.org Service entity with properties: name, description, provider (referencing the Organization), and offers containing pricing tiers.
2. WHEN the Pricing page is rendered, THE JSON-LD_Module SHALL output a valid Schema.org Service entity with an array of Offer entities containing: name, price, priceCurrency set to "AUD", and description for each pricing tier (Starter, Pro, Enterprise).
3. THE JSON-LD_Module SHALL pass Google Rich Results Test validation without errors for Service and Offer schemas.

### Requirement 3: Article Structured Data for Blog Posts

**User Story:** As a search engine or AI system, I want to find Article schema on blog posts, so that I can index authorship, publication dates, and content metadata for citation and attribution.

#### Acceptance Criteria

1. WHEN a blog post page is rendered, THE JSON-LD_Module SHALL output a valid Schema.org Article entity with properties: headline, description, datePublished, dateModified, author (Person entity with name "Saravanan Vijayakumar"), publisher (referencing the Organization), and image.
2. THE JSON-LD_Module SHALL include mainEntityOfPage with the canonical URL of the blog post.
3. THE JSON-LD_Module SHALL pass Google Rich Results Test validation without errors for Article schema.

### Requirement 4: BreadcrumbList Structured Data

**User Story:** As a search engine, I want to find BreadcrumbList schema on every page, so that I can display hierarchical navigation in search results.

#### Acceptance Criteria

1. WHEN any page other than the homepage is rendered, THE JSON-LD_Module SHALL output a valid Schema.org BreadcrumbList entity reflecting the page hierarchy from Home to the current page.
2. THE JSON-LD_Module SHALL generate BreadcrumbList items with properties: position (integer starting at 1), name (human-readable page title), and item (full canonical URL).
3. THE JSON-LD_Module SHALL pass Google Rich Results Test validation without errors for BreadcrumbList schema.

### Requirement 5: FAQ Sections with FAQPage Schema

**User Story:** As a potential customer or AI answer engine, I want to find FAQ content on key pages, so that I can get direct answers to common questions about the company's services.

#### Acceptance Criteria

1. WHEN the Products App Builder page is rendered, THE Platform SHALL display a visible FAQ section containing a minimum of 4 question-and-answer pairs relevant to the Vibe Coding App Builder service.
2. WHEN the Pricing page is rendered, THE Platform SHALL display a visible FAQ section containing a minimum of 4 question-and-answer pairs relevant to pricing, deliverables, and engagement process.
3. WHEN a page containing a FAQ section is rendered, THE JSON-LD_Module SHALL output a valid Schema.org FAQPage entity with Question and acceptedAnswer properties matching the visible FAQ content.
4. THE JSON-LD_Module SHALL pass Google Rich Results Test validation without errors for FAQPage schema.

### Requirement 6: Enhanced Per-Page Metadata

**User Story:** As a search engine or social media platform, I want complete metadata on every page, so that I can display rich previews and index content accurately.

#### Acceptance Criteria

1. THE Metadata_System SHALL export metadata for every page containing: title (unique per page, maximum 60 characters), description (unique per page, maximum 160 characters), canonical URL, OpenGraph properties (title, description, url, siteName, type, locale), and Twitter Card properties (card set to "summary_large_image", title, description).
2. WHEN the homepage is rendered, THE Metadata_System SHALL export metadata (the homepage currently lacks metadata exports due to being a default export without a metadata constant).
3. WHEN the About page is rendered, THE Platform SHALL convert the About page from a client component to a server component, or extract a metadata-exporting layout, so that the Metadata_System can export metadata for the About page.
4. THE Metadata_System SHALL define a consistent metadataBase URL of "https://www.quantumleapventures.com.au" in the root layout to resolve relative OpenGraph image URLs.

### Requirement 7: Canonical URLs

**User Story:** As a search engine, I want to find canonical URLs on every page, so that I can avoid indexing duplicate content and consolidate link equity.

#### Acceptance Criteria

1. THE Metadata_System SHALL include an alternates.canonical property in the metadata export of every page, set to the full absolute URL of that page using the base domain "https://www.quantumleapventures.com.au".
2. WHEN a page is rendered, THE Platform SHALL output a link element with rel="canonical" in the document head containing the canonical URL.

### Requirement 8: Comprehensive LLMs Content File

**User Story:** As an AI crawler or LLM system, I want to access a detailed plain-text content file, so that I can ingest comprehensive information about the company for accurate AI-generated responses.

#### Acceptance Criteria

1. THE LLMs_Content_System SHALL serve a file at the path /llms-full.txt containing detailed company information including: company overview, founder biography and expertise, complete service descriptions, full portfolio case studies with technical details, pricing information, technology stack, contact details, and frequently asked questions with answers.
2. THE LLMs_Content_System SHALL format the llms-full.txt file using Markdown with clear heading hierarchy (H1 for company name, H2 for sections, H3 for subsections).
3. THE LLMs_Content_System SHALL update the existing llms.txt file to include a reference link to llms-full.txt for AI systems that support extended content retrieval.
4. THE Platform SHALL serve llms-full.txt with a text/plain content type and a maximum file size of 100KB.

### Requirement 9: Speakable Schema for Voice and AI Assistants

**User Story:** As a voice assistant or AI system, I want to identify which content sections are suitable for text-to-speech or direct citation, so that I can deliver concise spoken answers.

#### Acceptance Criteria

1. WHEN the homepage is rendered, THE JSON-LD_Module SHALL output a Schema.org WebPage entity with a speakable property containing CSS selectors pointing to the main heading and description text.
2. WHEN a blog post page is rendered, THE JSON-LD_Module SHALL output a Schema.org Article entity with a speakable property containing CSS selectors pointing to the article headline and introductory paragraph.

### Requirement 10: Knowledge Graph Signals

**User Story:** As a search engine building a knowledge graph, I want to find sameAs links and authoritative entity references, so that I can connect the company to its verified online presence across platforms.

#### Acceptance Criteria

1. THE JSON-LD_Module SHALL include a sameAs property in the Organization entity containing an array of verified social and professional profile URLs for Quantum Leap Ventures (including at minimum the company LinkedIn page and any other active company profiles).
2. THE JSON-LD_Module SHALL include a sameAs property in the founder Person entity containing an array of the founder's verified professional profile URLs (including at minimum a LinkedIn profile URL).

### Requirement 11: Next.js Configuration for SEO Headers

**User Story:** As a search engine crawler, I want the site to return proper HTTP headers, so that I can efficiently crawl and index the site content.

#### Acceptance Criteria

1. THE Platform SHALL configure next.config.ts to include security and caching headers: X-Content-Type-Options set to "nosniff", X-Frame-Options set to "SAMEORIGIN", and Referrer-Policy set to "strict-origin-when-cross-origin".
2. THE Platform SHALL configure next.config.ts to set Cache-Control headers for static assets to enable efficient crawler re-visits (public, max-age of at least 86400 seconds for static resources).

### Requirement 12: WebSite Schema with SearchAction

**User Story:** As a search engine, I want to find WebSite schema with a potential search action, so that I can offer sitelinks search box functionality in search results.

#### Acceptance Criteria

1. WHEN the homepage is rendered, THE JSON-LD_Module SHALL output a valid Schema.org WebSite entity with properties: name set to "Quantum Leap Ventures", url set to "https://www.quantumleapventures.com.au", and publisher referencing the Organization entity.
2. THE JSON-LD_Module SHALL pass Google Rich Results Test validation without errors for WebSite schema.
