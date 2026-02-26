import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sharan Raj VK | AI & ML Engineer Portfolio",
  description: "Sharan Raj VK — AI & Machine Learning Engineer and CEO of Voxels Digital Agency (voxels.in). Professional portfolio showcasing AI, ML, voice AI, and software engineering projects. Based in Bangalore, India.",
  keywords: ["Sharan Raj VK", "CEO Voxels", "Voxels Digital Agency", "Sharan portfolio", "AI Engineer", "ML Engineer", "Software Engineer", "Bangalore developer", "Machine Learning portfolio", "Artificial Intelligence developer", "Sharan Raj", "Voice AI", "Voxels CEO"],
  authors: [{ name: "Sharan Raj VK", url: "https://sharan.voxels.in" }],
  creator: "Sharan Raj VK",
  publisher: "Sharan Raj VK",
  metadataBase: new URL("https://sharan.voxels.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sharan Raj VK | AI & ML Engineer Portfolio",
    description: "Sharan Raj VK — AI & ML Engineer and CEO of Voxels Digital Agency. Explore AI, Machine Learning & Software Engineering projects.",
    url: "https://sharan.voxels.in",
    siteName: "Sharan Raj VK Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sharan Raj VK - AI & ML Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sharan Raj VK | AI & ML Engineer Portfolio",
    description: "AI, ML & Software Engineer based in Bangalore, India",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "3p-ZzvE8CalrF6kBIxC7S_SLHzB1Ob-7X7bUayUyy0U",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body
        className={`${fraunces.variable} ${manrope.variable} antialiased bg-background text-foreground`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
