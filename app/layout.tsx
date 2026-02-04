import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GreyNovo | AI Automation Agency for Modern Business",
  description: "Transform manual work into intelligent workflows. GreyNovo builds custom AI automation solutions for scaling coaches and consultants.",
  keywords: ["AI Automation", "Business Coaching", "Workflow Automation", "Zapier Experts", "Scale Your Business"],
  openGraph: {
    title: "GreyNovo | AI Automation Agency",
    description: "Automate your business. Scale your impact. Future-ready AI solutions.",
    url: "https://greynovo.com",
    siteName: "GreyNovo",
    images: [{
      url: "/og-image.jpg", // We will need to create this later
      width: 1200,
      height: 630,
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreyNovo | AI Automation Agency",
    description: "Transform manual work into intelligent workflows.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-black`}>
        {children}
      </body>
    </html>
  );
}
