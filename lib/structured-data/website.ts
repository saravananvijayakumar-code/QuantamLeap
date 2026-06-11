import { WebSiteData } from "./types";

export function generateWebSiteJsonLd(data: WebSiteData): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: data.name,
    url: data.url,
    publisher: {
      "@type": "Organization",
      name: data.name,
      url: data.url,
    },
  };
}
