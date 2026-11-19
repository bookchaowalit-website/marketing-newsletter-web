import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// The font variable sits on <html>: the Reader shell tokens live on :root and read it from there.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const description = "An archive of short newsletter issues on building, thinking and shipping small useful work.";

export const metadata: Metadata = {
  title: "The Letter | Newsletter archive",
  description,
  keywords: ["newsletter", "archive"],
  authors: [{ name: "Bookchaowalit", url: "https://bookchaowalit.com" }],
  creator: "Bookchaowalit",
  metadataBase: new URL("https://newsletter.bookchaowalit.com"),
  alternates: { canonical: "/" },
  openGraph: { type: "website", title: "The Letter | Newsletter archive", description, siteName: "Bookchaowalit" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
