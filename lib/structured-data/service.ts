import { ServiceData } from "./types";

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
