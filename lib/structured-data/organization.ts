import { OrganizationData } from "./types";

export function generateOrganizationJsonLd(
  data: OrganizationData
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    url: data.url,
    logo: data.logo,
    description: data.description,
    founder: {
      "@type": "Person",
      name: data.founder.name,
      jobTitle: data.founder.jobTitle,
      worksFor: { "@type": "Organization", name: data.name },
      sameAs: data.founder.sameAs,
    },
    foundingDate: data.foundingDate,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: data.contactPoint.contactType,
      url: data.contactPoint.url,
      availableLanguage: data.contactPoint.availableLanguage,
    },
    sameAs: data.sameAs,
  };
}
