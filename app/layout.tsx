import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kbbi-words.vercel.app"),
  title: "KBBI Word Search - Cari Kosa Kata Bahasa Indonesia",
  description: "Aplikasi pencarian kosa kata KBBI (Kamus Besar Bahasa Indonesia) yang cepat, cerdas, dan mudah digunakan. Cari awalan kata secara instan dari ribuan dataset unik.",
  applicationName: "KBBI Search",
  keywords: ["KBBI", "Kamus Besar Bahasa Indonesia", "cari kata", "kosa kata", "bahasa indonesia", "kamus online", "word search"],
  authors: [{ name: "Rifki", url: "https://rifkidocs.vercel.app/" }],
  openGraph: {
    title: "KBBI Word Search - Cari Kosa Kata Bahasa Indonesia",
    description: "Cari awalan kata KBBI secara instan dengan teknologi pencarian yang cepat dan cerdas.",
    url: "/",
    siteName: "KBBI Search",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KBBI Word Search - Cari Kosa Kata Bahasa Indonesia",
    description: "Cari awalan kata KBBI secara instan dengan teknologi pencarian yang cepat dan cerdas.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
