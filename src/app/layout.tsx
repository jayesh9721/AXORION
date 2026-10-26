import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ConsentBanner from "@/components/Consent";
import { site } from "@/lib/site";
import { themeIds } from "@/lib/themes";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "AXORION | Websites, Software, AI & Digital Growth", template: "%s | AXORION" },
  description: site.description,
  openGraph: { siteName: "AXORION", type: "website", locale: "en_IN" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#060912" };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "AXORION",
      url: site.url,
      email: site.emails[0],
      description: site.description,
    },
    {
      "@type": "LocalBusiness",
      name: "AXORION",
      url: site.url,
      email: site.emails[0],
      telephone: site.phones[0].tel,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: "Palamaner",
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: "IN",
      },
    },
  ],
};

// Apply the saved theme before first paint (dark is the default).
const themeScript = `try{var t=localStorage.getItem("theme");if(${JSON.stringify(themeIds)}.indexOf(t)>-1)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ConsentBanner />
      </body>
    </html>
  );
}
