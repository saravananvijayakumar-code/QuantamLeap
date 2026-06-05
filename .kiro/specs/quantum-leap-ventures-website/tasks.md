# Implementation Plan: Quantum Leap Ventures Website

## Overview

Build a multi-page Next.js 14+ App Router website with TypeScript, React Three Fiber for 3D elements, and Tailwind CSS for styling. The site features a dark futuristic theme with neon accents across five primary pages (Home, Products/App Builder, Portfolio, About, Contact) with persistent navigation, responsive layout, and contact form validation.

## Tasks

- [x] 1. Set up project structure and core configuration
  - [x] 1.1 Initialize Next.js 14+ project with TypeScript and Tailwind CSS
    - Create the Next.js app with App Router, TypeScript, and Tailwind CSS
    - Install dependencies: `@react-three/fiber`, `@react-three/drei`, `three`, `@types/three`
    - Configure `tailwind.config.ts` with custom dark theme colors (neon cyan `#00f0ff`, neon purple `#b400ff`, neon green `#00ff88`, dark backgrounds `#0a0a0f`, `#1a1a2e`)
    - Set up global CSS with base dark theme styles and gradient utilities
    - _Requirements: 1.1, 1.2, 1.3, 8.1, 8.2, 8.3_

  - [x] 1.2 Create shared types and data modules
    - Create `types/contact.ts` with ContactFormData, ContactFormState, and ValidationErrors interfaces
    - Create `types/theme.ts` with ThemeColors interface
    - Create `lib/validation.ts` with validateContactForm and isValidEmail functions
    - Create `lib/navigation.ts` with NavLink, DropdownItem interfaces and ROUTES constant
    - Create `lib/portfolio.ts` with PortfolioItem interface and PORTFOLIO_ITEMS array (pdfedit4u.com, suburbintel.com)
    - _Requirements: 1.1, 5.2, 5.3, 7.2, 7.3, 7.4_

  - [x] 1.3 Create root layout with metadata and font setup
    - Create `app/layout.tsx` as server component with HTML structure, dark theme body classes, and font imports
    - Include NavigationHeader and Footer component placeholders
    - Set metadata for "Quantum Leap Ventures" with appropriate description
    - _Requirements: 1.3, 2.1, 8.1_

- [x] 2. Implement NavigationHeader component
  - [x] 2.1 Build NavigationHeader with desktop layout
    - Create `components/NavigationHeader.tsx` as a `"use client"` component
    - Implement horizontal nav bar with links: Home, Products (dropdown), Portfolio, About, Contact
    - Display "Quantum Leap Ventures" brand name on the left
    - Style with dark background, neon accent hover states, and subtle border/glow
    - _Requirements: 2.1, 2.2, 2.6, 8.1, 8.2_

  - [x] 2.2 Implement Products dropdown functionality
    - Add dropdown state management (`isDropdownOpen`)
    - Render dropdown on hover/click showing "App Builder" as first item linking to `/products/app-builder`
    - Style dropdown with dark background, neon border, and smooth open/close animation
    - _Requirements: 2.3, 2.4, 2.5_

  - [x] 2.3 Implement mobile responsive navigation
    - Add hamburger icon toggle for viewports below 768px
    - Implement full-screen or slide-in mobile menu overlay with all nav links
    - Manage `isMobileMenuOpen` state
    - Ensure accessible keyboard navigation and focus management
    - _Requirements: 9.2_

- [x] 3. Implement 3D scene infrastructure
  - [x] 3.1 Create ThreeScene wrapper component
    - Create `components/ThreeScene.tsx` as a `"use client"` component wrapping React Three Fiber `<Canvas>`
    - Include `<Suspense>` boundary with configurable fallback
    - Add WebGL support detection with graceful degradation to static gradient fallback
    - _Requirements: 1.2, 8.4, 9.3_

  - [x] 3.2 Create ThreeSceneErrorBoundary component
    - Create `components/ThreeSceneErrorBoundary.tsx` as a React error boundary
    - Render a static gradient/image fallback when Three.js errors occur
    - _Requirements: 9.3_

  - [x] 3.3 Create useDevicePerformance hook
    - Create `hooks/useDevicePerformance.ts` that checks WebGL support, device pixel ratio, and GPU tier
    - Return performance level: "high" | "medium" | "low"
    - Use to conditionally reduce polygon count or disable post-processing on lower-end devices
    - _Requirements: 9.3_

  - [x] 3.4 Create reusable 3D elements
    - Create animated 3D components: floating geometric shapes (spheres, torus, icosahedron) with neon glow materials
    - Create particle field component for background ambiance
    - Add orbit/rotation animations using `useFrame`
    - _Requirements: 8.4, 8.5_

- [x] 4. Checkpoint - Verify core infrastructure
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement Home Page
  - [x] 5.1 Build Home Page with hero section and 3D elements
    - Create `app/page.tsx` serving at root route "/"
    - Implement hero section with headline describing Quantum Leap Ventures and tagline
    - Integrate ThreeScene with animated 3D elements (floating geometric shapes, particle effects)
    - Add call-to-action buttons linking to Products and Contact pages
    - Apply dark theme with neon accents and gradient backgrounds
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 8.1, 8.2, 8.3_

- [x] 6. Implement Products / App Builder Page
  - [x] 6.1 Build App Builder product page
    - Create `app/products/app-builder/page.tsx` serving at "/products/app-builder"
    - Display "App Builder" as the page heading
    - Describe features and benefits of the App Builder product with feature cards/sections
    - Integrate ThreeScene with relevant 3D elements for visual engagement
    - Apply dark theme with neon accents and gradient backgrounds
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 8.1, 8.2, 8.3_

- [x] 7. Implement Portfolio Page
  - [x] 7.1 Build Portfolio Page with project cards
    - Create `app/portfolio/page.tsx` serving at "/portfolio"
    - Create `components/PortfolioCard.tsx` component for displaying live app information
    - Display PortfolioCard for pdfedit4u.com with link to `https://pdfedit4u.com`
    - Display PortfolioCard for suburbintel.com with link to `https://suburbintel.com`
    - Ensure NO card describes applications as "AI-powered"
    - Integrate ThreeScene with 3D elements for visual engagement
    - Apply dark theme with neon accents and gradient backgrounds
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 8.1, 8.2, 8.3_

- [x] 8. Implement About Us Page
  - [x] 8.1 Build About Page with company information
    - Create `app/about/page.tsx` serving at "/about"
    - Display company mission/vision content and team information
    - Integrate ThreeScene with 3D elements for visual engagement
    - Apply dark theme with neon accents and gradient backgrounds
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 8.1, 8.2, 8.3_

- [x] 9. Implement Contact Page and Form
  - [x] 9.1 Build Contact Page with form
    - Create `app/contact/page.tsx` serving at "/contact"
    - Create `components/ContactForm.tsx` as a `"use client"` component
    - Implement form with name text input, email text input, message textarea, and submit button
    - Apply dark theme with neon-accented form styling (glowing borders on focus, dark input backgrounds)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.9, 8.1, 8.2_

  - [x] 9.2 Implement form validation and submission logic
    - Integrate `validateContactForm` from `lib/validation.ts`
    - Display inline validation errors below each field for empty/invalid inputs
    - Handle form submission with loading state and success/error feedback
    - _Requirements: 7.6, 7.7, 7.8_

  - [x] 9.3 Write property test for valid contact form submission
    - **Property 2: Valid contact form submission succeeds**
    - Generate random valid ContactFormData (non-empty trimmed name, valid email format, non-empty trimmed message) and verify validateContactForm returns `{ isValid: true, errors: {} }`
    - **Validates: Requirements 7.6**

  - [x] 9.4 Write property test for invalid contact form input
    - **Property 3: Invalid contact form input produces field-specific errors**
    - Generate random invalid ContactFormData (at least one field violating rules) and verify validateContactForm returns `{ isValid: false }` with error keys for each invalid field
    - **Validates: Requirements 7.7, 7.8**

- [x] 10. Checkpoint - Verify all pages render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Responsive layout and accessibility
  - [x] 11.1 Implement responsive layout across all pages
    - Ensure all pages adapt correctly for viewports from 320px to 2560px
    - Add max-width container with increased spacing for ultra-wide viewports (1440px–2560px)
    - Verify stacked layouts on mobile, side-by-side on tablet, full desktop layout
    - Ensure text maintains minimum 4.5:1 contrast ratio against dark backgrounds
    - _Requirements: 9.1, 8.6_

  - [x] 11.2 Write property test for responsive layout overflow
    - **Property 4: Responsive layout contains no horizontal overflow**
    - For any viewport width between 320px and 2560px, verify rendered page content does not produce horizontal scrollbar overflow
    - **Validates: Requirements 9.1**

- [x] 12. Navigation integration and final wiring
  - [x] 12.1 Wire NavigationHeader into root layout and verify all routes
    - Ensure NavigationHeader is rendered on every page via root layout
    - Verify all navigation links work correctly across all routes
    - Verify Products dropdown opens and "App Builder" link navigates to `/products/app-builder`
    - Add Footer component with company info and links
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [x] 12.2 Write property test for navigation header presence
    - **Property 1: Navigation header presence across all pages**
    - For any valid page route (/, /products/app-builder, /portfolio, /about, /contact), verify rendered output contains NavigationHeader with brand name and navigation links
    - **Validates: Requirements 2.1**

  - [x] 12.3 Write unit tests for core components
    - Test NavigationHeader renders all expected links
    - Test Products dropdown shows "App Builder" as first item
    - Test PortfolioCard renders pdfedit4u.com and suburbintel.com with correct links
    - Test no portfolio card contains "AI-powered" language
    - Test ContactForm renders name, email, message fields and submit button
    - _Requirements: 2.2, 2.4, 5.2, 5.3, 5.4, 7.2, 7.3, 7.4, 7.5_

- [x] 13. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The project uses TypeScript throughout with Next.js 14+ App Router pattern
- 3D scenes gracefully degrade on low-performance devices via the useDevicePerformance hook
- Portfolio cards must never describe applications as "AI-powered" per Requirement 5.4

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["2.1", "3.1", "3.2", "3.3"] },
    { "id": 3, "tasks": ["2.2", "2.3", "3.4"] },
    { "id": 4, "tasks": ["5.1", "6.1", "7.1", "8.1"] },
    { "id": 5, "tasks": ["9.1"] },
    { "id": 6, "tasks": ["9.2", "9.3", "9.4"] },
    { "id": 7, "tasks": ["11.1", "12.1"] },
    { "id": 8, "tasks": ["11.2", "12.2", "12.3"] }
  ]
}
```
