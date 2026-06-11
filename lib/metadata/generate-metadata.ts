import { Metadata } from "next";
import { BASE_URL, SITE_NAME } from "./constants";
import { PageMetadataConfig } from "@/lib/structured-data/types";

export function generatePageMetadata(config: PageMetadataConfig): Metadata {
  const canonicalUrl = `${BASE_URL}${config.path}`;

  return {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: (config.ogType as "website" | "article") || "website",
      locale: "en_AU",
      ...(config.image && { images: [{ url: config.image }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
    },
  };
}
