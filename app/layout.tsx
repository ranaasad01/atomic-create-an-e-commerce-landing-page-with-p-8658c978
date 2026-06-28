import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumière — Modern Lifestyle Store",
  description:
    "Discover curated products crafted for modern living. Premium quality, thoughtful design.",
  keywords: ["lifestyle", "modern", "premium", "shop", "curated"],
  openGraph: {
    title: "Lumière — Modern Lifestyle Store",
    description: "Discover curated products crafted for modern living.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#fafaf8] text-[#1a1a1a] font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}