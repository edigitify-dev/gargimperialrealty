"use client";

import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/motion/scroll-reveal";
import { useSiteVisit } from "@/components/site-visit/site-visit-provider";
import Brand from "./brand";
import "./site-footer.css";

export default function SiteFooter() {
  const { openVisit } = useSiteVisit();

  return (
    <footer>
      <Reveal className="container" variant="soft">
        <div className="footer-main motion-sequence">
          <div>
            <Brand />
            <p>Thoughtfully chosen land.<br />Extraordinary possibilities.</p>
          </div>
          <div className="footer-links">
            <span>EXPLORE</span>
            <a href="/about/">Our story</a>
            <a href="/#projects">Our developments</a>
            <a href="/about/#approach">Our approach</a>
          </div>
          <div className="footer-links">
            <span>TAKE THE NEXT STEP</span>
            <button onClick={openVisit}>Plan a site visit <ArrowUpRight size={14} /></button>
            <a href="/#masterplan">Explore the vision</a>
            <a href="/#testimonials">Testimonials</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Garg Imperial Realty. All rights reserved.</span>
        </div>
      </Reveal>
    </footer>
  );
}
