export interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  description: string;
  founder: PersonData;
  foundingDate: string;
  contactPoint: ContactPointData;
  sameAs: string[];
}

export interface PersonData {
  name: string;
  jobTitle: string;
  sameAs: string[];
}

export interface ContactPointData {
  contactType: string;
  url: string;
  availableLanguage: string;
}

export interface ServiceData {
  name: string;
  description: string;
  provider: OrganizationData;
  offers: OfferData[];
}

export interface OfferData {
  name: string;
  price: string;
  priceCurrency: string;
  description: string;
}

export interface ArticleData {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  canonicalUrl: string;
  speakableSelectors?: string[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface WebSiteData {
  name: string;
  url: string;
}

export interface SpeakableData {
  cssSelectors: string[];
}

export interface PageMetadataConfig {
  title: string;
  description: string;
  path: string;
  ogType?: string;
  image?: string;
}
