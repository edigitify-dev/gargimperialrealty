"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/motion/scroll-reveal";
import Brand from "./brand";
import "./site-footer.css";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Reveal className="container" variant="soft">
        <div className="footer-main motion-sequence">
          <div className="footer-brand">
            <Brand />
            <p>Thoughtfully chosen land.<br />Extraordinary possibilities.</p>
          </div>
          <nav className="footer-links" aria-label="Explore">
            <h2 className="footer-heading">Explore</h2>
            <a href="/about/">Our story</a>
            <a href="/#projects">Our developments</a>
            <a href="/about/#approach">Our approach</a>
          </nav>
          <nav className="footer-links" aria-label="Take the next step">
            <h2 className="footer-heading">Take the next step</h2>
            <Link href="/contact/" className="footer-visit">Plan a site visit <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <a href="/#masterplan">Explore the vision</a>
            <a href="/#testimonials">Testimonials</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Garg Imperial Realty. All rights reserved.</span>
        </div>
      </Reveal>
    </footer>
  );
}
