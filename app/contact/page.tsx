import { generatePageMetadata } from "@/lib/metadata/generate-metadata";
import { generateBreadcrumbJsonLd } from "@/lib/structured-data/breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import ContactContent from "@/components/ContactContent";

export const metadata = generatePageMetadata({
  title: "Contact Quantum Leap Ventures",
  description: "Get in touch with Quantum Leap Ventures for your next project.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={generateBreadcrumbJsonLd([
          { name: "Home", url: "https://www.quantumleapventures.com.au" },
          { name: "Contact", url: "https://www.quantumleapventures.com.au/contact" },
        ])}
      />
      <ContactContent />
    </>
  );
}
