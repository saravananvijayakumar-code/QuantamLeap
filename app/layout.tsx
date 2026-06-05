import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Quantum Leap Ventures",
  description:
    "Quantum Leap Ventures - Building the future with innovative technology solutions. We craft cutting-edge digital products with immersive 3D experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} bg-dark-primary text-[#f0f0f0] min-h-screen antialiased`}>
        <NavigationHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
