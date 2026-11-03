import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import HorizonCTA from "@/components/home/horizon-cta";
import ScrollProgress from "@/components/motion/scroll-progress";
import SiteVisitProvider from "@/components/site-visit/site-visit-provider";
import "@/components/journal/journal.css";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <SiteVisitProvider>
    <a href="#main" className="skip-link">Skip to content</a>
    <ScrollProgress />
    <SiteHeader />
    <main id="main" className="journal-main">{children}<HorizonCTA /></main>
    <SiteFooter />
  </SiteVisitProvider>;
}
