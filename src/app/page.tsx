import AboutScene from "@/components/home/about-scene";
import AdvantageSection from "@/components/home/advantage-section";
import EstateHero from "@/components/home/estate-hero";
import HorizonCTA from "@/components/home/horizon-cta";
import MasterplanSection from "@/components/home/masterplan-section";
import ProjectFolio from "@/components/home/project-folio";
import TestimonialsSection from "@/components/home/testimonials-section";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import ScrollProgress from "@/components/motion/scroll-progress";
import SiteVisitProvider from "@/components/site-visit/site-visit-provider";
import { projects } from "@/data/projects";

export default function Page() {
  return (
    <SiteVisitProvider>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <SiteHeader />
      <main id="main">
        <EstateHero />
        <AboutScene />
        <ProjectFolio projects={projects} />
        <AdvantageSection />
        <MasterplanSection />
        <TestimonialsSection />
        <HorizonCTA />
      </main>
      <SiteFooter />
    </SiteVisitProvider>
  );
}
