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

export const metadata: Metadata = {
  metadataBase: new URL("https://skills.nimaaksoy.com"),
  title: {
    default: "skills.nimaaksoy.com — An open directory of AI Skills",
    template: "%s — skills.nimaaksoy.com",
  },
  description:
    "An open directory of AI Skills. Find, copy, and use Skills compatible with Claude and the agentskills.io standard.",
  openGraph: {
    title: "skills.nimaaksoy.com",
    description: "An open directory of AI Skills.",
    url: "https://skills.nimaaksoy.com",
    siteName: "skills.nimaaksoy.com",
    type: "website",
  },
  robots: { index: true, follow: true },
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
