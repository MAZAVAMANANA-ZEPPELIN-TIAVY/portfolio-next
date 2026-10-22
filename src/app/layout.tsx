import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Metadata complète (siteUrl, Open Graph…) ajoutée aux étapes 4 et 12.
export const metadata: Metadata = {
  title: "Zeppélin Tiavy | Développeur web full-stack",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${instrumentSans.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
