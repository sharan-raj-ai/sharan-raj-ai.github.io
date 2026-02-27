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
  title: "Sharan Raj VK | AI & ML Engineer, Bangalore — Portfolio",
  description: "Sharan Raj VK — Emerging AI & Machine Learning Engineer based in Bangalore, India. Building production-grade Voice AI, Computer Vision, and Generative AI systems. CEO & Co-Founder of Voxels Digital Agency. Explore real-world AI/ML projects and achievements.",
  keywords: ["Sharan Raj VK", "AI engineer Bangalore", "ML engineer Bangalore", "emerging AI engineer India", "AIML engineer Bangalore", "CEO Voxels", "Voxels Digital Agency", "Machine Learning engineer India", "Voice AI developer", "Generative AI engineer", "computer vision engineer Bangalore", "AI portfolio Bangalore", "young AI engineer India", "Sharan Raj", "AIML engineer Bengaluru", "AI startup founder Bangalore", "rising AI talent India"],
  authors: [{ name: "Sharan Raj VK", url: "https://sharan.voxels.in" }],
  creator: "Sharan Raj VK",
  publisher: "Sharan Raj VK",
  metadataBase: new URL("https://sharan.voxels.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sharan Raj VK | AI & ML Engineer, Bangalore",
    description: "Emerging AI & ML Engineer building production-grade intelligent systems. CEO of Voxels Digital Agency. Explore Voice AI, Computer Vision & Generative AI projects.",
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
    title: "Sharan Raj VK | AI & ML Engineer, Bangalore",
    description: "Emerging AI & ML Engineer building real-world AI systems in Bangalore, India",
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
    google: "SsfIn18PsmujgzUd3If5yVES8vKUFb7ctrXiShSj3hY",
    //google: "3p-ZzvE8CalrF6kBIxC7S_SLHzB1Ob-7X7bUayUyy0U",
    //<meta name="google-site-verification" content="SsfIn18PsmujgzUd3If5yVES8vKUFb7ctrXiShSj3hY" />
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
