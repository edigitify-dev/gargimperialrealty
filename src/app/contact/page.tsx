import type { Metadata } from "next";
import ContactExperience from "@/components/contact/contact-experience";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import ScrollProgress from "@/components/motion/scroll-progress";
import SiteVisitProvider from "@/components/site-visit/site-visit-provider";

export const metadata: Metadata = {
  title: "Let’s Talk Possibilities | Garg Imperial Realty",
  description: "Start a conversation with Garg Imperial Realty. Share your plans, prepare an enquiry, and explore a place for your next chapter.",
  openGraph: { title: "Let’s talk possibilities. | Garg Imperial Realty", description: "Good things begin with a conversation. Share your plans and explore what comes next.", images: [{ url: "/images/landscape.webp", alt: "A garden path framed by trees and still water" }] },
};

export default function ContactPage() {
  return <SiteVisitProvider>
    <a href="#main" className="skip-link">Skip to content</a>
    <ScrollProgress />
    <SiteHeader />
    <main id="main"><ContactExperience /></main>
    <SiteFooter />
  </SiteVisitProvider>;
}
