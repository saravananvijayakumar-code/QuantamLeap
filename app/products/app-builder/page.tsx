import { JsonLd } from "@/components/JsonLd";
import { FAQSection } from "@/components/FAQSection";
import AppBuilderContent from "@/components/AppBuilderContent";
import { generatePageMetadata } from "@/lib/metadata/generate-metadata";
import { generateFAQPageJsonLd } from "@/lib/structured-data/faq";
import { generateServiceJsonLd } from "@/lib/structured-data/service";
import { generateBreadcrumbJsonLd } from "@/lib/structured-data/breadcrumb";
import { BASE_URL } from "@/lib/metadata/constants";
import type { FAQItem, OrganizationData } from "@/lib/structured-data/types";

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
    question: "What is Vibe Coding?",
    answer:
      "Vibe Coding is our AI-native development methodology that leverages large language models like Claude, OpenAI, and Gemini as core development tools to ship production-ready web applications rapidly and reliably.",
  },
  {
    question: "How long does it take to build an app?",
    answer:
      "Depending on complexity, from 1-2 weeks for MVPs to 4-8 weeks for full production applications. Our AI-native approach dramatically compresses traditional development timelines.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We use Next.js, TypeScript, Python, GCP Cloud Run, Cloud SQL, and Docker for full-stack delivery. Our AI stack includes Claude, OpenAI, and Gemini for LLM-powered features, RAG pipelines, and AI agents.",
  },
  {
    question: "Do you provide post-launch support?",
    answer:
      "Yes, all plans include post-launch support covering bug fixes, performance monitoring, and iterative improvements to ensure your application continues to perform well in production.",
  },
];

export const metadata = generatePageMetadata({
  title: "Vibe Coding App Builder | Quantum Leap Ventures",
  description:
    "AI-native app builder shipping production-ready, LLM-powered web applications fast.",
  path: "/products/app-builder",
});

export default function AppBuilderPage() {
  const faqJsonLd = generateFAQPageJsonLd(FAQ_ITEMS);

  const serviceJsonLd = generateServiceJsonLd({
    name: "Vibe Coding App Builder",
    description:
      "AI-native app builder shipping production-ready, LLM-powered web applications fast using Claude, OpenAI, and Gemini.",
    provider: ORGANIZATION,
    offers: [
      {
        name: "MVP App Build",
        price: "5000",
        priceCurrency: "AUD",
        description:
          "Production-ready MVP web application built with AI-native methodology in 1-2 weeks.",
      },
    ],
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: BASE_URL },
    { name: "Products", url: `${BASE_URL}/products` },
    { name: "App Builder", url: `${BASE_URL}/products/app-builder` },
  ]);

  return (
    <main className="min-h-screen">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <AppBuilderContent />
      <FAQSection items={FAQ_ITEMS} />
    </main>
  );
}
