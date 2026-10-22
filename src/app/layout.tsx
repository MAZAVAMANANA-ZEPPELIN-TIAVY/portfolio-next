import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site, siteUrl } from "@/data/site";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Pas d'export `viewport` : celui de Next (width=device-width, initial-scale=1) laisse le zoom autorisé (D6).
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | ${site.jobTitle}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.fullName }],
  creator: site.fullName,
  // Valeurs par défaut (404…) ; chaque page les remplace via pageMetadata (src/lib/metadata.ts).
  openGraph: { type: "website", locale: "fr_FR", siteName: site.name },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${instrumentSans.variable} antialiased`}>
      <body className="min-h-screen bg-surface text-ink">
        <a
          href="#contenu"
          className="sr-only rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
