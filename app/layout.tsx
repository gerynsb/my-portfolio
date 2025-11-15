import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Dean Gery Pasamba - Portfolio",
  description: "Full Stack Developer specializing in web apps, Flutter development, and data analysis. Passionate tech enthusiast building secure, reliable solutions.",
  keywords: ["Full Stack Developer", "Flutter Developer", "Data Analyst", "Portfolio", "Web Development"],
  authors: [{ name: "Dean Gery Pasamba" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="font-sans antialiased">
        <div className="flex flex-col min-h-screen bg-black">
          {children}
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
