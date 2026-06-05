# Design Document

## Overview

The Quantum Leap Ventures website is a Next.js 14+ application using the App Router pattern with TypeScript. It follows a component-based architecture with shared layout components, page-level components, and reusable UI primitives. React Three Fiber provides 3D scene rendering integrated as client components within the server-rendered page shell. The site serves five primary pages (Home, Products/App Builder, Portfolio, About, Contact) with a persistent navigation header, dark futuristic theme, and responsive layout from 320px to 2560px.

## Architecture

The Quantum Leap Ventures website is a Next.js 14+ application using the App Router pattern with TypeScript. It follows a component-based architecture with shared layout components, page-level components, and reusable UI primitives. React Three Fiber provides 3D scene rendering integrated as client components within the server-rendered page shell.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Next.js App Router                  │
├─────────────────────────────────────────────────────┤
│  Layout (RootLayout)                                 │
│  ├── NavigationHeader (client component)             │
│  ├── Page Content (server/client hybrid)             │
│  │   ├── Static Sections (server components)         │
│  │   └── ThreeScene (client components)              │
│  └── Footer                                          │
├─────────────────────────────────────────────────────┤
│  Shared Libraries                                    │
│  ├── Three.js / React Three Fiber                    │
│  ├── Form Validation Logic                           │
│  └── Theme/Style System (CSS Modules + Tailwind)     │
└─────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| 3D Rendering | React Three Fiber + Three.js |
| Styling | Tailwind CSS + CSS Modules for complex animations |
| Form Handling | React Hook Form or controlled components |
| Deployment | Vercel (optimized for Next.js) |

## Components and Interfaces

### Route Structure

```
app/
├── layout.tsx              # Root layout with NavigationHeader + Footer
├── page.tsx                # Home Page (/)
├── products/
│   └── app-builder/
│       └── page.tsx        # App Builder Page (/products/app-builder)
├── portfolio/
│   └── page.tsx            # Portfolio Page (/portfolio)
├── about/
│   └── page.tsx            # About Page (/about)
└── contact/
    └── page.tsx            # Contact Page (/contact)
```

### Core Components

#### NavigationHeader

A client component (`"use client"`) managing navigation state including the Products dropdown and mobile menu toggle.

```typescript
// components/NavigationHeader.tsx
"use client";

interface NavLink {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

interface DropdownItem {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    dropdown: [
      { label: "App Builder", href: "/products/app-builder" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
```

**State:**
- `isDropdownOpen: boolean` — controls Products dropdown visibility
- `isMobileMenuOpen: boolean` — controls mobile navigation overlay

**Behavior:**
- Desktop (≥768px): Horizontal nav bar with dropdown on hover/click
- Mobile (<768px): Hamburger icon toggling a full-screen or slide-in menu

#### ThreeScene

A reusable client component wrapping a React Three Fiber `<Canvas>` with configurable 3D content.

```typescript
// components/ThreeScene.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

interface ThreeSceneProps {
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
}

export function ThreeScene({ children, className, fallback }: ThreeSceneProps) {
  return (
    <div className={className}>
      <Canvas>
        <Suspense fallback={fallback ?? null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
```

**Graceful Degradation:** The component checks for WebGL support on mount. If unavailable or performance is poor, it renders a static fallback (gradient background or image).

#### PortfolioCard

A presentational component for displaying portfolio items.

```typescript
// components/PortfolioCard.tsx

interface PortfolioCardProps {
  name: string;
  url: string;
  description: string;
  thumbnail?: string;
}
```

**Constraint:** Card content must not include "AI-powered" or similar AI descriptors.

#### ContactForm

A client component implementing form handling and validation.

```typescript
// components/ContactForm.tsx
"use client";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}
```

## Interfaces

### Form Validation

```typescript
// lib/validation.ts

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}

export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: ValidationErrors = {};

  if (!data.name || data.name.trim() === "") {
    errors.name = "Name is required";
  }

  if (!data.email || data.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.message || data.message.trim() === "") {
    errors.message = "Message is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}
```

### Navigation Data

```typescript
// lib/navigation.ts

export interface NavLink {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

export interface DropdownItem {
  label: string;
  href: string;
}

export const ROUTES = {
  home: "/",
  products: "/products",
  appBuilder: "/products/app-builder",
  portfolio: "/portfolio",
  about: "/about",
  contact: "/contact",
} as const;
```

### Portfolio Data

```typescript
// lib/portfolio.ts

export interface PortfolioItem {
  id: string;
  name: string;
  url: string;
  description: string;
  thumbnail?: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "pdfedit4u",
    name: "PDFEdit4U",
    url: "https://pdfedit4u.com",
    description: "A comprehensive PDF editing tool for document management.",
  },
  {
    id: "suburbintel",
    name: "SuburbIntel",
    url: "https://suburbintel.com",
    description: "A suburb intelligence platform providing property and area insights.",
  },
];
```

## Data Models

### Contact Form Submission

```typescript
// types/contact.ts

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormState {
  data: ContactFormData;
  errors: ValidationErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}
```

### Theme Configuration

```typescript
// types/theme.ts

export interface ThemeColors {
  background: {
    primary: string;    // Deep dark (e.g., #0a0a0f)
    secondary: string;  // Slightly lighter dark (e.g., #1a1a2e)
  };
  neon: {
    primary: string;    // Cyan/blue glow (e.g., #00f0ff)
    secondary: string;  // Purple/magenta (e.g., #b400ff)
    accent: string;     // Green/teal (e.g., #00ff88)
  };
  text: {
    primary: string;    // White/near-white (e.g., #f0f0f0)
    secondary: string;  // Muted light (e.g., #a0a0b0)
  };
  gradient: {
    hero: string;       // CSS gradient string
    section: string;    // CSS gradient string
  };
}
```

## Error Handling

### Form Validation Errors

The contact form uses client-side validation before submission. Errors are displayed inline below each field.

- **Empty field:** Error message identifying the missing field
- **Invalid email:** Format-specific error message
- **Submission failure:** Generic error message with retry option

### 3D Scene Errors

Three.js scenes are wrapped in React error boundaries and Suspense boundaries:

```typescript
// components/ThreeSceneErrorBoundary.tsx

interface ThreeSceneErrorBoundaryState {
  hasError: boolean;
}

// Falls back to a static gradient/image if:
// - WebGL is not supported
// - Canvas fails to initialize
// - Three.js throws during rendering
```

### Navigation Errors

- Broken links handled by Next.js built-in `not-found.tsx`
- Client-side navigation failures show a toast notification

## Responsive Strategy

| Breakpoint | Layout Changes |
|-----------|---------------|
| < 768px | Mobile nav (hamburger), stacked content, simplified 3D |
| 768px - 1024px | Tablet layout, side-by-side where appropriate |
| 1024px - 1440px | Full desktop layout |
| 1440px - 2560px | Max-width container, increased spacing |

### 3D Performance Adaptation

```typescript
// hooks/useDevicePerformance.ts

export function useDevicePerformance() {
  // Check: WebGL support, device pixel ratio, GPU tier
  // Returns: "high" | "medium" | "low"
  // Used to: adjust polygon count, disable post-processing, or show fallback
}
```

## Testing Strategy

### Unit Tests (Example-Based)
- Route rendering: Verify each page route renders without errors
- Navigation links: Verify all expected links present in NavigationHeader
- Products dropdown: Verify "App Builder" is the first dropdown item
- Portfolio cards: Verify pdfedit4u.com and suburbintel.com cards are present with links
- Portfolio content: Verify no card contains "AI-powered" language
- Contact form structure: Verify name, email, message fields and submit button exist
- Mobile navigation: Verify hamburger menu appears below 768px

### Property Tests
- Contact form validation: Generate random valid/invalid inputs and verify validation logic correctness (Properties 2, 3)
- Navigation presence: Verify header exists on all page routes (Property 1)
- Responsive overflow: Verify no horizontal scroll across viewport range (Property 4)

### Integration Tests
- Contrast ratio: Use accessibility audit to verify 4.5:1 minimum contrast
- Form submission: End-to-end form submit with valid data

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Navigation header presence across all pages

*For any* valid page route in the application (/, /products/app-builder, /portfolio, /about, /contact), the rendered output SHALL contain the NavigationHeader component with the brand name and navigation links.

**Validates: Requirements 2.1**

### Property 2: Valid contact form submission succeeds

*For any* ContactFormData where name is a non-empty trimmed string, email matches a valid email format, and message is a non-empty trimmed string, calling validateContactForm SHALL return `{ isValid: true, errors: {} }`.

**Validates: Requirements 7.6**

### Property 3: Invalid contact form input produces field-specific errors

*For any* ContactFormData where at least one field violates its validation rule (name is empty/whitespace, email is empty/whitespace or does not match email format, or message is empty/whitespace), calling validateContactForm SHALL return `{ isValid: false }` with an error key present for each invalid field.

**Validates: Requirements 7.7, 7.8**

### Property 4: Responsive layout contains no horizontal overflow

*For any* viewport width between 320px and 2560px, the rendered page content SHALL not produce horizontal scrollbar overflow (document scrollWidth ≤ viewport width).

**Validates: Requirements 9.1**
