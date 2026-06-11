import { generatePageMetadata } from "@/lib/metadata/generate-metadata";
import { JsonLd } from "@/components/JsonLd";
import { generateBreadcrumbJsonLd } from "@/lib/structured-data/breadcrumb";
import { BASE_URL } from "@/lib/metadata/constants";
import PortfolioContent from "@/components/PortfolioContent";

export const metadata = generatePageMetadata({
  title: "Portfolio | Quantum Leap Ventures",
  description: "Explore live applications built by Quantum Leap Ventures. Quality, performance, and intuitive design in every project.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbJsonLd([
        { name: "Home", url: `${BASE_URL}/` },
        { name: "Portfolio", url: `${BASE_URL}/portfolio` },
      ])} />
      <PortfolioContent />
    </>
  );
}
