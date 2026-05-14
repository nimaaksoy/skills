import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-loaded",
  display: "swap",
});

const SITE_URL = "https://skills.nimaaksoy.com";
const SITE_NAME = "skills.nimaaksoy.com";
const SITE_TITLE = "skills.nimaaksoy.com — An open directory of AI Skills";
const SITE_DESCRIPTION =
  "An open directory of AI Skills. Find, copy, and use Skills compatible with Claude and the agentskills.io standard. Free to use, free to contribute.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — skills.nimaaksoy.com",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Nima Aksoy", url: "https://nimaaksoy.com" }],
  creator: "Nima Aksoy",
  publisher: "Nima Aksoy",
  keywords: [
    "AI skills",
    "Agent Skills",
    "Claude skills",
    "SKILL.md",
    "agentskills.io",
    "Anthropic",
    "Claude",
    "prompt engineering",
    "AI directory",
    "open source",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "skills.nimaaksoy.com — An open directory of AI Skills",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@nimaaksoy",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-paper text-ink antialiased flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
