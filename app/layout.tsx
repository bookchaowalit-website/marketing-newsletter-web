import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Newsletter Archive | Bookchaowalit",
  description: "Past issues index.",
  keywords: ["newsletter", "catalog"],
  authors: [{ name: "Bookchaowalit", url: "https://bookchaowalit.com" }],
  creator: "Bookchaowalit",
  metadataBase: new URL("https://bookchaowalit.com"),
  openGraph: {
    type: "website",
    title: "Newsletter Archive | Bookchaowalit",
    description: "Past issues index.",
    siteName: "Bookchaowalit",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/*
          THESIS: make an issue archive feel like a letter worth opening, not a newsletter signup shell.
          OWN-WORLD: warm paper, blue editorial ink, red filing marks, and a ruled reading sheet define the archive.
          STORY: search the index, filter the section, select a dispatch, and read its note in one quiet spread.
          FIRST VIEWPORT: the archive thesis, local boundary, issue index, and selected reading sheet are visible together.
          FORM: newspaper index rows, stamps, filing rules, and editorial type define every state.
          SEED: 273b6dc3 · assigned direction 3 · read mode.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
        */}
        {children}
      </body>
    </html>
  );
}
