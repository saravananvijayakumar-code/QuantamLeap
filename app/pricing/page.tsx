import { generatePageMetadata } from "@/lib/metadata/generate-metadata";
import { generateFAQPageJsonLd } from "@/lib/structured-data/faq";
import { generateServiceJsonLd } from "@/lib/structured-data/service";
import { generateBreadcrumbJsonLd } from "@/lib/structured-data/breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { FAQSection } from "@/components/FAQSection";
import PricingContent from "@/components/PricingContent";
import { FAQItem } from "@/lib/structured-data/types";
import { OrganizationData } from "@/lib/structured-data/types";
import { BASE_URL } from "@/lib/metadata/constants";

const ORGANIZATION: OrganizationData = {
  name: "Quantum Leap Ventures",
  url: "https://www.quantumleapventures.com.au",
  logo: "https://www.quantumleapventures.com.au/logo.png",
  description: "Building the future with innovative technology solutions.",
  founder: {
    name: "Saravanan Vijayakumar",
    jobTitle: "Founder & CEO",
    sameAs: ["https://www.linkedin.com/in/saravananvijayakumar/"],
  },
  foundingDate: "2024",
  contactPoint: {
    contactType: "customer service",
    url: "https://www.quantumleapventures.com.au/contact",
    availableLanguage: "English",
  },
  sameAs: ["https://www.linkedin.com/company/quantum-leap-ventures-au/"],
};

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What's included in each pricing tier?",
    answer:
      "Each tier includes full source code handover, responsive design, cloud hosting setup, and post-launch support. Higher tiers add AI integrations, database development, advanced architecture, and extended support periods.",
  },
  {
    question: "Do you charge hourly?",
    answer:
      "No, all our projects are fixed-price. You know the total cost upfront before we start, with no surprise hourly billing or hidden fees.",
  },
  {
    question: "What happens after the project is delivered?",
    answer:
      "We provide post-launch support included with every tier — 30 days for Pro and 90 days for Enterprise. During this period, we handle bug fixes, minor adjustments, and technical questions at no extra cost.",
  },
  {
    question: "Can I upgrade my plan mid-project?",
    answer:
      "Yes, we can adjust scope and pricing mid-project if your needs change. We'll provide a revised quote for any additional features or complexity, and you only pay the difference.",
  },
];

export const metadata = generatePageMetadata({
  title: "Pricing | Quantum Leap Ventures",
  description:
    "Simple, transparent pricing for AI-powered web applications. Fixed-price projects in AUD.",
  path: "/pricing",
});

export default function PricingPage() {
  const faqJsonLd = generateFAQPageJsonLd(FAQ_ITEMS);

  const serviceJsonLd = generateServiceJsonLd({
    name: "AI-Powered Web Application Development",
    description:
      "Fixed-price web application development services with AI integrations, from MVPs to enterprise platforms.",
    provider: ORGANIZATION,
    offers: [
      {
        name: "Starter",
        price: "2499",
        priceCurrency: "AUD",
        description:
          "Perfect for MVPs and landing pages. Get a production-ready app shipped fast.",
      },
      {
        name: "Pro",
        price: "5999",
        priceCurrency: "AUD",
        description:
          "Full-featured web applications with AI integrations and cloud infrastructure.",
      },
      {
        name: "Enterprise",
        price: "12999",
        priceCurrency: "AUD",
        description:
          "Complex AI platforms with custom pipelines, agents, and full-stack architecture.",
      },
    ],
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: BASE_URL },
    { name: "Pricing", url: `${BASE_URL}/pricing` },
  ]);

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <PricingContent />
      <FAQSection items={FAQ_ITEMS} />
    </>
  );
}
