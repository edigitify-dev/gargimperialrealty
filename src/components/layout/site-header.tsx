"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/data/navigation";
import { useSiteVisit } from "@/components/site-visit/site-visit-provider";
import Brand from "./brand";
import "./site-header.css";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const isAbout = pathname.replace(/\/$/, "") === "/about";
  const currentSection = isAbout ? "about" : activeSection;
  const { openVisit } = useSiteVisit();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 35);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );

    navigationLinks.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className={`header ${scrolled || menuOpen ? "is-scrolled" : ""}`}>
      <div className="nav-container">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigationLinks.map((link) => (
            <a
              key={link.id}
              className={currentSection === link.id ? "active" : ""}
              href={link.href}
              aria-current={currentSection === link.id ? (isAbout ? "page" : "location") : undefined}
            >
              {link.text}
            </a>
          ))}
        </nav>
        <button onClick={openVisit} className="button primary nav-cta">
          Book a Site Visit <ArrowUpRight size={16} />
        </button>
        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navigationLinks.map((link) => (
              <a key={link.id} href={link.href} aria-current={currentSection === link.id ? (isAbout ? "page" : "location") : undefined} onClick={() => setMenuOpen(false)}>
                {link.text}<ArrowUpRight size={18} />
              </a>
            ))}
            <button
              className="button primary"
              onClick={() => {
                setMenuOpen(false);
                openVisit();
              }}
            >
              Book a Site Visit <ArrowUpRight size={18} />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
