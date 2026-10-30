"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import useReducedMotion from "@/hooks/use-reduced-motion";

export default function AboutHero() {
  const target = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "9%"]);
  const introY = useTransform(scrollYProgress, [0, .38], [0, -42]);
  const introOpacity = useTransform(scrollYProgress, [0, .08, .36], [1, 1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, .68, 1], [1, 1, .975]);
  const photoOpacity = useTransform(scrollYProgress, [0, .76, 1], [1, 1, 0]);
  const noteY = useTransform(scrollYProgress, [0, .65, 1], [0, 0, -30]);

  return (
    <section className="about-opening" ref={target} aria-labelledby="about-page-heading">
      <motion.div className="container about-opening-intro" style={reduced ? undefined : { y: introY, opacity: introOpacity }}>
        <h1 id="about-page-heading"><span className="about-opening-line"><span>A place for life</span></span><span className="about-opening-line"><em>to unfold.</em></span></h1>
        <div className="about-opening-aside">
          <p>A home starts with a feeling. We help you explore the land, the setting, and the possibilities that feel right for you.</p>
          <a className="about-story-link" href="#story">Get to know us <span><ArrowDown size={17} strokeWidth={1.4} aria-hidden="true" /></span></a>
        </div>
      </motion.div>
      <motion.figure className="about-opening-figure" style={reduced ? undefined : { scale: photoScale, opacity: photoOpacity }}>
        <div className="about-opening-picture">
          <motion.div className="about-opening-image" style={reduced ? undefined : { y: imageY }}>
            <Image src="/images/hero.webp" alt="An architectural concept of a stone and glass pavilion opening onto gardens and a reflecting pool" fill sizes="100vw" priority />
          </motion.div>
          <div className="about-opening-shade" aria-hidden="true" />
          <motion.div className="about-opening-note" style={reduced ? undefined : { y: noteY }}><p>Room to put down roots.<br /><em>Freedom to make it yours.</em></p></motion.div>
        </div>
        <figcaption>Architectural imagery is illustrative.</figcaption>
      </motion.figure>
    </section>
  );
}
