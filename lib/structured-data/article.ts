import { ArticleData, OrganizationData } from "./types";

export function generateArticleJsonLd(
  data: ArticleData,
  organization: OrganizationData
): Record<string, unknown> {
  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    description: data.description,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    author: {
      "@type": "Person",
      name: organization.founder.name,
    },
    publisher: {
      "@type": "Organization",
      name: organization.name,
      logo: { "@type": "ImageObject", url: organization.logo },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": data.canonicalUrl,
    },
  };

  if (data.image) {
    article.image = data.image;
  }

  if (data.speakableSelectors) {
    article.speakable = {
      "@type": "SpeakableSpecification",
      cssSelector: data.speakableSelectors,
    };
  }

  return article;
}
