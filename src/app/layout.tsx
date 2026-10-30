import type { Metadata, Viewport } from "next";
import { bodoniModa, manrope } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://garg-imperial-realty.sleekvale64.chatgpt.site"),
  title: "Garg Imperial Realty | A Place for Your Legacy",
  description: "Discover a considered approach to premium residential plots, planned communities and land ownership with Garg Imperial Realty.",
  openGraph: {
    title: "Garg Imperial Realty — Own Your Legacy.",
    description: "Your vision. Your land. Your future. Explore the possibilities of thoughtfully planned plotted developments.",
    images: [{ url: "/images/hero-estate-background.png", width: 1672, height: 941, alt: "Contemporary clubhouse with landscaped reflecting pool" }],
    type: "website",
  },
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { themeColor: "#183A58" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${bodoniModa.variable} ${manrope.variable}`}><body>{children}</body></html>;
}
