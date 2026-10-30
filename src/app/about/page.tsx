import type { Metadata } from "next";
import AboutExperience from "@/components/about/about-experience";
import HorizonCTA from "@/components/home/horizon-cta";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import ScrollProgress from "@/components/motion/scroll-progress";
import SiteVisitProvider from "@/components/site-visit/site-visit-provider";

export const metadata: Metadata = {
  title: "Our Story | Garg Imperial Realty",
  description: "Get to know Garg Imperial Realty. A considered approach to land, a personal approach to people, and a shared vision for what comes next.",
  openGraph: {
    title: "A place for life to unfold. | Garg Imperial Realty",
    description: "Discover the beliefs and considered approach behind Garg Imperial Realty.",
    images: [{ url: "/images/hero.webp", width: 1536, height: 1024, alt: "Contemporary architecture framed by a landscaped courtyard" }],
  },
};

export default function AboutPage() {
  return (
    <SiteVisitProvider>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <SiteHeader />
      <main id="main">
        <AboutExperience />
        <HorizonCTA />
      </main>
      <SiteFooter />
    </SiteVisitProvider>
  );
}
