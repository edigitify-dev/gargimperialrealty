"use client";

import useReducedMotion from "@/hooks/use-reduced-motion";
import { useSiteVisit } from "@/components/site-visit/site-visit-provider";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Gem, Leaf, MapPinned, TreeDeciduous } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import "./estate-hero.css";

const benefits = [
  { icon: MapPinned, lines: ["PRIME", "LOCATIONS"] },
  { icon: Leaf, lines: ["THOUGHTFULLY", "PLANNED COMMUNITIES"] },
  { icon: Gem, lines: ["LONG-TERM", "VALUE CREATION"] },
  { icon: TreeDeciduous, lines: ["A GREENER,", "HEALTHIER TOMORROW"] },
];

export default function EstateHero() {
  const { openVisit } = useSiteVisit();
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [foregroundReady, setForegroundReady] = useState(false);
  const [imageError, setImageError] = useState(false);
  const state = imageError ? "static" : backgroundReady && foregroundReady ? "ready" : "loading";
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -85]);
  const titleOpacity = useTransform(scrollYProgress, [0, .35, .88, 1], [1, 1, 0, 0]);
  const detailsY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const detailsOpacity = useTransform(scrollYProgress, [0, .62, 1], [1, 1, 0]);

  useEffect(() => {
    const foreground = new window.Image();
    foreground.onload = () => setForegroundReady(true);
    foreground.onerror = () => setImageError(true);
    foreground.src = "/images/hero-estate-foreground.png";
    return () => { foreground.onload = null; foreground.onerror = null; };
  }, []);

  return (
    <section className="estate-hero hero" id="home" ref={section} aria-labelledby="hero-heading" data-hero-state={state}>
      <motion.div className="estate-hero-scene" style={reduced ? undefined : { y: sceneY }}>
        <Image src="/images/hero-estate-background.webp" alt="A limestone and timber clubhouse with a glass entrance, landscaped gardens and reflecting pools in warm evening light" fill priority sizes="100vw" className="estate-hero-photo" onLoad={() => setBackgroundReady(true)} onError={() => setImageError(true)} />
      </motion.div>

      <motion.div className="estate-hero-copy hero-title" style={reduced ? undefined : { y: titleY, opacity: titleOpacity }}>
        <div className="estate-hero-heading-frame"><h1 id="hero-heading" aria-label="Own your legacy."><span className="estate-hero-own">OWN YOUR</span><span className="estate-hero-legacy">LEGACY.</span></h1></div>
      </motion.div>

      {!imageError && <motion.div className="estate-hero-foreground" aria-hidden="true" style={reduced ? undefined : { y: sceneY }}>
        <Image src="/images/hero-estate-background.webp" alt="" fill priority sizes="100vw" className="estate-hero-photo" />
      </motion.div>}

      <div className="estate-hero-ground-shade" aria-hidden="true" />
      <motion.div className="estate-hero-actions" style={reduced ? undefined : { y: detailsY, opacity: detailsOpacity }}>
        <a href="#projects" className="estate-hero-explore">Explore Our Plots <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" /></a>
        <button onClick={openVisit}>Schedule a Site Visit <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" /></button>
      </motion.div>

      <motion.ul className="estate-hero-benefits" aria-label="The Imperial approach" style={reduced ? undefined : { opacity: detailsOpacity }}>
        {benefits.map(({ icon: Icon, lines }, index) => <li key={lines[0]} style={{ "--benefit-index": index } as React.CSSProperties}><Icon strokeWidth={1.35} aria-hidden="true" /><span>{lines[0]}<br />{lines[1]}</span></li>)}
      </motion.ul>
    </section>
  );
}
