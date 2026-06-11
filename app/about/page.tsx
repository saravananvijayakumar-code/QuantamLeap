import { generatePageMetadata } from "@/lib/metadata/generate-metadata";
import { JsonLd } from "@/components/JsonLd";
import { generateBreadcrumbJsonLd } from "@/lib/structured-data/breadcrumb";
import { BASE_URL } from "@/lib/metadata/constants";
import AboutContent from "@/components/AboutContent";

export const metadata = generatePageMetadata({
  title: "About Quantum Leap Ventures",
  description: "Learn about Quantum Leap Ventures, a forward-thinking software company building innovative digital solutions.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbJsonLd([
        { name: "Home", url: `${BASE_URL}/` },
        { name: "About", url: `${BASE_URL}/about` },
      ])} />
      <AboutContent />
    </>
  );
}
