"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/motion/scroll-reveal";
import Brand from "./brand";
import "./site-footer.css";

export default function SiteFooter() {
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
            <Link href="/contact/">Plan a site visit <ArrowUpRight size={14} /></Link>
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
