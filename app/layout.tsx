import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { generateOrganizationJsonLd } from "@/lib/structured-data/organization";
import { OrganizationData } from "@/lib/structured-data/types";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.quantumleapventures.com.au"),
  title: "Quantum Leap Ventures",
  description:
    "Quantum Leap Ventures - Building the future with innovative technology solutions. We craft cutting-edge digital products with immersive 3D experiences.",
};

const ORGANIZATION_DATA: OrganizationData = {
  name: "Quantum Leap Ventures",
  url: "https://www.quantumleapventures.com.au",
  logo: "https://www.quantumleapventures.com.au/logo.png",
  description:
    "Quantum Leap Ventures - Building the future with innovative technology solutions. We craft cutting-edge digital products with immersive 3D experiences.",
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

const organizationJsonLd = generateOrganizationJsonLd(ORGANIZATION_DATA);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} bg-dark-primary text-[#f0f0f0] min-h-screen antialiased`}>
        <JsonLd data={organizationJsonLd} />
        <NavigationHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
