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
  title: "Mariage Agathe & Alain",
  description: "27 septembre 2025 - Trizac, Cantal",
  keywords: ["mariage", "Agathe", "Alain", "Trizac", "Cantal", "27 septembre 2025", "cérémonie", "union"],
  authors: [{ name: "Agathe & Alain" }],
  creator: "Agathe & Alain",
  publisher: "Agathe & Alain",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mariage-agathe-et-alain.fun'), // À remplacer par votre domaine réel
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://mariage-agathe-et-alain.fun', // À remplacer par votre domaine réel
    title: 'Mariage Agathe & Alain',
    description: '27 septembre 2025 - Trizac, Cantal.',
    siteName: 'Mariage Agathe & Alain',
    images: [
      {
        url: '/mariage-5.png',
        width: 1200,
        height: 630,
        alt: 'Mariage Agathe & Alain - 27 septembre 2025 à Trizac',
      },
      {
        url: '/mariage-5.png',
        width: 800,
        height: 600,
        alt: 'Invitation mariage Agathe & Alain',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ariage Agathe & Alain',
    description: '27 septembre 2025 à Trizac, Cantal.',
    creator: '@votre-twitter', // À remplacer par votre handle Twitter si vous en avez un
    images: ['/mariage-5.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'événement',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/mariage-5.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Bellefair&family=Comfortaa:wght@300..700&family=Fredoka:wght@300..700&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Poiret+One&family=Quicksand:wght@300..700&family=Urbanist:ital,wght@0,100..900;1,100..900&family=Young+Serif&display=swap" rel="stylesheet"></link>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
