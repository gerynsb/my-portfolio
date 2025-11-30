import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL('https://deangerypasamba.site'),
  title: {
    default: "Dean Gery Pasamba - Software Developer, Data and Business Analyst Portfolio",
    template: "%s | Dean Gery Pasamba"
  },
  description: "Software Developer in web, Flutter development, and Data & Business analysis. Passionate tech enthusiast building secure, reliable solutions.",
  keywords: ["Dean Gery Pasamba", "Data Analyst", "Flutter Developer", "Portfolio", "Web Development", "Business Analyst", "Indonesia Developer"],
  authors: [{ name: "Dean Gery Pasamba", url: "https://deangerypasamba.site" }],
  creator: "Dean Gery Pasamba",
  publisher: "Dean Gery Pasamba",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://deangerypasamba.site',
    title: 'Dean Gery Pasamba - Software Developer, Data and Business Analyst Portfolio',
    description: 'Software Developer in web, Flutter development, and Data & Business analysis. Building innovative solutions.',
    siteName: 'Dean Gery Pasamba Portfolio',
    images: [
      {
        url: '/og-image.png', // Buat gambar ini nanti 1200x630px
        width: 1200,
        height: 630,
        alt: 'Dean Gery Pasamba Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dean Gery Pasamba - Software Developer, Data and Business Analyst Portfolio',
    description: 'Software Developer in web, Flutter development, and Data & Business analysis. Building innovative solutions.',
    images: ['/og-image.png'],
  },
  verification: {
    google: '6vK7VZXBtmAoi_zAN7vytZoa-DO2GFoAGPLvhNf4_Y8',
  },
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
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://drive.google.com" crossOrigin="anonymous" />
        <link rel="canonical" href="https://deangerypasamba.site" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Dean Gery Pasamba",
              "url": "https://deangerypasamba.site",
              "image": "https://deangerypasamba.site/Logo/Deantransparan.png",
              "logo": "https://deangerypasamba.site/Logo/Deantransparan.png",
              "jobTitle": "Software Developer and Data & Business Analysis",
              "description": 'Software Developer in web, Flutter development, and Data & Business analysis. Building innovative solutions.',
              "sameAs": [
                "https://github.com/gerynsb"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Dean Gery Pasamba",
              "url": "https://deangerypasamba.site",
              "logo": {
                "@type": "ImageObject",
                "url": "https://deangerypasamba.site/Logo/Deantransparan.png",
                "width": 512,
                "height": 512
              },
              "sameAs": [
                "https://github.com/gerynsb"
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <div className="flex flex-col min-h-screen bg-black">
          {children}
        </div>
        <SpeedInsights sampleRate={1} />
      </body>
    </html>
  );
}
