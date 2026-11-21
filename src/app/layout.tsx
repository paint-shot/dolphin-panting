import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.brandName} | Master Painters & Decorators in Dublin, Ireland`,
  description:
    "Bespoke residential, period exterior, kitchen spray-finishing, and commercial painting across Dublin. Free no-obligation quotes. Call 089 960 9741 or 085 220 0539.",
  keywords: [
    "painters Dublin",
    "painting and decorating Dublin",
    "house painters Dublin",
    "interior painting Dublin",
    "exterior painting Dublin",
    "kitchen cabinet spray painting Dublin",
    "commercial painters Dublin",
  ],
  openGraph: {
    title: `${SITE_CONFIG.brandName} — Dublin's Premier Painting & Decorating`,
    description:
      "Explore our before-and-after transformations across Dublin. Interior, exterior, spray finishing & commercial decorating.",
    locale: "en_IE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HousePainter",
    name: SITE_CONFIG.brandName,
    areaServed: "Dublin, Ireland",
    telephone: [
      SITE_CONFIG.contacts.primaryPhone.raw,
      SITE_CONFIG.contacts.secondaryPhone.raw,
    ],
    email: SITE_CONFIG.contacts.email.display,
    priceRange: "€€",
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-ochre selection:text-white">
        {children}
      </body>
    </html>
  );
}
