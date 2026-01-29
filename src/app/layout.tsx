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
  description: "Sharan Raj VK's professional portfolio showcasing AI, Machine Learning, and Software Engineering projects. Based in Bangalore, India. Explore my work in artificial intelligence, software development, and innovative tech solutions.",
  keywords: ["Sharan Raj VK", "Sharan portfolio", "AI Engineer", "ML Engineer", "Software Engineer", "Bangalore developer", "Machine Learning portfolio", "Artificial Intelligence developer", "Sharan Raj"],
  authors: [{ name: "Sharan Raj VK", url: "https://sharan-raj-ai.github.io" }],
  creator: "Sharan Raj VK",
  publisher: "Sharan Raj VK",
  metadataBase: new URL("https://sharan-raj-ai.github.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sharan Raj VK | AI & ML Engineer Portfolio",
    description: "Explore Sharan Raj VK's professional portfolio - AI, Machine Learning & Software Engineering projects",
    url: "https://sharan-raj-ai.github.io",
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
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // Replace after Google Search Console setup
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
